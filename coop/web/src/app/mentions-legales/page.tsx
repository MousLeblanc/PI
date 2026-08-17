import type { Metadata } from "next";
import Link from "next/link";
import { getMessages } from "@/i18n/messages";
import { resolveLocale } from "@/i18n/resolve-locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await resolveLocale();
  const messages = getMessages(locale);
  return {
    title: messages.legal.metaTitle,
    description: messages.legal.metaDescription,
  };
}

export default async function MentionsLegalesPage() {
  const locale = await resolveLocale();
  const t = getMessages(locale).legal;

  return (
    <main className="mx-auto w-[min(720px,calc(100%-2rem))] py-16">
      <p className="mb-6 text-sm">
        <Link href="/" className="text-emerald-800 underline-offset-4 hover:underline">
          {t.back}
        </Link>
      </p>
      <h1 className="font-display text-3xl font-semibold tracking-tight">
        {t.title}
      </h1>
      <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            {t.publisherTitle}
          </h2>
          <p>{t.publisherBody}</p>
          <p>
            {t.contact}{" "}
            <a className="text-emerald-800 underline" href="mailto:contact@picoop.be">
              contact@picoop.be
            </a>
          </p>
        </section>
        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            {t.hostingTitle}
          </h2>
          <p>{t.hostingBody}</p>
        </section>
        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            {t.natureTitle}
          </h2>
          <p>
            {t.natureBefore}{" "}
            <strong className="text-foreground">{t.natureFree}</strong>{" "}
            {t.natureMid}{" "}
            <strong className="text-foreground">{t.natureEstimates}</strong>
            {t.natureEnd}
          </p>
        </section>
      </div>
    </main>
  );
}
