# SOFIKUL AI AGENT CHAT

SOFIKUL AI AGENT CHAT হলো একটি modular, বাংলা-friendly general-purpose AI agent-এর runnable starter project। এই version-এ responsive chat interface, conversation switching, file/image attachment metadata, central agent configuration, demo fallback এবং OpenAI-compatible provider adapter অন্তর্ভুক্ত আছে।

## বর্তমান version-এ যা কাজ করছে

- বাংলা ও English chat UI
- Responsive desktop/mobile layout
- New conversation
- Conversation list এবং active conversation switching
- Text message send করা
- Enter দিয়ে send, Shift+Enter দিয়ে নতুন line
- File/image attachment নির্বাচন
- Attachment-এর নাম chat context-এ পাঠানো
- Server-side `/api/chat` route
- Demo mode: API key ছাড়াই UI test করা যায়
- OpenAI-compatible provider adapter
- Central system prompt এবং capability configuration
- API key frontend-এ না পাঠানোর ব্যবস্থা
- Friendly server error response

## গুরুত্বপূর্ণ সীমাবদ্ধতা

এটি একটি **starter release**, সম্পূর্ণ production AI platform নয়। PDF extraction, RAG/vector database, web search, long-term memory, Telegram bot, image generation, image editing এবং sandbox code execution-এর module boundary তৈরি করার জন্য configuration রাখা হয়েছে; এগুলো provider, database বা আলাদা নিরাপদ service configure না করা পর্যন্ত সক্রিয় নয়। Demo mode কখনো real AI search, code execution বা image generation হয়েছে বলে দাবি করে না।

## Requirements

- Node.js 18.17 অথবা তার পরের LTS version
- npm 9+
- Windows, macOS অথবা Linux

## Installation

```bash
npm install
```

Environment file তৈরি করুন:

```bash
cp .env.example .env.local
```

Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

## প্রথমে Demo mode-এ চালান

`.env.local`-এ রাখুন:

```env
AI_PROVIDER=demo
AI_API_KEY=
AI_BASE_URL=https://api.openai.com/v1
AI_MODEL=gpt-4o-mini
```

তারপর:

```bash
npm run dev
```

Browser-এ খুলুন:

```text
http://localhost:3000
```

## OpenAI-compatible provider যুক্ত করা

শুধু server-side `.env.local`-এ credentials বসান:

```env
AI_PROVIDER=openai-compatible
AI_API_KEY=আপনার_আসল_API_KEY
AI_BASE_URL=https://api.openai.com/v1
AI_MODEL=gpt-4o-mini
```

অন্য OpenAI-compatible provider হলে তার `/v1` API base URL এবং model name ব্যবহার করুন। `.env.local` কখনো GitHub-এ commit করবেন না।

## Commands

```bash
npm run dev       # development server
npm run typecheck # TypeScript পরীক্ষা
npm run build     # production build
npm run start     # production server
```

## Project structure

```text
src/
├── app/
│   ├── api/chat/route.ts       # server-side chat endpoint
│   ├── globals.css              # visual system
│   ├── layout.tsx               # metadata এবং root layout
│   └── page.tsx                 # chat workspace
├── config/
│   └── agent-config.ts          # central prompt/capability config
└── lib/
    └── ai/provider.ts           # demo এবং OpenAI-compatible adapter
```

## Configuration কোথায় পরিবর্তন করবেন

- Agent-এর নাম, system prompt, capability flags: `src/config/agent-config.ts`
- AI provider logic: `src/lib/ai/provider.ts`
- Chat API validation/error handling: `src/app/api/chat/route.ts`
- UI এবং layout: `src/app/page.tsx`
- Design/theme: `src/app/globals.css`

## নিরাপত্তা

- API key কেবল server-side environment variable থেকে পড়া হয়।
- `.env.local`, uploads এবং build output Git-এ ignore করা আছে।
- Demo mode-এ কোনো external provider call হয় না।
- Unavailable feature-কে available বলে দাবি করা হয় না।
- Production deployment-এর আগে authentication, rate limiting, durable database, malware scanning এবং private file storage যোগ করা আবশ্যক।

## পরবর্তী production roadmap

1. Authentication এবং user-scoped conversation database
2. PDF/TXT/DOCX extraction pipeline
3. Chunking, embeddings এবং vector database RAG
4. Citation-aware web search এবং research mode
5. Secure file storage and antivirus validation
6. Rate limiting, audit logging এবং abuse protection
7. Telegram adapter
8. Image generation/editing provider adapters
9. Isolated code execution service
10. Deployment secrets এবং monitoring

## License

MIT — নিজের project হিসেবে পরিবর্তন ও ব্যবহার করতে পারবেন। Third-party AI provider-এর terms, pricing এবং safety policy আলাদা করে মানতে হবে।
