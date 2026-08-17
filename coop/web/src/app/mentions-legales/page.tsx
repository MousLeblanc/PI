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
          <p>{t.publisherIntro}</p>
          <ul className="list-disc space-y-1 pl-5">
            {t.publisherItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>{t.publisherCoop}</p>
          <p>
            {t.contact}{" "}
            <a className="text-emerald-800 underline" href={`mailto:${t.contactEmail}`}>
              {t.contactEmail}
            </a>
          </p>
        </section>
        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            {t.hostingTitle}
          </h2>
          <ul className="list-disc space-y-1 pl-5">
            {t.hosting.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            {t.natureTitle}
          </h2>
          <p>{t.natureIntro}</p>
          <p>{t.natureStore}</p>
        </section>
        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">{t.ipTitle}</h2>
          <p>{t.ipBody}</p>
        </section>
        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">{t.lawTitle}</h2>
          <p>{t.lawBody}</p>
        </section>
        <p>
          <Link
            href="/confidentialite"
            className="text-emerald-800 underline-offset-4 hover:underline"
          >
            {t.relatedPrivacy}
          </Link>
        </p>
        <p className="text-xs">{t.updated}</p>
      </div>
    </main>
  );
}
