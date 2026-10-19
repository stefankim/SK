export const EMAIL = 'hello@stefankimak.dev';
// Public address of the site root, without a trailing slash (VITE_SITE_URL at build time).
export const SITE_URL = (import.meta.env?.VITE_SITE_URL || 'https://stefankimak.dev').replace(/\/$/, '');
export const LANGS = ['en', 'sk'];
export const LANG_PATH = { en: '/', sk: '/sk/' };

// Formspree (or any JSON form) endpoint, set as VITE_FORM_ENDPOINT in .env.
// While empty, the form opens a pre-filled mailto: draft instead.
export const FORM_ENDPOINT = import.meta.env?.VITE_FORM_ENDPOINT || '';

export const SOCIAL = [
  { href: 'https://github.com/stefankimak', label: 'github.com/stefankimak', icon: 'github' },
  { href: 'https://linkedin.com/in/stefankimak', label: 'linkedin.com/in/stefankimak', icon: 'linkedin' },
  { href: 'https://x.com/stefankimak_dev', label: '@stefankimak_dev', icon: 'x' },
];

export const CLIENTS = [
  { href: 'https://www.improve.sk/', name: 'improve.sk' },
  { href: 'https://www.previon.ch/', name: 'previon.ch' },
];

// Portfolio filters: id is the ?filter= value, label is a technology name (not translated).
export const FILTERS = [
  { id: 'drupal', label: 'Drupal' },
  { id: 'symfony', label: 'Symfony' },
  { id: 'laravel', label: 'Laravel' },
  { id: 'vue', label: 'Vue.js' },
  { id: 'ai', label: 'AI' },
];

// Project ids match the keys in caseStudies.js.
export const PROJECTS = [
  { id: 'member', tags: ['drupal', 'vue'] },
  { id: 'permits', tags: ['drupal', 'ai'] },
  { id: 'transit', tags: ['drupal', 'vue'] },
  { id: 'bank', tags: ['drupal'] },
  { id: 'aid', tags: ['drupal'] },
  { id: 'b2b', tags: ['symfony', 'vue'] },
  { id: 'configurator', tags: ['laravel', 'vue'] },
  { id: 'learning', tags: ['symfony', 'ai'] },
];

// The blog section stays hidden until the first post is published.
export const SHOW_BLOG = false;

// Content slots: each renders nothing while empty. Only add material that is real and approved.
// Client quotes, shown under the metrics: { quote: { en, sk }, name, role: { en, sk }, company }.
export const TESTIMONIALS = [];
// Client logos (SVG in public/logos/), shown under the metrics: { name, src: '/logos/x.svg', href }.
export const CLIENT_LOGOS = [];
// CV as a PDF in public/, e.g. '/stefan-kimak-cv.pdf'. Linked from the About card and the chat.
export const CV_URL = '';
// Scheduling link (Cal.com, Calendly …). Adds a "Book a call" button to the hero and contact section.
export const BOOKING_URL = '';

export const METRIC_VALUES = [15, 80, 30, 5];

export const STACK_NAMES = ['PHP 8.4', 'Drupal 7 – 11', 'Symfony 7', 'Laravel 11', 'Vue.js 3'];

// Code shown next to the three headline services.
export const PILLAR_CODE = [
  {
    file: 'CaseController.php',
    code: [
      [['c', '#[Route('], ['s', "'/cases'"], ['c', ')]']],
      [['k', 'public function '], ['f', 'list'], ['', '(): JsonResponse']],
      [['', '{']],
      [['k', '  return '], ['', '$this->json($this->cases'], ['f', '->published'], ['', '());']],
      [['', '}']],
    ],
  },
  {
    file: 'Stack.vue',
    code: [
      [['k', '<script setup '], ['f', 'lang'], ['', '='], ['s', '"ts"'], ['k', '>']],
      [['k', 'const '], ['', 'stack = '], ['f', 'ref'], ['', '([']],
      [['s', "  'Vue 3'"], ['', ', '], ['s', "'Pinia'"], ['', ', '], ['s', "'Nuxt'"], ['', ',']],
      [['', ']);']],
      [['k', '</script>']],
    ],
  },
  {
    file: 'AskService.php',
    code: [
      [['', '$answer = $rag']],
      [['', '  ->'], ['f', 'retrieve'], ['', '($q)']],
      [['', '  ->'], ['f', 'withCitations'], ['', '()']],
      [['', '  ->'], ['f', 'generate'], ['', '();']],
      [['c', '// pgvector · OpenAI · Anthropic']],
    ],
  },
];

