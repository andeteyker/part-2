/**
 * Zentrale Affiliate-/Empfehlungs-Konfiguration für SofortTools.
 *
 * Rechtskonform:
 *  - sichtbare Kennzeichnung als "Anzeige" / "Partnerlink"
 *  - rel="sponsored nofollow" auf allen Affiliate-Links
 *  - transparente Provisions-Hinweise
 *
 * KEINE Klick-Tracking-Cookies: Diese Links sind reine Weiterleitungen.
 * Sobald ein Programm Cookie-/Klick-Tracking verlangt, muss das hinter dem
 * Consent-Banner (window.__consentRead/__consentGrant) freigeschaltet werden.
 */

/* =====================================================================
 * 1) PARTNER-IDS (hier die echten Werte eintragen)
 * ===================================================================== */
export const IDS = {
  /** Amazon PartnerNet Store-ID (tag-Parameter). */
  amazonStoreId: "soforttools-21",

  /** Awin Publisher (Affiliate)-ID. */
  awinPublisherId: "3078955",

  /**
   * Awin Merchant (Advertiser)-IDs pro Programm.
   * JEDES Programm hat eine eigene awinmid. Diese holst du im Awin-Dashboard
   * unter dem jeweiligen Programm (Link-Tools / generierter Track-Link).
   * Solange leer, greift der Fallback-Link.
   */
  awinMerchantIds: {
    myhammer: "", // TODO: Awin awinmid aus dem MyHammer-Programm eintragen.
    verivox: "", // TODO: Awin awinmid aus dem Verivox-Programm eintragen.
    interhyp: "", // TODO: Awin awinmid aus dem Interhyp-Programm eintragen.
  },

  /** Digistore24 Affiliate-ID (für affidcheck in Produkt-Links). */
  digistore24AffId: "", // TODO: echte Digistore24 Affiliate-ID eintragen.
};

/* =====================================================================
 * 2) URL-HELFER
 * ===================================================================== */

/** Amazon-Partnerlink (DE). Die ASIN ist die konkrete Produkt-ASIN. */
export const amazonLink = (asin: string) =>
  `https://www.amazon.de/dp/${asin}?tag=${IDS.amazonStoreId}`;

/**
 * Awin-Track-Link. braucht pro Programm die Merchant-ID (awinmid).
 * `awid` ist deine Publisher-ID, `submitid` eine optionale eigene Kennung.
 */
export const awinLink = (merchantKey: keyof typeof IDS.awinMerchantIds, url: string, submitid = "soforttools") => {
  const mid = IDS.awinMerchantIds[merchantKey];
  if (!mid) return url; // noch keine Merchant-ID eingerichtet -> direkter Link
  const enc = encodeURIComponent(url);
  return `https://www.awin1.com/cread.php?awinmid=${mid}&awid=${IDS.awinPublisherId}&p=${enc}&submitid=${submitid}`;
};

/** Digistore24-Produktlink mit Affiliate-ID. */
export const digistoreLink = (productId: string) =>
  IDS.digistore24AffId
    ? `https://www.digistore24.com/product/${productId}?affidcheck=${IDS.digistore24AffId}`
    : `https://www.digistore24.com/product/${productId}`;

/* =====================================================================
 * 3) EMPFEHLUNGEN
 * ===================================================================== */

export type Recommendation = {
  tag: string;
  headline: string;
  network: string;
  product: string;
  text: string;
  url: string;
};

export const recommendationLead = (title: string) =>
  `Passend zu deiner Berechnung mit „${title}“:`;

export function getRecommendation(slug: string, title?: string): Recommendation | undefined {
  const recommendation = recommendations[slug] ?? getRecommendationByGroup(slug);
  return recommendation && title
    ? { ...recommendation, text: `${recommendationLead(title)} ${recommendation.text}` }
    : recommendation;
}

