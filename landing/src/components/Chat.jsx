import { Suspense, lazy, useRef, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { track } from '../analytics';
import { useLang } from '../i18n';

// The panel and answer engine are fetched the first time the chat is opened.
const ChatPanel = lazy(() => import('./ChatPanel'));

export default function Chat() {
  const { c } = useLang();
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const fabRef = useRef(null);

  const show = () => {
    setLoaded(true);
    setOpen(true);
    track('Chat opened');
  };
  const hide = () => {
    setOpen(false);
    fabRef.current?.focus();
  };

  return (
    <>
      <button
        ref={fabRef}
        type="button"
        onClick={show}
        aria-expanded={open}
        aria-controls="chat-panel"
        className={`btn-lamp fixed bottom-5 right-5 z-40 shadow-[0_10px_40px_-8px_rgb(var(--shadow)/.7)] transition-all duration-300 ${
          open ? 'pointer-events-none translate-y-3 opacity-0' : ''
        }`}
      >
        <MessageCircle size={18} aria-hidden="true" />
        <span className="max-sm:sr-only">{c.chat.fab}</span>
      </button>
      {loaded && (
        <Suspense fallback={null}>
          <ChatPanel open={open} onClose={hide} />
        </Suspense>
      )}
    </>
  );
}
