# Architektur – SofortTools

Diese Datei erklärt, wie die Website technisch aufgebaut ist und wo neue Funktionen ergänzt werden.

## Ziel der Architektur

SofortTools soll viele kleine spezialisierte Werkzeuge auf einer gemeinsamen Plattform veröffentlichen können, ohne Navigation, Layout, SEO und Seitengerüst für jedes Tool neu zu bauen.

Der zentrale Ablauf ist:

```text
Tool-Definition
    ↓
Tool-Registry
    ↓
Dynamische Route /tools/[slug]
    ↓
Passender ToolRunner
    ↓
Fertige Tool-Seite + SEO + FAQ + verwandte Tools
```

## 1. Tool-Daten

### `app/data/tools.ts`

Enthält die ursprünglichen 20 Tools und sechs Basiskategorien.

Eine Tool-Definition enthält unter anderem:

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

Diese Daten werden nicht nur für die einzelne Tool-Seite benutzt, sondern auch für:

- Startseite
- Suche
- Kategorien
- interne Verlinkung
- SEO-Metadaten
- FAQ-Schema
- Sitemap

### `app/data/tool-registry.ts`

Erweitert die Basisdaten um die Immobilien-Kategorie und die fünf Immobilien-Rechner.

Die restliche Anwendung sollte für die vollständige Tool-Liste bevorzugt diese Registry verwenden.

Aktuell ist die Struktur bewusst noch zweistufig:

```text
tools.ts
  +
tool-registry.ts
  =
komplette Tool-Liste
```

Langfristig kann alles in eine einzige Registry überführt werden, sobald die Erweiterungslogik stabil ist.

## 2. Startseite

### `app/page.tsx`

Serverseitige Einstiegsseite.

Aufgaben:

- bindet Header und Footer ein
- rendert `HomeClient`
- erzeugt das WebSite-Schema
- listet darin alle registrierten Tool-Seiten

### `app/components/HomeClient.tsx`

Interaktive Client-Komponente der Startseite.

Aufgaben:

- Suche nach Tools
- Filter nach Kategorie
- Anzeige der Tool-Gruppen
- beliebte Werkzeuge
- dynamische Anzahl verfügbarer Tools

Die Suche arbeitet aktuell direkt auf den Tool-Metadaten im Browser.

## 3. Dynamische Tool-Seite

### `app/tools/[slug]/page.tsx`

Dies ist die zentrale Seitenvorlage für alle 25 Tools.

Für einen Slug wie:

```text
/tools/mietrendite-rechner
```

wird über `getTool(slug)` die passende Definition geladen.

Die Seite erzeugt dann automatisch:

- `<title>` und Description
- Keywords
- Canonical URL
- Open Graph / Twitter-Daten
- WebApplication-Schema
- FAQ-Schema
- Breadcrumb-Schema
- Breadcrumb-Navigation
- Tool-Hero
- Rechner-/Tool-Komponente
- Anleitung
- FAQ
- verwandte Tools derselben Kategorie

Dadurch muss nicht für jedes neue Werkzeug eine neue vollständige Seite programmiert werden.

## 4. Tool-Runner

### `app/components/ToolRunner.tsx`

Enthält die Logik der allgemeinen Werkzeuge.

Beispiele:

- Prozentrechnung
- Dreisatz
- Wort-/Zeichenzählung
- Scrabble- und Wordle-Filter
- Bildkonvertierung
- QR-Code
- IP-Abfrage
- Browser-Latenz
- Altersberechnung
- Arbeitszeit
- Mehrwertsteuer
- Stundenlohn
- Spritkosten
- Kalenderwoche
- Zufallsgenerator
- Passwortgenerator

Der Export `ToolRunner({ slug })` ordnet jedem bekannten Slug die passende React-Komponente zu.

### `app/components/PropertyToolRunner.tsx`

Separater Runner für die derzeitigen Immobilien-Rechner.

Enthält:

- Mietrendite-Rechner
- Kaufnebenkosten-Rechner
- Immobilien-Cashflow-Rechner
- Hausbudget-Rechner
- Kreditraten-/Restschuld-Rechner

Die Trennung hält den bereits großen allgemeinen Runner übersichtlicher.

## 5. Kategorie-Seiten

### `app/nischen/[slug]/page.tsx`

Eine dynamische Vorlage erzeugt die sieben Kategorie-Seiten.

Sie verwendet die Kategorie-Metadaten und filtert die Registry nach dem jeweiligen Bereich.

Beispiel:

```text
/nischen/immobilien
```

zeigt ausschließlich Tools aus der Kategorie `Immobilien`.

## 6. Globale UI

### `app/components/SiteHeader.tsx`

