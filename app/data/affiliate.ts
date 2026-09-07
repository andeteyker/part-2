/**
 * Zentrale Affiliate-/Empfehlungs-Konfiguration.
 *
 * Jede Empfehlung wird pro Tool-Slug hinterlegt und nach dem Ergebnis angezeigt
 * (kontextuelles Matching). Rechtskonform:
 *  - sichtbare Kennzeichnung als "Anzeige" / "Partnerlink"
 *  - rel="sponsored nofollow" auf allen Affiliate-Links
 *  - transparente Provision-Hinweise
 *
 * HINWEIS ZUR PFLEGE:
 *  - <TRACKING_ID> Platzhalter müssen durch die echten Partner-IDs ersetzt
 *    werden, sobald die Programme (Amazon PartnerNet, Awin, Digistore24)
 *    freigeschaltet sind.
 *  - Keine Klick-Tracking-Cookies werden gesetzt: Die Links sind reine
 *    Weiterleitungen. Sobald ein Programm Cookie-Tracking verlangt, muss das
 *    hinter dem Consent-Banner (window.__consentRead) freigeschaltet werden.
 */

export type Recommendation = {
  /** Etikett, das den Charakter der Empfehlung betont. */
  tag: string;
  /** Überschrift der Empfehlungsbox. */
  headline: string;
  /** Katalog (z. B. "Amazon PartnerNet", "Awin", "Digistore24"). */
  network: string;
  /** Produkt- oder Dienstname. */
  product: string;
  /** Kurzbeschreibung der Empfehlung. */
  text: string;
  /** Ziel-URL des Affiliate-Links. */
  url: string;
};

/** Kontextuelles Textbaustein-Vorwort, das vor dem Angebot steht. */
export const recommendationLead = (title: string) =>
  `Passend zu deiner Berechnung im Rechner „${title}" haben wir eine unabhängige Lösung für den nächsten Schritt gefunden.`;

/**
 * Ermittelt die passende Empfehlung für einen Tool-Slug.
 * Bevorzugt einen Slug-Eintrag, fällt auf die Kategorie-Gruppe zurück.
 */
export function getRecommendation(slug: string): Recommendation | undefined {
  return recommendations[slug] ?? getRecommendationByGroup(slug);
}

const recommendations: Record<string, Recommendation> = {
  // ---- Immobilien ----
  "kreditraten-rechner": {
    tag: "Anzeige",
    headline: "Passende Baufinanzierung vergleichen",
    network: "Verivox / Awin",
    product: "Baufinanzierungs-Vergleich",
    text: "Du hast deine Kreditrate selbst überschlagen. Vergleiche jetzt reale Zinssätze und finde eine zu deiner Rate passende Finanzierung.",
    url: "https://www.awin1.com/cread.php?awinmid=<TRACKING_ID>&p=https://www.verivox.de/baufinanzierung/",
  },
  "haus-leisten-rechner": {
    tag: "Anzeige",
    headline: "Dein realistisches Kaufbudget absichern",
    network: "Interhyp / Awin",
    product: "Unverbindliche Finanzierungsanfrage",
    text: "Dein Ergebnis ist eine erste Orientierung. Lass dir von einem unabhängigen Finanzierungsexperten ein konkretes Angebot für dein Budget erstellen.",
    url: "https://www.awin1.com/cread.php?awinmid=<TRACKING_ID>&p=https://www.interhyp.de/",
  },
  "mietrendite-rechner": {
    tag: "Anzeige",
    headline: "Renditeobjekte gezielt suchen",
    network: "Amazon PartnerNet",
    product: "Immobilieninvestment-Ratgeber",
    text: "Nach der Renditeberechnung fehlt oft die passende Wissensbasis. Ein aktueller Ratgeber hilft dir, Kennzahlen richtig einzuordnen.",
    url: "https://www.amazon.de/dp/<ASIN>?tag=<TRACKING_ID>",
  },
  "kaufnebenkosten-rechner": {
    tag: "Anzeige",
    headline: "Kaufnebenkosten einplanen",
    network: "Awin",
    product: "Immobilien-Fachliteratur",
    text: "Neben deiner Nebenkosten-Berechnung hilft dir ein praxisnaher Ratgeber, keine versteckten Kosten beim Immobilienkauf zu übersehen.",
    url: "https://www.awin1.com/cread.php?awinmid=<TRACKING_ID>&p=<URL>",
  },

  // ---- Handwerker & Renovierung ----
  "dachkosten-rechner": {
    tag: "Anzeige",
    headline: "Fachbetriebe für dein Dach vergleichen",
    network: "MyHammer / Awin",
    product: "Kostenlose Handwerker-Anfrage",
    text: "Deine Dachkosten-Rechnung ist ein Rahmen. Hole jetzt kostenlose Angebote von geprüften Dachdecker-Betrieben in deiner Nähe ein.",
    url: "https://www.awin1.com/cread.php?awinmid=<TRACKING_ID>&p=https://www.myhammer.de/",
  },
  "badrenovierung-rechner": {
    tag: "Anzeige",
    headline: "Preise für die Badsanierung vergleichen",
    network: "MyHammer / Awin",
    product: "Bad-Sanierung anfragen",
    text: "Ein Sanitärbetrieb aus deiner Region kann deine Kalkulation mit einem verbindlichen Angebot untermauern. Jetzt unverbindlich anfragen.",
    url: "https://www.awin1.com/cread.php?awinmid=<TRACKING_ID>&p=https://www.myhammer.de/",
  },
  "fensterkosten-rechner": {
    tag: "Anzeige",
    headline: "Fenstermarken und Fachbetriebe vergleichen",
    network: "Awin",
    product: "Fenster-Angebot anfragen",
    text: "Nutze deine Fensterkosten-Berechnung, um konkrete Angebote von regionalen Fensterbauern anzufordern.",
    url: "https://www.awin1.com/cread.php?awinmid=<TRACKING_ID>&p=<URL>",
  },
  "malerkosten-rechner": {
    tag: "Anzeige",
    headline: "Malerbetriebe vergleichen",
    network: "MyHammer / Awin",
    product: "Maler-Angebot anfragen",
    text: "Deine Kalkulation kannst du direkt mit echten Angeboten von Malerbetrieben vor Ort abgleichen.",
    url: "https://www.awin1.com/cread.php?awinmid=<TRACKING_ID>&p=https://www.myhammer.de/",
  },
  "bodenverlegung-kosten-rechner": {
    tag: "Anzeige",
    headline: "Bodenleger in deiner Nähe finden",
    network: "MyHammer / Awin",
    product: "Bodenverlegung anfragen",
    text: "Vergleiche deine Bodenkosten mit Angeboten von Bodenleger-Betrieben, die direkt zu deiner Fläche passen.",
    url: "https://www.awin1.com/cread.php?awinmid=<TRACKING_ID>&p=https://www.myhammer.de/",
  },

  // ---- Schicht & Zuschläge ----
  "schichtlohn-rechner": {
    tag: "Anzeige",
    headline: "Passende Arbeitsvertrags-Vorlagen",
    network: "Digistore24",
    product: "Ratgeber & Vorlagen für Schichtarbeit",
    text: "Für deinen Schichtlohn-Überblick helfen dir aktuelle Ratgeber und Vorlagen, Zuschläge und Vertragsbedingungen korrekt einzuordnen.",
    url: "https://www.digistore24.com/product/<PRODUCT_ID>",
  },
  "ueberstunden-rechner": {
    tag: "Anzeige",
    headline: "Überstunden korrekt dokumentieren",
    network: "Digistore24",
    product: "Arbeitszeit-Tracker",
    text: "Ein digitaler Arbeitszeit-Tracker hilft dir, Überstunden und Zuschläge zuverlässig zu erfassen.",
    url: "https://www.digistore24.com/product/<PRODUCT_ID>",
  },

  // ---- Medien / Bilder ----
  "heic-zu-jpg": {
    tag: "Anzeige",
    headline: "Professionelle Bildkonvertierung",
    network: "Digistore24",
    product: "Bildbearbeitungs-Software",
    text: "Für große Bildmengen oder zusätzliche Formate lohnt sich ein leistungsfähiges Konvertierungs-Tool.",
    url: "https://www.digistore24.com/product/<PRODUCT_ID>",
  },
};

