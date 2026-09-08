import { agentConfig } from "@/config/agent-config";

export type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

function demoReply(input: string, fileNames: string[]) {
  const lower = input.toLowerCase();
  if (fileNames.length) {
    return `আপনার বার্তার সঙ্গে ${fileNames.length}টি ফাইল সংযুক্ত আছে: ${fileNames.join(", ")}।\n\nএটি এখন starter mode-এ চলছে, তাই ফাইলের ভেতরের বিষয়বস্তু এখনো বিশ্লেষণ করা হচ্ছে না। AI provider configure করলে file processing/RAG module যুক্ত করা যাবে।`;
  }
  if (lower.includes("হ্যালো") || lower.includes("hello") || lower.includes("hi")) {
    return `হ্যালো! আমি **${agentConfig.name}**।\n\nএটি বর্তমানে Demo mode-এ চলছে। আপনার নিজের AI API যুক্ত করতে .env.local-এ provider configuration বসান।`;
  }
  return `আমি আপনার অনুরোধটি পেয়েছি:\n\n> ${input}\n\nএটি **Demo mode**-এর উত্তর। বাস্তব AI উত্তর পেতে .env.local-এ AI_PROVIDER, AI_API_KEY এবং AI_MODEL সেট করুন।`;
}

export async function generateReply(messages: ChatMessage[], fileNames: string[] = []) {
  const provider = process.env.AI_PROVIDER || "demo";
  if (provider === "demo" || !process.env.AI_API_KEY) {
    const last = messages.filter((m) => m.role === "user").at(-1)?.content || "";
    return demoReply(last, fileNames);
  }

  const baseUrl = (process.env.AI_BASE_URL || "https://api.openai.com/v1").replace(/\/$/, "");
  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.AI_API_KEY}` },
    body: JSON.stringify({
      model: process.env.AI_MODEL || "gpt-4o-mini",
      messages: [{ role: "system", content: agentConfig.systemPrompt }, ...messages.filter((m) => m.role !== "system")],
      temperature: 0.7,
    }),
  });
  if (!response.ok) throw new Error(`AI provider returned ${response.status}`);
  const data = (await response.json()) as { choices?: Array<{ message?: { content?: string } }> };
  return data.choices?.[0]?.message?.content || "Provider returned an empty response.";
}
