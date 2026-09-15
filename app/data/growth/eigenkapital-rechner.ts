import type { GrowthToolConfig } from "./types";

export const eigenkapitalConfig: GrowthToolConfig = {
  tool: {
    slug: "eigenkapital-rechner",
    title: "Eigenkapital-Rechner Immobilie",
    eyebrow: "Wie viel Eigenkapital brauche ich für den Kauf?",
    description: "Berechne, wie viel Eigenkapital für Kaufpreis und Kaufnebenkosten vorhanden sein sollte und wie hoch das verbleibende Darlehen sowie die Eigenkapitalquote ausfallen.",
    short: "Eigenkapitalbedarf, Darlehen und Eigenkapitalquote beim Immobilienkauf berechnen.",
    category: "Finanzen & Steuern",
    icon: "EK",
    keywords: ["Eigenkapital Rechner Immobilie", "wie viel Eigenkapital Hauskauf", "Eigenkapitalquote Hauskauf", "Kaufnebenkosten Eigenkapital"],
    faq: [
      { question: "Wie viel Eigenkapital sollte ich beim Hauskauf haben?", answer: "Es gibt keine für alle passende feste Quote. Häufig wird empfohlen, zumindest die Kaufnebenkosten aus Eigenmitteln tragen zu können; mehr Eigenkapital reduziert Darlehenssumme und Finanzierungsrisiko." },
      { question: "Zählen Kaufnebenkosten zum Eigenkapitalbedarf?", answer: "Für die Budgetplanung ja. Grunderwerbsteuer, Notar, Grundbuch und gegebenenfalls Makler erhöhen den Gesamtmittelbedarf zusätzlich zum Kaufpreis." },
      { question: "Was zeigt die Eigenkapitalquote?", answer: "Sie zeigt, welcher Anteil der gesamten Kaufkosten durch eigenes Kapital gedeckt wird. Eine höhere Quote bedeutet ein niedrigeres benötigtes Darlehen." }
    ],
  },
  fields: [
    { key: "kaufpreis", label: "Kaufpreis", defaultValue: "350000", suffix: "€" },
    { key: "nebenkosten", label: "Kaufnebenkosten", defaultValue: "10", suffix: "%", min: 0, max: 25, step: 0.1 },
    { key: "eigenkapital", label: "Vorhandenes Eigenkapital", defaultValue: "70000", suffix: "€" },
    { key: "reserve", label: "Reserve nach Kauf", defaultValue: "15000", suffix: "€" },
  ],
  seo: {
    steps: [
      { title: "Gesamtkosten ermitteln", text: "Zum Kaufpreis werden die geschätzten Kaufnebenkosten addiert." },
      { title: "Reserve schützen", text: "Ein Teil des vorhandenen Eigenkapitals kann bewusst als Liquiditätsreserve unangetastet bleiben." },
      { title: "Finanzierungsbedarf ablesen", text: "Der verbleibende Betrag zeigt den ungefähren Kreditbedarf und die resultierende Eigenkapitalquote." },
    ],
    formula: "Finanzierungsbedarf = Kaufpreis + Nebenkosten − einsetzbares Eigenkapital; einsetzbares Eigenkapital = Eigenkapital − Reserve",
    example: "350.000 € Kaufpreis, 10 % Nebenkosten, 70.000 € Eigenkapital und 15.000 € Reserve ergeben rund 330.000 € Finanzierungsbedarf.",
    relatedSlugs: ["haus-leisten-rechner", "kaufnebenkosten-rechner", "kreditraten-rechner"],
  },
  notice: "Der Rechner liefert eine Budgetorientierung. Banken bewerten Eigenkapital, Beleihungsauslauf, Einkommen und Sicherheiten individuell; Nebenkosten variieren nach Bundesland und Kaufkonstellation.",
};
