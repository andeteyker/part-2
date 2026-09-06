export type ToolSeoContent = {
  intro: string;
  formulaTitle: string;
  formula: string;
  example: string;
  notes: string[];
};

export const toolSeoContent: Record<string, ToolSeoContent> = {
  "mietrendite-rechner": {
    intro: "Der Mietrendite-Rechner trennt bewusst zwischen Brutto- und Nettomietrendite. Die Bruttomietrendite eignet sich für einen schnellen Erstvergleich verschiedener Objekte. Für eine belastbarere Einschätzung berücksichtigt die Nettomietrendite zusätzlich Kaufnebenkosten und laufende, nicht umlagefähige Eigentümerkosten. So siehst du nicht nur einen Prozentwert, sondern auch den jährlichen Überschuss vor Finanzierung und Steuern.",
    formulaTitle: "So berechnet sich die Mietrendite",
    formula: "Bruttomietrendite = Jahreskaltmiete ÷ Kaufpreis × 100. Nettomietrendite = (Jahreskaltmiete − jährliche Eigentümerkosten) ÷ (Kaufpreis + Kaufnebenkosten) × 100.",
    example: "Beispiel: 250.000 € Kaufpreis, 1.000 € Monatskaltmiete, 10 % Kaufnebenkosten und 150 € nicht umlagefähige Kosten pro Monat ergeben 4,8 % Bruttomietrendite. Die Nettomietrendite fällt wegen Nebenkosten und laufender Kosten entsprechend niedriger aus.",
    notes: ["Finanzierungskosten, Einkommensteuer und Wertentwicklung sind nicht enthalten.", "Für Vergleiche solltest du bei allen Objekten dieselben Kostenannahmen verwenden.", "Leerstand und Instandhaltungsrisiken können separat als Sicherheitsabschlag berücksichtigt werden."],
  },
  "kaufnebenkosten-rechner": {
    intro: "Beim Immobilienkauf entscheidet nicht nur der Kaufpreis über den tatsächlichen Kapitalbedarf. Der Kaufnebenkosten-Rechner addiert Grunderwerbsteuer, Notar, Grundbuch und eine mögliche Maklerprovision. Alle Prozentsätze sind bewusst editierbar, damit du reale Vertragswerte und den zum Bundesland passenden Steuersatz verwenden kannst.",
    formulaTitle: "So setzen sich Kaufnebenkosten zusammen",
    formula: "Gesamtnebenkosten = Kaufpreis × (Grunderwerbsteuer + Notar + Grundbuch + Makler) ÷ 100. Gesamtkaufpreis = Kaufpreis + Gesamtnebenkosten.",
    example: "Beispiel: Bei 350.000 € Kaufpreis führen 5 % Grunderwerbsteuer, 1,5 % Notar, 0,5 % Grundbuch und 3,57 % Makler zu deutlich mehr als 35.000 € zusätzlichem Kapitalbedarf.",
    notes: ["Die tatsächlichen Notar- und Grundbuchkosten können vom pauschalen Prozentsatz abweichen.", "Eine Maklerprovision fällt nicht bei jedem Kauf an.", "Kosten für Finanzierung, Gutachten, Modernisierung oder Umzug sind nicht Bestandteil der Kaufnebenkosten."],
  },
  "immobilien-cashflow-rechner": {
    intro: "Der Immobilien-Cashflow-Rechner beantwortet eine einfache Frage: Bleibt nach Mieteinnahmen, Kreditrate und laufenden Eigentümerkosten monatlich Geld übrig? Anders als ein Renditerechner betrachtet er den laufenden Zahlungsstrom. Das ist besonders hilfreich, wenn du mehrere Finanzierungsvarianten oder Immobilien mit unterschiedlichem Hausgeld vergleichen möchtest.",
    formulaTitle: "So berechnet sich der monatliche Cashflow",
    formula: "Cashflow = Monatskaltmiete − Kreditrate − nicht umlagefähige Kosten − Rücklage − sonstige Eigentümerkosten.",
    example: "Beispiel: 1.050 € Kaltmiete minus 720 € Kreditrate, 110 € nicht umlagefähiges Hausgeld, 80 € Rücklage und 40 € sonstige Kosten ergeben 100 € positiven monatlichen Cashflow.",
    notes: ["Steuern, Sonderumlagen und ungeplante Reparaturen sind nicht automatisch enthalten.", "Ein positiver Cashflow allein sagt noch nichts über den Kaufpreis oder die Gesamtrendite aus.", "Für konservative Szenarien kannst du die Miete niedriger oder die Rücklage höher ansetzen."],
  },
  "haus-leisten-rechner": {
    intro: "Der Hausbudget-Rechner leitet aus deiner maximalen Monatsrate, deinem Eigenkapital sowie Sollzins und anfänglicher Tilgung eine grobe Kreditsumme und daraus einen möglichen Kaufpreis ab. Er ist für die frühe Orientierung gedacht: Du kannst damit prüfen, in welcher Preisregion eine Immobiliensuche sinnvoll ist, bevor du konkrete Finanzierungsangebote einholst.",
    formulaTitle: "So wird das Hausbudget überschlagen",
    formula: "Mögliche Kreditsumme ≈ Jahresrate ÷ (Sollzins + anfängliche Tilgung). Möglicher Kaufpreis ≈ (Kreditsumme + Eigenkapital) ÷ (1 + Kaufnebenkostenquote).",
    example: "Beispiel: 1.500 € Monatsrate entsprechen 18.000 € Jahresrate. Bei 3,5 % Sollzins und 2 % anfänglicher Tilgung ergibt sich überschlägig eine Kreditsumme von rund 327.000 €, bevor Eigenkapital und Kaufnebenkosten eingerechnet werden.",
    notes: ["Banken prüfen Einkommen, Ausgaben, Haushaltsgröße, Bonität und Objekt deutlich detaillierter.", "Die Rechnung ist keine Kreditzusage und keine individuelle Finanzierungsberatung.", "Rechne zusätzlich ein konservatives Szenario mit höherem Zinssatz."],
  },
  "kreditraten-rechner": {
    intro: "Der Kreditraten-Rechner zeigt die anfängliche monatliche Annuität eines Immobiliendarlehens und schätzt zusätzlich die Restschuld nach einer frei gewählten Zinsbindung. Dadurch kannst du unterschiedliche Kombinationen aus Sollzins und Tilgung direkt miteinander vergleichen, statt nur auf die Monatsrate zu schauen.",
    formulaTitle: "So werden Rate und Restschuld berechnet",
    formula: "Anfängliche Monatsrate = Darlehen × (Sollzins + anfängliche Tilgung) ÷ 12. Die Restschuld wird anschließend mit der Annuitätenformel auf Monatsbasis fortgeschrieben.",
    example: "Beispiel: 300.000 € Darlehen bei 3,5 % Sollzins und 2 % anfänglicher Tilgung ergeben zu Beginn rund 1.375 € Monatsrate. Eine höhere Tilgung erhöht die Rate, reduziert aber die Restschuld schneller.",
    notes: ["Sondertilgungen und Bereitstellungszinsen sind nicht enthalten.", "Nach Ende der Zinsbindung kann der Anschlusszinssatz höher oder niedriger sein.", "Vergleiche neben der Rate immer auch Restschuld und Gesamtlaufzeit."],
  },
};
