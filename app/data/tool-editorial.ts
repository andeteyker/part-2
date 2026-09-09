import type { ToolSeoContent } from "./tool-seo";

type Faq = { question: string; answer: string };
type EditorialTool = {
  slug: string;
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
  "Schule & Lernen": {
    background: "Noten, Gleichungen und Lernpläne werden verlässlich, wenn Rechenweg und Annahmen sichtbar bleiben.",
    rules: "Bewertungsschlüssel unterscheiden sich je nach Schule, Hochschule und Lehrkraft. Rechenergebnisse sind deshalb nur so verbindlich wie die eingetragenen Vorgaben.",
    practical: "Vergleiche das Ergebnis mit der offiziellen Prüfungsordnung und plane zusätzlich Zeit für Wiederholung und unerwartete Ausfälle ein.",
  },
  "Text & Sprache": {
    background: "Wortzahl, Lesbarkeit und sprachliche Muster machen bestimmte Eigenschaften eines Textes messbar, ohne seinen Inhalt automatisch zu bewerten.",
    rules: "Schulen, Plattformen und Suchmaschinen verwenden unterschiedliche Vorgaben. Ein Zahlenwert zeigt daher eine Grenze oder Struktur, bewertet aber nicht automatisch die Qualität des Inhalts.",
    practical: "Nutze den Wert als Kontrollpunkt und lies den Text danach noch einmal inhaltlich. Verständlichkeit und Aussage bleiben wichtiger als das bloße Erreichen einer Zahl.",
  },
  "SEO & Website": {
    background: "Technische SEO-Angaben helfen Suchmaschinen und sozialen Plattformen, Inhalte korrekt zu verstehen und darzustellen.",
    rules: "Valides Markup garantiert weder Ranking noch Rich Results. Sichtbarer Inhalt, technische Erreichbarkeit und Suchintention bleiben entscheidend.",
    practical: "Prüfe erzeugten Code nach dem Einbau im tatsächlichen HTML und kontrolliere Crawling sowie Indexierung anschließend in der Search Console.",
  },
  "Wortspiele & Rätsel": {
    background: "Wortlisten und Buchstabenfilter bilden das systematische Gegenstück zum Ausprobieren. Sie grenzen Lösungen nach Länge, Position und verfügbaren Buchstaben ein.",
    rules: "Welche Wörter erlaubt sind, bestimmt das jeweilige Spiel und seine Wörterbuchausgabe. Ein technisch passender Treffer muss deshalb nicht in jeder Spielrunde zulässig sein.",
    practical: "Vergleiche den Treffer mit deinen bereits bestätigten Buchstaben und dem konkreten Regelwerk. Seltene Wörter solltest du vor dem Eintragen kurz nachschlagen.",
  },
  "Bilder & Dateien": {
    background: "Digitale Bilder bestehen aus Pixeln, werden aber je nach Zweck unterschiedlich gespeichert. Format, Auflösung, Kompression und Metadaten beeinflussen Kompatibilität, Qualität und Dateigröße getrennt voneinander.",
    rules: "Urheber- und Persönlichkeitsrechte gelten auch nach einer Bearbeitung. Verlustbehaftete Formate entfernen Bildinformationen dauerhaft; Transparenz und Zusatzdaten werden nicht von jedem Format unterstützt.",
    practical: "Bewahre das Original auf und arbeite mit einer Kopie. Prüfe das fertige Bild in voller Größe und im Zielprogramm, bevor du das Original löschst oder die Datei veröffentlichst.",
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

const toolContext: Record<string, PracticeContext> = {
  prozentrechner: {
    background: "Prozent bedeutet „von hundert“. Der Rechner eignet sich für Rabatte, Aufschläge und Anteile, wenn Grundwert und Prozentsatz eindeutig feststehen.",
    rules: "Unterscheide Prozent und Prozentpunkte: Ein Anstieg von 10 auf 12 Prozent sind 2 Prozentpunkte, aber 20 Prozent relative Steigerung.",
    practical: "Prüfe zuerst, welcher Wert die 100 Prozent bildet. Genau diese Bezugsgröße entscheidet, ob das Ergebnis stimmt.",
  },
  dreisatzrechner: {
    background: "Der direkte Dreisatz funktioniert bei proportionalen Zusammenhängen: Verdoppelt sich die eine Größe, muss sich auch die andere verdoppeln.",
    rules: "Bei umgekehrt proportionalen Aufgaben – etwa mehr Helfer benötigen weniger Zeit – darf diese Formel nicht unverändert verwendet werden.",
    practical: "Schreibe die Einheiten neben die Werte und prüfe die Richtung: Mehr von A muss beim direkten Dreisatz auch mehr von B ergeben.",
  },
  "woerter-aus-buchstaben": {
    background: "Der Wortfinder prüft, welche Wörter sich ausschließlich aus den eingegebenen Buchstaben bilden lassen. Jeder Buchstabe steht nur so oft zur Verfügung, wie er eingegeben wurde.",
    rules: "Turnierregeln und Wörterbuchausgaben können Eigennamen, Abkürzungen oder Beugungsformen unterschiedlich behandeln. Die jeweilige Spielregel bleibt maßgeblich.",
    practical: "Sortiere Treffer nach Länge und kontrolliere seltene Wörter vor dem Legen im Wörterbuch, das für deine Spielrunde gilt.",
  },
  "wordle-hilfe": {
    background: "Der Filter kombiniert feste Positionen mit enthaltenen und ausgeschlossenen Buchstaben. Dadurch wird die mögliche Wortmenge nach jedem Versuch kleiner.",
    rules: "Doppelte Buchstaben sind eine häufige Fehlerquelle: Ein grauer Buchstabe kann trotzdem vorkommen, wenn derselbe Buchstabe an anderer Stelle bereits bestätigt wurde.",
    practical: "Trage zuerst grüne Positionen, dann gelbe Buchstaben und zuletzt sichere Ausschlüsse ein. Unsichere Angaben engen die Treffer sonst falsch ein.",
  },
  "zeichen-zaehlen": {
    background: "Zeichengrenzen werden unter anderem für Seitentitel, Beschreibungen, Formulare und soziale Netzwerke genutzt. Leerzeichen können je nach Vorgabe mitzählen oder ausgeschlossen sein.",
    rules: "Suchmaschinen zeigen Texte nicht nach einer festen Zeichenzahl, sondern abhängig von verfügbarer Breite und Gerät an. Die Zählung ist daher nur eine Orientierung.",
    practical: "Prüfe immer beide Werte – mit und ohne Leerzeichen – und orientiere dich an der konkreten Vorgabe des Zielsystems.",
  },
  "woerter-zaehlen": {
    background: "Die Wortzahl misst den Umfang, die geschätzte Lesezeit setzt ihn in ein alltagstaugliches Verhältnis. Inhaltliche Qualität lässt sich daraus nicht ableiten.",
    rules: "Zusammensetzungen, Bindestriche und Sonderzeichen werden von Programmen unterschiedlich gezählt. Bei formalen Vorgaben zählt die Methode der abnehmenden Stelle.",
    practical: "Nutze Wortzahl, Satzanzahl und Absätze gemeinsam. Viele Wörter bei wenigen Absätzen sind oft ein Hinweis auf schwer lesbare Textblöcke.",
  },
  "bildformat-konverter": {
    background: "JPG ist für Fotos weit verbreitet, PNG speichert Transparenz und harte Kanten verlustfrei. WebP und AVIF sind auf kleine Webdateien ausgelegt, während BMP Pixel nahezu unkomprimiert und deshalb sehr speicherintensiv ablegt. HEIC wird besonders von Apple-Geräten genutzt.",
    rules: "Ein Formatwechsel verbessert ein bereits komprimiertes Bild nicht. JPG und die hier erzeugte BMP-Datei speichern keine Transparenz; animierte Dateien werden als einzelnes Standbild verarbeitet. AVIF-Ausgabe hängt von der Kodierunterstützung des Browsers ab.",
    practical: "Wähle JPG für breite Kompatibilität, PNG für Transparenz und Grafiken, WebP oder AVIF für kompakte Webbilder und BMP nur für ältere Zielprogramme mit entsprechender Vorgabe. Behalte die Ursprungsdatei als Qualitätsreserve.",
  },
  "hintergrund-entfernen": {
    background: "Die lokale Freistellung folgt nicht jedem Objekt semantisch, sondern untersucht zusammenhängende Farben vom Bildrand aus. Das schützt gleichfarbige Bereiche innerhalb eines klar umschlossenen Motivs besser als ein globales Löschen.",
    rules: "Haare, Schatten, durchscheinende Stoffe und unruhige Hintergründe lassen sich durch reine Farbanalyse nur begrenzt trennen. Das Ergebnis sollte an den Motivkanten kontrolliert werden.",
    practical: "Beginne mit niedriger Empfindlichkeit. Steigere sie schrittweise und nutze die manuelle Farbe, wenn die Bildecken nicht zuverlässig den tatsächlichen Hintergrund zeigen.",
  },
  "bildgroesse-aendern": {
    background: "Die Pixelmaße legen fest, wie viele Bildpunkte eine Datei enthält. Beim Verkleinern werden Pixel zusammengefasst; beim Vergrößern müssen neue Zwischenwerte geschätzt werden.",
    rules: "Mehr Pixel bedeuten nicht automatisch mehr sichtbare Qualität. Eine Vergrößerung kann keine Details erzeugen, die im Original fehlen, und ein entsperrtes Seitenverhältnis verzerrt das Motiv.",
    practical: "Passe das Bild an die tatsächlich benötigte Anzeigegröße an. Für scharfe Darstellung auf hochauflösenden Displays kann etwa die doppelte CSS-Anzeigebreite sinnvoll sein.",
  },
  "bild-zuschneiden-drehen": {
    background: "Zuschneiden verändert die Bildaussage, weil störende Ränder verschwinden und das Hauptmotiv anders gewichtet wird. Das Seitenverhältnis richtet sich am späteren Einsatz aus.",
    rules: "Abgeschnittene Pixel sind in der erzeugten Datei nicht mehr vorhanden. Häufiges Drehen in 90-Grad-Schritten ist unkritisch, während anschließendes starkes Hochskalieren die Schärfe reduziert.",
    practical: "Lass wichtigen Motiven etwas Rand und prüfe vor allem Gesichter, Text und Logos. Für mehrere Ausgaben solltest du jeden neuen Ausschnitt wieder aus dem Original erstellen.",
  },
  "bild-dateigroesse-komprimieren": {
    background: "Die Dateigröße hängt nicht nur von den Pixelmaßen ab. Detailreiche Fotos, Bildrauschen und feine Strukturen benötigen bei gleicher Auflösung oft mehr Speicher als ruhige Flächen.",
    rules: "Verlustbehaftete Kompression entfernt Details. Mehrfaches Komprimieren verschlechtert das Bild stärker als eine einzelne Ausgabe direkt aus dem Original.",
    practical: "Nutze die echte Grenze des Zielportals und wähle WebP nur, wenn es dort akzeptiert wird. Prüfe feine Schrift, Gesichter und harte Kanten nach dem Download bei 100 Prozent Ansicht.",
  },
  "bild-metadaten-entfernen": {
    background: "EXIF-Daten unterstützen Sortierung und Fotografie, können aber auch GPS-Koordinaten, Aufnahmezeit, Kameramodell und technische Einstellungen enthalten.",
    rules: "Neu kodierte Bildpixel entfernen übliche eingebettete Metadaten, verändern aber nicht Informationen, die sichtbar im Motiv stehen. Plattformen können beim Hochladen außerdem eigene Daten ergänzen.",
    practical: "Teile bei privaten Wohn-, Kinder- oder Reisedaten nur die bereinigte Kopie. Bewahre das Original separat, wenn Aufnahmezeit und Kameraeinstellungen später noch wichtig sind.",
  },
  "passfoto-zuschneiden": {
    background: "Das deutsche Passbildformat beträgt 35 × 45 Millimeter. Für amtliche Dokumente zählt jedoch nicht nur die Größe, sondern auch die aktuelle Art der digitalen Übermittlung und die biometrische Eignung.",
    rules: "Dieses Tool prüft weder Gesichtshöhe, Blickrichtung noch behördliche Annahmefähigkeit. Seit Mai 2025 gelten in Deutschland besondere Regeln für digital übermittelte Passbilder bei Ausweisdokumenten.",
    practical: "Nutze den Zuschnitt für eine Voransicht oder andere Dokumente. Für Personalausweis und Reisepass sollte das Foto über einen zugelassenen Dienst oder direkt bei der Behörde erstellt werden.",
  },
  "bilder-zu-pdf": {
    background: "Eine PDF bündelt mehrere Bilder in einer festen Seitenreihenfolge. Dadurch lassen sich fotografierte Unterlagen einfacher versenden, drucken und gemeinsam archivieren.",
    rules: "Das Tool führt Bilder zusammen, führt aber keine Texterkennung durch. Der Text bleibt Bildinhalt und ist im PDF nicht automatisch durchsuchbar oder barrierefrei.",
    practical: "Drehe jede Seite vorher richtig, ordne Vorder- und Rückseiten und kontrolliere die Reihenfolge. Für amtliche Einreichungen solltest du zusätzlich die erlaubte Dateigröße prüfen.",
  },
  "bildfarben-korrigieren": {
    background: "Helligkeit verschiebt alle Tonwerte, Kontrast vergrößert ihre Abstände, Sättigung verändert die Farbintensität und Temperatur korrigiert einen blauen oder gelben Farbstich.",
    rules: "Stark aufgehellte Schatten zeigen häufig Rauschen. Zu hoher Kontrast kann helle und dunkle Bilddetails abschneiden; übermäßige Sättigung erzeugt unnatürliche Haut- und Produktfarben.",
    practical: "Korrigiere in kleinen Schritten: zuerst Helligkeit, dann Kontrast, danach Farbe. Vergleiche das Ergebnis mit dem Original und beurteile besonders neutrale Flächen und Hauttöne.",
  },
  "favicon-erstellen": {
    background: "Favicons helfen, eine Website in Browser-Tabs, Lesezeichen und auf Startbildschirmen wiederzuerkennen. Sehr kleine Größen benötigen wesentlich einfachere Formen als ein normales Logo.",
    rules: "Browser verwenden unterschiedliche Dateien und können alte Favicons lange zwischenspeichern. Die erzeugten Symbole müssen anschließend korrekt im HTML beziehungsweise Web-App-Manifest verknüpft werden.",
    practical: "Teste vor allem die 16- und 32-Pixel-Version. Entferne kleine Schrift und feine Details, wenn das Symbol im Browser-Tab nicht eindeutig erkennbar bleibt.",
  },
  "qr-code-erstellen": {
    background: "Ein statischer QR-Code speichert den Inhalt direkt im Muster. Er benötigt nach der Erstellung keinen SofortTools-Dienst, das Ziel eines Links kann aber später verschwinden.",
    rules: "Wer den Code scannt, erhält die enthaltenen Daten. Passwörter oder andere vertrauliche Informationen gehören daher nicht auf öffentlich sichtbare Drucksachen.",
    practical: "Teste den fertigen Code mit zwei Geräten und in der geplanten Druckgröße. Ausreichender Kontrast und ein freier Rand verbessern die Erkennung.",
  },
  "meine-ip": {
    background: "Die öffentliche IP ist die Adresse, unter der dein Anschluss oder VPN im Internet erscheint. Mehrere Geräte können sich dieselbe öffentliche Adresse teilen.",
    rules: "Eine IP allein identifiziert keine Person zweifelsfrei. Sie kann sich ändern und bei Mobilfunk, Firmennetzen oder VPNs einem anderen Standort zugeordnet sein.",
    practical: "Deaktiviere testweise dein VPN, wenn du die Adresse deines eigentlichen Anschlusses prüfen möchtest. Veröffentliche die IP nicht unnötig.",
  },
  "ping-test": {
    background: "Der Browser misst hier die Antwortzeit einer Webanfrage, nicht den klassischen ICMP-Ping. Serververarbeitung und Browser können den Wert mit beeinflussen.",
    rules: "Ein einzelner Messwert ist wenig aussagekräftig. WLAN, VPN, parallele Downloads und der Standort des Zielservers verändern die Latenz.",
    practical: "Vergleiche mehrere Durchläufe per WLAN und Kabel. Hohe Schwankungen sind oft wichtiger als ein einmaliger Spitzenwert.",
  },
  altersrechner: {
    background: "Das kalendarische Alter zählt vollständige Jahre, Monate und Tage vom Geburtsdatum bis zum gewählten Stichtag und berücksichtigt unterschiedliche Monatslängen.",
    rules: "Für rechtliche Altersgrenzen ist regelmäßig der konkrete Stichtag maßgeblich. Sonderregeln einer Behörde oder eines Vertrags können zusätzlich gelten.",
    practical: "Kontrolliere das vollständige Geburtsdatum und den Stichtag. Für reine Altersangaben reichen abgeschlossene Lebensjahre meist aus.",
  },
  "zeitdauer-berechnen": {
    background: "Die Nettozeit ist die Spanne zwischen Beginn und Ende abzüglich der Pause. Liegt das Ende früher, nimmt der Rechner einen Wechsel über Mitternacht an.",
    rules: "Ob Pausen bezahlt werden und wie Arbeitszeit gerundet wird, bestimmen Gesetz, Tarif- oder Arbeitsvertrag und betriebliche Zeiterfassung.",
    practical: "Trage nur tatsächlich genommene Pausen ein und prüfe bei Nachtschichten besonders, ob Beginn und Ende zum richtigen Kalendertag gehören.",
  },
  mehrwertsteuerrechner: {
    background: "Mehrwertsteuer wird auf den Nettopreis aufgeschlagen. Bei der Rückrechnung aus Brutto darf der Steuerbetrag nicht einfach als derselbe Prozentsatz vom Brutto abgezogen werden.",
    rules: "Welcher Steuersatz gilt, richtet sich nach dem Umsatzsteuergesetz und der konkreten Ware oder Leistung. Der Rechner entscheidet diese Zuordnung nicht.",
    practical: "Übernimm Betrag und Steuersatz aus Angebot oder Rechnung und prüfe, ob der Ausgangswert netto oder brutto angegeben ist.",
  },
  stundenlohnrechner: {
    background: "Für den Monatsdurchschnitt werden Wochenstunden auf ein Jahr hochgerechnet und durch zwölf geteilt. Deshalb ist der Faktor größer als vier Wochen.",
    rules: "Sonderzahlungen, Zuschläge, bezahlte Abwesenheit und unterschiedlich lange Monate können den tatsächlich ausgezahlten Stundenwert verändern.",
    practical: "Vergleiche Brutto mit Brutto oder Netto mit Netto und rechne regelmäßige Sonderzahlungen separat ein, wenn du Stellenangebote bewertest.",
  },
  spritkostenrechner: {
    background: "Die Rechnung ermittelt reine Kraftstoffkosten aus Strecke, Verbrauch und Literpreis. Verschleiß, Versicherung und Wertverlust sind nicht enthalten.",
    rules: "Der Bordcomputer zeigt oft einen geglätteten Verbrauch. Beladung, Tempo, Wetter und Kurzstrecken können den realen Wert deutlich verändern.",
    practical: "Nutze für faire Kostenteilung den über mehrere Tankfüllungen gemessenen Verbrauch und kläre, ob Park- und Mautkosten zusätzlich geteilt werden.",
  },
  kalenderwoche: {
    background: "Nach ISO 8601 beginnt die Woche am Montag. Kalenderwoche 1 ist die Woche, die den ersten Donnerstag des Jahres enthält.",
    rules: "Dadurch können die letzten Dezembertage bereits zur ersten Woche des Folgejahres oder Januartage noch zur letzten Woche des Vorjahres gehören.",
    practical: "Gib bei Terminen zusätzlich das Jahr an, etwa „KW 1/2027“, damit an Jahresgrenzen keine Verwechslung entsteht.",
  },
  zufallsgenerator: {
    background: "Der Generator nutzt die Zufallsfunktion des Browsers für eine neutrale Auswahl aus der eingegebenen Liste oder einem Zahlenbereich.",
    rules: "Das Ergebnis ist für Spiele und einfache Auslosungen geeignet, aber kein dokumentiertes oder behördlich geprüftes Losverfahren.",
    practical: "Entferne doppelte Namen, wenn jede Person genau eine Chance haben soll, und lege Wiederholungen vor der Ziehung fest.",
  },
  passwortgenerator: {
    background: "Länge schützt in der Regel stärker als komplizierte, aber kurze Muster. Ein gutes Passwort ist lang, zufällig und wird nur für einen Zugang verwendet.",
    rules: "Ein Passwort sollte nicht per Nachricht weitergegeben oder in unverschlüsselten Notizen gespeichert werden. Wo möglich, ergänzt Zwei-Faktor-Authentifizierung den Schutz.",
    practical: "Wähle mindestens 16 Zeichen, speichere das Ergebnis direkt in einem Passwortmanager und verwende es nie erneut.",
  },
  "mietrendite-rechner": {
    background: "Die Bruttorendite vergleicht Jahreskaltmiete und Kaufpreis. Die Nettorendite berücksichtigt zusätzlich Erwerbs- und laufende Eigentümerkosten.",
    rules: "Steuern, Finanzierung, Leerstand und größere Instandsetzungen sind objektspezifisch und können die tatsächliche Rendite deutlich verändern.",
    practical: "Rechne mit nachhaltig erzielbarer Kaltmiete und einem konservativen Kostenansatz. Vergleiche niemals Bruttorendite eines Objekts mit Nettorendite eines anderen.",
  },
  "kaufnebenkosten-rechner": {
    background: "Zum Kaufpreis kommen Grunderwerbsteuer, Notar- und Grundbuchkosten sowie gegebenenfalls eine Maklerprovision hinzu.",
    rules: "Steuersatz und Maklerkosten hängen von Bundesland, Objekt und Vereinbarung ab. Der notarielle Vertrag ist für den Immobilienkauf maßgeblich.",
    practical: "Plane Nebenkosten möglichst aus Eigenkapital und halte zusätzlich eine Reserve für Modernisierung und Umzug zurück.",
  },
  "immobilien-cashflow-rechner": {
    background: "Cashflow beschreibt den monatlichen Überschuss nach regelmäßigem Geldzufluss und laufenden Ausgaben – noch vor persönlicher Steuer.",
    rules: "Tilgung baut Vermögen auf, belastet aber trotzdem die monatliche Liquidität. Nicht umlagefähiges Hausgeld und Rücklagen bleiben beim Eigentümer.",
    practical: "Teste zusätzlich Leerstand, Reparaturen und eine spätere Anschlussfinanzierung. Ein knapp positiver Ausgangswert bietet wenig Sicherheit.",
  },
  "haus-leisten-rechner": {
    background: "Das mögliche Kaufbudget wird aus tragbarer Monatsrate, Zins, Tilgung und Eigenkapital überschlagen. Banken prüfen deutlich mehr Faktoren.",
    rules: "Eine rechnerisch mögliche Rate ist keine Finanzierungszusage. Haushaltsüberschuss, Bonität, Objektwert und Nebenkosten werden individuell beurteilt.",
    practical: "Setze die Monatsrate so an, dass Rücklagen und normale Lebenshaltung auch bei unerwarteten Ausgaben möglich bleiben.",
  },
  "kreditraten-rechner": {
    background: "Bei einem Annuitätendarlehen bleibt die Rate während der Zinsbindung meist gleich; der Zinsanteil sinkt und der Tilgungsanteil steigt.",
    rules: "Sollzins, Effektivzins, Sondertilgungen und Zinsbindung beschreiben unterschiedliche Vertragsbestandteile. Für Angebote ist der Effektivzins besonders wichtig.",
    practical: "Vergleiche neben der Monatsrate auch Restschuld und gezahlte Zinsen am Ende der Zinsbindung.",
  },
  "schichtlohn-rechner": {
    background: "Der Schichtlohn trennt Grundvergütung und Zuschläge nach den tatsächlich geleisteten Stunden zu besonderen Zeiten.",
    rules: "Zahlungsanspruch und Steuerfreiheit sind verschieden: Vertrag oder Tarif regeln den Anspruch, § 3b EStG unter Bedingungen die steuerliche Behandlung.",
    practical: "Übernimm Stunden und Zuschlagssätze aus Dienstplan, Vertrag und Abrechnung. Überschneidungen dürfen nicht ungeprüft doppelt gezählt werden.",
  },
  "nachtzuschlag-rechner": {
    background: "Nachtzuschläge sollen die besondere Belastung von Arbeit während der üblichen Ruhezeit ausgleichen.",
    rules: "Höhe und Nachtzeit können sich aus Tarifvertrag, Arbeitsvertrag oder Rechtsprechung ergeben; steuerliche Grenzen nach § 3b EStG begründen allein keinen Zahlungsanspruch.",
    practical: "Prüfe, welche Stunden im Betrieb als Nachtarbeit gelten und ob der Zuschlag auf den vereinbarten oder einen steuerlich begrenzten Grundlohn bezogen wird.",
  },
  "sonntagszuschlag-rechner": {
    background: "Sonntagsarbeit und ihre Vergütung sind getrennte Fragen. Nicht jede zulässige Sonntagsarbeit führt automatisch zu einem bestimmten Zuschlag.",
    rules: "Der Anspruch folgt meist aus Tarifvertrag, Arbeitsvertrag oder betrieblicher Übung; § 3b EStG beschreibt nur mögliche Steuerfreiheit unter Voraussetzungen.",
    practical: "Dokumentiere Datum und Stunden genau und prüfe, ob zeitliche Überschneidungen mit Nacht- oder Feiertagsarbeit im Regelwerk kombiniert werden dürfen.",
  },
  "feiertagszuschlag-rechner": {
    background: "Ob ein Tag gesetzlicher Feiertag ist, richtet sich nach dem Arbeitsort und dem jeweiligen Bundesland.",
    rules: "Vertrag oder Tarif bestimmen den Zuschlagsanspruch. Für die mögliche Steuerfreiheit gelten gesonderte Grenzen und Nachweispflichten nach § 3b EStG.",
    practical: "Wähle den am Arbeitsort geltenden Feiertag und kontrolliere, ob dein Tarif zwischen normalen und besonders begünstigten Feiertagen unterscheidet.",
  },
  "ueberstunden-rechner": {
    background: "Überstunden sind Arbeitsstunden über die vereinbarte regelmäßige Arbeitszeit hinaus. Ein Zuschlag kommt nur hinzu, wenn er geregelt oder wirksam vereinbart ist.",
    rules: "Arbeitsvertrag, Tarifvertrag, Betriebsvereinbarung und Arbeitszeitgesetz setzen den Rahmen für Anordnung, Ausgleich und Höchstarbeitszeit.",
    practical: "Führe einen eigenen, datierten Stundennachweis und trenne Grundvergütung, Zuschlag und möglichen Freizeitausgleich.",
  },
  "dachkosten-rechner": {
    background: "Dachkosten hängen stärker von Aufbau, Neigung, Zugänglichkeit und Schadensbild ab als von der Fläche allein.",
    rules: "Energetische Anforderungen, Genehmigungen und Fachregeln können zusätzliche Arbeiten auslösen. Eine Vor-Ort-Prüfung bleibt unverzichtbar.",
    practical: "Lass Gerüst, Entsorgung, Dämmung, Anschlüsse und mögliche Holzschäden im Angebot getrennt ausweisen.",
  },
  "badrenovierung-rechner": {
    background: "Im Bad treffen Oberflächen, Sanitär, Elektro und Abdichtung auf engem Raum zusammen. Die Grundfläche allein erklärt daher nur einen Teil der Kosten.",
    rules: "Abdichtung und Installationen müssen den geltenden technischen Regeln entsprechen; Arbeiten an Elektro- und Trinkwasseranlagen gehören in Fachhände.",
    practical: "Prüfe vorab Leitungszustand und Grundriss. Reserviere einen Puffer für Schäden, die erst nach dem Rückbau sichtbar werden.",
  },
  "fensterkosten-rechner": {
    background: "Der Fensterpreis setzt sich aus Element, Verglasung, Ausstattung, Ausbau, Montage und Anschlussarbeiten zusammen.",
    rules: "Wärmeschutz, Lüftungskonzept und fachgerechte Anschlussfugen können je nach Gebäude zusätzliche Anforderungen stellen.",
    practical: "Vergleiche Angebote nur bei gleicher Größe, Verglasung, Rahmenqualität, Montageleistung und Entsorgung.",
  },
  "malerkosten-rechner": {
    background: "Nicht die Wohnfläche, sondern die tatsächlich zu bearbeitende Wand- und Deckenfläche bestimmt den größten Teil des Aufwands.",
    rules: "Abkleben, Spachteln, Grundieren und mehrere Anstriche sind eigenständige Leistungen und nicht automatisch in jedem Quadratmeterpreis enthalten.",
    practical: "Bewerte den Untergrund vor der Kalkulation und lasse Vorarbeiten sowie Materialqualität im Angebot ausdrücklich benennen.",
  },
  "bodenverlegung-kosten-rechner": {
    background: "Bodenkosten entstehen aus Belag, Verschnitt, Untergrundvorbereitung, Verlegung, Sockelleisten und Übergängen.",
    rules: "Verschnitt hängt von Raumform und Verlegemuster ab. Bei schlechtem Untergrund können Ausgleich und Trocknung den Preis stärker erhöhen als der Belag.",
    practical: "Miss Nischen mit, plane Reserve derselben Charge ein und kläre, ob Rückbau, Entsorgung und Möbeltransport enthalten sind.",
  },
  "netto-gehalt-rechner": {
    background: "Vom Bruttogehalt werden Lohnsteuer und Arbeitnehmeranteile zur Sozialversicherung abgezogen. Persönliche Merkmale beeinflussen jeden dieser Posten.",
    rules: "Steuerklasse, Freibeträge, Kinder, Krankenkasse, Kirchensteuer und Beitragsgrenzen können die echte Abrechnung verändern.",
    practical: "Nutze möglichst die Prozentsätze einer aktuellen Abrechnung. Für einen Arbeitgebervergleich sind Jahresbrutto und regelmäßige Sonderzahlungen entscheidend.",
  },
  "einkommensteuer-rechner": {
    background: "Die Einkommensteuer wird auf das zu versteuernde Einkommen angewendet, nicht unmittelbar auf Bruttolohn oder Kontoeingänge.",
    rules: "Abzüge, Freibeträge, Veranlagungsart und der Tarif des jeweiligen Jahres verändern die endgültige Steuer im Bescheid.",
    practical: "Verwende den Rechner für Szenarien und gleiche das Ergebnis für verbindliche Entscheidungen mit Steuerbescheid oder fachlicher Beratung ab.",
  },
  "pendlerpauschale-rechner": {
    background: "Die Entfernungspauschale berücksichtigt grundsätzlich die einfache Entfernung zwischen Wohnung und erster Tätigkeitsstätte je tatsächlichem Arbeitstag.",
    rules: "Homeoffice-Tage, Verkehrsmittel, Höchstbeträge und Sonderfälle werden steuerlich gesondert behandelt und können sich ändern.",
    practical: "Nutze realistische Arbeitstage und die einfache Straßenentfernung. Das Ergebnis mindert das zu versteuernde Einkommen, nicht direkt die Steuer in gleicher Höhe.",
  },
  rentenrechner: {
    background: "Die gesetzliche Rente basiert wesentlich auf Entgeltpunkten, Zugangsfaktor, aktuellem Rentenwert und Rentenartfaktor.",
    rules: "Künftige Rentenwerte, Versicherungszeiten, Abschläge und politische Änderungen lassen sich heute nicht verbindlich vorhersagen.",
    practical: "Vergleiche die Schätzung mit deiner jährlichen Renteninformation und rechne zusätzlich ein Szenario mit früherem Rentenbeginn.",
  },
  "abfindungs-rechner": {
    background: "Eine Abfindung ist meist eine vereinbarte Entschädigung für den Verlust des Arbeitsplatzes und nicht automatisch gesetzlich geschuldet.",
    rules: "Steuerliche Wirkung, mögliche Fünftelregelung und Folgen für Sozialleistungen hängen vom Einzelfall und Auszahlungszeitpunkt ab.",
    practical: "Bewerte neben dem Bruttobetrag auch Steuer, Sperrzeitrisiken, Resturlaub und den Zeitpunkt der Auszahlung mit fachlicher Hilfe.",
  },
  "bauspar-rechner": {
    background: "Ein Bausparvertrag verbindet Ansparphase und mögliches Darlehen. Zuteilung hängt nicht allein vom Guthaben, sondern auch von Vertragsbedingungen und Bewertungszahl ab.",
    rules: "Tarif, Mindestguthaben, Gebühren, Sparzeit und Zuteilungsregeln unterscheiden sich je Anbieter; eine Zuteilung zu einem festen Termin ist nicht garantiert.",
    practical: "Vergleiche Guthabenzins, Darlehenszins, Abschlussgebühr und realistische Sparrate mit einer alternativen Finanzierung.",
  },
  "stromkosten-rechner": {
    background: "Stromkosten eines Geräts ergeben sich aus Leistung, Laufzeit und Arbeitspreis. 1.000 Watt über eine Stunde entsprechen einer Kilowattstunde.",
    rules: "Der Grundpreis des Stromtarifs und schwankende Geräteleistung sind in einer einfachen Einzelgeräterechnung meist nicht enthalten.",
    practical: "Miss wechselnde Verbraucher einige Tage mit einem Energiekostenmessgerät und rechne Standby-Zeiten mit ein.",
  },
  "heizkosten-rechner": {
    background: "Heizkosten verbinden Energieverbrauch und Preis. Gebäudezustand, Wohnfläche, Wetter und Nutzerverhalten bestimmen den Verbrauch gemeinsam.",
    rules: "Bei Mietwohnungen folgt die Verteilung von Heizkosten besonderen Abrechnungsregeln; die eigene Hochrechnung ersetzt keine Heizkostenabrechnung.",
    practical: "Vergleiche witterungsbereinigte Jahresverbräuche statt einzelner Monate und trenne Grundpreis von verbrauchsabhängigen Kosten.",
  },
  "gasverbrauch-rechner": {
    background: "Der Gaszähler misst Kubikmeter, abgerechnet wird Energie in Kilowattstunden. Zustandszahl und Brennwert verbinden beide Größen.",
    rules: "Brennwert und Zustandszahl stehen auf der Abrechnung und unterscheiden sich nach Netzgebiet und Abrechnungszeitraum.",
    practical: "Nutze für eine genaue Umrechnung die Werte deiner letzten Rechnung statt pauschaler Annahmen.",
  },
  "solar-ertrag-rechner": {
    background: "Der PV-Ertrag hängt von Anlagengröße, Standort, Ausrichtung, Neigung, Verschattung und Systemverlusten ab.",
    rules: "Netzanschluss, Vergütung, Steuern und technische Vorgaben müssen aktuell beim Netzbetreiber und den zuständigen Stellen geprüft werden.",
    practical: "Rechne konservativ und trenne Eigenverbrauch, Einspeisung, Strompreissteigerung und mögliche Reparaturen.",
  },
  "bmi-rechner": {
    background: "Der BMI setzt Gewicht ins Verhältnis zur Körpergröße und wurde für die grobe Einordnung von Bevölkerungsgruppen entwickelt.",
    rules: "Muskelmasse, Körperbau, Alter und Fettverteilung werden nicht berücksichtigt. Der Wert ist keine Diagnose.",
    practical: "Nutze den BMI als groben Hinweis und beziehe Taillenumfang, Gesundheitszustand und fachliche Einschätzung mit ein.",
  },
  "kalorienbedarf-rechner": {
    background: "Formeln für Grund- und Gesamtumsatz schätzen den Energiebedarf aus Körperdaten und Aktivitätsfaktor.",
    rules: "Stoffwechsel, Muskelmasse, Erkrankungen und tatsächliche Bewegung können deutlich vom Durchschnittsmodell abweichen.",
    practical: "Beobachte Gewicht und Leistungsfähigkeit über mehrere Wochen und passe die Schätzung nur in kleinen Schritten an.",
  },
  "koerperfett-anteil-rechner": {
    background: "Umfangsformeln schätzen den Körperfettanteil aus Körpermaßen. Sie sind praktisch, aber ungenauer als professionelle Messverfahren.",
    rules: "Messpunkt, Bandspannung, Tageszeit und Körperform beeinflussen das Ergebnis; einzelne Nachkommastellen täuschen Genauigkeit vor.",
    practical: "Miss immer unter ähnlichen Bedingungen und beobachte den Trend statt einen einzelnen Wert.",
  },
  "idealgewicht-rechner": {
    background: "Idealgewichtsformeln liefern einen statistischen Orientierungsbereich aus Größe und weiteren Grunddaten, kein persönliches Zielgewicht.",
    rules: "Körperbau, Muskelmasse, Alter, Erkrankungen und Wohlbefinden lassen sich in einer einfachen Formel nicht abbilden.",
    practical: "Verwende das Ergebnis als breite Orientierung und besprich starke Gewichtsveränderungen mit medizinischem Fachpersonal.",
  },
  "elterngeld-rechner": {
    background: "Elterngeld ersetzt einen Teil des wegfallenden Erwerbseinkommens nach der Geburt und hängt von Bezugsform und persönlicher Situation ab.",
    rules: "Bemessungszeitraum, Einkommensgrenzen, Mutterschaftsleistungen und parallele Erwerbstätigkeit werden nach dem BEEG individuell geprüft.",
    practical: "Plane Lebensmonate statt Kalendermonate und prüfe Basiselterngeld, ElterngeldPlus und Partnerschaftsbonus gemeinsam.",
  },
  "kindergeld-rechner": {
    background: "Kindergeld wird monatlich je berücksichtigungsfähigem Kind gezahlt. Bezugsdauer und Voraussetzungen ändern sich besonders nach dem 18. Geburtstag.",
    rules: "Ausbildung, Studium, Übergangszeiten und andere Sonderfälle prüft die Familienkasse anhand der aktuellen gesetzlichen Voraussetzungen.",
    practical: "Nutze die Rechnung für die Haushaltsplanung und kontrolliere bei volljährigen Kindern Nachweise und Fristen frühzeitig.",
  },
  "schwangerschafts-terminrechner": {
    background: "Der errechnete Termin wird üblicherweise aus dem ersten Tag der letzten Periode oder bekannten Behandlungsdaten geschätzt.",
    rules: "Zykluslänge und tatsächlicher Eisprung können abweichen; medizinisch maßgeblich ist die Einordnung durch Ärztin, Arzt oder Hebamme.",
    practical: "Betrachte den Termin als Zeitraum für die Planung. Nur ein kleiner Teil der Geburten findet genau am errechneten Tag statt.",
  },
  "urlaubsanspruch-rechner": {
    background: "Der gesetzliche Mindesturlaub wird im Bundesurlaubsgesetz auf eine Sechstagewoche bezogen und auf die tatsächlichen Arbeitstage umgerechnet.",
    rules: "Arbeits- oder Tarifvertrag können mehr Urlaub gewähren. Eintritt, Austritt, Elternzeit, Krankheit und wechselnde Arbeitstage erfordern eine gesonderte Prüfung.",
    practical: "Gib die regelmäßigen Arbeitstage pro Woche an und vergleiche das Ergebnis getrennt mit gesetzlichem und vertraglichem Anspruch.",
  },
  "angebots-kalkulation": {
    background: "Ein tragfähiger Angebotspreis deckt Material, Arbeitszeit, Gemeinkosten, Risiko und Gewinn – Umsatz ist nicht gleich Gewinn.",
    rules: "Mehrwertsteuer, Leistungsbeschreibung, Zahlungsbedingungen und mögliche Nachträge müssen zur eigenen Unternehmens- und Vertragssituation passen.",
    practical: "Kalkuliere intern netto, dokumentiere Annahmen und prüfe vor Versand, ob alle Nebenleistungen und ein realistischer Puffer enthalten sind.",
  },
  "umzugskosten-rechner": {
    background: "Umzugskosten entstehen aus Transport, Helfern, Verpackung, Renovierung, Anschlüssen und häufig einer zeitlichen Überschneidung beider Wohnungen.",
    rules: "Welche Kosten steuerlich oder vom Arbeitgeber anerkannt werden, hängt vom Anlass, Nachweisen und den aktuellen Voraussetzungen ab.",
    practical: "Hole Vergleichsangebote mit gleichem Leistungsumfang ein und plane Reserve für Halteverbotszone, Zusatzkilometer und nicht stapelbare Gegenstände.",
  },
};

export function getToolEditorial(tool: EditorialTool, seo: ToolSeoContent, guideExcerpt?: string) {
  const context = toolContext[tool.slug] ?? categoryContext[tool.category] ?? {
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
