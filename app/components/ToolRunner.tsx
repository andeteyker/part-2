"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import QRCode from "qrcode";
import { Field, Result, SelectField, fmt, money, number } from "./ToolUI";
import { useUrlState } from "../hooks/useUrlState";
import { GrowthToolRunner } from "./GrowthToolRunner";

function Percentage() {
  const [base, setBase] = useUrlState("grundwert", "250"); const [rate, setRate] = useUrlState("prozentsatz", "19");
  const result = number(base) * number(rate) / 100;
  return <><div className="field-grid"><Field label="Grundwert" value={base} onChange={setBase} /><Field label="Prozentsatz" value={rate} onChange={setRate} suffix="%" /></div><Result label={`${fmt(number(rate))} % von ${fmt(number(base))} sind`} value={fmt(result)} detail={`${fmt(number(base))} × ${fmt(number(rate))} ÷ 100`} /></>;
}

function RuleOfThree() {
  const [a, setA] = useUrlState("a", "3"); const [b, setB] = useUrlState("b", "12"); const [c, setC] = useUrlState("c", "5");
  const result = number(a) ? number(b) * number(c) / number(a) : 0;
  return <><p className="form-hint">Wenn <b>{a || "A"}</b> Einheiten <b>{b || "B"}</b> entsprechen, wie viel entsprechen <b>{c || "C"}</b> Einheiten?</p><div className="field-grid three"><Field label="Wert A" value={a} onChange={setA} /><Field label="entspricht B" value={b} onChange={setB} /><Field label="gesucht für C" value={c} onChange={setC} /></div><Result label="Ergebnis" value={fmt(result)} detail={`${fmt(number(b))} × ${fmt(number(c))} ÷ ${fmt(number(a))}`} /></>;
}

function useGermanWords(active: boolean) {
  const [words, setWords] = useState<string[]>([]);
  useEffect(() => { if (active && !words.length) import("an-array-of-german-words").then((m) => setWords((m.default || m) as unknown as string[])); }, [active, words.length]);
  return words;
}

const clean = (text: string) => text.toLocaleLowerCase("de").replace(/[^a-zäöüß]/g, "");
function canBuild(word: string, letters: string) {
  const pool = [...clean(letters)];
  return [...clean(word)].every((char) => { const i = pool.indexOf(char); if (i < 0) return false; pool.splice(i, 1); return true; });
}

function WordFinder() {
  const [letters, setLetters] = useState("garten"); const words = useGermanWords(true);
  const matches = useMemo(() => words.filter((word) => word.length >= 3 && word.length <= letters.length && canBuild(word, letters)).sort((a, b) => b.length - a.length || a.localeCompare(b, "de")).slice(0, 120), [words, letters]);
  return <><label className="field"><span>Deine Buchstaben</span><div><input value={letters} onChange={(e) => setLetters(e.target.value)} maxLength={18} /></div></label><div className="word-summary"><strong>{words.length ? `${matches.length} Treffer` : "Wortliste wird geladen …"}</strong><span>Längste Wörter zuerst</span></div><div className="word-results">{matches.map((word) => <span key={word}>{word}</span>)}</div></>;
}

function Wordle() {
  const [pattern, setPattern] = useState("....."); const [included, setIncluded] = useState(""); const [excluded, setExcluded] = useState(""); const words = useGermanWords(true);
  const matches = useMemo(() => { const p = clean(pattern.replaceAll(".", "x")).replaceAll("x", "."); const regex = new RegExp(`^${p.padEnd(5, ".").slice(0, 5)}$`, "i"); const inc = [...clean(included)]; const exc = [...clean(excluded)]; return words.filter((word) => clean(word).length === 5 && regex.test(clean(word)) && inc.every((c) => clean(word).includes(c)) && exc.every((c) => !clean(word).includes(c))).slice(0, 150); }, [words, pattern, included, excluded]);
  return <><div className="field-grid three"><Field label="Muster (z. B. A..EN)" value={pattern} onChange={setPattern} type="text" /><Field label="Enthaltene Buchstaben" value={included} onChange={setIncluded} type="text" /><Field label="Ausgeschlossene Buchstaben" value={excluded} onChange={setExcluded} type="text" /></div><div className="word-summary"><strong>{words.length ? `${matches.length} mögliche Wörter` : "Wortliste wird geladen …"}</strong></div><div className="word-results">{matches.map((word) => <span key={word}>{word}</span>)}</div></>;
}

