import type { GrowthToolConfig } from "./types";

export const erspartesReichweiteConfig: GrowthToolConfig = {
  tool: {
    slug: "erspartes-reichweite-rechner",
    title: "Wie lange reicht mein Erspartes? Rechner",
    eyebrow: "Finanzielle Reichweite bei monatlichem Defizit",
    description: "Berechne, wie viele Monate dein Erspartes bei deinen aktuellen Einnahmen und Ausgaben reicht und wie groß dein monatlicher Finanzierungsbedarf ist.",
    short: "Reichweite von Erspartem und Rücklagen in Monaten berechnen.",
    category: "Finanzen & Steuern",
    icon: "Mon.",
    keywords: ["wie lange reicht mein Erspartes", "Erspartes Reichweite Rechner", "Rücklagen Rechner", "wie lange reicht mein Geld"],
    faq: [
      { question: "Wie wird die Reichweite meines Ersparten berechnet?", answer: "Der Rechner bildet zuerst die monatliche Lücke aus Ausgaben minus regelmäßigen Einnahmen. Ist die Lücke positiv, wird dein verfügbares Erspartes durch diesen Betrag geteilt." },
      { question: "Was passiert, wenn meine Einnahmen höher als meine Ausgaben sind?", answer: "Dann wird die Rücklage unter den eingegebenen Annahmen nicht aufgezehrt. Statt einer begrenzten Reichweite zeigt der Rechner den monatlichen Überschuss." },
      { question: "Welche Ausgaben sollte ich ansetzen?", answer: "Nutze möglichst alle notwendigen Monatsausgaben inklusive Wohnen, Lebensmittel, Versicherungen, Mobilität und realistischer Rücklagen für unregelmäßige Rechnungen." },
    ],
  },
  fields: [
    { key: "erspartes", label: "Verfügbares Erspartes", defaultValue: "15000", suffix: "€" },
    { key: "einnahmen", label: "Regelmäßige Einnahmen", defaultValue: "1800", suffix: "€/Monat" },
    { key: "ausgaben", label: "Monatliche Ausgaben", defaultValue: "2500", suffix: "€/Monat" },
  ],
  seo: {
    steps: [
      { title: "Verfügbares Erspartes eintragen", text: "Nutze nur Geld, das tatsächlich zur Überbrückung verfügbar ist und nicht fest für andere Zwecke gebunden ist." },
      { title: "Einnahmen und Ausgaben gegenüberstellen", text: "Trage realistische Monatswerte ein, damit die tatsächliche Finanzierungslücke sichtbar wird." },
      { title: "Reichweite als Szenario lesen", text: "Ändere Ausgaben oder Einnahmen, um sofort zu sehen, wie stark sich deine finanzielle Reichweite verändert." },
    ],
    formula: "Reichweite in Monaten = verfügbares Erspartes ÷ max(monatliche Ausgaben − monatliche Einnahmen, 0)",
    example: "Bei 15.000 € Erspartem, 1.800 € Einnahmen und 2.500 € Ausgaben entsteht eine Lücke von 700 € pro Monat. Das Geld reicht rechnerisch rund 21,4 Monate.",
    relatedSlugs: ["haushaltsbudget-rechner", "arbeitslosengeld-rechner", "zinseszins-rechner"],
  },
  notice: "Die Rechnung ist eine Liquiditätsplanung mit konstanten Monatswerten. Einmalige Ausgaben, Inflation, Steuern, Renditen und unerwartete Kosten können die tatsächliche Reichweite verändern.",
};
