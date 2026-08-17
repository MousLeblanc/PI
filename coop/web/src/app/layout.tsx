import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { I18nProvider } from "@/i18n/I18nProvider";
import { getMessages } from "@/i18n/messages";
import { resolveLocale } from "@/i18n/resolve-locale";
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

export async function generateMetadata(): Promise<Metadata> {
  const locale = await resolveLocale();
  const messages = getMessages(locale);
  const localeTag =
    locale === "nl" ? "nl_BE" : locale === "en" ? "en_GB" : "fr_BE";
  return {
    title: messages.meta.title,
    description: messages.meta.description,
    openGraph: {
      title: messages.meta.title,
      description: messages.meta.description,
      url: "https://www.picoop.be",
      siteName: "Pi COOP",
      locale: localeTag,
      type: "website",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await resolveLocale();
  return (
    <html lang={locale}>
      <body
        className={`${fraunces.variable} ${manrope.variable} min-h-screen font-sans antialiased`}
      >
        <I18nProvider locale={locale}>
          <SiteHeader />
          {children}
          <SiteFooter />
        </I18nProvider>
      </body>
    </html>
  );
}
