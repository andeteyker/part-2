import { sandboxDocument, type PageDraft } from "./model";
function inline(text: string) {
  return text.split(/(\[[^\]]+\]\([^\s)]+\))/g).map((part,i)=>{
    const match=part.match(/^\[([^\]]+)\]\(([^\s)]+)\)$/);
    if(!match) return part;
    const href=match[2];
    if(!/^\/(?!\/)/.test(href) && !/^https:\/\//.test(href)) return match[1];
    return <a key={i} href={href} className="guide-text-link" rel={href.startsWith("https:") ? "noopener noreferrer" : undefined}>{match[1]}</a>;
  });
}
export function PageContent({page}: {page:PageDraft}) {
  return <article className="guide-body"><h1>{page.title || "Seitentitel"}</h1><p>{page.description}</p>
    {page.code && <iframe title={page.title + " – interaktives Tool"} sandbox="allow-scripts" referrerPolicy="no-referrer" srcDoc={sandboxDocument(page.code)} style={{width:"100%",height:480,border:"1px solid #dce3ea",borderRadius:12}} />}
    <div className="guide-section">{page.body.split(/\n\s*\n/).map((block,i)=> block.startsWith("## ") ? <h2 key={i}>{block.slice(3)}</h2> : <p key={i} style={{whiteSpace:"pre-wrap"}}>{inline(block)}</p>)}</div>
  </article>;
}
