"use client";

import { NumberField as Field, Result, fmt, money, number, useCalculationResult } from "./ToolUI";
import { useUrlState } from "../hooks/useUrlState";

function RentalYieldTool() {
  const [purchasePrice, setPurchasePrice] = useUrlState("kaufpreis", "250000");
  const [monthlyRent, setMonthlyRent] = useUrlState("kaltmiete", "1100");
  const [ancillaryRate, setAncillaryRate] = useUrlState("nebenkosten", "10");
  const [annualOwnerCosts, setAnnualOwnerCosts] = useUrlState("eigentuemerkosten", "1800");
  const purchase = number(purchasePrice);
  const annualRent = number(monthlyRent) * 12;
  const invested = purchase * (1 + number(ancillaryRate) / 100);
  const grossYield = purchase > 0 ? annualRent / purchase * 100 : 0;
  const annualSurplus = annualRent - number(annualOwnerCosts);
  const netYield = invested > 0 ? annualSurplus / invested * 100 : 0;
  useCalculationResult("mietrendite-rechner", `${fmt(netYield)} % Nettomietrendite`);

  return <><div className="field-grid two"><Field label="Kaufpreis" value={purchasePrice} onChange={setPurchasePrice} suffix="€" /><Field label="Monatliche Kaltmiete" value={monthlyRent} onChange={setMonthlyRent} suffix="€" /><Field label="Kaufnebenkosten" value={ancillaryRate} onChange={setAncillaryRate} suffix="%" /><Field label="Nicht umlagefähige Kosten pro Jahr" value={annualOwnerCosts} onChange={setAnnualOwnerCosts} suffix="€" /></div><div className="stats-grid three"><div><strong>{fmt(grossYield)} %</strong><span>Bruttomietrendite</span></div><div><strong>{fmt(netYield)} %</strong><span>Nettomietrendite</span></div><div><strong>{money(annualSurplus)}</strong><span>Überschuss vor Finanzierung</span></div></div><p className="form-hint">Überschlägige Orientierung ohne Finanzierung, Steuern, Leerstand und individuelle Sondereffekte.</p></>;
}

function PurchaseCostsTool() {
  const [purchasePrice, setPurchasePrice] = useUrlState("kaufpreis", "300000");
  const [taxRate, setTaxRate] = useUrlState("grunderwerbsteuer", "5");
  const [notaryRate, setNotaryRate] = useUrlState("notar", "2");
  const [brokerRate, setBrokerRate] = useUrlState("makler", "3.57");
  const purchase = number(purchasePrice);
  const tax = purchase * number(taxRate) / 100;
  const notary = purchase * number(notaryRate) / 100;
  const broker = purchase * number(brokerRate) / 100;
  const ancillary = tax + notary + broker;
  const total = purchase + ancillary;
  useCalculationResult("kaufnebenkosten-rechner", `${money(ancillary)} Kaufnebenkosten`);

  return <><div className="field-grid two"><Field label="Kaufpreis" value={purchasePrice} onChange={setPurchasePrice} suffix="€" /><Field label="Grunderwerbsteuer" value={taxRate} onChange={setTaxRate} suffix="%" /><Field label="Notar + Grundbuch" value={notaryRate} onChange={setNotaryRate} suffix="%" /><Field label="Maklerprovision" value={brokerRate} onChange={setBrokerRate} suffix="%" /></div><div className="stats-grid three"><div><strong>{money(tax)}</strong><span>Grunderwerbsteuer</span></div><div><strong>{money(notary)}</strong><span>Notar + Grundbuch</span></div><div><strong>{money(broker)}</strong><span>Makler</span></div></div><Result label="Gesamte Kaufnebenkosten" value={money(ancillary)} detail={`Gesamtinvestition ${money(total)}`} /><p className="form-hint">Die Prozentsätze sind frei einstellbar, weil Steuer und Maklerkosten je nach Bundesland und Kauf variieren.</p></>;
}

function CashflowTool() {
  const [rent, setRent] = useUrlState("kaltmiete", "1100");
  const [loanRate, setLoanRate] = useUrlState("kreditrate", "760");
  const [ownerCosts, setOwnerCosts] = useUrlState("eigentuemerkosten", "120");
  const [reserve, setReserve] = useUrlState("ruecklage", "100");
  const [other, setOther] = useUrlState("sonstige-kosten", "30");
  const income = number(rent);
  const expenses = number(loanRate) + number(ownerCosts) + number(reserve) + number(other);
  const cashflow = income - expenses;
  useCalculationResult("immobilien-cashflow-rechner", `${money(cashflow)} monatlicher Cashflow`);

  return <><div className="field-grid two"><Field label="Monatliche Kaltmiete" value={rent} onChange={setRent} suffix="€" /><Field label="Monatliche Kreditrate" value={loanRate} onChange={setLoanRate} suffix="€" /><Field label="Nicht umlagefähige Kosten" value={ownerCosts} onChange={setOwnerCosts} suffix="€" /><Field label="Instandhaltungsrücklage" value={reserve} onChange={setReserve} suffix="€" /><Field label="Sonstige Eigentümerkosten" value={other} onChange={setOther} suffix="€" /></div><div className="stats-grid three"><div><strong>{money(income)}</strong><span>Einnahmen</span></div><div><strong>{money(expenses)}</strong><span>Ausgaben</span></div><div><strong>{money(cashflow)}</strong><span>Monatlicher Cashflow</span></div></div><Result label={cashflow >= 0 ? "Positiver monatlicher Überschuss" : "Monatliche Unterdeckung"} value={money(Math.abs(cashflow))} detail={`${money(cashflow * 12)} pro Jahr`} /><p className="form-hint">Steuern, Leerstand, Sonderumlagen und Wertentwicklung sind nicht berücksichtigt.</p></>;
}

