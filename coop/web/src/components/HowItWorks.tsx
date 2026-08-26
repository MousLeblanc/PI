"use client";

import { CreditCard, HandHeart, Landmark, Scale } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useI18n } from "@/i18n/use-t";

const PILLAR_ICONS = [Landmark, CreditCard, HandHeart, Scale] as const;

export function HowItWorks() {
  const { messages } = useI18n();
  const pillars = messages.how.pillars;

  return (
    <div>
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          {messages.how.title}
        </h2>
        <p className="mt-3 text-muted-foreground">{messages.how.intro}</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {pillars.map((pillar, i) => {
          const Icon = PILLAR_ICONS[i] ?? Landmark;
          return (
            <Card
              key={pillar.title}
              className="border-emerald-100/80 bg-white/90 shadow-sm"
            >
              <CardHeader className="space-y-3 pb-2">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-800 text-sm font-semibold text-white">
                    {i + 1}
                  </span>
                  <Icon className="h-5 w-5 text-emerald-800" aria-hidden />
                </div>
                <CardTitle className="text-xl">{pillar.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {pillar.body}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mx-auto mt-12 max-w-2xl border-t border-emerald-900/10 pt-10 text-center">
        <h3 className="font-display text-2xl font-semibold tracking-tight">
          {messages.how.openingStagesTitle}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {messages.how.openingStagesBody}
        </p>
      </div>
    </div>
  );
}
