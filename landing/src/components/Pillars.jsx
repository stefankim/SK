import { useEffect, useState } from 'react';
import { PILLAR_CODE } from '../data/content';
import { glowMove, prefersReducedMotion, useReveal } from '../hooks';
import { useLang } from '../i18n';
import Code from './Code';
import Reveal from './Reveal';

function Pillar({ pillar, snippet, flip }) {
  const [ref, inView] = useReveal(0.35);
  const [shown, setShown] = useState(0);

  // Type the snippet line by line once the module is on screen.
  useEffect(() => {
    if (!inView) return undefined;
    if (prefersReducedMotion()) {
      setShown(snippet.code.length);
      return undefined;
    }
    const id = setInterval(() => {
      setShown((n) => {
        if (n >= snippet.code.length) clearInterval(id);
        return Math.min(n + 1, snippet.code.length);
      });
    }, 260);
    return () => clearInterval(id);
  }, [inView, snippet.code.length]);

  return (
    <article
      ref={ref}
      className={`reveal ${inView ? 'is-in' : ''} grid items-center gap-10 border-t border-line py-16 sm:py-20 lg:grid-cols-2 lg:gap-20`}
    >
      <div className={flip ? 'lg:order-2' : ''}>
        <h3 className="display text-[clamp(2.2rem,4.5vw,3.75rem)] text-strong">{pillar.title}</h3>
        <p className="mt-5 max-w-[46ch] text-lg text-fog/90">{pillar.body}</p>
      </div>
      <div
        onPointerMove={glowMove}
        className="dark-surface glow overflow-hidden rounded-2xl border border-line bg-deep shadow-[0_30px_80px_-30px_rgb(var(--shadow)/.8)] transition-colors duration-500 hover:border-sodium/40"
      >
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="ml-3 font-mono text-[0.8125rem] text-slate">{snippet.file}</span>
        </div>
        <div className="px-5 py-6 sm:px-7">
          <Code lines={snippet.code} visible={shown} caret={shown > 0} />
        </div>
      </div>
    </article>
  );
}

export default function Pillars() {
  const { c } = useLang();
  return (
    <section id="services" className="page py-12 sm:py-24">
      <Reveal>
        <h2 className="display mb-12 text-[clamp(2.4rem,5vw,4.25rem)] text-strong">{c.services.title}</h2>
      </Reveal>

      {c.services.pillars.map((p, i) => (
        <Pillar key={PILLAR_CODE[i].file} pillar={p} snippet={PILLAR_CODE[i]} flip={i % 2 === 1} />
      ))}

      <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
        {c.services.more.map((s, i) => (
          <Reveal
            key={i}
            delay={i * 120}
            onPointerMove={glowMove}
            className="glow bg-ink p-8"
          >
            <h3 className="text-xl font-semibold tracking-tight text-strong">{s.title}</h3>
            <p className="mt-3 text-base text-fog/90">{s.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
