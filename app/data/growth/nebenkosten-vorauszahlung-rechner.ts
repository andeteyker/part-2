import type { GrowthToolConfig } from "./types";

export const nebenkostenVorauszahlungConfig: GrowthToolConfig = {
  tool: {
    slug: "nebenkosten-vorauszahlung-rechner",
    title: "Nebenkosten-Vorauszahlung-Rechner",
    eyebrow: "Neue monatliche Vorauszahlung aus der Abrechnung",
    description: "Berechne aus den tatsächlichen Betriebskosten der letzten Abrechnung, welche monatliche Nebenkostenvorauszahlung rechnerisch dazu passt und wie stark sie sich verändert.",
    short: "Passende Nebenkostenvorauszahlung aus Jahreskosten berechnen.",
    category: "Familie & Leben",
    icon: "NK",
    keywords: ["Nebenkostenvorauszahlung Rechner", "Nebenkosten Vorauszahlung erhöhen berechnen", "neue Nebenkostenvorauszahlung", "Nachzahlung durch 12"],
    faq: [
      { question: "Wie berechnet man eine neue Nebenkostenvorauszahlung?", answer: "Als neutrale Rechengröße werden die tatsächlichen umlagefähigen Jahreskosten durch zwölf geteilt. Der Vergleich mit der bisherigen Monatsvorauszahlung zeigt die rechnerische Anpassung." },
      { question: "Ist eine hohe Nachzahlung automatisch die neue Monatsrate?", answer: "Nein. Die Nachzahlung ist die Differenz für den vergangenen Abrechnungszeitraum. Für die künftige Monatsvorauszahlung ist vor allem der auf einen Monat heruntergerechnete tatsächliche Jahresbedarf relevant." },
      { question: "Darf die Vorauszahlung immer angepasst werden?", answer: "Das hängt vom Mietvertrag, einer ordnungsgemäßen Abrechnung und den rechtlichen Voraussetzungen des Einzelfalls ab. Der Rechner prüft diese Voraussetzungen nicht." },
    ],
  },
  fields: [
    { key: "jahreskosten", label: "Tatsächliche Jahreskosten laut Abrechnung", defaultValue: "3000", suffix: "€/Jahr" },
    { key: "bisher", label: "Bisherige Vorauszahlung", defaultValue: "200", suffix: "€/Monat" },
    { key: "monate", label: "Abgerechnete Monate", defaultValue: "12", suffix: "Monate", min: 1, max: 12, step: 1 },
  ],
  seo: {
    steps: [
      { title: "Jahreskosten übernehmen", text: "Nutze den auf deine Wohnung entfallenden tatsächlichen Kostenbetrag aus der letzten Abrechnung, nicht die Gesamtkosten des Gebäudes." },
      { title: "Bisherige Vorauszahlung eintragen", text: "Der Rechner vergleicht den tatsächlichen Bedarf mit dem bisherigen monatlichen Abschlag." },
      { title: "Monatswert vergleichen", text: "Die Differenz zeigt, um wie viel die Vorauszahlung rechnerisch steigen oder sinken müsste, wenn die Kosten gleich bleiben." },
    ],
    formula: "Rechnerische neue Vorauszahlung = tatsächliche Jahreskosten ÷ abgerechnete Monate",
    example: "Bei 3.000 € tatsächlichen Kosten über zwölf Monate ergibt sich ein Monatsbedarf von 250 €. Gegenüber bisher 200 € wären das rechnerisch 50 € mehr pro Monat.",
    relatedSlugs: ["mietkaution-rechner", "haushaltsbudget-rechner", "energie-abschlag-rechner"],
  },
  notice: "Der Rechner bildet nur die Mathematik einer angemessenen Vorauszahlung ab und ist keine mietrechtliche Prüfung. Künftige Kostenänderungen und die Wirksamkeit einer Anpassung müssen separat beurteilt werden.",
};
