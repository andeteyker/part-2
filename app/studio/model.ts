export type PageKind = "ratgeber" | "rechner" | "tool";

export type PageDraft = {
  slug: string;
  title: string;
  description: string;
  kind: PageKind;
  eyebrow: string;
  category: string;
  body: string;
  code: string;
};

export type PageRecord = { slug: string; draft: string; published: string | null; revision: number; updated: string };

export const emptyDraft: PageDraft = {
  slug: "",
  title: "",
  description: "",
  kind: "ratgeber",
  eyebrow: "Praxisratgeber",
  category: "Geld & Beruf",
  body: "",
  code: "",
};

export function normalizeDraft(value: Partial<PageDraft> | null | undefined): PageDraft {
  return {
    ...emptyDraft,
    ...value,
    kind: ["ratgeber", "rechner", "tool"].includes(value?.kind ?? "") ? value!.kind! : "ratgeber",
    eyebrow: typeof value?.eyebrow === "string" ? value.eyebrow : "Praxisratgeber",
    category: typeof value?.category === "string" ? value.category : "Allgemein",
  };
}

export function validateDraft(value: unknown): PageDraft {
  if (!value || typeof value !== "object") throw new Error("Seitendaten fehlen.");
  const p = normalizeDraft(value as Partial<PageDraft>);
  for (const field of ["slug", "title", "description", "eyebrow", "category", "body", "code"] as const) {
    if (typeof p[field] !== "string") throw new Error("Ungültiges Feld: " + field);
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.slug) || p.slug.length > 90) throw new Error("Die URL darf nur Kleinbuchstaben, Zahlen und Bindestriche enthalten.");
  if (!p.title.trim() || p.title.length > 160) throw new Error("Bitte einen Titel mit höchstens 160 Zeichen eingeben.");
  if (!p.description.trim() || p.description.length > 400) throw new Error("Bitte eine kurze Beschreibung mit höchstens 400 Zeichen eingeben.");
  if (!p.eyebrow.trim() || p.eyebrow.length > 80) throw new Error("Bitte eine kurze Themenzeile eingeben.");
  if (!p.category.trim() || p.category.length > 80) throw new Error("Bitte eine Kategorie eingeben.");
  if (!["ratgeber", "rechner", "tool"].includes(p.kind)) throw new Error("Unbekannter Seitentyp.");
  if (p.body.length > 80000 || p.code.length > 120000) throw new Error("Die Seite ist zu groß.");
  return p;
}

export function sandboxDocument(code: string) {
  return '<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src \'none\'; script-src \'unsafe-inline\'; style-src \'unsafe-inline\'; img-src data: blob:; connect-src \'none\'; form-action \'none\'; base-uri \'none\'"><style>html{color-scheme:light}body{margin:0;font-family:Inter,Arial,sans-serif;color:#071a31;background:#fff}*{box-sizing:border-box}button,input,select,textarea{font:inherit}</style></head><body>' + code + '</body></html>';
}

export const guideTemplateBody = `## Die kurze Antwort

Ein Stundenlohn lässt sich erst sinnvoll vergleichen, wenn Arbeitszeit, bezahlte Sonderzahlungen und regelmäßig anfallende Zuschläge gemeinsam betrachtet werden. Der Monatslohn allein reicht dafür nicht aus.

> INFO: Die Werte in diesem Beispiel dienen der Orientierung. Tausche Zahlen, Annahmen und Quellen passend zu deinem Thema aus.

## Welche Angaben werden benötigt?

- monatliches Bruttogehalt
- durchschnittliche Wochenarbeitszeit
- Anzahl der bezahlten Monatsgehälter pro Jahr
- regelmäßig gezahlte Zuschläge oder Boni

## So gehst du Schritt für Schritt vor

1. Rechne die Wochenarbeitszeit auf die durchschnittlichen Monatsstunden um.
2. Addiere feste Sonderzahlungen zum Jahresbrutto.
3. Teile das Jahresbrutto durch die gesamten Jahresarbeitsstunden.
4. Vergleiche das Ergebnis nur mit Angeboten, die nach derselben Methode berechnet wurden.

## Beispielrechnung: Wie hoch ist der Stundenlohn?

Bei 3.200 Euro Monatsgehalt und 38 Wochenstunden entstehen durchschnittlich 164,7 Arbeitsstunden pro Monat. Ohne Sonderzahlungen ergibt sich ein Bruttostundenlohn von rund 19,43 Euro. Mit dem [Stundenlohn-Rechner](/tools/stundenlohn-rechner) kannst du andere Werte direkt prüfen.

| Kennwert | Beispiel | Bedeutung |
| --- | ---: | --- |
| Monatsgehalt | 3.200 € | regelmäßiges Brutto |
| Wochenstunden | 38 | vertragliche Arbeitszeit |
| Monatsstunden | 164,7 | Wochenstunden × 4,33 |
| Stundenlohn | 19,43 € | Monatsgehalt ÷ Monatsstunden |

> TIPP: Verlinke Rechner genau dort, wo Leser einen genannten Wert selbst prüfen möchten. So wirkt der Link hilfreich statt werblich.

## Welche Fehler verfälschen das Ergebnis?

- Wochenstunden ohne den Monatsfaktor 4,33 verwenden
- unbezahlte Mehrarbeit ignorieren
- einmalige Boni wie ein garantiertes Gehalt behandeln
- Brutto- und Nettowerte miteinander vergleichen

## Häufige Fragen

### Warum rechnet man mit 4,33 Wochen pro Monat?

Ein Jahr hat im Durchschnitt 52 Wochen. Geteilt durch zwölf Monate ergibt das rund 4,33 Wochen je Monat.

### Gehört Urlaubsgeld in den Stundenlohn?

Garantierte Sonderzahlungen können für einen Jahresvergleich einbezogen werden. Freiwillige oder ungewisse Zahlungen solltest du getrennt ausweisen.

## Quellen und Stand

Nenne hier die fachliche oder amtliche Primärquelle, das Abrufdatum und die Annahmen deiner Rechnung. Prüfe veränderliche Grenzwerte vor jeder Aktualisierung.`;

