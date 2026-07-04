import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Evin Carr - Resume",
  description: "Head of Operations & Automations. 10+ years running and improving operations, now shipping AI-powered automations with the Claude API, MCP, Apps Script, and webhooks.",
  openGraph: {
    title: "Evin Carr - Resume",
    description: "Head of Operations & Automations at Storm King Consulting, a MarTech consultancy. Built StormSpot, event automations on the Claude API, and Claude-driven workflows for a 1,000+ executive network.",
    url: "https://evincarr.com",
    siteName: "Evin Carr Resume",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Evin Carr - Resume",
    description: "Head of Operations & Automations. 10+ years running and improving operations, now shipping AI-powered automations with the Claude API, MCP, Apps Script, and webhooks.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}