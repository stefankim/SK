// Portfolio filter — exposes window.SK.initPortfolio (works on file:// and http://).
(function () {
  window.SK = window.SK || {};
  window.SK.initPortfolio = function initPortfolio() {
    const filterButtons = document.querySelectorAll('.filter');
    const projects = document.querySelectorAll('.project');
    const liveRegion = document.getElementById('portfolioLive');
    if (!filterButtons.length) return;

    function applyFilter(f, opts) {
      const updateURL = !opts || opts.updateURL !== false;
      let visible = 0;
      filterButtons.forEach(b => {
        const on = b.dataset.filter === f;
        b.classList.toggle('active', on);
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      projects.forEach(p => {
        const tags = (p.dataset.tags || '').split(' ');
        const show = f === 'all' || tags.includes(f);
        p.classList.toggle('hide', !show);
        if (show) visible++;
      });
      if (liveRegion) {
        liveRegion.textContent = f === 'all'
          ? `Showing all ${visible} projects.`
          : `Showing ${visible} ${f} project${visible === 1 ? '' : 's'}.`;
      }
       if (updateURL && window.location.protocol !== 'file:') {
        const url = new URL(window.location.href);
        const currentParam = url.searchParams.get('filter') || 'all';
        if (currentParam !== f) {
          if (f === 'all') url.searchParams.delete('filter');
          else url.searchParams.set('filter', f);
          history.replaceState(null, '', url);
        }
      }
    }

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => applyFilter(btn.dataset.filter));
    });

    if (window.location.protocol !== 'file:') {
      const initial = new URL(window.location.href).searchParams.get('filter');
      if (initial && Array.from(filterButtons).some(b => b.dataset.filter === initial)) {
        applyFilter(initial, { updateURL: false });
      }
    }
  };
})();
