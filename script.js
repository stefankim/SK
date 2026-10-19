// Main orchestrator — plain script (works on file:// and http://).
// Depends on js/i18n.js, js/case-studies.js, js/chat.js, js/portfolio.js loaded BEFORE this file.
(function () {
  const SK = window.SK || (window.SK = {});
  const getCaseStudies = (lang) => (SK.getCaseStudies ? SK.getCaseStudies(lang) : (SK.caseStudies || {}));

  // ---------- Service worker (offline shell) ----------
  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js').catch(() => { /* offline support is optional */ });
    });
  }

  // ---------- Year ----------
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------- i18n: detect & apply ----------
  let currentLang = SK.i18n?.detect?.() || 'en';
  SK.i18n?.apply?.(currentLang);

  function setLang(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    SK.i18n?.apply?.(lang);
    // An open case-study modal is rendered in JS — re-render it in the new language.
    if (currentCaseId && modal?.classList.contains('open')) renderCase(currentCaseId);
  }

  const langBtn = document.getElementById('langToggle');
  langBtn?.addEventListener('click', () => {
    setLang(currentLang === 'sk' ? 'en' : 'sk');
  });

  function tr(key, fallback) {
    return SK.i18n?.t?.(key, currentLang) || fallback || key;
  }

  // ---------- Idle decorative animations ----------
  // Infinite CSS animations keep the compositor awake even when nothing is on screen,
  // which shows up as constant GPU-process CPU. Pause them off-screen and on hidden tabs.
  const animatedHosts = document.querySelectorAll('.cube-stage, .hero-badge, .nav-eyes, .chat-panel');
  if (animatedHosts.length && 'IntersectionObserver' in window) {
    const animObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        entry.target.classList.toggle('anim-off', !entry.isIntersecting);
      });
    }, { rootMargin: '120px' });
    animatedHosts.forEach(el => animObserver.observe(el));
  }
  document.addEventListener('visibilitychange', () => {
    document.body.classList.toggle('anim-off', document.hidden);
  });

  // ---------- Reduced-motion preference ----------
  const reducedMotionMQ = window.matchMedia('(prefers-reduced-motion: reduce)');
  function prefersReducedMotion() { return reducedMotionMQ.matches; }

  // ---------- Theme toggle ----------
  const themeToggle = document.getElementById('themeToggle');
  const root = document.documentElement;
  // theme-init.js already stamped data-theme before first paint; this only handles the toggle.
  themeToggle?.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  // ---------- Mobile nav ----------
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks  = document.querySelector('.nav-links');
  function closeMobileNav() {
    navLinks?.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  }
  navToggle?.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
  navLinks?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobileNav));

  // ---------- Reveal-on-scroll ----------
  if (!prefersReducedMotion()) {
    const revealEls = document.querySelectorAll(
      '.section, .hero-inner, .hero-code, .stack-card, .project, .service, .about-card, .blog-card'
    );
    revealEls.forEach(el => el.classList.add('reveal'));
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));
  }

  // ---------- Stats count-up ----------
  const statEls = document.querySelectorAll('.hero-stats strong');
  statEls.forEach(el => {
    const raw = el.textContent.trim();
    el.dataset.value = raw;
    const m = raw.match(/(\d+)/);
    if (!m) return;
    el.dataset.target = m[1];
    el.textContent = raw.replace(m[1], '0');
  });
  function animateCount(el) {
    const target = parseInt(el.dataset.target, 10);
    if (!Number.isFinite(target)) return;
    const raw = el.dataset.value;
    const matchIdx = raw.indexOf(el.dataset.target);
    const prefix = raw.slice(0, matchIdx);
    const suffix = raw.slice(matchIdx + el.dataset.target.length);
    const dur = 1100;
    const start = performance.now();
    function step(now) {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      const v = Math.round(target * eased);
      el.textContent = `${prefix}${v}${suffix}`;
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
   if (!prefersReducedMotion() && statEls.length) {
    const statIO = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          animateCount(e.target);
          statIO.unobserve(e.target);
        }
      });
    }, { threshold: 0.6 });
    statEls.forEach(el => statIO.observe(el));
  } else {
    statEls.forEach(el => { el.textContent = el.dataset.value; });
  }

  // ---------- Scroll-spy nav ----------
  const spyLinks = document.querySelectorAll('.nav-links a[data-spy]');
  const spySections = Array.from(spyLinks).map(a => document.getElementById(a.dataset.spy)).filter(Boolean);
  const spyMap = new Map(Array.from(spyLinks).map(a => [a.dataset.spy, a]));
  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        spyLinks.forEach(l => l.classList.remove('active'));
        spyMap.get(e.target.id)?.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  spySections.forEach(s => spyObserver.observe(s));

  // ---------- Contact form ----------
  const form   = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    if (data._gotcha) return;
    if (!data.name || !data.email || !data.message) {
      formStatus.style.color = '#ff7c72';
      formStatus.textContent = tr('contact.form.requireFields', 'Please fill in name, email and message.');
      return;
    }
    const action = form.getAttribute('action') || '';
    const thanks = tr('contact.form.thanksPrefix', 'Thanks');
    if (action.includes('YOUR_FORM_ID')) {
      formStatus.style.color = '';
      formStatus.textContent = `${thanks} ${data.name}${tr('contact.form.demoSuffix', '! (Form is in demo mode — wire up Formspree to receive messages.)')}`;
      form.reset();
      return;
    }
    try {
      formStatus.textContent = tr('contact.form.sending', 'Sending…');
      const res = await fetch(action, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form),
      });
      if (res.ok) {
        formStatus.style.color = '';
        formStatus.textContent = `${thanks} ${data.name}${tr('contact.form.sentSuffix', "! Your message is on its way — I'll get back to you soon.")}`;
        form.reset();
      } else {
        formStatus.style.color = '#ff7c72';
        formStatus.textContent = tr('contact.form.error', 'Something went wrong. Please email hello@stefankimak.dev directly.');
      }
    } catch (err) {
      formStatus.style.color = '#ff7c72';
      formStatus.textContent = tr('contact.form.netError', 'Network error. Please email hello@stefankimak.dev directly.');
    }
  });

  // ---------- Copy-email button ----------
  const copyEmailBtn = document.getElementById('copyEmail');
  copyEmailBtn?.addEventListener('click', async () => {
    const email = copyEmailBtn.dataset.email || 'hello@stefankimak.dev';
    try {
      await navigator.clipboard.writeText(email);
      const original = tr('contact.copyBtn', 'Copy');
      copyEmailBtn.textContent = tr('contact.copied', 'Copied!');
      copyEmailBtn.classList.add('copied');
      setTimeout(() => {
        copyEmailBtn.textContent = original;
        copyEmailBtn.classList.remove('copied');
      }, 1600);
    } catch {
      copyEmailBtn.textContent = 'Press ⌘C';
    }
  });

  // ---------- Cursor-tracking eyes ----------
  const eyesRoot = document.getElementById('navEyes');
  if (eyesRoot && !prefersReducedMotion()) {
    const pupils = Array.from(eyesRoot.querySelectorAll('.pupil'));
    const MAX_OFFSET = 3.9;
    let eyesVisible = true, queued = false, mouseX = 0, mouseY = 0;

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([entry]) => { eyesVisible = entry.isIntersecting; })
        .observe(eyesRoot);
    }

    function aimPupils() {
      queued = false;
      pupils.forEach(pupil => {
        const eye = pupil.parentElement.getBoundingClientRect();
        const cx = eye.left + eye.width / 2;
        const cy = eye.top + eye.height / 2;
        const dx = mouseX - cx;
        const dy = mouseY - cy;
        const dist = Math.hypot(dx, dy);
        // Close to the eye the pupil follows exactly; further away it pins to the rim.
        const scale = dist === 0 ? 0 : Math.min(MAX_OFFSET, dist / 10) / dist;
        pupil.style.setProperty('--px', (dx * scale).toFixed(2) + 'px');
        pupil.style.setProperty('--py', (dy * scale).toFixed(2) + 'px');
      });
    }

    document.addEventListener('pointermove', (e) => {
      if (!eyesVisible) return;
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (queued) return;
      queued = true;
      requestAnimationFrame(aimPupils);
    }, { passive: true });
  }

  // ---------- Subtle parallax on hero code (rAF-throttled) ----------
  const codeWindow = document.querySelector('.code-window');
   if (codeWindow && !prefersReducedMotion() && window.matchMedia('(min-width: 960px)').matches) {
    let pending = false, lastX = 0, lastY = 0, heroVisible = true;
    // Without this the handler repaints the hero on every mouse move anywhere on the page.
    const hero = document.getElementById('home');
    if (hero && 'IntersectionObserver' in window) {
      new IntersectionObserver(([entry]) => { heroVisible = entry.isIntersecting; })
        .observe(hero);
    }
    document.addEventListener('mousemove', (e) => {
      if (!heroVisible) return;
      lastX = e.clientX;
      lastY = e.clientY;
      if (pending) return;
      pending = true;
      requestAnimationFrame(() => {
        const x = (lastX / window.innerWidth  - 0.5) * 6;
        const y = (lastY / window.innerHeight - 0.5) * 6;
        codeWindow.style.transform = `rotate(${-1 + x * 0.2}deg) translate(${x}px, ${y}px)`;
        pending = false;
      });
    });
  }

  // ---------- Case study modal ----------
  const modal = document.getElementById('caseModal');
  const caseContent = document.getElementById('caseContent');
  const modalPanel = modal?.querySelector('.modal-panel');
  let modalLastFocus = null;
  let modalKeyDownHandler = null;

  function getFocusable(el) {
    return el.querySelectorAll(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), details:not([disabled]) > summary, [tabindex]:not([tabindex="-1"])'
    );
  }
  function trapFocus(e) {
    if (!modalPanel || e.key !== 'Tab') return;
    const focusTrapEls = getFocusable(modalPanel);
    if (!focusTrapEls.length) { e.preventDefault(); return; }
    const first = focusTrapEls[0];
    const last = focusTrapEls[focusTrapEls.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }

  let currentCaseId = null;

  function renderCase(id) {
    const c = getCaseStudies(currentLang)[id];
    if (!c || !caseContent) return false;
    caseContent.innerHTML = `
      <div class="case-tags">${c.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
      <h3 id="caseTitle" style="font-size:1.6rem;margin-bottom:6px">${c.title}</h3>
      <p class="muted" style="margin-bottom:6px">${c.role} · ${c.duration}</p>
      <div class="case-section"><h4>${tr('case.problem', 'The problem')}</h4><p>${c.problem}</p></div>
      <div class="case-section"><h4>${tr('case.solution', 'The solution')}</h4><p>${c.solution}</p></div>
      <div class="case-section"><h4>${tr('case.stack', 'Tech stack')}</h4><ul>${c.stack.map(s => `<li>${s}</li>`).join('')}</ul></div>
      <div class="case-metrics">
        ${c.metrics.map(m => `<div class="case-metric"><strong>${m.value}</strong><span>${m.label}</span></div>`).join('')}
      </div>
    `;
    return true;
  }

  // Reflect the open case study in the URL so a project can be linked directly.
  function setCaseHash(id) {
    if (window.location.protocol === 'file:') return;
    const url = new URL(window.location.href);
    if (id) url.hash = 'case=' + id;
    else if (url.hash.startsWith('#case=')) url.hash = 'portfolio';
    history.replaceState(null, '', url);
  }

  function openCase(id, opts) {
    if (!modal || !renderCase(id)) return;
    currentCaseId = id;
    if (!opts || opts.updateURL !== false) setCaseHash(id);
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modalLastFocus = document.activeElement;
    modal.querySelector('.modal-close')?.focus();
    if (modalKeyDownHandler) modalPanel?.removeEventListener('keydown', modalKeyDownHandler);
    modalKeyDownHandler = trapFocus;
    modalPanel?.addEventListener('keydown', modalKeyDownHandler);
  }
  function closeCase() {
    if (!modal || !modal.classList.contains('open')) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    setCaseHash(null);
    currentCaseId = null;
    document.body.style.overflow = '';
    if (modalKeyDownHandler) { modalPanel?.removeEventListener('keydown', modalKeyDownHandler); modalKeyDownHandler = null; }
    modalLastFocus?.focus?.();
  }
  document.querySelectorAll('[data-open-case]').forEach(btn => {
    btn.addEventListener('click', () => openCase(btn.dataset.openCase));
  });
  document.querySelectorAll('[data-close-modal]').forEach(el => el.addEventListener('click', closeCase));

  // Open a case study straight from a shared #case=<id> link.
  function openCaseFromHash(opts) {
    const match = /^#case=([\w-]+)$/.exec(window.location.hash || '');
    if (match) openCase(match[1], opts);
  }
  openCaseFromHash({ updateURL: false });
  window.addEventListener('hashchange', () => {
    if (/^#case=/.test(window.location.hash)) openCaseFromHash({ updateURL: false });
    else if (currentCaseId) closeCase();
  });

  // Global Esc: close modal first, then mobile nav.
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (modal?.classList.contains('open')) { closeCase(); return; }
    if (navLinks?.classList.contains('open')) { closeMobileNav(); }
  });

  // ---------- Scroll-to-top ----------
  const scrollTopBtn = document.getElementById('scrollTop');
  if (scrollTopBtn) {
    scrollTopBtn.hidden = false;
    const onScroll = () => scrollTopBtn.classList.toggle('visible', window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' }));
  }

  // ---------- Init dynamic modules ----------
  SK.initPortfolio?.();
  SK.initChat?.();
})();
