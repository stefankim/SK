import { ArrowLeft, ArrowRight } from 'lucide-react';
import { CASE_STUDIES } from '../data/caseStudies';
import { PROJECTS } from '../data/content';
import { useLang } from '../i18n';

/** Previous and next project ids, wrapping around the list. */
export function neighbours(id) {
  const i = PROJECTS.findIndex((p) => p.id === id);
  const n = PROJECTS.length;
  return { prev: PROJECTS[(i - 1 + n) % n].id, next: PROJECTS[(i + 1) % n].id };
}

/**
 * Case study content shared by the dialog and the page.
 * `Heading` is h1 on the page and h2 in the dialog; `navItem` renders one prev/next control.
 */
export default function CaseStudyBody({ id, Heading = 'h2', headingId, navItem }) {
  const { lang, c } = useLang();
  const study = CASE_STUDIES[lang][id];
  const { prev, next } = neighbours(id);
  const Sub = Heading === 'h1' ? 'h2' : 'h3';

  return (
    <>
      <ul className="flex flex-wrap gap-2">
        {study.tags.map((t) => (
          <li key={t} className="rounded-full bg-tint/[0.06] px-3 py-1 text-[0.8125rem] text-fog">{t}</li>
        ))}
      </ul>

      <Heading id={headingId} className="display mt-6 text-[clamp(2rem,5vw,3.25rem)] text-strong">{study.title}</Heading>
      <p className="mt-3 text-slate">{study.role}, {study.duration}</p>

      <dl className="mt-8 grid grid-cols-3 gap-4 border-y border-line py-6">
        {study.metrics.map((m) => (
          <div key={m.label} className="flex flex-col">
            <dt className="order-2 mt-1 text-sm text-slate">{m.label}</dt>
            <dd className="font-serif text-[clamp(1.75rem,5vw,2.75rem)] leading-none text-sodium">{m.value}</dd>
          </div>
        ))}
      </dl>

      <Sub className="mt-8 text-lg font-semibold text-strong">{c.caseStudy.problem}</Sub>
      <p className="mt-2 text-fog/90">{study.problem}</p>
      <Sub className="mt-8 text-lg font-semibold text-strong">{c.caseStudy.solution}</Sub>
      <p className="mt-2 text-fog/90">{study.solution}</p>
      <Sub className="mt-8 text-lg font-semibold text-strong">{c.caseStudy.stack}</Sub>
      <ul className="mt-3 space-y-2">
        {study.stack.map((item) => (
          <li key={item} className="flex gap-3 text-fog/90">
            <span aria-hidden="true" className="mt-[0.75em] h-px w-4 shrink-0 bg-sodium" />
            {item}
          </li>
        ))}
      </ul>

      <nav aria-label={`${c.caseStudy.prev} / ${c.caseStudy.next}`} className="mt-10 grid grid-cols-2 gap-3 border-t border-line pt-6">
        {navItem({
          id: prev,
          className: 'group flex flex-col items-start gap-1 rounded-2xl p-3 text-left transition hover:bg-tint/5',
          children: (
            <>
              <span className="inline-flex items-center gap-1.5 text-sm text-slate"><ArrowLeft size={15} aria-hidden="true" />{c.caseStudy.prev}</span>
              <span className="font-semibold text-strong transition-colors group-hover:text-sodium">{CASE_STUDIES[lang][prev].title}</span>
            </>
          ),
        })}
        {navItem({
          id: next,
          className: 'group flex flex-col items-end gap-1 rounded-2xl p-3 text-right transition hover:bg-tint/5',
          children: (
            <>
              <span className="inline-flex items-center gap-1.5 text-sm text-slate">{c.caseStudy.next}<ArrowRight size={15} aria-hidden="true" /></span>
              <span className="font-semibold text-strong transition-colors group-hover:text-sodium">{CASE_STUDIES[lang][next].title}</span>
            </>
          ),
        })}
      </nav>
    </>
  );
}