function TextStats({ mode }: { mode: "chars" | "words" }) {
  const [text, setText] = useState("Hier kannst du deinen Text einfügen und direkt auswerten.");
  const words = text.trim() ? text.trim().split(/\s+/).length : 0; const chars = text.length; const noSpace = text.replace(/\s/g, "").length; const sentences = text.trim() ? text.split(/[.!?]+/).filter(Boolean).length : 0; const lines = text ? text.split(/\n/).length : 0; const paragraphs = text.trim() ? text.split(/\n\s*\n/).filter(Boolean).length : 0;
  return <><label className="field"><span>Dein Text</span><textarea value={text} onChange={(e) => setText(e.target.value)} rows={9} /></label><div className="stats-grid">{(mode === "chars" ? [["Zeichen", chars], ["Ohne Leerzeichen", noSpace], ["Wörter", words], ["Zeilen", lines]] : [["Wörter", words], ["Sätze", sentences], ["Absätze", paragraphs], ["Lesezeit", `${Math.max(1, Math.ceil(words / 200))} Min.`]]).map(([label, value]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div><p className="privacy-note">🔒 Dein Text bleibt vollständig auf diesem Gerät.</p></>;
}

async function imageToJpeg(file: File, quality = 0.9) {
  let source: Blob = file;
  if (/hei[cf]/i.test(file.type) || /\.hei[cf]$/i.test(file.name)) {
    const heic2any = (await import("heic2any")).default;
    const converted = await heic2any({ blob: file, toType: "image/jpeg", quality });
    source = Array.isArray(converted) ? converted[0] : converted;
  }
  const url = URL.createObjectURL(source); const image = new Image(); image.src = url; await image.decode();
  const canvas = document.createElement("canvas"); canvas.width = image.naturalWidth; canvas.height = image.naturalHeight; const ctx = canvas.getContext("2d")!; ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, canvas.width, canvas.height); ctx.drawImage(image, 0, 0); URL.revokeObjectURL(url);
  return await new Promise<Blob>((resolve, reject) => canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("Konvertierung fehlgeschlagen")), "image/jpeg", quality));
}

function ImageTool({ kind }: { kind: "heic" | "webp" | "compress" }) {
  const [file, setFile] = useState<File | null>(null); const [quality, setQuality] = useState(82); const [result, setResult] = useState<{ url: string; size: number } | null>(null); const [error, setError] = useState("");
  const run = async () => { if (!file) return; setError(""); try { const blob = await imageToJpeg(file, quality / 100); if (result) URL.revokeObjectURL(result.url); setResult({ url: URL.createObjectURL(blob), size: blob.size }); } catch { setError("Diese Datei konnte im Browser nicht verarbeitet werden. Bitte versuche eine andere Datei."); } };
  const accept = kind === "heic" ? ".heic,.heif,image/heic,image/heif" : kind === "webp" ? "image/webp" : "image/jpeg,image/png,image/webp";
  return <><label className="upload-zone"><input type="file" accept={accept} onChange={(e) => { setFile(e.target.files?.[0] || null); setResult(null); }} /><span className="upload-icon">＋</span><strong>{file ? file.name : "Bild auswählen oder hier ablegen"}</strong><small>{kind === "heic" ? "HEIC oder HEIF" : kind === "webp" ? "WebP" : "JPG, PNG oder WebP"} · Verarbeitung nur im Browser</small></label>{file && <><label className="range-field"><span>JPG-Qualität <b>{quality} %</b></span><input type="range" min="20" max="100" value={quality} onChange={(e) => setQuality(Number(e.target.value))} /></label><button className="primary-button" onClick={run}>{kind === "compress" ? "Bild komprimieren" : "In JPG umwandeln"}</button></>}{error && <p className="error-note">{error}</p>}{result && <div className="download-result"><div><strong>Fertig</strong><span>{fmt(result.size / 1024, 0)} KB{file ? ` · vorher ${fmt(file.size / 1024, 0)} KB` : ""}</span></div><a href={result.url} download={`${file?.name.replace(/\.[^.]+$/, "") || "bild"}.jpg`}>JPG herunterladen ↓</a></div>}</>;
}

