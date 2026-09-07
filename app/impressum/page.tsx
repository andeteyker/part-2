import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum und Anbieterkennzeichnung von SofortTools.",
  alternates: { canonical: "/impressum" },
  robots: { index: false, follow: true },
};

export default function Impressum() {
  return <><SiteHeader /><main className="legal-page shell">
    <p className="eyebrow"><span /> Rechtliches</p><h1>Impressum</h1>
    <h2>Angaben gemäß § 5 DDG</h2><p><strong>Easysites</strong><br />Inhaber: Erik Miel<br />Habichtweg 4<br />26835 Hesel<br />Deutschland</p>
    <h2>Kontakt</h2><p>E-Mail: <a href="mailto:mielerik@gmail.com">mielerik@gmail.com</a></p>
    <h2>Verantwortlich für den Inhalt</h2><p>Erik Miel<br />Anschrift wie oben</p>
    <h2>Hinweis zu den Rechnern</h2><p>Die Ergebnisse der bereitgestellten Werkzeuge sind unverbindliche Rechenhilfen und dienen der allgemeinen Orientierung. Sie ersetzen keine Rechts-, Steuer-, Finanz- oder Fachberatung. Trotz sorgfältiger Entwicklung kann keine Gewähr für die Richtigkeit, Vollständigkeit und Aktualität übernommen werden.</p>
    <h2>Haftung für Links</h2><p>Diese Website kann gekennzeichnete Affiliate- und Partnerlinks enthalten. Auf die Inhalte der verlinkten externen Websites haben wir keinen Einfluss. Für diese fremden Inhalte ist ausschließlich der jeweilige Anbieter oder Betreiber verantwortlich.</p>
    <h2>Urheberrecht</h2><p>Die durch den Betreiber erstellten Inhalte und Funktionen dieser Website unterliegen dem deutschen Urheberrecht. Vervielfältigung, Bearbeitung und Verbreitung außerhalb der gesetzlichen Grenzen bedürfen der vorherigen Zustimmung.</p>
    <h2>Datenschutz</h2><p>Informationen zur Verarbeitung personenbezogener Daten stehen in der <Link href="/datenschutz">Datenschutzerklärung</Link>.</p>
    <h2>Verbraucherstreitbeilegung</h2><p>Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
  </main><SiteFooter /></>;
}
