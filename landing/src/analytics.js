// Privacy-friendly, cookieless analytics. Off until one of these is set in .env:
//   VITE_PLAUSIBLE_DOMAIN=stefankimak.dev            (optional VITE_PLAUSIBLE_SRC for self-hosting)
//   VITE_UMAMI_WEBSITE_ID=<id>                       (optional VITE_UMAMI_SRC, default Umami Cloud)
const env = import.meta.env ?? {};
const PLAUSIBLE = env.VITE_PLAUSIBLE_DOMAIN;
const UMAMI = env.VITE_UMAMI_WEBSITE_ID;

function load(src, attrs) {
  const s = document.createElement('script');
  s.defer = true;
  s.src = src;
  Object.entries(attrs).forEach(([k, v]) => s.setAttribute(k, v));
  document.head.appendChild(s);
}

/** Loads the configured provider; page views are counted by its script. Production only. */
export function initAnalytics() {
  if (!env.PROD) return;
  if (PLAUSIBLE) {
    // Queue events fired before the script arrives.
    window.plausible = window.plausible || function queue(...args) { (window.plausible.q = window.plausible.q || []).push(args); };
    load(env.VITE_PLAUSIBLE_SRC || 'https://plausible.io/js/script.js', { 'data-domain': PLAUSIBLE });
  } else if (UMAMI) {
    load(env.VITE_UMAMI_SRC || 'https://cloud.umami.is/script.js', { 'data-website-id': UMAMI });
  }
}

/** Records a named event, e.g. track('Case study opened', { project: 'b2b' }). No-op when analytics is off. */
export function track(name, props) {
  if (typeof window === 'undefined') return;
  if (window.plausible) window.plausible(name, props ? { props } : undefined);
  else if (window.umami) window.umami.track(name, props);
}
