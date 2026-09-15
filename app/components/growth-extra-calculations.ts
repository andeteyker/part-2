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
    case "erspartes-reichweite-rechner": {
      const savings = Math.max(0, n("erspartes"));
      const income = n("einnahmen");
      const expenses = n("ausgaben");
      const gap = expenses - income;
      if (gap <= 0) {
        const surplus = Math.abs(gap);
        return { label: "Reichweite der Rücklage", value: "Nicht begrenzt", detail: `Unter diesen Annahmen entsteht ${money(surplus)} monatlicher Überschuss`, stats: [{ label: "Monatlicher Überschuss", value: money(surplus) }, { label: "Erspartes", value: money(savings) }, { label: "Saldo nach 12 Monaten", value: money(savings + surplus * 12) }] };
      }
      const months = savings / gap;
      return { label: "Rechnerische Reichweite", value: `${fmt(months, 1)} Monate`, detail: `${money(gap)} monatliche Finanzierungslücke`, stats: [{ label: "Monatliche Lücke", value: money(gap) }, { label: "Entspricht ungefähr", value: `${fmt(months / 12, 1)} Jahren` }, { label: "Verbrauch der Rücklage/Jahr", value: money(gap * 12) }] };
    }
    case "nebenkosten-vorauszahlung-rechner": {
      const months = Math.min(12, Math.max(1, n("monate")));
      const actual = Math.max(0, n("jahreskosten"));
      const oldMonthly = Math.max(0, n("bisher"));
      const paid = oldMonthly * months;
      const recommended = actual / months;
      const balance = actual - paid;
      const change = recommended - oldMonthly;
      return { label: "Rechnerische neue Vorauszahlung", value: money(recommended), detail: change >= 0 ? `${money(change)} mehr pro Monat` : `${money(Math.abs(change))} weniger pro Monat`, stats: [{ label: "Bisher vorausgezahlt", value: money(paid) }, { label: balance >= 0 ? "Nachzahlung im Zeitraum" : "Guthaben im Zeitraum", value: money(Math.abs(balance)) }, { label: "Monatliche Anpassung", value: `${change >= 0 ? "+" : "−"}${money(Math.abs(change))}` }] };
    }
    case "powerstation-laufzeit-rechner": {
      const capacity = Math.max(0, n("kapazitaet"));
      const load = Math.max(0.01, n("leistung"));
      const efficiency = Math.min(100, Math.max(0, n("wirkungsgrad"))) / 100;
      const dailyHours = Math.max(0.01, n("stunden"));
      const usable = capacity * efficiency;
      const runtime = usable / load;
      const days = runtime / dailyHours;
      return { label: "Geschätzte Laufzeit", value: `${fmt(runtime, 1)} Stunden`, detail: `${fmt(usable, 0)} Wh rechnerisch nutzbare Energie`, stats: [{ label: "Nutzbare Kapazität", value: `${fmt(usable, 0)} Wh` }, { label: "Bei täglicher Nutzung", value: `${fmt(days, 1)} Tage` }, { label: "Angesetzter Wirkungsgrad", value: `${fmt(efficiency * 100, 0)} %` }] };
    }
    case "erhaltungsruecklage-rechner": {
      const area = Math.max(0, n("flaeche"));
      const rate = Math.max(0, n("satz"));
      const existing = Math.max(0, n("bestand"));
      const years = Math.max(1, n("jahre"));
      const annual = area * rate;
      const planned = annual * years;
      const total = existing + planned;
      return { label: "Planrücklage pro Monat", value: money(annual / 12), detail: `${money(annual)} pro Jahr bei ${fmt(rate, 2)} €/m²`, stats: [{ label: `Zuführung in ${fmt(years, 0)} Jahren`, value: money(planned) }, { label: "Vorhandener Bestand", value: money(existing) }, { label: "Bestand + Plan-Zuführung", value: money(total) }] };
    }
    case "werbungskosten-steuerersparnis-rechner": {
      const total = Math.max(0, n("werbungskosten"));
      const allowance = Math.max(0, n("pauschbetrag"));
      const rate = Math.min(100, Math.max(0, n("steuersatz"))) / 100;
      const additional = Math.max(0, total - allowance);
      const saving = additional * rate;
      return { label: "Geschätzte zusätzliche Steuerwirkung", value: money(saving), detail: `${money(additional)} Werbungskosten oberhalb des Pauschbetrags`, stats: [{ label: "Werbungskosten gesamt", value: money(total) }, { label: "Über Pauschbetrag", value: money(additional) }, { label: "Grenzsteuersatz", value: `${fmt(rate * 100, 1)} %` }] };
    }
    case "wallbox-ladezeit-rechner": {
      const battery = Math.max(0, n("akku"));
      const start = Math.min(100, Math.max(0, n("start")));
      const target = Math.min(100, Math.max(start, n("ziel")));
      const power = Math.max(0.1, Math.min(n("wallbox"), n("auto")));
      const efficiency = Math.min(1, Math.max(0.5, n("wirkungsgrad") / 100));
      const energy = battery * (target - start) / 100;
      const hours = energy / (power * efficiency);
      return { label: "Geschätzte Ladezeit", value: `${fmt(hours, 1)} Stunden`, detail: `${fmt(energy, 1)} kWh nachzuladende Energie`, stats: [{ label: "Wirksame Ladeleistung", value: `${fmt(power, 1)} kW` }, { label: "Ladefenster", value: `${fmt(target - start, 0)} %` }, { label: "Wirkungsgrad", value: `${fmt(efficiency * 100, 0)} %` }] };
    }
    case "heizoel-reichweite-rechner": {
      const stock = Math.max(0, n("bestand"));
      const annual = Math.max(1, n("jahresverbrauch"));
      const reserveRate = Math.min(0.8, Math.max(0, n("reserve") / 100));
      const usable = stock * (1 - reserveRate);
      const monthly = annual / 12;
      const months = usable / monthly;
      return { label: "Geschätzte Reichweite", value: `${fmt(months, 1)} Monate`, detail: `${fmt(usable, 0)} Liter nach Reserve nutzbar`, stats: [{ label: "Ø Monatsverbrauch", value: `${fmt(monthly, 0)} Liter` }, { label: "Sicherheitsreserve", value: `${fmt(stock - usable, 0)} Liter` }, { label: "Rechnerische Reichweite", value: `${fmt(months / 12, 1)} Jahre` }] };
    }
    case "hundekosten-rechner": {
      const monthly = n("futter") + n("versicherung") + n("tierarzt") + n("pflege") + n("betreuung") + n("steuer") / 12;
      const year = monthly * 12;
      const firstYear = year + n("einmalig");
      return { label: "Laufende Kosten pro Monat", value: money(monthly), detail: `${money(year)} laufende Kosten pro Jahr`, stats: [{ label: "Laufende Jahreskosten", value: money(year) }, { label: "Erstes Jahr inkl. Anschaffung", value: money(firstYear) }, { label: "Einmalkosten", value: money(n("einmalig")) }] };
    }
    case "umzugskarton-rechner": {
      const base = Math.max(0, n("flaeche")) / 2 + Math.max(0, n("personen")) * 5 + Math.max(0, n("buecher")) + Math.max(0, n("extra"));
      const total = Math.ceil(base * (1 + Math.min(0.5, Math.max(0, n("reserve") / 100))));
      const books = Math.ceil(Math.max(0, n("buecher")));
      return { label: "Geschätzter Kartonbedarf", value: `${total} Kartons`, detail: `inklusive ${fmt(n("reserve"), 0)} % Reserve`, stats: [{ label: "Grundbedarf vor Reserve", value: `${Math.ceil(base)} Kartons` }, { label: "Davon Bücherkartons", value: `${books} Stück` }, { label: "Zusatz für Nebenräume", value: `${fmt(Math.max(0, n("extra")), 0)} Kartons` }] };
    }
    case "eigenkapital-rechner": {
      const price = Math.max(0, n("kaufpreis"));
      const costs = price * Math.max(0, n("nebenkosten")) / 100;
      const total = price + costs;
      const equity = Math.max(0, n("eigenkapital"));
      const reserve = Math.min(equity, Math.max(0, n("reserve")));
      const usableEquity = Math.max(0, equity - reserve);
      const loan = Math.max(0, total - usableEquity);
      const quota = total > 0 ? usableEquity / total * 100 : 0;
      return { label: "Geschätzter Finanzierungsbedarf", value: money(loan), detail: `${fmt(quota, 1)} % Eigenkapitalquote nach Reserve`, stats: [{ label: "Gesamtkosten", value: money(total) }, { label: "Einsetzbares Eigenkapital", value: money(usableEquity) }, { label: "Zurückbehaltene Reserve", value: money(reserve) }] };
    }
    default:
      return null;
  }
}
