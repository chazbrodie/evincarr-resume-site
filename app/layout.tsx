import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Evin Carr - Resume",
  description: "Operations & Automations Lead. 10+ years building systems that scale, now shipping AI-powered automations with Google Apps Script, Claude API, Next.js, and Supabase.",
  openGraph: {
    title: "Evin Carr - Resume",
    description: "Operations & Automations Lead at a MarTech consultancy. Building event ops dashboards, AI-powered asset generation, and pipeline automations with Apps Script, Claude API, and Next.js.",
    url: "https://evincarr.com",
    siteName: "Evin Carr Resume",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Evin Carr - Resume",
    description: "Operations & Automations Lead. 10+ years building systems that scale, now shipping AI-powered automations with Google Apps Script, Claude API, Next.js, and Supabase.",
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