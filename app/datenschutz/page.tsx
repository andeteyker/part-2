import type { Metadata } from "next";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: "Datenschutzhinweise von Sofort-Tools.",
  alternates: { canonical: "/datenschutz" },
};

export default function Datenschutz() {
  return (
    <>
      <SiteHeader />
      <main className="legal-page shell">
        <p className="eyebrow"><span /> Rechtliches</p>
        <h1>Datenschutzerklärung</h1>

        <h2>1. Verantwortlicher</h2>
        <p>
          Erik Miel<br />
          Habichtweg 4<br />
          26835 Hesel<br />
          E-Mail: mielerik@gmail.com
        </p>

        <h2>2. Grundsatz: Lokale Verarbeitung</h2>
        <p>
          Die meisten Sofort-Tools verarbeiten Ihre Eingaben ausschließlich lokal in Ihrem Browser.
          Texte, Bilder, Zahlenwerte und erzeugte Passwörter werden dabei nicht an uns übertragen
          und nicht gespeichert. Ihre Berechnungen bleiben auf Ihrem Gerät.
        </p>

        <h2>3. Server-Protokolle</h2>
        <p>
          Beim Aufruf dieser Website verarbeitet der Hostinganbieter technisch notwendige
          Verbindungsdaten wie IP-Adresse, Zeitpunkt, aufgerufene Seite und Browsertyp. Dies dient
          der sicheren und stabilen Bereitstellung der Website. Rechtsgrundlage ist Art. 6 Abs. 1
          lit. f DSGVO (berechtigtes Interesse am Betrieb der Website). Die Daten werden nicht mit
          anderen Datenquellen zusammengeführt.
        </p>

        <h2>4. Externe Abfragen</h2>
        <p>
          Einzelne Werkzeuge können bei Bedarf externe Datenquellen abfragen. Falls ein solches
          Werkzeug aktiviert ist, wird die jeweils betroffene Verbindung in diesem Abschnitt
          ergänzt. Der überwiegende Teil der Werkzeuge benötigt keine externe Übertragung.
        </p>

        <h2>5. Einwilligungsverwaltung (Consent)</h2>
        <p>
          Soweit wir Dienste einsetzen, die Cookies oder Tracking über nicht technisch notwendige
          Mittel verwenden (z. B. Reichweitenmessung, personalisierte Werbung oder Affiliate-Messung),
          holen wir vorab Ihre Einwilligung über einen Consent-Banner ein (Rechtsgrundlage
          Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TTDSG). Ohne Ihre Einwilligung werden solche
          Dienste nicht aktiviert. Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft
          widerrufen.
        </p>

        <h2>6. Werbung und Affiliate-Links</h2>
        <p>
          Auf dieser Website können Werbeanzeigen und Affiliate- bzw. Partnerlinks eingebunden sein.
          Diese sind jeweils als „Anzeige“, „Werbung“ oder „Partnerlink“ deutlich gekennzeichnet.
          Wenn Sie über einen solchen Link ein Produkt oder eine Dienstleistung erwerben, können wir
          eine Provision erhalten. Für Sie entstehen dadurch keine Mehrkosten.
        </p>
        <p>
          Die Messung solcher Klicks und daraus resultierender Käufe erfolgt nur, soweit Sie hierfür
          über den Consent-Banner eingewilligt haben. Ohne Einwilligung werden Affiliate-Links ohne
          personenbezogenes Tracking ausgeliefert.
        </p>

        <h2>7. Externe Vergleichs- und Partnerdienste</h2>
        <p>
          Bei einzelnen Rechnern (z. B. Kreditrate, Kaufnebenkosten) kann ein Vergleichs- oder
          Partner-Widget eines externen Anbieters eingebunden sein, das passende Angebote anzeigt
          (z. B. Finanzvergleichsportale). Beim Anzeigen solcher Widgets kann eine Verbindung zu
          diesem Anbieter entstehen. Welche Daten der jeweilige Anbieter verarbeitet, entnehmen Sie
          bitte dessen Datenschutzerklärung. Die Einbindung erfolgt ausschließlich mit Ihrer
          Einwilligung.
        </p>

        <h2>8. Auflistung eingebundener Dienste</h2>
        <p>
          Die konkrete, aktuell eingebundene Liste externer Dienste (Anbieter, Zweck, Art der Daten)
          wird in dieser Datenschutzerklärung ergänzt, sobald entsprechende Dienste aktiv geschaltet
          werden. Bis dahin setzt Sofort-Tools keine eigenen Analyse- oder Marketing-Dienste ein.
        </p>

        <h2>9. Ihre Rechte</h2>
        <p>
          Ihnen stehen hinsichtlich Ihrer personenbezogenen Daten folgende Rechte zu: Auskunft
          (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der
          Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch gegen die
          Verarbeitung (Art. 21). Zur Ausübung Ihrer Rechte genügt eine E-Mail an
          mielerik@gmail.com.
        </p>

        <h2>10. Beschwerderecht</h2>
        <p>
          Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren. Zuständig
          ist die Aufsichtsbehörde Ihres Wohnortes oder des Ortes des mutmaßlichen Verstoßes. Für
          Niedersachsen ist die Landesbeauftragte für den Datenschutz Niedersachsen zuständig.
        </p>

        <h2>11. Stand dieser Erklärung</h2>
        <p>Diese Datenschutzerklärung hat den Stand: September 2026. Sie wird bei Änderungen an
          eingebundenen Diensten aktualisiert.</p>
      </main>
      <SiteFooter />
    </>
  );
}