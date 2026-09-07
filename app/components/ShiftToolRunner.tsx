"use client";

import { NumberField as Field, Result, SelectField, fmt, money, number, useCalculationResult } from "./ToolUI";
import { useUrlState } from "../hooks/useUrlState";

function PremiumSummary({ hourly, hours, actualRate, taxRate }: { hourly: number; hours: number; actualRate: number; taxRate: number }) {
  const premium = hourly * hours * actualRate / 100;
  const taxFreeLimit = Math.min(hourly, 50) * hours * taxRate / 100;
  const svFreeLimit = Math.min(hourly, 25) * hours * taxRate / 100;
  const withinTaxLimit = Math.min(premium, taxFreeLimit);
  const aboveTaxLimit = Math.max(0, premium - taxFreeLimit);
  return <><div className="stats-grid three"><div><strong>{money(premium)}</strong><span>Zuschlag gesamt</span></div><div><strong>{money(withinTaxLimit)}</strong><span>Innerhalb § 3b-Höchstgrenze</span></div><div><strong>{money(aboveTaxLimit)}</strong><span>Oberhalb der Höchstgrenze</span></div></div><Result label="Sozialversicherungsfreie Höchstgrenze" value={money(Math.min(premium, svFreeLimit))} detail="Bei Vorliegen aller Voraussetzungen; Grundlohn hierfür höchstens 25 €/h." /><p className="form-hint">Steuerlich wird der Grundlohn für § 3b EStG höchstens mit 50 €/h angesetzt. Für die Sozialversicherung gilt bei SFN-Zuschlägen eine niedrigere Grundlohngrenze von 25 €/h. Der Rechner prüft keine individuelle Abrechnung.</p></>;
}

function NightPremiumTool() {
  const [hourly, setHourly] = useUrlState("stundenlohn", "20");
  const [hours, setHours] = useUrlState("nachtstunden", "40");
  const [actualRate, setActualRate] = useUrlState("nachtzuschlag", "25");
  const [taxRate, setTaxRate] = useUrlState("steuergrenze", "25");
  useCalculationResult("nachtzuschlag-rechner", `${money(number(hourly) * number(hours) * number(actualRate) / 100)} Nachtzuschlag`);
  return <><div className="field-grid two"><Field label="Grundlohn pro Stunde" value={hourly} onChange={setHourly} suffix="€/h" /><Field label="Nachtstunden" value={hours} onChange={setHours} suffix="Std." /><Field label="Zuschlag laut Vertrag/Tarif" value={actualRate} onChange={setActualRate} suffix="%" /><SelectField label="Steuerliche Vergleichsgrenze" value={taxRate} onChange={setTaxRate} options={[{ value: "25", label: "25 % – reguläre Nachtarbeit" }, { value: "40", label: "40 % – 0 bis 4 Uhr bei vor Mitternacht begonnener Nachtarbeit" }]} /></div><PremiumSummary hourly={number(hourly)} hours={number(hours)} actualRate={number(actualRate)} taxRate={number(taxRate)} /></>;
}

function SundayPremiumTool() {
  const [hourly, setHourly] = useUrlState("stundenlohn", "20");
  const [hours, setHours] = useUrlState("sonntagsstunden", "16");
  const [actualRate, setActualRate] = useUrlState("sonntagszuschlag", "50");
  useCalculationResult("sonntagszuschlag-rechner", `${money(number(hourly) * number(hours) * number(actualRate) / 100)} Sonntagszuschlag`);
  return <><div className="field-grid three"><Field label="Grundlohn pro Stunde" value={hourly} onChange={setHourly} suffix="€/h" /><Field label="Sonntagsstunden" value={hours} onChange={setHours} suffix="Std." /><Field label="Zuschlag laut Vertrag/Tarif" value={actualRate} onChange={setActualRate} suffix="%" /></div><PremiumSummary hourly={number(hourly)} hours={number(hours)} actualRate={number(actualRate)} taxRate={50} /></>;
}

function HolidayPremiumTool() {
  const [hourly, setHourly] = useUrlState("stundenlohn", "20");
  const [hours, setHours] = useUrlState("feiertagsstunden", "8");
  const [actualRate, setActualRate] = useUrlState("feiertagszuschlag", "125");
  const [taxRate, setTaxRate] = useUrlState("steuergrenze", "125");
  useCalculationResult("feiertagszuschlag-rechner", `${money(number(hourly) * number(hours) * number(actualRate) / 100)} Feiertagszuschlag`);
  return <><div className="field-grid two"><Field label="Grundlohn pro Stunde" value={hourly} onChange={setHourly} suffix="€/h" /><Field label="Feiertagsstunden" value={hours} onChange={setHours} suffix="Std." /><Field label="Zuschlag laut Vertrag/Tarif" value={actualRate} onChange={setActualRate} suffix="%" /><SelectField label="Steuerliche Vergleichsgrenze" value={taxRate} onChange={setTaxRate} options={[{ value: "125", label: "125 % – gesetzlicher Feiertag / 31.12. ab 14 Uhr" }, { value: "150", label: "150 % – 24.12. ab 14 Uhr, 25./26.12. oder 1. Mai" }]} /></div><PremiumSummary hourly={number(hourly)} hours={number(hours)} actualRate={number(actualRate)} taxRate={number(taxRate)} /></>;
}

