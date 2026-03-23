import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Evin Carr - Resume",
  description: "GTM & AI Automations Engineer. Building automations and web apps with Google Apps Script, Claude AI, Next.js, and Supabase.",
  openGraph: {
    title: "Evin Carr - Resume",
    description: "GTM & AI Automations Engineer. Building internal tools and event systems at a MarTech consultancy. Google Apps Script, Claude AI, Next.js, Supabase.",
    url: "https://evincarr.com",
    siteName: "Evin Carr Resume",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Evin Carr - Resume",
    description: "GTM & AI Automations Engineer. Building automations and web apps with Google Apps Script, Claude AI, Next.js, and Supabase.",
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