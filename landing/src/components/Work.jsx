import { Suspense, lazy, useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { FILTERS, PROJECTS } from '../data/content';
import { glowMove } from '../hooks';
import { track } from '../analytics';
import { useLang } from '../i18n';
import Reveal from './Reveal';

// The quick-view dialog is fetched the first time a case study is opened.
const CaseStudy = lazy(() => import('./CaseStudy'));

const LABEL = Object.fromEntries(FILTERS.map((f) => [f.id, f.label]));

export default function Work() {
  const { c } = useLang();
  const [filter, setFilter] = useState('all');
  const [openId, setOpenId] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const visible = PROJECTS.filter((p) => filter === 'all' || p.tags.includes(filter));

  // A shared link like ?filter=drupal opens with that filter applied.
  useEffect(() => {
    const initial = new URLSearchParams(window.location.search).get('filter');
    if (initial && LABEL[initial]) setFilter(initial);

    // #case-<id> opens that case study, so each one has a shareable link.
    const fromHash = () => {
      const id = window.location.hash.replace('#case-', '');
      if (PROJECTS.some((p) => p.id === id)) {
        setLoaded(true);
        setOpenId(id);
      }
    };
    fromHash();
    window.addEventListener('hashchange', fromHash);
    return () => window.removeEventListener('hashchange', fromHash);
  }, []);

  const openCase = (id) => {
    if (id) setLoaded(true);
    setOpenId(id);
    if (id) track('Case study opened', { project: id });
    const url = new URL(window.location.href);
    url.hash = id ? `case-${id}` : '';
    window.history.replaceState(null, '', url);
  };

  const choose = (id) => {
    setFilter(id);
    track('Portfolio filtered', { filter: id });
    const url = new URL(window.location.href);
    if (id === 'all') url.searchParams.delete('filter');
    else url.searchParams.set('filter', id);
    window.history.replaceState(null, '', url);
  };

  const chip = (id, label) => (
    <button
      key={id}
      type="button"
      aria-pressed={filter === id}
      onClick={() => choose(id)}
      className={`rounded-full border px-4 py-1.5 text-sm transition duration-300 ${
        filter === id ? 'border-sodium bg-lamp text-lampink' : 'border-line text-fog/90 hover:border-sodium/50 hover:text-strong'
      }`}
    >
      {label}
    </button>
  );

  return (
    <section id="work" className="page py-24 sm:py-36">
      <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="display text-[clamp(2.4rem,5vw,4.25rem)] text-strong">{c.work.title}</h2>
          <p className="mt-4 max-w-[52ch] text-fog/90">{c.work.lead}</p>
        </div>
        <div role="group" aria-label={c.work.filterAria} className="flex flex-wrap gap-2">
          {chip('all', c.work.all)}
          {FILTERS.map((f) => chip(f.id, f.label))}
        </div>
      </Reveal>

      <p className="sr-only" role="status">{c.work.showing(visible.length, LABEL[filter])}</p>

      <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
        {visible.map((p) => {
          const text = c.work.projects[p.id];
          return (
            <li
              key={p.id}
              onPointerMove={glowMove}
              className="glow group flex flex-col bg-ink p-7 sm:p-9 [animation:unblur_.6s_ease_both]"
            >
              <ul className="flex gap-2" aria-label={c.work.techAria}>
                {p.tags.map((t) => (
                  <li key={t} className="rounded-full bg-tint/[0.06] px-3 py-1 text-[0.8125rem] text-fog">{LABEL[t]}</li>
                ))}
              </ul>
              <h3 className="mt-6 text-2xl font-semibold leading-snug tracking-tight text-strong">{text.title}</h3>
              <p className="mt-3 max-w-[48ch] text-base text-fog/90">{text.body}</p>
              <button
                type="button"
                onClick={() => openCase(p.id)}
                aria-haspopup="dialog"
                className="mt-6 inline-flex items-center gap-1.5 self-start rounded-full text-[0.95rem] font-medium text-sodium underline-offset-4 hover:underline"
              >
                {c.work.caseLink}
                <span className="sr-only">: {text.title}</span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </button>
            </li>
          );
        })}
        {visible.length % 2 === 1 && <li aria-hidden="true" className="hidden bg-ink md:block" />}
      </ul>

      {loaded && (
        <Suspense fallback={null}>
          <CaseStudy id={openId} onClose={() => openCase(null)} onNavigate={openCase} />
        </Suspense>
      )}
    </section>
  );
}
