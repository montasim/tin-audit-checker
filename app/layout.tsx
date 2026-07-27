import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "TIN Audit List Checker — Assessment Year 2023–24",
  description:
    "Check whether a 12-digit TIN appears in the NBR-published risk-based audit selection list for assessment year 2023–24.",
  authors: [{ name: "TIN Checker" }],
  openGraph: {
    title: "TIN Audit List Checker — Assessment Year 2023–24",
    description:
      "Private, on-device lookup against the NBR-published audit selection list.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "TIN Audit List Checker — Assessment Year 2023–24",
    description:
      "Private, on-device lookup against the NBR-published audit selection list.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
