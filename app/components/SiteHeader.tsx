import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand" href="/" aria-label="SofortTools Startseite">
          <span className="brand-mark">S</span>
          <span>Sofort<span>Tools</span></span>
        </Link>
        <nav aria-label="Hauptnavigation">
          <Link href="/#tools">Alle Tools</Link>
          <Link href="/#kategorien">Kategorien</Link>
          <Link href="/datenschutz">Datenschutz</Link>
        </nav>
      </div>
    </header>
  );
}

