import About from './components/About';
import CaseStudyPage from './components/CaseStudyPage';
import Chat from './components/Chat';
import Contact from './components/Contact';
import Faq from './components/Faq';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Metrics from './components/Metrics';
import Navbar from './components/Navbar';
import NotFound from './components/NotFound';
import Pillars from './components/Pillars';
import Stack from './components/Stack';
import Work from './components/Work';
import Writing from './components/Writing';
import { SHOW_BLOG } from './data/content';
import { LangProvider, useLang } from './i18n';

function Home() {
  return (
    <>
      <Hero />
      <About />
      <Pillars />
      <Metrics />
      <Work />
      <Stack />
      {SHOW_BLOG && <Writing />}
      <Faq />
      <Contact />
    </>
  );
}

const PAGES = { home: Home, case: CaseStudyPage, 404: NotFound };

function Page() {
  const { c, page } = useLang();
  const Main = PAGES[page];
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-lamp focus:px-4 focus:py-2 focus:text-lampink">
        {c.nav.skip}
      </a>
      <Navbar />
      <main id="main">
        <Main />
      </main>
      <Footer />
      <Chat />
    </>
  );
}

/** route: { lang, page: 'home' | 'case' | '404', caseId } */
export default function App({ route }) {
  return (
    <LangProvider initialRoute={route}>
      <Page />
    </LangProvider>
  );
}
