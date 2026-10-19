import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUp, X } from 'lucide-react';
import { answerFor } from '../data/chat';
import { track } from '../analytics';
import { pathFor, useLang } from '../i18n';

/** The chat panel and its answer engine; loaded on first open (see Chat.jsx). */
export default function ChatPanel({ open, onClose }) {
  const { lang, c, section } = useLang();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const panelRef = useRef(null);
  const inputRef = useRef(null);
  const logRef = useRef(null);

  // The conversation survives page changes within this tab (case study pages are separate pages).
  useEffect(() => {
    let saved = [];
    try {
      saved = JSON.parse(sessionStorage.getItem('chat') || '[]');
    } catch { /* storage blocked or corrupt */ }
    setMessages(Array.isArray(saved) && saved.length ? saved : [{ who: 'bot', text: c.chat.welcome }]);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    try {
      sessionStorage.setItem('chat', JSON.stringify(messages.slice(-40)));
    } catch { /* storage blocked */ }
  }, [messages]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [messages]);

  const send = (question) => {
    const q = question.trim();
    if (!q) return;
    setText('');
    track('Chat question');
    setMessages((m) => [...m, { who: 'user', text: q }]);
    setTimeout(() => setMessages((m) => [...m, { who: 'bot', ...answerFor(q, lang) }]), 350);
  };

  // Keep Tab inside the open panel; Esc closes it and returns focus to the button.
  const onKeyDown = (e) => {
    if (e.key === 'Escape') onClose();
    if (e.key !== 'Tab') return;
    const items = [...panelRef.current.querySelectorAll('a[href], button, input')].filter((el) => !el.disabled);
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const linkFor = (link) => {
    if (link.caseId) return { href: pathFor(lang, link.caseId), label: c.chat.links.case };
    if (link.href) return { href: link.href, label: c.chat.links[link.key] };
    return { href: section(link.hash), label: c.chat.links[link.hash] };
  };

  return (
    <section
      id="chat-panel"
      ref={panelRef}
      aria-label={c.chat.fab}
      onKeyDown={onKeyDown}
      className={`${open ? 'flex' : 'hidden'} fixed inset-x-3 bottom-3 z-50 max-h-[min(40rem,85vh)] flex-col overflow-hidden rounded-3xl border border-line bg-deep/95 shadow-[0_30px_100px_-20px_rgb(var(--shadow)/.9)] backdrop-blur-xl [animation:unblur_.35s_ease_both] sm:inset-x-auto sm:bottom-5 sm:right-5 sm:w-[26rem]`}
    >
      <header className="flex items-center justify-between border-b border-line py-3 pl-5 pr-3">
        <h2 className="font-semibold text-strong">{c.chat.fab}</h2>
        <button type="button" onClick={onClose} aria-label={c.chat.close} className="grid h-9 w-9 place-items-center rounded-full text-fog hover:bg-tint/10">
          <X size={18} />
        </button>
      </header>

      <div ref={logRef} role="log" aria-live="polite" className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[88%] rounded-2xl px-4 py-2.5 text-[0.95rem] leading-relaxed ${
              m.who === 'user' ? 'ml-auto bg-lamp text-lampink' : 'bg-tint/[0.07] text-fog'
            }`}
          >
            <p className="whitespace-pre-line">{m.text}</p>
            {m.link && (
              <a
                href={linkFor(m.link).href}
                onClick={() => window.matchMedia('(max-width: 639px)').matches && onClose()}
                className="mt-2 inline-flex items-center gap-1.5 font-medium text-sodium underline-offset-4 hover:underline"
              >
                {linkFor(m.link).label}
                <ArrowRight size={15} aria-hidden="true" />
              </a>
            )}
          </div>
        ))}
      </div>

      <ul className="flex gap-2 overflow-x-auto border-t border-line px-4 py-3">
        {c.chat.suggestions.map((s) => (
          <li key={s} className="shrink-0">
            <button
              type="button"
              onClick={() => send(s)}
              className="rounded-full border border-line px-3 py-1.5 text-sm text-fog/90 transition hover:border-sodium/60 hover:text-strong"
            >
              {s}
            </button>
          </li>
        ))}
      </ul>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(text);
        }}
        className="flex gap-2 border-t border-line p-3"
      >
        <label htmlFor="chat-text" className="sr-only">{c.chat.ask}</label>
        <input
          id="chat-text"
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={c.chat.placeholder}
          autoComplete="off"
          className="min-w-0 flex-1 rounded-full border border-line bg-ink px-4 py-2.5 text-base text-fog placeholder:text-slate/80 focus:border-sodium focus:outline-none"
        />
        <button type="submit" aria-label={c.chat.send} className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-lamp text-lampink">
          <ArrowUp size={18} />
        </button>
      </form>
    </section>
  );
}
