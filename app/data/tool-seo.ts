import { growthToolSeo } from "./growth";
import { learningTextSeoContent } from "./learning-text-seo-tools";

export type ToolSeoContent = {
  steps: { title: string; text: string }[];
  formula?: string;
  example?: string;
  relatedSlugs?: string[];
};

const toolSeo: Record<string, ToolSeoContent> = {
  ...growthToolSeo,
  ...learningTextSeoContent,
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
  "bildformat-konverter": {
    steps: [{ title: "Bild ablegen", text: "Ziehe ein JPG-, PNG-, WebP-, AVIF-, HEIC- oder HEIF-Bild in die Ablagefläche oder wähle es auf deinem Gerät aus." }, { title: "Zielformat festlegen", text: "Wähle JPG, PNG, WebP, AVIF oder BMP. Bei JPG, WebP und AVIF kannst du zusätzlich die gewünschte Bildqualität bestimmen." }, { title: "Arbeitskopie herunterladen", text: "Der Browser zeichnet die Pixel in das neue Format und stellt die fertige Datei direkt zum Download bereit." }],
    formula: "Ausgabedatei = dekodierte Bildpixel + Kodierung und Eigenschaften des gewählten Zielformats",
    example: "Ein transparentes PNG bleibt als PNG, WebP oder AVIF transparent. Bei JPG und BMP werden transparente Flächen weiß gefüllt.",
    relatedSlugs: ["bild-dateigroesse-komprimieren", "bildgroesse-aendern", "bild-metadaten-entfernen"],
  },
  "hintergrund-entfernen": {
    steps: [{ title: "Motiv mit erkennbarem Hintergrund wählen", text: "Die besten Ergebnisse entstehen bei einem scharfen Motiv vor einer ruhigen Farbe, die den äußeren Bildrand erreicht." }, { title: "Hintergrundfarbe bestimmen", text: "Im Automatikmodus werden die vier Bildecken ausgewertet. Alternativ kannst du die Hintergrundfarbe selbst festlegen." }, { title: "Empfindlichkeit kontrollieren", text: "Zusammenhängende Randpixel mit ähnlicher Farbe werden transparent. Ein niedriger Wert schützt feine Motivkanten." }],
    formula: "Transparenz = zusammenhängende Randfläche innerhalb der gewählten Farbtoleranz",
    example: "Bei einem Produkt vor einer weißen Wand erkennt das Tool Weiß an den Ecken und entfernt nur die verbundene helle Fläche vom Rand aus.",
    relatedSlugs: ["bild-zuschneiden-drehen", "bildformat-konverter", "favicon-erstellen"],
  },
  "bildgroesse-aendern": {
    steps: [{ title: "Originalgröße einlesen", text: "Nach der Auswahl werden Breite, Höhe und das ursprüngliche Seitenverhältnis übernommen." }, { title: "Zielmaße eingeben", text: "Ändere Breite oder Höhe. Bei gesperrtem Seitenverhältnis wird die jeweils andere Größe automatisch passend berechnet." }, { title: "Bild neu berechnen", text: "Der Browser skaliert die Pixel mit hochwertiger Glättung und speichert das Ergebnis als PNG." }],
    formula: "Neue Höhe = neue Breite ÷ ursprüngliches Seitenverhältnis",
    example: "Ein Bild mit 2400 × 1600 Pixeln hat das Verhältnis 1,5. Bei 1200 Pixeln Breite ergibt sich eine Höhe von 800 Pixeln.",
    relatedSlugs: ["bild-zuschneiden-drehen", "bild-dateigroesse-komprimieren", "passfoto-zuschneiden"],
  },
  "bild-zuschneiden-drehen": {
    steps: [{ title: "Seitenverhältnis wählen", text: "Nutze das gesamte Bild oder einen mittigen Ausschnitt in 1:1, 4:3, 16:9 oder 9:16." }, { title: "Ausschnitt verfeinern", text: "Mit den Prozentreglern bestimmst du Beginn, Breite und Höhe des verwendeten Bildbereichs." }, { title: "Ausrichtung korrigieren", text: "Drehe das Ergebnis in 90-Grad-Schritten oder spiegele es horizontal, bevor du die PNG-Datei speicherst." }],
    formula: "Ausschnitt in Pixeln = Bildmaß × gewählter Prozentanteil ÷ 100",
    example: "50 Prozent Breite eines 2000 Pixel breiten Fotos ergeben einen Ausschnitt mit 1000 Pixeln Breite.",
    relatedSlugs: ["bildgroesse-aendern", "passfoto-zuschneiden", "bildfarben-korrigieren"],
  },
  "bild-dateigroesse-komprimieren": {
    steps: [{ title: "Dateigrenze angeben", text: "Trage die maximale Größe des Uploadportals oder E-Mail-Anhangs in Kilobyte ein." }, { title: "Beste Qualität suchen", text: "Das Tool testet mehrere Qualitätsstufen und behält die hochwertigste Datei unterhalb der Grenze." }, { title: "Nur bei Bedarf skalieren", text: "Ist selbst die niedrigste sinnvolle Qualitätsstufe noch zu groß, wird zusätzlich die Pixelauflösung schrittweise reduziert." }],
    formula: "Optimale Datei = höchste Qualitätsstufe mit Dateigröße ≤ gewählter KB-Grenze",
    example: "Für eine Grenze von 500 KB wird zuerst die JPG-Qualität angepasst. Die Auflösung sinkt nur, wenn die Grenze damit nicht erreichbar ist.",
    relatedSlugs: ["bildgroesse-aendern", "bildformat-konverter", "bilder-zu-pdf"],
  },
  "bild-metadaten-entfernen": {
    steps: [{ title: "Bild lokal öffnen", text: "Das sichtbare Bild wird im Browser dekodiert; der ursprüngliche EXIF-Datenblock wird nicht weiterverwendet." }, { title: "Nur Pixel übernehmen", text: "Der Browser zeichnet Breite, Höhe und sichtbare Pixel auf eine neue, leere Bildfläche." }, { title: "Saubere Kopie speichern", text: "Die neue JPG-, PNG- oder WebP-Datei enthält die neu kodierten Pixel, aber keine übernommenen Standort- oder Kameradaten." }],
    formula: "Saubere Kopie = sichtbare Bildpixel ohne Metadatenblöcke des Originals",
    example: "GPS-Koordinaten eines Smartphone-Fotos werden nicht in die neu erzeugte Bildkopie geschrieben.",
    relatedSlugs: ["bildformat-konverter", "bild-dateigroesse-komprimieren", "bilder-zu-pdf"],
  },
  "passfoto-zuschneiden": {
    steps: [{ title: "Porträt auswählen", text: "Verwende ein frontales, scharfes Foto vor einem ruhigen und gleichmäßig ausgeleuchteten Hintergrund." }, { title: "Kopf im Rahmen positionieren", text: "Passe Vergrößerung und Verschiebung an, bis Gesicht und oberer Schulterbereich sinnvoll im Hochformat liegen." }, { title: "Datei im Nennformat erzeugen", text: "Das Ergebnis wird im Verhältnis 35 zu 45 und mit 413 × 531 Pixeln als JPG gespeichert." }],
    formula: "Pixelmaß bei 300 dpi = Millimeter ÷ 25,4 × 300",
    example: "35 mm ergeben rund 413 Pixel und 45 mm rund 531 Pixel bei einer vorgesehenen Druckauflösung von 300 dpi.",
    relatedSlugs: ["bild-zuschneiden-drehen", "bildgroesse-aendern", "bildfarben-korrigieren"],
  },
  "bilder-zu-pdf": {
    steps: [{ title: "Bilder gemeinsam hinzufügen", text: "Ziehe mehrere Bilddateien in die Ablagefläche. Weitere Bilder lassen sich später ergänzen." }, { title: "Seitenreihenfolge festlegen", text: "Verschiebe jede Datei nach oben oder unten und entferne falsche Seiten vor der Erstellung." }, { title: "A4-PDF erzeugen", text: "Jedes Bild wird proportional und ohne Beschnitt auf einer eigenen A4-Seite platziert." }],
    formula: "Skalierungsfaktor = kleinere Grenze aus verfügbarer Seitenbreite ÷ Bildbreite und Seitenhöhe ÷ Bildhöhe",
    example: "Ein breites Foto wird so verkleinert, dass es vollständig auf die A4-Seite passt; die übrige Fläche bleibt weiß.",
    relatedSlugs: ["bild-metadaten-entfernen", "bild-dateigroesse-komprimieren", "bildformat-konverter"],
  },
  "bildfarben-korrigieren": {
    steps: [{ title: "Grundhelligkeit ausgleichen", text: "Korrigiere zuerst ein insgesamt zu dunkles oder zu helles Foto mit dem Helligkeitsregler." }, { title: "Kontrast und Sättigung fein abstimmen", text: "Erhöhe beide Werte nur so weit, dass helle Flächen, Schatten und Hauttöne noch natürliche Abstufungen zeigen." }, { title: "Farbstich korrigieren", text: "Verschiebe die Temperatur bei bläulichem Licht in den warmen und bei gelblichem Licht in den kühlen Bereich." }],
    formula: "Neue Farbwerte = Helligkeitskorrektur + Kontrastspreizung + Sättigung + Temperaturverschiebung",
    example: "Ein leicht blaues Innenraumfoto wird mit etwas Wärme und moderater Helligkeit natürlicher, ohne Farben künstlich zu übersteuern.",
    relatedSlugs: ["bild-zuschneiden-drehen", "bild-dateigroesse-komprimieren", "passfoto-zuschneiden"],
  },
  "favicon-erstellen": {
    steps: [{ title: "Klares Logo auswählen", text: "Nutze möglichst ein quadratisches Motiv mit wenigen Formen und ausreichend Rand." }, { title: "Mitte quadratisch zuschneiden", text: "Nicht quadratische Vorlagen werden ohne Verzerrung mittig auf ein Quadrat beschnitten." }, { title: "Browsergrößen herunterladen", text: "Das Tool erzeugt favicon.ico sowie PNG-Dateien mit 16, 32, 48, 180, 192 und 512 Pixeln." }],
    formula: "Favicon = mittiger quadratischer Ausschnitt, skaliert auf die jeweilige Zielgröße",
    example: "Aus einem 1200 × 800 Pixel großen Logo wird zunächst ein mittiger 800 × 800-Ausschnitt und daraus jede benötigte Symbolgröße.",
    relatedSlugs: ["bild-zuschneiden-drehen", "hintergrund-entfernen", "bildgroesse-aendern"],
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
  "dreisatzrechner": {
    steps: [
      { title: "Bekannte Werte eintragen", text: "Gib die beiden zusammengehörigen Ausgangswerte und den dritten bekannten Wert ein." },
      { title: "Zuordnung prüfen", text: "Prüfe, ob sich die gesuchte Größe proportional verändert: mehr von A bedeutet entsprechend mehr von B." },
      { title: "Rechenweg ablesen", text: "Der Rechner zeigt nicht nur das Ergebnis, sondern auch die verwendeten Zwischenschritte." },
    ],
    formula: "Gesuchter Wert = dritter Wert × zweiter Wert ÷ erster Wert",
    example: "3 kg kosten 12 €. Dann kosten 5 kg: 5 × 12 ÷ 3 = 20 €.",
    relatedSlugs: ["prozentrechner", "mehrwertsteuerrechner"],
  },
  "wordle-hilfe": {
    steps: [
      { title: "Bekannte Positionen eintragen", text: "Setze bereits bestätigte Buchstaben an die richtige Stelle und verwende Punkte für unbekannte Positionen." },
      { title: "Enthaltene Buchstaben ergänzen", text: "Trage gelbe Buchstaben ein, die im Wort vorkommen, aber noch nicht richtig platziert sind." },
      { title: "Buchstaben ausschließen", text: "Ergänze graue Buchstaben, damit unpassende Wörter aus der Trefferliste verschwinden." },
    ],
    example: "Das Muster A..EN findet deutsche Wörter mit A am Anfang und EN am Ende.",
    relatedSlugs: ["woerter-aus-buchstaben", "woerter-zaehlen"],
  },
  "qr-code-erstellen": {
    steps: [
      { title: "Inhalt festlegen", text: "Gib einen Link, einen Text oder die benötigten WLAN-Zugangsdaten ein." },
      { title: "QR-Code erzeugen", text: "Der statische QR-Code wird direkt im Browser erstellt und enthält die eingegebenen Daten dauerhaft." },
      { title: "PNG speichern und testen", text: "Lade die Grafik herunter und teste sie vor dem Drucken mit einer zweiten Kamera-App." },
    ],
    relatedSlugs: ["passwortgenerator", "meine-ip"],
  },
  "meine-ip": {
    steps: [
      { title: "Seite öffnen", text: "Beim Aufruf fragt das Tool deine aktuell nach außen sichtbare öffentliche IP-Adresse ab." },
      { title: "IPv4 oder IPv6 erkennen", text: "Das Ergebnis zeigt die verfügbare öffentliche Adresse zusammen mit grundlegenden Browserdaten." },
      { title: "Ergebnis sicher verwenden", text: "Teile eine IP-Adresse nur, wenn sie für Fehlersuche oder eine Freischaltung wirklich benötigt wird." },
    ],
    relatedSlugs: ["ping-test", "passwortgenerator", "qr-code-erstellen"],
  },
  "ping-test": {
    steps: [
      { title: "Messung starten", text: "Starte mehrere kleine Webanfragen an den SofortTools-Server." },
      { title: "Werte vergleichen", text: "Das Tool ermittelt Durchschnitt, Minimum und Maximum der gemessenen Reaktionszeiten." },
      { title: "Abweichungen einordnen", text: "Stark schwankende Werte können auf WLAN-, Mobilfunk- oder Auslastungsprobleme hindeuten." },
    ],
    formula: "Durchschnittliche Latenz = Summe aller Messzeiten ÷ Anzahl der Messungen",
    relatedSlugs: ["meine-ip", "passwortgenerator"],
  },
  "altersrechner": {
    steps: [
      { title: "Geburtsdatum wählen", text: "Trage dein vollständiges Geburtsdatum ein." },
      { title: "Stichtag festlegen", text: "Verwende das heutige Datum oder wähle einen anderen Stichtag für die Berechnung." },
      { title: "Genaues Alter ablesen", text: "Das Ergebnis berücksichtigt echte Kalendermonate, unterschiedliche Monatslängen und Schaltjahre." },
    ],
    example: "So lässt sich etwa das genaue Alter an einem zukünftigen Vertrags- oder Prüfungstag bestimmen.",
    relatedSlugs: ["kalenderwoche", "zeitdauer-berechnen"],
  },
  "kalenderwoche": {
    steps: [
      { title: "Datum auswählen", text: "Wähle den Tag, dessen ISO-Kalenderwoche du bestimmen möchtest." },
      { title: "Kalenderwoche ermitteln", text: "Der Rechner ordnet das Datum nach ISO 8601 der korrekten Kalenderwoche zu." },
      { title: "Wochenzeitraum prüfen", text: "Zusätzlich werden Montag und Sonntag der gefundenen Woche angezeigt." },
    ],
    example: "Die erste ISO-Kalenderwoche ist die Woche mit dem ersten Donnerstag des Jahres.",
    relatedSlugs: ["altersrechner", "zeitdauer-berechnen"],
  },
  "zufallsgenerator": {
    steps: [
      { title: "Auslosung wählen", text: "Entscheide, ob du einen Namen aus einer Liste oder eine Zahl aus einem Bereich ziehen möchtest." },
      { title: "Teilnehmer oder Grenzen eintragen", text: "Füge Listeneinträge zeilenweise ein oder bestimme Mindest- und Höchstzahl." },
      { title: "Zufälliges Ergebnis ziehen", text: "Starte die Auswahl; bei Zahlen können beide eingegebenen Grenzen gezogen werden." },
    ],
    relatedSlugs: ["passwortgenerator", "woerter-aus-buchstaben"],
  },
  "passwortgenerator": {
    steps: [
      { title: "Passwortlänge bestimmen", text: "Wähle für wichtige Konten möglichst mindestens 16 Zeichen." },
      { title: "Zeichenarten auswählen", text: "Aktiviere Groß- und Kleinbuchstaben, Zahlen und bei unterstützten Diensten Sonderzeichen." },
      { title: "Passwort sicher speichern", text: "Kopiere das lokal erzeugte Passwort direkt in einen vertrauenswürdigen Passwortmanager." },
    ],
    relatedSlugs: ["qr-code-erstellen", "meine-ip"],
  },
  "mietrendite-rechner": {
    steps: [
      { title: "Kaufpreis und Miete eintragen", text: "Gib Kaufpreis und monatliche Kaltmiete der Immobilie ein." },
      { title: "Nebenkosten berücksichtigen", text: "Ergänze Kaufnebenkosten und nicht umlagefähige jährliche Eigentümerkosten." },
      { title: "Brutto und netto vergleichen", text: "Vergleiche Bruttomietrendite, Nettomietrendite und jährlichen Überschuss." },
    ],
    formula: "Bruttomietrendite = Jahreskaltmiete ÷ Kaufpreis × 100",
    example: "12.000 € Jahreskaltmiete bei 240.000 € Kaufpreis entsprechen 5 % Bruttomietrendite.",
    relatedSlugs: ["immobilien-cashflow-rechner", "kaufnebenkosten-rechner", "kreditraten-rechner"],
  },
  "kaufnebenkosten-rechner": {
    steps: [
      { title: "Kaufpreis eintragen", text: "Gib den vereinbarten Kaufpreis der Immobilie ein." },
      { title: "Prozentsätze anpassen", text: "Wähle die Grunderwerbsteuer deines Bundeslands und ergänze Notar-, Grundbuch- und Maklerkosten." },
      { title: "Gesamtbudget prüfen", text: "Der Rechner zeigt jede Kostenposition, die Nebenkostensumme und den gesamten Kapitalbedarf." },
    ],
    formula: "Gesamtkosten = Kaufpreis + Grunderwerbsteuer + Notar/Grundbuch + Makler",
    relatedSlugs: ["haus-leisten-rechner", "kreditraten-rechner", "mietrendite-rechner"],
  },
  "immobilien-cashflow-rechner": {
    steps: [
      { title: "Monatliche Kaltmiete eingeben", text: "Trage die nachhaltig erzielbare monatliche Kaltmiete ein." },
      { title: "Finanzierung und Kosten ergänzen", text: "Erfasse Kreditrate, nicht umlagefähiges Hausgeld, Rücklage, Verwaltung und weitere Ausgaben." },
      { title: "Monatlichen Cashflow prüfen", text: "Das Ergebnis zeigt, ob vor Steuern ein monatlicher Überschuss oder Fehlbetrag entsteht." },
    ],
    formula: "Cashflow = Kaltmiete − Kreditrate − nicht umlagefähige Kosten − Rücklage",
    relatedSlugs: ["mietrendite-rechner", "kreditraten-rechner", "kaufnebenkosten-rechner"],
  },
  "kreditraten-rechner": {
    steps: [
      { title: "Kreditsumme festlegen", text: "Gib den benötigten Darlehensbetrag für die Immobilienfinanzierung ein." },
      { title: "Zins und Tilgung eintragen", text: "Ergänze Sollzins, anfängliche Tilgung und die gewünschte Dauer der Zinsbindung." },
      { title: "Rate und Restschuld vergleichen", text: "Prüfe monatliche Annuität, anfänglichen Zins- und Tilgungsanteil sowie die geschätzte Restschuld." },
    ],
    formula: "Monatsrate = Kreditsumme × (Sollzins + anfängliche Tilgung) ÷ 12",
    relatedSlugs: ["haus-leisten-rechner", "kaufnebenkosten-rechner", "immobilien-cashflow-rechner"],
  },
  "schichtlohn-rechner": {
    steps: [
      { title: "Grundlohn erfassen", text: "Trage Stundenlohn und regulär geleistete Monatsstunden ein." },
      { title: "Zuschlagsstunden aufteilen", text: "Ergänze Nacht-, Sonntags- und Feiertagsstunden mit den jeweils vereinbarten Zuschlagssätzen." },
      { title: "Monatsübersicht prüfen", text: "Der Rechner trennt Grundlohn und Zuschläge und addiert daraus den geschätzten Bruttolohn." },
    ],
    formula: "Schichtlohn = Grundlohn + Nachtzuschlag + Sonntagszuschlag + Feiertagszuschlag",
    relatedSlugs: ["nachtzuschlag-rechner", "sonntagszuschlag-rechner", "feiertagszuschlag-rechner", "stundenlohnrechner"],
  },
  "nachtzuschlag-rechner": {
    steps: [
      { title: "Stundenlohn und Nachtstunden eingeben", text: "Trage den Grundlohn pro Stunde und die tatsächlich nachts geleisteten Stunden ein." },
      { title: "Zuschlagssatz auswählen", text: "Nutze den arbeits- oder tarifvertraglich vereinbarten Satz, zum Beispiel 25 oder 40 Prozent." },
      { title: "Zuschlag einordnen", text: "Vergleiche den errechneten Betrag mit der steuerlichen Höchstgrenze nach § 3b EStG." },
    ],
    formula: "Nachtzuschlag = Stundenlohn × Nachtstunden × Zuschlagssatz",
    example: "20 € × 8 Stunden × 25 % ergeben 40 € Nachtzuschlag.",
    relatedSlugs: ["schichtlohn-rechner", "sonntagszuschlag-rechner", "feiertagszuschlag-rechner"],
  },
  "sonntagszuschlag-rechner": {
    steps: [
      { title: "Grundlohn und Sonntagsstunden eingeben", text: "Erfasse Stundenlohn und tatsächlich am Sonntag geleistete Arbeitsstunden." },
      { title: "Vereinbarten Zuschlag eintragen", text: "Gib den Prozentsatz aus Arbeitsvertrag, Tarifvertrag oder Betriebsvereinbarung an." },
      { title: "Steuerliche Grenze vergleichen", text: "Das Ergebnis stellt den Arbeitgeberzuschlag der Höchstgrenze nach § 3b EStG gegenüber." },
    ],
    formula: "Sonntagszuschlag = Stundenlohn × Sonntagsstunden × Zuschlagssatz",
    relatedSlugs: ["schichtlohn-rechner", "nachtzuschlag-rechner", "feiertagszuschlag-rechner"],
  },
  "feiertagszuschlag-rechner": {
    steps: [
      { title: "Feiertag auswählen", text: "Unterscheide normale gesetzliche Feiertage von besonders begünstigten Tagen wie Weihnachten oder dem 1. Mai." },
      { title: "Lohn und Stunden eintragen", text: "Erfasse Grundlohn, geleistete Feiertagsstunden und den vereinbarten Zuschlag." },
      { title: "125 oder 150 Prozent prüfen", text: "Vergleiche den errechneten Zuschlag mit der passenden steuerlichen Höchstgrenze nach § 3b EStG." },
    ],
    formula: "Feiertagszuschlag = Stundenlohn × Feiertagsstunden × Zuschlagssatz",
    relatedSlugs: ["schichtlohn-rechner", "sonntagszuschlag-rechner", "nachtzuschlag-rechner"],
  },
  "ueberstunden-rechner": {
    steps: [
      { title: "Stundenlohn und Überstunden eintragen", text: "Gib deinen Stundenlohn und die Anzahl der auszugleichenden Mehrarbeitsstunden ein." },
      { title: "Zuschlag ergänzen", text: "Trage den vereinbarten Überstundenzuschlag ein; ohne Vereinbarung kannst du mit 0 Prozent rechnen." },
      { title: "Auszahlung oder Freizeit vergleichen", text: "Prüfe den Bruttowert der Überstunden und den entsprechenden Freizeitausgleich." },
    ],
    formula: "Auszahlung = Stundenlohn × Überstunden × (1 + Zuschlagssatz)",
    relatedSlugs: ["stundenlohnrechner", "zeitdauer-berechnen", "schichtlohn-rechner"],
  },
  "badrenovierung-rechner": {
    steps: [
      { title: "Badfläche und Ausbaupreis eintragen", text: "Gib Raumgröße und den geschätzten Sanierungspreis pro Quadratmeter ein." },
      { title: "Ausstattung und Installationen ergänzen", text: "Erfasse Sanitärobjekte, Möbel, Wasser-, Abwasser- und Elektroarbeiten separat." },
      { title: "Budget mit Puffer prüfen", text: "Der Rechner addiert alle Positionen und berücksichtigt einen frei wählbaren Sicherheitspuffer." },
    ],
    formula: "Gesamtkosten = Fläche × Ausbaupreis/m² + Ausstattung + Installationen + Puffer",
    relatedSlugs: ["bodenverlegung-kosten-rechner", "malerkosten-rechner", "fensterkosten-rechner"],
  },
  "fensterkosten-rechner": {
    steps: [
      { title: "Fensteranzahl erfassen", text: "Gib ein, wie viele Fenster ausgetauscht oder neu eingebaut werden sollen." },
      { title: "Stück- und Montagepreise eintragen", text: "Ergänze Fensterpreis, Montagekosten und weitere Arbeiten je Element." },
      { title: "Gesamtkosten vergleichen", text: "Das Ergebnis trennt Material, Einbau und Zusatzkosten für einen besseren Angebotsvergleich." },
    ],
    formula: "Gesamtkosten = Anzahl × (Fensterpreis + Montagepreis) + Zusatzkosten",
    relatedSlugs: ["dachkosten-rechner", "malerkosten-rechner", "badrenovierung-rechner"],
  },
  "malerkosten-rechner": {
    steps: [
      { title: "Malerfläche bestimmen", text: "Trage die tatsächlich zu bearbeitende Wand- und Deckenfläche ein, nicht nur die Wohnfläche." },
      { title: "Flächenpreis und Vorarbeiten ergänzen", text: "Erfasse Preis pro Quadratmeter sowie Kosten für Abdecken, Spachteln, Schleifen oder Grundieren." },
      { title: "Material und Gesamtkosten prüfen", text: "Der Rechner addiert Arbeits-, Vorbereitungs- und zusätzliche Materialkosten." },
    ],
    formula: "Gesamtkosten = Malerfläche × Preis/m² + Vorarbeiten + Material",
    relatedSlugs: ["bodenverlegung-kosten-rechner", "badrenovierung-rechner", "fensterkosten-rechner"],
  },
  "bodenverlegung-kosten-rechner": {
    steps: [
      { title: "Bodenfläche eingeben", text: "Trage die zu belegende Fläche in Quadratmetern ein." },
      { title: "Material, Verschnitt und Verlegung ergänzen", text: "Erfasse Materialpreis, Verlegepreis und einen passenden Verschnitt für Raumform und Verlegemuster." },
      { title: "Nebenarbeiten berücksichtigen", text: "Ergänze zum Beispiel Rückbau, Untergrundausgleich, Dämmung, Sockelleisten und Entsorgung." },
    ],
    formula: "Gesamtkosten = Fläche mit Verschnitt × Materialpreis + Fläche × Verlegepreis + Zusatzkosten",
    relatedSlugs: ["malerkosten-rechner", "badrenovierung-rechner", "dachkosten-rechner"],
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
