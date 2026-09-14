import { getGuide, type Guide } from "./guides";

const toolGuideAssociations: Record<string, string[]> = {
  "arbeitslosengeld-rechner": ["finanzen-steuern-planen", "geld-rechner-alltag"],
  "haushaltsbudget-rechner": ["finanzen-steuern-planen"],
  "kredit-sondertilgung-rechner": ["immobilie-kaufen-finanzieren-plan"],
  "balkonkraftwerk-rechner": ["photovoltaik-ertrag-amortisation", "energiekosten-senken"],
  "fahrtkosten-rechner": ["geld-rechner-alltag", "einkommensteuer-pendlerpauschale"],
  "leasingfaktor-rechner": ["geld-rechner-alltag"],
  "mietkaution-rechner": ["umzugskosten-budget"],
  "selbststaendig-stundensatz-rechner": ["arbeit-projekte-kalkulieren"],
  "skonto-rechner": ["arbeit-projekte-kalkulieren"],
  "zinseszins-rechner": ["finanzen-steuern-planen", "rente-abfindung-bausparen"],
  "energie-abschlag-rechner": ["energiekosten-senken"],
  "haushaltsgeraete-kosten-rechner": ["energiekosten-senken"],
  "co2-heizkosten-rechner": ["energiekosten-senken"],
  "anhalteweg-rechner": ["geld-rechner-alltag"],
  "eauto-verbrenner-kosten-rechner": ["geld-rechner-alltag", "energiekosten-senken"],
  "erspartes-reichweite-rechner": ["finanzen-steuern-planen", "immobilie-kaufen-finanzieren-plan"],
  "nebenkosten-vorauszahlung-rechner": ["heizkosten-gasverbrauch", "umzugskosten-budget"],
  "powerstation-laufzeit-rechner": ["energiekosten-senken"],
  "erhaltungsruecklage-rechner": ["mietrendite-berechnen", "immobilie-kaufen-finanzieren-plan"],
  "werbungskosten-steuerersparnis-rechner": ["einkommensteuer-pendlerpauschale", "finanzen-steuern-planen"],
};

export function getAssociatedGuides(toolSlug: string): Guide[] {
  return (toolGuideAssociations[toolSlug] ?? [])
    .map(getGuide)
    .filter((guide): guide is Guide => Boolean(guide));
}

export function getAssociatedToolSlugs(guideSlug: string): string[] {
  return Object.entries(toolGuideAssociations)
    .filter(([, guideSlugs]) => guideSlugs.includes(guideSlug))
    .map(([toolSlug]) => toolSlug);
}
