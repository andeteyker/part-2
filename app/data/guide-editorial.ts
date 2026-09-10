export type GuideEditorialOverride = {
  title: string;
  description: string;
  lead: string;
  headings: [string, string, string, string, string];
  toolIntro: string;
};

export const guideEditorialOverrides: Record<string, GuideEditorialOverride> = {
  "immobilie-kaufen-finanzieren-plan": {
    title: "Wie finanziere ich ein Haus? Vom ersten Budget bis zur Baufinanzierung",
    description: "Wie viel Haus ist realistisch, wie viel Eigenkapital sollte bleiben und welche Kosten kommen zusätzlich zur Kreditrate dazu? Ein verständlicher Leitfaden zur Hausfinanzierung.",
    lead: "Die entscheidende Frage beim Hauskauf lautet nicht: Wie viel Kredit bekomme ich? Sondern: Welche Immobilie kann ich mir leisten, ohne dass die Finanzierung mein restliches Leben auffrisst? Dafür müssen Monatsbudget, Eigenkapital, Kaufnebenkosten, Zins, Tilgung und Reserven zusammen betrachtet werden.",
    headings: [
      "Wie viel Haus kann ich mir überhaupt leisten?",
      "Welche Zahlen entscheiden über mein Budget?",
      "Wie wird daraus eine tragfähige Finanzierung?",
      "Was zeigt ein realistisches Beispiel?",
      "Welche Fehler machen Hauskäufer besonders häufig?",
    ],
    toolIntro: "Wenn du deine persönliche Obergrenze oder ein konkretes Objekt prüfen willst, helfen diese Rechner bei genau diesem Schritt:",
  },
  "schichtarbeit-zuschlaege-ueberblick": {
    title: "Wie berechnet sich mein Schichtlohn mit Nacht-, Sonn- und Feiertagszuschlägen?",
    description: "Grundlohn, Nachtarbeit, Sonntage, Feiertage und Überstunden verständlich auseinanderhalten und die eigene Schichtabrechnung nachvollziehen.",
    lead: "Bei Schichtarbeit reicht ein Blick auf den Stundenlohn oft nicht aus. Entscheidend ist, wann gearbeitet wurde, welche Zuschläge vertraglich oder tariflich gelten und welche Zahlungen steuerlich anders behandelt werden können. Wer seine Abrechnung prüfen will, sollte die Bestandteile deshalb getrennt betrachten.",
    headings: [
      "Woraus besteht mein Schichtlohn eigentlich?",
      "Welche Arbeitszeiten und Zuschläge muss ich kennen?",
      "Wie prüfe ich meine Abrechnung Schritt für Schritt?",
      "Wie sieht das an einem typischen Monat aus?",
      "Wo entstehen bei Zuschlägen die häufigsten Missverständnisse?",
    ],
    toolIntro: "Für eine eigene Abrechnung kannst du die relevanten Stunden und Zuschlagssätze direkt einsetzen:",
  },
  "renovierungskosten-planen": {
    title: "Was kostet eine Renovierung wirklich? So planst du dein Budget ohne böse Überraschungen",
    description: "Material, Handwerker, Nebenarbeiten und Reserve realistisch planen und Angebote so vergleichen, dass am Ende nicht wichtige Kosten fehlen.",
    lead: "Renovierungen werden selten deshalb zu teuer, weil eine einzelne Position komplett falsch eingeschätzt wurde. Häufig summieren sich viele kleine Dinge: Rückbau, Entsorgung, Untergrund, Anschlüsse, Werkzeug, Nacharbeiten und spontane Änderungen. Eine gute Kalkulation macht genau diese Posten sichtbar.",
    headings: [
      "Warum Renovierungen fast immer teurer wirken als gedacht",
      "Welche Kostenpositionen gehören wirklich ins Budget?",
      "Wie kalkuliere ich Angebote und Eigenleistung sinnvoll?",
      "Wie sieht ein realistischer Kostenrahmen aus?",
      "Welche Posten werden besonders oft vergessen?",
    ],
    toolIntro: "Wenn du schon Maße oder erste Angebote hast, kannst du einzelne Gewerke direkt überschlagen:",
  },
  "geld-rechner-alltag": {
    title: "Geld im Alltag richtig rechnen: Rabatte, Lohn, Steuer und laufende Kosten verstehen",
    description: "Typische Geldrechnungen aus Alltag und Beruf verständlich erklärt – von Prozenten und Mehrwertsteuer bis Stundenlohn und Fahrtkosten.",
    lead: "Viele Alltagsrechnungen scheitern nicht an komplizierter Mathematik, sondern an der falschen Bezugsgröße. Ist der Betrag netto oder brutto? Beziehen sich Prozent auf den alten oder neuen Preis? Wird ein Monatsgehalt mit vier Wochen oder mit dem Jahresdurchschnitt umgerechnet? Wer diese Fragen zuerst klärt, vermeidet die meisten Fehler.",
    headings: [
      "Warum einfache Geldrechnungen so oft falsch laufen",
      "Welche Bezugsgrößen du immer zuerst klären solltest",
      "Wie du Prozent, Steuer und Lohn sauber auseinanderhältst",
      "Ein Beispiel aus dem Alltag",
      "Welche Rechenfehler besonders häufig vorkommen",
    ],
    toolIntro: "Für einzelne Beträge musst du die Rechnung nicht jedes Mal neu aufbauen:",
  },
  "texte-schreiben-seo-pruefen": {
    title: "Wie schreibe ich verständliche Texte, die Menschen wirklich lesen?",
    description: "Texte klar strukturieren, unnötige Länge vermeiden und Wortzahl, Zeichen und Lesbarkeit sinnvoll als Kontrollwerkzeuge nutzen.",
    lead: "Ein guter Text ist nicht automatisch lang und ein langer Text nicht automatisch gut. Entscheidend ist, ob Leser ihre Frage schnell beantwortet bekommen, ob Abschnitte logisch aufgebaut sind und ob Beispiele dort stehen, wo sie wirklich helfen. Wort- und Zeichenzahl sind dabei Kontrollwerte, keine Qualitätsziele.",
    headings: [
      "Was macht einen Webtext wirklich verständlich?",
      "Welche Struktur hilft Leserinnen und Lesern?",
      "Wie prüfst du Länge, Wiederholungen und Lesefluss?",
      "Wie sieht ein guter Aufbau konkret aus?",
      "Welche SEO- und Schreibfehler solltest du vermeiden?",
    ],
    toolIntro: "Für die Abschlusskontrolle helfen einfache Textwerkzeuge, ohne den Inhalt künstlich auf eine Zahl zu trimmen:",
  },
  "finanzen-steuern-planen": {
    title: "Wie plane ich meine Finanzen sinnvoll? Von Nettogehalt bis Rücklage und Altersvorsorge",
    description: "Einnahmen, Steuern, Rücklagen, Arbeitsweg und langfristige Vorsorge so ordnen, dass aus Einzelzahlen ein belastbarer Finanzplan wird.",
    lead: "Private Finanzplanung beginnt nicht mit der perfekten Sparquote, sondern mit einem ehrlichen Überblick. Was kommt regelmäßig rein, was geht sicher raus, welche Ausgaben schwanken und welche größeren Ziele stehen in den nächsten Jahren an? Erst danach lohnt es sich, Steuern, Vorsorge und langfristige Szenarien genauer zu rechnen.",
    headings: [
      "Was gehört zu einem soliden privaten Finanzplan?",
      "Welche Zahlen solltest du zuerst zusammentragen?",
      "Wie verbindest du Monatsbudget, Steuern und Vorsorge?",
      "Wie sieht eine einfache Planung mit echten Zahlen aus?",
      "Welche Finanzfehler entstehen durch zu optimistische Annahmen?",
    ],
    toolIntro: "Wenn du einzelne Bausteine genauer prüfen möchtest, kannst du sie mit passenden Rechnern separat durchspielen:",
  },
  "energiekosten-senken": {
    title: "Wie kann ich meine Energiekosten senken? Strom, Heizung und Solar sinnvoll vergleichen",
    description: "Verbrauch, Tarife, Heizkosten und Photovoltaik gemeinsam betrachten und herausfinden, an welchen Stellen sich Einsparungen wirklich lohnen.",
    lead: "Wer Energiekosten senken will, sollte nicht zuerst nach dem billigsten Tarif suchen. Viel wichtiger ist zu verstehen, wo der eigene Verbrauch entsteht und welche Maßnahmen dauerhaft wirken. Strom, Heizung und mögliche Eigenproduktion durch Photovoltaik sollten deshalb getrennt gerechnet und anschließend gemeinsam bewertet werden.",
    headings: [
      "Wo entstehen meine Energiekosten überhaupt?",
      "Welche Verbrauchswerte brauche ich für einen sinnvollen Vergleich?",
      "Welche Maßnahmen sparen wirklich Geld?",
      "Wie sieht eine einfache Jahresrechnung aus?",
      "Welche Annahmen machen Energievergleiche schnell unrealistisch?",
    ],
    toolIntro: "Mit deinen eigenen Verbrauchswerten kannst du die größten Kostenblöcke einzeln prüfen:",
  },
  "koerperwerte-einordnen": {
    title: "Was sagen BMI, Kalorienbedarf und Körperfett wirklich aus?",
    description: "BMI, Kalorienbedarf und Körperfett sinnvoll einordnen, Grenzen der Formeln verstehen und einzelne Werte nicht mit einer Diagnose verwechseln.",
    lead: "Körperwerte wirken präzise, weil am Ende eine konkrete Zahl steht. Trotzdem sind BMI, Kalorienbedarf oder geschätzter Körperfettanteil nur Modelle. Sie können Orientierung geben und Entwicklungen sichtbar machen, bilden aber individuelle Gesundheit, Muskelmasse und Stoffwechsel nicht vollständig ab.",
    headings: [
      "Was kann ein einzelner Körperwert überhaupt aussagen?",
      "Welche Angaben beeinflussen das Ergebnis?",
      "Wie solltest du BMI, Kalorienbedarf und Körperfett einordnen?",
      "Was zeigt ein einfaches Beispiel?",
      "Wann wird eine einzelne Zahl irreführend?",
    ],
    toolIntro: "Wenn du einen Orientierungswert berechnen möchtest, nutze die Rechner als Startpunkt und nicht als Diagnose:",
  },
  "familienleistungen-termine": {
    title: "Was muss ich rund um Geburt, Elterngeld und Kindergeld finanziell planen?",
    description: "Geburtstermin, Elterngeld und Kindergeld gemeinsam in einen realistischen Zeit- und Finanzplan für die ersten Monate mit Kind einordnen.",
    lead: "Rund um eine Geburt laufen viele Planungen gleichzeitig: Einkommen verändert sich, Anträge müssen vorbereitet werden und der errechnete Geburtstermin bleibt trotzdem nur eine Schätzung. Ein guter Plan trennt deshalb feste gesetzliche Rahmenbedingungen von persönlichen Annahmen und medizinischen Zeitfenstern.",
    headings: [
      "Was solltest du schon vor der Geburt planen?",
      "Welche Daten brauchst du für Leistungen und Termine?",
      "Wie baust du daraus einen realistischen Familienplan?",
      "Wie sieht eine einfache Beispielplanung aus?",
      "Welche Annahmen solltest du nicht als sicher behandeln?",
    ],
    toolIntro: "Für die grobe Planung kannst du einzelne Leistungen und Termine separat überschlagen:",
  },
  "arbeit-projekte-kalkulieren": {
    title: "Wie kalkuliere ich ein Angebot richtig? Von Selbstkosten bis Gewinn",
    description: "Material, Arbeitszeit, Gemeinkosten, Gewinn und Umsatzsteuer so kalkulieren, dass ein Angebot nicht nur Umsatz bringt, sondern sich wirtschaftlich trägt.",
    lead: "Ein Angebot kann auf den ersten Blick profitabel aussehen und trotzdem Geld kosten. Der häufigste Grund: Es werden nur Material und sichtbare Arbeitsstunden gerechnet. Fahrt, Vorbereitung, Werkzeug, Verwaltung, Ausfallzeiten und andere Gemeinkosten müssen ebenfalls finanziert werden. Erst danach beginnt der eigentliche Gewinn.",
    headings: [
      "Welche Kosten muss ein Angebot überhaupt decken?",
      "Welche Zahlen brauchst du für eine belastbare Kalkulation?",
      "Wie entsteht aus Selbstkosten ein sinnvoller Verkaufspreis?",
      "Wie sieht eine Beispielkalkulation aus?",
      "Welche Kalkulationsfehler kosten in der Praxis Geld?",
    ],
    toolIntro: "Für ein konkretes Projekt kannst du Kosten, Stunden und Verkaufspreis direkt mit deinen Werten durchrechnen:",
  },
};

export function getGuideEditorialOverride(slug: string) {
  return guideEditorialOverrides[slug];
}
