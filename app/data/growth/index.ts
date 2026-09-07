import { nettoGehaltConfig } from "./netto-gehalt-rechner";
import { einkommensteuerConfig } from "./einkommensteuer-rechner";
import { pendlerpauschaleConfig } from "./pendlerpauschale-rechner";
import { rentenConfig } from "./rentenrechner";
import { abfindungConfig } from "./abfindungs-rechner";
import { bausparConfig } from "./bauspar-rechner";
import { stromkostenConfig } from "./stromkosten-rechner";
import { heizkostenConfig } from "./heizkosten-rechner";
import { gasverbrauchConfig } from "./gasverbrauch-rechner";
import { solarErtragConfig } from "./solar-ertrag-rechner";
import { bmiConfig } from "./bmi-rechner";
import { kalorienbedarfConfig } from "./kalorienbedarf-rechner";
import { koerperfettConfig } from "./koerperfett-anteil-rechner";
import { idealgewichtConfig } from "./idealgewicht-rechner";
import { elterngeldConfig } from "./elterngeld-rechner";
import { kindergeldConfig } from "./kindergeld-rechner";
import { schwangerschaftConfig } from "./schwangerschafts-terminrechner";
import { urlaubsanspruchConfig } from "./urlaubsanspruch-rechner";
import { angebotConfig } from "./angebots-kalkulation";
import { umzugskostenConfig } from "./umzugskosten-rechner";
import type { GrowthCategory, GrowthToolConfig } from "./types";

export const growthConfigs: GrowthToolConfig[] = [nettoGehaltConfig, einkommensteuerConfig, pendlerpauschaleConfig, rentenConfig, abfindungConfig, bausparConfig, stromkostenConfig, heizkostenConfig, gasverbrauchConfig, solarErtragConfig, bmiConfig, kalorienbedarfConfig, koerperfettConfig, idealgewichtConfig, elterngeldConfig, kindergeldConfig, schwangerschaftConfig, urlaubsanspruchConfig, angebotConfig, umzugskostenConfig];
export const growthTools = growthConfigs.map(({ tool }) => tool);
export const growthToolSeo = Object.fromEntries(growthConfigs.map(({ tool, seo }) => [tool.slug, seo]));
export const getGrowthConfig = (slug: string) => growthConfigs.find(({ tool }) => tool.slug === slug);
export const growthCategories: GrowthCategory[] = ["Finanzen & Steuern", "Energie & Umwelt", "Gesundheit & Fitness", "Familie & Leben", "Arbeitgeber & Business"];
export const growthCategoryDetails: Record<GrowthCategory, { slug: string; kicker: string; description: string; icon: string }> = {
  "Finanzen & Steuern": { slug: "finanzen-steuern", kicker: "Gehalt, Steuer und Vorsorge", description: "Rechner für Nettogehalt, Einkommensteuer, Arbeitsweg, Rente, Abfindung und Bausparen.", icon: "€+" },
  "Energie & Umwelt": { slug: "energie-umwelt", kicker: "Verbrauch, Kosten und Solarstrom", description: "Strom-, Heiz- und Gaskosten berechnen sowie Photovoltaik-Ertrag und Amortisation planen.", icon: "kWh" },
  "Gesundheit & Fitness": { slug: "gesundheit-fitness", kicker: "Körperwerte verständlich einordnen", description: "BMI, Kalorienbedarf, Körperfett und Gewichtsbereiche als unverbindliche Orientierung berechnen.", icon: "BMI" },
  "Familie & Leben": { slug: "familie-leben", kicker: "Leistungen und wichtige Termine", description: "Elterngeld, Kindergeld und den voraussichtlichen Geburtstermin übersichtlich schätzen.", icon: "Fam" },
  "Arbeitgeber & Business": { slug: "arbeitgeber-business", kicker: "Arbeit, Angebote und Projekte", description: "Urlaubsanspruch, Angebotskalkulation und Umzugskosten transparent planen und vergleichen.", icon: "Biz" },
};

export type { GrowthCategory, GrowthToolConfig } from "./types";