const en = {
  meta: {
    locale: 'en_US',
    title: 'Stefan Kimak — PHP / Drupal 7/8/9/10/11 / Symfony / Laravel / Vue.js / AI Developer',
    description: 'Stefan Kimak — senior full-stack developer specializing in PHP, Drupal 7/8/9/10/11, Symfony, Laravel, Vue.js and AI integrations.',
    ogDescription: 'Senior full-stack engineer building scalable platforms with Drupal 7/8/9/10/11, Symfony, Laravel and modern Vue.js, enriched with AI-driven features that make products smarter.',
    twitterTitle: 'Stefan Kimak — PHP / Drupal 7/8/9/10/11 / Vue.js / AI Developer',
    twitterDescription: 'Senior full-stack engineer building scalable platforms with Drupal 7/8/9/10/11, Symfony, Laravel, Vue.js and AI.',
    imageAlt: 'Stefan Kimak — senior full-stack and AI engineer: PHP, Drupal, Symfony, Laravel, Vue.js.',
    keywords: 'Stefan Kimak, PHP developer, Drupal 7/8/9/10/11 developer, Drupal migrations, Symfony developer, Laravel developer, Vue.js developer, AI engineer, full-stack',
  },
  nav: {
    links: [
      { href: '#about', label: 'About' },
      { href: '#services', label: 'Services' },
      { href: '#work', label: 'Portfolio' },
      { href: '#stack', label: 'Stack' },
      { href: '#contact', label: 'Contact' },
    ],
    email: 'Send an email',
    book: 'Book a call',
    cv: 'Download CV (PDF)',
    skip: 'Skip to content',
    main: 'Main',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    theme: 'Toggle light/dark theme',
    langSwitch: 'Switch to Slovak',
    langShort: 'SK',
  },
  hero: {
    badge: 'Available for new projects',
    lines: ['Crafting intelligent', 'web experiences', 'with PHP, Vue.js & AI.'],
    intro: "I'm Stefan Kimak — a senior full-stack engineer building scalable platforms with Drupal, Symfony, Laravel, and modern Vue.js frontends, enriched with AI-driven features that make products smarter.",
    ctaPortfolio: 'View portfolio',
    ctaEmail: 'Send an email',
  },
  about: {
    title: '15 years of shipping production-grade PHP & JavaScript.',
    lead: "I help startups and enterprises ship robust, maintainable web platforms — from headless Drupal publishing systems and Symfony APIs to Laravel SaaS products and reactive Vue.js interfaces. Lately, I've been integrating LLMs and vector search to give classic apps superpowers.",
    focus: [
      'Architecting modular, test-driven PHP backends',
      'Headless & decoupled Drupal / Symfony / Laravel APIs',
      'Vue 3 + Composition API + Pinia + TypeScript SPAs',
      'OpenAI, LangChain, RAG pipelines & vector databases',
      'DevOps with Docker, CI/CD, AWS & observability',
    ],
    subtitle: 'Senior Full-Stack & AI Engineer',
    facts: ['Remote, Europe', 'Freelance & contract', 'English, Slovak, Czech'],
  },
  services: {
    title: 'How I can help',
    pillars: [
      { title: 'Backend Architecture', body: 'Design and build scalable PHP backends with Drupal, Symfony or Laravel — from greenfield to rescue missions.' },
      { title: 'Frontend Engineering', body: 'Modern Vue.js 3 SPAs, Nuxt sites and design-system component libraries with TypeScript.' },
      { title: 'AI Integration', body: 'Add LLMs, RAG, vector search and intelligent automations to your existing product — pragmatically.' },
    ],
    more: [
      { title: 'Performance & Audits', body: 'Code reviews, performance audits, security hardening and observability for legacy PHP apps.' },
      { title: 'Team Augmentation', body: 'Embed with your team as a senior IC — mentoring, pairing and pushing the codebase forward.' },
      { title: 'Technical Consulting', body: 'Architecture reviews, tech-stack decisions and roadmap planning for product & engineering leaders.' },
    ],
  },
  metrics: {
    aria: 'Track record',
    labels: ['Years experience', 'Projects delivered', 'Happy clients', 'AI integrations'],
    trusted: 'Trusted by Drupal agencies in Slovakia and Switzerland for long-running platform work.',
    clientNotes: ['Long-term Drupal contract', 'Swiss Drupal agency'],
  },
  work: {
    title: 'Selected work',
    lead: "A glimpse at recent platforms, products and AI integrations I've shipped.",
    all: 'All',
    filterAria: 'Filter projects',
    techAria: 'Technologies',
    caseLink: 'Case study',
    showing: (n, label) => (label ? `Showing ${n} ${label} project${n === 1 ? '' : 's'}.` : `Showing all ${n} projects.`),
    projects: {
      member: { title: 'Association Member Portal', body: 'Self-service member portal with automated dues, invoicing and event registration — 80% less admin.' },
      permits: { title: 'Municipal Submission Portal', body: 'Paper submissions replaced by guided online forms with AI-assisted document parsing and approval workflows.' },
      transit: { title: 'Public Transport Portal', body: 'Mobile-first timetable, stop finder and disruption feed for a city operator serving thousands of riders daily.' },
      bank: { title: 'Regional Bank Relaunch', body: 'Component-driven Drupal platform with a shared design system, central product data and WCAG AA compliance.' },
      aid: { title: 'Humanitarian Multi-Site Platform', body: '30+ regional chapters consolidated onto one Drupal platform with shared donation and volunteer flows.' },
      b2b: { title: 'B2B Ordering Ecosystem', body: 'Symfony + API Platform backend with a Vue 3 ordering front end, contract pricing and bidirectional ERP sync.' },
      configurator: { title: '3D Product Configurator', body: 'Laravel + Vue 3 configurator rendering products live in the browser and turning visits into qualified enquiries.' },
      learning: { title: 'AI Assistant for a Training Institute', body: 'Symfony + pgvector RAG assistant answering staff and learner questions with citations from years of material.' },
    },
  },
  caseStudy: {
    problem: 'The problem',
    solution: 'The solution',
    stack: 'Tech stack',
    close: 'Close case study',
    full: 'Full case study',
    back: 'All projects',
    prev: 'Previous project',
    next: 'Next project',
    pageTitle: (title) => `${title} — case study by Stefan Kimak`,
  },
  notFound: {
    title: 'Page not found',
    body: "This page doesn't exist or has moved.",
    home: 'Go to the home page',
  },
  stack: {
    title: 'Tools I use every day',
    lead: 'From battle-tested PHP frameworks to cutting-edge AI tooling.',
    aiName: 'AI & LLMs',
    bodies: [
      'Modern, typed, attribute-driven PHP. The reliable engine behind every backend I build.',
      'Custom modules, headless setups, migrations (D7→D10/11), multi-site & enterprise content platforms.',
      'API Platform, Messenger, DDD-flavored architectures & rock-solid REST/GraphQL APIs.',
      'Eloquent, Livewire, Inertia, queues & rapid SaaS delivery without sacrificing quality.',
      'Composition API, Pinia, Nuxt, Vite — beautiful, performant SPAs and dashboards.',
      'OpenAI, Anthropic, LangChain, RAG, embeddings, vector DBs, agents & smart automations.',
    ],
  },
  blog: {
    title: 'Latest from the blog',
    lead: 'Notes on PHP, Vue and shipping AI features without losing your mind.',
    soon: 'coming soon',
    posts: [
      { read: '8 min read', title: 'Building a RAG pipeline in Symfony with pgvector', body: "How to combine API Platform, OpenAI embeddings and PostgreSQL's pgvector for production-grade retrieval." },
      { read: '6 min read', title: 'Headless Drupal + Nuxt: a pragmatic setup', body: 'JSON:API, content previews, image styles and ISR — a battle-tested decoupled architecture.' },
      { read: '5 min read', title: 'Vue 3 patterns I actually use in production', body: 'Composition API, composables, Pinia stores and the structure that keeps large SPAs maintainable.' },
    ],
  },
  faq: {
    title: 'Common questions',
    items: [
      { q: 'Are you available for new projects?', a: `Yes. I'm available for new freelance and contract projects. Send a message through the contact form or email ${EMAIL} — I usually reply within a day.` },
      { q: 'What technologies do you work with?', a: 'PHP 8.4 with Drupal 7 to 11, Symfony 7 and Laravel 11 on the backend; Vue 3, Nuxt and TypeScript on the frontend; and AI integrations with OpenAI, Anthropic, LangChain, RAG and pgvector. For DevOps I use Docker, CI/CD and AWS.' },
      { q: 'Can you migrate a Drupal 7 site to Drupal 10 or 11?', a: 'Yes. Drupal migrations from D7 to D10/11 are a regular part of my work, including automated content migration with the Migrate API and preserved redirects, so legacy URLs keep working.' },
      { q: 'Can you add AI features to an existing application?', a: 'Yes. I add LLM features to existing PHP and Vue.js products: RAG assistants on pgvector that answer with citations, AI-assisted document parsing, vector search and automations.' },
      { q: 'Where are you based and which languages do you speak?', a: 'I work remotely from Europe (CET) with teams worldwide. I speak English, Slovak and Czech.' },
      { q: 'How much does a project cost?', a: `Rates depend on the length and scope of the engagement. Send a short brief through the contact form or to ${EMAIL} and I'll reply within a day.` },
    ],
  },
  contact: {
    title: "Let's build something great.",
    lead: 'Got a project in mind, a legacy app to modernise, or want to add AI to an existing product? Drop a message — I usually reply within a day.',
    copy: 'Copy address',
    copied: 'Copied',
    name: 'Name',
    namePh: 'Your name',
    email: 'Email',
    emailPh: 'you@company.com',
    type: 'Project type',
    types: ['Drupal project', 'Symfony project', 'Laravel project', 'Vue.js / Frontend', 'AI integration', 'Other'],
    message: 'Message',
    messagePh: 'Tell me about your project…',
    send: 'Send message',
    sending: 'Sending…',
    errors: {
      name: 'Enter your name.',
      email: 'Enter a valid email address, like you@company.com.',
      message: 'Tell me a little about your project.',
    },
    sent: (name) => `Thanks ${name}! Your message is on its way — I'll get back to you soon.`,
    mailto: 'Your email app opened with the message filled in.',
    error: `Something went wrong. Please email ${EMAIL} directly.`,
  },
  footer: {
    copyright: (year) => `© ${year} Stefan Kimak. Crafted with PHP, Vue & ☕.`,
  },
  chat: {
    fab: 'Quick answers',
    open: 'Open quick-answers bot',
    close: 'Close quick-answers',
    ask: 'Ask a question',
    send: 'Send question',
    links: { cv: 'Download the CV (PDF)', '#contact': 'Go to the contact form', '#work': 'See the portfolio', '#services': 'See all services', case: 'Open the case study' },
    placeholder: 'Ask about my stack, projects, AI work…',
    welcome: "👋 Hi! I'm Stefan's quick-answers bot. Ask me about his stack, projects or availability.",
    suggestions: [
      "What's the stack?",
      'Show me AI projects',
      'Tell me about the member portal',
      'What services do you offer?',
      'Are you available?',
      'How do I contact you?',
    ],
  },
};

