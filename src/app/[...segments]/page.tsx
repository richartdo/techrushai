import { notFound } from "next/navigation";
import { ProductArea } from "@/components/app/product-area";
export const instant = false;
const publicRoots=new Set(["about","features","how-it-works"]);const protectedRoots=new Set(["dashboard","profiles","learning","second-brain","projects","portfolio","career","social","settings"]);
export default async function Page({params}:{params:Promise<{segments:string[]}>}){const {segments}=await params;const root=segments[0];if(!root||(!publicRoots.has(root)&&!protectedRoots.has(root)))notFound();return <ProductArea segments={segments}/>}
