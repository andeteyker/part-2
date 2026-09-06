"use client";

import { useState } from "react";
import { NumberField as Field, Result, fmt, money, number as num } from "./ToolUI";

function RoofCostTool() {
  const [area, setArea] = useState("140");
  const [unitPrice, setUnitPrice] = useState("180");
  const [extras, setExtras] = useState("3500");
  const [reserve, setReserve] = useState("10");
  const base = num(area) * num(unitPrice) + num(extras);
  const buffer = base * num(reserve) / 100;
  const total = base + buffer;
  return <><div className="field-grid two"><Field label="Dachfläche" value={area} onChange={setArea} suffix="m²" /><Field label="Preis pro m²" value={unitPrice} onChange={setUnitPrice} suffix="€/m²" /><Field label="Zusatzkosten (Gerüst, Entsorgung etc.)" value={extras} onChange={setExtras} suffix="€" /><Field label="Sicherheitspuffer" value={reserve} onChange={setReserve} suffix="%" /></div><div className="stats-grid three"><div><strong>{money(num(area) * num(unitPrice))}</strong><span>Flächenkosten</span></div><div><strong>{money(num(extras))}</strong><span>Zusatzkosten</span></div><div><strong>{money(buffer)}</strong><span>Puffer</span></div></div><Result label="Geschätzte Gesamtkosten" value={money(total)} detail={`${fmt(num(area))} m² × ${money(num(unitPrice))} je m² plus Zusatzkosten`} /><p className="form-hint">Einheitspreise und Zusatzkosten sind frei anpassbar. Dachform, Material, Dämmung, Gerüst und Schadstoffsanierung können den tatsächlichen Preis stark verändern.</p></>;
}

function BathroomCostTool() {
  const [area, setArea] = useState("8");
  const [surfacePrice, setSurfacePrice] = useState("900");
  const [sanitary, setSanitary] = useState("4500");
  const [installation, setInstallation] = useState("3500");
  const [reserve, setReserve] = useState("12");
  const base = num(area) * num(surfacePrice) + num(sanitary) + num(installation);
  const buffer = base * num(reserve) / 100;
  return <><div className="field-grid two"><Field label="Badfläche" value={area} onChange={setArea} suffix="m²" /><Field label="Ausbaukosten pro m²" value={surfacePrice} onChange={setSurfacePrice} suffix="€/m²" /><Field label="Sanitärobjekte & Möbel" value={sanitary} onChange={setSanitary} suffix="€" /><Field label="Installationen / Leitungen" value={installation} onChange={setInstallation} suffix="€" /><Field label="Sicherheitspuffer" value={reserve} onChange={setReserve} suffix="%" /></div><div className="stats-grid three"><div><strong>{money(num(area) * num(surfacePrice))}</strong><span>Flächenabhängiger Ausbau</span></div><div><strong>{money(num(sanitary) + num(installation))}</strong><span>Ausstattung & Technik</span></div><div><strong>{money(buffer)}</strong><span>Puffer</span></div></div><Result label="Geschätzte Badrenovierung" value={money(base + buffer)} /><p className="form-hint">Die Kalkulation ist als Budgetrahmen gedacht. Abdichtung, Grundrissänderungen, Elektroarbeiten und verdeckte Schäden können zusätzliche Kosten verursachen.</p></>;
}

function WindowCostTool() {
  const [count, setCount] = useState("8");
  const [windowPrice, setWindowPrice] = useState("850");
  const [installPrice, setInstallPrice] = useState("250");
  const [extras, setExtras] = useState("800");
  const total = num(count) * (num(windowPrice) + num(installPrice)) + num(extras);
  return <><div className="field-grid two"><Field label="Anzahl Fenster" value={count} onChange={setCount} suffix="Stk." step="1" /><Field label="Fensterpreis je Stück" value={windowPrice} onChange={setWindowPrice} suffix="€" /><Field label="Einbau je Fenster" value={installPrice} onChange={setInstallPrice} suffix="€" /><Field label="Zusatzkosten" value={extras} onChange={setExtras} suffix="€" /></div><div className="stats-grid three"><div><strong>{money(num(count) * num(windowPrice))}</strong><span>Fenster</span></div><div><strong>{money(num(count) * num(installPrice))}</strong><span>Montage</span></div><div><strong>{money(num(extras))}</strong><span>Zusatzkosten</span></div></div><Result label="Geschätzte Fensterkosten" value={money(total)} detail={`${fmt(num(count), 0)} Fenster inklusive eingegebener Montagekosten`} /><p className="form-hint">Größe, Rahmenmaterial, Verglasung, Rollläden, Ausbau der Altfenster und Anschlussarbeiten beeinflussen den tatsächlichen Angebotspreis.</p></>;
}

