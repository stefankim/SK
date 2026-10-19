import { useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useLang } from '../i18n';
import Reveal from './Reveal';

export default function Faq() {
  const { c } = useLang();

  // Printed pages should include every answer.
  useEffect(() => {
    const openAll = () => document.querySelectorAll('#faq details').forEach((d) => { d.open = true; });
    window.addEventListener('beforeprint', openAll);
    return () => window.removeEventListener('beforeprint', openAll);
  }, []);
  return (
    <section id="faq" className="page pb-24 sm:pb-32">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
        <Reveal>
          <h2 className="display text-[clamp(2.4rem,5vw,4.25rem)] text-strong">{c.faq.title}</h2>
        </Reveal>
        <Reveal delay={100}>
          {c.faq.items.map((item) => (
            <details key={item.q} className="group border-t border-line last:border-b">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-xl font-semibold tracking-tight text-strong transition-colors hover:text-sodium [&::-webkit-details-marker]:hidden">
                <h3>{item.q}</h3>
                <Plus size={20} aria-hidden="true" className="shrink-0 text-slate transition-transform duration-300 group-open:rotate-45" />
              </summary>
              <p className="max-w-[62ch] pb-7 text-fog/90">{item.a}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
