"use client";

import { useMemo, useRef, useState } from "react";

type Message = { id: string; role: "user" | "assistant"; content: string; fileNames?: string[] };
type Conversation = { id: string; title: string; messages: Message[] };

const starter: Conversation = { id: "welcome", title: "নতুন conversation", messages: [] };

export default function HomePage() {
  const [conversations, setConversations] = useState<Conversation[]>([starter]);
  const [activeId, setActiveId] = useState("welcome");
  const [input, setInput] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const active = conversations.find((conversation) => conversation.id === activeId) || starter;
  const hasMessages = active.messages.length > 0;

  const updateActive = (messages: Message[]) => setConversations((items) => items.map((item) => item.id === activeId ? { ...item, messages } : item));
  const createConversation = () => {
    const id = crypto.randomUUID();
    setConversations((items) => [{ id, title: "নতুন conversation", messages: [] }, ...items]);
    setActiveId(id); setInput(""); setFiles([]);
  };
  const sendMessage = async (preset?: string) => {
    const content = (preset ?? input).trim();
    if (!content || loading) return;
    const userMessage: Message = { id: crypto.randomUUID(), role: "user", content, fileNames: files.map((file) => file.name) };
    const nextMessages = [...active.messages, userMessage];
    updateActive(nextMessages); setInput(""); setFiles([]); setLoading(true);
    try {
      const response = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: nextMessages.map(({ role, content }) => ({ role, content })), fileNames: userMessage.fileNames }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Request failed");
      updateActive([...nextMessages, { id: crypto.randomUUID(), role: "assistant", content: data.reply }]);
      setConversations((items) => items.map((item) => item.id === activeId && item.title === "নতুন conversation" ? { ...item, title: content.slice(0, 32) } : item));
    } catch (error) {
      updateActive([...nextMessages, { id: crypto.randomUUID(), role: "assistant", content: error instanceof Error ? error.message : "একটি অজানা সমস্যা হয়েছে।" }]);
    } finally { setLoading(false); }
  };
  const selectFiles = (event: React.ChangeEvent<HTMLInputElement>) => { const selected = Array.from(event.target.files || []); setFiles(selected.slice(0, 5)); };
  const suggestions = useMemo(() => [["আইডিয়া", "একটি নতুন project idea দাও"], ["কোডিং", "একটি clean React component লিখে দাও"], ["গবেষণা", "কোনো বিষয় research করার workflow বলো"]], []);

  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark">S</div><div><h1>SOFIKUL AI AGENT</h1><p>General-purpose workspace</p></div></div>
      <button className="new-chat" onClick={createConversation}>＋ নতুন chat</button>
      <div className="side-label">Conversations</div>
      <div className="history">{conversations.map((conversation) => <button key={conversation.id} className={`history-item ${conversation.id === activeId ? "active" : ""}`} onClick={() => setActiveId(conversation.id)}>▱ {conversation.title}</button>)}</div>
      <div className="side-bottom"><div className="side-label">System</div><div className="status"><span className="dot" /> Demo mode active</div></div>
    </aside>
    <main className="main">
      <header className="topbar"><h2>AI Agent Chat</h2><div className="model-badge">Provider: demo · বাংলা + English</div></header>
      <section className="workspace"><div className="chat-column">
        {!hasMessages && <div className="welcome"><div className="eyebrow">Your modular AI workspace</div><h3>আপনার next idea এখান থেকেই শুরু করুন</h3><p>Chat করুন, file attach করুন, এবং ধীরে ধীরে আপনার নিজের AI capabilities যুক্ত করুন।</p><div className="suggestions">{suggestions.map(([title, text]) => <button className="suggestion" key={title} onClick={() => sendMessage(text)}><strong>{title}</strong>{text}</button>)}</div></div>}
        <div className="messages">{active.messages.map((message) => <div className={`message ${message.role}`} key={message.id}>{message.role === "assistant" && <div className="avatar ai">S</div>}<div><div className={`bubble ${message.role === "assistant" ? "ai" : "user"}`}>{message.content}</div>{message.fileNames?.map((name) => <span className="file-chip" key={name}>▧ {name}</span>)}</div>{message.role === "user" && <div className="avatar user">You</div>}</div>)}{loading && <div className="message"><div className="avatar ai">S</div><div className="bubble ai">উত্তর তৈরি হচ্ছে…</div></div>}</div>
      </div></section>
      <div className="composer-wrap"><div className="composer"><textarea value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); void sendMessage(); } }} placeholder="আপনার message লিখুন… (Enter to send)" /><div className="composer-actions"><div><input ref={fileRef} className="hidden" type="file" multiple accept=".txt,.md,.json,.csv,.pdf,.doc,.docx,.xls,.xlsx,image/*" onChange={selectFiles} /><button className="attach" onClick={() => fileRef.current?.click()}>＋ File / image attach</button>{files.length > 0 && <div className="attachment">{files.length}টি file selected</div>}</div><button className="send" disabled={!input.trim() || loading} onClick={() => void sendMessage()}>Send ↑</button></div></div></div>
    </main>
  </div>;
}
