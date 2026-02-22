import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Evin Carr - Resume",
  description: "Remote Operations Specialist | AI-Powered Workflow Automation. Built with Claude AI.",
  openGraph: {
    title: "Evin Carr - Resume",
    description: "Remote Operations Specialist | AI-Powered Workflow Automation. Self-taught automation builder specializing in Claude AI, Google Apps Script, and workflow optimization.",
    url: "https://evincarr.com",
    siteName: "Evin Carr Resume",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Evin Carr - Resume",
    description: "Remote Operations Specialist | AI-Powered Workflow Automation",
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