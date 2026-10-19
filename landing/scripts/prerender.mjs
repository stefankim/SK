// Renders every route to static HTML with its own <head>, structured data and route marker:
//   /, /en/ (home), /work/<id>/, /en/work/<id>/ (case studies), /404.html.
// Also writes sitemap.xml, robots.txt, llms.txt / llms-full.txt and the Content-Security-Policy in _headers.
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { loadEnv } from 'vite';
import {
  CASE_STUDIES, CLIENTS, CONTENT, EMAIL, LANGS, LANG_PATH, METRIC_VALUES, PROJECTS, SITE_URL, SOCIAL, STACK_NAMES,
  pageTitle, pathFor, render,
} from '../dist-ssr/entry-server.js';

const env = loadEnv('production', process.cwd(), 'VITE_');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
// Lower-case a label's first letter, leaving acronyms such as AI or WCAG alone.
const lower = (s) => (/^[A-ZÀ-Ž][a-zà-ž]/.test(s) ? s[0].toLowerCase() + s.slice(1) : s);
const template = readFileSync('dist/index.html', 'utf8');
const today = new Date().toISOString().slice(0, 10);
const PERSON_ID = `${SITE_URL}/#person`;
const person = { '@id': PERSON_ID };
const services = (c) => [...c.services.pillars, ...c.services.more];

const ROUTES = [
  ...LANGS.map((lang) => ({ lang, page: 'home', caseId: null })),
  ...LANGS.flatMap((lang) => PROJECTS.map((p) => ({ lang, page: 'case', caseId: p.id }))),
  { lang: 'sk', page: '404', caseId: null },
];
const urlOf = (r) => SITE_URL + pathFor(r.lang, r.caseId);

function head(r) {
  const c = CONTENT[r.lang];
  const m = c.meta;
  const title = pageTitle(r);
  const description = r.page === 'case' ? c.work.projects[r.caseId].body : r.page === '404' ? c.notFound.body : m.description;
  const image = `${SITE_URL}/og-image.png`;
  if (r.page === '404') {
    return [`<title>${esc(title)}</title>`, '<meta name="robots" content="noindex" />'].join('\n    ');
  }
  return [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    `<meta name="keywords" content="${esc(m.keywords)}" />`,
    '<meta name="author" content="Stefan Kimak" />',
    `<link rel="canonical" href="${urlOf(r)}" />`,
    ...LANGS.map((l) => `<link rel="alternate" hreflang="${l}" href="${urlOf({ ...r, lang: l })}" />`),
    `<link rel="alternate" hreflang="x-default" href="${urlOf({ ...r, lang: 'en' })}" />`,
    `<link rel="alternate" type="text/plain" href="${SITE_URL}/llms.txt" title="llms.txt" />`,
    `<meta property="og:type" content="${r.page === 'case' ? 'article' : 'website'}" />`,
    `<meta property="og:url" content="${urlOf(r)}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(r.page === 'case' ? description : m.ogDescription)}" />`,
    `<meta property="og:locale" content="${m.locale}" />`,
    ...LANGS.filter((l) => l !== r.lang).map((l) => `<meta property="og:locale:alternate" content="${CONTENT[l].meta.locale}" />`),
    `<meta property="og:image" content="${image}" />`,
    '<meta property="og:image:width" content="1200" />',
    '<meta property="og:image:height" content="630" />',
    `<meta property="og:image:alt" content="${esc(m.imageAlt)}" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
    '<meta name="twitter:site" content="@stefankimak_dev" />',
    `<meta name="twitter:title" content="${esc(r.page === 'case' ? title : m.twitterTitle)}" />`,
    `<meta name="twitter:description" content="${esc(r.page === 'case' ? description : m.twitterDescription)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<meta name="twitter:image:alt" content="${esc(m.imageAlt)}" />`,
  ].join('\n    ');
}

function personNode(c) {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: 'Stefan Kimak',
    url: `${SITE_URL}/`,
    email: `mailto:${EMAIL}`,
    image: `${SITE_URL}/og-image.png`,
    jobTitle: c.about.subtitle,
    description: c.meta.description,
    knowsAbout: ['PHP', 'Drupal 7/8/9/10/11', 'Symfony', 'Laravel', 'Vue.js', 'Nuxt', 'TypeScript', 'OpenAI', 'LangChain', 'RAG', 'Vector Databases', 'Migrations', 'AWS', 'Docker'],
    knowsLanguage: ['English', 'Slovak', 'Czech'],
    worksFor: CLIENTS.map((client, i) => ({ '@type': 'Organization', name: client.name, url: client.href, description: c.metrics.clientNotes[i] })),
    sameAs: SOCIAL.map((s) => s.href),
  };
}

