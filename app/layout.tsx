import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { APP_NAME, TAGLINE } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: `${APP_NAME} — ${TAGLINE}`,
  description:
    "Bikin quotation, invoice, dan pesan profesional dalam hitungan detik. Tinggal copy, paste ke WhatsApp. Gratis!",
  keywords: [
    "quotation whatsapp",
    "format pesan whatsapp",
    "invoice generator",
    "admin online shop",
    "template whatsapp",
    "jualan online",
  ],
  authors: [{ name: APP_NAME }],
  openGraph: {
    title: `${APP_NAME} — ${TAGLINE}`,
    description: "WhatsApp admin toolkit untuk bisnis Indonesia",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#10B981",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={inter.variable}>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
