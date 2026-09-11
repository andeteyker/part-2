"use client";

import { useCallback, useEffect, useState } from "react";
import { getGrowthConfig } from "../data/growth";
import { getGrowthFieldHelp, getGrowthResultHelp } from "../data/growth/help";
import type { GrowthField } from "../data/growth/types";
import { useUrlState } from "../hooks/useUrlState";
import { Field, Result, SelectField, fmt, money, number, useCalculationResult } from "./ToolUI";

type Values = Record<string, string>;
type Output = { label: string; value: string; detail?: string; stats?: { label: string; value: string }[] };

function ConnectedField({ field, onValue }: { field: GrowthField; onValue: (key: string, value: string) => void }) {
  const [value, setValue] = useUrlState(field.key, field.defaultValue);
  useEffect(() => onValue(field.key, value), [field.key, onValue, value]);
  const help = getGrowthFieldHelp(field.label);
  if (field.options) return <SelectField label={field.label} help={help} value={value} onChange={setValue} options={field.options} />;
  return <Field label={field.label} help={help} value={value} onChange={setValue} suffix={field.suffix} type={field.type} min={field.min} max={field.max} step={field.step} />;
}

function incomeTax(zveValue: number, year: string) {
  const x = Math.max(0, Math.floor(zveValue));
  if (year === "2026") {
    if (x <= 12348) return 0;
    if (x <= 17799) { const y = (x - 12348) / 10000; return Math.floor((914.51 * y + 1400) * y); }
    if (x <= 69878) { const z = (x - 17799) / 10000; return Math.floor((173.10 * z + 2397) * z + 1034.87); }
    if (x <= 277825) return Math.floor(0.42 * x - 11135.63);
    return Math.floor(0.45 * x - 19470.38);
  }
  if (year === "2024") {
    if (x <= 11604) return 0;
    if (x <= 17005) { const y = (x - 11604) / 10000; return Math.floor((922.98 * y + 1400) * y); }
    if (x <= 66760) { const z = (x - 17005) / 10000; return Math.floor((181.19 * z + 2397) * z + 1025.38); }
    if (x <= 277825) return Math.floor(0.42 * x - 10602.13);
    return Math.floor(0.45 * x - 18936.88);
  }
  if (x <= 12096) return 0;
  if (x <= 17443) { const y = (x - 12096) / 10000; return Math.floor((932.30 * y + 1400) * y); }
  if (x <= 68480) { const z = (x - 17443) / 10000; return Math.floor((176.64 * z + 2397) * z + 1015.13); }
  if (x <= 277825) return Math.floor(0.42 * x - 10911.92);
  return Math.floor(0.45 * x - 19246.67);
}

function simulateLoan(principal: number, annualRate: number, monthlyPayment: number, annualExtra: number) {
  let balance = Math.max(0, principal);
  let interest = 0;
  let months = 0;
  const monthlyRate = Math.max(0, annualRate) / 100 / 12;
  while (balance > 0.01 && months < 1200) {
    const monthlyInterest = balance * monthlyRate;
    if (monthlyPayment <= monthlyInterest && annualExtra <= 0) break;
    interest += monthlyInterest;
    balance += monthlyInterest;
    const payment = Math.min(balance, Math.max(0, monthlyPayment));
    balance -= payment;
    months += 1;
    if (annualExtra > 0 && months % 12 === 0 && balance > 0) balance -= Math.min(balance, annualExtra);
  }
  return { months, interest, balance };
}

