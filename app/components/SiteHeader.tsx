import Link from "next/link";
import { BrandIcon } from "./BrandIcon";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand" href="/" aria-label="Sofort-Tools Startseite">
          <span className="brand-mark"><BrandIcon /></span>
          <span>Sofort-<span>Tools</span></span>
        </Link>
        <nav aria-label="Hauptnavigation">
          <Link href="/#tools">Alle Tools</Link>
          <Link href="/#kategorien">Kategorien</Link>
          <Link className="nav-ratgeber" href="/ratgeber">Ratgeber</Link>
          <Link href="/datenschutz">Datenschutz</Link>
        </nav>
      </div>
    </header>
  );
}
