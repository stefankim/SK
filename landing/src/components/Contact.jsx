import { useEffect, useState } from 'react';
import { AtSign, BriefcaseBusiness, CalendarDays, Check, Copy, FolderGit2, Mail, Send } from 'lucide-react';
import { BOOKING_URL, EMAIL, FORM_ENDPOINT, SOCIAL } from '../data/content';
import { glowMove, useReveal } from '../hooks';
import { track } from '../analytics';
import { useLang } from '../i18n';
import Reveal from './Reveal';

const ICONS = { github: FolderGit2, linkedin: BriefcaseBusiness, x: AtSign };

const field =
  'w-full rounded-xl border border-line bg-deep/70 px-4 py-3 text-fog placeholder:text-slate/70 transition focus:border-sodium focus:outline-none focus:ring-4 focus:ring-sodium/15 aria-[invalid=true]:border-err';

const REQUIRED = ['name', 'email', 'message'];

/** Field name → true when invalid. */
function validate(form) {
  return {
    name: !form.elements.name.value.trim(),
    email: !form.elements.email.validity.valid,
    message: !form.elements.message.value.trim(),
  };
}

export default function Contact() {
  const { c } = useLang();
  const t = c.contact;
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState({ state: 'idle', message: '' });
  const [errors, setErrors] = useState({});
  const [sectionRef, seen] = useReveal(0.3);

  // Did the visitor get as far as the contact section?
  useEffect(() => {
    if (seen) track('Contact section viewed');
  }, [seen]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      track('Email copied');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  const invalid = (name) => ({ 'aria-invalid': !!errors[name], 'aria-describedby': errors[name] ? `${name}-error` : undefined });
  const errorText = (name) => errors[name] && (
    <span id={`${name}-error`} className="mt-2 block text-sm text-err">{t.errors[name]}</span>
  );

  const submit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const found = validate(form);
    setErrors(found);
    const firstInvalid = REQUIRED.find((name) => found[name]);
    if (firstInvalid) {
      setStatus({ state: 'idle', message: '' });
      form.elements[firstInvalid].focus();
      return;
    }

    if (!FORM_ENDPOINT) {
      const subject = encodeURIComponent(`${data.type} — ${data.name}`);
      const body = encodeURIComponent(`${data.message}\n\n${data.name}\n${data.email}`);
      window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
      track('Contact form', { via: 'mailto', type: data.type });
      setStatus({ state: 'ok', message: t.mailto });
      return;
    }

    setStatus({ state: 'sending', message: '' });
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      track('Contact form', { via: 'endpoint', type: data.type });
      setStatus({ state: 'ok', message: t.sent(data.name.trim()) });
    } catch {
      setStatus({ state: 'error', message: t.error });
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="relative overflow-hidden border-t border-line bg-deep py-24 sm:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 left-1/2 h-[30rem] w-[70rem] -translate-x-1/2 rounded-full bg-lamp/[0.12] blur-[140px]"
      />
      <div className="page relative grid gap-16 lg:grid-cols-2">
        <Reveal>
          <h2 className="display text-[clamp(3rem,7vw,6rem)] text-strong">{t.title}</h2>
          <p className="mt-8 max-w-[46ch] text-lg text-fog/90">{t.lead}</p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a href={`mailto:${EMAIL}`} onClick={() => track('Email click', { place: 'contact' })} className="btn-lamp">
              <Mail size={16} aria-hidden="true" />
              {EMAIL}
            </a>
            <button type="button" onClick={copy} className="btn-ghost" aria-live="polite">
              {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
              {copied ? t.copied : t.copy}
            </button>
            {BOOKING_URL && (
              <a href={BOOKING_URL} target="_blank" rel="noopener" onClick={() => track('Booking click', { place: 'contact' })} className="btn-ghost">
                <CalendarDays size={16} aria-hidden="true" />
                {c.nav.book}
              </a>
            )}
          </div>

          <ul className="mt-10 space-y-3">
            {SOCIAL.map((s) => {
              const Icon = ICONS[s.icon];
              return (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener" className="inline-flex items-center gap-3 text-fog/90 transition hover:text-sodium">
                    <Icon size={18} aria-hidden="true" />
                    {s.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </Reveal>

        <Reveal delay={150}>
          <form
            onSubmit={submit}
            // Once a field has been flagged, re-check it as the visitor types.
            onInput={(e) => {
              const { name } = e.target;
              if (!errors[name]) return;
              const stillInvalid = validate(e.currentTarget)[name];
              setErrors((prev) => ({ ...prev, [name]: stillInvalid }));
            }}
            onPointerMove={glowMove}
            noValidate
            className="glow space-y-5 rounded-[2rem] border border-line bg-ink/70 p-6 backdrop-blur-xl sm:p-10"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm text-fog/90">{t.name}</span>
                <input name="name" required autoComplete="name" placeholder={t.namePh} className={field} {...invalid('name')} />
                {errorText('name')}
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-fog/90">{t.email}</span>
                <input name="email" type="email" required autoComplete="email" placeholder={t.emailPh} className={field} {...invalid('email')} />
                {errorText('email')}
              </label>
            </div>
            <label className="block">
              <span className="mb-2 block text-sm text-fog/90">{t.type}</span>
              <select name="type" className={field}>
                {t.types.map((type) => <option key={type}>{type}</option>)}
              </select>
            </label>
            <label className="block">
              <span className="mb-2 block text-sm text-fog/90">{t.message}</span>
              <textarea name="message" required rows={5} placeholder={t.messagePh} className={`${field} resize-y`} {...invalid('message')} />
              {errorText('message')}
            </label>
            <button type="submit" className="btn-lamp w-full justify-center" disabled={status.state === 'sending'}>
              <Send size={16} aria-hidden="true" />
              {status.state === 'sending' ? t.sending : t.send}
            </button>
            <p role="status" className={`min-h-[1.5em] text-sm ${status.state === 'error' ? 'text-err' : 'text-ok'}`}>
              {status.message}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
