import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Semmozhi Workshop OS",
  description:
    "A comprehensive open-source project for Semmozhi Workshop - Building modern applications with Next.js",
  keywords: ["semmozhi", "workshop", "nextjs", "typescript", "tailwindcss"],
  authors: [{ name: "Gowri Shankar.M" }],
  creator: "Gowri Shankar.M",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://semmozhi.dev",
    siteName: "Semmozhi Workshop OS",
    title: "Semmozhi Workshop OS",
    description:
      "A comprehensive open-source project for Semmozhi Workshop - Building modern applications with Next.js",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
