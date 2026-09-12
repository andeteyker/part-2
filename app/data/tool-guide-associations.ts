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
};

export function getAssociatedGuides(toolSlug: string): Guide[] {
  return (toolGuideAssociations[toolSlug] ?? [])
    .map(getGuide)
    .filter((guide): guide is Guide => Boolean(guide));
}
