"use client";

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/use-t";

export function Manifesto() {
  const { t, messages } = useI18n();
  const rules = messages.manifesto.rules;

  return (
    <div className="mx-auto max-w-3xl text-left">
      <p className="text-sm font-medium uppercase tracking-[0.14em] text-emerald-800">
        {t("manifesto.eyebrow")}
      </p>
      <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        {t("manifesto.title")}
      </h2>

      <div className="mt-8 space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
        <p>{t("manifesto.p1")}</p>
        <p>
          {t("manifesto.p2Before")}{" "}
          <strong className="font-medium text-foreground">
            {t("manifesto.p2Strong")}
          </strong>
        </p>
        <p>{t("manifesto.p3")}</p>
        <p>{t("manifesto.p4")}</p>
        <p>{t("manifesto.ticket")}</p>
      </div>

      <div className="mt-8 rounded-2xl border border-emerald-900/10 bg-emerald-50/70 p-5 sm:p-6">
        <p className="m-0 text-sm font-semibold text-emerald-950 sm:text-base">
          {t("manifesto.ruleLead")}
        </p>
        <ul className="mt-4 space-y-4">
          {rules.map((rule) => (
            <li key={rule.title} className="flex gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-white">
                <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="m-0 text-sm font-semibold text-emerald-950 sm:text-base">
                  {rule.title}
                </p>
                <p className="m-0 mt-1 text-sm leading-relaxed text-emerald-950/85 sm:text-[0.95rem]">
                  {rule.body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
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
