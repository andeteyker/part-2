# Affiliate-IDs eintragen (Copy-Paste-Anleitung, ~5 Min.)

Alle Empfehlungs-Links stehen in: `app/data/affiliate.ts`
Die IDs gehören an die zentrale Stelle oben in der Datei (Konstante `IDS`).
Trage sie ein und sag dem Agenten Bescheid -> er pusht sie ins Repo.

============================================================
1) AMAZON (eine Store-ID, schon eingetragen)
============================================================
ID:  soforttools-21  (steh schon in `IDS.amazonStoreId`)
Es fehlen nur noch die konkreten Produkt-ASINs.

So findest du eine ASIN:
- amazon.de > Buch/Produkt öffnen
- Die 10-stellige Zeichenfolge in der URL: amazon.de/dp/XXXXXXXXXX  <- das ist die ASIN
- Beispiel-Bücher die wir brauchen:
   * 1 Immobilien-/Mietrendite-Ratgeber  (für /tools/mietrendite-rechner)
   * 1 Kaufnebenkosten-/Immobilienkauf-Ratgeber (für /tools/kaufnebenkosten-rechner)

Wo eintragen:  In affiliate.ts bei den Einträgen `mietrendite-rechner`
und `kaufnebenkosten-rechner` -> das `amazonLink("B0??????")` ersetzen.

============================================================
2) AWIN (Publisher-ID ist drin, es fehlen die Merchant-IDs)
============================================================
Deine Publisher-ID (awid): 3078955  (steht schon in `IDS.awinPublisherId`)

Fehlend: die Merchant-ID (awinmid) pro Programm.
So findest du sie:
- Awin-Dashboard -> Programm öffnen (MyHammer, Verivox, Interhyp)
- Jedes Programm hat einen "Link generieren"/"Track-Link"-Button
- Im generierten Link steht `awinmid=XXXXXXXX` -> das ist die Zahl
- Hole diese 3 Zahlen und trage sie in `IDS.awinMerchantIds` ein:
     myhammer:  ""   <- MyHammer
     verivox:   ""   <- Verivox (Baufinanzierung für Kreditrate)
     interhyp:  ""   <- Interhyp (für Haus-Leisten / Kaufnebenkosten)

============================================================
3) DIGISTORE24 (Produkt-IDs selbst wählen)
============================================================
So findest du sie:
- Digistore24-Dashboard -> Affiliate-Bereich -> passende Produkte
- Produkt-URL öffnen: digistore24.com/product/XXXXXXXX <- das ist die Produkt-ID
- Brauchst 3 Stück:
   * 1 Ratgeber/Vorlagen Arbeit & Schicht (für /tools/schichtlohn-rechner)
   * 1 Arbeitszeit-Tracker (für /tools/ueberstunden-rechner)
   * 1 Bild-/Konvertierungs-Software (für /tools/heic-zu-jpg)
Wo eintragen:  Die `digistoreLink("<PRODUCT_ID>")`-Aufrufe ersetzen.
Optional: deine Digistore24-Affiliate-ID in `IDS.digistore24AffId` (für affidcheck).

============================================================
FERTIG-CHECK
============================================================
Sobald alle Platzhalter ersetzt sind, sagst du z. B.:
   "Alle IDs sind eingetragen, update das Repo"
Dann committe und pushe ich. Alternativ schick mir die Zahlen und
ich trage sie alle selbst ein.