"use client";

import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/use-t";

export function Manifesto() {
  const { t } = useI18n();

  return (
    <div className="mx-auto max-w-2xl">
      <p className="text-sm font-medium uppercase tracking-[0.14em] text-emerald-800">
        {t("manifesto.eyebrow")}
      </p>
      <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        {t("manifesto.title")}
      </h2>

      <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
        <p>{t("manifesto.p1")}</p>
        <p>
          {t("manifesto.p2Before")}{" "}
          <strong className="font-medium text-foreground">
            {t("manifesto.p2Strong")}
          </strong>
        </p>
        <p>
          {t("manifesto.p3")}{" "}
          <strong className="font-medium text-emerald-900">
            {t("brand.slogan")}
          </strong>
        </p>
        <p>{t("manifesto.p4")}</p>
        <p>{t("manifesto.ticket")}</p>
      </div>

      <blockquote className="mt-8 border-l-4 border-emerald-800 bg-emerald-50/60 py-5 pl-5 pr-4 sm:pl-6">
        <p className="text-sm font-medium text-emerald-950 sm:text-base">
          {t("manifesto.ruleLead")}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-emerald-950/90 sm:text-base">
          {t("manifesto.rule")}
        </p>
      </blockquote>

      <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
        <p>{t("manifesto.volunteer")}</p>
        <p className="font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          {t("manifesto.closing")}
        </p>
      </div>

      <div className="mt-10">
        <Button
          asChild
          size="xl"
          className="shadow-lg shadow-emerald-900/15"
        >
          <a href="#inscription">{t("manifesto.cta")}</a>
        </Button>
      </div>
    </div>
  );
}
