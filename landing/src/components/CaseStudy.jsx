import { useEffect, useRef } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { isTyping, useSwipe } from '../hooks';
import { hrefFor, useLang } from '../i18n';
import CaseStudyBody, { neighbours } from './CaseStudyBody';

/** Quick-view dialog; a native <dialog> gives focus trapping and Esc for free. */
export default function CaseStudy({ id, onClose, onNavigate }) {
  const { lang, c } = useLang();
  const ref = useRef(null);
  const swipe = useSwipe(
    () => id && onNavigate(neighbours(id).prev),
    () => id && onNavigate(neighbours(id).next),
  );

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return undefined;
    if (id && !dialog.open) dialog.showModal();
    if (!id && dialog.open) dialog.close();
    if (id) dialog.scrollTop = 0;
    document.documentElement.style.overflow = id ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [id]);

  const onKeyDown = (e) => {
    if (!id || isTyping(e)) return;
    if (e.key === 'ArrowLeft') onNavigate(neighbours(id).prev);
    if (e.key === 'ArrowRight') onNavigate(neighbours(id).next);
  };

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onKeyDown={onKeyDown}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-labelledby="case-title"
      {...swipe}
      className="m-auto w-[min(100%-1.5rem,52rem)] max-h-[88vh] overflow-y-auto rounded-[1.75rem] border border-line bg-ink p-0 text-fog shadow-[0_40px_120px_-20px_rgb(var(--shadow)/.9)] backdrop:bg-deep/80 backdrop:backdrop-blur-sm open:[animation:unblur_.4s_ease_both]"
    >
      {id && (
        <div className="relative p-6 sm:p-10">
          <div className="absolute right-4 top-4 flex items-center gap-1 sm:right-6 sm:top-6">
            <a
              href={hrefFor(lang, id)}
              className="hidden items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-sodium hover:bg-tint/10 sm:inline-flex"
            >
              {c.caseStudy.full}
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={onClose}
              aria-label={c.caseStudy.close}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-fog hover:bg-tint/10"
            >
              <X size={20} />
            </button>
          </div>
          <CaseStudyBody
            id={id}
            headingId="case-title"
            navItem={({ id: target, className, children }) => (
              <button key={target} type="button" onClick={() => onNavigate(target)} className={className}>{children}</button>
            )}
          />
          <a href={hrefFor(lang, id)} className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-sodium sm:hidden">
            {c.caseStudy.full}
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
      )}
    </dialog>
  );
}
