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

type PracticeContext = { background: string; rules: string; practical: string };

const categoryContext: Record<string, PracticeContext> = {
  "Geld & Beruf": {
    background: "Prozent-, Steuer- und Lohnrechnungen machen Preise und Vergütungen vergleichbar. Entscheidend ist dabei immer, ob du mit Brutto, Netto, einem Monatswert oder einem Stundenwert startest.",
    rules: "Steuersätze, arbeitsvertragliche Regelungen und Abrechnungszeiträume können sich unterscheiden. Das Ergebnis ist deshalb eine nachvollziehbare Rechengröße, aber kein Ersatz für Lohnabrechnung, Vertrag oder Steuerbescheid.",
    practical: "Notiere die verwendete Bezugsgröße und den Zeitraum. So erkennst du später sofort, ob zwei Angebote oder Abrechnungen wirklich auf derselben Grundlage beruhen.",
  },
  "Schule, Text & SEO": {
    background: "Dreisatz, Wortzahl und Zeichenlänge gehören seit Langem zu den grundlegenden Werkzeugen für Lernen, Redaktion und Veröffentlichung. Sie übersetzen eine Aufgabe in eine messbare Größe.",
    rules: "Schulen, Plattformen und Suchmaschinen verwenden unterschiedliche Vorgaben. Ein Zahlenwert zeigt daher eine Grenze oder Struktur, bewertet aber nicht automatisch die Qualität des Inhalts.",
    practical: "Nutze den Wert als Kontrollpunkt und lies den Text danach noch einmal inhaltlich. Verständlichkeit und Aussage bleiben wichtiger als das bloße Erreichen einer Zahl.",
  },
  "Wortspiele & Rätsel": {
    background: "Wortlisten und Buchstabenfilter bilden das systematische Gegenstück zum Ausprobieren. Sie grenzen Lösungen nach Länge, Position und verfügbaren Buchstaben ein.",
    rules: "Welche Wörter erlaubt sind, bestimmt das jeweilige Spiel und seine Wörterbuchausgabe. Ein technisch passender Treffer muss deshalb nicht in jeder Spielrunde zulässig sein.",
    practical: "Vergleiche den Treffer mit deinen bereits bestätigten Buchstaben und dem konkreten Regelwerk. Seltene Wörter solltest du vor dem Eintragen kurz nachschlagen.",
  },
  "iPhone & Bilder": {
    background: "Bildformate wurden für unterschiedliche Zwecke entwickelt: HEIC und WebP sparen Speicher, JPG ist dafür besonders weit verbreitet. Beim Umwandeln entsteht stets eine neue Arbeitskopie.",
    rules: "Urheber- und Persönlichkeitsrechte gelten unabhängig vom Dateiformat. Außerdem kann JPG keine Transparenz speichern und verlustbehaftete Kompression entfernt dauerhaft Bildinformationen.",
    practical: "Bewahre das Original auf und prüfe die erzeugte Datei bei voller Ansicht. Für wichtige Fotos ist eine kleinere Datei nur dann besser, wenn die sichtbare Qualität ausreicht.",
  },
  "Internet & Sicherheit": {
    background: "IP-Adressen, Latenz und Passwörter sind Grundbausteine des Internets. Die angezeigten Werte beschreiben immer den aktuellen Anschluss, Browser oder gewählten Testzeitpunkt.",
    rules: "Eine öffentliche IP ist kein vollständiger Identitätsnachweis. Zugangsdaten und erzeugte Passwörter sollten nie öffentlich geteilt und für jeden Dienst unterschiedlich verwendet werden.",
    practical: "Wiederhole Messungen zu verschiedenen Zeiten und ohne VPN, wenn du Ursachen suchst. Sichere Passwörter gehören anschließend in einen vertrauenswürdigen Passwortmanager.",
  },
  "Zeit & Planung": {
    background: "Kalender, Schaltjahre und Zeitzählung folgen festen Konventionen, wirken im Alltag aber oft uneinheitlich. Besonders Stichtage und ein Wechsel über Mitternacht führen leicht zu Fehlern.",
    rules: "Bei Fristen können Vertrag, Gesetz und die Art der Frist festlegen, ob der erste oder letzte Tag mitgezählt wird. Eine reine Kalenderrechnung ersetzt diese rechtliche Einordnung nicht.",
    practical: "Kontrolliere Datum, Uhrzeit und Zeitzone und schreibe den verwendeten Stichtag zum Ergebnis. Bei wichtigen Fristen solltest du zusätzlich die maßgebliche Regel prüfen.",
  },
  Immobilien: {
    background: "Immobilienrechnungen verbinden Kaufpreis, Finanzierung und laufende Bewirtschaftung. Historische Kaufpreise allein sagen deshalb wenig darüber aus, ob ein Objekt heute tragbar oder rentabel ist.",
    rules: "Notar, Grundbuch, Grunderwerbsteuer und gegebenenfalls Maklerkosten folgen eigenen gesetzlichen oder vertraglichen Regeln. Eine Finanzierung wird außerdem immer individuell durch die Bank geprüft.",
    practical: "Rechne mindestens ein vorsichtiges Szenario mit höherem Zins, Rücklagen und Leerstand. Erst wenn dieses Szenario tragbar bleibt, ist das Ergebnis eine gute Grundlage für weitere Gespräche.",
  },
  "Schicht & Zuschläge": {
    background: "Zuschläge entstanden als Ausgleich für Arbeit zu belastenden Zeiten. Heute treffen dabei Arbeitsvertrag, Tarifvertrag, betriebliche Regelung und steuerliche Behandlung aufeinander.",
    rules: "§ 3b EStG regelt, unter welchen Voraussetzungen Zuschläge für tatsächlich geleistete Nacht-, Sonn- und Feiertagsarbeit steuerfrei sein können. Daraus entsteht jedoch nicht automatisch ein Anspruch auf Zahlung.",
    practical: "Vergleiche das Ergebnis getrennt mit Arbeitsvertrag, Tarifvertrag und Lohnabrechnung. Dokumentiere die tatsächlich geleisteten Stunden, weil Pauschalen steuerlich anders behandelt werden können.",
  },
  "Handwerker & Renovierung": {
    background: "Baukosten setzen sich aus Material, Arbeitszeit, Vorbereitung und oft unterschätzten Nebenarbeiten zusammen. Deshalb sind Quadratmeterpreise nur ein erster Vergleichswert.",
    rules: "Leistungsumfang, Gewährleistung, Abschlagszahlungen und Änderungen sollten im Angebot eindeutig beschrieben sein. Bei Streit zählt der vereinbarte Umfang mehr als eine unverbindliche Online-Schätzung.",
    practical: "Hole mehrere schriftliche Angebote mit denselben Positionen ein. Reserviere zusätzlich einen Puffer für Untergrund, Entsorgung und Arbeiten, die erst nach dem Öffnen der Bauteile sichtbar werden.",
  },
  "Finanzen & Steuern": {
    background: "Steuer-, Gehalts- und Vorsorgerechner vereinfachen Regeln, die aus vielen persönlichen Merkmalen bestehen. Sie eignen sich gut für Szenarien, nicht für einen verbindlichen Bescheid.",
    rules: "Tarife, Freibeträge, Beitragsgrenzen und Leistungshöhen können sich ändern. Maßgeblich bleiben das jeweils gültige Gesetz und die individuelle Berechnung der zuständigen Stelle.",
    practical: "Rechne mit aktuellen Jahreswerten und prüfe ein günstiges sowie ein vorsichtiges Szenario. Bei größeren Entscheidungen solltest du das Ergebnis mit Bescheid, Abrechnung oder fachlicher Beratung abgleichen.",
  },
  "Energie & Umwelt": {
    background: "Energiekosten werden aus Leistung, Laufzeit, Verbrauch und Tarif gebildet. Seit Haushalte ihren Verbrauch genauer messen können, lassen sich einzelne Geräte und Maßnahmen besser vergleichen.",
    rules: "Tarife enthalten häufig Grundpreis, Arbeitspreis und unterschiedliche Abrechnungszeiträume. Förderungen, Einspeisevergütung und technische Vorgaben müssen separat und aktuell geprüft werden.",
    practical: "Verwende möglichst einen echten Zählerstand oder Messwert statt nur der Herstellerangabe. Achte besonders auf Watt, Kilowatt und Kilowattstunden – diese Einheiten sind nicht austauschbar.",
  },
  "Gesundheit & Fitness": {
    background: "Kennzahlen wie BMI oder Energiebedarf wurden für die Einordnung größerer Gruppen entwickelt. Bei einzelnen Menschen bilden sie Körperbau, Muskelmasse und Alltag nur vereinfacht ab.",
    rules: "Das Ergebnis ist keine Diagnose und keine medizinische Behandlungsempfehlung. Bei Beschwerden, Schwangerschaft, Essstörungen oder starken Gewichtsveränderungen gehört die Einordnung in fachkundige Hände.",
    practical: "Betrachte Veränderungen über mehrere Wochen statt einen einzelnen Wert. Kombiniere das Ergebnis mit Wohlbefinden, Leistungsfähigkeit und gegebenenfalls professionell erhobenen Messdaten.",
  },
  "Familie & Leben": {
    background: "Familienleistungen und Terminrechnungen helfen, früh einen zeitlichen oder finanziellen Rahmen zu sehen. Die tatsächliche Situation hängt aber von persönlichen Daten und Nachweisen ab.",
    rules: "Je nach Thema gelten unter anderem BEEG, EStG oder medizinische Berechnungskonventionen. Verbindlich sind der Bescheid der Behörde beziehungsweise die Untersuchung durch medizinisches Fachpersonal.",
    practical: "Nutze das Ergebnis für die erste Planung und halte die Eingabedaten bereit. Prüfe Fristen und Anspruchsvoraussetzungen anschließend direkt bei der zuständigen Stelle.",
  },
  "Arbeitgeber & Business": {
    background: "Urlaub, Angebote und Projektkosten werden erst vergleichbar, wenn Zeitraum, Leistungsumfang und Zuschläge sauber getrennt sind. Kleine Auslassungen können die Kalkulation stark verändern.",
    rules: "Je nach Rechner greifen Arbeitsrecht, Steuerrecht oder Werkvertragsregeln. Gesetzliche Mindestansprüche und steuerliche Vorgaben können nicht durch eine betriebliche Kalkulation ersetzt werden.",
    practical: "Dokumentiere Annahmen, Leistungsumfang und Puffer direkt neben dem Ergebnis. So lässt sich die Kalkulation später aktualisieren und gegenüber Kunden oder Beschäftigten nachvollziehbar erklären.",
  },
};