const recommendations: Record<string, Recommendation> = {
  // ---- Immobilien ----
  "kreditraten-rechner": {
    tag: "Anzeige",
    headline: "Passende Baufinanzierung vergleichen",
    network: "Verivox / Awin",
    product: "Baufinanzierungs-Vergleich",
    text: "Du hast deine Kreditrate selbst überschlagen. Vergleiche jetzt reale Zinssätze und finde eine zu deiner Rate passende Finanzierung.",
    url: awinLink("verivox", "https://www.verivox.de/baufinanzierung/"),
  },
  "haus-leisten-rechner": {
    tag: "Anzeige",
    headline: "Dein realistisches Kaufbudget absichern",
    network: "Interhyp / Awin",
    product: "Unverbindliche Finanzierungsanfrage",
    text: "Dein Ergebnis ist eine erste Orientierung. Lass dir von einem unabhängigen Finanzierungsexperten ein konkretes Angebot für dein Budget erstellen.",
    url: awinLink("interhyp", "https://www.interhyp.de/"),
  },
  "mietrendite-rechner": {
    tag: "Anzeige",
    headline: "Renditeobjekte gezielt suchen",
    network: "Amazon PartnerNet",
    product: "Immobilieninvestment-Ratgeber",
    text: "Nach der Renditeberechnung fehlt oft die passende Wissensbasis. Ein aktueller Ratgeber hilft dir, Kennzahlen richtig einzuordnen.",
    url: amazonLink("B0??????"), // TODO: echte Amazon-ASIN des ausgewählten Buches eintragen.
  },
  "kaufnebenkosten-rechner": {
    tag: "Anzeige",
    headline: "Kaufnebenkosten einplanen",
    network: "Awin",
    product: "Immobilien-Fachliteratur",
    text: "Neben deiner Nebenkosten-Berechnung hilft dir ein praxisnaher Ratgeber, keine versteckten Kosten beim Immobilienkauf zu übersehen.",
    url: awinLink("interhyp", "https://www.interhyp.de/"),
  },

  // ---- Handwerker & Renovierung ----
  "dachkosten-rechner": {
    tag: "Anzeige",
    headline: "Fachbetriebe für dein Dach vergleichen",
    network: "MyHammer / Awin",
    product: "Kostenlose Handwerker-Anfrage",
    text: "Deine Dachkosten-Rechnung ist ein Rahmen. Hole jetzt kostenlose Angebote von geprüften Dachdecker-Betrieben in deiner Nähe ein.",
    url: awinLink("myhammer", "https://www.myhammer.de/"),
  },
  "badrenovierung-rechner": {
    tag: "Anzeige",
    headline: "Preise für die Badsanierung vergleichen",
    network: "MyHammer / Awin",
    product: "Bad-Sanierung anfragen",
    text: "Ein Sanitärbetrieb aus deiner Region kann deine Kalkulation mit einem verbindlichen Angebot untermauern. Jetzt unverbindlich anfragen.",
    url: awinLink("myhammer", "https://www.myhammer.de/"),
  },
  "fensterkosten-rechner": {
    tag: "Anzeige",
    headline: "Fenstermarken und Fachbetriebe vergleichen",
    network: "Awin",
    product: "Fenster-Angebot anfragen",
    text: "Nutze deine Fensterkosten-Berechnung, um konkrete Angebote von regionalen Fensterbauern anzufordern.",
    url: awinLink("myhammer", "https://www.myhammer.de/"),
  },
  "malerkosten-rechner": {
    tag: "Anzeige",
    headline: "Malerbetriebe vergleichen",
    network: "MyHammer / Awin",
    product: "Maler-Angebot anfragen",
    text: "Deine Kalkulation kannst du direkt mit echten Angeboten von Malerbetrieben vor Ort abgleichen.",
    url: awinLink("myhammer", "https://www.myhammer.de/"),
  },
  "bodenverlegung-kosten-rechner": {
    tag: "Anzeige",
    headline: "Bodenleger in deiner Nähe finden",
    network: "MyHammer / Awin",
    product: "Bodenverlegung anfragen",
    text: "Vergleiche deine Bodenkosten mit Angeboten von Bodenleger-Betrieben, die direkt zu deiner Fläche passen.",
    url: awinLink("myhammer", "https://www.myhammer.de/"),
  },

  // ---- Schicht & Zuschläge ----
  "schichtlohn-rechner": {
    tag: "Anzeige",
    headline: "Passende Arbeitsvertrags-Vorlagen",
    network: "Digistore24",
    product: "Ratgeber & Vorlagen für Schichtarbeit",
    text: "Für deinen Schichtlohn-Überblick helfen dir aktuelle Ratgeber und Vorlagen, Zuschläge und Vertragsbedingungen korrekt einzuordnen.",
    url: digistoreLink("<PRODUCT_ID>"), // TODO: echte Digistore24-Produkt-ID eintragen.
  },
  "ueberstunden-rechner": {
    tag: "Anzeige",
    headline: "Überstunden korrekt dokumentieren",
    network: "Digistore24",
    product: "Arbeitszeit-Tracker",
    text: "Ein digitaler Arbeitszeit-Tracker hilft dir, Überstunden und Zuschläge zuverlässig zu erfassen.",
    url: digistoreLink("<PRODUCT_ID>"), // TODO: echte Digistore24-Produkt-ID eintragen.
  },

  // ---- Medien / Bilder ----
  "heic-zu-jpg": {
    tag: "Anzeige",
    headline: "Professionelle Bildkonvertierung",
    network: "Digistore24",
    product: "Bildbearbeitungs-Software",
    text: "Für große Bildmengen oder zusätzliche Formate lohnt sich ein leistungsfähiges Konvertierungs-Tool.",
    url: digistoreLink("<PRODUCT_ID>"), // TODO: echte Digistore24-Produkt-ID eintragen.
  },
};

/** Fallback-Empfehlungen nach ToolRunner-Gruppe. */
const fallback: Record<string, Recommendation> = {
  property: {
    tag: "Anzeige",
    headline: "Unabhängige Finanzberatung",
    network: "Interhyp / Awin",
    product: "Kostenloses Beratungsgespräch",
    text: "Deine Berechnung ist der erste Schritt. Ein unabhängiger Berater hilft dir, das passende Finanzierungspaket zu finden.",
    url: awinLink("interhyp", "https://www.interhyp.de/"),
  },
  handwerker: {
    tag: "Anzeige",
    headline: "Passende Fachbetriebe finden",
    network: "MyHammer / Awin",
    product: "Handwerker-Anfragen vergleichen",
    text: "Reale Angebote von Fachbetrieben helfen dir, deine eigene Kostenkalkulation zu verifizieren.",
    url: awinLink("myhammer", "https://www.myhammer.de/"),
  },
  shift: {
    tag: "Anzeige",
    headline: "Ratgeber für Arbeitsrecht & Zuschläge",
    network: "Digistore24",
    product: "Aktuelle Ratgeber",
    text: "Informiere dich über rechtliche Grundlagen zu Zuschlägen und Arbeitszeit.",
    url: digistoreLink("<PRODUCT_ID>"), // TODO: echte Digistore24-Produkt-ID eintragen.
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
