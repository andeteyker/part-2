import { requireChatGPTUser } from "../chatgpt-auth";
import { StudioEditor } from "./StudioEditor";
import { categories, tools } from "../data/tool-registry";
export const dynamic = "force-dynamic";
export const metadata = { title:"SofortTools Studio", robots:{index:false,follow:false} };
async function ProtectedEditor() {
  const user=await requireChatGPTUser("/studio");
  if(user.email.toLowerCase() !== "mielerik@gmail.com") return <main className="shell"><h1>Kein Zugriff</h1><p>Dieser Bereich ist nur für den Betreiber freigegeben.</p><a href="/signout-with-chatgpt?return_to=/studio">Konto wechseln</a></main>;
  return <StudioEditor tools={tools.map(t=>({slug:t.slug,title:t.title}))} categories={categories}/>;
}
export default function StudioPage() { return <ProtectedEditor/>; }
