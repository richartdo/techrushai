import { NextResponse } from "next/server";
import { generateRoadmap } from "@/lib/ai/meta";
export async function POST(){try{return NextResponse.json(await generateRoadmap())}catch(error){return NextResponse.json({error:error instanceof Error?error.message:"Unable to generate roadmap"},{status:503})}}
