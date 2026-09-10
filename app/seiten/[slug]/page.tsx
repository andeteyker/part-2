import { notFound } from "next/navigation";
import { publishedPage } from "../../../db/studio";
import { PageContent } from "../../studio/PageContent";
import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
export const dynamic="force-dynamic";
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const record=await publishedPage(slug);if(!record)return {};const p=JSON.parse(record.published!);return {title:p.title,description:p.description,alternates:{canonical:'/seiten/'+slug}};}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const record=await publishedPage(slug);if(!record)notFound();return <><SiteHeader/><main className="shell"><PageContent page={JSON.parse(record.published!)}/></main><SiteFooter/></>;}
