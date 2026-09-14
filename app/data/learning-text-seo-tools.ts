import type { ToolDefinition, ToolCategory } from "./tools";
import type { ToolSeoContent } from "./tool-seo";

type Seed = [slug: string, title: string, eyebrow: string, description: string, category: ToolCategory, icon: string, question: string, answer: string];
const seeds: Seed[] = [
  ["notenrechner-gewichtung", "Notenrechner mit Gewichtung", "Durchschnitt und Zielnote berechnen", "Einzelnoten mit unterschiedlicher Gewichtung zusammenrechnen und die benötigte nächste Note für einen gewünschten Schnitt ermitteln.", "Schule & Lernen", "1,0", "Wie werden gewichtete Noten berechnet?", "Jede Note wird mit ihrer Gewichtung multipliziert; die Summe wird durch die Summe der Gewichtungen geteilt."],
  ["notenschluessel-rechner", "Notenschlüssel-Rechner", "Punktegrenzen für Noten 1 bis 6", "Aus Gesamtpunktzahl und Bestehensgrenze einen transparenten linearen Notenschlüssel mit allen Punktgrenzen erstellen.", "Schule & Lernen", "1–6", "Ist der Notenschlüssel verbindlich?", "Nein. Das Tool erzeugt einen nachvollziehbaren Vorschlag; Schulen und Lehrkräfte können andere Verteilungen verwenden."],
  ["punkte-in-note-rechner", "Punkte-in-Note-Rechner", "Erreichte Punkte verständlich einordnen", "Erreichte Punkte in Prozent und anhand einer einstellbaren Bestehensgrenze in eine Schulnote umrechnen.", "Schule & Lernen", "%→1", "Wie entsteht die Note?", "Zwischen 100 Prozent und der Bestehensgrenze werden die Noten 1 bis 4 linear verteilt; darunter folgen 5 und 6."],
  ["bruchrechner", "Bruchrechner mit Rechenweg", "Brüche rechnen und vollständig kürzen", "Zwei Brüche addieren, subtrahieren, multiplizieren oder dividieren und den gekürzten Rechenweg nachvollziehen.", "Schule & Lernen", "½", "Wie werden Brüche addiert?", "Sie werden auf einen gemeinsamen Nenner gebracht, die Zähler werden addiert und das Ergebnis wird vollständig gekürzt."],
  ["gleichungsrechner", "Lineare Gleichungen lösen", "ax + b = c Schritt für Schritt", "Lineare Gleichungen der Form ax + b = c lösen und jeden Umformungsschritt verständlich anzeigen.", "Schule & Lernen", "x=", "Welche Gleichungen werden unterstützt?", "Gleichungen der Form ax + b = c. Klammern, Potenzen und mehrere Variablen sind nicht enthalten."],
  ["lernplan-rechner", "Lernplan-Rechner bis zur Prüfung", "Themen auf verfügbare Lernzeit verteilen", "Prüfungstermin, Wochenstunden und Themen eingeben und einen Wochenplan mit Wiederholungszeit erstellen.", "Schule & Lernen", "Plan", "Wie viel Wiederholungszeit ist eingeplant?", "Ungefähr 20 Prozent der verfügbaren Lernzeit werden für Wiederholung und Prüfungssimulation reserviert."],
  ["karteikarten-generator", "Karteikarten-Generator zum Drucken", "Fragen und Antworten als Lernkarten", "Eigene Fragen und Antworten in übersichtliche Karteikarten umwandeln, mischen und direkt drucken.", "Schule & Lernen", "Karte", "Wie gebe ich Karten ein?", "Pro Zeile eine Frage und Antwort, getrennt durch einen senkrechten Strich: Frage | Antwort."],
  ["lesbarkeitsanalyse", "Lesbarkeitsanalyse für deutsche Texte", "Flesch-Wert und schwere Sätze erkennen", "Deutsche Texte anhand von Satz- und Wortlänge bewerten und besonders lange oder schwer lesbare Sätze markieren.", "Text & Sprache", "Lesen", "Was bedeutet der Flesch-Wert?", "Ein höherer Wert steht für leichter lesbaren Text. Er ist ein sprachstatistischer Hinweis und keine Qualitätsnote."],
  ["textvergleich", "Zwei Texte vergleichen", "Änderungen Wort für Wort hervorheben", "Zwei Textversionen lokal vergleichen und hinzugefügte sowie entfernte Wörter übersichtlich markieren.", "Text & Sprache", "Diff", "Wie genau ist der Vergleich?", "Das Tool vergleicht Wörter und Satzzeichen in ihrer Reihenfolge; reine Formatierung wird nicht vollständig bewertet."],
  ["fuellwort-finder", "Füllwort- und Wiederholungsfinder", "Sprachliche Muster sichtbar machen", "Häufige deutsche Füllwörter, Wortwiederholungen und dominante Begriffe finden, ohne sie pauschal als Fehler zu bewerten.", "Text & Sprache", "Wdh", "Sind Füllwörter immer schlecht?", "Nein. Sie können Ton und Rhythmus unterstützen und werden erst bei starker Häufung auffällig."],
  ["textbereiniger", "Textbereiniger für Leerzeichen & Umbrüche", "Kopierte Texte sauber formatieren", "Doppelte Leerzeichen, unnötige Leerzeilen und störende Zeilenumbrüche gezielt bereinigen.", "Text & Sprache", "Clean", "Bleiben Absätze erhalten?", "Ja, solange du das Zusammenführen von Zeilen nicht aktivierst. Jede Bereinigung ist einzeln wählbar."],
  ["gross-kleinschreibung", "Groß- und Kleinschreibung ändern", "Text mit einem Klick umwandeln", "Text in Großbuchstaben, Kleinbuchstaben, Satzanfänge oder eine einfache Überschriftenschreibweise umwandeln.", "Text & Sprache", "Aa", "Ist die Überschriftenschreibweise grammatisch perfekt?", "Nein. Sie ist eine mechanische Formatierung und sollte im deutschen Kontext redaktionell geprüft werden."],
  ["quellenangaben-generator", "Quellenangaben-Generator", "Buch, Website und Fachartikel zitieren", "Literaturangaben für Bücher, Websites und Zeitschriftenartikel nach APA, Harvard oder deutscher Fußnotenform erstellen.", "Text & Sprache", "Quelle", "Muss ich die Quellenangabe prüfen?", "Ja. Hochschulen und Verlage verwenden häufig eigene Varianten, besonders bei Reihenfolge und Zeichensetzung."],
  ["google-snippet-vorschau", "Google-Snippet-Vorschau", "Title und Description auf Desktop und Mobil", "Prüfen, wie Seitentitel, URL und Meta-Description ungefähr in einem Google-Suchergebnis wirken.", "SEO & Website", "SERP", "Zeigt Google das Snippet genau so an?", "Nein. Google kann Titel und Beschreibung je nach Suchanfrage umschreiben."],
  ["keyworddichte-analyse", "Keyworddichte-Analyse", "Begriffe und Wortkombinationen auswerten", "Häufigste Wörter, Zweiwortkombinationen und ihren Anteil am Text lokal bestimmen, inklusive Stopwort-Filter.", "SEO & Website", "KW", "Welche Keyworddichte ist ideal?", "Es gibt keinen allgemeingültigen Zielwert. Vollständigkeit und natürliche Sprache sind wichtiger."],
  ["onpage-seo-pruefer", "Onpage-SEO-Prüfer für HTML", "Titel, Überschriften, Links und Bilder prüfen", "Eingefügtes HTML lokal auf Title, Description, H1, Überschriftenstruktur, Links und Alt-Texte prüfen.", "SEO & Website", "Check", "Ersetzt das einen vollständigen Crawl?", "Nein. Das Tool kennt weder Serverantworten noch die interne Struktur der gesamten Website."],
  ["seo-slug-generator", "SEO-URL- und Slug-Generator", "Kurze, lesbare URLs erstellen", "Überschriften in kleingeschriebene, ASCII-kompatible URL-Slugs umwandeln und optionale Füllwörter entfernen.", "SEO & Website", "/url", "Wie werden Umlaute behandelt?", "Ä, ö und ü werden zu ae, oe und ue; ß wird zu ss."],
  ["meta-tag-generator", "Meta-Tag-Generator", "Title, Description, Canonical und Robots", "Grundlegende HTML-Meta-Tags erstellen, Längen prüfen und als fertigen Codeblock kopieren.", "SEO & Website", "Meta", "Brauche ich Meta-Keywords?", "Nein. Google verwendet das Keywords-Meta-Tag nicht für das Ranking."],
  ["faq-schema-generator", "FAQ-Schema-Generator", "Fragen und Antworten als JSON-LD", "Frage-Antwort-Paare in syntaktisch gültiges FAQPage-JSON-LD umwandeln und vor dem Kopieren prüfen.", "SEO & Website", "FAQ", "Garantiert Markup ein Rich Result?", "Nein. Gültiges Markup garantiert keine besondere Darstellung und muss den Richtlinien entsprechen."],
  ["open-graph-generator", "Open-Graph-Generator", "Vorschau für soziale Netzwerke", "Open-Graph- und Twitter-Card-Metadaten für geteilte Links erstellen und die Kartenwirkung prüfen.", "SEO & Website", "OG", "Welche Bildgröße ist sinnvoll?", "1200 × 630 Pixel ist weit verbreitet; Plattformen können Bilder dennoch anders zuschneiden."],
  ["robots-txt-generator", "robots.txt-Generator", "Crawler-Regeln verständlich konfigurieren", "Eine robots.txt mit User-Agent-Regeln, erlaubten oder gesperrten Pfaden und Sitemap-Verweis erstellen.", "SEO & Website", "Bot", "Schützt robots.txt geheime Seiten?", "Nein. Sie ist eine freiwillige Crawler-Anweisung und kein Zugriffsschutz."],
  ["sitemap-generator", "XML-Sitemap-Generator", "URL-Liste prüfen und als XML ausgeben", "Absolute URLs prüfen, Duplikate entfernen und eine gültige XML-Sitemap mit optionalem Änderungsdatum erstellen.", "SEO & Website", "XML", "Wie viele URLs sind erlaubt?", "Eine Sitemap darf höchstens 50.000 URLs und unkomprimiert 50 MB enthalten."],
  ["hreflang-generator", "Hreflang-Generator", "Sprach- und Länderversionen verbinden", "URLs mit Sprachcodes erfassen und gegenseitige hreflang-Link-Tags inklusive x-default erzeugen.", "SEO & Website", "Lang", "Müssen Verweise gegenseitig sein?", "Ja. Jede Version sollte auf sich selbst und alle Alternativen verweisen."],
];

