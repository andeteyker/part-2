export type ToolSeoContent = {
  steps: { title: string; text: string }[];
  formula?: string;
  example?: string;
  relatedSlugs?: string[];
};

const toolSeo: Record<string, ToolSeoContent> = {
  "prozentrechner": {
    steps: [
      { title: "Grundwert und Prozentsatz eingeben", text: "Trage den Ausgangswert und den gewünschten Prozentsatz ein. Je nach Aufgabe kannst du Rabatt, Aufschlag oder Prozentwert berechnen." },
      { title: "Berechnung ausführen", text: "Der Rechner ermittelt den Prozentwert sowie den resultierenden Endwert direkt aus deinen Angaben." },
      { title: "Ergebnis einordnen", text: "Nutze das Ergebnis zum Beispiel für Rabatte, Preisänderungen, Aufschläge oder prozentuale Vergleiche." },
    ],
    formula: "Prozentwert = Grundwert × Prozentsatz ÷ 100",
    example: "20 % von 150 € sind 30 €. Nach einem Rabatt von 20 % bleiben 120 €.",
    relatedSlugs: ["mehrwertsteuerrechner", "stundenlohnrechner", "spritkostenrechner"],
  },
  "zeitdauer-berechnen": {
    steps: [
      { title: "Start- und Endzeit eintragen", text: "Gib Arbeitsbeginn und Arbeitsende ein. Liegt das Ende nach Mitternacht, wird automatisch der Folgetag berücksichtigt." },
      { title: "Pause abziehen", text: "Trage deine unbezahlte Pause in Minuten ein. Sie wird von der gesamten Zeitspanne abgezogen." },
      { title: "Netto-Arbeitszeit ablesen", text: "Das Ergebnis zeigt deine tatsächlich anrechenbare Arbeitszeit nach Pausenabzug." },
    ],
    formula: "Netto-Arbeitszeit = Endzeit − Startzeit − Pause",
    example: "Von 07:30 bis 16:00 Uhr liegen 8,5 Stunden. Bei 30 Minuten Pause bleiben 8,0 Arbeitsstunden.",
    relatedSlugs: ["stundenlohnrechner", "ueberstunden-rechner", "schichtlohn-rechner"],
  },
  "spritkostenrechner": {
    steps: [
      { title: "Strecke und Verbrauch eingeben", text: "Trage die gefahrenen Kilometer und den durchschnittlichen Verbrauch deines Fahrzeugs pro 100 Kilometer ein." },
      { title: "Kraftstoffpreis ergänzen", text: "Gib den aktuellen Preis pro Liter an und wähle bei Bedarf Hin- und Rückfahrt oder mehrere Mitfahrer." },
      { title: "Fahrtkosten vergleichen", text: "Der Rechner zeigt Gesamtverbrauch, Gesamtkosten und auf Wunsch den Anteil pro Person." },
    ],
    formula: "Spritkosten = Strecke × Verbrauch ÷ 100 × Preis pro Liter",
    example: "100 km bei 7 l/100 km und 1,80 €/l kosten 12,60 € Kraftstoff.",
    relatedSlugs: ["prozentrechner", "stundenlohnrechner"],
  },
  "stundenlohnrechner": {
    steps: [
      { title: "Monatsgehalt eintragen", text: "Gib dein Brutto- oder Nettomonatsgehalt ein. Der Rechner übernimmt die Art des eingegebenen Gehalts." },
      { title: "Wochenstunden angeben", text: "Trage deine vertragliche Wochenarbeitszeit ein. Für den Monatsdurchschnitt werden 4,348 Wochen verwendet." },
      { title: "Stundenlohn ablesen", text: "Das Monatsgehalt wird auf die durchschnittlich geleisteten Monatsstunden umgerechnet." },
    ],
    formula: "Stundenlohn = Monatsgehalt ÷ (Wochenstunden × 4,348)",
    example: "3.000 € Monatsgehalt bei 40 Wochenstunden entsprechen rund 17,25 € pro Stunde.",
    relatedSlugs: ["zeitdauer-berechnen", "ueberstunden-rechner", "schichtlohn-rechner"],
  },
  "mehrwertsteuerrechner": {
    steps: [
      { title: "Netto oder Brutto wählen", text: "Lege fest, ob du von einem Nettobetrag zum Bruttopreis oder rückwärts vom Bruttopreis zum Nettobetrag rechnen möchtest." },
      { title: "Steuersatz auswählen", text: "Wähle 19 % oder 7 % Mehrwertsteuer und gib den Ausgangsbetrag ein." },
      { title: "Steuerbetrag prüfen", text: "Der Rechner zeigt Netto, enthaltene beziehungsweise aufgeschlagene Mehrwertsteuer und Brutto getrennt an." },
    ],
    formula: "Brutto = Netto × (1 + Steuersatz); Netto = Brutto ÷ (1 + Steuersatz)",
    example: "100 € netto ergeben bei 19 % Mehrwertsteuer 119 € brutto.",
    relatedSlugs: ["prozentrechner", "stundenlohnrechner"],
  },
  "woerter-aus-buchstaben": {
    steps: [
      { title: "Buchstaben eingeben", text: "Trage alle verfügbaren Buchstaben ein. Doppelte Buchstaben müssen auch mehrfach eingegeben werden." },
      { title: "Passende Wörter finden", text: "Der Wortfinder gleicht deine Buchstaben mit der hinterlegten deutschen Wortliste ab und filtert mögliche Treffer." },
      { title: "Treffer nach Länge nutzen", text: "Vergleiche die gefundenen Wörter nach Länge und verwende sie als Hilfe für Scrabble, Anagramme und Wortspiele." },
    ],
    example: "Aus A, E, R und T können je nach Wortliste unter anderem passende Kombinationen mit diesen Buchstaben gefunden werden.",
    relatedSlugs: ["wordle-hilfe", "woerter-zaehlen", "zeichen-zaehlen"],
  },
  "heic-zu-jpg": {
    steps: [
      { title: "HEIC-Datei auswählen", text: "Wähle ein HEIC- oder HEIF-Foto von deinem Gerät aus. Die Verarbeitung findet direkt im Browser statt." },
      { title: "In JPG konvertieren", text: "Das Bild wird lokal in ein kompatibles JPG umgewandelt, ohne dass die Datei auf einen externen Server hochgeladen werden muss." },
      { title: "JPG speichern", text: "Lade die erzeugte JPG-Datei herunter und verwende sie in Programmen, Upload-Portalen oder E-Mails." },
    ],
    relatedSlugs: ["webp-zu-jpg", "bild-komprimieren"],
  },
  "bild-komprimieren": {
    steps: [
      { title: "Bild auswählen", text: "Öffne ein JPG-, PNG- oder WebP-Bild direkt im Browser." },
      { title: "Qualität einstellen", text: "Passe den Qualitätsregler an und vergleiche die resultierende Dateigröße mit dem Original." },
      { title: "Kompakte Datei speichern", text: "Speichere die verkleinerte Version für Websites, E-Mails oder Upload-Portale." },
    ],
    relatedSlugs: ["heic-zu-jpg", "webp-zu-jpg"],
  },
  "zeichen-zaehlen": {
    steps: [
      { title: "Text einfügen", text: "Füge deinen Text direkt in das Eingabefeld ein. Die Auswertung erfolgt lokal im Browser." },
      { title: "Zeichenwerte vergleichen", text: "Der Zähler zeigt Zeichen mit und ohne Leerzeichen unmittelbar an." },
      { title: "Textlänge optimieren", text: "Nutze die Werte für Social Posts, SEO-Titel, Meta Descriptions und andere Zeichenlimits." },
    ],
    relatedSlugs: ["woerter-zaehlen", "wordle-hilfe", "woerter-aus-buchstaben"],
  },
  "woerter-zaehlen": {
    steps: [
      { title: "Text einfügen", text: "Füge deinen Aufsatz, Bericht oder Webtext in das Eingabefeld ein." },
      { title: "Struktur auswerten", text: "Das Tool zählt Wörter, Sätze und Absätze und schätzt zusätzlich die Lesezeit." },
      { title: "Textumfang prüfen", text: "Vergleiche die Werte mit Vorgaben für Schule, Studium, Redaktion oder Website-Inhalte." },
    ],
    relatedSlugs: ["zeichen-zaehlen", "woerter-aus-buchstaben"],
  },
  "haus-leisten-rechner": {
    steps: [
      { title: "Monatsrate und Eigenkapital angeben", text: "Trage ein, welche monatliche Rate du dauerhaft tragen möchtest und welches Eigenkapital verfügbar ist." },
      { title: "Zins, Tilgung und Nebenkosten ergänzen", text: "Lege Sollzins, anfängliche Tilgung und einen realistischen Anteil für Kaufnebenkosten fest." },
      { title: "Kaufbudget als Orientierung nutzen", text: "Der Rechner schätzt daraus ein mögliches Immobilienbudget. Eine Bankprüfung ersetzt diese überschlägige Rechnung nicht." },
    ],
    formula: "Vereinfachte Kreditsumme ≈ Jahresrate ÷ (Sollzins + anfängliche Tilgung)",
    relatedSlugs: ["kreditraten-rechner", "kaufnebenkosten-rechner", "mietrendite-rechner", "immobilien-cashflow-rechner"],
  },
  "dachkosten-rechner": {
    steps: [
      { title: "Dachfläche eintragen", text: "Gib die zu sanierende oder neu einzudeckende Dachfläche in Quadratmetern ein." },
      { title: "Einheitspreis und Zusatzkosten ergänzen", text: "Lege einen Preis pro Quadratmeter fest und ergänze zum Beispiel Gerüst, Entsorgung, Dämmung oder Dachfenster." },
      { title: "Kostenrahmen mit Puffer prüfen", text: "Der Rechner addiert Grundkosten und Zusatzarbeiten und berücksichtigt auf Wunsch einen prozentualen Sicherheitspuffer." },
    ],
    formula: "Gesamtkosten = Dachfläche × Preis/m² + Zusatzkosten + Sicherheitspuffer",
    relatedSlugs: ["badrenovierung-rechner", "fensterkosten-rechner"],
  },
};

export function getToolSeo(slug: string): ToolSeoContent {
  return toolSeo[slug] ?? {
    steps: [
      { title: "Angaben eintragen", text: "Gib die für die Berechnung benötigten Werte in die vorgesehenen Felder ein." },
      { title: "Ergebnis berechnen", text: "Das Tool verarbeitet deine Eingaben direkt und zeigt das Ergebnis ohne Anmeldung an." },
      { title: "Ergebnis prüfen", text: "Nutze das Ergebnis als schnelle Orientierung und beachte bei wichtigen Entscheidungen die Hinweise des jeweiligen Rechners." },
    ],
  };
}
