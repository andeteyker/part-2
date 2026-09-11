"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { calculatorTemplate, emptyDraft, type PageDraft, type PageRecord } from "./model";
import { PageContent } from "./PageContent";
export function StudioEditor({tools}:{tools:{slug:string;title:string}[]}) {
  const [pages,setPages]=useState<PageRecord[]>([]),[draft,setDraft]=useState<PageDraft>({...emptyDraft}),[revision,setRevision]=useState(0),[message,setMessage]=useState(""),[busy,setBusy]=useState(false),[preview,setPreview]=useState(false),[dirty,setDirty]=useState(false);
  const [selectedTool,setSelectedTool]=useState(tools[0]?.slug ?? "");
  async function reload() {try {const r=await fetch('/api/studio',{cache:'no-store'}); const data=await r.json(); if(!r.ok) throw new Error(data.error); setPages(data);}catch(e){setMessage(e instanceof Error?e.message:"Laden fehlgeschlagen.");}}
  useEffect(()=>{
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void reload();
  },[]);
  useEffect(()=>{const warn=(e:BeforeUnloadEvent)=>{if(dirty){e.preventDefault();e.returnValue='';}};window.addEventListener('beforeunload',warn);return()=>window.removeEventListener('beforeunload',warn);},[dirty]);
  function update(key:keyof PageDraft,value:string){setDraft(d=>({...d,[key]:value}));setDirty(true);}
  function select(page?:PageRecord){if(dirty&&!confirm('Ungespeicherte Änderungen verwerfen?'))return;setDraft(page?JSON.parse(page.draft):{...emptyDraft});setRevision(page?.revision??0);setDirty(false);setPreview(false);setMessage('');}
  async function save(action:string){setBusy(true);setMessage('');try{const r=await fetch('/api/studio',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({draft,revision,action})});const data=await r.json();if(!r.ok)throw new Error(data.error);setRevision(data.revision);setDirty(false);setMessage(action==='publish'?'Die Seite ist jetzt veröffentlicht.':action==='unpublish'?'Die Seite ist offline. Dein Entwurf bleibt gespeichert.':'Entwurf gespeichert. Eine bestehende Live-Version bleibt unverändert.');await reload();}catch(e){setMessage(e instanceof Error?e.message:'Speichern fehlgeschlagen.');}finally{setBusy(false);}}
  const inputStyle={width:'100%',padding:12,border:'1px solid #b8c6d2',borderRadius:8,font:'inherit'};
  return <main className="shell studio" style={{paddingBlock:32}}><header><Link href="/">← SofortTools</Link><h1>SofortTools Studio</h1><p>Seiten erstellen, prüfen und direkt veröffentlichen.</p><a href="/signout-with-chatgpt?return_to=/">Abmelden</a></header>
    <div style={{display:'flex',gap:32,flexWrap:'wrap',marginTop:24}}>
    <aside style={{flex:'1 1 220px'}}><button disabled={busy} onClick={()=>select()}>+ Neue Seite</button><button disabled={busy} onClick={reload}>Liste aktualisieren</button><h2>Deine Studio-Seiten</h2>{pages.length===0&&<p>Noch keine Studio-Seiten geladen.</p>}{pages.map(p=><p key={p.slug}><button disabled={busy} onClick={()=>select(p)}>{JSON.parse(p.draft).title} · {p.published?'Live':'Entwurf'}</button></p>)}<p>Die vorhandenen, im Quellcode hinterlegten Rechner und Ratgeber bleiben unverändert. Hier verwaltest du neu angelegte Studio-Seiten.</p><Link href="/seiten">Veröffentlichte Studio-Seiten</Link></aside>
    <section style={{flex:'3 1 500px',minWidth:0}}><fieldset disabled={busy} style={{border:0,padding:0,display:'grid',gap:16}}>
      <label>Seitentyp<select style={inputStyle} value={draft.kind} onChange={e=>update('kind',e.target.value)}><option value="ratgeber">Ratgeber</option><option value="rechner">Rechner</option><option value="tool">Tool</option></select></label>
      <button onClick={()=>{if(dirty&&!confirm('Editorinhalt durch Vorlage ersetzen?'))return;setDraft(d=>({...d,body:'## Worum geht es?\n\nErkläre die konkrete Frage deiner Leser.\n\n## Beispielrechnung\n\nVerlinke hier passende Rechner direkt im Text.\n\n## Grenzen und Quellen\n\nNenne Annahmen und verlässliche Quellen.',code:d.kind==='ratgeber'?'':calculatorTemplate}));setDirty(true);}}>Vorlage einsetzen</button>
      <label>Titel<input style={inputStyle} value={draft.title} onChange={e=>update('title',e.target.value)}/></label>
      <label>URL: /seiten/<input style={inputStyle} disabled={revision>0} value={draft.slug} placeholder="mein-neuer-rechner" onChange={e=>update('slug',e.target.value)}/></label>
      <label>Kurzbeschreibung / Suchmaschinenbeschreibung<textarea style={inputStyle} rows={3} value={draft.description} onChange={e=>update('description',e.target.value)}/></label>
      <label>Artikeltext<textarea style={inputStyle} rows={16} value={draft.body} onChange={e=>update('body',e.target.value)}/></label><p>Absätze mit Leerzeile trennen. Überschriften: ## Überschrift. Links: [Linktext](/tools/rechner-slug).</p>
      <label>Rechner verlinken<select style={inputStyle} value={selectedTool} onChange={e=>setSelectedTool(e.target.value)}>{tools.map(t=><option key={t.slug} value={t.slug}>{t.title}</option>)}</select></label><button onClick={()=>{const t=tools.find(t=>t.slug===selectedTool);if(t)update('body',draft.body+` [${t.title}](/tools/${t.slug})`);}}>Rechnerlink am Textende einfügen</button>
      <details><summary>HTML, CSS und JavaScript für ein interaktives Tool</summary><p>Kompletten Code mit &lt;style&gt; und &lt;script&gt; einfügen. Er läuft isoliert: keine externen Bibliotheken, Netzwerkanfragen oder Zugriffe auf den Verwaltungsbereich. Kein React/TSX.</p><textarea style={{...inputStyle,fontFamily:'monospace'}} rows={18} value={draft.code} onChange={e=>update('code',e.target.value)}/></details>
      <div style={{display:'flex',gap:12,flexWrap:'wrap'}}><button onClick={()=>save('save')}>Entwurf speichern</button><button onClick={()=>setPreview(!preview)}>Vorschau {preview?'schließen':'öffnen'}</button><button onClick={()=>{if(confirm('Diese Fassung öffentlich veröffentlichen?'))void save('publish');}}>Veröffentlichen</button>{revision>0&&<button onClick={()=>{if(confirm('Die Seite öffentlich offline nehmen?'))void save('unpublish');}}>Offline nehmen</button>}</div>
    </fieldset><p role="status">{busy?'Wird gespeichert …':message}</p>{revision>0&&pages.find(p=>p.slug===draft.slug)?.published&&<a href={'/seiten/'+draft.slug} target="_blank" rel="noopener noreferrer">Live-Seite öffnen ↗</a>}{preview&&<section aria-label="Seitenvorschau"><h2>Vorschau · noch nicht veröffentlicht</h2><PageContent page={draft}/></section>}</section></div>
  </main>;
}
