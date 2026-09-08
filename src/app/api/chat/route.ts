import { NextRequest, NextResponse } from "next/server";
import { generateReply, type ChatMessage } from "@/lib/ai/provider";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { messages?: ChatMessage[]; fileNames?: string[] };
    if (!Array.isArray(body.messages)) return NextResponse.json({ error: "messages must be an array" }, { status: 400 });
    const messages = body.messages.slice(-30).filter((m) => ["user", "assistant"].includes(m.role) && typeof m.content === "string");
    const reply = await generateReply(messages, body.fileNames || []);
    return NextResponse.json({ reply, provider: process.env.AI_PROVIDER || "demo" });
  } catch (error) {
    console.error("Chat API error", error);
    return NextResponse.json({ error: "দুঃখিত, এই মুহূর্তে উত্তর তৈরি করা যায়নি। API configuration এবং server log পরীক্ষা করুন।" }, { status: 500 });
  }
}
