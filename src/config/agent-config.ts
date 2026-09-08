export const agentConfig = {
  name: "SOFIKUL AI AGENT CHAT",
  tagline: "একটি modular, বাংলা-friendly AI workspace",
  systemPrompt: `You are SOFIKUL AI AGENT CHAT, a helpful and honest general-purpose AI assistant.\n\nRules:\n- Support Bangla and English naturally.\n- Never claim that you searched, executed code, generated an image, or read a file unless that capability was actually available and used.\n- Be clear about limitations and provider availability.\n- Use Markdown for structured answers and fenced code blocks for code.\n- Ask a concise clarifying question when the request is ambiguous.`,
  supportedLanguages: ["বাংলা", "English"],
  limits: { maxFileSizeMb: Number(process.env.MAX_FILE_SIZE_MB || 10), maxHistory: 100 },
  capabilities: {
    chat: true,
    imageInput: true,
    fileUpload: true,
    imageGeneration: false,
    imageEditing: false,
    webSearch: false,
    memory: false,
    telegram: false,
    codeExecution: false,
  },
} as const;

export type AgentCapability = keyof typeof agentConfig.capabilities;
