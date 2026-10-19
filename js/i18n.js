// Light i18n — auto-detects browser language (sk/cs => SK, else EN) with manual override.
(function () {
  window.SK = window.SK || {};

  const T = {
    en: {
      'lang.toggleLabel': 'Switch to Slovak',
      'lang.short.en': 'EN',
      'lang.short.sk': 'SK',

      'nav.about': 'About',
      'nav.stack': 'Stack',
       'nav.portfolio': 'Portfolio',
       'nav.blog': 'Blog',
      'nav.contact': 'Contact',
      'nav.bookCall': 'Send an email',
      'nav.skip': 'Skip to content',
      'nav.themeAria': 'Toggle light/dark theme',
      'nav.themeTitle': 'Toggle theme',
      'nav.menuAria': 'Toggle menu',

      'hero.badge': 'Available for new projects',
      'hero.titleHtml': 'Crafting <span class="gradient-text">intelligent web experiences</span><br />with PHP, Vue.js &amp; AI.',
      'hero.subtitleHtml': "I'm <strong>Stefan Kimak</strong> — a senior full-stack engineer building scalable platforms with <em>Drupal</em>, <em>Symfony</em>, <em>Laravel</em>, and modern <em>Vue.js</em> frontends, enriched with AI-driven features that make products smarter.",
      'hero.cta.portfolio': 'View Portfolio →',
      'hero.cta.book': '✉️ Send an email',
      'hero.stats.experience': 'Years Experience',
      'hero.stats.projects': 'Projects Delivered',
      'hero.stats.clients': 'Happy Clients',
      'hero.stats.ai': 'AI Integrations',

      'about.eyebrow': 'About',
      'about.title': '15 years of shipping production-grade PHP & JavaScript.',
      'about.lead': "I help startups and enterprises ship robust, maintainable web platforms — from headless Drupal publishing systems and Symfony APIs to Laravel SaaS products and reactive Vue.js interfaces. Lately, I've been integrating LLMs and vector search to give classic apps superpowers.",
      'about.list.1': 'Architecting modular, test-driven PHP backends',
      'about.list.2': 'Headless & decoupled Drupal / Symfony / Laravel APIs',
      'about.list.3': 'Vue 3 + Composition API + Pinia + TypeScript SPAs',
      'about.list.4': 'OpenAI, LangChain, RAG pipelines & vector databases',
      'about.list.5': 'DevOps with Docker, CI/CD, AWS & observability',
      'about.card.subtitle': 'Senior Full-Stack & AI Engineer',
      'about.card.location': 'Remote · Europe',
       'about.card.work': 'Freelance & Contract',
       'about.card.languages': 'English · Slovak · Czech',
       'about.card.improve': 'improve.sk — long-term Drupal contract',
       'about.card.previon': 'previon.ch — Drupal agency',

      'stack.eyebrow': 'Tech Stack',
      'stack.title': 'Tools I use every day',
      'stack.lead': 'From battle-tested PHP frameworks to cutting-edge AI tooling.',
      'stack.php.desc': 'Modern, typed, attribute-driven PHP. The reliable engine behind every backend I build.',
       'stack.drupal.desc': 'Custom modules, headless setups, migrations (D7→D10/11), multi-site & enterprise content platforms.',
      'stack.symfony.desc': 'API Platform, Messenger, DDD-flavored architectures & rock-solid REST/GraphQL APIs.',
      'stack.laravel.desc': 'Eloquent, Livewire, Inertia, queues & rapid SaaS delivery without sacrificing quality.',
      'stack.vue.desc': 'Composition API, Pinia, Nuxt, Vite — beautiful, performant SPAs and dashboards.',
      'stack.ai.title': 'AI & LLMs',
      'stack.ai.desc': 'OpenAI, Anthropic, LangChain, RAG, embeddings, vector DBs, agents & smart automations.',

      'portfolio.eyebrow': 'Portfolio',
      'portfolio.title': 'Selected work',
      'portfolio.lead': "A glimpse at recent platforms, products and AI integrations I've shipped.",
      'portfolio.filter.all': 'All',
      'portfolio.caseLink': 'Case study →',
      'portfolio.member.title': 'Association Member Portal',
      'portfolio.member.desc': 'Self-service member portal with automated dues, invoicing and event registration — 80% less admin.',
      'portfolio.permits.title': 'Municipal Submission Portal',
      'portfolio.permits.desc': 'Paper submissions replaced by guided online forms with AI-assisted document parsing and approval workflows.',
      'portfolio.transit.title': 'Public Transport Portal',
      'portfolio.transit.desc': 'Mobile-first timetable, stop finder and disruption feed for a city operator serving thousands of riders daily.',
      'portfolio.bank.title': 'Regional Bank Relaunch',
      'portfolio.bank.desc': 'Component-driven Drupal platform with a shared design system, central product data and WCAG AA compliance.',
      'portfolio.aid.title': 'Humanitarian Multi-Site Platform',
      'portfolio.aid.desc': '30+ regional chapters consolidated onto one Drupal platform with shared donation and volunteer flows.',
      'portfolio.b2b.title': 'B2B Ordering Ecosystem',
      'portfolio.b2b.desc': 'Symfony + API Platform backend with a Vue 3 ordering front end, contract pricing and bidirectional ERP sync.',
      'portfolio.configurator.title': '3D Product Configurator',
      'portfolio.configurator.desc': 'Laravel + Vue 3 configurator rendering products live in the browser and turning visits into qualified enquiries.',
      'portfolio.learning.title': 'AI Assistant for a Training Institute',
      'portfolio.learning.desc': 'Symfony + pgvector RAG assistant answering staff and learner questions with citations from years of material.',

       'case.problem': 'The problem',
      'case.solution': 'The solution',
      'case.stack': 'Tech stack',
      'case.closeAria': 'Close case study',

       'services.eyebrow': 'Services',
      'services.title': 'How I can help',
      'services.1.title': 'Backend Architecture',
      'services.1.desc': 'Design and build scalable PHP backends with Drupal, Symfony or Laravel — from greenfield to rescue missions.',
      'services.2.title': 'Frontend Engineering',
      'services.2.desc': 'Modern Vue.js 3 SPAs, Nuxt sites and design-system component libraries with TypeScript.',
      'services.3.title': 'AI Integration',
      'services.3.desc': 'Add LLMs, RAG, vector search and intelligent automations to your existing product — pragmatically.',
      'services.4.title': 'Performance & Audits',
      'services.4.desc': 'Code reviews, performance audits, security hardening and observability for legacy PHP apps.',
      'services.5.title': 'Team Augmentation',
      'services.5.desc': 'Embed with your team as a senior IC — mentoring, pairing and pushing the codebase forward.',
      'services.6.title': 'Technical Consulting',
      'services.6.desc': 'Architecture reviews, tech-stack decisions and roadmap planning for product & engineering leaders.',

      'blog.eyebrow': 'Writing',
      'blog.title': 'Latest from the blog',
      'blog.lead': 'Notes on PHP, Vue and shipping AI features without losing your mind.',
      'blog.readTime.8': '8 min read',
      'blog.readTime.6': '6 min read',
      'blog.readTime.5': '5 min read',
      'blog.soon': 'Coming soon →',
      'blog.1.title': 'Building a RAG pipeline in Symfony with pgvector',
      'blog.1.desc': "How to combine API Platform, OpenAI embeddings and PostgreSQL's pgvector for production-grade retrieval.",
      'blog.2.title': 'Headless Drupal + Nuxt: a pragmatic setup',
      'blog.2.desc': 'JSON:API, content previews, image styles and ISR — a battle-tested decoupled architecture.',
      'blog.3.title': 'Vue 3 patterns I actually use in production',
      'blog.3.desc': 'Composition API, composables, Pinia stores and the structure that keeps large SPAs maintainable.',

      'contact.eyebrow': 'Contact',
      'contact.title': "Let's build something great.",
      'contact.lead': 'Got a project in mind, a legacy app to modernise, or want to add AI to an existing product? Drop a message — I usually reply within a day.',
      'contact.copyBtn': 'Copy',
      'contact.copyAria': 'Copy email address',
       'contact.copied': 'Copied!',
       'contact.form.name': 'Name',
      'contact.form.namePh': 'Your name',
      'contact.form.email': 'Email',
      'contact.form.emailPh': 'you@company.com',
      'contact.form.type': 'Project type',
      'contact.form.type.drupal': 'Drupal project',
      'contact.form.type.symfony': 'Symfony project',
      'contact.form.type.laravel': 'Laravel project',
      'contact.form.type.vue': 'Vue.js / Frontend',
      'contact.form.type.ai': 'AI integration',
      'contact.form.type.other': 'Other',
      'contact.form.message': 'Message',
      'contact.form.messagePh': 'Tell me about your project…',
      'contact.form.send': 'Send message →',
      'contact.form.requireFields': 'Please fill in name, email and message.',
      'contact.form.demoMode': '(Form is in demo mode — wire up Formspree to receive messages.)',
      'contact.form.thanksPrefix': 'Thanks',
      'contact.form.demoSuffix': '! (Form is in demo mode — wire up Formspree to receive messages.)',
      'contact.form.sending': 'Sending…',
      'contact.form.sentSuffix': "! Your message is on its way — I'll get back to you soon.",
      'contact.form.error': 'Something went wrong. Please email hello@stefankimak.dev directly.',
      'contact.form.netError': 'Network error. Please email hello@stefankimak.dev directly.',

      'footer.copyright': '© {year} Stefan Kimak. Crafted with PHP, Vue & ☕.',

      'chat.fab': 'Quick answers',
      'chat.fabAria': 'Open quick-answers bot',
      'chat.header': 'Quick answers',
      'chat.closeAria': 'Close quick-answers',
      'chat.askLabel': 'Ask a question',
      'chat.placeholder': 'Ask about my stack, projects, AI work…',
      'chat.welcome': "👋 Hi! I'm Stefan's quick-answers bot. Ask me about his stack, projects or availability.",
      'chat.suggestion.1': "What's the stack?",
      'chat.suggestion.2': 'Show me AI projects',
      'chat.suggestion.3': 'Tell me about the member portal',
      'chat.suggestion.4': 'What services do you offer?',
      'chat.suggestion.5': 'Are you available?',
      'chat.suggestion.6': 'How do I contact you?',
    },
    sk: {
      'lang.toggleLabel': 'Prepnúť na angličtinu',
      'lang.short.en': 'EN',
      'lang.short.sk': 'SK',

      'nav.about': 'O mne',
      'nav.stack': 'Technológie',
       'nav.portfolio': 'Portfólio',
       'nav.blog': 'Blog',
      'nav.contact': 'Kontakt',
      'nav.bookCall': 'Napísať e-mail',
      'nav.skip': 'Preskočiť na obsah',
      'nav.themeAria': 'Prepnúť svetlú/tmavú tému',
      'nav.themeTitle': 'Prepnúť tému',
      'nav.menuAria': 'Otvoriť menu',

      'hero.badge': 'Voľný pre nové projekty',
      'hero.titleHtml': 'Vytváram <span class="gradient-text">inteligentné webové riešenia</span><br />s PHP, Vue.js a AI.',
      'hero.subtitleHtml': 'Som <strong>Stefan Kimak</strong> — senior full-stack vývojár, ktorý buduje škálovateľné platformy v <em>Drupale</em>, <em>Symfony</em>, <em>Laraveli</em> a moderných <em>Vue.js</em> frontendoch, obohatené o AI funkcie, ktoré robia produkty inteligentnejšími.',
      'hero.cta.portfolio': 'Pozrieť portfólio →',
      'hero.cta.book': '✉️ Napísať e-mail',
      'hero.stats.experience': 'rokov skúseností',
      'hero.stats.projects': 'dodaných projektov',
      'hero.stats.clients': 'spokojných klientov',
      'hero.stats.ai': 'AI integrácií',

      'about.eyebrow': 'O mne',
      'about.title': '15 rokov budovania produkčných PHP a JavaScript aplikácií.',
      'about.lead': 'Pomáham startupom aj veľkým firmám dodávať robustné, udržateľné webové platformy — od headless Drupal publikačných systémov a Symfony API cez Laravel SaaS produkty až po reaktívne Vue.js rozhrania. V poslednom čase integrujem LLM modely a vektorové vyhľadávanie, aby som klasickým aplikáciám dodal superschopnosti.',
      'about.list.1': 'Návrh modulárnych, testami pokrytých PHP backendov',
      'about.list.2': 'Headless a oddelené Drupal / Symfony / Laravel API',
      'about.list.3': 'Vue 3 + Composition API + Pinia + TypeScript SPA',
      'about.list.4': 'OpenAI, LangChain, RAG pipelines a vektorové databázy',
      'about.list.5': 'DevOps s Dockerom, CI/CD, AWS a monitoringom',
      'about.card.subtitle': 'Senior Full-Stack a AI vývojár',
      'about.card.location': 'Remote · Európa',
      'about.card.work': 'Freelance a kontrakt',
      'about.card.languages': 'angličtina · slovenčina · čeština',
      'about.card.improve': 'improve.sk — dlhodobý Drupal kontrakt',
      'about.card.previon': 'previon.ch — Drupal agentúra',

      'stack.eyebrow': 'Technológie',
      'stack.title': 'Nástroje, ktoré používam každý deň',
      'stack.lead': 'Od osvedčených PHP frameworkov po moderné AI nástroje.',
      'stack.php.desc': 'Moderné, typované, atribútové PHP. Spoľahlivý motor každého backendu, ktorý postavím.',
      'stack.drupal.desc': 'Vlastné moduly, headless riešenia, migrácie (D7→D10/11), multi-site a enterprise obsahové platformy.',
      'stack.symfony.desc': 'API Platform, Messenger, architektúra v duchu DDD a stabilné REST/GraphQL API.',
      'stack.laravel.desc': 'Eloquent, Livewire, Inertia, queues a rýchle SaaS dodávky bez kompromisov v kvalite.',
      'stack.vue.desc': 'Composition API, Pinia, Nuxt, Vite — pekné, výkonné SPA a dashboardy.',
      'stack.ai.title': 'AI a LLM',
      'stack.ai.desc': 'OpenAI, Anthropic, LangChain, RAG, embeddingy, vektorové DB, agenti a inteligentné automatizácie.',

      'portfolio.eyebrow': 'Portfólio',
      'portfolio.title': 'Vybrané projekty',
      'portfolio.lead': 'Ukážka nedávnych platforiem, produktov a AI integrácií, ktoré som dodal.',
      'portfolio.filter.all': 'Všetko',
      'portfolio.caseLink': 'Prípadová štúdia →',
      'portfolio.member.title': 'Členský portál asociácie',
      'portfolio.member.desc': 'Samoobslužný členský portál s automatickými poplatkami, fakturáciou a registráciou na podujatia — o 80 % menej administratívy.',
      'portfolio.permits.title': 'Portál na podávanie žiadostí',
      'portfolio.permits.desc': 'Papierové podania nahradené sprievodnými online formulármi s AI spracovaním dokumentov a schvaľovacím workflow.',
      'portfolio.transit.title': 'Portál mestskej dopravy',
      'portfolio.transit.desc': 'Mobile-first cestovné poriadky, vyhľadávanie zastávok a výluky pre dopravcu s tisíckami cestujúcich denne.',
      'portfolio.bank.title': 'Relaunch regionálnej banky',
      'portfolio.bank.desc': 'Komponentová Drupal platforma so spoločným dizajn systémom, centrálnymi produktovými dátami a WCAG AA.',
      'portfolio.aid.title': 'Multi-site platforma humanitárnej organizácie',
      'portfolio.aid.desc': '30+ regionálnych pobočiek zjednotených na jednej Drupal platforme so spoločnými darovacími a dobrovoľníckymi tokmi.',
      'portfolio.b2b.title': 'B2B objednávkový ekosystém',
      'portfolio.b2b.desc': 'Symfony + API Platform backend s Vue 3 objednávkovým rozhraním, zmluvnými cenami a obojsmernou synchronizáciou s ERP.',
      'portfolio.configurator.title': '3D konfigurátor produktov',
      'portfolio.configurator.desc': 'Laravel + Vue 3 konfigurátor, ktorý vykresľuje produkt naživo v prehliadači a mení návštevy na kvalifikované dopyty.',
      'portfolio.learning.title': 'AI asistent pre vzdelávaciu inštitúciu',
      'portfolio.learning.desc': 'Symfony + pgvector RAG asistent odpovedajúci zamestnancom a študentom s citáciami z rokov materiálov.',

       'case.problem': 'Problém',
      'case.solution': 'Riešenie',
      'case.stack': 'Technológie',
      'case.closeAria': 'Zavrieť prípadovú štúdiu',

      'services.eyebrow': 'Služby',
      'services.title': 'Ako vám viem pomôcť',
      'services.1.title': 'Backend architektúra',
      'services.1.desc': 'Návrh a stavba škálovateľných PHP backendov s Drupalom, Symfony alebo Laravelom — od greenfield projektov po záchranné misie.',
      'services.2.title': 'Frontend engineering',
      'services.2.desc': 'Moderné Vue.js 3 SPA, Nuxt stránky a komponentové knižnice s TypeScriptom.',
      'services.3.title': 'AI integrácia',
      'services.3.desc': 'Pridajte do existujúceho produktu LLM, RAG, vektorové vyhľadávanie a inteligentné automatizácie — pragmaticky.',
      'services.4.title': 'Výkon a audity',
      'services.4.desc': 'Code review, audity výkonu, bezpečnostné spevnenie a monitoring pre staršie PHP aplikácie.',
      'services.5.title': 'Posilnenie tímu',
      'services.5.desc': 'Pripojím sa k vášmu tímu ako senior IC — mentoring, pair programming a posun kódovej základne vpred.',
      'services.6.title': 'Technické konzultácie',
      'services.6.desc': 'Audit architektúry, výber technológií a plánovanie roadmapy pre produktových a engineering lídrov.',

      'blog.eyebrow': 'Píšem',
      'blog.title': 'Najnovšie z blogu',
      'blog.lead': 'Poznámky o PHP, Vue a dodávaní AI funkcií bez straty rozumu.',
      'blog.readTime.8': '8 min čítania',
      'blog.readTime.6': '6 min čítania',
      'blog.readTime.5': '5 min čítania',
      'blog.soon': 'Pripravujem →',
      'blog.1.title': 'Stavba RAG pipeline v Symfony s pgvector',
      'blog.1.desc': 'Ako skombinovať API Platform, OpenAI embeddingy a PostgreSQL pgvector pre produkčné vyhľadávanie.',
      'blog.2.title': 'Headless Drupal + Nuxt: pragmatický setup',
      'blog.2.desc': 'JSON:API, náhľady obsahu, image styles a ISR — overená oddelená architektúra.',
      'blog.3.title': 'Vue 3 vzory, ktoré reálne používam v produkcii',
      'blog.3.desc': 'Composition API, composables, Pinia store-y a štruktúra, ktorá udrží veľké SPA udržateľné.',

      'contact.eyebrow': 'Kontakt',
      'contact.title': 'Postavme spolu niečo skvelé.',
      'contact.lead': 'Máte v hlave projekt, staršiu aplikáciu na modernizáciu alebo chcete pridať AI do existujúceho produktu? Napíšte mi — zvyčajne odpovedám do jedného dňa.',
      'contact.copyBtn': 'Kopírovať',
      'contact.copyAria': 'Skopírovať e-mailovú adresu',
       'contact.copied': 'Skopírované!',
       'contact.form.name': 'Meno',
      'contact.form.namePh': 'Vaše meno',
      'contact.form.email': 'E-mail',
      'contact.form.emailPh': 'vy@firma.com',
      'contact.form.type': 'Typ projektu',
      'contact.form.type.drupal': 'Drupal projekt',
      'contact.form.type.symfony': 'Symfony projekt',
      'contact.form.type.laravel': 'Laravel projekt',
      'contact.form.type.vue': 'Vue.js / Frontend',
      'contact.form.type.ai': 'AI integrácia',
      'contact.form.type.other': 'Iné',
      'contact.form.message': 'Správa',
      'contact.form.messagePh': 'Povedzte mi o vašom projekte…',
      'contact.form.send': 'Odoslať správu →',
      'contact.form.requireFields': 'Vyplňte prosím meno, e-mail a správu.',
      'contact.form.thanksPrefix': 'Ďakujem',
      'contact.form.demoSuffix': '! (Formulár je v demo režime — pripojte Formspree na prijímanie správ.)',
      'contact.form.sending': 'Odosielam…',
      'contact.form.sentSuffix': '! Vaša správa je na ceste — ozvem sa vám čoskoro.',
      'contact.form.error': 'Niečo sa pokazilo. Napíšte mi prosím priamo na hello@stefankimak.dev.',
      'contact.form.netError': 'Sieťová chyba. Napíšte mi prosím priamo na hello@stefankimak.dev.',

      'footer.copyright': '© {year} Stefan Kimak. Vytvorené v PHP, Vue a s ☕.',

      'chat.fab': 'Rýchle odpovede',
      'chat.fabAria': 'Otvoriť bota rýchlych odpovedí',
      'chat.header': 'Rýchle odpovede',
      'chat.closeAria': 'Zavrieť rýchle odpovede',
      'chat.askLabel': 'Položiť otázku',
      'chat.placeholder': 'Spýtajte sa na stack, projekty, AI prácu…',
      'chat.welcome': '👋 Ahoj! Som bot rýchlych odpovedí o Stefanovi. Pýtajte sa na jeho stack, projekty alebo dostupnosť.',
      'chat.suggestion.1': 'Aký je stack?',
      'chat.suggestion.2': 'Ukáž AI projekty',
      'chat.suggestion.3': 'Povedz mi o členskom portáli',
      'chat.suggestion.4': 'Aké služby ponúkaš?',
      'chat.suggestion.5': 'Si voľný?',
      'chat.suggestion.6': 'Ako ťa kontaktujem?',
    },
  };

  function detectLang() {
    const stored = localStorage.getItem('lang');
    if (stored === 'sk' || stored === 'en') return stored;
    const nav = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
    if (nav.startsWith('sk') || nav.startsWith('cs')) return 'sk';
    return 'en';
  }

  function t(key, lang) {
    const dict = T[lang] || T.en;
    return dict[key] ?? T.en[key] ?? key;
  }

  function applyTranslations(lang) {
    document.documentElement.setAttribute('lang', lang);

    document.querySelectorAll('[data-i18n]').forEach(el => {
      el.textContent = t(el.dataset.i18n, lang);
    });
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      el.innerHTML = t(el.dataset.i18nHtml, lang);
    });
    document.querySelectorAll('[data-i18n-attr]').forEach(el => {
      // format: "attr1:key1,attr2:key2"
      el.dataset.i18nAttr.split(',').forEach(pair => {
        const [attr, key] = pair.split(':').map(s => s.trim());
        if (attr && key) el.setAttribute(attr, t(key, lang));
      });
    });

    // Footer copyright with year placeholder
    const footerEl = document.querySelector('[data-i18n-footer]');
    if (footerEl) {
      const year = document.getElementById('year')?.textContent || new Date().getFullYear();
      footerEl.innerHTML = t('footer.copyright', lang).replace('{year}', `<span id="year">${year}</span>`);
    }

    // Chat suggestions are rendered by chat.js — re-render if already initialised.
    const sug = document.getElementById('chatSuggestions');
    if (sug && sug.children.length) {
      sug.innerHTML = '';
      window.SK?.renderChatSuggestions?.(lang);
    }

    // Update language toggle visual state
    const langBtn = document.getElementById('langToggle');
    if (langBtn) {
      langBtn.textContent = lang === 'sk' ? T.sk['lang.short.en'] : T.en['lang.short.sk'];
      langBtn.setAttribute('aria-label', t('lang.toggleLabel', lang));
      langBtn.setAttribute('aria-pressed', lang === 'sk' ? 'true' : 'false');
    }
  }

  window.SK.i18n = {
    T,
    t,
    detect: detectLang,
    apply: applyTranslations,
    current: () => document.documentElement.getAttribute('lang') || detectLang(),
  };
})();
