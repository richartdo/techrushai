import { NextResponse } from "next/server";
import { tutorRequestSchema } from "@/lib/validations/roadmap";
import { tutorReply } from "@/lib/ai/meta";
export async function POST(request:Request){try{const body=tutorRequestSchema.parse(await request.json());return NextResponse.json(await tutorReply(body.message))}catch(error){return NextResponse.json({error:error instanceof Error?error.message:"Invalid tutor request"},{status:400})}}