export const calculatorTextTemplate = `## Was berechnet dieses Werkzeug?

Der Beispielrechner ermittelt, wie viel ein frei wählbarer Prozentsatz von einem Grundwert ausmacht. Das ist etwa bei Rabatten, Preisaufschlägen oder Anteilen hilfreich.

> INFO: Die Berechnung läuft vollständig im Browser. Eingaben werden nicht an einen Server übertragen.

## So verwendest du den Rechner

1. Trage den Grundwert ein.
2. Gib den gewünschten Prozentsatz ein.
3. Wähle, ob du den Prozentwert, einen Rabattpreis oder einen Aufschlag berechnen möchtest.
4. Das Ergebnis wird direkt unter den Eingaben angezeigt.

## Formel und Rechenweg

**Prozentwert = Grundwert × Prozentsatz ÷ 100**

Bei 240 Euro und 15 Prozent ergibt sich: 240 × 15 ÷ 100 = 36 Euro. Bei einem Rabatt bleiben somit 204 Euro übrig.

| Eingabe | Beispielwert |
| --- | ---: |
| Grundwert | 240,00 € |
| Prozentsatz | 15 % |
| Prozentwert | 36,00 € |
| Preis nach Rabatt | 204,00 € |

> TIPP: Ersetze Beispiel, Formel und Hinweise durch die fachlich richtigen Angaben deines Rechners. Erkläre auch Rundung und Sonderfälle.

## Häufige Fragen

### Wann wird gerundet?

Der Rechner verwendet intern den genauen Wert und zeigt Geldbeträge mit zwei Nachkommastellen an.

### Werden meine Eingaben gespeichert?

Nein. Dieser Beispielrechner verarbeitet alle Werte nur im aktuellen Browserfenster.

## Fachliche Grenzen und Quellen

Beschreibe hier, welche Fälle der Rechner abdeckt, wann eine individuelle Prüfung nötig ist und auf welcher Primärquelle die Berechnung beruht.`;

export const toolTextTemplate = `## Was kann dieses Tool?

Beschreibe in zwei bis drei konkreten Sätzen, welches Problem das Werkzeug löst und welches Ergebnis Nutzer erhalten.

> INFO: Erkläre direkt, ob Daten lokal verarbeitet, gespeichert oder übertragen werden.

## So funktioniert es

1. Füge deine Daten in das Eingabefeld ein.
2. Wähle die gewünschte Einstellung.
3. Prüfe die Vorschau.
4. Kopiere oder lade das fertige Ergebnis herunter.

## Praxisbeispiel

Zeige ein realistisches Vorher-nachher-Beispiel. Benenne Eingabe, gewählte Einstellung und Ergebnis so genau, dass der Ablauf ohne Ausprobieren verständlich ist.

> TIPP: Verlinke an dieser Stelle ein verwandtes [SofortTool](/alle-tools), wenn es den nächsten logischen Arbeitsschritt übernimmt.

## Häufige Fragen

### Welche Daten werden unterstützt?

Nenne Formate, Größenlimits und bekannte Sonderfälle.

### Was passiert bei einer ungültigen Eingabe?

Erkläre, wie Fehler angezeigt werden und wie Nutzer sie beheben können.

## Datenschutz und Grenzen

Beschreibe die Verarbeitung, technische Grenzen und gegebenenfalls die verwendeten Quellen oder Standards.`;

