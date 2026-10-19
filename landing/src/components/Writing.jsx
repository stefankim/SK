import { useLang } from '../i18n';
import Reveal from './Reveal';

export default function Writing() {
  const { c } = useLang();
  return (
    <section id="blog" className="page py-24 sm:py-32">
      <Reveal>
        <h2 className="display text-[clamp(2.4rem,5vw,4.25rem)] text-strong">{c.blog.title}</h2>
        <p className="mt-4 max-w-[52ch] text-fog/90">{c.blog.lead}</p>
      </Reveal>
      <ul className="mt-12 grid gap-10 md:grid-cols-3">
        {c.blog.posts.map((p, i) => (
          <Reveal as="li" key={i} delay={i * 100} className="border-t border-line pt-6">
            <p className="text-sm text-slate">{p.read}, {c.blog.soon}</p>
            <h3 className="mt-3 text-xl font-semibold leading-snug tracking-tight text-strong">{p.title}</h3>
            <p className="mt-3 text-base text-fog/90">{p.body}</p>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
