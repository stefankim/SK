// Quick-answers chat — exposes window.SK.initChat (works on file:// and http://).
(function () {
  window.SK = window.SK || {};
  // Resolved per call so answers follow the active language.
  function allCases() {
    const lang = window.SK.i18n?.current?.() || 'en';
    return (window.SK.getCaseStudies ? window.SK.getCaseStudies(lang) : window.SK.caseStudies) || {};
  }

  function summarizeProject(id) {
    const c = allCases()[id];
    if (!c) return '';
    const top = c.metrics?.[0];
    const m = top ? ` (${top.value} ${top.label.toLowerCase()})` : '';
    return `• ${c.title} — ${c.tags.join(', ')}${m}`;
  }
  function listProjectsByTag(tag) {
    return Object.entries(allCases())
      .filter(([, c]) => c.tags.some(t => t.toLowerCase().includes(tag)))
      .map(([id]) => summarizeProject(id));
  }
  function detailFor(id) {
    const c = allCases()[id];
    if (!c) return '';
    const metrics = c.metrics.map(m => `${m.value} ${m.label.toLowerCase()}`).join(' · ');
    return `${c.title} — ${c.tags.join(', ')}\nRole: ${c.role} · ${c.duration}\n\nProblem: ${c.problem}\n\nSolution: ${c.solution}\n\nKey results: ${metrics}\n\nTip: click the project card on the page for the full case study.`;
  }

  function readSiteData() {
    const stats = Array.from(document.querySelectorAll('.hero-stats div')).map(d => ({
      value: d.querySelector('strong')?.dataset.value || d.querySelector('strong')?.textContent.trim(),
      label: d.querySelector('span')?.textContent.trim(),
    }));
    const services = Array.from(document.querySelectorAll('.service')).map(s => ({
      title: s.querySelector('h3')?.textContent.trim(),
      desc: s.querySelector('p')?.textContent.trim(),
    }));
    const posts = Array.from(document.querySelectorAll('.blog-card')).map(b => ({
      title: b.querySelector('h3')?.textContent.trim(),
      desc: b.querySelector('p')?.textContent.trim(),
      meta: b.querySelector('.blog-meta')?.textContent.trim(),
    }));
    const certifications = Array.from(document.querySelectorAll('.about-card .tag')).map(t => t.textContent.trim());
    return { stats, services, posts, certifications };
  }

  function buildKnowledge(site) {
    return [
      { keywords: ['hello','hi ','hey','yo ','sup','hiya','good morning','good evening'],
        answer: () => "Hey! I'm Stefan's quick-answers bot — grounded in this site's content. Ask about his stack, any project, services, blog posts, availability or how to reach him." },
      { keywords: ['stack','tech','technolog','tools','what do you use','what does he use'],
        answer: () => "Stefan's daily stack:\n• PHP 8.4, Drupal 7/8/9/10/11, Symfony 7, Laravel 11\n• Vue 3 (Composition API + Pinia), Nuxt 3, TypeScript, Vite\n• AI: OpenAI, Anthropic, LangChain, RAG, pgvector\n• DevOps: Docker, GitHub Actions, AWS" },
      { keywords: ['drupal'],
        answer: () => `Drupal is one of Stefan's specialties — custom modules, headless setups (JSON:API / GraphQL), multi-site platforms, migrations & Search API. Acquia certified.\n\nDrupal projects:\n${listProjectsByTag('drupal').join('\n')}` },
      { keywords: ['symfony','api platform'],
        answer: () => `On Symfony, Stefan ships rock-solid REST/GraphQL APIs with API Platform, Messenger queues and a DDD-flavoured architecture. Symfony certified.\n\nSymfony projects:\n${listProjectsByTag('symfony').join('\n')}` },
      { keywords: ['laravel','eloquent','inertia','livewire'],
        answer: () => `On Laravel he builds multi-tenant SaaS products with Eloquent, Inertia/Vue, queues (Horizon), Reverb for realtime, and Cashier+Stripe for billing.\n\nLaravel projects:\n${listProjectsByTag('laravel').join('\n')}` },
      { keywords: ['vue','nuxt','frontend','spa','pinia'],
        answer: () => `Vue 3 + Composition API + Pinia is his preferred frontend stack, often with Nuxt 3 for SSR.\n\nVue.js projects:\n${listProjectsByTag('vue').join('\n')}` },
      { keywords: ['ai','llm','openai','rag','gpt','embedding','vector','pgvector','langchain','anthropic'],
        answer: () => {
          const list = Object.entries(allCases())
            .filter(([, c]) => c.tags.some(t => /ai|openai|gpt|rag|vector/i.test(t)))
            .map(([id]) => summarizeProject(id));
          return `Stefan integrates LLMs into classic web apps: RAG pipelines on pgvector, OpenAI / Anthropic APIs, function calling, agents and content automations.\n\nAI projects:\n${list.join('\n')}`;
        } },
      { keywords: ['portfolio','projects','case study','examples'],
        answer: () => `Recent work (click any card on the site for the full case study):\n${Object.keys(allCases()).map(summarizeProject).join('\n')}` },
      { keywords: ['member portal','membership','association','dues','conference','event registration'], answer: () => detailFor('member') },
      { keywords: ['submission','permit','application form','paperless','municipal','utility','document parsing'], answer: () => detailFor('permits') },
      { keywords: ['transport','transit','timetable','public transport','schedule','stop finder'], answer: () => detailFor('transit') },
      { keywords: ['bank','banking','finance','design system','relaunch'], answer: () => detailFor('bank') },
      { keywords: ['multi-site','multisite','humanitarian','non-profit','nonprofit','ngo','donation','chapters'], answer: () => detailFor('aid') },
      { keywords: ['e-commerce','ecommerce','b2b','storefront','shop','ordering','erp'], answer: () => detailFor('b2b') },
      { keywords: ['configurator','3d','webgl','lead generation','seo'], answer: () => detailFor('configurator') },
      { keywords: ['knowledge assistant','rag','training','learning','course','support bot','helpdesk','semantic search'], answer: () => detailFor('learning') },
      { keywords: ['service','help with','offer','what can you do','what does he do'],
        answer: () => 'Services Stefan offers:\n' + site.services.map(s => `• ${s.title} — ${s.desc}`).join('\n') },
      { keywords: ['blog','article','writing','post','read'],
        answer: () => 'Latest blog posts:\n' + site.posts.map(p => `• ${p.title} (${p.meta}) — ${p.desc}`).join('\n') },
      { keywords: ['stat','numbers','metric','how many'],
        answer: () => 'By the numbers:\n' + site.stats.filter(s => s.value).map(s => `• ${s.value} — ${s.label}`).join('\n') },
      { keywords: ['certification','certified','accreditation','badge'],
        answer: () => 'Certifications: ' + site.certifications.join(' · ') },
      { keywords: ['available','availability','hire','busy','capacity','free','taking on'],
        answer: () => "Yes — Stefan is currently available for new projects (freelance / contract). Feel free to reach out via the contact form below or drop him an email at hello@stefankimak.dev — he usually replies within a day." },
      { keywords: ['rate','price','cost','budget','fee','how much'],
        answer: () => "Rates depend on engagement length and scope. Share a brief via the contact form or email hello@stefankimak.dev and Stefan will get back to you within a day." },
      { keywords: ['contact','email','reach','message','mail','get in touch','talk'],
        answer: () => "Ways to reach Stefan:\n• Email: hello@stefankimak.dev\n• LinkedIn: linkedin.com/in/stefankimak\n• GitHub: github.com/stefankimak\n• Or use the contact form below — usually replies within a day." },
      { keywords: ['location','where','based','remote','timezone','time zone','country'],
        answer: () => "Stefan works remotely from Europe (CET) and collaborates with teams worldwide. He's comfortable overlapping with US Eastern hours when needed." },
      { keywords: ['language','speak','english','slovak','czech'],
        answer: () => 'He speaks English fluently, plus Slovak and Czech.' },
      { keywords: ['experience','years','how long','seniority','senior'],
        answer: () => "15+ years of professional development, 80+ shipped projects, 30+ happy clients and 5+ AI integrations in production." },
      { keywords: ['cv','resume'],
        answer: () => "Stefan's CV is available on request — drop a note via the contact form below or email hello@stefankimak.dev and he'll send the latest version." },
      { keywords: ['who are you','who is stefan','about stefan','introduce yourself','introduce stefan','bio'],
        answer: () => 'Stefan Kimak is a senior full-stack & AI engineer specializing in PHP (Drupal, Symfony, Laravel), Vue.js and AI integrations — 15+ years of experience, available for freelance & contract work.' },
    ];
  }

  const STOP = new Set(['the','a','an','is','are','of','to','for','and','or','in','on','what','how','can','do','does','with','your','you','me','i','my','his','her','its','about','tell','please','show','some','any']);
  function tokenize(s) {
    return s.toLowerCase().replace(/[^a-z0-9+\-#\.\s]/g, ' ').split(/\s+/).filter(t => t && !STOP.has(t));
  }
  function escapeRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
  function wordHit(haystack, needle) {
    return new RegExp('\\b' + escapeRe(needle) + '(s|es)?\\b', 'i').test(haystack);
  }

  function answerFor(text, knowledge) {
    const t = text.toLowerCase();
    const idAliases = {
      member: ['member portal','membership','association','dues'],
      permits: ['submission portal','permit','paperless','municipal'],
      transit: ['transport portal','transit','timetable','stop finder'],
      bank: ['bank','banking','regional bank'],
      aid: ['multi-site','multisite','humanitarian','ngo','donation'],
      b2b: ['b2b','e-commerce','ecommerce','storefront','ordering'],
      configurator: ['configurator','3d configurator','webgl'],
      learning: ['knowledge assistant','rag','training institute','learning assistant'],
    };
    for (const [id, aliases] of Object.entries(idAliases)) {
      if (aliases.some(a => wordHit(t, a))) return detailFor(id);
    }
    const techMap = {
      drupal: ['drupal'],
      symfony: ['symfony','api platform'],
      laravel: ['laravel','eloquent','inertia','livewire'],
      vue: ['vue','vue.js','vuejs','nuxt','pinia'],
      ai: ['ai','llm','rag','openai','gpt','gpt-4','embedding','embeddings','pgvector','langchain','anthropic','vector db','vector database'],
    };
    for (const [, words] of Object.entries(techMap)) {
      if (words.some(w => wordHit(t, w))) {
        const item = knowledge.find(k => k.keywords.some(kw => wordHit(t, kw)));
        if (item) return typeof item.answer === 'function' ? item.answer() : item.answer;
      }
    }
    const tokens = tokenize(text);
    let best = null, bestScore = 0;
    for (const item of knowledge) {
      let score = 0;
      for (const k of item.keywords) {
        if (wordHit(t, k)) score += k.length * 2;
        const kt = tokenize(k);
        for (const tok of tokens) if (kt.includes(tok)) score += 4;
      }
      if (score > bestScore) { best = item; bestScore = score; }
    }
    if (best && bestScore > 0) return typeof best.answer === 'function' ? best.answer() : best.answer;
    return "I'm a quick-answers bot grounded in this site's content. Try asking about the stack, a specific project (e.g. \"Tell me about the AI knowledge assistant\"), services, blog posts, availability, rates or contact details.";
  }

  window.SK.initChat = function initChat() {
    const fab = document.getElementById('chatFab');
    const panel = document.getElementById('chatPanel');
    const closeBtn = document.getElementById('chatClose');
    const messages = document.getElementById('chatMessages');
    const form = document.getElementById('chatForm');
    const text = document.getElementById('chatText');
    const suggestionsEl = document.getElementById('chatSuggestions');
    if (!fab || !panel) return;

    const site = readSiteData();
    const knowledge = buildKnowledge(site);
    let lastFocus = null;

    function addMsg(content, who) {
      const el = document.createElement('div');
      el.className = `chat-msg ${who}`;
      el.textContent = content;
      messages.appendChild(el);
      messages.scrollTop = messages.scrollHeight;
    }
    function open() {
      panel.classList.add('open');
      panel.setAttribute('aria-hidden', 'false');
      fab.classList.add('hidden');
      fab.setAttribute('aria-expanded', 'true');
      if (!messages.children.length) {
        const lang = window.SK?.i18n?.current?.() || 'en';
        const welcome = window.SK?.i18n?.t?.('chat.welcome', lang)
          || "👋 Hi! I'm Stefan's quick-answers bot. Ask me about his stack, projects or availability.";
        addMsg(welcome, 'bot');
      }
      lastFocus = document.activeElement;
      setTimeout(() => text.focus(), 100);
    }
    function closePanel() {
      panel.classList.remove('open');
      panel.setAttribute('aria-hidden', 'true');
      fab.classList.remove('hidden');
      fab.setAttribute('aria-expanded', 'false');
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }
    function send(q) {
      q = (q || '').trim();
      if (!q) return;
      addMsg(q, 'user');
      text.value = '';
      setTimeout(() => addMsg(answerFor(q, knowledge), 'bot'), 350);
    }

    fab.addEventListener('click', open);
    closeBtn?.addEventListener('click', closePanel);
    form?.addEventListener('submit', (e) => { e.preventDefault(); send(text.value); });
    panel.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { e.stopPropagation(); closePanel(); }
    });

    function renderSuggestions(lang) {
      lang = lang || (window.SK?.i18n?.current?.() || 'en');
      const t = window.SK?.i18n?.t || ((k) => k);
      const fallback = [
        "What's the stack?",
        'Show me AI projects',
        'Tell me about the member portal',
        'What services do you offer?',
        'Are you available?',
        'How do I contact you?',
      ];
      suggestionsEl.innerHTML = '';
      for (let i = 1; i <= 6; i++) {
        const label = window.SK?.i18n ? t(`chat.suggestion.${i}`, lang) : fallback[i - 1];
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'chat-chip';
        b.textContent = label;
        b.addEventListener('click', (e) => { e.preventDefault(); send(label); });
        suggestionsEl.appendChild(b);
      }
    }
    window.SK.renderChatSuggestions = renderSuggestions;
    renderSuggestions();
  };
})();
