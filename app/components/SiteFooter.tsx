import Link from "next/link";
import { ConsentSettingsButton } from "./ConsentSettingsButton";
import { BrandIcon } from "./BrandIcon";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <div className="brand footer-brand"><span className="brand-mark"><BrandIcon /></span><span>Sofort-<span>Tools</span></span></div>
          <p>Kostenlose Online-Werkzeuge. Schnell, übersichtlich und ohne Anmeldung.</p>
        </div>
        <div>
          <strong>Navigation</strong>
          <Link href="/#tools">Alle Tools</Link>
          <Link href="/datenschutz">Datenschutz</Link>
          <ConsentSettingsButton />
          <Link href="/impressum">Impressum</Link>
        </div>
        <p className="footer-note">© {new Date().getFullYear()} Sofort-Tools</p>
      </div>
    </footer>
  );
}
