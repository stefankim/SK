import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.jsx';
import { initAnalytics } from './analytics';
import { parseRoute } from './i18n';
import './index.css';

const root = document.getElementById('root');
// Pre-rendered pages carry their route (the 404 page is served at any URL); dev parses the path.
const route = root.dataset.route ? JSON.parse(root.dataset.route) : parseRoute(window.location.pathname);
const app = (
  <StrictMode>
    <App route={route} />
  </StrictMode>
);

// The production build is pre-rendered, so attach to that markup; dev starts empty.
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);

initAnalytics();

// Offline support is optional; only register in the production build.
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`).catch(() => {});
  });
}
