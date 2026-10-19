import { useState } from 'react';
import { Mail, Menu, Moon, Sun, X } from 'lucide-react';
import { EMAIL, LANG_PATH } from '../data/content';
import { toggleTheme, useActiveSection, useScrolled } from '../hooks';
import { track } from '../analytics';
import { pathFor, useLang } from '../i18n';

export default function Navbar() {
  const { lang, page, caseId, c, switchLang, section } = useLang();
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const other = lang === 'sk' ? 'en' : 'sk';
  const active = useActiveSection(c.nav.links.map((l) => l.href.slice(1)), page === 'home');

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4">
      <nav
        aria-label={c.nav.main}
        className={`mx-auto flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(.2,.7,.2,1)] ${
          scrolled || open
            ? 'max-w-4xl rounded-full border border-line/80 bg-deep/70 py-2 pl-5 pr-2 shadow-[0_10px_40px_-10px_rgb(var(--shadow)/.6)] backdrop-blur-xl'
            : 'max-w-page rounded-none border border-transparent bg-transparent px-2 py-4 sm:px-5'
        }`}
      >
        <a href={section('#top')} className="font-mono text-sm text-fog transition hover:text-sodium">
          &lt; SK /&gt;
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {c.nav.links.map((item) => (
            <li key={item.href}>
              <a
                href={section(item.href)}
                aria-current={active === item.href.slice(1) ? 'location' : undefined}
                className="rounded-full px-3 py-1.5 text-sm text-slate transition hover:bg-tint/5 hover:text-fog aria-[current=location]:bg-tint/[0.07] aria-[current=location]:text-strong"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={page === '404' ? LANG_PATH[other] : pathFor(other, caseId)}
            hrefLang={other}
            lang={other}
            onClick={(e) => {
              e.preventDefault();
              switchLang(other);
            }}
            className="grid h-10 w-10 place-items-center rounded-full border border-line text-sm font-medium text-fog transition hover:border-sodium/60 hover:text-strong"
          >
            {c.nav.langShort}
            <span className="sr-only">: {c.nav.langSwitch}</span>
          </a>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={c.nav.theme}
            title={c.nav.theme}
            className="grid h-10 w-10 place-items-center rounded-full border border-line text-fog transition hover:border-sodium/60 hover:text-strong"
          >
            <Sun size={17} className="theme-sun" aria-hidden="true" />
            <Moon size={17} className="theme-moon" aria-hidden="true" />
          </button>
          <a
            href={`mailto:${EMAIL}`}
            onClick={() => track('Email click', { place: 'navbar' })}
            className={`btn-lamp !py-2 text-sm transition-all duration-500 ${scrolled ? 'max-[420px]:hidden' : 'max-sm:hidden'}`}
          >
            <Mail size={16} aria-hidden="true" />
            {c.nav.email}
          </a>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full text-fog hover:bg-tint/5 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? c.nav.closeMenu : c.nav.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-nav"
        className={`mx-auto mt-2 max-w-4xl overflow-hidden rounded-3xl border border-line/80 bg-deep/90 backdrop-blur-xl transition-all duration-500 lg:hidden ${
          open ? 'max-h-96 opacity-100' : 'pointer-events-none max-h-0 border-transparent opacity-0'
        }`}
      >
        <ul className="p-3">
          {c.nav.links.map((item) => (
            <li key={item.href}>
              <a
                href={section(item.href)}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3 font-serif text-2xl text-fog hover:bg-tint/5"
                tabIndex={open ? 0 : -1}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
