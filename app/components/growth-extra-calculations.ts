import { fmt, money, number } from "./ToolUI";

type Values = Record<string, string>;
type Output = { label: string; value: string; detail?: string; stats?: { label: string; value: string }[] };

export function calculateExtraGrowth(slug: string, values: Values): Output | null {
  const n = (key: string) => number(values[key] ?? "0");

  switch (slug) {
    case "arbeitslosengeld-rechner": {
      const rate = values.kind === "ja" ? 0.67 : 0.60;
      const monthly = n("netto") * rate;
      return { label: "Geschätztes Arbeitslosengeld I", value: money(monthly), detail: `${fmt(rate * 100, 0)} % des eingegebenen Leistungsentgelts`, stats: [{ label: "Pro Jahr", value: money(monthly * 12) }, { label: "Leistungssatz", value: `${fmt(rate * 100, 0)} %` }] };
    }
    case "leasingfaktor-rechner": {
      const list = Math.max(n("listenpreis"), 1);
      const months = Math.max(n("laufzeit"), 1);
      const rate = n("rate");
      const extra = n("sonder") + n("bereitstellung");
      const factor = rate / list * 100;
      const effective = (rate * months + extra) / months;
      const totalFactor = effective / list * 100;
      return { label: "Leasingfaktor", value: `${fmt(factor, 2)} %`, detail: `Effektive Monatsbelastung ${money(effective)}`, stats: [{ label: "Gesamtkostenfaktor", value: `${fmt(totalFactor, 2)} %` }, { label: "Gesamte Leasingkosten", value: money(rate * months + extra) }, { label: "Einmalkosten", value: money(extra) }] };
    }
    case "skonto-rechner": {
      const amount = n("betrag");
      const discount = amount * n("skonto") / 100;
      const pay = amount - discount;
      const days = Math.max(1, n("zahlungsziel") - n("skontofrist"));
      const annualized = pay > 0 ? discount / pay * 360 / days * 100 : 0;
      return { label: "Zahlbetrag mit Skonto", value: money(pay), detail: `${money(discount)} Ersparnis`, stats: [{ label: "Skontobetrag", value: money(discount) }, { label: "Vereinfachter Jahresvergleich", value: `${fmt(annualized, 1)} %` }, { label: "Früher bezahlt", value: `${fmt(days, 0)} Tage` }] };
    }
    case "mietkaution-rechner": {
      const deposit = n("kaltmiete") * Math.min(3, Math.max(0, n("monate")));
      return { label: "Mietkaution", value: money(deposit), detail: `Bei drei Teilzahlungen ${money(deposit / 3)} je Rate`, stats: [{ label: "Nettokaltmiete", value: money(n("kaltmiete")) }, { label: "Kautionsmieten", value: fmt(Math.min(3, Math.max(0, n("monate"))), 1) }] };
    }
    case "zinseszins-rechner": {
      const months = Math.max(0, Math.round(n("jahre") * 12));
      const monthlyRate = n("rendite") / 100 / 12;
      const growth = Math.pow(1 + monthlyRate, months);
      const startFuture = n("start") * growth;
      const savingsFuture = monthlyRate === 0 ? n("rate") * months : n("rate") * ((growth - 1) / monthlyRate);
      const total = startFuture + savingsFuture;
      const paid = n("start") + n("rate") * months;
      return { label: "Geschätztes Endkapital", value: money(total), detail: `${money(Math.max(0, total - paid))} rechnerischer Ertrag`, stats: [{ label: "Einzahlungen", value: money(paid) }, { label: "Rechnerischer Ertrag", value: money(total - paid) }, { label: "Laufzeit", value: `${fmt(n("jahre"), 0)} Jahre` }] };
    }
    case "energie-abschlag-rechner": {
      const annual = n("verbrauch") * n("preis") + n("grundpreis");
      const buffered = annual * (1 + n("puffer") / 100);
      return { label: "Empfohlener Monatsabschlag", value: money(buffered / 12), detail: `${money(buffered)} erwartete Jahreskosten inkl. Puffer`, stats: [{ label: "Ohne Puffer", value: money(annual / 12) }, { label: "Puffer", value: money(buffered - annual) }, { label: "Jahreskosten", value: money(buffered) }] };
    }
    case "haushaltsgeraete-kosten-rechner": {
      const electricity = n("verbrauch") * n("strompreis") * n("jahre");
      const total = n("kaufpreis") + electricity;
      return { label: "Gesamtkosten", value: money(total), detail: `Über ${fmt(n("jahre"), 0)} Jahre`, stats: [{ label: "Kaufpreis", value: money(n("kaufpreis")) }, { label: "Stromkosten", value: money(electricity) }, { label: "Pro Nutzungsjahr", value: money(total / Math.max(n("jahre"), 1)) }] };
    }
    case "co2-heizkosten-rechner": {
      const tonnes = n("verbrauch") * n("emission") / 1000;
      const cost = tonnes * n("co2preis");
      return { label: "Geschätzte CO₂-Kosten pro Jahr", value: money(cost), detail: `${fmt(tonnes, 2)} t CO₂`, stats: [{ label: "CO₂-Ausstoß", value: `${fmt(tonnes, 2)} t` }, { label: "CO₂-Preis", value: `${money(n("co2preis"))}/t` }, { label: "Pro Monat", value: money(cost / 12) }] };
    }
    case "anhalteweg-rechner": {
      const base = n("tempo") / 10;
      const reaction = base * 3 * n("reaktion");
      const normalBrake = base * base;
      const brake = values.bremsart === "gefahr" ? normalBrake / 2 : normalBrake;
      const total = reaction + brake;
      return { label: "Anhalteweg", value: `${fmt(total, 1)} m`, detail: `${fmt(reaction, 1)} m Reaktionsweg + ${fmt(brake, 1)} m Bremsweg`, stats: [{ label: "Reaktionsweg", value: `${fmt(reaction, 1)} m` }, { label: "Bremsweg", value: `${fmt(brake, 1)} m` }, { label: "Bremsart", value: values.bremsart === "gefahr" ? "Gefahrenbremsung" : "Normal" }] };
    }
    case "eauto-verbrenner-kosten-rechner": {
      const ev100 = n("evverbrauch") * n("strompreis");
      const ice100 = n("verbrauch") * n("spritpreis");
      const factor = n("km") / 100;
      const evYear = ev100 * factor;
      const iceYear = ice100 * factor;
      const saving = iceYear - evYear;
      return { label: saving >= 0 ? "E-Auto Energiekosten-Vorteil" : "Verbrenner Energiekosten-Vorteil", value: money(Math.abs(saving)), detail: `Differenz pro Jahr bei ${fmt(n("km"), 0)} km`, stats: [{ label: "E-Auto/Jahr", value: money(evYear) }, { label: "Verbrenner/Jahr", value: money(iceYear) }, { label: "Differenz je 100 km", value: money(Math.abs(ice100 - ev100)) }] };
    }
    default:
      return null;
  }
}
