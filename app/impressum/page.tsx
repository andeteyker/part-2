import type { Metadata } from "next";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum und Anbieterkennzeichnung von Sofort-Tools.",
  alternates: { canonical: "/impressum" },
};

export default function Impressum() {
  return (
    <>
      <SiteHeader />
      <main className="legal-page shell">
        <p className="eyebrow"><span /> Rechtliches</p>
        <h1>Impressum</h1>

        <h2>Angaben gemäß § 5 DDG</h2>
        <p>
          Erik Miel<br />
          Habichtweg 4<br />
          26835 Hesel<br />
          Deutschland
        </p>

        <h2>Kontakt</h2>
        <p>
          E-Mail: mielerik@gmail.com
        </p>

        <h2>Verantwortlich für den Inhalt</h2>
        <p>
          Erik Miel<br />
          Habichtweg 4<br />
          26835 Hesel
        </p>

        <h2>Redaktionell verantwortlich</h2>
        <p>
          Erik Miel (Anschrift wie oben).
        </p>

        <h2>Haftung für Inhalte</h2>
        <p>
          Die Inhalte dieser Website werden mit größtmöglicher Sorgfalt erstellt. Für die
          Richtigkeit, Vollständigkeit und Aktualität der bereitgestellten Informationen und
          Berechnungsergebnisse wird jedoch keine Gewähr übernommen. Die Rechner dienen der
          allgemeinen Information und ersetzen keine individuelle, fachliche Beratung.
        </p>

        <h2>Haftung für Links</h2>
        <p>
          Diese Website enthält Affiliate- und Partnerlinks, die als solche gekennzeichnet sind.
          Auf die Inhalte der verlinkten externen Websites haben wir keinen Einfluss. Für diese
          fremden Inhalte ist ausschließlich der jeweilige Anbieter oder Betreiber verantwortlich.
        </p>

        <h2>Urheberrecht</h2>
        <p>
          Die durch den Betreiber erstellten Inhalte und Funktionen dieser Website unterliegen dem
          deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
          Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung
          des Betreibers.
        </p>

        <h2>Datenschutz</h2>
        <p>
          Informationen zur Verarbeitung personenbezogener Daten finden Sie in der
          <a href="/datenschutz">Datenschutzerklärung</a>.
        </p>

        <h2>Verbraucherstreitbeilegung</h2>
        <p>
          Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </main>
      <SiteFooter />
    </>
  );
}