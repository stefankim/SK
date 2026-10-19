// Quick-answers bot: keyword matching over the site's own content, no network calls.
import { CASE_STUDIES } from './caseStudies';
import { CONTENT, CV_URL, EMAIL, METRIC_VALUES } from './content';

const TEXT = {
  en: {
    role: 'Role',
    problem: 'Problem',
    solution: 'Solution',
    results: 'Key results',
    greet: "Hey! I'm Stefan's quick-answers bot — grounded in this site's content. Ask about his stack, any project, services, blog posts, availability or how to reach him.",
    stack: "Stefan's daily stack:\n• PHP 8.4, Drupal 7/8/9/10/11, Symfony 7, Laravel 11\n• Vue 3 (Composition API + Pinia), Nuxt 3, TypeScript, Vite\n• AI: OpenAI, Anthropic, LangChain, RAG, pgvector\n• DevOps: Docker, GitHub Actions, AWS",
    drupal: "Drupal is one of Stefan's specialties — custom modules, headless setups (JSON:API / GraphQL), multi-site platforms, migrations & Search API. Acquia certified.\n\nDrupal projects:",
    symfony: 'On Symfony, Stefan ships rock-solid REST/GraphQL APIs with API Platform, Messenger queues and a DDD-flavoured architecture. Symfony certified.\n\nSymfony projects:',
    laravel: 'On Laravel he builds multi-tenant SaaS products with Eloquent, Inertia/Vue, queues (Horizon), Reverb for realtime, and Cashier+Stripe for billing.\n\nLaravel projects:',
    vue: 'Vue 3 + Composition API + Pinia is his preferred frontend stack, often with Nuxt 3 for SSR.\n\nVue.js projects:',
    ai: 'Stefan integrates LLMs into classic web apps: RAG pipelines on pgvector, OpenAI / Anthropic APIs, function calling, agents and content automations.\n\nAI projects:',
    portfolio: 'Recent work (open any case study on the page for the full write-up):',
    services: 'Services Stefan offers:',
    blog: 'Latest blog posts:',
    stats: 'By the numbers:',
    available: `Yes — Stefan is currently available for new projects (freelance / contract). Feel free to reach out via the contact form below or drop him an email at ${EMAIL} — he usually replies within a day.`,
    rate: `Rates depend on engagement length and scope. Share a brief via the contact form or email ${EMAIL} and Stefan will get back to you within a day.`,
    contact: `Ways to reach Stefan:\n• Email: ${EMAIL}\n• LinkedIn: linkedin.com/in/stefankimak\n• GitHub: github.com/stefankimak\n• Or use the contact form below — usually replies within a day.`,
    location: "Stefan works remotely from Europe (CET) and collaborates with teams worldwide. He's comfortable overlapping with US Eastern hours when needed.",
    language: 'He speaks English fluently, plus Slovak and Czech.',
    experience: '15+ years of professional development, 80+ shipped projects, 30+ happy clients and 5+ AI integrations in production.',
    cv: `Stefan's CV is available on request — drop a note via the contact form below or email ${EMAIL} and he'll send the latest version.`,
    cvFile: "Stefan's CV is available as a PDF — use the link below.",
    who: 'Stefan Kimak is a senior full-stack & AI engineer specializing in PHP (Drupal, Symfony, Laravel), Vue.js and AI integrations — 15+ years of experience, available for freelance & contract work.',
    fallback: 'I\'m a quick-answers bot grounded in this site\'s content. Try asking about the stack, a specific project (e.g. "Tell me about the AI assistant"), services, blog posts, availability, rates or contact details.',
  },
  sk: {
    role: 'Rola',
    problem: 'Problém',
    solution: 'Riešenie',
    results: 'Kľúčové výsledky',
    greet: 'Ahoj! Som bot rýchlych odpovedí o Stefanovi — vychádzam z obsahu tejto stránky. Pýtajte sa na jeho stack, projekty, služby, blog, dostupnosť alebo kontakt.',
    stack: 'Stefanov každodenný stack:\n• PHP 8.4, Drupal 7/8/9/10/11, Symfony 7, Laravel 11\n• Vue 3 (Composition API + Pinia), Nuxt 3, TypeScript, Vite\n• AI: OpenAI, Anthropic, LangChain, RAG, pgvector\n• DevOps: Docker, GitHub Actions, AWS',
    drupal: 'Drupal je jedna zo Stefanových špecializácií — vlastné moduly, headless riešenia (JSON:API / GraphQL), multi-site platformy, migrácie a Search API. Acquia certifikácia.\n\nDrupal projekty:',
    symfony: 'V Symfony Stefan dodáva stabilné REST/GraphQL API s API Platform, Messenger frontami a architektúrou v duchu DDD. Symfony certifikácia.\n\nSymfony projekty:',
    laravel: 'V Laraveli stavia multi-tenant SaaS produkty s Eloquentom, Inertia/Vue, frontami (Horizon), Reverb pre realtime a Cashier+Stripe pre platby.\n\nLaravel projekty:',
    vue: 'Vue 3 + Composition API + Pinia je jeho preferovaný frontend stack, často s Nuxt 3 pre SSR.\n\nVue.js projekty:',
    ai: 'Stefan integruje LLM modely do klasických webových aplikácií: RAG pipelines nad pgvector, OpenAI / Anthropic API, function calling, agenti a automatizácie obsahu.\n\nAI projekty:',
    portfolio: 'Nedávne projekty (celú prípadovú štúdiu otvoríte na stránke):',
    services: 'Služby, ktoré Stefan ponúka:',
    blog: 'Najnovšie články na blogu:',
    stats: 'V číslach:',
    available: `Áno — Stefan je momentálne voľný pre nové projekty (freelance / kontrakt). Napíšte cez kontaktný formulár nižšie alebo na ${EMAIL} — zvyčajne odpovedá do jedného dňa.`,
    rate: `Cena závisí od dĺžky a rozsahu spolupráce. Pošlite stručné zadanie cez kontaktný formulár alebo na ${EMAIL} a Stefan sa ozve do jedného dňa.`,
    contact: `Ako Stefana kontaktovať:\n• E-mail: ${EMAIL}\n• LinkedIn: linkedin.com/in/stefankimak\n• GitHub: github.com/stefankimak\n• Alebo cez kontaktný formulár nižšie — zvyčajne odpovedá do jedného dňa.`,
    location: 'Stefan pracuje na diaľku z Európy (CET) a spolupracuje s tímami z celého sveta. V prípade potreby sa vie časovo prekryť aj s východným pobrežím USA.',
    language: 'Hovorí plynule po anglicky, slovensky a česky.',
    experience: '15+ rokov profesionálneho vývoja, 80+ dodaných projektov, 30+ spokojných klientov a 5+ AI integrácií v produkcii.',
    cv: `Stefanov životopis je k dispozícii na požiadanie — napíšte cez kontaktný formulár nižšie alebo na ${EMAIL} a pošle aktuálnu verziu.`,
    cvFile: 'Stefanov životopis je k dispozícii ako PDF — stiahnete ho cez odkaz nižšie.',
    who: 'Stefan Kimak je senior full-stack a AI vývojár so zameraním na PHP (Drupal, Symfony, Laravel), Vue.js a AI integrácie — 15+ rokov skúseností, voľný pre freelance a kontraktnú prácu.',
    fallback: 'Som bot rýchlych odpovedí a vychádzam z obsahu tejto stránky. Skúste sa spýtať na stack, konkrétny projekt (napr. „Povedz mi o AI asistentovi“), služby, blog, dostupnosť, cenu alebo kontakt.',
  },
};