function QrTool() {
  const [value, setValue] = useState("https://www.sofort-tools.de"); const [dataUrl, setDataUrl] = useState("");
  useEffect(() => { const timer = setTimeout(() => QRCode.toDataURL(value || " ", { width: 420, margin: 2, color: { dark: "#071a31", light: "#ffffff" } }).then(setDataUrl), 120); return () => clearTimeout(timer); }, [value]);
  return <div className="qr-layout"><div><label className="field"><span>Link oder Text</span><textarea rows={5} value={value} onChange={(e) => setValue(e.target.value)} /></label><p className="privacy-note">Der QR-Code wird lokal erstellt und läuft nicht ab.</p></div><div className="qr-preview">{dataUrl && <Image unoptimized width={220} height={220} src={dataUrl} alt="Generierter QR-Code" />}<a className="primary-button" href={dataUrl} download="qr-code.png">QR-Code herunterladen</a></div></div>;
}

function IpTool() {
  const [ip, setIp] = useState("Wird ermittelt …");
  const [browser] = useState(() => typeof navigator === "undefined" ? { language: "–", cookies: "–", timezone: "–", connection: "–" } : { language: navigator.language, cookies: navigator.cookieEnabled ? "Aktiv" : "Inaktiv", timezone: Intl.DateTimeFormat().resolvedOptions().timeZone, connection: navigator.onLine ? "Online" : "Offline" });
  useEffect(() => {
    fetch("https://api64.ipify.org?format=json").then((r) => r.json()).then((d) => setIp(d.ip)).catch(() => setIp("Nicht verfügbar"));
  }, []);
  return <><Result label="Deine öffentliche IP-Adresse" value={ip} /><div className="stats-grid"><div><strong>{browser.language}</strong><span>Browsersprache</span></div><div><strong>{browser.cookies}</strong><span>Cookies</span></div><div><strong>{browser.timezone}</strong><span>Zeitzone</span></div><div><strong>{browser.connection}</strong><span>Verbindung</span></div></div></>;
}

function PingTool() {
  const [values, setValues] = useState<number[]>([]); const [running, setRunning] = useState(false);
  const run = async () => { setRunning(true); const next: number[] = []; for (let i = 0; i < 5; i++) { const start = performance.now(); try { await fetch(`/favicon.svg?ping=${Date.now()}-${i}`, { cache: "no-store" }); next.push(performance.now() - start); } catch { /* ignore */ } setValues([...next]); } setRunning(false); };
  const avg = values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;
  return <><button className="primary-button" onClick={run} disabled={running}>{running ? `Messung ${values.length}/5 …` : "Ping-Test starten"}</button>{values.length > 0 && <><Result label="Durchschnittliche Web-Latenz" value={`${fmt(avg, 0)} ms`} detail={`Minimum ${fmt(Math.min(...values), 0)} ms · Maximum ${fmt(Math.max(...values), 0)} ms`} /><p className="form-hint">Browsermessung zum SofortTools-Server; kein ICMP-Netzwerk-Ping.</p></>}</>;
}

function AgeTool() {
  const today = new Date().toISOString().slice(0, 10); const [birth, setBirth] = useUrlState("geburtsdatum", "1995-01-01"); const [target, setTarget] = useUrlState("stichtag", today);
  const b = new Date(`${birth}T12:00:00`), t = new Date(`${target}T12:00:00`); let years = t.getFullYear() - b.getFullYear(); let months = t.getMonth() - b.getMonth(); let days = t.getDate() - b.getDate(); if (days < 0) { months--; days += new Date(t.getFullYear(), t.getMonth(), 0).getDate(); } if (months < 0) { years--; months += 12; }
  return <><div className="field-grid"><Field label="Geburtsdatum" value={birth} onChange={setBirth} type="date" /><Field label="Alter am" value={target} onChange={setTarget} type="date" /></div><Result label="Genaues Alter" value={`${years} Jahre, ${months} Monate, ${days} Tage`} /></>;
}