export function getToolEditorial(tool: EditorialTool, seo: ToolSeoContent, guideExcerpt?: string) {
  const context = categoryContext[tool.category] ?? {
    background: "Das Werkzeug macht aus deinen Angaben einen nachvollziehbaren Vergleichswert und schafft eine gemeinsame Grundlage für die weitere Entscheidung.",
    rules: "Das Ergebnis bleibt eine Orientierung. Vertragliche, technische oder persönliche Besonderheiten können in einer allgemeinen Online-Berechnung nicht vollständig abgebildet werden.",
    practical: "Prüfe die Eingaben und verändere einen Wert bewusst. So erkennst du schnell, welche Annahme das Ergebnis besonders stark beeinflusst.",
  };

  return {
    heading: `${tool.title} sinnvoll einordnen`,
    lead: `${tool.description} ${guideExcerpt ?? "Die folgenden Hinweise zeigen, was hinter dem Wert steckt und wo die Grenzen der Rechnung liegen."}`,
    background: context.background,
    rules: context.rules,
    practical: context.practical,
    checks: seo.steps.slice(0, 3).map((step) => step.title),
  };
}

export function getUsefulFaq(tool: EditorialTool, seo: ToolSeoContent): Faq[] {
  void seo;
  return tool.faq.filter((item) => !/ist der (rechner|generator) kostenlos|kostenlos und ohne anmeldung/i.test(`${item.question} ${item.answer}`));
}
