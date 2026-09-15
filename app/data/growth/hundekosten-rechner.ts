import type { GrowthToolConfig } from "./types";

export const hundekostenConfig: GrowthToolConfig = {
  tool: {
    slug: "hundekosten-rechner",
    title: "Hundekosten-Rechner",
    eyebrow: "Was kostet ein Hund pro Monat und Jahr?",
    description: "Plane laufende Hundekosten aus Futter, Steuer, Versicherung, Tierarzt-Rücklage, Pflege und Betreuung und rechne einmalige Anschaffungskosten auf das erste Jahr um.",
    short: "Monatliche und jährliche Hundekosten realistisch zusammenrechnen.",
    category: "Familie & Leben",
    icon: "Hund",
    keywords: ["Hund Kosten Rechner", "was kostet ein Hund im Monat", "Hund Kosten pro Jahr", "Hund Budget Rechner"],
    faq: [
      { question: "Was kostet ein Hund im Monat?", answer: "Die Kosten unterscheiden sich stark nach Größe, Futter, Versicherung, Betreuung und Gesundheit. Deshalb arbeitet der Rechner mit deinen eigenen Monats- und Jahreswerten statt mit einer pauschalen Zahl." },
      { question: "Welche Kosten sollte ich einplanen?", answer: "Typisch sind Futter, Hundesteuer, Haftpflicht oder Krankenversicherung, Tierarzt-Rücklage, Pflege, Zubehör und gegebenenfalls Hundeschule oder Betreuung." },
      { question: "Sind Notfälle enthalten?", answer: "Nur wenn du dafür eine eigene monatliche Tierarzt- oder Notfallrücklage einträgst. Größere Operationen können deutlich darüber liegen." }
    ],
  },
  fields: [
    { key: "futter", label: "Futter & Leckerlis", defaultValue: "70", suffix: "€/Monat" },
    { key: "versicherung", label: "Versicherung", defaultValue: "30", suffix: "€/Monat" },
    { key: "tierarzt", label: "Tierarzt-Rücklage", defaultValue: "35", suffix: "€/Monat" },
    { key: "pflege", label: "Pflege, Zubehör & Training", defaultValue: "25", suffix: "€/Monat" },
    { key: "betreuung", label: "Betreuung / Hundesitter", defaultValue: "0", suffix: "€/Monat" },
    { key: "steuer", label: "Hundesteuer", defaultValue: "120", suffix: "€/Jahr" },
    { key: "einmalig", label: "Anschaffung & Erstausstattung", defaultValue: "700", suffix: "€" },
  ],
  seo: {
    steps: [
      { title: "Laufende Kosten erfassen", text: "Trage die regelmäßigen Monatskosten für Futter, Absicherung, Rücklagen und Betreuung ein." },
      { title: "Jahreskosten ergänzen", text: "Hundesteuer oder andere jährliche Beiträge werden automatisch auf den Monat umgelegt." },
      { title: "Erstes Jahr separat betrachten", text: "Anschaffung und Erstausstattung werden zusätzlich ausgewiesen, weil sie nicht jedes Jahr anfallen." },
    ],
    formula: "Monatskosten = laufende Monatskosten + Jahreskosten ÷ 12; erstes Jahr = Monatskosten × 12 + Einmalkosten",
    example: "70 € Futter, 30 € Versicherung, 35 € Tierarztrücklage, 25 € Pflege und 120 € Steuer ergeben rund 170 € pro Monat vor Betreuung.",
    relatedSlugs: ["haushaltsbudget-rechner", "erspartes-reichweite-rechner", "mietkaution-rechner"],
  },
  notice: "Tierarzt- und Betreuungskosten können stark schwanken. Der Rechner ist eine Budgethilfe und ersetzt keine individuelle Versicherungs- oder Tierarztberatung.",
};