export const learningTextSeoTools: ToolDefinition[] = seeds.map(([slug, title, eyebrow, description, category, icon, question, answer]) => ({
  slug, title, eyebrow, description, short: description, category, icon,
  keywords: [title, eyebrow, slug.replaceAll("-", " ")],
  faq: [{ question, answer }, { question: "Werden meine Eingaben gespeichert?", answer: "Nein. Die Verarbeitung findet lokal in deinem Browser statt." }],
}));

export const learningTextSeoSlugs = learningTextSeoTools.map((tool) => tool.slug);

const schoolCalculators = new Set([
  "notenrechner-gewichtung",
  "notenschluessel-rechner",
  "punkte-in-note-rechner",
  "bruchrechner",
  "gleichungsrechner",
]);

const workflowGuides: Record<string, { title: string; steps: ToolSeoContent["steps"] }> = {
  "lernplan-rechner": { title: "Einen realistischen Lernplan erstellen", steps: [
    { title: "Termin und Zeit festlegen", text: "Trage den Prüfungstermin und die Stunden ein, die du pro Woche wirklich zum Lernen nutzen kannst." },
    { title: "Themen vollständig sammeln", text: "Liste den Lernstoff nach Themen auf. Das Tool verteilt ihn auf die verbleibenden Wochen und reserviert Zeit zum Wiederholen." },
    { title: "Wochenplan anpassen", text: "Prüfe die Verteilung und plane schwierige Themen, freie Tage und einen Puffer passend zu deinem Alltag ein." },
  ] },
  "karteikarten-generator": { title: "Karteikarten vorbereiten und drucken", steps: [
    { title: "Frage und Antwort eingeben", text: "Schreibe pro Zeile eine Frage und die zugehörige Antwort, getrennt durch einen senkrechten Strich." },
    { title: "Karten kontrollieren", text: "Prüfe in der Vorschau, ob jede Zeile richtig getrennt wurde, und mische die Reihenfolge bei Bedarf." },
    { title: "Lernkarten drucken", text: "Starte den Druckdialog und wähle die gewünschte Papiergröße und Skalierung für deine Karten." },
  ] },
  "lesbarkeitsanalyse": { title: "Verständlichkeit eines Textes prüfen", steps: [
    { title: "Vollständigen Text einfügen", text: "Füge den Abschnitt ein, den du tatsächlich beurteilen möchtest. Die Analyse bleibt in deinem Browser." },
    { title: "Kennzahlen gemeinsam lesen", text: "Betrachte Flesch-Wert, Satzlängen und markierte schwere Sätze zusammen statt nur eine einzelne Zahl." },
    { title: "Schwierige Stellen überarbeiten", text: "Kürze überlange Sätze und ersetze komplizierte Formulierungen nur, wenn Aussage und Fachbegriffe erhalten bleiben." },
  ] },
  "textvergleich": { title: "Zwei Textstände zuverlässig vergleichen", steps: [
    { title: "Alte Version einfügen", text: "Setze den ursprünglichen Text in das erste Feld." },
    { title: "Neue Version ergänzen", text: "Füge den überarbeiteten Text in das zweite Feld ein. Wörter und Satzzeichen werden in ihrer Reihenfolge verglichen." },
    { title: "Änderungen prüfen", text: "Kontrolliere entfernte und hinzugefügte Stellen im Zusammenhang; reine Formatierungsänderungen werden nicht vollständig bewertet." },
  ] },
  "fuellwort-finder": { title: "Füllwörter und Wiederholungen finden", steps: [
    { title: "Text einfügen", text: "Füge den vollständigen Text ein, damit Häufigkeiten nicht durch einen zu kurzen Ausschnitt verzerrt werden." },
    { title: "Häufungen erkennen", text: "Das Tool markiert typische Füllwörter und zeigt besonders oft verwendete Begriffe." },
    { title: "Bewusst entscheiden", text: "Entferne Wörter nicht automatisch. Prüfe, ob sie Rhythmus und Ton unterstützen oder die Aussage tatsächlich verwässern." },
  ] },
  "textbereiniger": { title: "Kopierten Text sauber formatieren", steps: [
    { title: "Rohtext einfügen", text: "Füge den Text mitsamt störenden Leerzeichen und Zeilenumbrüchen ein." },
    { title: "Bereinigung auswählen", text: "Aktiviere nur die Regeln, die du brauchst, damit gewollte Absätze und Formatierungen erhalten bleiben." },
    { title: "Ergebnis kopieren", text: "Kontrolliere Absatzgrenzen und übernimm anschließend die bereinigte Fassung." },
  ] },
  "gross-kleinschreibung": { title: "Schreibweise eines Textes umwandeln", steps: [
    { title: "Text einfügen", text: "Füge den Text ein, dessen Groß- und Kleinschreibung du ändern möchtest." },
    { title: "Schreibweise wählen", text: "Wähle Großbuchstaben, Kleinbuchstaben, Satzanfänge oder die einfache Überschriftenschreibweise." },
    { title: "Deutschsprachige Feinheiten prüfen", text: "Kontrolliere Eigennamen, Abkürzungen und Überschriften anschließend redaktionell." },
  ] },
  "quellenangaben-generator": { title: "Eine Quellenangabe zusammensetzen", steps: [
    { title: "Quellentyp wählen", text: "Wähle Website, Buch oder Fachartikel, damit die passenden bibliografischen Felder erscheinen." },
    { title: "Originalangaben übertragen", text: "Übernimm Autor, Titel, Jahr, Verlag, URL und Abrufdatum direkt aus der Quelle." },
    { title: "Zitierstil abgleichen", text: "Kopiere die Ausgabe und vergleiche sie mit den verbindlichen Vorgaben deiner Schule, Hochschule oder Redaktion." },
  ] },
  "google-snippet-vorschau": { title: "Ein Suchergebnis vorab beurteilen", steps: [
    { title: "Titel, URL und Beschreibung eingeben", text: "Nutze die Texte und die Adresse der tatsächlichen Zielseite." },
    { title: "Desktop und Mobil vergleichen", text: "Prüfe, ob Thema und Nutzen früh erkennbar sind und wichtige Wörter nicht erst am Ende stehen." },
    { title: "Vorschau richtig einordnen", text: "Google kann Titel und Beschreibung je nach Suchanfrage anders darstellen; die Vorschau ist keine Garantie." },
  ] },
  "keyworddichte-analyse": { title: "Begriffe und Wortkombinationen auswerten", steps: [
    { title: "Relevanten Seitentext einfügen", text: "Analysiere den sichtbaren Hauptinhalt statt Navigation, Footer oder beliebige Textfragmente." },
    { title: "Einzelwörter und Wortpaare prüfen", text: "Vergleiche Häufigkeiten und aktiviere den Stopwort-Filter, wenn allgemeine Wörter die Liste dominieren." },
    { title: "Natürlichkeit bewahren", text: "Nutze die Werte zum Erkennen fehlender Themen oder auffälliger Wiederholungen, nicht zum Erreichen einer starren Keywordquote." },
  ] },
  "onpage-seo-pruefer": { title: "HTML auf grundlegende Onpage-Signale prüfen", steps: [
    { title: "Ausgeliefertes HTML einfügen", text: "Nutze möglichst den tatsächlichen Seitenquelltext mit Title, Meta Description, Überschriften, Links und Bildern." },
    { title: "Befunde einzeln prüfen", text: "Gehe fehlende oder mehrfache Elemente durch und bewerte jeden Hinweis im Kontext der Seite." },
    { title: "Grenzen beachten", text: "Serverantworten, interne Verlinkung der gesamten Website und Indexierungsstatus benötigen zusätzliche Prüfungen." },
  ] },
  "seo-slug-generator": { title: "Eine kurze, lesbare URL erzeugen", steps: [
    { title: "Seitentitel eingeben", text: "Verwende eine klare Überschrift, die das Hauptthema der Zielseite beschreibt." },
    { title: "Slug kürzen", text: "Entferne bei Bedarf Füllwörter und prüfe, ob der verbleibende Pfad auch ohne Seitentitel verständlich ist." },
    { title: "Vor Veröffentlichung festlegen", text: "Ändere bestehende URLs nur mit einer dauerhaften Weiterleitung von der alten auf die neue Adresse." },
  ] },
  "meta-tag-generator": { title: "Passende Meta-Tags für eine Seite erstellen", steps: [
    { title: "Seitendaten eintragen", text: "Gib einen konkreten Seitentitel, eine passende Beschreibung und die vollständige kanonische URL ein." },
    { title: "Code erzeugen und kopieren", text: "Wähle die gewünschte Robots-Einstellung und kopiere den fertigen HTML-Code in den Head-Bereich der Seite." },
    { title: "Ausgeliefertes HTML kontrollieren", text: "Öffne anschließend den Seitenquelltext und prüfe, ob jedes Tag genau einmal mit den richtigen Werten vorhanden ist." },
  ] },
  "faq-schema-generator": { title: "FAQ-Daten als JSON-LD ausgeben", steps: [
    { title: "Sichtbare Fragen übernehmen", text: "Trage nur Fragen und Antworten ein, die Nutzer auch auf der Seite lesen können." },
    { title: "JSON-LD erzeugen", text: "Das Tool erstellt daraus ein syntaktisch gültiges FAQPage-Skript zum Kopieren." },
    { title: "Richtlinien und Ausgabe prüfen", text: "Teste den eingebauten Code und beachte, dass gültiges Markup keine besondere Google-Darstellung garantiert." },
  ] },
  "open-graph-generator": { title: "Linkvorschauen für soziale Netzwerke vorbereiten", steps: [
    { title: "Seitendaten und Bild angeben", text: "Nutze Titel, Beschreibung, absolute URL und eine öffentlich erreichbare Bildadresse der Zielseite." },
    { title: "Kartenvorschau prüfen", text: "Achte darauf, dass wichtige Bildinhalte auch bei abweichendem Zuschnitt erkennbar bleiben." },
    { title: "Tags einbauen und testen", text: "Kopiere Open-Graph- und Twitter-Card-Tags in den Head und prüfe die veröffentlichte URL mit den Plattform-Debuggern." },
  ] },
  "robots-txt-generator": { title: "Crawler-Regeln verständlich festlegen", steps: [
    { title: "Crawler und Pfade angeben", text: "Lege fest, für welchen User-Agent Regeln gelten und welche Pfade gecrawlt oder ausgeschlossen werden sollen." },
    { title: "Sitemap ergänzen", text: "Trage die vollständige öffentliche Adresse deiner XML-Sitemap ein." },
    { title: "Datei öffentlich prüfen", text: "Veröffentliche den Inhalt unter /robots.txt und verwende robots.txt niemals als Schutz für vertrauliche Seiten." },
  ] },
  "sitemap-generator": { title: "Eine URL-Liste als XML-Sitemap ausgeben", steps: [
    { title: "Kanonische URLs einfügen", text: "Verwende vollständige, indexierbare HTTPS-Adressen und jeweils nur die bevorzugte Version einer Seite." },
    { title: "Duplikate und Fehler bereinigen", text: "Das Tool entfernt doppelte Einträge und weist auf ungültige Adressen hin." },
    { title: "XML veröffentlichen", text: "Speichere die Ausgabe als XML-Sitemap, verlinke sie in robots.txt und reiche sie in der Search Console ein." },
  ] },
  "hreflang-generator": { title: "Sprachversionen gegenseitig verknüpfen", steps: [
    { title: "Sprachcode und URL erfassen", text: "Trage für jede Sprach- oder Länderversion den passenden hreflang-Code und die vollständige kanonische URL ein." },
    { title: "x-default festlegen", text: "Bestimme die neutrale Standardseite für Nutzer, zu deren Sprache keine gezielte Version passt." },
    { title: "Rückverweise kontrollieren", text: "Baue denselben vollständigen Satz von Verweisen auf jeder Sprachversion ein und prüfe die ausgelieferten Seiten." },
  ] },
};

