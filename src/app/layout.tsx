import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SOFIKUL AI AGENT CHAT",
  description: "A modular general-purpose AI agent workspace",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="bn">
      <body>{children}</body>
    </html>
  );
}
