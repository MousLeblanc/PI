import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pi COOP — Coopérative citoyenne",
  description:
    "Préinscription à Pi COOP : achats groupés bio à prix coûtant + 0,20 €, transparence et solidarité.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${fraunces.variable} ${manrope.variable} min-h-screen font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
