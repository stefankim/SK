import { useLang } from '../i18n';

export default function Footer() {
  const { c, section } = useLang();
  return (
    <footer className="border-t border-line bg-deep">
      <div className="page flex flex-col gap-4 pb-24 pt-10 text-sm text-slate sm:flex-row sm:items-center sm:justify-between">
        <p>{c.footer.copyright(new Date().getFullYear())}</p>
        <ul className="flex flex-wrap gap-5">
          {c.nav.links.map((n) => (
            <li key={n.href}>
              <a href={section(n.href)} className="transition hover:text-fog">{n.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
