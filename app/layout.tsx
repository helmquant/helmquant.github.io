import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://helmquant.in"),
  title: {
    default: "Helm Quant — AI-powered trading tools for Indian markets",
    template: "%s · Helm Quant",
  },
  description:
    "AI-powered indicators and daily market intel for Indian traders. Building in public.",
  applicationName: "Helm Quant",
  keywords: [
    "Indian stock market",
    "trading indicators",
    "PineScript",
    "TradingView",
    "Nifty",
    "BankNifty",
    "AI trading tools",
    "quant",
    "market intel",
  ],
  authors: [{ name: "Helm Quant" }],
  openGraph: {
    title: "Helm Quant — AI-powered trading tools for Indian markets",
    description:
      "Indicators, daily market intel, and a weekly newsletter on building AI tools for Indian markets.",
    url: "https://helmquant.in",
    siteName: "Helm Quant",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Helm Quant — AI-powered trading tools for Indian markets",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Helm Quant — AI-powered trading tools for Indian markets",
    description:
      "Indicators, daily market intel, and a weekly newsletter on building AI tools for Indian markets.",
    creator: "@helmquant",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
