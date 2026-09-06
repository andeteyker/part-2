# Architektur – SofortTools

Diese Datei erklärt den technischen Aufbau der Plattform und zeigt, wo neue Tools ergänzt werden.

## Ziel

SofortTools soll viele kleine spezialisierte Werkzeuge auf einer gemeinsamen Plattform veröffentlichen können, ohne Navigation, Layout, SEO, FAQ und Seitenstruktur für jedes Tool neu zu bauen.

Der zentrale Ablauf ist:

```text
Tool-Metadaten
    ↓
app/data/tool-registry.ts
    ↓
/tools/[slug]
    ↓
tool.runner
    ↓
passender Runner
    ↓
fertige Tool-Seite + SEO + FAQ + verwandte Tools
```

## Zentrale Registry

### `app/data/tool-registry.ts`

Dies ist die **einzige vollständige Registry**, die von Startseite, Suche, Kategorie-Seiten, Sitemap und Tool-Seiten verwendet wird.

Sie enthält bzw. registriert insgesamt:

- 20 allgemeine Basis-Tools
- 5 Immobilien-Tools
- 5 Schicht-/Zuschlags-Tools
- 5 Handwerker-/Renovierungs-Tools
- 9 Kategorien

Jede vollständige Tool-Definition besitzt:

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
  faq,
  runner
}
```

`runner` kann aktuell sein:

```ts
"core" | "property" | "shift" | "handwerker"
```

Die Registry erzeugt daraus eine gemeinsame `tools`-Liste. Dadurch müssen öffentliche Seiten nicht mehr mehrere Registries importieren oder Slugs gegen verschiedene Tool-Arrays prüfen.

### `app/data/tools.ts`

Diese Datei enthält nur noch die ursprünglichen 20 Basis-Tool-Metadaten und sechs Basiskategorien.

Sie ist **keine zweite vollständige Registry**. `tool-registry.ts` übernimmt diese Einträge und registriert sie als `core`.

## Gemeinsame Tool-UI

### `app/components/ToolUI.tsx`

Die Runner teilen sich zentrale UI- und Formatierungsbausteine:

```text
Field
NumberField
SelectField
Result
number()
fmt()
money()
```

Damit werden grundlegende Formularfelder, Ergebnisboxen und deutsche Zahlen-/Euroformatierung nicht mehr in jedem Runner erneut implementiert.

`Field` ist für allgemeine Inputs gedacht.

`NumberField` setzt standardmäßig:

- `type="number"`
- Mindestwert `0`
- Schrittweite `0.01`

`SelectField` vereinheitlicht Dropdowns.

`Result` vereinheitlicht hervorgehobene Ergebnisboxen.

## Startseite

### `app/page.tsx`

Serverseitige Einstiegsseite.

Aufgaben:

- Header und Footer einbinden
- `HomeClient` rendern
- Website-Schema erzeugen
- alle registrierten Tools im strukturierten Datenmodell referenzieren

Die Daten kommen ausschließlich aus `app/data/tool-registry.ts`.

### `app/components/HomeClient.tsx`

Interaktive Client-Komponente der Startseite.

Aufgaben:

- Tool-Suche
- Kategorie-Filter
- beliebte Werkzeuge
- gruppierte Tool-Karten
- dynamische Tool-Anzahl

Die Suche arbeitet direkt auf den Metadaten der zentralen Registry.

## Dynamische Tool-Seite

### `app/tools/[slug]/page.tsx`

Dies ist die gemeinsame Seitenvorlage für alle 35 Werkzeuge.

Beispiel:

```text
/tools/dachkosten-rechner
```

Ablauf:

1. `getTool(slug)` lädt die Definition aus `tool-registry.ts`.
2. Die Tool-Definition enthält bereits den `runner`-Typ.
3. Die Seite rendert den passenden Runner.
4. Metadaten, FAQ, Schema und verwandte Tools werden automatisch erzeugt.

Runner-Auswahl:

```text
core        → ToolRunner
property    → PropertyToolRunner
shift       → ShiftToolRunner
handwerker  → HandwerkerToolRunner
```

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

### `app/components/ToolRunner.tsx`

Enthält die 20 allgemeinen Basis-Tools, unter anderem:

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

Enthält:

- Mietrendite
- Kaufnebenkosten
- Immobilien-Cashflow
- Hausbudget
- Kreditrate / Restschuld

### `app/components/ShiftToolRunner.tsx`

Enthält:

- Schichtlohn
- Nachtzuschlag
- Sonntagszuschlag
- Feiertagszuschlag
- Überstunden

### `app/components/HandwerkerToolRunner.tsx`

Enthält:

- Dachkosten
- Badrenovierung
- Fensterkosten
- Malerkosten
- Bodenverlegung

Alle vier Runner verwenden gemeinsame Grundbausteine aus `ToolUI.tsx`.

## Kategorie-Seiten

### `app/nischen/[slug]/page.tsx`

Eine dynamische Vorlage erzeugt alle 9 Nischenseiten.

Beispiele:

```text
/nischen/immobilien
/nischen/schicht-zuschlaege
/nischen/handwerker-renovierung
```

Die Seite verwendet `categories`, `categoryDetails` und `getCategoryBySlug()` aus der zentralen Registry.

## Globale UI

### `app/components/SiteHeader.tsx`

Gemeinsamer Header aller öffentlichen Seiten.

### `app/components/SiteFooter.tsx`

Gemeinsamer Footer inklusive rechtlicher Navigation.

### `app/globals.css`

Zentrales Styling der Plattform.

Da viele Seiten dieselben Klassen verwenden, können Änderungen hier viele Seiten gleichzeitig beeinflussen.

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

### `app/sitemap.ts`

Erzeugt Sitemap-Einträge aus der zentralen Registry für:

- Startseite
- alle Kategorien
- alle registrierten Tools
- Datenschutz
- Impressum

### `app/robots.ts`

Erzeugt die Crawling-Regeln unter `/robots.txt`.

## Rechtliche Seiten

### `app/datenschutz/page.tsx`

Dokumentiert den aktuellen Stand der Datenverarbeitung.

Bei späterer Einbindung von Werbung, Affiliate-Tracking, Analytics, Newsletter- oder Lead-Diensten muss diese Seite erneut geprüft werden.

### `app/impressum/page.tsx`

Ist aktuell noch nicht produktionsbereit, weil vollständige Betreiber- und Kontaktangaben fehlen.

## Datenbank und Hosting

Das Repository enthält ein optionales Datenbankgerüst:

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
- Conversion-Daten
- Premium-Funktionen

Das Projekt enthält außerdem Vinext-/Vite-/Cloudflare-spezifische Build- und Hosting-Konfiguration.

## Neues Tool hinzufügen

### 1. Tool registrieren

Die Metadaten in `app/data/tool-registry.ts` ergänzen.

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

Die Registry ordnet den Eintrag über seine Tool-Gruppe automatisch einem Runner-Typ zu.

### 2. Rechner-UI erstellen

Im passenden Runner eine React-Komponente ergänzen.

Für Standardfelder und Ergebnisse möglichst verwenden:

```ts
import {
  Field,
  NumberField,
  SelectField,
  Result,
  number,
  fmt,
  money,
} from "./ToolUI";
```

### 3. Slug im Runner verbinden

Beispiel:

```ts
const content = {
  "beispiel-rechner": <ExampleTool />,
};
```

Falls ein komplett neuer Tool-Cluster entsteht:

1. neuen Runner anlegen,
2. `ToolRunnerKind` erweitern,
3. neue Tool-Gruppe in `tool-registry.ts` registrieren,
4. Runner-Mapping in `/tools/[slug]/page.tsx` ergänzen.

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

## Nächste sinnvolle Strukturverbesserungen

Die größten Registry- und UI-Duplikate sind bereits entfernt. Als nächste Schritte bieten sich an:

1. Berechnungsformeln aus React-Komponenten in reine TypeScript-Funktionen verschieben.
2. Diese Funktionen mit Unit-Tests absichern.
3. Wiederkehrende `stats-grid`-Darstellungen optional ebenfalls in UI-Komponenten auslagern.
4. Tool-spezifische Anleitungstexte stärker individualisieren.
5. Monetarisierungskomponenten technisch strikt von Rechnerlogik trennen.
6. Analytics-/Conversion-Daten später nutzen, um erfolgreiche Cluster gezielt auszubauen.

## Qualitätsregel

Ein neues Tool sollte nicht nur eine neue Keyword-Seite sein. Es sollte mindestens:

- eine konkrete Frage lösen,
- eine nachvollziehbare Berechnung oder Verarbeitung durchführen,
- ein direkt nutzbares Ergebnis liefern,
- verständliche Eingaben besitzen,
- eigene sinnvolle Erklärungen und FAQ enthalten.

So bleibt SofortTools technisch und inhaltlich skalierbar.
