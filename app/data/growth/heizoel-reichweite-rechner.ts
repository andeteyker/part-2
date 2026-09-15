import type { GrowthToolConfig } from "./types";

export const heizoelReichweiteConfig: GrowthToolConfig = {
  tool: {
    slug: "heizoel-reichweite-rechner",
    title: "Heizöl-Reichweite-Rechner",
    eyebrow: "Wie lange reicht der aktuelle Tankbestand?",
    description: "Schätze aus Tankbestand und typischem Jahresverbrauch, wie viele Monate dein Heizöl rechnerisch noch reicht und wann Nachbestellen sinnvoll wird.",
    short: "Heizölbestand in eine geschätzte Reichweite in Monaten umrechnen.",
    category: "Energie & Umwelt",
    icon: "Öl",
    keywords: ["wie lange reicht Heizöl", "Heizöl Reichweite Rechner", "Heizöltank Restmenge Rechner", "Heizöl Verbrauch Monate"],
    faq: [
      { question: "Wie lange reichen 1.000 Liter Heizöl?", answer: "Das hängt vom individuellen Jahresverbrauch und von der Jahreszeit ab. Der Rechner teilt den Tankbestand durch den durchschnittlichen Monatsverbrauch und liefert eine grobe Reichweite." },
      { question: "Ist der Heizölverbrauch jeden Monat gleich?", answer: "Nein. In der Heizperiode ist der Verbrauch deutlich höher. Die Berechnung ist deshalb eine Planungsorientierung und keine tagesgenaue Prognose." },
      { question: "Soll ich eine Reserve im Tank lassen?", answer: "Eine Sicherheitsreserve kann sinnvoll sein, damit Lieferverzögerungen oder ein kalter Monat nicht sofort zu einem leeren Tank führen." }
    ],
  },
  fields: [
    { key: "bestand", label: "Aktueller Tankbestand", defaultValue: "1800", suffix: "Liter" },
    { key: "jahresverbrauch", label: "Typischer Jahresverbrauch", defaultValue: "2400", suffix: "Liter/Jahr" },
    { key: "reserve", label: "Sicherheitsreserve", defaultValue: "15", suffix: "%", min: 0, max: 80 },
  ],
  seo: {
    steps: [
      { title: "Restmenge schätzen", text: "Nutze Tankanzeige, Peilstab oder die letzte Befüllmenge als Ausgangswert." },
      { title: "Jahresverbrauch eintragen", text: "Am besten eignet sich der Durchschnitt der letzten zwei bis drei Jahre." },
      { title: "Reserve berücksichtigen", text: "Der Rechner zieht eine frei wählbare Sicherheitsreserve vom nutzbaren Bestand ab." },
    ],
    formula: "Reichweite in Monaten = nutzbarer Heizölbestand ÷ (Jahresverbrauch ÷ 12)",
    example: "Bei 1.800 Litern im Tank, 2.400 Litern Jahresverbrauch und 15 % Reserve bleiben rechnerisch rund 7,7 Monatsdurchschnitte.",
    relatedSlugs: ["heizkosten-rechner", "co2-heizkosten-rechner", "energie-abschlag-rechner"],
  },
  notice: "Der Verbrauch schwankt stark nach Außentemperatur, Gebäude, Warmwasserbedarf und Heizverhalten. Die Reichweite ist eine Durchschnittsschätzung.",
};