function PaintingCostTool() {
  const [wallArea, setWallArea] = useState("180");
  const [unitPrice, setUnitPrice] = useState("16");
  const [prep, setPrep] = useState("900");
  const [material, setMaterial] = useState("500");
  const total = num(wallArea) * num(unitPrice) + num(prep) + num(material);
  return <><div className="field-grid two"><Field label="Zu streichende Fläche" value={wallArea} onChange={setWallArea} suffix="m²" /><Field label="Arbeits-/Komplettpreis pro m²" value={unitPrice} onChange={setUnitPrice} suffix="€/m²" /><Field label="Vorarbeiten (Spachteln, Abkleben etc.)" value={prep} onChange={setPrep} suffix="€" /><Field label="Zusätzliches Material" value={material} onChange={setMaterial} suffix="€" /></div><div className="stats-grid three"><div><strong>{money(num(wallArea) * num(unitPrice))}</strong><span>Flächenkosten</span></div><div><strong>{money(num(prep))}</strong><span>Vorarbeiten</span></div><div><strong>{money(num(material))}</strong><span>Material</span></div></div><Result label="Geschätzte Malerkosten" value={money(total)} /><p className="form-hint">Für einen Angebotsvergleich solltest du prüfen, ob Abdeckarbeiten, Grundierung, Spachtelarbeiten, Farbe und Anfahrt im jeweiligen Einheitspreis enthalten sind.</p></>;
}

function FlooringCostTool() {
  const [area, setArea] = useState("75");
  const [material, setMaterial] = useState("35");
  const [installation, setInstallation] = useState("25");
  const [waste, setWaste] = useState("8");
  const [prep, setPrep] = useState("600");
  const effectiveArea = num(area) * (1 + num(waste) / 100);
  const materialTotal = effectiveArea * num(material);
  const installationTotal = num(area) * num(installation);
  const total = materialTotal + installationTotal + num(prep);
  return <><div className="field-grid two"><Field label="Bodenfläche" value={area} onChange={setArea} suffix="m²" /><Field label="Materialpreis" value={material} onChange={setMaterial} suffix="€/m²" /><Field label="Verlegung" value={installation} onChange={setInstallation} suffix="€/m²" /><Field label="Verschnitt" value={waste} onChange={setWaste} suffix="%" /><Field label="Untergrund / Sockelleisten / Sonstiges" value={prep} onChange={setPrep} suffix="€" /></div><div className="stats-grid three"><div><strong>{money(materialTotal)}</strong><span>Material inkl. Verschnitt</span></div><div><strong>{money(installationTotal)}</strong><span>Verlegung</span></div><div><strong>{money(num(prep))}</strong><span>Zusatzarbeiten</span></div></div><Result label="Geschätzte Bodenverlegung" value={money(total)} detail={`Materialbedarf ca. ${fmt(effectiveArea)} m²`} /><p className="form-hint">Untergrundausgleich, Entfernung des Altbelags, Trittschalldämmung, Sockelleisten und Türanpassungen gegebenenfalls separat berücksichtigen.</p></>;
}

export function HandwerkerToolRunner({ slug }: { slug: string }) {
  const content: Record<string, React.ReactNode> = {
    "dachkosten-rechner": <RoofCostTool />,
    "badrenovierung-rechner": <BathroomCostTool />,
    "fensterkosten-rechner": <WindowCostTool />,
    "malerkosten-rechner": <PaintingCostTool />,
    "bodenverlegung-kosten-rechner": <FlooringCostTool />,
  };
  return <div className="tool-surface">{content[slug]}</div>;
}
