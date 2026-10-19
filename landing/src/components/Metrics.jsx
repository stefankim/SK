import { useEffect, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { CLIENTS, CLIENT_LOGOS, METRIC_VALUES, TESTIMONIALS } from '../data/content';
import { prefersReducedMotion, useReveal } from '../hooks';
import { useLang } from '../i18n';

function Count({ to, run }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return undefined;
    if (prefersReducedMotion()) {
      setN(to);
      return undefined;
    }
    let raf;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min((t - t0) / 1400, 1);
      setN(Math.round(to * (1 - (1 - p) ** 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, to]);
  return n;
}

export default function Metrics() {
  const { lang, c } = useLang();
  const [ref, inView] = useReveal(0.3);
  return (
    <section aria-label={c.metrics.aria} className="relative overflow-hidden border-y border-line bg-deep py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[28rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lamp/10 blur-[120px]"
      />
      <div ref={ref} className={`page reveal ${inView ? 'is-in' : ''}`}>
        <dl className="grid grid-cols-2 gap-y-12 lg:grid-cols-4">
          {METRIC_VALUES.map((value, i) => (
            <div key={value} className="flex flex-col border-l border-line pl-5 sm:pl-8">
              <dt className="order-2 mt-2 text-sm text-slate">{c.metrics.labels[i]}</dt>
              <dd className="display text-[clamp(3.5rem,8vw,6.5rem)] tabular-nums text-strong">
                <span className="print:hidden"><Count to={value} run={inView} /></span>
                <span className="hidden print:inline">{value}</span>
                <span className="text-sodium">+</span>
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-20 flex flex-col gap-6 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[40ch] text-fog/90">{c.metrics.trusted}</p>
          <ul className="flex flex-wrap gap-3">
            {CLIENTS.map((client, i) => (
              <li key={client.name}>
                <a
                  href={client.href}
                  target="_blank"
                  rel="noopener"
                  className="group flex items-center gap-3 rounded-full border border-line px-5 py-2.5 transition hover:border-sodium/60 hover:shadow-[0_0_30px_-6px_rgba(242,179,61,.35)]"
                >
                  <span className="font-semibold text-strong">{client.name}</span>
                  <span className="text-sm text-slate">{c.metrics.clientNotes[i]}</span>
                  <ExternalLink size={14} className="text-slate transition group-hover:text-sodium" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {CLIENT_LOGOS.length > 0 && (
          <ul className="mt-12 flex flex-wrap items-center gap-x-12 gap-y-6">
            {CLIENT_LOGOS.map((logo) => (
              <li key={logo.name}>
                <a href={logo.href} target="_blank" rel="noopener" className="block opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0">
                  <img src={logo.src} alt={logo.name} className="h-8 w-auto" loading="lazy" />
                </a>
              </li>
            ))}
          </ul>
        )}

        {TESTIMONIALS.length > 0 && (
          <div className="mt-16 grid gap-10 md:grid-cols-2">
            {TESTIMONIALS.map((q) => (
              <figure key={q.name} className="border-l-2 border-sodium pl-6">
                <blockquote className="font-serif text-2xl leading-snug text-strong">{lang === 'sk' ? `„${q.quote.sk}“` : `“${q.quote.en}”`}</blockquote>
                <figcaption className="mt-4 text-sm text-slate">
                  <span className="font-semibold text-fog">{q.name}</span>, {q.role[lang]}, {q.company}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
