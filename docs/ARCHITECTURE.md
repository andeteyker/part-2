# Architektur – SofortTools

Diese Datei erklärt den technischen Aufbau der Plattform und wo neue Funktionen ergänzt werden.

## Ziel

SofortTools soll viele kleine spezialisierte Werkzeuge auf einer gemeinsamen technischen Plattform veröffentlichen können, ohne für jedes Tool Navigation, Layout, SEO, FAQ und Seitenstruktur neu zu bauen.

Der zentrale Ablauf ist:

```text
Tool-Definition
    ↓
Registry
    ↓
/tools/[slug]
    ↓
passender ToolRunner
    ↓
fertige Seite + SEO + FAQ + verwandte Tools
```

## Registry-Struktur

Die aktuelle Registry ist schrittweise gewachsen und besteht aus drei Ebenen.

### `app/data/tools.ts`

Enthält die ursprünglichen **20 Basis-Tools** und sechs Basiskategorien.

Eine Tool-Definition enthält typischerweise:

```ts
{
  slug,
  title,
  eyebrow,
  description,
  short,
  category,
  icon,
  keywords,
  faq
}
```

Diese Metadaten werden mehrfach wiederverwendet:

- Startseite
- Suche
- Kategorien
- Tool-Seiten
- SEO-Metadaten
- FAQ-Schema
- interne Verlinkung
- Sitemap

### `app/data/tool-registry.ts`

Erweitert die Basis um:

- 5 Immobilien-Tools
- 5 Schicht-/Zuschlags-Tools

Damit enthält diese Zwischenebene 30 Tools.

### `app/data/tool-registry-all.ts`

Erweitert die Zwischenebene um:

- 5 Handwerker-/Renovierungs-Tools

Dies ist aktuell die **vollständige Registry** mit insgesamt **35 Tools und 9 Kategorien**.

Für Seiten, Suche, Kategorien und Sitemap sollte die vollständige Registry verwendet werden.

## Startseite

### `app/page.tsx`

Serverseitige Einstiegsseite.

Aufgaben:

- Header und Footer einbinden
- `HomeClient` rendern
- Website-Schema erzeugen
- registrierte Tools im strukturierten Datenmodell referenzieren

### `app/components/HomeClient.tsx`

Interaktive Client-Komponente der Startseite.

Aufgaben:

- Tool-Suche
- Kategorie-Filter
- beliebte Werkzeuge
- gruppierte Tool-Karten
- dynamische Tool-Anzahl

Die Suche arbeitet direkt auf den Metadaten der Registry.

## Dynamische Tool-Seite

### `app/tools/[slug]/page.tsx`

Dies ist die zentrale Seitenvorlage für alle 35 Werkzeuge.

Beispiel:

```text
/tools/dachkosten-rechner
```

Ablauf:

1. `getTool(slug)` sucht die Definition in `tool-registry-all.ts`.
2. Die Seite prüft, zu welchem Tool-Cluster der Slug gehört.
3. Der passende Runner wird ausgewählt.
4. Metadaten, FAQ, Schema und verwandte Tools werden automatisch erzeugt.

Automatisch erzeugte Bestandteile:

- Title
- Description
- Keywords
- Canonical URL
- Open Graph
- Twitter-Metadaten
- WebApplication-Schema
- FAQ-Schema
- Breadcrumb-Schema
- Breadcrumb-Navigation
- Tool-Hero
- Rechneroberfläche
- Anleitung
- FAQ
- verwandte Tools derselben Kategorie

## Runner-Struktur

Die eigentliche Rechnerlogik ist nach Tool-Cluster getrennt.

### `app/components/ToolRunner.tsx`

Enthält die **20 allgemeinen Basis-Tools**.

Beispiele:

- Prozentrechner
- Dreisatz
- Wort-/Zeichenzählung
- Scrabble-/Wordle-Hilfe
- Bildkonvertierung
- QR-Code
- IP-Abfrage
- Browser-Latenz
- Alter
- Arbeitszeit
- Mehrwertsteuer
- Stundenlohn
- Spritkosten
- Kalenderwoche
- Zufallsgenerator
- Passwortgenerator

### `app/components/PropertyToolRunner.tsx`

Enthält die 5 Immobilien-Rechner:

- Mietrendite
- Kaufnebenkosten
- Immobilien-Cashflow
- Hausbudget
- Kreditrate / Restschuld

### `app/components/ShiftToolRunner.tsx`

Enthält die 5 Schicht-/Zuschlags-Rechner:

- Schichtlohn
- Nachtzuschlag
- Sonntagszuschlag
- Feiertagszuschlag
- Überstunden

### `app/components/HandwerkerToolRunner.tsx`

Enthält die 5 Handwerker-/Renovierungs-Rechner:

- Dachkosten
- Badrenovierung
- Fensterkosten
- Malerkosten
- Bodenverlegung

## Kategorie-Seiten

### `app/nischen/[slug]/page.tsx`

Eine dynamische Vorlage erzeugt alle 9 Nischenseiten.

Beispiele:

```text
/nischen/immobilien
/nischen/schicht-zuschlaege
/nischen/handwerker-renovierung
```