function calculate(slug: string, values: Values): Output {
  const n = (key: string) => number(values[key] ?? "0");
  switch (slug) {
    case "netto-gehalt-rechner": { const gross = n("brutto"); const tax = gross * n("lohnsteuer") / 100; const socialRate = n("rente") + n("arbeitslos") + n("kranken") + n("pflege"); const social = gross * socialRate / 100; return { label: "Geschätztes Nettogehalt", value: money(gross - tax - social), detail: `Gesamtabzug ${fmt((tax + social) / Math.max(gross, 1) * 100)} %`, stats: [{ label: "Steuern", value: money(tax) }, { label: "Sozialabgaben", value: money(social) }, { label: "Brutto", value: money(gross) }] }; }
    case "einkommensteuer-rechner": { const zve = n("zve"); const tax = Math.max(0, incomeTax(zve, values.jahr)); const marginal = Math.max(0, (incomeTax(zve + 100, values.jahr) - tax)); return { label: `Tarifliche Einkommensteuer ${values.jahr}`, value: money(tax), detail: `${money(tax / 12)} pro Monat`, stats: [{ label: "Durchschnittssatz", value: `${fmt(tax / Math.max(zve, 1) * 100)} %` }, { label: "Näherungsweiser Grenzsatz", value: `${fmt(marginal)} %` }, { label: "Nach Tarifsteuer", value: money(zve - tax) }] }; }
    case "pendlerpauschale-rechner": { const km = Math.max(0, Math.floor(n("entfernung"))); const daily = values.jahr === "2026" ? km * .38 : Math.min(km, 20) * .30 + Math.max(0, km - 20) * .38; const annual = daily * n("arbeitstage"); return { label: "Entfernungspauschale", value: money(annual), detail: `${money(daily)} je Arbeitstag`, stats: [{ label: "Mögliche Steuerwirkung", value: money(annual * n("steuersatz") / 100) }, { label: "Einfache Entfernung", value: `${km} km` }] }; }
    case "rentenrechner": { const points = n("punkte") + n("jahre") * n("punkte-pro-jahr"); const pension = points * n("rentenwert") * n("zugang"); return { label: "Geschätzte monatliche Bruttorente", value: money(pension), detail: `${fmt(points)} Entgeltpunkte`, stats: [{ label: "Bruttorente pro Jahr", value: money(pension * 12) }, { label: "Zukünftige Punkte", value: fmt(n("jahre") * n("punkte-pro-jahr")) }] }; }
    case "abfindungs-rechner": { const gross = n("monatsgehalt") * n("jahre") * n("faktor"); const tax = gross * n("steuersatz") / 100; return { label: "Abfindung nach Faustformel", value: money(gross), detail: `Geschätzter Nettobetrag ${money(gross - tax)}`, stats: [{ label: "Steuerschätzung", value: money(tax) }, { label: "Faktor", value: fmt(n("faktor")) }] }; }
    case "bauspar-rechner": { const target = n("bausparsumme") * n("ansparquote") / 100; const missing = Math.max(0, target - n("guthaben")); const months = n("sparrate") > 0 ? Math.ceil(missing / n("sparrate")) : 0; return { label: "Rechnerische Zeit bis Zielguthaben", value: missing <= 0 ? "Zielguthaben erreicht" : `${months} Monate`, detail: missing > 0 ? `Noch ${money(missing)} anzusparen` : undefined, stats: [{ label: "Zielguthaben", value: money(target) }, { label: "Möglicher Darlehensanteil", value: money(n("bausparsumme") - target) }] }; }
    case "haushaltsbudget-rechner": { const expenses = n("wohnen") + n("mobilitaet") + n("vertraege") + n("leben") + n("sparen"); const free = n("netto") - expenses; return { label: "Freies Monatsbudget", value: money(free), detail: `${fmt(free / Math.max(n("netto"), 1) * 100)} % des Nettoeinkommens frei`, stats: [{ label: "Verplante Ausgaben", value: money(expenses) }, { label: "Sparrate", value: `${fmt(n("sparen") / Math.max(n("netto"), 1) * 100)} %` }, { label: "Jährlicher Puffer", value: money(free * 12) }] }; }
    case "kredit-sondertilgung-rechner": { const normal = simulateLoan(n("kredit"), n("zins"), n("rate"), 0); const extra = simulateLoan(n("kredit"), n("zins"), n("rate"), n("sonder")); const savedMonths = Math.max(0, normal.months - extra.months); return { label: "Geschätzte Zinsersparnis", value: money(Math.max(0, normal.interest - extra.interest)), detail: savedMonths > 0 ? `${savedMonths} Monate kürzere Laufzeit` : "Keine Laufzeitverkürzung unter diesen Annahmen", stats: [{ label: "Laufzeit mit Sondertilgung", value: `${Math.floor(extra.months / 12)} J. ${extra.months % 12} Mon.` }, { label: "Ohne Sondertilgung", value: `${Math.floor(normal.months / 12)} J. ${normal.months % 12} Mon.` }, { label: "Zinsen mit Sondertilgung", value: money(extra.interest) }] }; }
    case "fahrtkosten-rechner": { const km = n("strecke") * n("fahrten"); const fuel = km * n("verbrauch") / 100 * n("preis"); const other = km * n("sonstige"); const total = fuel + other; return { label: "Geschätzte Fahrtkosten", value: money(total), detail: `${fmt(km)} km Gesamtstrecke`, stats: [{ label: "Kraftstoff", value: money(fuel) }, { label: "Sonstige Autokosten", value: money(other) }, { label: "Kosten pro km", value: money(total / Math.max(km, 1)) }] }; }
    case "stromkosten-rechner": { const kwh = n("leistung") / 1000 * n("stunden") * n("tage"); const cost = kwh * n("preis"); return { label: "Stromkosten pro Jahr", value: money(cost), detail: `${fmt(kwh)} kWh Jahresverbrauch`, stats: [{ label: "Pro Monat", value: money(cost / 12) }, { label: "Pro Nutzungstag", value: money(cost / Math.max(n("tage"), 1)) }] }; }
    case "heizkosten-rechner": { const cost = n("verbrauch") * n("preis") + n("grundpreis"); return { label: "Heizkosten pro Jahr", value: money(cost), detail: `${money(cost / 12)} pro Monat`, stats: [{ label: "Verbrauch je m²", value: `${fmt(n("verbrauch") / Math.max(n("wohnflaeche"), 1))} kWh` }, { label: "Kosten je m²", value: money(cost / Math.max(n("wohnflaeche"), 1)) }] }; }
    case "gasverbrauch-rechner": { const kwh = n("kubikmeter") * n("brennwert") * n("zustandszahl"); const cost = kwh * n("preis") + n("grundpreis"); return { label: "Geschätzte Gaskosten", value: money(cost), detail: `${fmt(kwh)} kWh aus ${fmt(n("kubikmeter"))} m³`, stats: [{ label: "Arbeitspreis gesamt", value: money(kwh * n("preis")) }, { label: "Pro Monat", value: money(cost / 12) }] }; }
    case "solar-ertrag-rechner": { const yieldKwh = n("leistung") * n("spezifischer-ertrag"); const own = yieldKwh * n("eigenverbrauch") / 100; const feed = yieldKwh - own; const benefit = own * n("strompreis") + feed * n("einspeisung"); return { label: "Jährlicher finanzieller Nutzen", value: money(benefit), detail: `${fmt(yieldKwh)} kWh geschätzter Jahresertrag`, stats: [{ label: "Eigenverbrauch", value: `${fmt(own)} kWh` }, { label: "Einspeisung", value: `${fmt(feed)} kWh` }, { label: "Einfache Amortisation", value: benefit > 0 ? `${fmt(n("investition") / benefit, 1)} Jahre` : "–" }] }; }
    case "balkonkraftwerk-rechner": { const yieldKwh = n("leistung") * n("ertrag"); const own = yieldKwh * n("eigenverbrauch") / 100; const saving = own * n("strompreis"); return { label: "Stromkostenersparnis pro Jahr", value: money(saving), detail: `${fmt(yieldKwh)} kWh geschätzter Jahresertrag`, stats: [{ label: "Direkt selbst genutzt", value: `${fmt(own)} kWh` }, { label: "Einfache Amortisation", value: saving > 0 ? `${fmt(n("investition") / saving, 1)} Jahre` : "–" }, { label: "Ersparnis in 10 Jahren", value: money(saving * 10) }] }; }
    case "bmi-rechner": { const bmi = n("gewicht") / Math.pow(n("groesse") / 100, 2); const range = bmi < 18.5 ? "unterhalb des üblichen Normalbereichs" : bmi < 25 ? "im üblichen Normalbereich" : bmi < 30 ? "oberhalb des üblichen Normalbereichs" : "deutlich oberhalb des üblichen Normalbereichs"; return { label: "Body-Mass-Index", value: fmt(bmi, 1), detail: range, stats: [{ label: "Normalbereich für diese Größe", value: `${fmt(18.5 * Math.pow(n("groesse") / 100, 2), 1)}–${fmt(24.9 * Math.pow(n("groesse") / 100, 2), 1)} kg` }] }; }
    case "kalorienbedarf-rechner": { const male = values.geschlecht === "m"; const bmr = male ? 88.362 + 13.397 * n("gewicht") + 4.799 * n("groesse") - 5.677 * n("alter") : 447.593 + 9.247 * n("gewicht") + 3.098 * n("groesse") - 4.330 * n("alter"); return { label: "Geschätzter täglicher Gesamtbedarf", value: `${fmt(bmr * n("aktivitaet"), 0)} kcal`, detail: `Grundumsatz rund ${fmt(bmr, 0)} kcal`, stats: [{ label: "Pro Woche", value: `${fmt(bmr * n("aktivitaet") * 7, 0)} kcal` }, { label: "Aktivitätsfaktor", value: fmt(n("aktivitaet"), 3) }] }; }
    case "koerperfett-anteil-rechner": { const inch = (x: number) => x / 2.54; const male = values.geschlecht === "m"; const estimate = male ? 86.010 * Math.log10(Math.max(.1, inch(n("taille") - n("nacken")))) - 70.041 * Math.log10(inch(n("groesse"))) + 36.76 : 163.205 * Math.log10(Math.max(.1, inch(n("taille") + n("huefte") - n("nacken")))) - 97.684 * Math.log10(inch(n("groesse"))) - 78.387; return { label: "Geschätzter Körperfettanteil", value: `${fmt(Math.max(0, estimate), 1)} %`, detail: "Umfangsmethode nach US-Navy-Formel", stats: [{ label: "Verwendete Formel", value: male ? "Männer" : "Frauen" }] }; }
    case "idealgewicht-rechner": { const h = n("groesse") / 100; const low = 18.5 * h * h; const high = 24.9 * h * h; const broca = Math.max(0, n("groesse") - 100) * (values.geschlecht === "m" ? .9 : .85); return { label: "BMI-Orientierungsbereich", value: `${fmt(low, 1)}–${fmt(high, 1)} kg`, detail: "BMI 18,5 bis 24,9 für Erwachsene", stats: [{ label: "Broca-Orientierungswert", value: `${fmt(broca, 1)} kg` }] }; }
    case "elterngeld-rechner": { const loss = Math.max(0, n("netto-vorher") - n("netto-nachher")); const benefit = Math.min(1800, Math.max(300, loss * n("ersatzrate") / 100)); return { label: "Geschätztes Basiselterngeld", value: money(benefit), detail: `${fmt(n("ersatzrate"))} % des eingegebenen Einkommensverlusts`, stats: [{ label: "Einkommensverlust", value: money(loss) }, { label: "Für 12 Monate", value: money(benefit * 12) }] }; }
    case "kindergeld-rechner": { const monthly = n("kinder") * n("betrag"); return { label: "Kindergeld pro Monat", value: money(monthly), detail: `${fmt(n("kinder"), 0)} Kinder × ${money(n("betrag"))}`, stats: [{ label: "Gesamtbetrag", value: money(monthly * n("monate")) }, { label: "Bezugsdauer", value: `${fmt(n("monate"), 0)} Monate` }] }; }
    case "schwangerschafts-terminrechner": { const start = new Date(`${values["letzte-periode"]}T12:00:00`); const due = new Date(start); due.setDate(due.getDate() + 280 + n("zyklus") - 28); const elapsed = Math.max(0, Math.floor((Date.now() - start.getTime()) / 86400000)); return { label: "Voraussichtlicher Geburtstermin", value: due.toLocaleDateString("de-DE"), detail: `Rechnerisch SSW ${Math.floor(elapsed / 7) + 1}+${elapsed % 7}`, stats: [{ label: "Schwangerschaftsdauer", value: "40 Wochen" }, { label: "Verbleibend bis ET", value: `${Math.max(0, Math.ceil((due.getTime() - Date.now()) / 86400000))} Tage` }] }; }
    case "urlaubsanspruch-rechner": { const annual = n("vollzeit-urlaub") / Math.max(n("vollzeit-tage"), 1) * n("eigene-tage"); const proportional = annual * Math.min(12, n("monate")) / 12; const minimum = 24 / 6 * n("eigene-tage") * Math.min(12, n("monate")) / 12; return { label: "Rechnerischer Urlaubsanspruch", value: `${fmt(proportional, 2)} Tage`, detail: `Ganzjährig ${fmt(annual, 2)} Tage`, stats: [{ label: "Zeitanteiliger Mindesturlaub", value: `${fmt(minimum, 2)} Tage` }, { label: "Arbeitstage pro Woche", value: fmt(n("eigene-tage"), 0) }] }; }
    case "angebots-kalkulation": { const costs = n("material") + n("stunden") * n("stundensatz") + n("gemeinkosten"); const net = costs * (1 + n("gewinn") / 100); const gross = net * (1 + n("mwst") / 100); return { label: "Brutto-Angebotspreis", value: money(gross), detail: `${money(net)} netto`, stats: [{ label: "Selbstkosten", value: money(costs) }, { label: "Kalkulierter Gewinn", value: money(net - costs) }, { label: "Marge auf Nettoerlös", value: `${fmt((net - costs) / Math.max(net, 1) * 100)} %` }] }; }
    case "selbststaendig-stundensatz-rechner": { const base = n("lohn") + n("betrieb") + n("ruecklage"); const revenue = base * (1 + n("gewinn") / 100); const rate = revenue / Math.max(n("stunden"), 1); return { label: "Erforderlicher Netto-Stundensatz", value: money(rate), detail: `${money(revenue)} benötigter Jahresumsatz`, stats: [{ label: "Kosten & Unternehmerlohn", value: money(base) }, { label: "Gewinnaufschlag", value: money(revenue - base) }, { label: "Abrechenbare Stunden", value: `${fmt(n("stunden"), 0)} Std.` }] }; }
    case "umzugskosten-rechner": { const base = n("fahrzeug") + n("helfer") + n("material") + n("renovierung") + n("entfernung") * n("km-preis"); const own = base * (1 + n("reserve") / 100); const difference = n("firma") - own; return { label: "Geschätzter Eigenumzug", value: money(own), detail: `Inklusive ${fmt(n("reserve"))} % Reserve`, stats: [{ label: "Firmenangebot", value: money(n("firma")) }, { label: difference >= 0 ? "Mögliche Ersparnis" : "Firma günstiger", value: money(Math.abs(difference)) }] }; }
    default: return { label: "Ergebnis", value: "–" };
  }
}

export function GrowthToolRunner({ slug }: { slug: string }) {
  const config = getGrowthConfig(slug);
  const [values, setValues] = useState<Values>(() => Object.fromEntries(config?.fields.map((field) => [field.key, field.defaultValue]) ?? []));
  const updateValue = useCallback((key: string, value: string) => setValues((current) => current[key] === value ? current : { ...current, [key]: value }), []);
  const output = calculate(slug, values);
  useCalculationResult(slug, `${output.value} – ${output.label}`);
  if (!config) return null;
  return <div className="tool-surface">
    <div className="field-grid two">{config.fields.map((field) => <ConnectedField field={field} onValue={updateValue} key={field.key} />)}</div>
    {output.stats && <div className={`stats-grid ${output.stats.length === 3 ? "three" : ""}`}>{output.stats.map((stat) => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div>}
    <Result label={output.label} value={output.value} detail={output.detail} help={getGrowthResultHelp(slug)} />
    <p className="form-hint">{config.notice}</p>
  </div>;
}
