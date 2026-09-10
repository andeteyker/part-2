import test from 'node:test';
import assert from 'node:assert/strict';
import { registerHooks } from 'node:module';
import { DatabaseSync } from 'node:sqlite';
import { readFile } from 'node:fs/promises';
const sql=new DatabaseSync(':memory:');
sql.exec(await readFile(new URL('../drizzle/0000_lonely_iron_fist.sql',import.meta.url),'utf8'));
globalThis.__studioTestEnv={DB:{prepare(query){let params=[];return {bind(...values){params=values;return this;},async first(){return sql.prepare(query).get(...params)??null;},async all(){return {results:sql.prepare(query).all(...params)};},async run(){const r=sql.prepare(query).run(...params);return {meta:{changes:Number(r.changes)}};}}}}};
registerHooks({resolve(specifier,context,next){if(specifier==='cloudflare:workers')return {url:'data:text/javascript,export const env = globalThis.__studioTestEnv',shortCircuit:true};return next(specifier,context);}});
const {default:worker}=await import('../dist/server/index.js');
async function request(path,body,email){const headers={accept:'text/html'};if(email)headers['oai-authenticated-user-email']=email;if(body){headers['content-type']='application/json';headers.origin='https://example.test';}return worker.fetch(new Request('https://example.test'+path,{method:body?'POST':'GET',headers,body:body?JSON.stringify(body):undefined}),{ASSETS:{fetch:async()=>new Response('',{status:404})}},{waitUntil(){},passThroughOnException(){}});}
test('studio authorization, persistence, draft isolation and publication',async()=>{
  assert.equal((await request('/api/studio')).status,403);
  assert.equal((await request('/api/studio',null,'someone@example.test')).status,403);
  const draft={slug:'test-page',title:'Testseite',description:'Eine Testseite',kind:'ratgeber',body:'Ein Beispiel mit [Rechner](/tools/prozentrechner).',code:''};
  const owner='mielerik@gmail.com';
  assert.equal((await request('/api/studio',{draft,revision:0,action:'save'},owner)).status,200);
  assert.equal((await request('/seiten/test-page')).status,404);
  assert.equal((await request('/api/studio',{draft,revision:1,action:'publish'},owner)).status,200);
  assert.match(await (await request('/seiten/test-page')).text(),/Ein Beispiel/);
  draft.body='Unveröffentlichte Änderung';
  assert.equal((await request('/api/studio',{draft,revision:2,action:'save'},owner)).status,200);
  assert.doesNotMatch(await (await request('/seiten/test-page')).text(),/Unveröffentlichte Änderung/);
  assert.equal((await request('/api/studio',{draft,revision:2,action:'publish'},owner)).status,409);
  assert.equal((await request('/api/studio',{draft,revision:3,action:'unpublish'},owner)).status,200);
  assert.equal((await request('/seiten/test-page')).status,404);
  assert.equal((await (await request('/api/studio',null,owner)).json()).length,1);
});