Die Seite lädt Kategorie-Metadaten und filtert die vollständige Tool-Liste nach dem jeweiligen Bereich.

## Globale UI

### `app/components/SiteHeader.tsx`

Gemeinsamer Header aller öffentlichen Seiten.

### `app/components/SiteFooter.tsx`

Gemeinsamer Footer inklusive rechtlicher Navigation.

### `app/globals.css`

Zentrales Styling der Plattform.

Da viele Seiten dieselben Klassen verwenden, können Änderungen hier sehr viele Seiten gleichzeitig beeinflussen.

## SEO

### `app/layout.tsx`

Definiert globale Metadaten:

- Titel-Template
- Description
- Keywords
- Robots-Einstellungen
- Open Graph
- Twitter Card
- Favicon

Der aktuelle Stand beschreibt 35 spezialisierte Tools.

### `app/sitemap.ts`

Erzeugt automatisch Sitemap-Einträge für:

- Startseite
- Kategorien
- alle registrierten Tools
- Datenschutz
- Impressum

### `app/robots.ts`

Erzeugt die Crawling-Regeln unter `/robots.txt`.

## Rechtliche Seiten

### `app/datenschutz/page.tsx`

Dokumentiert den aktuellen Stand der Datenverarbeitung.

Bei späterer Einbindung von Werbung, Affiliate-Tracking, Analytics, Newsletter- oder Lead-Diensten muss die Seite erneut geprüft werden.

### `app/impressum/page.tsx`

Ist aktuell noch nicht produktionsbereit, weil vollständige Betreiber- und Kontaktangaben fehlen.

## Datenbank und Hosting

Das Repository enthält bereits ein optionales Datenbankgerüst:

```text
db/
drizzle/
drizzle.config.ts
```

Für die aktuellen kostenlosen Rechner ist keine zentrale Datenbank nötig.

Interessant wird sie später z. B. für:

- Nutzerkonten
- gespeicherte Berechnungen
- Favoriten
- Leads
- Anbieterprofile
- eigene Conversion-Daten
- Premium-Funktionen

Das Projekt enthält außerdem Vinext-/Vite-/Cloudflare-spezifische Build- und Hosting-Konfiguration.

## Neues Tool hinzufügen

### 1. Tool registrieren

Die Metadaten in der passenden Registry ergänzen.

Beispiel:

```ts
{
  slug: "beispiel-rechner",
  title: "Beispiel-Rechner",
  eyebrow: "Kurze Einordnung",
  description: "Klare Beschreibung des konkreten Nutzens.",
  short: "Kurzer Kartentext.",
  category: "Handwerker & Renovierung",
  icon: "€",
  keywords: ["Beispiel Rechner"],
  faq: [
    {
      question: "Wie funktioniert der Rechner?",
      answer: "Kurze und sachliche Erklärung."
    }
  ]
}
```

### 2. Berechnungslogik erstellen

Im thematisch passenden Runner eine React-Komponente ergänzen.

### 3. Slug mit Runner verbinden

Der Runner muss den neuen Slug seiner Komponente zuordnen.

Falls ein komplett neuer Tool-Cluster entsteht, sollte dafür ein eigener Runner angelegt und in `app/tools/[slug]/page.tsx` ergänzt werden.

### 4. Automatische Bereiche prüfen

Nach korrekter Registrierung sollten automatisch funktionieren:

- Tool-URL
- Startseitenkarte
- Suche
- Kategorie-Seite
- SEO-Metadaten
- FAQ
- Sitemap
- verwandte Tools

### 5. Testen

Mindestens:

```bash
npm run lint
npm run build
```

Bei größeren Änderungen zusätzlich:

```bash
npm test
```

## Empfohlene nächste Strukturverbesserungen

Die aktuelle Architektur funktioniert, ist aber sichtbar organisch gewachsen.

Sinnvolle nächste Schritte:

1. `tools.ts`, `tool-registry.ts` und `tool-registry-all.ts` langfristig zu einer klaren Registry-Struktur zusammenführen.
2. Gemeinsam genutzte Form-Felder und Ergebnis-Karten in eigene UI-Komponenten auslagern.
3. Berechnungsformeln aus den React-Komponenten in reine TypeScript-Funktionen verschieben.
4. Diese Formeln separat mit Unit-Tests absichern.
5. Für neue große Themencluster weiterhin eigene Runner verwenden.
6. Tool-spezifische Anleitungstexte stärker individualisieren.
7. Monetarisierungskomponenten technisch strikt von den Rechnern trennen.
8. Später Analytics-/Conversion-Daten verwenden, um erfolgreiche Cluster gezielt auszubauen.

## Qualitätsregel

Ein neues Tool sollte nicht nur eine neue Keyword-Seite sein. Es sollte mindestens:

- eine konkrete Frage lösen,
- eine nachvollziehbare Berechnung oder Verarbeitung durchführen,
- ein direkt nutzbares Ergebnis liefern,
- verständliche Eingaben besitzen,
- eigene sinnvolle Erklärungen und FAQ enthalten.

So bleibt SofortTools technisch und inhaltlich skalierbar.
