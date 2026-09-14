import type { GrowthToolConfig } from "./types";

export const werbungskostenSteuerersparnisConfig: GrowthToolConfig = {
  tool: {
    slug: "werbungskosten-steuerersparnis-rechner",
    title: "Werbungskosten-Steuerersparnis-Rechner",
    eyebrow: "Was bringen zusätzliche Werbungskosten steuerlich?",
    description: "Berechne, welcher Teil deiner Werbungskosten über dem Arbeitnehmer-Pauschbetrag liegt und welche zusätzliche Steuerwirkung sich bei deinem Grenzsteuersatz grob ergibt.",
    short: "Zusätzliche Steuerersparnis durch Werbungskosten überschlagen.",
    category: "Finanzen & Steuern",
    icon: "WK",
    keywords: ["Werbungskosten Rechner", "Werbungskosten Steuerersparnis", "was bringen Werbungskosten", "Arbeitnehmer Pauschbetrag Rechner"],
    faq: [
      { question: "Spart jeder Euro Werbungskosten Steuern?", answer: "Bei Arbeitnehmern ist der Arbeitnehmer-Pauschbetrag bereits automatisch berücksichtigt. Zusätzliche Werbungskosten wirken sich in dieser vereinfachten Betrachtung deshalb erst aus, soweit die Summe den Pauschbetrag übersteigt." },
      { question: "Warum verwendet der Rechner den Grenzsteuersatz?", answer: "Der Grenzsteuersatz nähert an, wie stark ein zusätzlicher abzugsfähiger Euro die Einkommensteuer verändert. Die tatsächliche Steuerberechnung kann wegen weiterer Einkünfte, Abzüge und persönlicher Merkmale abweichen." },
      { question: "Welche Werbungskosten kann ich eintragen?", answer: "Zum Beispiel beruflich veranlasste Fahrtkosten, Arbeitsmittel, Fortbildung oder weitere anerkannte Aufwendungen. Ob eine Ausgabe tatsächlich abzugsfähig ist, prüft der Rechner nicht." },
    ],
  },
  fields: [
    { key: "werbungskosten", label: "Werbungskosten gesamt", defaultValue: "2800", suffix: "€/Jahr" },
    { key: "pauschbetrag", label: "Arbeitnehmer-Pauschbetrag", defaultValue: "1230", suffix: "€/Jahr" },
    { key: "steuersatz", label: "Persönlicher Grenzsteuersatz", defaultValue: "35", suffix: "%", min: 0, max: 50, step: 0.1 },
  ],
  seo: {
    steps: [
      { title: "Werbungskosten addieren", text: "Addiere nur beruflich veranlasste Aufwendungen, die du für deine überschlägige Rechnung berücksichtigen möchtest." },
      { title: "Pauschbetrag prüfen", text: "Der voreingestellte Wert lässt sich ändern, damit der Rechner auch bei späteren gesetzlichen Anpassungen transparent bleibt." },
      { title: "Steuerwirkung schätzen", text: "Nur der Betrag oberhalb des Pauschbetrags wird mit dem eingegebenen Grenzsteuersatz als zusätzliche Steuerwirkung modelliert." },
    ],
    formula: "Geschätzte zusätzliche Steuerersparnis = max(Werbungskosten − Arbeitnehmer-Pauschbetrag, 0) × Grenzsteuersatz",
    example: "Bei 2.800 € Werbungskosten, 1.230 € Pauschbetrag und 35 % Grenzsteuersatz liegen 1.570 € zusätzlich über der Pauschale. Die vereinfachte Steuerwirkung beträgt rund 550 €.",
    relatedSlugs: ["einkommensteuer-rechner", "pendlerpauschale-rechner", "fahrtkosten-rechner"],
  },
  notice: "Die Berechnung ist eine vereinfachte Orientierung und keine Steuerberechnung. Ob Aufwendungen anerkannt werden und wie hoch die tatsächliche Steuerwirkung ist, hängt vom individuellen Steuerfall ab.",
};
