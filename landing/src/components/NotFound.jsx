import { hrefFor } from '../i18n';
import { useLang } from '../i18n';

export default function NotFound() {
  const { lang, c } = useLang();
  return (
    <section className="page flex min-h-[80svh] flex-col justify-center pt-28">
      <p className="font-mono text-sodium">404</p>
      <h1 className="display mt-4 text-[clamp(3rem,8vw,6rem)] text-strong">{c.notFound.title}</h1>
      <p className="mt-6 max-w-[46ch] text-lg text-fog/90">{c.notFound.body}</p>
      <a href={hrefFor(lang)} className="btn-lamp mt-10 self-start">{c.notFound.home}</a>
    </section>
  );
}
