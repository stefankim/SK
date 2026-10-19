// Runs render-blocking in <head> so the first paint already has the right theme.
// Keeps [data-theme="light"] as the single source of truth for light-mode rules.
(function () {
  try {
    var t = localStorage.getItem('theme');
    if (t !== 'light' && t !== 'dark') {
      t = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
    document.documentElement.setAttribute('data-theme', t);
  } catch (e) {
    /* private mode / storage blocked — fall back to the stylesheet default */
  }
})();
