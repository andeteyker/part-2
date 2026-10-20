/**
 * Redaktionelle Suchintentionen aus Google Search Console, Stand Oktober 2026.
 * Nur für Tool-Seiten mit einer klaren, durch die Funktion erfüllbaren Suchabsicht.
 * Keine automatische Generierung von Keyword-Varianten oder dünnen Landingpages.
 */
export type SearchIntentContent = {
  title: string;
  description: string;
  heading: string;
  answer: string;
  example: string;
};

export const searchIntentBySlug: Record<string, SearchIntentContent> = {
  "wordle-hilfe": {
    title: "Wordle Hilfe Deutsch – Wörter mit 5 Buchstaben finden",
    description: "Wordle Hilfe für deutsche Wörter: grüne Positionen, gelbe Buchstaben und Ausschlüsse eingeben und passende Wörter mit 5 Buchstaben finden.",
    heading: "Wordle-Hilfe auf Deutsch: Welche Wörter passen noch?",
    answer: "Du suchst Hilfe bei Wordle auf Deutsch? Trage die bereits bekannten Positionen und Buchstaben ein. Der Wortfilter zeigt dir fünf Buchstaben lange deutsche Wörter, die zu deinen bisherigen Versuchen passen. Er verrät nicht automatisch die heutige Lösung.",
    example: "Beispiel: Mit dem Muster A..EN steht A an erster und EN an den letzten beiden Positionen. Ergänze gelbe und graue Buchstaben, um die möglichen Treffer weiter einzugrenzen.",
  },
  "feiertagszuschlag-rechner": {
    title: "Feiertagszuschlag-Rechner – Zuschlag & Steuerfreiheit prüfen",
    description: "Feiertagszuschlag aus Stundenlohn und Feiertagsstunden berechnen. Vereinbarten Zuschlag eingeben und die steuerlichen Grenzen nach § 3b EStG einordnen.",
    heading: "Wie viel Feiertagszuschlag bekommst du?",
    answer: "Der Rechner multipliziert deinen Stundenlohn mit den am Feiertag geleisteten Stunden und dem vereinbarten Zuschlagssatz. Er zeigt dir den Zuschlagsbetrag und hilft, die steuerlichen Grenzen einzuordnen. Ob dir ein Zuschlag zusteht, ergibt sich nicht allein aus der Steuerregel.",
    example: "Beispiel: 20 € Stundenlohn, 8 Feiertagsstunden und ein vereinbarter Zuschlag von 100 % ergeben 160 € zusätzlichen Feiertagszuschlag. Ob der Betrag steuerfrei ist, hängt von den gesetzlichen Voraussetzungen ab.",
  },
  "schichtlohn-rechner": {
    title: "Schichtlohn-Rechner – Lohn mit Nacht- & Feiertagszuschlag",
    description: "Schichtlohn inklusive Nacht-, Sonn- und Feiertagszuschlägen berechnen. Grundlohn und tatsächlich geleistete Schichtstunden transparent auswerten.",
    heading: "Schichtlohn inklusive Zuschlägen berechnen",
    answer: "Beim Schichtlohn werden Grundlohn und vereinbarte Zuschläge getrennt berechnet. So erkennst du, welcher Anteil deines Bruttolohns auf reguläre Arbeitsstunden und welcher auf Nacht-, Sonn- oder Feiertagsarbeit entfällt.",
    example: "Übernimm die geleisteten Stunden aus deinem Dienstplan und die jeweiligen Zuschlagssätze aus Tarifvertrag oder Arbeitsvertrag. Berücksichtige Überschneidungen nur nach den für dich geltenden Regelungen.",
  },
  "heizkosten-rechner": {
    title: "Heizkosten-Rechner – Verbrauch & Kosten pro m² berechnen",
    description: "Heizkosten und Energieverbrauch berechnen, Kosten je Quadratmeter einordnen und Heizarten vergleichen. Kostenloser Rechner mit nachvollziehbaren Annahmen.",
    heading: "Heizkosten pro Jahr und Quadratmeter einordnen",
    answer: "Wer Heizkosten berechnen möchte, muss Verbrauch, Energiepreis und betrachteten Zeitraum auseinanderhalten. Der Rechner hilft, Jahreskosten sowie die Kosten bezogen auf die Wohnfläche zu überschlagen.",
    example: "Vergleiche möglichst ganze Abrechnungsjahre. Wetter, energetischer Zustand des Gebäudes und Grundpreise können zwei scheinbar ähnliche Wohnungen unterschiedlich teuer machen.",
  },
  "notenschluessel-rechner": {
    title: "Notenschlüssel-Rechner – Punkte in Noten von 1 bis 6",
    description: "Notenschlüssel aus maximaler Punktzahl und Bestehensgrenze erstellen. Alle Punktegrenzen für Noten 1 bis 6 übersichtlich berechnen.",
    heading: "Notenschlüssel aus Punkten erstellen",
    answer: "Gib die maximal erreichbare Punktzahl und die gewünschte Bestehensgrenze ein. Der Rechner erstellt daraus einen transparenten Notenschlüssel für die Noten 1 bis 6. Das ist ein rechnerischer Vorschlag, kein allgemeingültiger offizieller Schlüssel.",
    example: "Ein Notenschlüssel muss zu den Vorgaben der Schule, Hochschule oder Lehrkraft passen. Prüfe deshalb die festgelegte Notenskala, bevor du Ergebnisse übernimmst.",
  },
  "bauspar-rechner": {
    title: "Bausparrechner – Sparrate, Guthaben & Darlehen berechnen",
    description: "Bausparvertrag überschlagen: Sparrate, Guthaben, Sparzeit und möglichen Darlehensanteil berechnen. Vertragsbedingungen und Gebühren berücksichtigen.",
    heading: "Wie entwickelt sich dein Bausparguthaben?",
    answer: "Der Bausparrechner zeigt dir eine überschlägige Entwicklung deiner Sparphase und des möglichen Darlehensanteils. Die tatsächliche Zuteilung hängt zusätzlich von den jeweiligen Tarifbedingungen ab.",
    example: "Vergleiche Bausparsumme, monatliche Sparrate, Guthabenzins, Gebühren und möglichen Darlehenszins. Aus einem errechneten Guthaben folgt noch kein verbindlicher Zuteilungstermin.",
  },
  "zeichen-zaehlen": {
    title: "Zeichen zählen online – mit & ohne Leerzeichen",
    description: "Zeichen online zählen: Text einfügen und sofort Zeichenzahl mit und ohne Leerzeichen sehen. Kostenloser Zeichenzähler für Texte, Posts und SEO-Titel.",
    heading: "Wie viele Zeichen hat dein Text?",
    answer: "Füge deinen Text in den Zeichenzähler ein. Du siehst die Anzahl der Zeichen mit und ohne Leerzeichen direkt im Browser. Das ist nützlich für Formulare, Social-Media-Beiträge, Titel und andere Textvorgaben.",
    example: "Beispiel: „Hallo Welt“ hat 10 Zeichen mit Leerzeichen und 9 ohne Leerzeichen. Entscheidend ist, welche Zählweise für deinen Verwendungszweck gefordert wird.",
  },
  "kaufnebenkosten-rechner": {
    title: "Kaufnebenkosten-Rechner – Haus & Wohnung berechnen",
    description: "Kaufnebenkosten für Haus oder Wohnung berechnen: Grunderwerbsteuer, Notar, Grundbuch und Maklerprovision separat und zusammen einordnen.",
    heading: "Welche Nebenkosten kommen beim Hauskauf dazu?",
    answer: "Neben dem Kaufpreis können Grunderwerbsteuer, Notar- und Grundbuchkosten sowie eine Maklerprovision anfallen. Der Rechner addiert die eingegebenen Positionen und zeigt den zusätzlichen Kapitalbedarf.",
    example: "Der Grunderwerbsteuersatz richtet sich nach dem Bundesland. Prüfe deshalb die für deinen Kauf geltenden Werte und verwende keine pauschale Nebenkostenquote für jede Immobilie.",
  },
  "prozentrechner": {
    title: "Prozentrechner – Rabatt, Prozentwert & Aufschlag",
    description: "Prozente und Rabatt berechnen: 20 % von 50 €, Aufschläge, Nachlässe und Prozentwerte direkt mit Rechenweg ermitteln.",
    heading: "Wie berechnet man einen Prozentsatz in Euro?",
    answer: "Für den Prozentwert multiplizierst du den Grundwert mit dem Prozentsatz und teilst durch 100. Bei einem Rabatt ziehst du den Prozentwert vom Ausgangspreis ab; bei einem Aufschlag addierst du ihn.",
    example: "20 % von 50 € sind 10 €. Nach 20 % Rabatt kostet ein Artikel für ursprünglich 50 € also noch 40 €.",
  },
  "fuellwort-finder": {
    title: "Füllwörter finden – Texte & Wiederholungen prüfen",
    description: "Füllwörter und häufig wiederholte Begriffe im deutschen Text finden. Text lokal analysieren und sprachliche Muster verständlich einordnen.",
    heading: "Welche Füllwörter wiederholen sich im Text?",
    answer: "Der Füllwort-Finder markiert häufige Füllwörter und Wortwiederholungen in deinem Text. Er hilft beim Überarbeiten, entscheidet aber nicht automatisch, ob ein Ausdruck stilistisch falsch ist.",
    example: "Wörter wie „eigentlich“ oder „sozusagen“ können einen Satz unnötig verlängern. In Dialogen und bestimmten Kontexten erfüllen sie jedoch eine sinnvolle Funktion.",
  },
};
