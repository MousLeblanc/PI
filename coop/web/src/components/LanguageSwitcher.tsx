"use client";

import { LOCALES } from "@/i18n/config";
import { useI18n } from "@/i18n/use-t";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n();

  return (
    <div
      role="group"
      aria-label={t("header.langLabel")}
      className="inline-flex rounded-full border border-border/80 bg-white/80 p-0.5 text-xs font-semibold tracking-wide"
    >
      {LOCALES.map((code) => (
        <button
          key={code}
          type="button"
          lang={code}
          aria-pressed={locale === code}
          onClick={() => setLocale(code)}
          className={cn(
            "min-w-8 rounded-full px-2.5 py-1 transition-colors",
            locale === code
              ? "bg-emerald-800 text-white"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