function DurationTool() {
  const [start, setStart] = useUrlState("start", "08:00"); const [end, setEnd] = useUrlState("ende", "16:30"); const [pause, setPause] = useUrlState("pause", "30");
  const mins = (v: string) => { const [h, m] = v.split(":").map(Number); return h * 60 + m; }; let diff = mins(end) - mins(start); if (diff < 0) diff += 1440; diff = Math.max(0, diff - number(pause));
  return <><div className="field-grid three"><Field label="Startzeit" value={start} onChange={setStart} type="time" /><Field label="Endzeit" value={end} onChange={setEnd} type="time" /><Field label="Pause" value={pause} onChange={setPause} suffix="Min." /></div><Result label="Zeitdauer ohne Pause" value={`${Math.floor(diff / 60)} Std. ${diff % 60} Min.`} detail={`${fmt(diff / 60)} Dezimalstunden`} /></>;
}

function VatTool() {
  const [amount, setAmount] = useUrlState("betrag", "100"); const [rate, setRate] = useUrlState("steuersatz", "19"); const [direction, setDirection] = useUrlState("richtung", "net"); const a = number(amount), r = number(rate) / 100; const net = direction === "net" ? a : a / (1 + r); const gross = direction === "net" ? a * (1 + r) : a;
  return <><div className="segmented"><button className={direction === "net" ? "active" : ""} onClick={() => setDirection("net")}>Netto → Brutto</button><button className={direction === "gross" ? "active" : ""} onClick={() => setDirection("gross")}>Brutto → Netto</button></div><div className="field-grid"><Field label={direction === "net" ? "Nettobetrag" : "Bruttobetrag"} value={amount} onChange={setAmount} suffix="€" /><SelectField label="Mehrwertsteuersatz" value={rate} onChange={setRate} options={[{ value: "19", label: "19 %" }, { value: "7", label: "7 %" }, { value: "0", label: "0 %" }]} /></div><div className="stats-grid three"><div><strong>{money(net)}</strong><span>Netto</span></div><div><strong>{money(gross - net)}</strong><span>MwSt.</span></div><div><strong>{money(gross)}</strong><span>Brutto</span></div></div></>;
}

function HourlyTool() {
  const [salary, setSalary] = useUrlState("monatsgehalt", "3500"); const [hours, setHours] = useUrlState("wochenstunden", "40"); const monthlyHours = number(hours) * 4.348; const hourly = number(salary) / monthlyHours;
  return <><div className="field-grid"><Field label="Monatsgehalt" value={salary} onChange={setSalary} suffix="€" /><Field label="Wochenstunden" value={hours} onChange={setHours} suffix="Std." /></div><Result label="Stundenlohn" value={`${money(hourly)} / Stunde`} detail={`${fmt(monthlyHours, 1)} Arbeitsstunden pro Monat`} /></>;
}

function FuelTool() {
  const [distance, setDistance] = useUrlState("strecke", "120"); const [consumption, setConsumption] = useUrlState("verbrauch", "7.2"); const [price, setPrice] = useUrlState("preis", "1.75"); const [people, setPeople] = useUrlState("personen", "1"); const [roundValue, setRound] = useUrlState("hin-rueckfahrt", "nein"); const round = roundValue === "ja"; const km = number(distance) * (round ? 2 : 1); const liters = km / 100 * number(consumption); const cost = liters * number(price);
  return <><div className="field-grid two"><Field label="Strecke" value={distance} onChange={setDistance} suffix="km" /><Field label="Verbrauch" value={consumption} onChange={setConsumption} suffix="l/100 km" /><Field label="Kraftstoffpreis" value={price} onChange={setPrice} suffix="€/l" step="0.01" /><Field label="Personen" value={people} onChange={setPeople} min={1} /></div><label className="check-row"><input type="checkbox" checked={round} onChange={(e) => setRound(e.target.checked ? "ja" : "nein")} /> Hin- und Rückfahrt berechnen</label><div className="stats-grid three"><div><strong>{fmt(liters, 1)} l</strong><span>Verbrauch</span></div><div><strong>{money(cost)}</strong><span>Gesamtkosten</span></div><div><strong>{money(cost / Math.max(1, number(people)))}</strong><span>Pro Person</span></div></div></>;
}

function WeekTool() {
  const defaultDate = new Date().toISOString().slice(0, 10); const [value, setValue] = useUrlState("datum", defaultDate); const date = new Date(`${value}T12:00:00`); const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())); const day = d.getUTCDay() || 7; d.setUTCDate(d.getUTCDate() + 4 - day); const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1)); const week = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7); const monday = new Date(date); monday.setDate(date.getDate() - ((date.getDay() || 7) - 1)); const sunday = new Date(monday); sunday.setDate(monday.getDate() + 6); const dateFmt = (x: Date) => x.toLocaleDateString("de-DE");
  return <><Field label="Datum" value={value} onChange={setValue} type="date" /><Result label="ISO-Kalenderwoche" value={`KW ${week} / ${d.getUTCFullYear()}`} detail={`Montag, ${dateFmt(monday)} bis Sonntag, ${dateFmt(sunday)}`} /></>;
}

