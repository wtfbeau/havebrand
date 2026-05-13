import type { Metadata } from "next";
import { Syne, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const playfair = Syne({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://havebrand.com"),
  title: {
    default: "HaveBrand — Brand Clarity for Growing Teams",
    template: "%s | HaveBrand",
  },
  description:
    "HaveBrand audits your positioning, messaging, and every AI-generated asset so your brand stays clear, consistent, and approved.",
  keywords: [
    "brand clarity",
    "brand governance",
    "AI brand",
    "brand consistency",
    "messaging audit",
    "brand positioning",
  ],
  openGraph: {
    type: "website",
    url: "https://havebrand.com",
    siteName: "HaveBrand",
    title: "HaveBrand — Brand Clarity for Growing Teams",
    description:
      "Audit your positioning, enforce your messaging, and review every AI-generated asset before it ships.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "HaveBrand — Brand Clarity for Growing Teams",
    description:
      "Audit your positioning, enforce your messaging, and review every AI-generated asset before it ships.",
    site: "@havebrand",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://havebrand.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