function caseNode(lang, id, c) {
  const study = CASE_STUDIES[lang][id];
  return {
    '@type': 'CreativeWork',
    '@id': `${SITE_URL}${pathFor(lang, id)}#work`,
    name: study.title,
    url: SITE_URL + pathFor(lang, id),
    description: c.work.projects[id].body,
    abstract: `${study.problem} ${study.solution}`,
    keywords: study.tags.join(', '),
    creator: person,
    inLanguage: lang,
  };
}

function jsonLd(r) {
  const c = CONTENT[r.lang];
  const url = urlOf(r);
  const website = { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, name: 'Stefan Kimak', url: `${SITE_URL}/`, author: person, inLanguage: LANGS };
  let graph;
  if (r.page === 'case') {
    graph = [
      personNode(c),
      website,
      { ...caseNode(r.lang, r.caseId, c), mainEntityOfPage: url },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Stefan Kimak', item: SITE_URL + LANG_PATH[r.lang] },
          { '@type': 'ListItem', position: 2, name: c.work.title, item: `${SITE_URL}${LANG_PATH[r.lang]}#work` },
          { '@type': 'ListItem', position: 3, name: CASE_STUDIES[r.lang][r.caseId].title, item: url },
        ],
      },
    ];
  } else {
    graph = [
      personNode(c),
      website,
      { '@type': 'ProfilePage', '@id': `${url}#page`, url, name: c.meta.title, description: c.meta.description, inLanguage: r.lang, isPartOf: { '@id': `${SITE_URL}/#website` }, mainEntity: person },
      {
        '@type': 'ItemList',
        name: c.services.title,
        itemListElement: services(c).map((s, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'Service', name: s.title, description: s.body, provider: person, areaServed: 'Europe' } })),
      },
      {
        '@type': 'ItemList',
        name: c.work.title,
        itemListElement: PROJECTS.map((p, i) => ({ '@type': 'ListItem', position: i + 1, item: caseNode(r.lang, p.id, c) })),
      },
      { '@type': 'FAQPage', '@id': `${url}#faq`, inLanguage: r.lang, mainEntity: c.faq.items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    ];
  }
  const json = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
  return `<script type="application/ld+json">${json}</script>`;
}

function sitemap() {
  const pages = ROUTES.filter((r) => r.page !== '404');
  const entries = pages.map((r) => [
    '  <url>',
    `    <loc>${urlOf(r)}</loc>`,
    ...LANGS.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${urlOf({ ...r, lang: l })}" />`),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${urlOf({ ...r, lang: 'en' })}" />`,
    `    <lastmod>${today}</lastmod>`,
    `    <priority>${r.page === 'home' ? (r.lang === 'sk' ? '1.0' : '0.9') : '0.7'}</priority>`,
    '  </url>',
  ].join('\n'));
  writeFileSync('dist/sitemap.xml', [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...entries,
    '</urlset>',
    '',
  ].join('\n'));
  console.log(`wrote sitemap.xml (${pages.length} urls)`);
  writeFileSync('dist/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
}

// Plain-markdown versions of the site for AI assistants (llmstxt.org convention).
function llms() {
  const c = CONTENT.en;
  const intro = [
    '# Stefan Kimak',
    '',
    `> ${c.about.subtitle}. ${c.meta.ogDescription} ${METRIC_VALUES.map((v, i) => `${v}+ ${lower(c.metrics.labels[i])}`).join(', ')}. ${c.about.facts.join('. ')}.`,
    '',
    `Contact: ${EMAIL}. ${c.hero.badge}.`,
    '',
  ];
  const short = [
    ...intro,
    '## Pages',
    '',
    `- [Home (English)](${SITE_URL}/en/): services, tech stack, portfolio, FAQ and contact`,
    `- [Home (Slovak)](${SITE_URL}/): the same content in Slovak`,
    `- [Full content as markdown](${SITE_URL}/llms-full.txt): everything on the site, including all case studies`,
    '',
    '## Services',
    '',
    ...services(c).map((s) => `- ${s.title}: ${s.body}`),
    '',
    '## Case studies',
    '',
    ...PROJECTS.map((p) => `- [${CASE_STUDIES.en[p.id].title}](${SITE_URL}${pathFor('en', p.id)}): ${c.work.projects[p.id].body}`),
    '',
    '## Profiles',
    '',
    ...SOCIAL.map((s) => `- ${s.href}`),
    '',
  ];
  const full = [
    ...intro,
    '## About',
    '',
    c.about.lead,
    '',
    ...c.about.focus.map((f) => `- ${f}`),
    '',
    `Clients: ${CLIENTS.map((client, i) => `${client.name} (${c.metrics.clientNotes[i]})`).join(', ')}.`,
    '',
    '## Services',
    '',
    ...services(c).map((s) => `- **${s.title}**: ${s.body}`),
    '',
    '## Tech stack',
    '',
    ...[...STACK_NAMES, c.stack.aiName].map((name, i) => `- **${name}**: ${c.stack.bodies[i]}`),
    '',
    '## Case studies',
    '',
    'Clients are anonymised by sector; figures are indicative of the engagement.',
    '',
    ...PROJECTS.flatMap((p) => {
      const s = CASE_STUDIES.en[p.id];
      return [
        `### ${s.title}`,
        '',
        `Link: ${SITE_URL}${pathFor('en', p.id)}`,
        `Role: ${s.role}. Duration: ${s.duration}. Tags: ${s.tags.join(', ')}.`,
        '',
        `**Problem.** ${s.problem}`,
        '',
        `**Solution.** ${s.solution}`,
        '',
        `**Stack.** ${s.stack.join('; ')}.`,
        '',
        `**Results.** ${s.metrics.map((m) => `${m.value} ${lower(m.label)}`).join('; ')}.`,
        '',
      ];
    }),
    '## Frequently asked questions',
    '',
    ...c.faq.items.flatMap((f) => [`### ${f.q}`, '', f.a, '']),
    '## Contact',
    '',
    `- Email: ${EMAIL}`,
    ...SOCIAL.map((s) => `- ${s.href}`),
    '',
  ];
  writeFileSync('dist/llms.txt', short.join('\n'));
  writeFileSync('dist/llms-full.txt', full.join('\n'));
  console.log('wrote llms.txt, llms-full.txt');
}

