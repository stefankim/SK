// Minimal service worker: offline shell + cached static assets.
// The build fills in the hashed JS/CSS files and a cache id derived from them (see
// vite.config.js), so each deploy gets a fresh cache and the old one is dropped on activate.
const CACHE = 'sk-landing-__BUILD_ID__';
const ASSETS = [
  './',
  './sk/',
  './favicon.svg',
  './manifest.webmanifest',
  './fonts/inter-latin.woff2',
  './fonts/instrumentserif-normal-latin.woff2',
  './fonts/jetbrainsmono-latin.woff2',
  ...__BUILD_ASSETS__,
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
  // Only handle our own origin — form posts go straight to the network.
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
        .catch(() => caches.match(request).then((hit) => hit || caches.match('./')))
    );
    return;
  }

  // Everything else: cache-first, refreshed in the background. Scripts and fonts are requested
  // in CORS mode, so ignore Vary: Origin or they would miss their precached copies.
  event.respondWith(
    caches.match(request, { ignoreVary: true }).then((hit) => {
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
