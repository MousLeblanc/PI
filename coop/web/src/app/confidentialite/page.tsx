import type { Metadata } from "next";
import Link from "next/link";
import { getMessages } from "@/i18n/messages";
import { resolveLocale } from "@/i18n/resolve-locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await resolveLocale();
  const messages = getMessages(locale);
  return {
    title: messages.privacy.metaTitle,
    description: messages.privacy.metaDescription,
  };
}

export default async function ConfidentialitePage() {
  const locale = await resolveLocale();
  const t = getMessages(locale).privacy;

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
            {t.controllerTitle}
          </h2>
          <p>
            {t.controllerBody}{" "}
            <a className="text-emerald-800 underline" href={`mailto:${t.contactEmail}`}>
              {t.contactEmail}
            </a>
          </p>
        </section>
        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            {t.dataTitle}
          </h2>
          <ul className="list-disc space-y-1 pl-5">
            {t.data.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            {t.purposeTitle}
          </h2>
          <ul className="list-disc space-y-1 pl-5">
            {t.purposes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            {t.legalTitle}
          </h2>
          <p>{t.legalBody}</p>
        </section>
        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            {t.recipientsTitle}
          </h2>
          <ul className="list-disc space-y-1 pl-5">
            {t.recipients.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>{t.recipientsAfter}</p>
        </section>
        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            {t.transfersTitle}
          </h2>
          <p>{t.transfersBody}</p>
        </section>
        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            {t.cookiesTitle}
          </h2>
          <ul className="list-disc space-y-1 pl-5">
            {t.cookies.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>{t.cookiesAfter}</p>
        </section>
        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            {t.retentionTitle}
          </h2>
          <p>{t.retentionBody}</p>
        </section>
        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            {t.childrenTitle}
          </h2>
          <p>{t.childrenBody}</p>
        </section>
        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            {t.rightsTitle}
          </h2>
          <p>
            {t.rightsBody}{" "}
            <a className="text-emerald-800 underline" href={`mailto:${t.contactEmail}`}>
              {t.contactEmail}
            </a>
            . {t.rightsAfter}{" "}
            <a
              className="text-emerald-800 underline"
              href={t.apdUrl}
              rel="noreferrer"
              target="_blank"
            >
              {t.apdLabel}
            </a>
          </p>
        </section>
        <p>
          <Link
            href="/mentions-legales"
            className="text-emerald-800 underline-offset-4 hover:underline"
          >
            {t.relatedLegal}
          </Link>
        </p>
        <p className="text-xs">{t.updated}</p>
      </div>
    </main>
  );
}