export const learningTextSeoContent = Object.fromEntries(learningTextSeoTools.map((tool): [string, ToolSeoContent] => {
  const workflowGuide = workflowGuides[tool.slug];
  const steps = workflowGuide?.steps ?? (schoolCalculators.has(tool.slug) ? [
    { title: "Aufgabendaten vollständig eintragen", text: `Gib alle Werte ein, die der ${tool.title} für eine nachvollziehbare Berechnung benötigt.` },
    { title: "Rechenweg kontrollieren", text: "Prüfe Zwischenschritte, Gewichtungen, Nenner oder Bewertungsgrenzen – nicht nur das Endergebnis." },
    { title: "Vorgabe abgleichen", text: "Vergleiche das Resultat bei Prüfungen mit dem offiziellen Notenschlüssel oder der Aufgabenstellung." },
  ] : tool.category === "Schule & Lernen" ? [
    { title: "Lernstoff eingeben", text: `Trage deine Themen oder Frage-Antwort-Paare vollständig in den ${tool.title} ein.` },
    { title: "Vorschlag erstellen", text: "Das Werkzeug ordnet deine Angaben als Lernplan oder druckbare Karteikarten, ohne die Inhalte hochzuladen." },
    { title: "An den eigenen Alltag anpassen", text: "Prüfe Umfang, Reihenfolge und Formulierungen und passe das Ergebnis an Prüfungstermin und Lernstand an." },
  ] : tool.category === "Text & Sprache" ? [
    { title: "Text vollständig einfügen", text: `Füge den relevanten Text in den ${tool.title} ein; die Auswertung bleibt lokal im Browser.` },
    { title: "Muster statt Einzelwert betrachten", text: "Nutze Markierungen und Kennzahlen als Hinweise auf Stellen, die eine bewusste redaktionelle Entscheidung brauchen." },
    { title: "Ergebnis im Zusammenhang lesen", text: "Prüfe den überarbeiteten Text laut und achte darauf, dass Aussage, Ton und Fachbegriffe erhalten bleiben." },
  ] : [
    { title: "Seitendaten eingeben", text: `Trage reale Inhalte und absolute URLs in den ${tool.title} ein.` },
    { title: "Hinweise und Syntax prüfen", text: "Korrigiere unvollständige Angaben und prüfe Längen, Pfade, Sprachcodes oder HTML-Struktur." },
    { title: "Im echten Quelltext validieren", text: "Kopiere das Ergebnis an die passende Stelle der Website und kontrolliere anschließend die ausgelieferte Seite." },
  ]);
  return [tool.slug, { steps, mode: schoolCalculators.has(tool.slug) ? "calculation" : "workflow", guideTitle: workflowGuide?.title }];
}));
