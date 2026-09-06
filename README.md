# SofortTools

SofortTools ist eine deutsche Plattform für kleine, spezialisierte Online-Rechner und Browser-Werkzeuge.

> **Ein konkretes Problem → ein klares Tool → sofort ein Ergebnis.**

Aktuell enthält die Website **35 Tools in 9 Kategorien** – darunter Immobilien, Schicht & Zuschläge, Handwerker & Renovierung, Geld & Beruf, Text, Bilder, Internet und Planung.

## Inhaltsverzeichnis

- [Was ist SofortTools?](#was-ist-soforttools)
- [Aktueller Stand](#aktueller-stand)
- [Seitenübersicht](#seitenübersicht)
- [Projektstruktur](#projektstruktur)
- [Technik](#technik)
- [Lokal starten](#lokal-starten)
- [Wichtige Dateien](#wichtige-dateien)
- [Wie entsteht ein neues Tool?](#wie-entsteht-ein-neues-tool)
- [SEO und Indexierung](#seo-und-indexierung)
- [Datenschutz und Rechtliches](#datenschutz-und-rechtliches)
- [Weitere Dokumentation](#weitere-dokumentation)

## Was ist SofortTools?

Die Website bündelt viele kleine Werkzeuge unter einer gemeinsamen Marke und technischen Plattform. Navigation, Design, SEO, Kategorien, FAQ, strukturierte Daten und Seitengerüst werden zentral wiederverwendet.

Dadurch funktioniert SofortTools als **Tool-Engine**: Ein neues Werkzeug benötigt im Wesentlichen seine Metadaten und die eigentliche Berechnungs- oder Verarbeitungslogik.

Aktuelle Beispiele:

- Mietrendite und Immobilien-Cashflow berechnen
- Kaufnebenkosten und Kreditraten überschlagen
- Schichtlohn sowie Nacht-, Sonntags- und Feiertagszuschläge kalkulieren
- Dach-, Bad-, Fenster-, Maler- und Bodenkosten schätzen
- Stundenlohn und Spritkosten berechnen
- HEIC/WebP in JPG umwandeln
- QR-Codes und Passwörter lokal erzeugen
- Wordle-, Scrabble-, Text- und Zeitwerkzeuge nutzen

## Aktueller Stand

| Bereich | Stand |
| --- | --- |
| Startseite | vorhanden |
| Dynamische Tool-Seiten | vorhanden |
| Dynamische Kategorie-/Nischenseiten | vorhanden |
| Allgemeine Basis-Tools | 20 |
| Immobilien-Tools | 5 |
| Schicht-/Zuschlags-Tools | 5 |
| Handwerker-/Renovierungs-Tools | 5 |
| **Tools gesamt** | **35** |
| **Kategorien gesamt** | **9** |
| Zentrale Registry | `app/data/tool-registry.ts` |
| Gemeinsame Rechner-UI | `app/components/ToolUI.tsx` |
| SEO-Metadaten | vorhanden |
| FAQ-/WebApplication-/Breadcrumb-Schema | vorhanden |
| Sitemap und robots.txt | vorhanden |
| Impressum | Platzhalter vor öffentlichem Start ergänzen |
| Datenschutz | vorhanden, bei Werbung/Tracking später erweitern |
| Werbung / Affiliate / Leads | noch nicht produktiv eingebunden |

## Seitenübersicht

### `/`

**Startseite.** Zentrale Übersicht mit Hero-Bereich, Suche, Kategorien, beliebten Tools und allen verfügbaren Werkzeugen. Die Inhalte kommen aus der gemeinsamen Tool-Registry.

### `/tools/[slug]`

**Dynamische Werkzeugseite.** Eine gemeinsame Vorlage rendert alle 35 Tools. Titel, Beschreibung, Keywords, FAQ, verwandte Tools und der passende Runner werden automatisch anhand der Registry geladen.

Beispiele:

- `/tools/mietrendite-rechner`
- `/tools/schichtlohn-rechner`
- `/tools/dachkosten-rechner`
- `/tools/stundenlohnrechner`
- `/tools/heic-zu-jpg`

### `/nischen/[slug]`

**Kategorie-/Nischenseiten.** Bündeln thematisch verwandte Tools, z. B. Immobilien, Schicht & Zuschläge oder Handwerker & Renovierung.

### `/datenschutz`

**Datenschutzerklärung.** Beschreibt den aktuellen Stand der lokalen Browser-Verarbeitung, Server-Protokolle und externen Abfragen.

### `/impressum`

**Impressum.** Noch nicht produktionsbereit, weil die vollständigen Betreiberangaben ergänzt werden müssen.

### `/sitemap.xml` und `/robots.txt`

Werden über Next.js automatisch erzeugt und unterstützen Suchmaschinen bei Crawling und Indexierung.

Eine vollständige Übersicht aller Seiten, Kategorien und 35 Tools steht in [`docs/PAGES.md`](docs/PAGES.md).

## Projektstruktur

```text
app/
├── components/
│   ├── HomeClient.tsx             Startseite, Suche und Filter
│   ├── ToolUI.tsx                 gemeinsame Eingabe-/Ergebnis-Komponenten
│   ├── ToolRunner.tsx             20 allgemeine Basis-Tools
│   ├── PropertyToolRunner.tsx     5 Immobilien-Rechner
│   ├── ShiftToolRunner.tsx        5 Schicht-/Zuschlags-Rechner
│   ├── HandwerkerToolRunner.tsx   5 Renovierungs-/Kosten-Rechner
│   ├── SiteHeader.tsx             globaler Header
│   └── SiteFooter.tsx             globaler Footer
│
├── data/
│   ├── tools.ts                   Metadaten der 20 Basis-Tools
│   └── tool-registry.ts           zentrale Registry aller 35 Tools
│
├── tools/[slug]/page.tsx          gemeinsame dynamische Tool-Seite
├── nischen/[slug]/page.tsx        gemeinsame dynamische Kategorie-Seite
├── datenschutz/page.tsx           Datenschutz
├── impressum/page.tsx             Impressum
├── layout.tsx                     globale Metadaten und Layout
├── page.tsx                       Startseite
├── robots.ts                      robots.txt
├── sitemap.ts                     sitemap.xml
└── globals.css                    globales Styling

db/                                optionales D1/Drizzle-Datenbankgerüst
drizzle/                           Migrationen / Datenbankstruktur
examples/                          optionale Beispielimplementierungen
scripts/                           Build- und Hosting-Hilfsskripte
tests/                             Render-/Metadaten-Tests
public/                            statische Assets
```

Die technische Architektur ist ausführlich in [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) beschrieben.

## Technik

- **Next.js 16**
- **React 19**
- **TypeScript**
- **Vinext / Vite**
- **Cloudflare-kompatibles Hosting**
- **Drizzle ORM** und optional Cloudflare D1
- clientseitige Verarbeitung für viele Tools

Voraussetzung laut Projektkonfiguration:

```text
Node.js >= 22.13.0
```

## Lokal starten

Abhängigkeiten installieren:

```bash
npm ci
```

Entwicklungsserver starten:

```bash
npm run dev
```

Produktions-Build:

```bash
npm run build
```

Tests:

```bash
npm test
```

Linting:

```bash
npm run lint
```

> Einige Hilfsskripte unter `scripts/` sind auf Linux-/Cloudflare-/Sites-Umgebungen ausgelegt und verwenden Bash sowie GNU-Tools. Unter Windows kann WSL oder eine kompatible Shell notwendig sein.

## Wichtige Dateien

### `app/data/tool-registry.ts`

**Zentrale Registry der gesamten Website.** Sie führt alle 35 Tools und alle 9 Kategorien zusammen.

Jedes registrierte Tool erhält zusätzlich einen `runner`-Typ:

- `core`
- `property`
- `shift`
- `handwerker`

Die dynamische Tool-Seite verwendet diesen Wert direkt zur Auswahl der richtigen Rechner-Komponente. Dadurch gibt es keine verketteten Registries und keine mehrfachen Slug-Prüfungen mehr.

### `app/data/tools.ts`

Enthält die Metadaten der ursprünglichen 20 Basis-Tools und sechs Basiskategorien. Diese werden von der zentralen Registry als `core`-Tools registriert.

### `app/components/ToolUI.tsx`

Gemeinsame UI- und Formatierungsbausteine für alle Runner:

- `Field`
- `NumberField`
- `SelectField`
- `Result`
- Zahlenparser
- deutsche Zahlenformatierung
- Euro-Formatierung

Dadurch müssen neue Rechner diese Grundbausteine nicht erneut definieren.

### Runner

`ToolRunner.tsx` enthält die allgemeinen Browser-/Alltagswerkzeuge.

`PropertyToolRunner.tsx` enthält:

- Mietrendite
- Kaufnebenkosten
- Immobilien-Cashflow
- Hausbudget
- Kreditrate / Restschuld

`ShiftToolRunner.tsx` enthält:

- Schichtlohn
- Nachtzuschlag
- Sonntagszuschlag
- Feiertagszuschlag
- Überstunden

`HandwerkerToolRunner.tsx` enthält:

- Dachkosten
- Badrenovierung
- Fensterkosten
- Malerkosten
- Bodenverlegung

### `app/tools/[slug]/page.tsx`

Die zentrale Seitenvorlage liest die Tool-Definition aus der Registry und erzeugt automatisch:

- eigene URL
- Seitentitel und Description
- Keywords
- Breadcrumbs
- FAQ-Bereich
- strukturierte Daten
- verwandte Tools
- passenden Rechner anhand von `tool.runner`

## Wie entsteht ein neues Tool?

Der Grundablauf ist:

1. Tool mit `slug`, Titel, Beschreibung, Kategorie, Keywords und FAQ in `tool-registry.ts` registrieren.
2. Berechnungs- oder Verarbeitungslogik im passenden Runner ergänzen.
3. Den Slug im Runner mit der neuen Komponente verbinden.
4. Gemeinsame Felder und Ergebnisboxen aus `ToolUI.tsx` verwenden.
5. Prüfen, ob Kategorie, Suche und verwandte Tools korrekt erscheinen.
6. Build, Lint und Tests ausführen.

Die dynamische Route erzeugt danach automatisch die vollständige Tool-Seite.

Eine detaillierte Anleitung steht in [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

## SEO und Indexierung

SofortTools ist als SEO-orientierte Tool-Plattform aufgebaut.

Vorhanden sind unter anderem:

- individuelle Metadaten pro Tool
- Canonical-URLs
- Open-Graph-Daten
- Twitter-Metadaten
- `WebApplication`-Schema
- FAQ-Schema
- Breadcrumb-Schema
- Kategorie-Seiten
- interne Verlinkung zu verwandten Tools
- automatisch erzeugte Sitemap
- robots-Konfiguration

Für die weitere Skalierung gilt: Nicht nur viele nahezu identische Keyword-Seiten veröffentlichen. Jedes Tool sollte einen klaren eigenen Nutzen, echte Eingaben, eine nachvollziehbare Berechnung und hilfreiche Erklärungen besitzen.

## Datenschutz und Rechtliches

Viele Funktionen laufen vollständig im Browser. Das reduziert Serverkosten und Datenschutzrisiken.

Aktuell besonders relevant:

- Texte und lokal verarbeitete Bilder werden bei den entsprechenden Tools nicht an SofortTools übertragen.
- Der IP-Checker nutzt eine externe IP-Abfrage.
- Es sind derzeit keine eigenen Analytics- oder Marketing-Cookies beschrieben.
- Vor Werbung, Affiliate-Tracking oder Lead-Formularen muss die Datenschutzerklärung geprüft und erweitert werden.
- Das Impressum enthält noch Platzhalter und ist **nicht bereit für einen öffentlichen kommerziellen Start**.

## Weitere Dokumentation

- [`docs/PAGES.md`](docs/PAGES.md) – jede öffentliche Seite, alle Kategorien und alle 35 Tools kurz erklärt
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) – technische Architektur und Anleitung zum Erweitern der Plattform

---

**Kurz gesagt:** SofortTools ist eine gemeinsame Tool-Plattform. Eine zentrale Registry steuert Seiten, Kategorien, Suche, SEO und Runner-Zuordnung; gemeinsame UI-Bausteine reduzieren den Aufwand für jeden neuen Rechner.
