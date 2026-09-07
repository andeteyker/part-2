/**
 * Pillar-/Supporting-Content für SofortTools. Die Inhalte werden aus
 * redaktionell gepflegten Themenbausteinen zu vollständigen Ratgebern gebaut.
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
  excerpt: string;
  updated: string;
  kind: "pillar" | "supporting";
  cluster: string;
  relatedGuideSlugs: string[];
  sections: { h2: string; blocks: GuideBlock[] }[];
};

type GuideSeed = Omit<Guide, "sections"> & {
  topic: string;
  intro: string;
  method: string;
  essentials: string[];
  table: string[][];
  pitfalls: string[];
  example: string;
};

function buildGuide(seed: GuideSeed): Guide {
  return {
    ...seed,
    sections: [
      {
        h2: `${seed.topic}: die richtige Einordnung`,
        blocks: [
          { type: "p", text: seed.intro },
          { type: "p", text: `Eine belastbare Orientierung entsteht nicht durch einen einzelnen Richtwert, sondern durch nachvollziehbare Annahmen. Beim Thema ${seed.topic} solltest du deshalb Ausgangswerte, Zeitraum und mögliche Zusatzkosten getrennt betrachten. So erkennst du, welcher Wert sicher bekannt ist, wo du schätzen musst und welche Abweichung dein Ergebnis am stärksten verändert. Der passende SofortTools-Rechner übernimmt die Mathematik; die Entscheidung über realistische Eingaben bleibt bewusst bei dir.` },
          { type: "p", text: `Dieser Ratgeber führt dich von der groben Einschätzung zu einer prüfbaren Rechnung. Notiere möglichst die Quelle jedes Werts, etwa Vertrag, Angebot, Abrechnung oder eigene Messung. Rechne anschließend mindestens ein realistisches, ein günstiges und ein vorsichtiges Szenario. Diese Bandbreite ist für Planung und Vergleich meist hilfreicher als eine scheinbar exakte Einzelzahl.` },
        ],
      },
      {
        h2: "Welche Angaben du benötigst",
        blocks: [
          { type: "p", text: `Für ${seed.topic} reichen oft wenige Kernangaben. Entscheidend ist, dass alle Werte dieselbe Einheit und denselben Zeitraum verwenden. Monatliche Beträge dürfen zum Beispiel nicht ungeprüft mit jährlichen Kosten vermischt werden. Prozentwerte werden als Anteil des jeweiligen Grundwerts berechnet und sollten nicht einfach addiert werden, wenn ihre Bezugsgrößen unterschiedlich sind.` },
          { type: "ul", items: seed.essentials },
          { type: "tip", text: "Nutze dokumentierte Werte, wenn sie vorliegen. Eine Rechnung mit echten Angebots-, Vertrags- oder Abrechnungsdaten ist aussagekräftiger als ein pauschaler Internet-Richtwert." },
        ],
      },
      {
        h2: "Schritt für Schritt rechnen",
        blocks: [
          { type: "p", text: seed.method },
          { type: "ol", items: [
            "Trage zunächst nur Werte ein, die du sicher kennst, und kontrolliere Einheit sowie Zeitraum.",
            "Ergänze variable Annahmen einzeln. Ändere nicht mehrere unsichere Werte gleichzeitig, damit ihre Wirkung erkennbar bleibt.",
            "Lies Ergebnis, Teilbeträge und Rechenweg gemeinsam. Ein Endwert ohne Zusammensetzung lässt sich später kaum prüfen.",
            "Speichere eine sinnvolle Variante über die URL. Die Rechnerwerte stehen im Query-String und können ohne Konto geteilt oder erneut geöffnet werden.",
            "Vergleiche mindestens zwei Szenarien und dokumentiere, welche Annahme den größten Unterschied verursacht.",
          ] },
          { type: "p", text: `Der Rechner arbeitet mit den eingegebenen Werten und ersetzt keine fehlenden Informationen durch versteckte Annahmen. Das macht die Kalkulation transparent: Wenn sich ein Preis, Satz oder Zeitraum ändert, kannst du genau diesen Wert anpassen und die Auswirkung sofort sehen. Für verbindliche Entscheidungen solltest du das Ergebnis mit Originalunterlagen oder einem fachlichen Angebot abgleichen.` },
        ],
      },
      {
        h2: "Beispiel und Vergleichswerte",
        blocks: [
          { type: "p", text: seed.example },
          { type: "table", head: ["Prüfpunkt", "Vorsichtige Annahme", "Realistische Annahme"], rows: seed.table },
          { type: "p", text: "Die Tabelle ist keine Preis- oder Rechtsauskunft. Sie zeigt, wie du Annahmen nebeneinanderstellst. Ein vorsichtiges Szenario plant Reserven ein; ein realistisches Szenario orientiert sich an den aktuell vorliegenden Daten. Liegen beide Ergebnisse nah beieinander, ist die Planung robuster. Liegen sie weit auseinander, lohnt sich zuerst die Klärung des unsichersten Eingabewerts." },
        ],
      },
      {
        h2: "Häufige Fehler vermeiden",
        blocks: [
          { type: "ul", items: seed.pitfalls },
          { type: "p", text: `Ein weiterer häufiger Fehler ist falsche Genauigkeit. Ein Ergebnis mit Centbeträgen wirkt präzise, obwohl einzelne Eingaben nur grob geschätzt wurden. Runde deshalb für Entscheidungen sinnvoll und behalte eine Reserve. Prüfe außerdem, ob Steuern, Gebühren, Ausfallzeiten, Nebenarbeiten oder individuelle Vertragsregeln außerhalb des Rechnermodells liegen. Der Hinweisbereich am Rechner nennt die wichtigsten Grenzen.` },
          { type: "p", text: "Auch alte Berechnungen sollten nicht ungeprüft übernommen werden. Preise, Zinssätze, Arbeitszeiten und persönliche Rahmenbedingungen verändern sich. Öffne den gespeicherten Deep-Link, aktualisiere die variablen Eingaben und vergleiche das neue Ergebnis mit der früheren Variante. So wird aus einer einmaligen Überschlagsrechnung ein wiederverwendbares Planungswerkzeug." },
        ],
      },
      {
        h2: "Ergebnis prüfen und nächsten Schritt wählen",
        blocks: [
          { type: "p", text: `Betrachte das Ergebnis zu ${seed.topic} als Entscheidungsgrundlage, nicht als Garantie. Frage zuerst, ob die Größenordnung plausibel ist. Prüfe danach die größten Einzelpositionen und schließlich die Annahmen mit dem höchsten Risiko. Bei kleinen privaten Entscheidungen reicht häufig diese strukturierte Kontrolle. Bei Verträgen, Finanzierungen, steuerlichen Fragen oder größeren Aufträgen sollte zusätzlich fachlicher Rat eingeholt werden.` },
          { type: "ul", items: [
            "Passt das Ergebnis zu deinen Originalunterlagen und zum betrachteten Zeitraum?",
            "Sind alle Pflichtkosten enthalten und Doppelzählungen ausgeschlossen?",
            "Bleibt die Entscheidung auch im vorsichtigen Szenario tragbar?",
            "Kann eine zweite Person die Rechnung anhand des Deep-Links nachvollziehen?",
            "Welche konkrete Information musst du vor einer verbindlichen Entscheidung noch beschaffen?",
          ] },
          { type: "tip", text: "Der beste nächste Schritt ist meist nicht eine weitere Schätzung, sondern die gezielte Klärung der Eingabe, die dein Ergebnis am stärksten beeinflusst." },
        ],
      },
    ],
  };
}

const seeds: GuideSeed[] = [
  {
    slug: "immobilie-kaufen-finanzieren-plan",
    title: "Immobilie kaufen und finanzieren: der vollständige Plan",
    description: "Von Kaufbudget und Nebenkosten bis Kreditrate und Rendite: Immobilienkauf strukturiert planen und Zahlen belastbar vergleichen.",
    keywords: ["Immobilie kaufen planen", "Haus finanzieren", "Immobilienbudget", "Kaufnebenkosten"],
    toolSlug: "haus-leisten-rechner", excerpt: "Der zentrale Immobilien-Leitfaden für Budget, Finanzierung, Nebenkosten und laufende Belastung.", updated: "2026-09", kind: "pillar", cluster: "Immobilien",
    relatedGuideSlugs: ["mietrendite-berechnen", "kaufnebenkosten-immobilie"],
    topic: "Immobilienkauf und Finanzierung",
    intro: "Ein Immobilienkauf verbindet Kaufpreis, Eigenkapital, Nebenkosten, Kreditrate und langfristige Risiken. Wer nur den Angebotspreis betrachtet, unterschätzt den tatsächlichen Kapitalbedarf. Sinnvoll ist eine Reihenfolge: tragbare Monatsrate festlegen, daraus das Budget ableiten, Nebenkosten abziehen und erst danach konkrete Objekte vergleichen. Bei einer Kapitalanlage kommen Miete, Rücklagen, Leerstand und nicht umlagefähige Kosten hinzu.",
    method: "Beginne mit deinem dauerhaft freien Monatsbetrag und einer Liquiditätsreserve, die nach dem Kauf bestehen bleibt. Schätze dann die Kreditsumme aus Sollzins und anfänglicher Tilgung. Ziehe vom verfügbaren Gesamtkapital die Kaufnebenkosten ab. Für vermietete Objekte folgt eine zweite Rechnung mit Kaltmiete, Eigentümerkosten und Finanzierung. So trennst du die Frage, was finanzierbar ist, von der Frage, ob sich ein Objekt wirtschaftlich trägt.",
    essentials: ["Nachhaltig verfügbare Monatsrate statt kurzfristigem Maximalbetrag", "Eigenkapital abzüglich Notfallreserve", "Kaufpreis und bundeslandspezifische Nebenkosten", "Sollzins, Tilgung und Dauer der Zinsbindung", "Laufende Eigentümer- und Instandhaltungskosten", "Bei Vermietung: realistische Kaltmiete und Leerstandsreserve"],
    table: [["Monatsrate", "Mit Sicherheitspuffer", "Dauerhaft verfügbarer Betrag"], ["Nebenkosten", "Oberen Prozentsatz ansetzen", "Konkrete Steuern und Angebote"], ["Zins", "Leicht höher rechnen", "Aktuelles Finanzierungsangebot"]],
    pitfalls: ["Eigenkapital vollständig einsetzen und keine Liquiditätsreserve behalten", "Kaufnebenkosten aus dem Kreditbudget statt zusätzlich berücksichtigen", "Nur die heutige Rate, nicht die Restschuld nach der Zinsbindung betrachten", "Mietrendite ohne laufende Kosten und Leerstand bewerten"],
  },
  {
    slug: "mietrendite-berechnen", title: "Mietrendite berechnen: Brutto, Netto und Cashflow", description: "Brutto- und Nettomietrendite richtig berechnen, laufende Kosten einordnen und Immobilien vergleichbar machen.", keywords: ["Mietrendite berechnen", "Bruttomietrendite", "Nettomietrendite", "Immobilien Cashflow"], toolSlug: "mietrendite-rechner", excerpt: "Formeln, Kosten und Prüfschritte für eine realistische Renditeberechnung.", updated: "2026-09", kind: "supporting", cluster: "Immobilien", relatedGuideSlugs: ["immobilie-kaufen-finanzieren-plan", "kaufnebenkosten-immobilie"], topic: "Mietrendite",
    intro: "Die Bruttomietrendite teilt die Jahreskaltmiete durch den Kaufpreis. Sie eignet sich als schneller Filter, blendet aber Kaufnebenkosten und laufende Eigentümerkosten aus. Die Nettomietrendite setzt den Überschuss nach nicht umlagefähigen Kosten ins Verhältnis zum gesamten eingesetzten Kapital. Für die monatliche Liquidität ist zusätzlich der Cashflow nach Kreditrate entscheidend.",
    method: "Multipliziere die monatliche Kaltmiete mit zwölf und teile sie für die Bruttorendite durch den Kaufpreis. Für die Nettovariante ziehst du nicht umlagefähige Jahreskosten ab und teilst durch Kaufpreis plus Erwerbsnebenkosten. Finanzierung, Steuern und Wertentwicklung werden getrennt betrachtet, damit die Objektqualität nicht mit deiner individuellen Kreditstruktur vermischt wird.",
    essentials: ["Kaufpreis ohne Möbel oder gesonderte Inventaranteile", "Nachhaltig erzielbare monatliche Kaltmiete", "Grunderwerbsteuer, Notar, Grundbuch und Makler", "Nicht umlagefähiges Hausgeld und Verwaltung", "Instandhaltungsrücklage und realistische Reparaturen", "Reserve für Leerstand und Mietausfall"],
    table: [["Jahreskaltmiete", "Mit Leerstandsabschlag", "Aktuelle Vertragsmiete × 12"], ["Laufende Kosten", "Rücklage großzügig", "Abrechnung plus Planwerte"], ["Rendite", "Netto nach Kosten", "Brutto als schneller Filter"]],
    pitfalls: ["Warmmiete statt Kaltmiete verwenden", "Kaufnebenkosten in der Nettorendite vergessen", "Umlagefähige und nicht umlagefähige Kosten vermischen", "Eine hohe Rendite ohne Prüfung von Lage, Zustand und Mietausfall bewerten"],
    example: "Bei 250.000 Euro Kaufpreis und 1.000 Euro monatlicher Kaltmiete beträgt die Bruttorendite 4,8 Prozent. Kommen 25.000 Euro Nebenkosten und 2.000 Euro nicht umlagefähige Jahreskosten hinzu, sinkt die Nettorendite auf rund 3,64 Prozent. Genau dieser Abstand macht sichtbar, warum ein Objekt nie allein mit der Bruttokennzahl beurteilt werden sollte.",
  },
  {
    slug: "kaufnebenkosten-immobilie", title: "Kaufnebenkosten einer Immobilie vollständig einplanen", description: "Grunderwerbsteuer, Notar, Grundbuch und Maklerprovision berechnen und den echten Kapitalbedarf bestimmen.", keywords: ["Kaufnebenkosten Immobilie", "Grunderwerbsteuer", "Notarkosten Hauskauf", "Maklerprovision"], toolSlug: "kaufnebenkosten-rechner", excerpt: "So entsteht aus dem Kaufpreis der vollständige Kapitalbedarf.", updated: "2026-09", kind: "supporting", cluster: "Immobilien", relatedGuideSlugs: ["immobilie-kaufen-finanzieren-plan", "mietrendite-berechnen"], topic: "Kaufnebenkosten beim Immobilienkauf",
    intro: "Zum Kaufpreis kommen regelmäßig Grunderwerbsteuer sowie Notar- und Grundbuchkosten; bei vermittelten Objekten kann zusätzlich eine Maklerprovision anfallen. Diese Positionen müssen häufig überwiegend aus Eigenkapital bezahlt werden. Der korrekte Prozentsatz hängt unter anderem vom Bundesland, vom Vertrag und von der Provisionsvereinbarung ab.",
    method: "Berechne jede prozentuale Position einzeln auf Basis des Kaufpreises und addiere anschließend die festen Zusatzkosten. Trenne obligatorische Erwerbskosten von späteren Renovierungen, Umzug und Ausstattung. Dadurch bleibt erkennbar, welcher Betrag für den Eigentumsübergang nötig ist und welches Budget nach dem Kauf für Maßnahmen verfügbar bleibt.",
    essentials: ["Kaufpreis als Bezugsgröße", "Grunderwerbsteuersatz des Bundeslands", "Notar- und Grundbuchkosten als Planwert", "Makleranteil laut Exposé und Vertrag", "Kosten für Finanzierung, Gutachten oder Genehmigungen", "Separates Budget für Renovierung und Umzug"],
    table: [["Grunderwerbsteuer", "Höheren Landeswert prüfen", "Gültigen Satz verwenden"], ["Notar/Grundbuch", "Mit Reserve planen", "Konkrete Kostenrechnung"], ["Makler", "Vollen Käuferanteil", "Vereinbarte Provision"]],
    pitfalls: ["Mit einem pauschalen deutschen Durchschnittssatz rechnen", "Maklerprovision aus dem Exposé nicht auf Käuferanteil prüfen", "Renovierungskosten mit Erwerbsnebenkosten vermischen", "Die Eigenkapitalanforderung der Bank erst nach Reservierung klären"],
    example: "Bei 300.000 Euro Kaufpreis führen 5 Prozent Grunderwerbsteuer, 2 Prozent für Notar und Grundbuch sowie 3,57 Prozent Maklerprovision zu 31.710 Euro Kaufnebenkosten. Der gesamte Kapitalbedarf vor Renovierung beträgt damit 331.710 Euro. Schon ein Prozentpunkt Unterschied verändert den Bedarf um 3.000 Euro.",
  },
  {
    slug: "schichtarbeit-zuschlaege-ueberblick", title: "Schichtarbeit und Zuschläge: vollständiger Überblick", description: "Schichtlohn, Nacht-, Sonntags-, Feiertags- und Überstundenzuschläge nachvollziehbar erfassen und prüfen.", keywords: ["Schichtzulagen", "Schichtlohn berechnen", "Nachtzuschlag", "Feiertagszuschlag"], toolSlug: "schichtlohn-rechner", excerpt: "Der zentrale Leitfaden für Stunden, Zuschlagssätze und Monatslohn.", updated: "2026-09", kind: "pillar", cluster: "Schicht & Zuschläge", relatedGuideSlugs: ["nachtzuschlag-steuerfrei", "ueberstunden-auszahlen-freizeit"], topic: "Schichtlohn und Zuschläge",
    intro: "Schichtlohn besteht aus der Grundvergütung und zusätzlichen Zahlungen für bestimmte Zeiten. Nacht-, Sonntags- und Feiertagsstunden müssen getrennt erfasst werden, weil unterschiedliche Sätze und steuerliche Grenzen gelten können. Ein Zuschlag ist nicht automatisch gesetzlich geschuldet; Anspruch und Höhe ergeben sich häufig aus Tarifvertrag, Arbeitsvertrag oder Betriebsvereinbarung.",
    method: "Berechne zuerst den Grundlohn aus bezahlten Stunden und Stundenlohn. Multipliziere jede Zuschlagsart separat mit den tatsächlich geleisteten Stunden und dem vereinbarten Prozentsatz. Addiere die Beträge erst am Ende. Für die steuerliche Einordnung sind tatsächliche Arbeitszeiten, zusätzliche Zahlung und gesetzliche Grenzen gesondert zu prüfen.",
    essentials: ["Grundlohn je Stunde ohne Zuschläge", "Bezahlte Gesamtstunden im Abrechnungsmonat", "Tatsächliche Nacht-, Sonntags- und Feiertagsstunden", "Jeweils vereinbarter Zuschlagssatz", "Beginn und Ende jeder Schicht", "Tarifvertrag, Arbeitsvertrag und betriebliche Abrechnungsvorgaben"],
    table: [["Grundlohn", "Nur sichere Stunden", "Abrechnung/Vertrag"], ["Zuschlagsstunden", "Keine Überschneidung", "Zeitaufzeichnung"], ["Steuerfreiheit", "Nicht voraussetzen", "Voraussetzungen einzeln prüfen"]],
    pitfalls: ["Steuerliche Höchstgrenze mit einem arbeitsrechtlichen Anspruch verwechseln", "Pauschale Zulagen wie tatsächlich geleistete Zuschlagsstunden behandeln", "Überlappende Zeiten ungeprüft doppelt addieren", "Bruttoergebnis als Nettoauszahlung interpretieren"],
    example: "Bei 20 Euro Grundlohn, 160 bezahlten Stunden und 40 Nachtstunden mit 25 Prozent Zuschlag entstehen 3.200 Euro Grundvergütung und 200 Euro Nachtzuschlag. Weitere Sonntags- oder Feiertagsbeträge werden separat ermittelt. Steuern und Sozialversicherung hängen von den konkreten Voraussetzungen ab.",
  },
  {
    slug: "nachtzuschlag-steuerfrei", title: "Nachtzuschlag berechnen und steuerlich einordnen", description: "Nachtstunden, Zuschlagssatz und Höchstgrenzen nach § 3b EStG verständlich berechnen.", keywords: ["Nachtzuschlag berechnen", "Nachtarbeit steuerfrei", "§ 3b EStG", "40 Prozent Nachtzuschlag"], toolSlug: "nachtzuschlag-rechner", excerpt: "Arbeitszeit, Vertragssatz und steuerliche Vergleichsgrenze richtig trennen.", updated: "2026-09", kind: "supporting", cluster: "Schicht & Zuschläge", relatedGuideSlugs: ["schichtarbeit-zuschlaege-ueberblick", "ueberstunden-auszahlen-freizeit"], topic: "Nachtzuschlag",
    intro: "Für Nachtarbeit kann ein vertraglicher oder tariflicher Zuschlag gelten. § 3b EStG beschreibt unter Voraussetzungen steuerfreie Höchstgrenzen für zusätzlich zum Grundlohn gezahlte Zuschläge, schafft aber nicht automatisch einen Zahlungsanspruch. Für die Rechnung werden Grundlohn, Nachtstunden, tatsächlicher Zuschlagssatz und steuerliche Vergleichsgrenze getrennt benötigt.",
    method: "Multipliziere Grundlohn je Stunde mit den tatsächlichen Nachtstunden und dem vereinbarten Satz. Berechne danach die gesetzliche Vergleichsgrenze mit dem dafür maßgeblichen begrenzten Grundlohn. Der kleinere Betrag zeigt nur den rechnerischen Teil innerhalb der Grenze; ob er steuerfrei bleibt, hängt von allen gesetzlichen und abrechnungstechnischen Voraussetzungen ab.",
    essentials: ["Regulärer Grundlohn pro Stunde", "Exakte Lage der Arbeitsstunden in der Nacht", "Vertraglich oder tariflich vereinbarter Satz", "Zusätzliche Zahlung neben dem Grundlohn", "Dokumentierte tatsächliche Arbeitsleistung", "Getrennte Prüfung von Steuer und Sozialversicherung"],
    table: [["Nachtstunden", "Nur eindeutig belegte Zeiten", "Elektronische Zeiterfassung"], ["Zuschlagssatz", "Vertraglichen Satz nutzen", "Tarif-/Arbeitsvertrag"], ["Steuergrenze", "Nur Vergleichswert", "Lohnabrechnung prüfen"]],
    pitfalls: ["Alle Schichtstunden pauschal als Nachtstunden zählen", "40 Prozent ohne Prüfung des Zeitfensters ansetzen", "50-Euro- und 25-Euro-Grundlohngrenze verwechseln", "Aus dem Steuerrecht einen automatischen Zuschlagsanspruch ableiten"],
    example: "20 Euro Grundlohn mal acht Nachtstunden mal 25 Prozent ergeben 40 Euro Zuschlag. Liegt der vereinbarte Satz höher, kann ein Teil oberhalb der steuerlichen Vergleichsgrenze liegen. Der Rechner zeigt diese Differenz, trifft aber keine verbindliche Aussage zur individuellen Lohnabrechnung.",
  },
  {
    slug: "ueberstunden-auszahlen-freizeit", title: "Überstunden auszahlen oder durch Freizeit ausgleichen", description: "Wert von Überstunden, Zuschlag und möglichen Freizeitausgleich transparent vergleichen.", keywords: ["Überstunden auszahlen", "Freizeitausgleich", "Überstundenzuschlag", "Mehrarbeit berechnen"], toolSlug: "ueberstunden-rechner", excerpt: "Geldwert und mathematische Zeitentsprechung von Überstunden vergleichen.", updated: "2026-09", kind: "supporting", cluster: "Schicht & Zuschläge", relatedGuideSlugs: ["schichtarbeit-zuschlaege-ueberblick", "nachtzuschlag-steuerfrei"], topic: "Überstundenvergütung",
    intro: "Ob Überstunden bezahlt, durch Freizeit ausgeglichen oder bereits mit dem Gehalt abgegolten werden, richtet sich nach den wirksamen Regelungen des Arbeitsverhältnisses. Für den mathematischen Vergleich wird der Stundenlohn mit der Zahl der Überstunden multipliziert. Ein vereinbarter Zuschlag erhöht entweder den Geldbetrag oder die rechnerische Zeitentsprechung.",
    method: "Ermittle den Grundwert der Mehrarbeit aus Stundenlohn und Überstunden. Berechne den Zuschlag separat und addiere ihn für die Auszahlung. Für den Freizeitausgleich multiplizierst du die Stunden mit eins plus Zuschlagssatz. Das Ergebnis ist eine Rechenhilfe; die tatsächlich gewährte Freizeit muss mit den geltenden Regeln übereinstimmen.",
    essentials: ["Nachweisbar geleistete und angeordnete oder gebilligte Überstunden", "Passender Brutto-Stundenlohn", "Vereinbarter Überstundenzuschlag", "Regelung zu Auszahlung oder Freizeit", "Abrechnungs- und Ausschlussfristen", "Abgrenzung zu Nacht-, Sonn- und Feiertagsarbeit"],
    table: [["Stundenanzahl", "Nur bestätigte Mehrarbeit", "Zeitkonto"], ["Zuschlag", "Null Prozent ohne Anspruch", "Vertraglicher Satz"], ["Ausgleich", "Fristen berücksichtigen", "Betriebliche Vereinbarung"]],
    pitfalls: ["Einen Zuschlag annehmen, obwohl nur Grundvergütung vereinbart ist", "Pausen oder normale Sollzeit als Überstunden erfassen", "Bruttobetrag mit Nettoauszahlung gleichsetzen", "Ausschlussfristen für die Geltendmachung übersehen"],
    example: "Zehn Überstunden bei 20 Euro Stundenlohn haben einen Grundwert von 200 Euro. Bei 25 Prozent Zuschlag kommen 50 Euro hinzu; die Auszahlung beträgt rechnerisch 250 Euro. Als reine Zeitentsprechung wären es 12,5 Stunden. Welche Variante gilt, entscheidet nicht der Rechner, sondern die konkrete Vereinbarung.",
  },
  {
    slug: "renovierungskosten-planen", title: "Renovierungskosten planen: Budget, Angebote und Reserve", description: "Renovierungsbudget von der Flächenermittlung bis zum Angebotsvergleich strukturiert aufbauen.", keywords: ["Renovierungskosten planen", "Sanierung Budget", "Handwerkerkosten", "Kostenreserve"], toolSlug: "badrenovierung-rechner", excerpt: "Der zentrale Plan für Mengen, Einheitspreise, Nebenarbeiten und Sicherheitspuffer.", updated: "2026-09", kind: "pillar", cluster: "Handwerker & Renovierung", relatedGuideSlugs: ["dachsanierung-kosten-planen", "boden-verlegen-kosten"], topic: "Renovierungs- und Sanierungskosten",
    intro: "Renovierungsbudgets scheitern selten an einer einzigen großen Position. Häufig fehlen Nebenarbeiten, Entsorgung, Schutzmaßnahmen oder Anpassungen am Bestand. Eine gute Kalkulation trennt Mengen, Material, Arbeitsleistung und pauschale Zusatzkosten. Danach wird ein begründeter Sicherheitspuffer auf die Zwischensumme gerechnet.",
    method: "Miss die relevante Fläche oder Stückzahl und multipliziere sie mit einem passenden Einheitspreis. Ergänze feste Kosten für Vorbereitung, Ausbau, Entsorgung und Anschlüsse. Berechne den Puffer erst auf die vollständige Zwischensumme. Fordere Angebote mit identischem Leistungsumfang an, damit Preisunterschiede nicht nur aus ausgelassenen Positionen entstehen.",
    essentials: ["Exakte Flächen, Längen oder Stückzahlen", "Materialqualität und Einheitspreis", "Arbeits- oder Komplettpreis", "Rückbau, Schutz und Entsorgung", "Anschlüsse, Gerüst und Nebenarbeiten", "Reserve für verdeckte Schäden und Änderungen"],
    table: [["Menge", "Mit Messreserve", "Aufmaß vor Ort"], ["Einheitspreis", "Mittleres Qualitätsniveau", "Vergleichbares Angebot"], ["Puffer", "Je nach Bestandsrisiko höher", "Nach Voruntersuchung anpassen"]],
    pitfalls: ["Wohnfläche mit tatsächlich zu bearbeitender Fläche verwechseln", "Angebote mit unterschiedlichem Leistungsumfang vergleichen", "Eigenleistung ohne Werkzeug-, Material- und Zeitkosten ansetzen", "Den Sicherheitspuffer als frei verfügbares Zusatzbudget behandeln"],
    example: "Bei einer flächenabhängigen Leistung von 10.000 Euro und 4.000 Euro festen Nebenarbeiten beträgt die Zwischensumme 14.000 Euro. Ein Puffer von 12 Prozent ergänzt 1.680 Euro. Der Planwert liegt damit bei 15.680 Euro, bevor optionale Ausstattungswünsche hinzukommen.",
  },
  {
    slug: "dachsanierung-kosten-planen", title: "Dachsanierung: Kosten und Zusatzarbeiten richtig planen", description: "Dachfläche, Quadratmeterpreis, Gerüst, Entsorgung und Risikopuffer zu einem belastbaren Kostenrahmen verbinden.", keywords: ["Dachsanierung Kosten", "Dach neu decken", "Dachfläche berechnen", "Dachdecker Kosten"], toolSlug: "dachkosten-rechner", excerpt: "Kostenrahmen für Neueindeckung und Dachsanierung mit allen wichtigen Nebenpositionen.", updated: "2026-09", kind: "supporting", cluster: "Handwerker & Renovierung", relatedGuideSlugs: ["renovierungskosten-planen", "boden-verlegen-kosten"], topic: "Dachsanierungskosten",
    intro: "Die Dachfläche ist größer als die Gebäudegrundfläche und hängt von Neigung und Form ab. Der Quadratmeterpreis kann Eindeckung, Lattung und einzelne Arbeitsleistungen enthalten, aber Gerüst, Entsorgung, Dämmung, Anschlüsse oder Dachfenster sind oft separat ausgewiesen. Deshalb muss der Leistungsumfang jedes Einheitspreises dokumentiert werden.",
    method: "Ermittle die echte Dachfläche aus Plan, Aufmaß oder Fachangebot. Multipliziere sie mit einem vergleichbaren Einheitspreis und ergänze alle festen Positionen. Prüfe besonders Gerüst, Altmaterial, Dämmstandard, Spenglerarbeiten und Durchdringungen. Der Puffer sollte sich am Zustand des Bestands orientieren, nicht an einer beliebigen Wunschzahl.",
    essentials: ["Tatsächliche geneigte Dachfläche", "Dachform und Zahl der Anschlüsse", "Material und Aufbau der Eindeckung", "Gerüst und Baustelleneinrichtung", "Rückbau und Entsorgung", "Dämmung, Fenster, Rinnen und Sicherheitsreserve"],
    table: [["Dachfläche", "Aufmaß mit Reserve", "Plan/Fachaufmaß"], ["Quadratmeterpreis", "Nur klaren Umfang nutzen", "Vergleichsangebot"], ["Zusatzkosten", "Alle einzeln aufführen", "Leistungsverzeichnis"]],
    pitfalls: ["Gebäudegrundfläche als Dachfläche einsetzen", "Materialpreis mit vollständigem Handwerkerpreis verwechseln", "Gerüst und Entsorgung doppelt oder gar nicht rechnen", "Schäden am Dachstuhl ohne Reserve ausblenden"],
    example: "140 Quadratmeter zu 180 Euro ergeben 25.200 Euro Flächenkosten. Mit 3.500 Euro Zusatzkosten liegt die Basis bei 28.700 Euro. Zehn Prozent Sicherheitspuffer erhöhen den Kostenrahmen auf 31.570 Euro. Ein Angebot sollte zeigen, welche Leistungen im Quadratmeterpreis enthalten sind.",
  },
  {
    slug: "boden-verlegen-kosten", title: "Boden verlegen: Material, Verschnitt und Arbeitskosten", description: "Materialbedarf und Gesamtkosten für Laminat, Vinyl oder andere Bodenbeläge einschließlich Nebenarbeiten kalkulieren.", keywords: ["Boden verlegen Kosten", "Verschnitt berechnen", "Bodenleger Kosten", "Materialbedarf Boden"], toolSlug: "bodenverlegung-kosten-rechner", excerpt: "Fläche, Verschnitt, Material und Verlegung ohne vergessene Nebenarbeiten berechnen.", updated: "2026-09", kind: "supporting", cluster: "Handwerker & Renovierung", relatedGuideSlugs: ["renovierungskosten-planen", "dachsanierung-kosten-planen"], topic: "Bodenverlegungskosten",
    intro: "Für neuen Boden reicht die reine Raumfläche nicht aus. Zuschnitte und Verlegemuster erzeugen Verschnitt; außerdem können Rückbau, Untergrundausgleich, Trittschalldämmung, Sockelleisten und Türanpassungen anfallen. Material wird auf Fläche inklusive Verschnitt gerechnet, die Verlegeleistung häufig auf die tatsächliche Bodenfläche.",
    method: "Addiere die Flächen aller Räume und wähle einen Verschnitt passend zu Raumform und Muster. Multipliziere die erhöhte Materialmenge mit dem Materialpreis. Berechne die Verlegung separat auf Basis der Bodenfläche und ergänze pauschale Nebenarbeiten. Prüfe, ob Sockelleisten und Übergangsprofile pro Meter statt pro Quadratmeter kalkuliert werden.",
    essentials: ["Netto-Bodenfläche je Raum", "Verschnitt für Zuschnitt und Muster", "Materialpreis pro Quadratmeter", "Verlegepreis und enthaltene Leistungen", "Untergrundvorbereitung und Dämmung", "Sockelleisten, Profile, Türen und Entsorgung"],
    table: [["Verschnitt", "Bei vielen Ecken höher", "Nach Verlegeplan"], ["Material", "Charge mit Reserve", "Konkreter Produktpreis"], ["Nebenarbeiten", "Untergrund separat", "Angebot/Aufmaß"]],
    pitfalls: ["Verschnitt auf Arbeitskosten statt nur Material anwenden", "Untergrundprüfung erst nach Materialkauf durchführen", "Sockelleisten und Profile vergessen", "Material verschiedener Chargen ohne Reserve nachbestellen müssen"],
    example: "75 Quadratmeter Bodenfläche mit acht Prozent Verschnitt ergeben 81 Quadratmeter Materialbedarf. Bei 35 Euro Materialpreis entstehen 2.835 Euro Materialkosten. 25 Euro Verlegung pro Quadratmeter ergeben weitere 1.875 Euro; mit 600 Euro Nebenarbeiten liegt die Schätzung bei 5.310 Euro.",
  },
  {
    slug: "geld-rechner-alltag", title: "Geld im Alltag richtig berechnen: Prozent, Steuer und Lohn", description: "Prozentwerte, Mehrwertsteuer, Stundenlohn und Fahrtkosten mit klaren Bezugsgrößen richtig berechnen.", keywords: ["Geld berechnen", "Prozentrechnung Alltag", "Mehrwertsteuer", "Stundenlohn"], toolSlug: "prozentrechner", excerpt: "Der zentrale Rechenleitfaden für Preise, Gehalt und alltägliche Kosten.", updated: "2026-09", kind: "pillar", cluster: "Geld & Beruf", relatedGuideSlugs: ["mehrwertsteuer-netto-brutto", "stundenlohn-monatsgehalt"], topic: "Geld- und Alltagsrechnungen",
    intro: "Rabatte, Steuern, Stundenlöhne und Fahrtkosten sehen unterschiedlich aus, folgen aber demselben Grundprinzip: Zuerst wird die Bezugsgröße festgelegt, dann der Anteil oder die Umrechnung angewendet. Fehler entstehen, wenn Netto und Brutto, Monat und Woche oder Gesamtbetrag und Anteil vermischt werden.",
    method: "Schreibe vor der Rechnung auf, welche Größe hundert Prozent darstellt. Bei Steuern ist das in Vorwärtsrichtung der Nettobetrag; bei einem Rabatt der ursprüngliche Preis. Bei Lohnrechnungen müssen Arbeitszeit und Gehalt denselben Zeitraum haben. Bei Fahrtkosten werden Strecke, Verbrauch pro hundert Kilometer und Literpreis miteinander verbunden.",
    essentials: ["Eindeutiger Grund- oder Ausgangswert", "Passender Prozent- oder Steuersatz", "Einheit und Zeitraum jeder Zahl", "Klare Richtung der Rechnung", "Rundung erst am Ende", "Prüfung durch eine überschlägige Gegenrechnung"],
    table: [["Prozent", "Grundwert klar benennen", "Anteil korrekt anwenden"], ["Lohn", "Zeiträume angleichen", "Monat/Woche/Stunde"], ["Kosten", "Einheiten ausschreiben", "Euro, Liter, Kilometer"]],
    pitfalls: ["Prozentpunkte mit Prozentänderung verwechseln", "Mehrwertsteuer aus Brutto durch einfache Multiplikation abziehen", "Monatsgehalt durch nur vier Wochen teilen", "Zwischenergebnisse zu früh runden"],
    example: "Ein Rabatt von 20 Prozent auf 250 Euro entspricht 50 Euro; der neue Preis liegt bei 200 Euro. Dieselbe Prozentzahl kann bei einer anderen Bezugsgröße einen völlig anderen Betrag ergeben. Deshalb zeigt der Rechner neben dem Ergebnis den verwendeten Rechenweg.",
  },
  {
    slug: "mehrwertsteuer-netto-brutto", title: "Mehrwertsteuer: Netto, Steuerbetrag und Brutto berechnen", description: "Mehrwertsteuer mit 19 oder 7 Prozent vorwärts und rückwärts korrekt zwischen Netto und Brutto berechnen.", keywords: ["Mehrwertsteuer berechnen", "Netto Brutto", "19 Prozent MwSt", "7 Prozent MwSt"], toolSlug: "mehrwertsteuerrechner", excerpt: "Warum Hinzurechnen und Herausrechnen unterschiedliche Formeln benötigen.", updated: "2026-09", kind: "supporting", cluster: "Geld & Beruf", relatedGuideSlugs: ["geld-rechner-alltag", "stundenlohn-monatsgehalt"], topic: "Mehrwertsteuer",
    intro: "Beim Netto-zu-Brutto-Rechnen wird der Steueranteil auf den Nettobetrag aufgeschlagen. Beim Rückwärtsrechnen ist die Steuer bereits im Bruttopreis enthalten. Deshalb darf sie nicht einfach mit 19 oder 7 Prozent vom Brutto abgezogen werden. Stattdessen wird der Bruttopreis durch 1,19 beziehungsweise 1,07 geteilt.",
    method: "Für Brutto aus Netto multiplizierst du den Nettobetrag mit eins plus Steuersatz. Für Netto aus Brutto teilst du durch denselben Faktor. Der Steuerbetrag ist jeweils die Differenz zwischen Brutto und Netto. Wähle den Steuersatz anhand der konkreten Ware oder Leistung; der Rechner entscheidet nicht über die steuerliche Einordnung.",
    essentials: ["Ausgangsbetrag eindeutig als netto oder brutto", "Anwendbarer Steuersatz", "Richtige Rechenrichtung", "Steuerbetrag als Differenz", "Einheitliche Rundungsregel", "Belege für geschäftliche Buchungen"],
    table: [["100 Euro netto", "Faktor 1,19", "119 Euro brutto"], ["119 Euro brutto", "Division durch 1,19", "100 Euro netto"], ["Steuerbetrag", "Brutto minus Netto", "19 Euro"]],
    pitfalls: ["19 Prozent direkt vom Bruttopreis abziehen", "Steuersatz ohne Prüfung auswählen", "Netto- und Bruttowerte in einer Liste mischen", "Centbeträge in jedem Zwischenschritt unterschiedlich runden"],
    example: "100 Euro netto ergeben bei 19 Prozent 119 Euro brutto. Ausgangspunkt 119 Euro brutto: 119 geteilt durch 1,19 ergibt 100 Euro netto. 19 Prozent von 119 wären dagegen 22,61 Euro und somit die falsche Rückrechnung.",
  },
  {
    slug: "stundenlohn-monatsgehalt", title: "Stundenlohn aus Monatsgehalt korrekt berechnen", description: "Monatsgehalt und Wochenarbeitszeit in einen vergleichbaren Stundenlohn umrechnen.", keywords: ["Stundenlohn berechnen", "Monatsgehalt Stundenlohn", "Wochenstunden", "Gehalt pro Stunde"], toolSlug: "stundenlohnrechner", excerpt: "Mit durchschnittlichen Monatswochen den echten Stundenwert bestimmen.", updated: "2026-09", kind: "supporting", cluster: "Geld & Beruf", relatedGuideSlugs: ["geld-rechner-alltag", "mehrwertsteuer-netto-brutto"], topic: "Stundenlohn aus Monatsgehalt",
    intro: "Ein Monat hat nicht exakt vier Wochen. Für eine durchschnittliche Umrechnung werden 52,18 Wochen pro Jahr durch zwölf Monate geteilt, also rund 4,348 Wochen pro Monat. Das Monatsgehalt wird durch Wochenstunden mal 4,348 geteilt. Das Ergebnis bleibt brutto oder netto entsprechend der eingegebenen Gehaltsart.",
    method: "Multipliziere die vertraglichen Wochenstunden mit 4,348 und teile das Monatsgehalt durch diese durchschnittlichen Monatsstunden. Für den Vergleich von Stellen solltest du Sonderzahlungen, unbezahlte Mehrarbeit, Urlaub und Arbeitsweg getrennt betrachten. Der einfache Stundenlohn bewertet zunächst nur regelmäßiges Gehalt und Vertragszeit.",
    essentials: ["Regelmäßiges Monatsgehalt", "Brutto oder netto eindeutig festlegen", "Vertragliche Wochenarbeitszeit", "Sonderzahlungen separat erfassen", "Unbezahlte Mehrarbeit berücksichtigen", "Vergleichbaren Zeitraum für mehrere Angebote"],
    table: [["Wochenfaktor", "4,348 verwenden", "Jahresdurchschnitt"], ["Arbeitszeit", "Tatsächliche Mehrarbeit prüfen", "Vertragsstunden"], ["Gehalt", "Ohne Einmalzahlungen", "Regelmäßiger Monatswert"]],
    pitfalls: ["Monatsstunden nur mit vier Wochen berechnen", "Bruttogehalt einer Stelle mit Nettogehalt einer anderen vergleichen", "Bonus und Weihnachtsgeld ungeprüft monatlich verteilen", "Unbezahlte Überstunden und Pendelzeit ausblenden"],
    example: "3.500 Euro Monatsgehalt bei 40 Wochenstunden entsprechen rund 173,9 Monatsstunden. Der rechnerische Stundenlohn liegt bei etwa 20,13 Euro. Bei 35 Wochenstunden steigt der Wert bei gleichem Monatsgehalt deutlich, obwohl der Monatsbetrag unverändert bleibt.",
  },
  {
    slug: "texte-schreiben-seo-pruefen", title: "Texte schreiben und für SEO prüfen: der Leitfaden", description: "Wortzahl, Zeichenlänge, Struktur und Suchintention für verständliche Webtexte und Aufsätze verbessern.", keywords: ["SEO Text schreiben", "Zeichen zählen", "Wörter zählen", "Text strukturieren"], toolSlug: "zeichen-zaehlen", excerpt: "Der zentrale Leitfaden für lesbare, strukturierte und zweckgerechte Texte.", updated: "2026-09", kind: "pillar", cluster: "Schule, Text & SEO", relatedGuideSlugs: ["dreisatz-einfach-erklaert", "wortzahl-lesezeit"], topic: "Texte und SEO-Inhalte",
    intro: "Gute Texte erfüllen zuerst die Aufgabe der Leser. Wortzahl und Zeichenlänge sind Kontrollwerte, aber keine Qualitätsgarantie. Für Suchmaschinen und Menschen zählen eine klare Antwort, nachvollziehbare Gliederung, präzise Begriffe und interne Verbindungen zu weiterführenden Seiten. Titel und Beschreibungen brauchen zusätzlich kompakte Formulierungen.",
    method: "Definiere die wichtigste Frage und beantworte sie im ersten Abschnitt. Gliedere Unterfragen mit beschreibenden Überschriften. Prüfe anschließend Wortzahl, Satzlänge und Wiederholungen. Für Metadaten hilft die Zeichenkontrolle, sichtbare Abschneidungen zu vermeiden. Verlinke passende Rechner und Ratgeber dort, wo sie den nächsten Arbeitsschritt ermöglichen.",
    essentials: ["Klare Such- oder Aufgabenintention", "Eine Hauptaussage pro Abschnitt", "Beschreibende H2- und H3-Überschriften", "Beispiele, Listen oder Tabellen", "Passende interne Links", "Zeichen- und Wortzahl als Abschlusskontrolle"],
    table: [["Seitentitel", "Kernaussage zuerst", "Kurz und eindeutig"], ["Einleitung", "Direkte Antwort", "Ohne lange Vorrede"], ["Haupttext", "Unterfragen abdecken", "Beispiele und Belege"]],
    pitfalls: ["Text künstlich auf eine Wortzahl verlängern", "Schlüsselwörter unnatürlich wiederholen", "Mehrere Suchintentionen auf einer Seite vermischen", "Überschriften verwenden, die den folgenden Inhalt nicht beschreiben"],
    example: "Ein Ratgeber zur Mietrendite sollte die Formel früh nennen, danach Brutto und Netto unterscheiden und ein Zahlenbeispiel zeigen. Ein Link zum Mietrendite-Rechner ermöglicht die direkte Anwendung. Zusätzliche Absätze sind nur sinnvoll, wenn sie eine echte Folgefrage beantworten.",
  },
  {
    slug: "dreisatz-einfach-erklaert", title: "Dreisatz einfach erklärt: Formel und Rechenweg", description: "Proportionale Dreisatz-Aufgaben sicher erkennen, Schritt für Schritt lösen und prüfen.", keywords: ["Dreisatz erklärt", "Dreisatz Formel", "proportionale Zuordnung", "Dreisatz Rechner"], toolSlug: "dreisatzrechner", excerpt: "Von drei bekannten Werten zum vierten Wert – mit verständlicher Prüfung.", updated: "2026-09", kind: "supporting", cluster: "Schule, Text & SEO", relatedGuideSlugs: ["texte-schreiben-seo-pruefen", "wortzahl-lesezeit"], topic: "Dreisatz",
    intro: "Der Dreisatz löst proportionale Zuordnungen: Wird die eine Größe mit einem Faktor verändert, verändert sich die andere im selben Verhältnis. Aus drei bekannten Werten wird ein vierter berechnet. Vor der Formel muss geprüft werden, ob die Zuordnung wirklich proportional ist; bei antiproportionalen Aufgaben gilt ein anderer Zusammenhang.",
    method: "Ordne zuerst die zusammengehörigen Werte in zwei Zeilen oder Spalten. Rechne auf eine Einheit herunter und danach auf die gesuchte Menge hoch. In Kurzform wird der zweite Wert mit dem dritten multipliziert und durch den ersten geteilt. Prüfe das Ergebnis mit der Richtung: Mehr Menge muss bei proportionaler Zuordnung auch mehr Ergebnis bedeuten.",
    essentials: ["Zwei eindeutig zugeordnete Ausgangswerte", "Dritter bekannter Wert", "Gesuchte Einheit", "Prüfung auf Proportionalität", "Gleiche Einheiten innerhalb einer Größe", "Plausibilitätskontrolle nach der Rechnung"],
    table: [["3 Kilogramm", "12 Euro", "Bekanntes Paar"], ["1 Kilogramm", "4 Euro", "Auf eine Einheit"], ["5 Kilogramm", "20 Euro", "Auf Zielmenge"]],
    pitfalls: ["Werte in der Formel vertauschen", "Antiproportionale Aufgabe proportional rechnen", "Kilogramm, Gramm oder Stunden ungeprüft mischen", "Ein rechnerisch korrektes, aber unplausibles Ergebnis nicht hinterfragen"],
    example: "Drei Kilogramm kosten zwölf Euro. Ein Kilogramm kostet zwölf geteilt durch drei, also vier Euro. Fünf Kilogramm kosten fünf mal vier, also zwanzig Euro. Die Kurzform lautet zwölf mal fünf geteilt durch drei.",
  },
  {
    slug: "wortzahl-lesezeit", title: "Wortzahl, Satzstruktur und Lesezeit sinnvoll nutzen", description: "Wörter, Sätze, Absätze und Lesezeit messen und daraus konkrete Textverbesserungen ableiten.", keywords: ["Wörter zählen", "Lesezeit berechnen", "Textlänge", "Absätze prüfen"], toolSlug: "woerter-zaehlen", excerpt: "Textumfang messen, ohne Qualität mit bloßer Länge zu verwechseln.", updated: "2026-09", kind: "supporting", cluster: "Schule, Text & SEO", relatedGuideSlugs: ["texte-schreiben-seo-pruefen", "dreisatz-einfach-erklaert"], topic: "Wortzahl und Lesezeit",
    intro: "Wortzahl ist nützlich für Aufgabenlimits, Redaktionsplanung und grobe Vergleiche. Die geschätzte Lesezeit basiert meist auf einer durchschnittlichen Lesegeschwindigkeit und kann je nach Schwierigkeit deutlich abweichen. Satz- und Absatzzahl zeigen zusätzlich, ob ein Text ausreichend gegliedert ist.",
    method: "Füge den vollständigen Text ein und prüfe zuerst die Wortzahl gegen die formale Vorgabe. Betrachte danach Sätze und Absätze: Sehr lange Blöcke erschweren das Scannen, zu viele Ein-Satz-Absätze unterbrechen den Lesefluss. Die Lesezeit hilft bei Einleitungen, Inhaltsübersichten und der Planung längerer Beiträge.",
    essentials: ["Vollständiger Text ohne Navigationsreste", "Geforderte Mindest- oder Höchstlänge", "Klare Absätze pro Gedankengang", "Angemessene Satzlänge", "Lesezeit nur als Schätzung", "Inhaltliche Prüfung nach der Messung"],
    table: [["Wortzahl", "Formale Grenze prüfen", "Nicht künstlich auffüllen"], ["Absätze", "Ein Gedanke je Absatz", "Lesefluss kontrollieren"], ["Lesezeit", "Nur Orientierung", "Komplexität berücksichtigen"]],
    pitfalls: ["Wortzahl als alleinige Qualitätskennzahl behandeln", "Tabellen, Überschriften und Bildtexte unklar einbeziehen", "Durchschnittliche Lesezeit als exakte Dauer angeben", "Text kürzen, ohne Wiederholungen von notwendigen Erklärungen zu unterscheiden"],
    example: "Ein Text mit 1.000 Wörtern benötigt bei 200 Wörtern pro Minute rechnerisch etwa fünf Minuten. Ein technischer Text kann länger dauern, eine leichte Liste deutlich kürzer. Entscheidend ist, ob die Gliederung Leser schnell zu den benötigten Informationen führt.",
  },
];

export const allGuides = () => seeds.map(buildGuide);
export const getGuide = (slug: string) => allGuides().find((guide) => guide.slug === slug);
export const getGuidesByTool = (toolSlug: string) => allGuides().filter((guide) => guide.toolSlug === toolSlug);
export const getGuideByTool = (toolSlug: string) => getGuidesByTool(toolSlug)[0];
export const getRelatedGuides = (guide: Guide) => guide.relatedGuideSlugs.map(getGuide).filter((item): item is Guide => Boolean(item));
