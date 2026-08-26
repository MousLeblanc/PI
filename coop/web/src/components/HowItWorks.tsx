"use client";

import { CreditCard, HandHeart, Landmark, Scale } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MoneyFlows } from "@/components/MoneyFlows";
import { SubscriptionSimulator } from "@/components/SubscriptionSimulator";
import { useI18n } from "@/i18n/use-t";

const PILLAR_ICONS = [Landmark, Scale, CreditCard, HandHeart] as const;

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

      <MoneyFlows />
      <SubscriptionSimulator />

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
                {pillar.subtitle ? (
                  <p className="text-sm font-medium text-emerald-800">
                    {pillar.subtitle}
                  </p>
                ) : null}
              </CardHeader>
              <CardContent>
                <ul className="space-y-2.5 text-sm leading-relaxed text-muted-foreground">
                  {pillar.bullets.map((item) => (
                    <li key={item.label} className="flex gap-2">
                      <span
                        className="mt-0.5 shrink-0 font-semibold text-emerald-700"
                        aria-hidden
                      >
                        •
                      </span>
                      <span>
                        <span className="font-medium text-emerald-950">
                          {item.label}
                        </span>
                        {" : "}
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
                {pillar.note ? (
                  <p className="mt-3 border-l-2 border-emerald-200 pl-3 text-xs leading-relaxed text-muted-foreground">
                    <span className="font-medium text-emerald-900">Note</span>
                    {" : "}
                    {pillar.note}
                  </p>
                ) : null}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mx-auto mt-12 max-w-2xl space-y-10 border-t border-emerald-900/10 pt-10 text-center">
        <div>
          <h3 className="font-display text-2xl font-semibold tracking-tight">
            {messages.how.openingStagesTitle}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {messages.how.openingStagesBody}
          </p>
        </div>
        <div>
          <h3 className="font-display text-2xl font-semibold tracking-tight">
            {messages.how.zeroWasteTitle}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {messages.how.zeroWasteBody}
          </p>
        </div>
      </div>
    </div>
  );
}