// Hashes every executable inline <script>, so the CSP can stay strict without 'unsafe-inline'.
const inlineHashes = new Set();
function collectHashes(html) {
  for (const [, attrs, body] of html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)) {
    if (/\bsrc=|application\/ld\+json/.test(attrs)) continue;
    inlineHashes.add(`'sha256-${createHash('sha256').update(body).digest('base64')}'`);
  }
}

function csp() {
  const origin = (u) => (u ? new URL(u).origin : null);
  const plausible = env.VITE_PLAUSIBLE_DOMAIN ? origin(env.VITE_PLAUSIBLE_SRC || 'https://plausible.io') : null;
  const umami = env.VITE_UMAMI_WEBSITE_ID ? origin(env.VITE_UMAMI_SRC || 'https://cloud.umami.is') : null;
  const cloudflare = ['https://static.cloudflareinsights.com', 'https://cloudflareinsights.com'];
  const list = (...items) => [...new Set(items.flat().filter(Boolean))].join(' ');
  return [
    "default-src 'self'",
    `script-src ${list("'self'", [...inlineHashes], plausible, umami, cloudflare[0])}`,
    `connect-src ${list("'self'", origin(env.VITE_FORM_ENDPOINT), plausible, umami, umami && !env.VITE_UMAMI_SRC ? 'https://api-gateway.umami.dev' : null, cloudflare[1])}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self'",
    "manifest-src 'self'",
    "worker-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    'upgrade-insecure-requests',
  ].join('; ');
}

for (const r of ROUTES) {
  let html = template
    .replace('<html lang="sk">', `<html lang="${r.lang}">`)
    .replace(/<title>.*?<\/title>\s*/s, '')
    .replace(/<!--meta-->.*?<!--\/meta-->/s, () => head(r))
    .replace('<!--jsonld-->', () => (r.page === '404' ? '' : jsonLd(r)))
    .replace('<div id="root"></div>', () => `<div id="root" data-route='${JSON.stringify(r)}'>${render(r)}</div>`);
  // Only the Slovak home page (the root) redirects by browser language.
  html = r.page === 'home' && r.lang === 'sk'
    ? html.replace(/\s*<!--\/?redirect-->/g, '')
    : html.replace(/\s*<!--redirect-->.*?<!--\/redirect-->/s, '');
  collectHashes(html);

  const file = r.page === '404' ? 'dist/404.html' : `dist${pathFor(r.lang, r.caseId)}index.html`;
  mkdirSync(file.slice(0, file.lastIndexOf('/')), { recursive: true });
  writeFileSync(file, html);
}
console.log(`prerendered ${ROUTES.length} pages`);

const headers = readFileSync('dist/_headers', 'utf8');
if (!headers.includes('__CSP__')) throw new Error('dist/_headers has no __CSP__ placeholder');
writeFileSync('dist/_headers', headers.replace('__CSP__', csp()));
console.log(`wrote _headers CSP (${inlineHashes.size} inline script hashes)`);

sitemap();
llms();
rmSync('dist-ssr', { recursive: true, force: true });
