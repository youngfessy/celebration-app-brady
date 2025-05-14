import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap", // this helps reduce layout shift
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jarred Geller",
  description: "Jarred's interactive portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const className = `${geistSans.variable} ${geistMono.variable} antialiased`;

  return (
    <html lang="en" className="scroll-smooth">
      <body className={className}>{children}</body>
    </html>
  );
}
