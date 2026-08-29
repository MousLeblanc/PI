"use client";

import { useI18n } from "@/i18n/use-t";

/** Règle abo → plafond, sans calculatrice (pas de cumul imposé par personne). */
export function SubscriptionSimulator() {
  const { messages } = useI18n();
  const s = messages.how.simulator;

  return (
    <div className="rounded-2xl border border-emerald-100 bg-white/90 px-5 py-6 shadow-sm">
      <h3 className="font-display text-xl font-semibold tracking-tight text-emerald-950">
        {s.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
        {s.intro}
      </p>
      <p className="mt-3 text-sm font-medium leading-relaxed text-emerald-950 sm:text-base">
        {s.rule}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {s.hint}
      </p>
    </div>
  );
}
