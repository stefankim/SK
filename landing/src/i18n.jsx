import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { CASE_STUDIES } from './data/caseStudies';
import { CONTENT, LANG_PATH, PROJECTS } from './data/content';

const LangContext = createContext(null);

export const langFromPath = (path) => (path.startsWith('/sk') ? 'sk' : 'en');

/** URL of a page: the home page, or a case study when caseId is set. */
export const pathFor = (lang, caseId) => LANG_PATH[lang] + (caseId ? `work/${caseId}/` : '');

/** Parses /, /sk/, /work/<id>/ and /sk/work/<id>/; any other path is the 404 page. */
export function parseRoute(path) {
  const lang = langFromPath(path);
  const rest = path.slice(LANG_PATH[lang].length - 1).replace(/\/+$/, '') || '/';
  if (rest === '/' || rest === '/index.html') return { lang, page: 'home', caseId: null };
  const caseId = rest.match(/^\/work\/([a-z0-9-]+)$/)?.[1];
  if (caseId && PROJECTS.some((p) => p.id === caseId)) return { lang, page: 'case', caseId };
  return { lang, page: '404', caseId: null };
}

export function pageTitle({ lang, page, caseId }) {
  const c = CONTENT[lang];
  if (page === 'case') return c.caseStudy.pageTitle(CASE_STUDIES[lang][caseId].title);
  if (page === '404') return `${c.notFound.title} — Stefan Kimak`;
  return c.meta.title;
}

/** Holds the current route; switching language keeps the page and changes the URL prefix. */
export function LangProvider({ initialRoute, children }) {
  const [route, setRoute] = useState(initialRoute);
  const { lang, page, caseId } = route;

  const switchLang = useCallback((next) => {
    try {
      localStorage.setItem('lang', next);
    } catch { /* private mode */ }
    if (page !== '404') window.history.pushState(null, '', pathFor(next, caseId) + window.location.hash);
    setRoute((r) => ({ ...r, lang: next }));
  }, [page, caseId]);

  useEffect(() => {
    const onPop = () => setRoute(parseRoute(window.location.pathname));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = pageTitle(route);
  }, [lang, route]);

  // Section links point at the home page when rendered on another page.
  const value = useMemo(() => ({
    lang,
    page,
    caseId,
    c: CONTENT[lang],
    switchLang,
    section: (hash) => (page === 'home' ? hash : LANG_PATH[lang] + hash),
  }), [lang, page, caseId, switchLang]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
