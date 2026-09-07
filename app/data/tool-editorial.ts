import type { ToolSeoContent } from "./tool-seo";

type Faq = { question: string; answer: string };
type EditorialTool = {
  title: string;
  eyebrow: string;
  description: string;
  short: string;
  category: string;
  faq: Faq[];
};

const categoryPerspective: Record<string, () => string> = {
  "Geld & Beruf": () => "Bei dieser Rechnung ist nicht nur das Ergebnis wichtig, sondern vor allem die richtige Bezugsgröße. Brutto, Netto, Zeitraum und Ausgangswert sollten eindeutig sein, bevor du Zahlen miteinander vergleichst.",
  "Schule, Text & SEO": () => "Das Ergebnis macht eine messbare Eigenschaft sichtbar, ersetzt aber nicht die inhaltliche Prüfung. Nutze den Wert als Hinweis darauf, wo du genauer hinschauen oder deinen Text überarbeiten solltest.",
  "Wortspiele & Rätsel": () => "Das Werkzeug grenzt mögliche Lösungen systematisch ein. Welche davon wirklich passt, hängt anschließend vom Spielstand, den bereits bekannten Buchstaben und dem verwendeten Regelwerk ab.",
  "iPhone & Bilder": () => "Bei der Verarbeitung entsteht eine praktische Arbeitskopie. Bewahre das Original auf und kontrolliere das Ergebnis kurz, denn Formatwechsel und Kompression können Transparenz, Dateigröße oder Bilddetails verändern.",
  "Internet & Sicherheit": () => "Der angezeigte Wert ist eine Momentaufnahme deiner aktuellen technischen Situation. Gerät, Browser, VPN, WLAN und Netzwerkauslastung können das Ergebnis verändern.",
  "Zeit & Planung": () => "Fehler entstehen hier meist nicht durch schwere Mathematik, sondern durch einen falschen Stichtag, einen Tageswechsel oder unterschiedlich verstandene Zeitangaben.",
  Immobilien: () => "Die Berechnung liefert eine belastbare erste Orientierung, aber noch keine Kaufentscheidung. Bei Immobilien verändern Nebenkosten, Finanzierung, Rücklagen und ein vorsichtiges Szenario das Bild oft deutlich.",
  "Schicht & Zuschläge": () => "Geleistete Stunden, vertraglicher Anspruch und steuerliche Behandlung müssen getrennt betrachtet werden. Ein steuerlich möglicher Höchstsatz ist nicht automatisch der Satz, den der Arbeitgeber zahlen muss.",
  "Handwerker & Renovierung": () => "Die Rechnung hilft dir, vor dem ersten Angebot einen realistischen Kostenrahmen zu bilden. Material, Arbeitsleistung, Nebenarbeiten und Reserve sollten getrennt bleiben, damit Angebote später vergleichbar sind.",
  "Finanzen & Steuern": () => "Diese Berechnung ist eine Planungshilfe, kein Bescheid und keine verbindliche Beratung. Gerade bei Steuern, Vorsorge und Gehalt können persönliche Merkmale das tatsächliche Ergebnis spürbar verändern.",
  "Energie & Umwelt": () => "Verbrauch, Leistung, Zeitraum und Preis sollten dieselbe Einheit verwenden. Schon die Verwechslung von Watt, Kilowatt und Kilowattstunden kann eine Hochrechnung stark verfälschen.",
  "Gesundheit & Fitness": () => "Der berechnete Wert ist eine Orientierung und keine Diagnose. Körperbau, Alter, Alltag und Messmethode können wichtiger sein als eine einzelne scheinbar genaue Zahl.",
  "Familie & Leben": () => "Die Rechnung erleichtert die frühe Planung, kann aber persönliche Anspruchsvoraussetzungen oder eine medizinische beziehungsweise behördliche Prüfung nicht vollständig abbilden.",
  "Arbeitgeber & Business": () => "Die Rechnung schafft Transparenz für eine praktische Entscheidung. Vertragliche Regeln, nicht sichtbare Nebenkosten und ein realistischer Puffer gehören trotzdem in die abschließende Prüfung.",
};

export function getToolEditorial(tool: EditorialTool, seo: ToolSeoContent, guideExcerpt?: string) {
  const perspective = categoryPerspective[tool.category]?.()
    ?? "Das Werkzeug macht aus deinen Angaben einen nachvollziehbaren Vergleichswert. Entscheidend ist, dass die Eingaben zur tatsächlichen Situation passen.";
  const firstStep = seo.steps[0];
  const lastStep = seo.steps.at(-1);
  const method = [firstStep?.text, lastStep?.text].filter(Boolean).join(" ");
  const example = seo.example
    ? `Ein konkreter Kontrollwert hilft: ${seo.example}`
    : `Prüfe nach der Berechnung, ob die Größenordnung zu deinen Ausgangsdaten passt.`;

  return {
    heading: `${tool.eyebrow}: So ordnest du das Ergebnis ein`,
    lead: `${perspective} ${guideExcerpt ?? tool.description}`,
    method: `${method} ${example}`,
    checks: seo.steps.slice(0, 3).map((step) => step.title),
  };
}

export function getUsefulFaq(tool: EditorialTool, seo: ToolSeoContent): Faq[] {
  const result = tool.faq.filter((item) => !/ist der (rechner|generator) kostenlos|kostenlos und ohne anmeldung/i.test(`${item.question} ${item.answer}`));
  const candidates: Faq[] = [
    {
      question: `Was sollte ich bei „${tool.eyebrow}“ besonders beachten?`,
      answer: [seo.steps[0]?.text, seo.steps.at(-1)?.text].filter(Boolean).join(" "),
    },
    {
      question: `Wie kann ich das Ergebnis zu „${tool.eyebrow}“ selbst gegenprüfen?`,
      answer: seo.formula
        ? `${seo.formula}.${seo.example ? ` Zur Plausibilitätsprüfung kannst du dieses Beispiel heranziehen: ${seo.example}` : " Setze deine Ausgangswerte noch einmal mit denselben Einheiten ein."}`
        : `Kontrolliere zuerst alle Eingaben und ändere anschließend einen Wert bewusst. Das Ergebnis sollte sich in der erwarteten Richtung verändern.`,
    },
  ];

  for (const candidate of candidates) {
    if (result.length >= 3) break;
    if (!result.some((item) => item.question === candidate.question)) result.push(candidate);
  }
  return result;
}
