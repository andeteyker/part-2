/**
 * Ratgeber-Content-System für SofortTools.
 *
 * Jeder Ratgeber gehört zu genau einem "Pillar"-Rechner und antwortet auf
 * konkrete Suchfragen ("Wie berechne ich die Mietrendite?", "Welche
 * Kaufnebenkosten fallen an?"). Ziel: Featured Snippets, interne Verlinkung
 * und unterstützender Evergreen-Traffic rund um die Money-Pages (Rechner).
 *
 * Struktur pro Artikel:
 *  - meta: URL, Titel, Beschreibung, Keywords
 *  - toolSlug: zugehöriger Rechner (für interne Verlinkung "zum Rechner")
 *  - sections: gegliederte Inhalte mit h2-Headline und Markdown-ähnlichen Blöcken
 */

export type GuideBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "h3"; text: string }
  | { type: "tip"; text: string }
  | { type: "table"; head: string[]; rows: string[][] };

export type Guide = {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  toolSlug: string;
  /** kurzer Teaser (für Sitemap/Listungen) */
  excerpt: string;
  updated: string;
  sections: { h2: string; blocks: GuideBlock[] }[];
};

const guides: Guide[] = [
  {
    slug: "mietrendite-berechnen",
    title: "Mietrendite berechnen: Formel, Beispiel und Tipps",
    description: "So berechnest du die Brutto- und Nettomietrendite einer Immobilie richtig – inklusive Formel, Rechenbeispiel und den häufigsten Fehlern.",
    keywords: ["Mietrendite berechnen", "Bruttomietrendite Formel", "Nettomietrendite", "Rendite Immobilie"],
    toolSlug: "mietrendite-rechner",
    excerpt: "Brutto- und Nettomietrendite richtig berechnen: Formeln, ein Rechenbeispiel und typische Fehlerquellen.",
    updated: "2026-09",
    sections: [
      {
        h2: "Mietrendite – was ist das überhaupt?",
        blocks: [
          { type: "p", text: "Die Mietrendite zeigt, wie viel Rendite eine vermietete Immobilie im Verhältnis zu ihren Anschaffungskosten abwirft. Sie ist die wichtigste Kennzahl, um ein Mietobjekt schnell mit alternativen Geldanlagen zu vergleichen." },
          { type: "ul", items: ["Sie lässt sich ohne komplexe Software aus wenigen Werten berechnen.", "Sie trennt grobe Einstiegsprüfung (Brutto) von realistischeren Kostenbetrachtungen (Netto).", "Sie ist kein Ersatz für eine vollständige Wirtschaftlichkeitsrechnung, aber der beste erste Filter."] },
        ],
      },
      {
        h2: "Bruttomietrendite: die einfache Formel",
        blocks: [
          { type: "p", text: "Die Bruttomietrendite setzt die jährliche Kaltmiete ins Verhältnis zum Kaufpreis. Kaufnebenkosten und laufende Kosten bleiben hier bewusst außen vor." },
          { type: "p", text: "Formel: Bruttomietrendite = (Jahreskaltmiete ÷ Kaufpreis) × 100" },
          { type: "p", text: "Beispiel: Du kaufst eine Wohnung für 250.000 € und vermietest sie für 900 € Kaltmiete im Monat." },
          { type: "ul", items: ["Jahreskaltmiete: 900 € × 12 = 10.800 €", "Bruttomietrendite: (10.800 ÷ 250.000) × 100 = 4,32 %"] },
          { type: "tip", text: "Als Faustregel gelten Vermietungsobjekte ab etwa 4 % Bruttomietrendite als interessant – das hängt aber stark von Lage und Zinsumfeld ab." },
        ],
      },
      {
        h2: "Nettomietrendite: die realistischere Zahl",
        blocks: [
          { type: "p", text: "Die Nettomietrendite bezieht zusätzlich die Kaufnebenkosten sowie nicht umlagefähige laufende Kosten in die Rechnung ein. Sie zeigt damit eher, was wirklich übrig bleibt." },
          { type: "p", text: "Formel: Nettomietrendite = ((Jahreskaltmiete − laufende Kosten) ÷ (Kaufpreis + Kaufnebenkosten)) × 100" },
          { type: "p", text: "Beispiel mit Kaufnebenkosten von 12 % (Grunderwerbsteuer, Notar, Makler) und 1.200 € laufenden Kosten pro Jahr:" },
          { type: "table", head: ["Kennzahl", "Wert"], rows: [["Kaufpreis", "250.000 €"], ["Kaufnebenkosten (12 %)", "30.000 €"], ["Jahreskaltmiete", "10.800 €"], ["Laufende Kosten", "1.200 €"], ["Nettomietrendite", "(9.600 ÷ 280.000) × 100 = 3,43 %"]] },
          { type: "tip", text: "Der Abstand zwischen Brutto- und Netto-Rendite zeigt sofort, wie stark Kaufnebenkosten und Instandhaltung die tatsächliche Verzinsung drücken." },
        ],
      },
      {
        h2: "Diese laufenden Kosten unbedingt einrechnen",
        blocks: [
          { type: "ul", items: ["Nicht umlagefähiges Hausgeld (Wohnungseigentümergemeinschaft)", "Instandhaltungsrücklage", "Verwaltungskosten", "Versicherungen und Grundsteuer", "Leerstandskosten und Reparaturen"] },
          { type: "p", text: "Alles, was du als Vermieter nicht auf den Mieter umlegen kannst, reduziert deine Nettorendite. Wer diese Positionen ignoriert, überschätzt die Rendite häufig um ein Prozent oder mehr." },
        ],
      },
      {
        h2: "Typische Fehler beim Berechnen",
        blocks: [
          { type: "ol", items: ["Warmmiete statt Kaltmiete einsetzen – der Mietanteil für Heizung und Betriebskosten ist keine Rendite.", "Kaufnebenkosten bei der Bruttorechnung vergessen und die Rendite dadurch zu hoch ansetzen.", "Laufende Kosten nur grob schätzen statt konkrete Hausgeld-Abrechnungen zu nutzen.", "Leerstand und Renovierungsphasen nicht einplanen, die die tatsächliche Mieteinnahme senken."] },
          { type: "p", text: "Die Nettomietrendite fängt diese Fehler größtenteils ab, wenn du Eingabewerte realistisch wählst." },
        ],
      },
      {
        h2: "Deine Mietrendite direkt berechnen",
        blocks: [
          { type: "p", text: "Nutze den Mietrendite-Rechner, um Bruttomietrendite, Nettomietrendite und den jährlichen Überschuss deiner Immobilie in Sekunden zu ermitteln." },
          { type: "tip", text: "Rechne immer beide Varianten durch. Der Unterschied zwischen Brutto- und Netto-Rendite ist ein verlässlicher Hinweis darauf, wie viel Kosten und Nebenkosten dein Vorhaben wirklich schluckt." },
        ],
      },
    ],
  },
];

export const getGuide = (slug: string) => guides.find((guide) => guide.slug === slug);
export const allGuides = () => guides;
/** Findet den ersten Ratgeber, der zu einem Tool gehört (für interne Verlinkung). */
export const getGuideByTool = (toolSlug: string) => guides.find((guide) => guide.toolSlug === toolSlug);
