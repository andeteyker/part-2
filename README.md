# SofortTools

SofortTools ist eine deutsche Plattform für kleine, spezialisierte Online-Rechner und Browser-Werkzeuge. Die Idee: **ein konkretes Problem → ein klares Tool → sofort ein Ergebnis**.

Aktuell enthält die Website **25 Tools** in den Bereichen Immobilien, Geld & Beruf, Text & Schule, Wortspiele, Bilder, Internet & Sicherheit sowie Zeit & Planung.

## Inhaltsverzeichnis

- [Was ist SofortTools?](#was-ist-soforttools)
- [Aktueller Stand](#aktueller-stand)
- [Seitenübersicht](#seitenübersicht)
- [Projektstruktur](#projektstruktur)
- [Technik](#technik)
- [Lokal starten](#lokal-starten)
- [Wichtige Dateien](#wichtige-dateien)
- [Neues Tool hinzufügen](#neues-tool-hinzufügen)
- [SEO und Indexierung](#seo-und-indexierung)
- [Datenschutz und Rechtliches](#datenschutz-und-rechtliches)
- [Weitere Dokumentation](#weitere-dokumentation)

## Was ist SofortTools?

Die Website bündelt viele kleine Werkzeuge unter einer gemeinsamen Marke und technischen Plattform. Statt für jeden Rechner eine eigene Website zu bauen, werden Navigation, Design, SEO, Kategorien, FAQ, strukturierte Daten und Seitengerüst zentral wiederverwendet.

Das macht SofortTools zu einer **Tool-Engine**: Ein neues Werkzeug benötigt hauptsächlich seine Metadaten und die eigentliche Berechnungs- bzw. Verarbeitungslogik.

Beispiele:

- Mietrendite berechnen
- Kaufnebenkosten einer Immobilie überschlagen
- Arbeitszeit mit Pause bestimmen
- Stundenlohn aus Monatsgehalt berechnen
- HEIC- oder WebP-Bilder in JPG umwandeln
- QR-Codes erstellen
- Wordle- und Scrabble-Hilfe
- Sichere Passwörter lokal erzeugen

## Aktueller Stand

| Bereich | Stand |
| --- | --- |
| Startseite | vorhanden |
| Dynamische Tool-Seiten | vorhanden |
| Nischen-/Kategorie-Seiten | vorhanden |
| 20 allgemeine Tools | vorhanden |
| 5 Immobilien-Tools | vorhanden |
| SEO-Metadaten | vorhanden |
| FAQ-Schema / WebApplication-Schema | vorhanden |
| Sitemap und robots.txt | vorhanden |
| Impressum | Platzhalter vor öffentlichem Start ergänzen |
| Datenschutz | vorhanden, bei Werbung/Tracking später erweitern |
| Werbung / Affiliate / Leads | noch nicht produktiv eingebunden |

## Seitenübersicht

### `/`

**Startseite.** Zeigt Hero-Bereich, Suche, Kategorien und alle verfügbaren Tools. Die Tool-Daten kommen zentral aus der Registry.

### `/tools/[slug]`

**Dynamische Werkzeugseite.** Eine gemeinsame Seitenvorlage rendert alle Rechner und Tools. Titel, Beschreibung, Keywords, FAQ, verwandte Tools und strukturierte Daten werden aus der Tool-Registry erzeugt.

Beispiele:

- `/tools/mietrendite-rechner`
- `/tools/kaufnebenkosten-rechner`
- `/tools/stundenlohnrechner`
- `/tools/heic-zu-jpg`

### `/nischen/[slug]`

**Kategorie-/Nischenseiten.** Bündeln thematisch verwandte Tools, z. B. Immobilien, Geld & Beruf oder Internet & Sicherheit.

### `/datenschutz`

**Datenschutzerklärung.** Erklärt lokale Browser-Verarbeitung, Server-Protokolle und externe Abfragen. Muss erweitert werden, sobald Werbung, Analytics oder weitere Drittanbieter eingebunden werden.

### `/impressum`

**Impressum.** Aktuell noch mit Hinweistext. Vor öffentlichem Marktstart müssen die vollständigen Betreiberangaben ergänzt werden.

### `/sitemap.xml` und `/robots.txt`

Werden über Next.js automatisch erzeugt und unterstützen Suchmaschinen bei Crawling und Indexierung.

Eine vollständige Liste aller Seiten und aller 25 Tools steht in [`docs/PAGES.md`](docs/PAGES.md).

## Projektstruktur

```text
app/
├── components/              Wiederverwendbare UI- und Tool-Komponenten
│   ├── HomeClient.tsx       Interaktive Startseite, Suche und Filter
│   ├── ToolRunner.tsx       Logik der allgemeinen Tools
│   ├── PropertyToolRunner.tsx  Logik der Immobilien-Rechner
│   ├── SiteHeader.tsx       Globaler Header
│   └── SiteFooter.tsx       Globaler Footer
│
├── data/
│   ├── tools.ts             Basis-Tools und ursprüngliche Kategorien
│   └── tool-registry.ts     Gemeinsame Registry inkl. Immobilien-Tools
│
├── tools/[slug]/page.tsx    Gemeinsame dynamische Tool-Seite
├── nischen/[slug]/page.tsx  Gemeinsame dynamische Kategorie-Seite
├── datenschutz/page.tsx     Datenschutz
├── impressum/page.tsx       Impressum
├── layout.tsx               Globale Metadaten und Layout
├── page.tsx                 Startseite
├── robots.ts                robots.txt
├── sitemap.ts               sitemap.xml
└── globals.css              Globales Styling

db/                          Optionales D1/Drizzle-Datenbankgerüst
drizzle/                     Migrationen / Datenbankstruktur
examples/                    Optionale Beispielimplementierungen
scripts/                     Build- und Hosting-Hilfsskripte
tests/                       Render-/Metadaten-Tests
public/                      Statische Assets
```

Die technische Architektur ist ausführlicher in [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) beschrieben.

## Technik

- **Next.js 16**
- **React 19**
- **TypeScript**
- **Vinext / Vite**
- **Cloudflare-kompatibles Hosting**
- **Drizzle ORM** und optional Cloudflare D1
- Browserseitige Verarbeitung für viele Tools

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

> Hinweis: Einige vorhandene Hilfsskripte unter `scripts/` wurden für eine Linux-/Cloudflare-/Sites-Umgebung gebaut und verwenden Bash sowie GNU-Tools. Auf Windows kann deshalb WSL oder eine kompatible Shell notwendig sein.

## Wichtige Dateien

### `app/data/tool-registry.ts`

Die zentrale Übersicht der aktuell verfügbaren Tools. Neue Immobilien-Tools werden hier registriert. Die Registry kombiniert diese mit den bestehenden Basis-Tools.

### `app/data/tools.ts`

Enthält die ursprünglichen Tool-Definitionen, Kategorien, SEO-Keywords, Kurztexte und FAQ-Einträge.

### `app/components/ToolRunner.tsx`

Enthält die eigentliche Client-Logik der allgemeinen Tools, z. B. Prozentrechner, Textauswertung, Bildkonvertierung, QR-Code, Arbeitszeit oder Passwortgenerator.

### `app/components/PropertyToolRunner.tsx`

Enthält die Berechnungslogik der Immobilien-Rechner:

- Mietrendite
- Kaufnebenkosten
- Immobilien-Cashflow
- leistbares Hausbudget
- Kreditrate / Restschuld

### `app/tools/[slug]/page.tsx`

Die wichtigste Seitenvorlage. Sie erzeugt für jedes Tool automatisch:

- eigene URL
- Seitentitel und Beschreibung
- Keywords
- Breadcrumbs
- FAQ-Bereich
- strukturierte Daten
- verwandte Tools
- passenden ToolRunner

## Neues Tool hinzufügen

Der Grundablauf ist:

1. Tool mit `slug`, Titel, Beschreibung, Kategorie, Keywords und FAQ registrieren.
2. Berechnungs- oder Verarbeitungslogik als React-Komponente ergänzen.
3. Den `slug` im passenden Runner mit der Komponente verbinden.
4. Prüfen, ob Kategorie und verwandte Tools korrekt erscheinen.
5. Build und Tests ausführen.

Die dynamische Route erzeugt anschließend automatisch die eigentliche Tool-Seite. Eine ausführliche Anleitung steht in [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

## SEO und Indexierung

SofortTools ist von Anfang an als SEO-orientierte Tool-Plattform aufgebaut.

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

Wichtig für die weitere Skalierung: Nicht nur viele nahezu identische Seiten veröffentlichen. Jedes Tool sollte einen klaren eigenen Nutzen, sinnvolle Eingaben, echte Ergebnisse und hilfreiche Erklärungen besitzen.

## Datenschutz und Rechtliches

Viele Funktionen laufen vollständig im Browser. Das reduziert Serverkosten und Datenschutzrisiken.

Aktuell besonders relevant:

- Texte und lokal verarbeitete Bilder werden bei den entsprechenden Tools nicht an SofortTools übertragen.
- Der IP-Checker nutzt eine externe IP-Abfrage.
- Es sind derzeit keine eigenen Analytics- oder Marketing-Cookies beschrieben.
- Vor dem Einsatz von Werbenetzwerken, Affiliate-Tracking oder Lead-Formularen muss die Datenschutzerklärung überprüft und erweitert werden.
- Das Impressum enthält noch Platzhalter und ist **nicht bereit für einen öffentlichen kommerziellen Start**.

## Weitere Dokumentation

- [`docs/PAGES.md`](docs/PAGES.md) – alle öffentlichen Seiten, Kategorien und Tools kurz erklärt
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) – technische Architektur und Anleitung zum Erweitern der Plattform

---

**Kurz gesagt:** SofortTools ist keine Sammlung einzeln gebauter Mini-Websites, sondern eine gemeinsame technische Plattform, auf der neue spezialisierte Rechner mit relativ wenig zusätzlichem Aufwand veröffentlicht werden können.
