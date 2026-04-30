import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NBR Audit Selection 2023-24 — TIN Checker",
  description:
    "Instantly check if your TIN is among the 72,342 returns selected for NBR Risk-Based Audit (Assessment Year 2023-24).",
  authors: [{ name: "TIN Checker" }],
  openGraph: {
    title: "NBR Audit Selection 2023-24 — TIN Checker",
    description:
      "Instant offline TIN lookup against the official NBR audit selection list.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "NBR Audit Selection 2023-24 — TIN Checker",
    description:
      "Instant offline TIN lookup against the official NBR audit selection list.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
