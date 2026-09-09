import type { Metadata } from "next";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: "Datenschutzhinweise zur Nutzung von SofortTools.",
  alternates: { canonical: "/datenschutz" },
  robots: { index: false, follow: true },
};

export default function Datenschutz() {
  return <><SiteHeader /><main className="legal-page shell">
    <p className="eyebrow"><span /> Rechtliches</p><h1>Datenschutzerklärung</h1>
    <h2>1. Verantwortlicher</h2><p>Easysites, Inhaber Erik Miel<br />Habichtweg 4<br />26835 Hesel<br />E-Mail: <a href="mailto:mielerik@gmail.com">mielerik@gmail.com</a></p>
    <h2>2. Lokale Verarbeitung</h2><p>Die meisten SofortTools verarbeiten Eingaben ausschließlich lokal im Browser. Texte, Bilder, Zahlenwerte und erzeugte Passwörter werden dabei nicht an uns übertragen. Berechnungen bleiben auf dem verwendeten Gerät.</p>
    <h2>3. Server-Protokolle</h2><p>Beim Aufruf der Website verarbeitet der Hostinganbieter technisch notwendige Verbindungsdaten wie IP-Adresse, Zeitpunkt, aufgerufene Seite und Browsertyp. Dies dient der sicheren und stabilen Bereitstellung. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.</p>
    <h2>4. Externe Abfragen</h2><p>Das Werkzeug „Meine IP“ fragt die öffentliche IP-Adresse über den Dienst ipify ab. Dabei entsteht eine direkte Verbindung zu diesem Anbieter. Andere lokale Werkzeuge benötigen keine externe Übertragung.</p>
    <h2>5. Reichweitenmessung mit Plausible</h2><p>Nach ausdrücklicher Zustimmung verwenden wir Plausible Analytics, einen Dienst der Plausible Insights OÜ aus Estland. Die Reichweitenmessung hilft uns zu verstehen, welche Seiten aufgerufen werden und wie Besucher zu SofortTools gelangen. Plausible verarbeitet dafür nach eigenen Angaben ausschließlich zusammengefasste Nutzungsdaten und setzt keine Cookies oder dauerhaften Kennungen ein. Erfasst werden insbesondere aufgerufene Seite, verweisende Website, Browser, Betriebssystem, Gerätetyp und eine aus der IP-Adresse abgeleitete ungefähre Region; die IP-Adresse wird nicht gespeichert. Die Verarbeitung erfolgt ausschließlich auf Grundlage deiner Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO. Weitere Informationen findest du in der <a href="https://plausible.io/data-policy" target="_blank" rel="noreferrer">Datenrichtlinie von Plausible</a>.</p>
    <h2>6. Einwilligungsverwaltung</h2><p>Die Entscheidung im Datenschutz-Banner wird ausschließlich im lokalen Speicher des Browsers unter dem Schlüssel „st-consent“ gespeichert. Ohne aktive Zustimmung wird Plausible nicht geladen und es entsteht keine Verbindung zu diesem Anbieter.</p>
    <h2>7. Widerruf und Änderung</h2><p>Eine erteilte Einwilligung kann jederzeit mit Wirkung für die Zukunft geändert werden. Über „Datenschutz-Einstellungen“ im Fußbereich jeder Seite wird die Auswahl erneut geöffnet. Alternativ kann der Eintrag „st-consent“ im lokalen Speicher des Browsers gelöscht werden.</p>
    <h2>8. Affiliate-Links</h2><p>Gekennzeichnete Partnerlinks können zu externen Anbietern führen. Beim Anklicken wird die Zielseite direkt geöffnet; dort gelten die Datenschutzbestimmungen des jeweiligen Anbieters. SofortTools setzt derzeit selbst keine Tracking-Cookies für Partnerlinks. Über einen Kauf kann eine Provision entstehen, ohne dass sich der Preis erhöht.</p>
    <h2>9. Rechte betroffener Personen</h2><p>Es bestehen insbesondere Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch nach Maßgabe der Art. 15 bis 21 DSGVO. Zur Ausübung genügt eine E-Mail an die oben genannte Adresse.</p>
    <h2>10. Beschwerderecht</h2><p>Betroffene Personen können sich bei einer Datenschutz-Aufsichtsbehörde beschweren. Für Niedersachsen ist die Landesbeauftragte für den Datenschutz Niedersachsen zuständig.</p>
    <h2>11. Stand</h2><p>Stand dieser Datenschutzerklärung: September 2026.</p>
  </main><SiteFooter /></>;
}