Gemeinsamer Header aller öffentlichen Seiten.

### `app/components/SiteFooter.tsx`

Gemeinsamer Footer mit Navigation zu rechtlichen Seiten.

### `app/globals.css`

Zentrales Styling der Website.

Da viele Seiten dieselben Klassen verwenden, sollten Änderungen hier vorsichtig getestet werden.

## 7. SEO

### `app/layout.tsx`

Definiert globale Metadaten wie:

- Seitentitel-Template
- globale Description
- Keywords
- Robots-Einstellungen
- Open Graph
- Twitter Card
- Favicon

### `app/sitemap.ts`

Erzeugt automatisch Einträge für:

- Startseite
- Kategorie-Seiten
- alle registrierten Tools
- Datenschutz
- Impressum

### `app/robots.ts`

Erzeugt `robots.txt`.

## 8. Rechtliche Seiten

### `app/datenschutz/page.tsx`

Dokumentiert den aktuellen technischen Stand der Datenverarbeitung.

Wichtig: Bei späterer Einbindung von Werbung, Affiliate-Tracking, Analytics, Newsletter- oder Lead-Diensten muss diese Seite erneut geprüft werden.

### `app/impressum/page.tsx`

Ist aktuell noch nicht produktionsbereit, weil Betreiber-/Kontaktangaben fehlen.

## 9. Datenbank und Hosting

Das Repository enthält bereits ein optionales Datenbankgerüst:

```text
db/
drizzle/
drizzle.config.ts
```

Für die aktuellen kostenlosen Rechner wird keine zentrale Datenbank benötigt.

Eine Datenbank wird erst interessanter für Funktionen wie:

- Accounts
- gespeicherte Berechnungen
- Favoriten
- Leads
- Anbieterprofile
- Conversion-Tracking auf eigener Infrastruktur
- Premium-Funktionen

Das Projekt enthält außerdem Vinext-/Vite-/Cloudflare-spezifische Build- und Hosting-Konfiguration.

## 10. Neues allgemeines Tool hinzufügen

### Schritt 1 – Tool registrieren

Die Metadaten in der passenden Registry ergänzen.

Beispiel:

```ts
{
  slug: "beispiel-rechner",
  title: "Beispiel-Rechner",
  eyebrow: "Kurze Einordnung",
  description: "Klare Beschreibung des konkreten Nutzens.",
  short: "Kurzer Kartentext.",
  category: "Geld & Beruf",
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

### Schritt 2 – Logik bauen

Im passenden Runner eine React-Komponente erstellen.

### Schritt 3 – Slug verbinden

Im Runner den neuen Slug der neuen Komponente zuordnen.

### Schritt 4 – automatisch erzeugte Bereiche prüfen

Danach sollten ohne weitere Seitenprogrammierung automatisch funktionieren:

- Tool-URL
- Startseitenkarte
- Suchfunktion
- Kategorie-Seite
- SEO-Metadaten
- FAQ
- Sitemap
- verwandte Tools

### Schritt 5 – testen

Mindestens prüfen:

```bash
npm run lint
npm run build
```

Bei größeren Änderungen zusätzlich:

```bash
npm test
```

## 11. Empfohlene nächste Strukturverbesserungen

Die aktuelle Architektur funktioniert, kann bei deutlich mehr Tools aber weiter modularisiert werden.

Sinnvolle nächste Schritte:

1. `tools.ts` und `tool-registry.ts` langfristig zu einer klaren Registry-Struktur zusammenführen.
2. `ToolRunner.tsx` nach Themenbereichen aufteilen, bevor die Datei sehr groß wird.
3. Wiederverwendbare Form-Felder, Ergebnis-Karten und Berechnungs-Layouts in eigene UI-Komponenten verschieben.
4. Formeln möglichst in reine TypeScript-Funktionen auslagern und separat testen.
5. Tool-spezifische Erklärungstexte aus der Seitenvorlage stärker individualisieren.
6. Monetarisierungs-Komponenten getrennt von der eigentlichen Rechnerlogik halten.
7. Echte Nutzungsdaten später verwenden, um erfolgreiche Tool-Cluster gezielt auszubauen.

## Grundregel

Ein neues Tool sollte nicht nur eine neue Keyword-Seite sein. Es sollte mindestens:

- eine konkrete Frage lösen,
- eine echte Berechnung oder Verarbeitung durchführen,
- ein direkt nutzbares Ergebnis liefern,
- verständliche Eingaben besitzen,
- eigene sinnvolle Erklärungen und FAQ enthalten.

So bleibt die Plattform sowohl für Nutzer als auch für Suchmaschinen qualitativ skalierbar.
