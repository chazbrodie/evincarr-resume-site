import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Evin Carr - Resume",
  description: "Remote Operations Specialist | Workflow Automation Enthusiast",
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