function OvertimeTool() {
  const [hourly, setHourly] = useUrlState("stundenlohn", "20");
  const [hours, setHours] = useUrlState("ueberstunden", "10");
  const [rate, setRate] = useUrlState("zuschlag", "25");
  const base = number(hourly) * number(hours);
  const premium = base * number(rate) / 100;
  const total = base + premium;
  const timeOff = number(hours) * (1 + number(rate) / 100);
  useCalculationResult("ueberstunden-rechner", `${money(total)} Überstundenvergütung`);
  return <><div className="field-grid three"><Field label="Stundenlohn" value={hourly} onChange={setHourly} suffix="€/h" /><Field label="Überstunden" value={hours} onChange={setHours} suffix="Std." /><Field label="Überstundenzuschlag" value={rate} onChange={setRate} suffix="%" /></div><div className="stats-grid three"><div><strong>{money(base)}</strong><span>Grundvergütung</span></div><div><strong>{money(premium)}</strong><span>Zuschlag</span></div><div><strong>{money(total)}</strong><span>Gesamt bei Auszahlung</span></div></div><Result label="Alternativer Freizeitausgleich" value={`${fmt(timeOff, 2)} Std.`} detail="Nur als mathematische Entsprechung; maßgeblich sind die betrieblichen bzw. vertraglichen Regeln." /></>;
}

function ShiftWageTool() {
  const [hourly, setHourly] = useUrlState("stundenlohn", "20");
  const [regularHours, setRegularHours] = useUrlState("stunden", "160");
  const [nightHours, setNightHours] = useUrlState("nachtstunden", "40");
  const [nightRate, setNightRate] = useUrlState("nachtzuschlag", "25");
  const [sundayHours, setSundayHours] = useUrlState("sonntagsstunden", "16");
  const [sundayRate, setSundayRate] = useUrlState("sonntagszuschlag", "50");
  const [holidayHours, setHolidayHours] = useUrlState("feiertagsstunden", "8");
  const [holidayRate, setHolidayRate] = useUrlState("feiertagszuschlag", "125");
  const h = number(hourly);
  const base = h * number(regularHours);
  const night = h * number(nightHours) * number(nightRate) / 100;
  const sunday = h * number(sundayHours) * number(sundayRate) / 100;
  const holiday = h * number(holidayHours) * number(holidayRate) / 100;
  const totalPremiums = night + sunday + holiday;
  const gross = base + totalPremiums;
  useCalculationResult("schichtlohn-rechner", `${money(gross)} Brutto inklusive Zuschläge`);

  return <><div className="field-grid two"><Field label="Grundlohn pro Stunde" value={hourly} onChange={setHourly} suffix="€/h" /><Field label="Bezahlte Stunden gesamt" value={regularHours} onChange={setRegularHours} suffix="Std." /><Field label="Nachtstunden" value={nightHours} onChange={setNightHours} suffix="Std." /><Field label="Nachtzuschlag" value={nightRate} onChange={setNightRate} suffix="%" /><Field label="Sonntagsstunden" value={sundayHours} onChange={setSundayHours} suffix="Std." /><Field label="Sonntagszuschlag" value={sundayRate} onChange={setSundayRate} suffix="%" /><Field label="Feiertagsstunden" value={holidayHours} onChange={setHolidayHours} suffix="Std." /><Field label="Feiertagszuschlag" value={holidayRate} onChange={setHolidayRate} suffix="%" /></div><div className="stats-grid three"><div><strong>{money(base)}</strong><span>Grundlohn</span></div><div><strong>{money(totalPremiums)}</strong><span>Zuschläge gesamt</span></div><div><strong>{money(gross)}</strong><span>Brutto vor weiteren Bestandteilen</span></div></div><div className="stats-grid three"><div><strong>{money(night)}</strong><span>Nachtzuschläge</span></div><div><strong>{money(sunday)}</strong><span>Sonntagszuschläge</span></div><div><strong>{money(holiday)}</strong><span>Feiertagszuschläge</span></div></div><p className="form-hint">Die Zuschlagssätze sind frei einstellbar. Der Rechner addiert die Beträge mathematisch; ob Zuschläge kumuliert werden dürfen und wie sie steuerlich behandelt werden, richtet sich nach den konkreten Regeln und der tatsächlichen Arbeitszeit.</p></>;
}

export function ShiftToolRunner({ slug }: { slug: string }) {
  const content: Record<string, React.ReactNode> = {
    "schichtlohn-rechner": <ShiftWageTool />,
    "nachtzuschlag-rechner": <NightPremiumTool />,
    "sonntagszuschlag-rechner": <SundayPremiumTool />,
    "feiertagszuschlag-rechner": <HolidayPremiumTool />,
    "ueberstunden-rechner": <OvertimeTool />,
  };
  return <div className="tool-surface">{content[slug]}</div>;
}
