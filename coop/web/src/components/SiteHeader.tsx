"use client";

import Image from "next/image";
import Link from "next/link";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/use-t";

export function SiteHeader() {
  const { t } = useI18n();

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex w-[min(1120px,calc(100%-2rem))] items-center justify-between gap-3 py-4">
        <Link href="/" className="group flex items-center gap-3">
          <Image
            src="/logo-pi.png"
            alt="Pi COOP"
            width={40}
            height={40}
            className="h-10 w-10 rounded-lg"
            priority
          />
          <span className="flex flex-col leading-none">
            <span className="font-display text-xl font-semibold tracking-tight text-foreground">
              Pi COOP
            </span>
            <span className="mt-1 text-[11px] font-medium tracking-wide text-emerald-800">
              {t("brand.slogan")}
            </span>
          </span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher />
          <Button asChild size="sm">
            <Link href="/#inscription">{t("header.cta")}</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
