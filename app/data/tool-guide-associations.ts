import { getGuide, type Guide } from "./guides";

const toolGuideAssociations: Record<string, string[]> = {
  "haushaltsbudget-rechner": ["finanzen-steuern-planen"],
  "kredit-sondertilgung-rechner": ["immobilie-kaufen-finanzieren-plan"],
  "balkonkraftwerk-rechner": ["photovoltaik-ertrag-amortisation", "energiekosten-senken"],
  "fahrtkosten-rechner": ["geld-rechner-alltag", "einkommensteuer-pendlerpauschale"],
  "selbststaendig-stundensatz-rechner": ["arbeit-projekte-kalkulieren"],
};

export function getAssociatedGuides(toolSlug: string): Guide[] {
  return (toolGuideAssociations[toolSlug] ?? [])
    .map(getGuide)
    .filter((guide): guide is Guide => Boolean(guide));
}