/**
 * Fallback-Empfehlungen nach ToolRunner-Gruppe, falls für einen Slug noch
 * kein eigener Eintrag existiert.
 */
const fallback: Record<string, Recommendation> = {
  property: {
    tag: "Anzeige",
    headline: "Unabhängige Finanzberatung",
    network: "Interhyp / Awin",
    product: "Kostenloses Beratungsgespräch",
    text: "Deine Berechnung ist der erste Schritt. Ein unabhängiger Berater hilft dir, das passende Finanzierungspaket zu finden.",
    url: "https://www.awin1.com/cread.php?awinmid=<TRACKING_ID>&p=https://www.interhyp.de/",
  },
  handwerker: {
    tag: "Anzeige",
    headline: "Passende Fachbetriebe finden",
    network: "MyHammer / Awin",
    product: "Handwerker-Anfragen vergleichen",
    text: "Reale Angebote von Fachbetrieben helfen dir, deine eigene Kostenkalkulation zu verifizieren.",
    url: "https://www.awin1.com/cread.php?awinmid=<TRACKING_ID>&p=https://www.myhammer.de/",
  },
  shift: {
    tag: "Anzeige",
    headline: "Ratgeber für Arbeitsrecht & Zuschläge",
    network: "Digistore24",
    product: "Aktuelle Ratgeber",
    text: "Informiere dich über rechtliche Grundlagen zu Zuschlägen und Arbeitszeit.",
    url: "https://www.digistore24.com/product/<PRODUCT_ID>",
  },
  core: {
    tag: "Anzeige",
    headline: "Sinnvolle Zusatz-Lösung",
    network: "Awin",
    product: "Nützliches Produkt",
    text: "Für dein Ergebnis gibt es eine passende Lösung, die den nächsten Schritt vereinfacht.",
    url: "https://www.awin1.com/cread.php?awinmid=<TRACKING_ID>&p=<URL>",
  },
};

/** Mapping Slug → Fallback-Runner-Gruppe. */
const slugToGroup: Record<string, keyof typeof fallback | undefined> = {
  "mietrendite-rechner": "property",
  "kaufnebenkosten-rechner": "property",
  "immobilien-cashflow-rechner": "property",
  "haus-leisten-rechner": "property",
  "kreditraten-rechner": "property",
  "dachkosten-rechner": "handwerker",
  "badrenovierung-rechner": "handwerker",
  "fensterkosten-rechner": "handwerker",
  "malerkosten-rechner": "handwerker",
  "bodenverlegung-kosten-rechner": "handwerker",
  "schichtlohn-rechner": "shift",
  "nachtzuschlag-rechner": "shift",
  "sonntagszuschlag-rechner": "shift",
  "feiertagszuschlag-rechner": "shift",
  "ueberstunden-rechner": "shift",
};

export function getRecommendationByGroup(slug: string): Recommendation | undefined {
  const group = slugToGroup[slug];
  return group ? fallback[group] : undefined;
}
