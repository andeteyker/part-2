"use client";

import type { InputHTMLAttributes } from "react";

export const number = (value: string) => Number(String(value).replace(",", ".")) || 0;
export const fmt = (value: number, digits = 2) => new Intl.NumberFormat("de-DE", { maximumFractionDigits: digits }).format(value);
export const money = (value: number) => new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(value || 0);

type FieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
  suffix?: string;
  min?: string | number;
  max?: string | number;
  step?: string | number;
  placeholder?: string;
};

export function Field({ label, value, onChange, type = "number", suffix, min, max, step, placeholder }: FieldProps) {
  return (
    <label className="field">
      <span>{label}</span>
      <div>
        <input type={type} value={value} min={min} max={max} step={step} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} />
        {suffix && <b>{suffix}</b>}
      </div>
    </label>
  );
}

export function NumberField(props: Omit<FieldProps, "type">) {
  return <Field {...props} type="number" min={props.min ?? 0} step={props.step ?? "0.01"} />;
}

type SelectOption = { value: string; label: string };

type SelectFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
};

export function SelectField({ label, value, onChange, options }: SelectFieldProps) {
  return (
    <label className="field">
      <span>{label}</span>
      <div>
        <select value={value} onChange={(event) => onChange(event.target.value)}>
          {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
      </div>
    </label>
  );
}

export function Result({ label, value, detail }: { label: string; value: string; detail?: string }) {
  return <div className="result-box"><span>{label}</span><strong>{value}</strong>{detail && <small>{detail}</small>}</div>;
}

/** Weiterleitung, die erst nach einem Result ausgegeben und klar als Anzeige gekennzeichnet ist. */
export function Recommendation({ rec }: { rec: { tag: string; headline: string; network: string; product: string; text: string; url: string } }) {
  if (!rec) return null;
  return (
    <aside className="recommendation" aria-label="Werbung">
      <div className="rec-head">
        <span className="rec-tag">{rec.tag}</span>
        <span className="rec-network">{rec.network}</span>
      </div>
      <h3>{rec.headline}</h3>
      <p className="rec-text">{rec.text}</p>
      <a className="rec-link" href={rec.url} target="_blank" rel="sponsored nofollow noopener">
        {rec.product} ansehen
      </a>
      <small className="rec-disclosure">Anzeige. Über diesen Link entstehen dir keine Mehrkosten. Wir können eine Provision erhalten.</small>
    </aside>
  );
}
