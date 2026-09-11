import test from 'node:test';
import assert from 'node:assert/strict';
import { registerHooks } from 'node:module';
import { DatabaseSync } from 'node:sqlite';
import { readFile } from 'node:fs/promises';
const sql=new DatabaseSync(':memory:');
sql.exec(await readFile(new URL('../drizzle/0000_lonely_iron_fist.sql',import.meta.url),'utf8'));
globalThis.__studioTestEnv={STUDIO_API_KEY:'test-api-key-with-at-least-32-characters',DB:{prepare(query){let params=[];return {bind(...values){params=values;return this;},async first(){return sql.prepare(query).get(...params)??null;},async all(){return {results:sql.prepare(query).all(...params)};},async run(){const r=sql.prepare(query).run(...params);return {meta:{changes:Number(r.changes)}};}}}}};
registerHooks({resolve(specifier,context,next){if(specifier==='cloudflare:workers')return {url:'data:text/javascript,export const env = globalThis.__studioTestEnv',shortCircuit:true};return next(specifier,context);}});
const {default:worker}=await import('../dist/server/index.js');
async function request(path,body,email){const headers={accept:'text/html'};if(email)headers['oai-authenticated-user-email']=email;if(body){headers['content-type']='application/json';headers.origin='https://example.test';}return worker.fetch(new Request('https://example.test'+path,{method:body?'POST':'GET',headers,body:body?JSON.stringify(body):undefined}),{ASSETS:{fetch:async()=>new Response('',{status:404})}},{waitUntil(){},passThroughOnException(){}});}
async function apiRequest(path,body,key='test-api-key-with-at-least-32-characters'){const headers={accept:'application/json',authorization:'Bearer '+key};if(body)headers['content-type']='application/json';return worker.fetch(new Request('https://example.test'+path,{method:body?'POST':'GET',headers,body:body?JSON.stringify(body):undefined}),{ASSETS:{fetch:async()=>new Response('',{status:404})}},{waitUntil(){},passThroughOnException(){}});}
test('studio authorization, persistence, draft isolation and publication',async()=>{
  assert.equal((await request('/api/studio')).status,403);
  assert.equal((await request('/api/studio',null,'someone@example.test')).status,403);
  assert.equal((await apiRequest('/api/studio',null,'wrong-key')).status,403);
  const draft={slug:'test-page',title:'Testseite',description:'Eine Testseite',kind:'ratgeber',eyebrow:'Praxiswissen',category:'Testkategorie',body:'## Beispiel\n\n> INFO: Ein konkreter Hinweis.\n\n| Wert | Ergebnis |\n| --- | ---: |\n| Beispiel | 42 |\n\nMit [Rechner](/tools/prozentrechner).',code:''};
  const owner='mielerik@gmail.com';
  assert.equal((await request('/api/studio',{draft,revision:0,action:'save'},owner)).status,200);
  assert.equal((await request('/seiten/test-page')).status,404);
  assert.equal((await request('/api/studio',{draft,revision:1,action:'publish'},owner)).status,200);
  const liveHtml=await (await request('/seiten/test-page')).text();
  assert.match(liveHtml,/Ein konkreter Hinweis/);
  assert.match(liveHtml,/guide-callout/);
  assert.match(liveHtml,/guide-table/);
  draft.body='Unveröffentlichte Änderung';
  assert.equal((await request('/api/studio',{draft,revision:2,action:'save'},owner)).status,200);
  assert.doesNotMatch(await (await request('/seiten/test-page')).text(),/Unveröffentlichte Änderung/);
  assert.equal((await request('/api/studio',{draft,revision:2,action:'publish'},owner)).status,409);
  assert.equal((await request('/api/studio',{draft,revision:3,action:'unpublish'},owner)).status,200);
  assert.equal((await request('/seiten/test-page')).status,404);
  assert.equal((await (await request('/api/studio',null,owner)).json()).length,1);
  assert.equal((await apiRequest('/api/studio')).status,200);
});

test('studio API key can publish without a browser origin header',async()=>{
  const draft={slug:'hermes-page',title:'Hermes Testseite',description:'Von der externen API verwaltet',kind:'ratgeber',eyebrow:'API-Test',category:'Ratgeber',body:'## Externer Zugriff\n\nDie Seite wurde über die Studio-API gespeichert.',code:''};
  const saved=await apiRequest('/api/studio',{draft,revision:0,action:'publish'});
  assert.equal(saved.status,200);
  assert.equal((await saved.json()).revision,1);
  const page=await request('/seiten/hermes-page');
  assert.equal(page.status,200);
  assert.match(await page.text(),/Die Seite wurde über die Studio-API gespeichert/);
});
