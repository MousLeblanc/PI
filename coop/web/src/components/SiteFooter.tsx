"use client";

import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/i18n/use-t";

export function SiteFooter() {
  const { t } = useI18n();

  return (
    <footer className="border-t py-10">
      <div className="mx-auto flex w-[min(1120px,calc(100%-2rem))] flex-col gap-4 text-sm text-muted-foreground">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3 sm:items-center">
            <Image
              src="/logo-pi.png"
              alt="Pi COOP"
              width={28}
              height={28}
              className="mt-0.5 h-7 w-7 shrink-0 rounded-md sm:mt-0"
            />
            <span>
              Pi ·{" "}
              <Link href="/" className="text-foreground">
                COOP
              </Link>{" "}
              · Invest · Academy
              <span className="mt-1 block text-emerald-800 sm:mt-0 sm:ml-2 sm:inline">
                {t("brand.slogan")}
              </span>
            </span>
          </div>
          <nav className="flex flex-wrap gap-4">
            <Link
              href="/#comment-ca-marche"
              className="hover:text-foreground hover:underline"
            >
              {t("footer.how")}
            </Link>
            <Link
              href="/#manifeste"
              className="hover:text-foreground hover:underline"
            >
              {t("footer.manifesto")}
            </Link>
            <a
              href="https://www.facebook.com/people/PI-COOP/61592984963066/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground hover:underline"
            >
              {t("footer.facebook")}
            </a>
            <Link
              href="/mentions-legales"
              className="hover:text-foreground hover:underline"
            >
              {t("footer.legal")}
            </Link>
            <Link
              href="/confidentialite"
              className="hover:text-foreground hover:underline"
            >
              {t("footer.privacy")}
            </Link>
          </nav>
        </div>
        <p className="text-xs text-muted-foreground/90">{t("footer.phase")}</p>
      </div>
    </footer>
  );
}
