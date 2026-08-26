"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useI18n } from "@/i18n/use-t";

const CAP_PER_SUB = 250;
const PRICE_PER_SUB = 10;

export function SubscriptionSimulator() {
  const { t, messages, numberLocale } = useI18n();
  const s = messages.how.simulator;
  const [people, setPeople] = useState(2);

  const abos = useMemo(
    () => Math.max(1, Math.min(20, Math.ceil(people))),
    [people],
  );
  const cap = abos * CAP_PER_SUB;
  const monthly = abos * PRICE_PER_SUB;

  return (
    <div className="rounded-2xl border border-emerald-100 bg-white/90 px-5 py-6 shadow-sm">
      <h3 className="font-display text-xl font-semibold tracking-tight text-emerald-950">
        {s.title}
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">{s.intro}</p>
      <div className="mt-4 space-y-2">
        <Label htmlFor="sim-people">{s.peopleLabel}</Label>
        <Input
          id="sim-people"
          type="number"
          min={1}
          max={20}
          value={people}
          onChange={(e) => {
            const n = Number(e.target.value);
            setPeople(Number.isFinite(n) ? n : 1);
          }}
        />
      </div>
      <p className="mt-4 text-sm font-medium text-emerald-900">
        {t("how.simulator.result", {
          abos: String(abos),
          cap: cap.toLocaleString(numberLocale),
          monthly: String(monthly),
        })}
      </p>
      <p className="mt-2 text-xs text-muted-foreground">{s.hint}</p>
    </div>
  );
}