function HouseBudgetTool() {
  const [monthlyRate, setMonthlyRate] = useUrlState("monatsrate", "1500");
  const [equity, setEquity] = useUrlState("eigenkapital", "50000");
  const [interest, setInterest] = useUrlState("sollzins", "3.5");
  const [repayment, setRepayment] = useUrlState("tilgung", "2");
  const [ancillaryRate, setAncillaryRate] = useUrlState("nebenkosten", "10");
  const annuityRate = (number(interest) + number(repayment)) / 100;
  const loan = annuityRate > 0 ? number(monthlyRate) * 12 / annuityRate : 0;
  const totalCapital = loan + number(equity);
  const maxPurchasePrice = totalCapital / (1 + number(ancillaryRate) / 100);
  const ancillary = Math.max(0, totalCapital - maxPurchasePrice);
  useCalculationResult("haus-leisten-rechner", `${money(maxPurchasePrice)} maximaler Kaufpreis`);

  return <><div className="field-grid two"><Field label="Maximale Monatsrate" value={monthlyRate} onChange={setMonthlyRate} suffix="€" /><Field label="Eigenkapital" value={equity} onChange={setEquity} suffix="€" /><Field label="Sollzins" value={interest} onChange={setInterest} suffix="%" /><Field label="Anfängliche Tilgung" value={repayment} onChange={setRepayment} suffix="%" /><Field label="Kaufnebenkosten" value={ancillaryRate} onChange={setAncillaryRate} suffix="%" /></div><div className="stats-grid three"><div><strong>{money(loan)}</strong><span>Geschätzte Kreditsumme</span></div><div><strong>{money(maxPurchasePrice)}</strong><span>Maximaler Kaufpreis</span></div><div><strong>{money(ancillary)}</strong><span>Eingeplante Nebenkosten</span></div></div><p className="form-hint">Vereinfachte Budgetrechnung. Banken berücksichtigen zusätzlich Einkommen, Haushaltskosten, Sicherheiten, Beleihung, Bonität und weitere Kriterien.</p></>;
}

function LoanRateTool() {
  const [loan, setLoan] = useUrlState("kreditsumme", "250000");
  const [interest, setInterest] = useUrlState("sollzins", "3.5");
  const [repayment, setRepayment] = useUrlState("tilgung", "2");
  const [years, setYears] = useUrlState("zinsbindung", "10");
  const principal = number(loan);
  const annualInterest = number(interest) / 100;
  const annualRepayment = number(repayment) / 100;
  const payment = principal * (annualInterest + annualRepayment) / 12;
  const monthlyInterest = annualInterest / 12;
  const months = Math.max(0, Math.round(number(years) * 12));
  let remaining = principal;
  if (months > 0) {
    if (monthlyInterest > 0) {
      const factor = Math.pow(1 + monthlyInterest, months);
      remaining = principal * factor - payment * (factor - 1) / monthlyInterest;
    } else {
      remaining = principal - payment * months;
    }
  }
  remaining = Math.max(0, remaining);
  const firstYearInterest = principal * annualInterest;
  const firstYearRepayment = payment * 12 - firstYearInterest;
  useCalculationResult("kreditraten-rechner", `${money(payment)} Monatsrate`);

  return <><div className="field-grid two"><Field label="Kreditsumme" value={loan} onChange={setLoan} suffix="€" /><Field label="Sollzins" value={interest} onChange={setInterest} suffix="%" /><Field label="Anfängliche Tilgung" value={repayment} onChange={setRepayment} suffix="%" /><Field label="Zinsbindung / Zeitraum" value={years} onChange={setYears} suffix="Jahre" step="1" /></div><Result label="Monatliche Annuitätenrate" value={money(payment)} detail={`Anfängliche Gesamtannuität ${fmt((annualInterest + annualRepayment) * 100)} % p.a.`} /><div className="stats-grid three"><div><strong>{money(firstYearInterest)}</strong><span>Zinsen im 1. Jahr</span></div><div><strong>{money(firstYearRepayment)}</strong><span>Tilgung im 1. Jahr</span></div><div><strong>{money(remaining)}</strong><span>Restschuld nach {fmt(number(years), 0)} Jahren</span></div></div><p className="form-hint">Vereinfachte Annuitätenrechnung ohne Gebühren, Sondertilgungen und Zinsänderungen.</p></>;
}

export function PropertyToolRunner({ slug }: { slug: string }) {
  const content: Record<string, React.ReactNode> = {
    "mietrendite-rechner": <RentalYieldTool />,
    "kaufnebenkosten-rechner": <PurchaseCostsTool />,
    "immobilien-cashflow-rechner": <CashflowTool />,
    "haus-leisten-rechner": <HouseBudgetTool />,
    "kreditraten-rechner": <LoanRateTool />,
  };
  return <div className="tool-surface">{content[slug]}</div>;
}
