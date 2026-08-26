"use client";

import { useI18n } from "@/i18n/use-t";

export function MoneyFlows() {
  const { messages } = useI18n();
  const f = messages.how.flows;

  return (
    <div className="mx-auto mb-12 max-w-4xl">
      <p className="text-center text-base font-medium text-emerald-950 sm:text-lg">
        {f.subtitle}
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {[f.share, f.abo, f.margin].map((col) => (
          <div
            key={col.title}
            className="rounded-2xl border border-emerald-100 bg-white/90 px-4 py-5 text-center shadow-sm"
          >
            <p className="font-display text-lg font-semibold text-emerald-900">
              {col.title}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {col.body}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-5 text-center text-sm leading-relaxed text-muted-foreground">
        {f.example}
      </p>
      <div className="mt-6 rounded-2xl border border-emerald-200/80 bg-emerald-50/60 px-5 py-5 text-sm leading-relaxed text-emerald-950">
        <p className="font-semibold">{f.prepaidTitle}</p>
        <p className="mt-2 text-emerald-900/90">{f.prepaidBody}</p>
      </div>
    </div>
  );
}
