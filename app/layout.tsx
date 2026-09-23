import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Semmozhi Workshop OS",
    template: "%s · Semmozhi Workshop OS",
  },
  description:
    "CICT workshop management, verified learning, and lifelong learning pathways.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-parchment text-charcoal">{children}</body>
    </html>
  );
}
