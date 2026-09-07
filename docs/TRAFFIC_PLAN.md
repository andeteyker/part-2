# SofortTools – Traffic-Kanäle & Content-Plan

Operatives Arbeitsdokument. Ergänzt die heutige User-Story (Traffic, Affiliate,
Persuasion) um konkrete, abarbeitbare Kanäle mit echten Plattformen.
Kein Teil davon ist automatisiert – es ist eine Checkliste für manuelle
Reichweitenarbeit.

## 1. SEO (größter Hebel, läuft jetzt durch das Ratgeber-System)

- [ ] Google Search Console verknüpfen (+ Eigentumsnachweis beachten: Domain sofort-tools.de)
- [ ] Neue Ratgeber in app/data/guides.ts anlegen – Struktur exakt nach dem Muster mietrendite-berechnen
- [ ] Je Rechner zuerst: 1 Ratgeber, der konkret eine Suchfrage beantwortet (Featured-Snippet-Tauglichkeit: kurze nummerierte Antworten)
- [ ] Zuerst füllen: Kaufnebenkosten, Badrenovierung (höchstes Suchvolumen in den Clustern)
- [ ] Interne Verlinkung prüfen: Ratgeber <-> Rechner <-> Kategorie (ist bereits eingebaut, wenn toolSlug stimmt)

Priorisierte Cluster (Suchintention hoch → niedrig):
1. Immobilien (Kaufnebenkosten, Mietrendite, Baufinanzierung)
2. Handwerker & Renovierung (Bad, Dach, Fenster, Boden)
3. Schicht & Zuschläge (steuerliche Grenzen § 3b EStG – starkes Long-Tail-Potenzial)

## 2. Pinterest (bester Social-Kanal für Rechner)

Konto: Eigene Business-Pinnwand "SofortTools-Rechner".
- [ ] Pro Rechner 5-10 Pins: Ergebnis-Diagramm, Checkliste, Vorher/Nachher-Grafik
- [ ] Wöchentlich 2-3 neue Pins, immer Link auf den passenden Rechner
- [ ] 3 Start-Pins (aus Beispiel-Daten):
  - "Mietrendite-Rechner: Brutto & Netto in Sekunden"
  - "Kaufnebenkosten-Checkliste: diese Kosten übersehen Käufer häufig"
  - "Was kostet die Badrenovierung? Kostenrechner + Beispielrechnung"
- [ ] Rich Pins aktivieren; Ideal-Pins (Video) testen

## 3. Nischen-Foren (direktes Publikum + Backlinks)

Immobilien:
- [ ] immobilienscout24.de/community (Vermieter-Fragen beantworten)
- [ ] finanzen.net/forum (Unterforum Immobilien)
- [ ] Mietrendite.de (Gastartikel anbieten: "Mietrendite richtig berechnen")

Handwerk:
- [ ] handwerker-forum.de
- [ ] hausbau-forum.de
- [ ] baufachforum.de
- [ ] MyHammer (eigener Eintrag + ggf. Partner)

Regel: Erst echten Mehrwert liefern, Rechner nur erwähnen, wenn er passt. Keine Spam-Links.

## 4. Reddit (Vertrauen, selektiv)

- [ ] r/Finanzen aktiv mitlesen, bei passenden Fragen den Rechner nennen
- [ ] r/Handwerk / deutsche Immobilien-Subs
Nur hilfreiche Beiträge; Self-Promotion nur, wenn die Frage es verdient.

## 5. Gastartikel & Linkbuilding

- [ ] 2-4 Gastartikel/Monat auf Immobilien-/Finanz-/Handwerker-Blogs
- [ ] Verzeichnisse: GoYellow, AlternativeTo, Gruender.de
- [ ] Digital-PR: eigene Daten aus den Rechnern ("Durchschnittliche Mietrendite in deutschen Großstädten") als Presse-Geschichte
- [ ] Rechner als iFrame/Embed für Makler- und Handwerker-Homepages anbieten (stetiger Backlink-Fluss)

## 6. YouTube Shorts (Markenbekanntheit, mittelfristig)

- [ ] 4-8 Shorts/Monat (30-60s): "So rechnest du deine Mietrendite", "5 Fehler bei der Schichtzulage"
- [ ] Jede Short verlinkt den Rechner

## 7. Facebook-Gruppen (Bindung, kein Neugewinnungs-Kanal)

- [ ] Teilnehmen in "Vermieter und Hausverwaltung", "Immobilien-Investoren Deutschland"
- [ ] Eigene Gruppe erst später, wenn andere Kanäle stehen

## Priorisierter 90-Tage-Plan

Woche 1-4:  Ratgeber für Kaufnebenkosten + Badrenovierung anlegen (guides.ts),
           Search Console einrichten, Pinterest-Konto + 20 Pins.
Woche 2-10: Forum-Aktivität Immobilien + Handwerk starten, erste Gastartikel.
Woche 4-12: Verzeichnis-Einträge, Reddit r/Finanzen, erste Shorts.

## Affiliate-Pflege (erinnern)

- [ ] Sobald Programme freigeschaltet: <TRACKING_ID>/<ASIN>/<PRODUCT_ID> in app/data/affiliate.ts ersetzen
- [ ] Für Kreditrate/Finanzen: Verivox/SmaVa-Widget in der Kredit-Tool-Seite prüfen (höchster Ertrag/Conversion)
- [ ] Nicht vergessen: AdSense erst ab ~3-5k Sessions/Monat unterhalb des Consent-Banners einbinden