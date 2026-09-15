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
import { haushaltsbudgetConfig } from "./haushaltsbudget-rechner";
import { kreditSondertilgungConfig } from "./kredit-sondertilgung-rechner";
import { balkonkraftwerkConfig } from "./balkonkraftwerk-rechner";
import { fahrtkostenConfig } from "./fahrtkosten-rechner";
import { selbststaendigStundensatzConfig } from "./selbststaendig-stundensatz-rechner";
import { arbeitslosengeldConfig } from "./arbeitslosengeld-rechner";
import { leasingfaktorConfig } from "./leasingfaktor-rechner";
import { skontoConfig } from "./skonto-rechner";
import { mietkautionConfig } from "./mietkaution-rechner";
import { zinseszinsConfig } from "./zinseszins-rechner";
import { energieAbschlagConfig } from "./energie-abschlag-rechner";
import { haushaltsgeraeteKostenConfig } from "./haushaltsgeraete-kosten-rechner";
import { co2HeizkostenConfig } from "./co2-heizkosten-rechner";
import { anhaltewegConfig } from "./anhalteweg-rechner";
import { eautoVerbrennerKostenConfig } from "./eauto-verbrenner-kosten-rechner";
import { erspartesReichweiteConfig } from "./erspartes-reichweite-rechner";
import { nebenkostenVorauszahlungConfig } from "./nebenkosten-vorauszahlung-rechner";
import { powerstationLaufzeitConfig } from "./powerstation-laufzeit-rechner";
import { erhaltungsruecklageConfig } from "./erhaltungsruecklage-rechner";
import { werbungskostenSteuerersparnisConfig } from "./werbungskosten-steuerersparnis-rechner";
import { wallboxLadezeitConfig } from "./wallbox-ladezeit-rechner";
import { heizoelReichweiteConfig } from "./heizoel-reichweite-rechner";
import { hundekostenConfig } from "./hundekosten-rechner";
import { umzugskartonConfig } from "./umzugskarton-rechner";
import { eigenkapitalConfig } from "./eigenkapital-rechner";
import type { GrowthCategory, GrowthToolConfig } from "./types";

export const growthConfigs: GrowthToolConfig[] = [nettoGehaltConfig, einkommensteuerConfig, pendlerpauschaleConfig, werbungskostenSteuerersparnisConfig, arbeitslosengeldConfig, rentenConfig, zinseszinsConfig, erspartesReichweiteConfig, abfindungConfig, bausparConfig, haushaltsbudgetConfig, kreditSondertilgungConfig, leasingfaktorConfig, fahrtkostenConfig, eautoVerbrennerKostenConfig, eigenkapitalConfig, stromkostenConfig, energieAbschlagConfig, haushaltsgeraeteKostenConfig, powerstationLaufzeitConfig, wallboxLadezeitConfig, heizoelReichweiteConfig, heizkostenConfig, co2HeizkostenConfig, gasverbrauchConfig, solarErtragConfig, balkonkraftwerkConfig, bmiConfig, kalorienbedarfConfig, koerperfettConfig, idealgewichtConfig, elterngeldConfig, kindergeldConfig, schwangerschaftConfig, mietkautionConfig, nebenkostenVorauszahlungConfig, hundekostenConfig, anhaltewegConfig, urlaubsanspruchConfig, angebotConfig, skontoConfig, selbststaendigStundensatzConfig, umzugskostenConfig, umzugskartonConfig, erhaltungsruecklageConfig];
export const growthTools = growthConfigs.map(({ tool }) => tool);
export const growthToolSeo = Object.fromEntries(growthConfigs.map(({ tool, seo }) => [tool.slug, seo]));
export const getGrowthConfig = (slug: string) => growthConfigs.find(({ tool }) => tool.slug === slug);
export const growthCategories: GrowthCategory[] = ["Finanzen & Steuern", "Energie & Umwelt", "Gesundheit & Fitness", "Familie & Leben", "Arbeitgeber & Business"];
export const growthCategoryDetails: Record<GrowthCategory, { slug: string; kicker: string; description: string; icon: string }> = {
  "Finanzen & Steuern": { slug: "finanzen-steuern", kicker: "Gehalt, Steuer und Vorsorge", description: "Rechner für Nettogehalt, Einkommensteuer, Werbungskosten, Arbeitsweg, Rücklagen, Eigenkapital, Kredite, Leasing, Fahrzeugkosten, Rente, Abfindung, Bausparen und Eigentümerplanung.", icon: "€+" },
  "Energie & Umwelt": { slug: "energie-umwelt", kicker: "Verbrauch, Kosten und Solarstrom", description: "Strom-, Heiz-, CO₂- und Gaskosten, Heizöl-Reichweite, E-Auto-Ladezeit, Energieabschläge, Gerätekosten und Powerstation-Laufzeiten berechnen sowie Solarstrom planen.", icon: "kWh" },
  "Gesundheit & Fitness": { slug: "gesundheit-fitness", kicker: "Körperwerte verständlich einordnen", description: "BMI, Kalorienbedarf, Körperfett und Gewichtsbereiche als unverbindliche Orientierung berechnen.", icon: "BMI" },
  "Familie & Leben": { slug: "familie-leben", kicker: "Leistungen und wichtige Termine", description: "Elterngeld, Kindergeld, Hundekosten, Mietkaution, Nebenkostenvorauszahlung, Geburtstermin und alltagsnahe Werte wie den Anhalteweg übersichtlich schätzen.", icon: "Fam" },
  "Arbeitgeber & Business": { slug: "arbeitgeber-business", kicker: "Arbeit, Angebote und Projekte", description: "Urlaubsanspruch, Angebotskalkulation, Skonto, Selbstständigen-Stundensatz, Umzugskosten und Kartonbedarf transparent planen und vergleichen.", icon: "Biz" },
};

export type { GrowthCategory, GrowthToolConfig } from "./types";
