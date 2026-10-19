import { useEffect, useRef } from 'react';
import { ArrowDown, CalendarDays, Mail } from 'lucide-react';
import { BOOKING_URL, EMAIL } from '../data/content';
import { prefersReducedMotion } from '../hooks';
import { track } from '../analytics';
import { useLang } from '../i18n';

// The code wall hidden under the hero; the cursor lamp reveals it.
const WALL = `<?php
namespace App\\Developer;

class StefanKimak extends FullStack
{
    public array $stack = [
        'PHP 8.4', 'Drupal 7-11', 'Symfony 7',
        'Laravel 11', 'Vue 3', 'OpenAI',
    ];

    public function build(Idea $idea): Product
    {
        return $idea
            ->design()
            ->engineer()
            ->enhanceWithAI();
    }
}

final class Api
{
    use Cacheable;
}

#[Hook('presave')]
public function save(Node $n): void

#[Route('/cases')]
public function list(): JsonResponse

Route::get('/health', fn () => 'ok');

<script setup>
const stack = ref(['Vue 3', 'Pinia']);
</script>

$answer = $rag
    ->retrieve($q)
    ->withCitations()
    ->generate();
`;

export default function Hero() {
  const { c } = useLang();
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const set = (x, y) => {
      el.style.setProperty('--lx', `${x}px`);
      el.style.setProperty('--ly', `${y}px`);
    };
    const r0 = el.getBoundingClientRect();
    set(r0.width * 0.7, r0.height * 0.4);
    if (prefersReducedMotion()) return undefined;

    // Drift on its own until the pointer takes over (and always on touch screens).
    let raf;
    let manual = false;
    let idleTimer;
    const t0 = performance.now();
    const drift = (t) => {
      if (!manual) {
        const r = el.getBoundingClientRect();
        const s = (t - t0) / 1000;
        set(r.width * (0.62 + 0.26 * Math.sin(s * 0.35)), r.height * (0.45 + 0.22 * Math.sin(s * 0.53 + 1)));
      }
      raf = requestAnimationFrame(drift);
    };
    raf = requestAnimationFrame(drift);

    const onMove = (e) => {
      if (e.pointerType !== 'mouse') return;
      manual = true;
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => { manual = false; }, 4000);
      const r = el.getBoundingClientRect();
      set(e.clientX - r.left, e.clientY - r.top);
    };
    el.addEventListener('pointermove', onMove);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(idleTimer);
      el.removeEventListener('pointermove', onMove);
    };
  }, []);

  const lamp = 'radial-gradient(17rem circle at var(--lx) var(--ly), #000 0%, rgba(0,0,0,.55) 45%, transparent 75%)';

  return (
    <section id="top" ref={ref} className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-deep pb-16 pt-32 sm:pb-24">
      {/* Code wall: barely visible everywhere, lit where the lamp falls. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 select-none">
        <pre className="absolute -right-10 top-16 whitespace-pre font-mono text-[clamp(0.85rem,1.6vw,1.35rem)] leading-[1.7] text-fog/[0.05] sm:right-[4vw]">{WALL}</pre>
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(30rem circle at var(--lx) var(--ly), rgba(242,179,61,.14), transparent 70%)' }}
        />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-deep via-deep/80 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-deep via-deep/60 to-transparent sm:w-2/3" />
        <div className="absolute inset-0 max-sm:opacity-50" style={{ WebkitMaskImage: lamp, maskImage: lamp }}>
          <pre className="absolute -right-10 top-16 whitespace-pre font-mono text-[clamp(0.85rem,1.6vw,1.35rem)] leading-[1.7] text-sodium sm:right-[4vw]">
            {WALL}
          </pre>
        </div>
      </div>

      <div className="page">
        <div className="hero-line" style={{ animationDelay: '0.1s' }}>
        <p className="mb-8 inline-flex items-center gap-2 rounded-full border border-line bg-ink/60 px-3 py-1 text-sm text-fog/90 backdrop-blur">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70 motion-reduce:animate-none" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          {c.hero.badge}
        </p>
        </div>

        <h1 className="display text-[clamp(3.1rem,8.4vw,8rem)] text-strong">
          {c.hero.lines.map((line, i) => (
            <span key={line} className="hero-line block sm:whitespace-nowrap" style={{ animationDelay: `${0.25 + i * 0.22}s` }}>
              {line}
            </span>
          ))}
        </h1>

        <div className="hero-line mt-10 grid gap-8 md:grid-cols-[minmax(0,34rem)_auto] md:items-end md:justify-between" style={{ animationDelay: '1s' }}>
          <p className="text-lg text-fog/90">
            {c.hero.intro}
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#work" className="btn-lamp">
              {c.hero.ctaPortfolio}
              <ArrowDown size={16} aria-hidden="true" />
            </a>
            <a href={`mailto:${EMAIL}`} onClick={() => track('Email click', { place: 'hero' })} className="btn-ghost">
              <Mail size={16} aria-hidden="true" />
              {c.hero.ctaEmail}
            </a>
            {BOOKING_URL && (
              <a href={BOOKING_URL} target="_blank" rel="noopener" onClick={() => track('Booking click', { place: 'hero' })} className="btn-ghost">
                <CalendarDays size={16} aria-hidden="true" />
                {c.nav.book}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
