import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <div className="brand footer-brand"><span className="brand-mark">S</span><span>Sofort<span>Tools</span></span></div>
          <p>Kostenlose Online-Werkzeuge. Schnell, übersichtlich und ohne Anmeldung.</p>
        </div>
        <div>
          <strong>Navigation</strong>
          <Link href="/#tools">Alle Tools</Link>
          <Link href="/datenschutz">Datenschutz</Link>
          <Link href="/impressum">Impressum</Link>
        </div>
        <p className="footer-note">© {new Date().getFullYear()} SofortTools</p>
      </div>
    </footer>
  );
}

