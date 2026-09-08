import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Über SofortTools – Rechner verständlich und transparent",
  description: "Wie SofortTools kostenlose Online-Rechner entwickelt, Rechenwege erklärt, Quellen prüft und Hinweise auf Grenzen und Annahmen transparent macht.",
  alternates: { canonical: "/ueber-uns" },
};

export default function AboutPage() {
  return <><SiteHeader /><main className="legal-page shell">
    <p className="eyebrow"><span /> Über SofortTools</p>
    <h1>Rechnen soll verständlich bleiben.</h1>
    <p>SofortTools entwickelt kostenlose Rechner für konkrete Fragen aus Alltag, Beruf, Finanzen, Immobilien und weiteren Themen. Ein Ergebnis allein reicht dabei nicht: Wir zeigen auch den Rechenweg, erklären Fachbegriffe direkt am Eingabefeld und nennen die Grenzen einer vereinfachten Berechnung.</p>

    <h2>So entstehen die Rechner</h2>
    <p>Jeder Rechner beginnt mit einer klaren Frage. Daraus werden die benötigten Eingaben, die Formel und ein nachvollziehbares Beispiel abgeleitet. Bei rechtlich oder fachlich sensiblen Themen verweisen wir nach Möglichkeit auf offizielle Grundlagen. Annahmen und Vereinfachungen stehen sichtbar beim Ergebnis.</p>

    <h2>Was ein Ergebnis leisten kann</h2>
    <p>Die Rechner sollen Größenordnungen verständlich machen, Varianten vergleichen und die Vorbereitung auf ein Gespräch erleichtern. Sie ersetzen keine individuelle Rechts-, Steuer-, Finanz- oder medizinische Beratung. Gerade bei persönlichen oder weitreichenden Entscheidungen sollte das Ergebnis mit aktuellen Unterlagen oder fachkundigen Stellen abgeglichen werden.</p>

    <h2>Korrekturen und Hinweise</h2>
    <p>Gesetze, Tarife und Richtwerte verändern sich. Wenn dir eine unklare Erklärung, ein veralteter Wert oder ein Rechenfehler auffällt, schreib bitte an <a href="mailto:mielerik@gmail.com">mielerik@gmail.com</a> und nenne den betroffenen Rechner. So können wir den Hinweis gezielt prüfen.</p>

    <h2>Betreiber</h2>
    <p>SofortTools ist ein Angebot von Easysites, Inhaber Erik Miel. Die vollständigen Angaben findest du im <Link href="/impressum">Impressum</Link>; Informationen zum Umgang mit Daten stehen in der <Link href="/datenschutz">Datenschutzerklärung</Link>.</p>
  </main><SiteFooter /></>;
}
