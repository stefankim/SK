import { STACK_NAMES } from '../data/content';
import { useLang } from '../i18n';
import Reveal from './Reveal';

export default function Stack() {
  const { c } = useLang();
  const names = [...STACK_NAMES, c.stack.aiName];
  return (
    <section id="stack" className="page py-24 sm:py-32">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.6fr]">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <h2 className="display text-[clamp(2.4rem,5vw,4.25rem)] text-strong">{c.stack.title}</h2>
          <p className="mt-4 max-w-[40ch] text-fog/90">{c.stack.lead}</p>
        </Reveal>
        <dl>
          {names.map((name, i) => (
            <Reveal key={i} delay={i * 60} className="group grid gap-2 border-t border-line py-7 sm:grid-cols-[13rem_1fr] sm:gap-8">
              <dt className="text-xl font-semibold tracking-tight text-strong transition-colors duration-300 group-hover:text-sodium">{name}</dt>
              <dd className="text-fog/90 ">{c.stack.bodies[i]}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