export const calculatorTemplate = `<style>
:root{
  --navy:#071a31;--navy-soft:#0d2847;--lime:#b8ef2c;--lime-dark:#82ad11;
  --text:#536174;--line:#dce3ea;--soft:#f5f8fa;--white:#fff;--danger:#9b2c2c;
}
.calculator{max-width:860px;margin:0 auto;padding:clamp(22px,4vw,38px);color:var(--navy)}
.calculator *{box-sizing:border-box}
.calculator__head{margin-bottom:26px}
.calculator__kicker{margin:0 0 8px;color:#58770b;font-size:12px;font-weight:850;letter-spacing:.11em;text-transform:uppercase}
.calculator h2{margin:0;font-size:clamp(27px,5vw,39px);line-height:1.08;letter-spacing:-.04em}
.calculator__intro{max-width:680px;margin:12px 0 0;color:var(--text);font-size:15px;line-height:1.65}
.field-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}
.field{display:grid;gap:8px;min-width:0}
.field__label{display:flex;align-items:center;gap:7px;color:#435267;font-size:14px;font-weight:780}
.info-button{width:20px;height:20px;padding:0;display:inline-grid;place-items:center;border:1px solid #9ba9b8;border-radius:50%;background:#fff;color:#5b6b7e;font-size:12px;font-weight:900;cursor:pointer}
.info-button:hover,.info-button:focus-visible{border-color:var(--lime-dark);background:var(--lime);color:var(--navy);outline:3px solid rgba(130,173,17,.2)}
.field__control{min-height:54px;display:flex;align-items:center;border:1px solid #cbd5df;border-radius:11px;background:#fff;overflow:hidden}
.field__control:focus-within{border-color:var(--lime-dark);outline:3px solid rgba(184,239,44,.22)}
.field input,.field select{width:100%;min-width:0;height:52px;padding:0 15px;border:0;background:transparent;color:var(--navy);font-weight:750;outline:0}
.field__unit{padding-right:14px;color:#718095;font-size:14px;font-weight:750;white-space:nowrap}
.field__help{display:none;margin:0;padding:9px 11px;border-radius:8px;background:#edf4f7;color:#4d6074;font-size:13px;line-height:1.5}
.field__help.is-open{display:block}
.actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:22px}
.button{min-height:48px;padding:0 19px;border:1px solid transparent;border-radius:10px;font-weight:850;cursor:pointer;transition:transform .16s,background .16s}
.button:hover{transform:translateY(-1px)}
.button--primary{background:var(--lime);color:var(--navy)}
.button--primary:hover{background:#a7dc25}
.button--secondary{border-color:#cbd5df;background:#fff;color:var(--navy)}
.result{margin-top:24px;padding:24px;border-radius:14px;background:var(--navy);color:#fff}
.result__label{display:block;color:#aebdcc;font-size:13px;font-weight:750}
.result output{display:block;margin:7px 0 3px;color:var(--lime);font-size:clamp(31px,7vw,46px);font-weight:850;letter-spacing:-.04em}
.result__detail{margin:0;color:#bdc9d5;font-size:14px;line-height:1.5}
.error{min-height:22px;margin:10px 0 0;color:var(--danger);font-size:13px;font-weight:750}
@media(max-width:620px){.calculator{padding:20px}.field-grid{grid-template-columns:1fr}.button{flex:1 1 150px}.result{padding:20px}}
</style>

<form class="calculator" id="calculator" novalidate>
  <header class="calculator__head">
    <p class="calculator__kicker">Sofort berechnet</p>
    <h2>Prozentwert berechnen</h2>
    <p class="calculator__intro">Grundwert und Prozentsatz eingeben. Das Ergebnis aktualisiert sich direkt und bleibt nur in deinem Browser.</p>
  </header>

  <div class="field-grid">
    <label class="field">
      <span class="field__label">Grundwert <button class="info-button" type="button" data-help="base-help" aria-expanded="false" aria-controls="base-help" aria-label="Hilfe zum Grundwert">i</button></span>
      <span class="field__control"><input id="base" name="base" type="number" min="0" step="0.01" value="240" inputmode="decimal" required><span class="field__unit">€</span></span>
      <span class="field__help" id="base-help">Der vollständige Ausgangswert, von dem ein Anteil berechnet wird.</span>
    </label>

    <label class="field">
      <span class="field__label">Prozentsatz <button class="info-button" type="button" data-help="rate-help" aria-expanded="false" aria-controls="rate-help" aria-label="Hilfe zum Prozentsatz">i</button></span>
      <span class="field__control"><input id="rate" name="rate" type="number" min="0" step="0.01" value="15" inputmode="decimal" required><span class="field__unit">%</span></span>
      <span class="field__help" id="rate-help">Der Anteil in Prozent. 15 Prozent entsprechen dem Faktor 0,15.</span>
    </label>

    <label class="field">
      <span class="field__label">Berechnung</span>
      <span class="field__control"><select id="mode" name="mode"><option value="share">Nur Prozentwert</option><option value="discount">Preis nach Rabatt</option><option value="increase">Preis nach Aufschlag</option></select></span>
    </label>
  </div>

  <p class="error" id="error" role="alert"></p>
  <div class="actions">
    <button class="button button--primary" type="submit">Jetzt berechnen</button>
    <button class="button button--secondary" type="reset">Eingaben zurücksetzen</button>
  </div>

  <section class="result" aria-live="polite" aria-atomic="true">
    <span class="result__label" id="result-label">Prozentwert</span>
    <output id="result">36,00 €</output>
    <p class="result__detail" id="result-detail">15 % von 240,00 €</p>
  </section>
</form>

<script>
const form = document.getElementById('calculator');
const base = document.getElementById('base');
const rate = document.getElementById('rate');
const mode = document.getElementById('mode');
const result = document.getElementById('result');
const resultLabel = document.getElementById('result-label');
const resultDetail = document.getElementById('result-detail');
const error = document.getElementById('error');
const money = new Intl.NumberFormat('de-DE',{style:'currency',currency:'EUR'});

function calculate(event){
  if(event) event.preventDefault();
  const baseValue = Number(base.value);
  const rateValue = Number(rate.value);
  if(base.value === '' || rate.value === '' || !Number.isFinite(baseValue) || !Number.isFinite(rateValue) || baseValue < 0 || rateValue < 0){
    error.textContent = 'Bitte gib zwei gültige, nicht negative Werte ein.';
    result.textContent = '–';
    resultDetail.textContent = 'Prüfe die Eingaben.';
    return;
  }
  error.textContent = '';
  const share = baseValue * rateValue / 100;
  const values = {
    share:['Prozentwert',share,rateValue + ' % von ' + money.format(baseValue)],
    discount:['Preis nach Rabatt',baseValue-share,money.format(baseValue) + ' minus ' + money.format(share)],
    increase:['Preis nach Aufschlag',baseValue+share,money.format(baseValue) + ' plus ' + money.format(share)]
  };
  const selected = values[mode.value];
  resultLabel.textContent = selected[0];
  result.textContent = money.format(selected[1]);
  resultDetail.textContent = selected[2];
}

form.addEventListener('submit',calculate);
form.addEventListener('input',calculate);
form.addEventListener('reset',()=>setTimeout(calculate));
document.querySelectorAll('.info-button').forEach(button=>button.addEventListener('click',()=>{
  const help = document.getElementById(button.dataset.help);
  const open = !help.classList.contains('is-open');
  help.classList.toggle('is-open',open);
  button.setAttribute('aria-expanded',String(open));
}));
calculate();
</script>`;

export function templateFor(kind: PageKind): PageDraft {
  const shared = { ...emptyDraft, kind };
  if (kind === "rechner") return { ...shared, title: "Prozentrechner mit Rechenweg", slug: "prozentrechner-beispiel", description: "Prozentwert, Rabatt und Aufschlag direkt online berechnen – mit verständlichem Rechenweg und Beispielen.", eyebrow: "Geld & Beruf", category: "Rechner", body: calculatorTextTemplate, code: calculatorTemplate };
  if (kind === "tool") return { ...shared, title: "Text-Werkzeug Beispiel", slug: "text-werkzeug-beispiel", description: "Text direkt im Browser bearbeiten, prüfen und kopieren – einfach, lokal und ohne Anmeldung.", eyebrow: "Text & Sprache", category: "Tool", body: toolTextTemplate, code: calculatorTemplate };
  return { ...shared, title: "Stundenlohn richtig berechnen und vergleichen", slug: "stundenlohn-richtig-berechnen", description: "Stundenlohn aus Monatsgehalt und Arbeitszeit berechnen, typische Fehler vermeiden und Angebote fair vergleichen.", eyebrow: "Geld & Beruf", category: "Ratgeber", body: guideTemplateBody, code: "" };
}
