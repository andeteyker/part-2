import type { GrowthToolConfig } from "./types";

export const umzugskartonConfig: GrowthToolConfig = {
  tool: {
    slug: "umzugskarton-rechner",
    title: "Umzugskarton-Rechner",
    eyebrow: "Wie viele Kartons brauche ich für meinen Umzug?",
    description: "Schätze den Bedarf an Umzugskartons aus Wohnfläche, Haushaltsgröße, Bücherbestand und zusätzlichem Keller- oder Abstellraum.",
    short: "Benötigte Umzugskartons mit Reserve und Bücherkartons schätzen.",
    category: "Arbeitgeber & Business",
    icon: "Box",
    keywords: ["Umzugskartons Rechner", "wie viele Umzugskartons brauche ich", "Kartons Umzug Wohnfläche", "Umzug Karton Bedarf"],
    faq: [
      { question: "Wie viele Umzugskartons brauche ich?", answer: "Als grobe Orientierung hängt der Bedarf vor allem von Wohnfläche, Personenzahl und Menge des Hausrats ab. Der Rechner kombiniert diese Faktoren und ergänzt eine Reserve." },
      { question: "Warum werden Bücher extra gerechnet?", answer: "Bücher sind schwer und sollten auf kleinere, stabilere Kartons verteilt werden. Deshalb wird der Bücherbestand zusätzlich berücksichtigt." },
      { question: "Soll ich Reservekartons einplanen?", answer: "Ja. Ein kleiner Puffer reduziert das Risiko, am Packtag wegen einzelner Räume oder Kellerbestände nachkaufen zu müssen." }
    ],
  },
  fields: [
    { key: "flaeche", label: "Wohnfläche", defaultValue: "70", suffix: "m²" },
    { key: "personen", label: "Personen im Haushalt", defaultValue: "2" },
    { key: "buecher", label: "Regalmeter Bücher", defaultValue: "3", suffix: "m" },
    { key: "extra", label: "Keller / Garage / Abstellraum", defaultValue: "10", suffix: "Kartons zusätzlich" },
    { key: "reserve", label: "Reserve", defaultValue: "10", suffix: "%", min: 0, max: 50 },
  ],
  seo: {
    steps: [
      { title: "Wohnfläche und Personen angeben", text: "Die Grundmenge steigt mit Wohnfläche und Haushaltsgröße." },
      { title: "Sonderbestände ergänzen", text: "Bücher sowie Keller, Garage oder Abstellraum werden separat berücksichtigt." },
      { title: "Puffer einplanen", text: "Ein kleiner Reserveanteil verhindert Engpässe beim Packen." },
    ],
    formula: "Kartons ≈ Wohnfläche ÷ 2 + 5 je Person + Bücherkartons + Zusatzbestand; anschließend Reserve",
    example: "70 m², zwei Personen, 3 Regalmeter Bücher und 10 Zusatzkartons ergeben inklusive 10 % Reserve rund 64 Kartons.",
    relatedSlugs: ["umzugskosten-rechner", "mietkaution-rechner", "nebenkosten-vorauszahlung-rechner"],
  },
  notice: "Die tatsächliche Menge hängt stark davon ab, wie voll Schränke, Küche, Keller und Sammlungen sind. Lieber einige leere Kartons übrig behalten als zu knapp planen.",
};