const sk = {
  meta: {
    locale: 'sk_SK',
    title: 'Stefan Kimak — PHP / Drupal 7/8/9/10/11 / Symfony / Laravel / Vue.js / AI vývojár',
    description: 'Stefan Kimak — senior full-stack vývojár so zameraním na PHP, Drupal 7/8/9/10/11, Symfony, Laravel, Vue.js a AI integrácie.',
    ogDescription: 'Senior full-stack vývojár, ktorý buduje škálovateľné platformy v Drupale 7/8/9/10/11, Symfony, Laraveli a modernom Vue.js, obohatené o AI funkcie, ktoré robia produkty inteligentnejšími.',
    twitterTitle: 'Stefan Kimak — PHP / Drupal 7/8/9/10/11 / Vue.js / AI vývojár',
    twitterDescription: 'Senior full-stack vývojár, ktorý buduje škálovateľné platformy v Drupale 7/8/9/10/11, Symfony, Laraveli, Vue.js a s AI.',
    imageAlt: 'Stefan Kimak — senior full-stack a AI vývojár: PHP, Drupal, Symfony, Laravel, Vue.js.',
    keywords: 'Stefan Kimak, PHP vývojár, Drupal 7/8/9/10/11 vývojár, Drupal migrácie, Symfony vývojár, Laravel vývojár, Vue.js vývojár, AI vývojár, full-stack',
  },
  nav: {
    links: [
      { href: '#about', label: 'O mne' },
      { href: '#services', label: 'Služby' },
      { href: '#work', label: 'Portfólio' },
      { href: '#stack', label: 'Technológie' },
      { href: '#contact', label: 'Kontakt' },
    ],
    email: 'Napísať e-mail',
    book: 'Dohodnúť hovor',
    cv: 'Stiahnuť životopis (PDF)',
    skip: 'Preskočiť na obsah',
    main: 'Hlavná navigácia',
    openMenu: 'Otvoriť menu',
    closeMenu: 'Zavrieť menu',
    theme: 'Prepnúť svetlú/tmavú tému',
    langSwitch: 'Prepnúť na angličtinu',
    langShort: 'EN',
  },
  hero: {
    badge: 'Voľný pre nové projekty',
    lines: ['Vytváram inteligentné', 'webové riešenia', 's PHP, Vue.js a AI.'],
    intro: 'Som Stefan Kimak — senior full-stack vývojár, ktorý buduje škálovateľné platformy v Drupale, Symfony, Laraveli a moderných Vue.js frontendoch, obohatené o AI funkcie, ktoré robia produkty inteligentnejšími.',
    ctaPortfolio: 'Pozrieť portfólio',
    ctaEmail: 'Napísať e-mail',
  },
  about: {
    title: '15 rokov budovania produkčných PHP a JavaScript aplikácií.',
    lead: 'Pomáham startupom aj veľkým firmám dodávať robustné, udržateľné webové platformy — od headless Drupal publikačných systémov a Symfony API cez Laravel SaaS produkty až po reaktívne Vue.js rozhrania. V poslednom čase integrujem LLM modely a vektorové vyhľadávanie, aby som klasickým aplikáciám dodal superschopnosti.',
    focus: [
      'Návrh modulárnych, testami pokrytých PHP backendov',
      'Headless a oddelené Drupal / Symfony / Laravel API',
      'Vue 3 + Composition API + Pinia + TypeScript SPA',
      'OpenAI, LangChain, RAG pipelines a vektorové databázy',
      'DevOps s Dockerom, CI/CD, AWS a monitoringom',
    ],
    subtitle: 'Senior Full-Stack a AI vývojár',
    facts: ['Remote, Európa', 'Freelance a kontrakt', 'angličtina, slovenčina, čeština'],
  },
  services: {
    title: 'Ako vám viem pomôcť',
    pillars: [
      { title: 'Backend architektúra', body: 'Návrh a stavba škálovateľných PHP backendov s Drupalom, Symfony alebo Laravelom — od greenfield projektov po záchranné misie.' },
      { title: 'Frontend engineering', body: 'Moderné Vue.js 3 SPA, Nuxt stránky a komponentové knižnice s TypeScriptom.' },
      { title: 'AI integrácia', body: 'Pridajte do existujúceho produktu LLM, RAG, vektorové vyhľadávanie a inteligentné automatizácie — pragmaticky.' },
    ],
    more: [
      { title: 'Výkon a audity', body: 'Code review, audity výkonu, bezpečnostné spevnenie a monitoring pre staršie PHP aplikácie.' },
      { title: 'Posilnenie tímu', body: 'Pripojím sa k vášmu tímu ako senior IC — mentoring, pair programming a posun kódovej základne vpred.' },
      { title: 'Technické konzultácie', body: 'Audit architektúry, výber technológií a plánovanie roadmapy pre produktových a engineering lídrov.' },
    ],
  },
  metrics: {
    aria: 'Výsledky v číslach',
    labels: ['rokov skúseností', 'dodaných projektov', 'spokojných klientov', 'AI integrácií'],
    trusted: 'Dlhodobo pracujem na platformách pre Drupal agentúry na Slovensku a vo Švajčiarsku.',
    clientNotes: ['Dlhodobý Drupal kontrakt', 'Švajčiarska Drupal agentúra'],
  },
  work: {
    title: 'Vybrané projekty',
    lead: 'Ukážka nedávnych platforiem, produktov a AI integrácií, ktoré som dodal.',
    all: 'Všetko',
    filterAria: 'Filtrovať projekty',
    techAria: 'Technológie',
    caseLink: 'Prípadová štúdia',
    showing: (n, label) => (label ? `Zobrazené projekty ${label}: ${n}.` : `Zobrazené všetky projekty: ${n}.`),
    projects: {
      member: { title: 'Členský portál asociácie', body: 'Samoobslužný členský portál s automatickými poplatkami, fakturáciou a registráciou na podujatia — o 80 % menej administratívy.' },
      permits: { title: 'Portál na podávanie žiadostí', body: 'Papierové podania nahradené sprievodnými online formulármi s AI spracovaním dokumentov a schvaľovacím workflow.' },
      transit: { title: 'Portál mestskej dopravy', body: 'Mobile-first cestovné poriadky, vyhľadávanie zastávok a výluky pre dopravcu s tisíckami cestujúcich denne.' },
      bank: { title: 'Relaunch regionálnej banky', body: 'Komponentová Drupal platforma so spoločným dizajn systémom, centrálnymi produktovými dátami a WCAG AA.' },
      aid: { title: 'Multi-site platforma humanitárnej organizácie', body: '30+ regionálnych pobočiek zjednotených na jednej Drupal platforme so spoločnými darovacími a dobrovoľníckymi tokmi.' },
      b2b: { title: 'B2B objednávkový ekosystém', body: 'Symfony + API Platform backend s Vue 3 objednávkovým rozhraním, zmluvnými cenami a obojsmernou synchronizáciou s ERP.' },
      configurator: { title: '3D konfigurátor produktov', body: 'Laravel + Vue 3 konfigurátor, ktorý vykresľuje produkt naživo v prehliadači a mení návštevy na kvalifikované dopyty.' },
      learning: { title: 'AI asistent pre vzdelávaciu inštitúciu', body: 'Symfony + pgvector RAG asistent odpovedajúci zamestnancom a študentom s citáciami z rokov materiálov.' },
    },
  },
  caseStudy: {
    problem: 'Problém',
    solution: 'Riešenie',
    stack: 'Technológie',
    close: 'Zavrieť prípadovú štúdiu',
    full: 'Celá prípadová štúdia',
    back: 'Všetky projekty',
    prev: 'Predchádzajúci projekt',
    next: 'Ďalší projekt',
    pageTitle: (title) => `${title} — prípadová štúdia, Stefan Kimak`,
  },
  notFound: {
    title: 'Stránka sa nenašla',
    body: 'Táto stránka neexistuje alebo bola presunutá.',
    home: 'Prejsť na úvodnú stránku',
  },
  stack: {
    title: 'Nástroje, ktoré používam každý deň',
    lead: 'Od osvedčených PHP frameworkov po moderné AI nástroje.',
    aiName: 'AI a LLM',
    bodies: [
      'Moderné, typované, atribútové PHP. Spoľahlivý motor každého backendu, ktorý postavím.',
      'Vlastné moduly, headless riešenia, migrácie (D7→D10/11), multi-site a enterprise obsahové platformy.',
      'API Platform, Messenger, architektúra v duchu DDD a stabilné REST/GraphQL API.',
      'Eloquent, Livewire, Inertia, queues a rýchle SaaS dodávky bez kompromisov v kvalite.',
      'Composition API, Pinia, Nuxt, Vite — pekné, výkonné SPA a dashboardy.',
      'OpenAI, Anthropic, LangChain, RAG, embeddingy, vektorové DB, agenti a inteligentné automatizácie.',
    ],
  },
  blog: {
    title: 'Najnovšie z blogu',
    lead: 'Poznámky o PHP, Vue a dodávaní AI funkcií bez straty rozumu.',
    soon: 'pripravujem',
    posts: [
      { read: '8 min čítania', title: 'Stavba RAG pipeline v Symfony s pgvector', body: 'Ako skombinovať API Platform, OpenAI embeddingy a PostgreSQL pgvector pre produkčné vyhľadávanie.' },
      { read: '6 min čítania', title: 'Headless Drupal + Nuxt: pragmatický setup', body: 'JSON:API, náhľady obsahu, image styles a ISR — overená oddelená architektúra.' },
      { read: '5 min čítania', title: 'Vue 3 vzory, ktoré reálne používam v produkcii', body: 'Composition API, composables, Pinia store-y a štruktúra, ktorá udrží veľké SPA udržateľné.' },
    ],
  },
  faq: {
    title: 'Časté otázky',
    items: [
      { q: 'Ste voľný pre nové projekty?', a: `Áno. Som voľný pre nové freelance a kontraktné projekty. Napíšte cez kontaktný formulár alebo na ${EMAIL} — zvyčajne odpovedám do jedného dňa.` },
      { q: 'S akými technológiami pracujete?', a: 'Na backende PHP 8.4 s Drupalom 7 až 11, Symfony 7 a Laravelom 11; na frontende Vue 3, Nuxt a TypeScript; a AI integrácie s OpenAI, Anthropic, LangChain, RAG a pgvector. Pre DevOps používam Docker, CI/CD a AWS.' },
      { q: 'Viete zmigrovať web z Drupalu 7 na Drupal 10 alebo 11?', a: 'Áno. Migrácie z D7 na D10/11 sú bežnou súčasťou mojej práce, vrátane automatickej migrácie obsahu cez Migrate API a zachovania presmerovaní, aby staré URL fungovali ďalej.' },
      { q: 'Viete pridať AI funkcie do existujúcej aplikácie?', a: 'Áno. Do existujúcich PHP a Vue.js produktov pridávam LLM funkcie: RAG asistentov nad pgvector, ktorí odpovedajú s citáciami, AI spracovanie dokumentov, vektorové vyhľadávanie a automatizácie.' },
      { q: 'Kde pôsobíte a akými jazykmi hovoríte?', a: 'Pracujem na diaľku z Európy (CET) s tímami z celého sveta. Hovorím po anglicky, slovensky a česky.' },
      { q: 'Koľko stojí projekt?', a: `Cena závisí od dĺžky a rozsahu spolupráce. Pošlite stručné zadanie cez kontaktný formulár alebo na ${EMAIL} a odpoviem do jedného dňa.` },
    ],
  },
  contact: {
    title: 'Postavme spolu niečo skvelé.',
    lead: 'Máte v hlave projekt, staršiu aplikáciu na modernizáciu alebo chcete pridať AI do existujúceho produktu? Napíšte mi — zvyčajne odpovedám do jedného dňa.',
    copy: 'Kopírovať adresu',
    copied: 'Skopírované',
    name: 'Meno',
    namePh: 'Vaše meno',
    email: 'E-mail',
    emailPh: 'vy@firma.com',
    type: 'Typ projektu',
    types: ['Drupal projekt', 'Symfony projekt', 'Laravel projekt', 'Vue.js / Frontend', 'AI integrácia', 'Iné'],
    message: 'Správa',
    messagePh: 'Povedzte mi o vašom projekte…',
    send: 'Odoslať správu',
    sending: 'Odosielam…',
    errors: {
      name: 'Zadajte svoje meno.',
      email: 'Zadajte platnú e-mailovú adresu, napríklad vy@firma.com.',
      message: 'Napíšte mi pár slov o projekte.',
    },
    sent: (name) => `Ďakujem ${name}! Vaša správa je na ceste — ozvem sa vám čoskoro.`,
    mailto: 'Otvorila sa vaša e-mailová aplikácia s vyplnenou správou.',
    error: `Niečo sa pokazilo. Napíšte mi prosím priamo na ${EMAIL}.`,
  },
  footer: {
    copyright: (year) => `© ${year} Stefan Kimak. Vytvorené v PHP, Vue a s ☕.`,
  },
  chat: {
    fab: 'Rýchle odpovede',
    open: 'Otvoriť bota rýchlych odpovedí',
    close: 'Zavrieť rýchle odpovede',
    ask: 'Položiť otázku',
    send: 'Odoslať otázku',
    links: { cv: 'Stiahnuť životopis (PDF)', '#contact': 'Prejsť na kontaktný formulár', '#work': 'Pozrieť portfólio', '#services': 'Pozrieť všetky služby', case: 'Otvoriť prípadovú štúdiu' },
    placeholder: 'Spýtajte sa na stack, projekty, AI prácu…',
    welcome: '👋 Ahoj! Som bot rýchlych odpovedí o Stefanovi. Pýtajte sa na jeho stack, projekty alebo dostupnosť.',
    suggestions: [
      'Aký je stack?',
      'Ukáž AI projekty',
      'Povedz mi o členskom portáli',
      'Aké služby ponúkaš?',
      'Si voľný?',
      'Ako ťa kontaktujem?',
    ],
  },
};

export const CONTENT = { en, sk };
