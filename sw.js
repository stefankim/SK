// Minimal service worker: offline shell + cached static assets.
// Bump CACHE when assets change — old caches are dropped on activate.
const CACHE = 'sk-site-v1';
const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './fonts.css',
  './fonts/inter-latin.woff2',
  './fonts/jetbrainsmono-latin.woff2',
  './script.js',
  './theme-init.js',
  './js/i18n.js',
  './js/case-studies.js',
  './js/chat.js',
  './js/portfolio.js',
  './manifest.webmanifest',
  './og-image.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  // Only handle our own origin — analytics and form posts go straight to the network.
  if (url.origin !== self.location.origin) return;

  // HTML: network-first, so a deploy is picked up immediately; cache is the offline fallback.
  if (request.mode === 'navigate' || request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match(request).then((hit) => hit || caches.match('./index.html')))
    );
    return;
  }

  // Everything else: cache-first, refreshed in the background.
  event.respondWith(
    caches.match(request).then((hit) => {
      const network = fetch(request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => hit);
      return hit || network;
    })
  );
});
