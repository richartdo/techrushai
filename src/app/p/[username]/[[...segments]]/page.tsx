import { ProductArea } from "@/components/app/product-area";
export const instant = false;
export default async function PublicPortfolio({params}:{params:Promise<{username:string;segments?:string[]}>}){const {username,segments=[]}=await params;return <ProductArea segments={["portfolio",username,...segments]}/>}
