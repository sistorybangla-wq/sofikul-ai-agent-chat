# SOFIKUL AI AGENT CHAT — Setup Guide

## ১. ZIP extract করুন

ZIP file extract করে project folder-এ Terminal খুলুন:

```bash
cd SOFIKUL-AI-AGENT-CHAT
```

## ২. Node.js পরীক্ষা করুন

```bash
node --version
npm --version
```

Node.js 18.17+ বা নতুন LTS ব্যবহার করুন।

## ৩. Dependencies install করুন

```bash
npm install
```

## ৪. Environment file তৈরি করুন

Linux/macOS:

```bash
cp .env.example .env.local
```

Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

প্রথমে Demo mode রাখুন:

```env
AI_PROVIDER=demo
AI_API_KEY=
AI_BASE_URL=https://api.openai.com/v1
AI_MODEL=gpt-4o-mini
```

## ৫. Local server চালান

```bash
npm run dev
```

Browser-এ খুলুন: `http://localhost:3000`

## ৬. নিজের AI API যুক্ত করুন

`.env.local`-এ বসান:

```env
AI_PROVIDER=openai-compatible
AI_API_KEY=আপনার_API_KEY
AI_BASE_URL=https://api.openai.com/v1
AI_MODEL=gpt-4o-mini
```

তারপর dev server বন্ধ করে আবার চালান:

```bash
npm run dev
```

API key কখনো frontend code, GitHub বা screenshot-এ প্রকাশ করবেন না।

## ৭. Test ও production build

```bash
npm run typecheck
npm run build
npm run start
```

Production server চালু হলে `http://localhost:3000` খুলুন।

## ৮. কোথায় কী পরিবর্তন করবেন

| কাজ | File |
|---|---|
| Agent-এর নাম ও system prompt | `src/config/agent-config.ts` |
| Provider/API logic | `src/lib/ai/provider.ts` |
| Chat API | `src/app/api/chat/route.ts` |
| Chat screen | `src/app/page.tsx` |
| Theme/design | `src/app/globals.css` |
| Environment variables | `.env.local` |

## ৯. এখনো সক্রিয় নয় এমন capability

এই starter-এ file/image selection UI আছে, কিন্তু PDF extraction, RAG, web search, memory, Telegram, image generation/editing এবং code execution production-safeভাবে configure করা হয়নি। এগুলো বাস্তবে চালু করতে আলাদা provider, storage, database, security এবং rate limiting লাগবে।

## ১০. Common সমস্যা

### `npm` command পাওয়া যাচ্ছে না

Node.js LTS install করে Terminal নতুন করে খুলুন।

### Port 3000 ব্যস্ত

অন্য server বন্ধ করুন অথবা চালান:

```bash
npm run dev -- -p 3001
```

তারপর `http://localhost:3001` খুলুন।

### AI provider error

`AI_API_KEY`, `AI_BASE_URL`, `AI_MODEL` এবং `AI_PROVIDER` যাচাই করুন। API key না থাকলে `AI_PROVIDER=demo` রেখে UI পরীক্ষা করুন।

### Build error

```bash
rm -rf .next node_modules package-lock.json
npm install
npm run typecheck
npm run build
```

Windows PowerShell:

```powershell
Remove-Item -Recurse -Force .next, node_modules, package-lock.json
npm install
npm run typecheck
npm run build
```