// Lower-case and strip diacritics so Slovak questions match plain-ASCII keywords.
const normalize = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
// Lower-case a label's first letter, leaving acronyms such as AI or WCAG alone.
const lower = (s) => (/^[A-ZÀ-Ž][a-zà-ž]/.test(s) ? s[0].toLowerCase() + s.slice(1) : s);
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const wordHit = (haystack, needle) => new RegExp(`\\b${escapeRe(needle)}(s|es)?\\b`, 'i').test(haystack);

const reply = (item) => ({ text: item.answer(), link: item.link });

const STOP = new Set(['the', 'a', 'an', 'is', 'are', 'of', 'to', 'for', 'and', 'or', 'in', 'on', 'what', 'how', 'can', 'do', 'does', 'with', 'your', 'you', 'me', 'i', 'my', 'his', 'her', 'its', 'about', 'tell', 'please', 'show', 'some', 'any', 'je', 'si', 'mi', 'o', 'ako', 'aky', 'ake', 'ta', 'povedz', 'ukaz']);
const tokenize = (s) => s.replace(/[^a-z0-9+\-#.\s]/g, ' ').split(/\s+/).filter((t) => t && !STOP.has(t));

// Project ids → phrases that ask for that case study.
const PROJECT_ALIASES = {
  member: ['member portal', 'membership', 'association', 'dues', 'clensky portal', 'clenskom portali', 'clenstvo', 'asociacia', 'asociacie'],
  permits: ['submission portal', 'permit', 'paperless', 'municipal', 'ziadosti', 'podania'],
  transit: ['transport portal', 'transit', 'timetable', 'stop finder', 'doprava', 'dopravy', 'cestovne poriadky'],
  bank: ['bank', 'banking', 'regional bank', 'banka', 'banky'],
  aid: ['multi-site', 'multisite', 'humanitarian', 'ngo', 'donation', 'humanitarna', 'humanitarnej', 'pobocky'],
  b2b: ['b2b', 'e-commerce', 'ecommerce', 'storefront', 'ordering', 'objednavky', 'objednavkovy'],
  configurator: ['configurator', '3d configurator', 'webgl', 'konfigurator'],
  learning: ['knowledge assistant', 'rag', 'training institute', 'learning assistant', 'ai assistant', 'ai asistent', 'ai asistentovi', 'vzdelavacia', 'vzdelavaciu'],
};

const TECH = ['drupal', 'symfony', 'api platform', 'laravel', 'eloquent', 'inertia', 'livewire', 'vue', 'vue.js', 'vuejs', 'nuxt', 'pinia', 'ai', 'llm', 'openai', 'gpt', 'embedding', 'pgvector', 'langchain', 'anthropic', 'vector db', 'vector database'];

function buildKnowledge(lang) {
  const t = TEXT[lang];
  const c = CONTENT[lang];
  const cases = CASE_STUDIES[lang];

  const summary = (id) => {
    const s = cases[id];
    const top = s.metrics[0];
    return `• ${s.title} — ${s.tags.join(', ')} (${top.value} ${lower(top.label)})`;
  };
  const byTag = (re) => Object.keys(cases).filter((id) => cases[id].tags.some((tag) => re.test(tag))).map(summary).join('\n');
  const detail = (id) => ({ text: detailText(id), link: { caseId: id } });
  const detailText = (id) => {
    const s = cases[id];
    const metrics = s.metrics.map((m) => `${m.value} ${lower(m.label)}`).join(', ');
    return `${s.title} — ${s.tags.join(', ')}\n${t.role}: ${s.role}, ${s.duration}\n\n${t.problem}: ${s.problem}\n\n${t.solution}: ${s.solution}\n\n${t.results}: ${metrics}`;
  };
  const services = [...c.services.pillars, ...c.services.more];

  const knowledge = [
    { keywords: ['hello', 'hi', 'hey', 'good morning', 'good evening', 'ahoj', 'cau', 'dobry den', 'zdravim'], answer: () => t.greet },
    { keywords: ['stack', 'tech', 'technology', 'technologies', 'tools', 'what do you use', 'technologie', 'nastroje'], answer: () => t.stack },
    { keywords: ['drupal'], answer: () => `${t.drupal}\n${byTag(/drupal/i)}`, link: { hash: '#work' } },
    { keywords: ['symfony', 'api platform'], answer: () => `${t.symfony}\n${byTag(/symfony/i)}`, link: { hash: '#work' } },
    { keywords: ['laravel', 'eloquent', 'inertia', 'livewire'], answer: () => `${t.laravel}\n${byTag(/laravel/i)}`, link: { hash: '#work' } },
    { keywords: ['vue', 'vue.js', 'nuxt', 'frontend', 'spa', 'pinia'], answer: () => `${t.vue}\n${byTag(/vue/i)}`, link: { hash: '#work' } },
    { keywords: ['ai', 'llm', 'openai', 'gpt', 'embedding', 'vector', 'pgvector', 'langchain', 'anthropic', 'umela inteligencia'], answer: () => `${t.ai}\n${byTag(/\bai\b|openai|gpt|rag|vector/i)}`, link: { hash: '#work' } },
    { keywords: ['portfolio', 'project', 'case study', 'examples', 'projekty', 'pripadova studia', 'ukazky'], answer: () => `${t.portfolio}\n${Object.keys(cases).map(summary).join('\n')}`, link: { hash: '#work' } },
    { keywords: ['service', 'help with', 'offer', 'what can you do', 'sluzby', 'ponukas', 'ponuka'], answer: () => `${t.services}\n${services.map((s) => `• ${s.title} — ${s.body}`).join('\n')}`, link: { hash: '#services' } },
    { keywords: ['blog', 'article', 'writing', 'post', 'clanky', 'clanok'], answer: () => `${t.blog}\n${c.blog.posts.map((p) => `• ${p.title} (${p.read}, ${c.blog.soon}) — ${p.body}`).join('\n')}` },
    { keywords: ['stat', 'numbers', 'metric', 'how many', 'cisla', 'kolko'], answer: () => `${t.stats}\n${METRIC_VALUES.map((v, i) => `• ${v}+ ${lower(c.metrics.labels[i])}`).join('\n')}` },
    { keywords: ['available', 'availability', 'hire', 'busy', 'capacity', 'free', 'taking on', 'volny', 'dostupny', 'dostupnost', 'kapacita'], answer: () => t.available, link: { hash: '#contact' } },
    { keywords: ['rate', 'price', 'cost', 'budget', 'fee', 'how much', 'cena', 'sadzba', 'rozpocet', 'kolko stoji'], answer: () => t.rate, link: { hash: '#contact' } },
    { keywords: ['contact', 'email', 'reach', 'message', 'mail', 'get in touch', 'talk', 'kontakt', 'kontaktujem', 'kontaktovat', 'e-mail', 'napisat'], answer: () => t.contact, link: { hash: '#contact' } },
    { keywords: ['location', 'where', 'based', 'remote', 'timezone', 'time zone', 'country', 'kde', 'odkial', 'lokalita'], answer: () => t.location },
    { keywords: ['language', 'speak', 'english', 'slovak', 'czech', 'jazyk', 'jazyky', 'hovoris', 'hovori'], answer: () => t.language },
    { keywords: ['experience', 'years', 'how long', 'seniority', 'senior', 'skusenosti', 'rokov'], answer: () => t.experience },
    { keywords: ['cv', 'resume', 'zivotopis'], answer: () => (CV_URL ? t.cvFile : t.cv), link: CV_URL ? { href: CV_URL, key: 'cv' } : { hash: '#contact' } },
    { keywords: ['who are you', 'who is stefan', 'about stefan', 'introduce', 'bio', 'kto je stefan', 'kto si'], answer: () => t.who },
  ];
  return { knowledge, detail, fallback: { text: t.fallback } };
}

/** Returns { text, link? }; link is { hash } for a home section or { caseId } for a case study page. */
export function answerFor(question, lang) {
  const { knowledge, detail, fallback } = buildKnowledge(lang);
  const q = normalize(question);

  for (const [id, aliases] of Object.entries(PROJECT_ALIASES)) {
    if (aliases.some((a) => wordHit(q, a))) return detail(id);
  }
  if (TECH.some((w) => wordHit(q, w))) {
    const item = knowledge.find((k) => k.keywords.some((kw) => wordHit(q, kw)));
    if (item) return reply(item);
  }
  const tokens = tokenize(q);
  let best = null;
  let bestScore = 0;
  for (const item of knowledge) {
    let score = 0;
    for (const k of item.keywords) {
      if (wordHit(q, k)) score += k.length * 2;
      const kt = tokenize(k);
      for (const tok of tokens) if (kt.includes(tok)) score += 4;
    }
    if (score > bestScore) {
      best = item;
      bestScore = score;
    }
  }
  return best ? reply(best) : fallback;
}
