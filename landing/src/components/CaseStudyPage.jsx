import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { isTyping, useSwipe } from '../hooks';
import { hrefFor, useLang } from '../i18n';
import CaseStudyBody, { neighbours } from './CaseStudyBody';
import Contact from './Contact';

/** Stand-alone, pre-rendered case study page at /work/<id>/ and /en/work/<id>/. */
export default function CaseStudyPage() {
  const { lang, caseId, c } = useLang();
  const go = (id) => { window.location.href = hrefFor(lang, id); };
  const swipe = useSwipe(() => go(neighbours(caseId).prev), () => go(neighbours(caseId).next));

  useEffect(() => {
    const onKey = (e) => {
      if (isTyping(e) || e.altKey || e.metaKey || e.ctrlKey) return;
      if (e.key === 'ArrowLeft') go(neighbours(caseId).prev);
      if (e.key === 'ArrowRight') go(neighbours(caseId).next);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  return (
    <>
      <article className="page max-w-4xl pb-20 pt-32 sm:pt-40" {...swipe}>
        <a href={`${hrefFor(lang)}#work`} className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-sodium hover:underline">
          <ArrowLeft size={16} aria-hidden="true" />
          {c.caseStudy.back}
        </a>
        <CaseStudyBody
          id={caseId}
          Heading="h1"
          navItem={({ id, className, children }) => (
            <a key={id} href={hrefFor(lang, id)} className={className}>{children}</a>
          )}
        />
      </article>
      <Contact />
    </>
  );
}
