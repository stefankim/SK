import { Briefcase, Languages, MapPin } from 'lucide-react';
import { Download } from 'lucide-react';
import { CV_URL } from '../data/content';
import { track } from '../analytics';
import { useLang } from '../i18n';
import Reveal from './Reveal';

const FACT_ICONS = [MapPin, Briefcase, Languages];

export default function About() {
  const { c } = useLang();
  return (
    <section id="about" className="page py-24 sm:py-36">
      <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <h2 className="display max-w-[18ch] text-[clamp(2.4rem,5vw,4.25rem)] text-strong">
            {c.about.title}
          </h2>
          <p className="mt-8 max-w-[62ch] text-fog/90">
            {c.about.lead}
          </p>
          <ul className="mt-10 space-y-3">
            {c.about.focus.map((item) => (
              <li key={item} className="flex gap-3 text-fog/90">
                <span aria-hidden="true" className="mt-[0.7em] h-px w-5 shrink-0 bg-sodium" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={150} className="self-end">
          <div className="rounded-[2rem] border border-line bg-gradient-to-b from-tint/[0.04] to-transparent p-8">
            <div className="flex items-center gap-4">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-lamp font-serif text-3xl text-lampink">SK</div>
              <div>
                <p className="text-xl font-semibold text-strong">Stefan Kimak</p>
                <p className="text-sm text-slate">{c.about.subtitle}</p>
              </div>
            </div>
            <ul className="mt-8 space-y-3 text-sm text-fog/90">
              {c.about.facts.map((text, i) => {
                const Icon = FACT_ICONS[i];
                return (
                  <li key={text} className="flex items-center gap-3">
                    <Icon size={16} className="text-slate" aria-hidden="true" />
                    {text}
                  </li>
                );
              })}
            </ul>
            {CV_URL && (
              <a href={CV_URL} download onClick={() => track('CV download')} className="btn-ghost mt-8 text-sm">
                <Download size={16} aria-hidden="true" />
                {c.nav.cv}
              </a>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
