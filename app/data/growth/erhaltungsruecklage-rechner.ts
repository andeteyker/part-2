import type { GrowthToolConfig } from "./types";

export const erhaltungsruecklageConfig: GrowthToolConfig = {
  tool: {
    slug: "erhaltungsruecklage-rechner",
    title: "Erhaltungsrücklage-Rechner für Eigentumswohnungen",
    eyebrow: "Monatliche Rücklage aus Wohnfläche und Planwert",
    description: "Berechne, welchen monatlichen und jährlichen Betrag du für die Erhaltungsrücklage einer Eigentumswohnung aus einem frei wählbaren Euro-pro-Quadratmeter-Wert ableiten kannst.",
    short: "Erhaltungsrücklage pro Monat, Jahr und Planungszeitraum berechnen.",
    category: "Finanzen & Steuern",
    icon: "WEG",
    keywords: ["Erhaltungsrücklage Rechner", "Instandhaltungsrücklage Rechner", "Rücklage Eigentumswohnung berechnen", "Rücklage pro qm Wohnung"],
    faq: [
      { question: "Wie wird die Erhaltungsrücklage berechnet?", answer: "Dieser Rechner multipliziert die Wohnfläche mit einem frei gewählten jährlichen Planwert je Quadratmeter. So kannst du verschiedene Rücklagenszenarien vergleichen, ohne einen pauschalen Pflichtbetrag zu unterstellen." },
      { question: "Gibt es einen gesetzlich festen Betrag pro Quadratmeter?", answer: "Nein. Die Rücklage soll angemessen sein; ihre konkrete Höhe hängt unter anderem von Zustand, Alter, Ausstattung, Sanierungsplanung und Beschlüssen der Gemeinschaft ab." },
      { question: "Warum sollte ich den vorhandenen Rücklagenanteil eintragen?", answer: "Beim Wohnungskauf ist nicht nur die laufende Zuführung wichtig. Ein Vergleich mit dem rechnerischen Ziel über mehrere Jahre zeigt, ob bereits ein nennenswerter Puffer vorhanden ist." },
    ],
  },
  fields: [
    { key: "flaeche", label: "Wohnfläche", defaultValue: "80", suffix: "m²" },
    { key: "satz", label: "Geplanter Rücklagenwert", defaultValue: "12", suffix: "€/m²/Jahr" },
    { key: "bestand", label: "Vorhandener anteiliger Rücklagenbestand", defaultValue: "5000", suffix: "€" },
    { key: "jahre", label: "Planungszeitraum", defaultValue: "5", suffix: "Jahre", min: 1, max: 30, step: 1 },
  ],
  seo: {
    steps: [
      { title: "Wohnfläche eintragen", text: "Nutze die Wohnfläche deiner Einheit als transparente Bezugsgröße für den gewählten Planwert." },
      { title: "Rücklagenwert selbst festlegen", text: "Setze einen konservativen Euro-pro-Quadratmeter-Wert und vergleiche bei Bedarf mehrere Szenarien." },
      { title: "Bestand gegen Planwert halten", text: "Der vorhandene anteilige Rücklagenbestand hilft, die laufende Zuführung im Verhältnis zu einem mehrjährigen Ziel einzuordnen." },
    ],
    formula: "Jährliche Planrücklage = Wohnfläche × gewählter Rücklagenwert je m² und Jahr",
    example: "Bei 80 m² und 12 € je m² und Jahr ergibt sich eine Planrücklage von 960 € pro Jahr beziehungsweise 80 € pro Monat.",
    relatedSlugs: ["mietrendite-rechner", "immobilien-cashflow-rechner", "haus-leisten-rechner"],
  },
  notice: "Es gibt keinen universellen Pflichtwert. Der Rechner ist eine Planungshilfe; Wirtschaftsplan, Gebäudezustand, anstehende Maßnahmen, Gemeinschaftseigentum und Beschlüsse der WEG sind entscheidend.",
};