function RandomTool() {
  const [min, setMin] = useUrlState("minimum", "1"); const [max, setMax] = useUrlState("maximum", "100"); const [items, setItems] = useState(""); const [result, setResult] = useState("–");
  const draw = () => { const list = items.split(/\n|,/).map((x) => x.trim()).filter(Boolean); if (list.length) return setResult(list[Math.floor(Math.random() * list.length)]); const lo = Math.ceil(number(min)), hi = Math.floor(number(max)); setResult(String(Math.floor(Math.random() * (hi - lo + 1)) + lo)); };
  return <><div className="field-grid"><Field label="Minimum" value={min} onChange={setMin} /><Field label="Maximum" value={max} onChange={setMax} /></div><label className="field"><span>Optional: Einträge auslosen (durch Komma oder neue Zeile trennen)</span><textarea rows={4} value={items} onChange={(e) => setItems(e.target.value)} placeholder="Anna, Ben, Cem" /></label><button className="primary-button" onClick={draw}>Zufall erzeugen</button><Result label="Ergebnis" value={result} /></>;
}

function PasswordTool() {
  const [length, setLength] = useState(20); const [upper, setUpper] = useState(true); const [numbers, setNumbers] = useState(true); const [symbols, setSymbols] = useState(true); const [password, setPassword] = useState("");
  const generate = () => { let chars = "abcdefghijkmnopqrstuvwxyz"; if (upper) chars += "ABCDEFGHJKLMNPQRSTUVWXYZ"; if (numbers) chars += "23456789"; if (symbols) chars += "!@#$%&*+-=?"; const bytes = new Uint32Array(length); crypto.getRandomValues(bytes); setPassword([...bytes].map((n) => chars[n % chars.length]).join("")); };
  return <><label className="range-field"><span>Länge <b>{length} Zeichen</b></span><input type="range" min="8" max="64" value={length} onChange={(e) => setLength(Number(e.target.value))} /></label><div className="check-grid"><label><input type="checkbox" checked={upper} onChange={(e) => setUpper(e.target.checked)} /> Großbuchstaben</label><label><input type="checkbox" checked={numbers} onChange={(e) => setNumbers(e.target.checked)} /> Zahlen</label><label><input type="checkbox" checked={symbols} onChange={(e) => setSymbols(e.target.checked)} /> Sonderzeichen</label></div><button className="primary-button" onClick={generate}>Neues Passwort erzeugen</button><div className="password-result"><code>{password || "Noch kein Passwort erzeugt"}</code><button disabled={!password} onClick={() => navigator.clipboard.writeText(password)}>Kopieren</button></div><p className="privacy-note">🔒 Das Passwort wird ausschließlich lokal und kryptografisch zufällig erzeugt.</p></>;
}

export function ToolRunner({ slug }: { slug: string }) {
  const content: Record<string, React.ReactNode> = {
    prozentrechner: <Percentage />, dreisatzrechner: <RuleOfThree />, "woerter-aus-buchstaben": <WordFinder />, "wordle-hilfe": <Wordle />, "zeichen-zaehlen": <TextStats mode="chars" />, "woerter-zaehlen": <TextStats mode="words" />, "heic-zu-jpg": <ImageTool kind="heic" />, "webp-zu-jpg": <ImageTool kind="webp" />, "bild-komprimieren": <ImageTool kind="compress" />, "qr-code-erstellen": <QrTool />, "meine-ip": <IpTool />, "ping-test": <PingTool />, altersrechner: <AgeTool />, "zeitdauer-berechnen": <DurationTool />, mehrwertsteuerrechner: <VatTool />, stundenlohnrechner: <HourlyTool />, spritkostenrechner: <FuelTool />, kalenderwoche: <WeekTool />, zufallsgenerator: <RandomTool />, passwortgenerator: <PasswordTool />,
  };
  return content[slug] ? <div className="tool-surface">{content[slug]}</div> : <GrowthToolRunner slug={slug} />;
}
