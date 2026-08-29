"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getFolderPi, type FolderPiResponse } from "@/lib/api";
import { useI18n } from "@/i18n/use-t";

function formatPrice(value: number) {
  return value.toFixed(2).replace(".", ",");
}

export function FolderPi() {
  const { t } = useI18n();
  const [data, setData] = useState<FolderPiResponse | null>(null);

  useEffect(() => {
    getFolderPi()
      .then(setData)
      .catch(() => setData(null));
  }, []);

  const items = data?.items ?? [];
  const retailTotal = items.reduce((s, i) => s + i.retailEur, 0);
  const piTotal = items.reduce((s, i) => s + i.piPriceEur, 0);
  const savings = retailTotal - piTotal;
  const savingsPct =
    retailTotal > 0 ? Math.round((savings / retailTotal) * 100) : 0;

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <Badge className="bg-emerald-800 text-white hover:bg-emerald-800">
          {t("folder.badge")}
        </Badge>
        <p className="text-sm text-muted-foreground">{t("folder.formula")}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Card
            key={item.id}
            className="overflow-hidden border-emerald-100/80 transition-shadow hover:shadow-md"
          >
            <div className="relative mx-3 mt-3 aspect-[4/3] overflow-hidden rounded-2xl bg-emerald-50">
              <Image
                src={item.imageUrl}
                alt={item.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-contain p-4 sm:p-5"
              />
              <span className="absolute left-3 top-3 rounded-full bg-emerald-900/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white shadow-sm">
                {t("folder.organicBadge")}
              </span>
            </div>
            <CardHeader className="pb-2 pt-4">
              <p className="text-sm font-medium text-foreground">
                {item.name}
              </p>
            </CardHeader>
            <CardContent className="space-y-1.5 pb-5">
              <p className="text-sm text-slate-400 line-through decoration-slate-400/80">
                {t("folder.inStore", { price: formatPrice(item.retailEur) })}
              </p>
              <p className="font-sans text-5xl font-bold leading-none tracking-tight text-emerald-800 tabular-nums">
                {formatPrice(item.piPriceEur)}
                <span className="ml-1 text-xl font-semibold">€</span>
              </p>
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-900/80">
                {t("folder.piPrice")}
              </p>
              <p className="pt-1 text-xs text-muted-foreground">
                {t("folder.wholesale", {
                  price: formatPrice(item.wholesaleEur),
                })}
              </p>
            </CardContent>
          </Card>
        ))}

        {!data && (
          <Card className="sm:col-span-2 lg:col-span-3">
            <CardContent className="py-10 text-center text-muted-foreground">
              {t("folder.unavailable")}
            </CardContent>
          </Card>
        )}
      </div>

      {items.length > 0 ? (
        <div className="mt-8 overflow-hidden rounded-2xl bg-[var(--bg-deep,#0f2a22)] text-emerald-50 shadow-lg">
          <div className="border-b border-white/10 px-5 py-4 sm:px-6">
            <p className="m-0 text-xs uppercase tracking-[0.2em] text-emerald-200/80">
              {t("folder.compare.kicker")}
            </p>
            <h3 className="mt-1 font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">
              {t("folder.compare.title")}
            </h3>
          </div>

          <div className="space-y-0 px-5 py-2 sm:px-6">
            <div className="flex items-baseline justify-between gap-4 border-b border-white/5 py-3.5">
              <p className="m-0 text-sm text-emerald-100/80 sm:text-base">
                {t("folder.compare.retail")}
              </p>
              <p className="m-0 font-sans text-2xl font-semibold tabular-nums tracking-tight text-emerald-100/90 line-through decoration-emerald-100/40 sm:text-3xl">
                {formatPrice(retailTotal)}
                <span className="ml-1 text-lg font-medium sm:text-xl">€</span>
              </p>
            </div>
            <div className="flex items-baseline justify-between gap-4 py-3.5">
              <p className="m-0 text-sm text-emerald-100/80 sm:text-base">
                {t("folder.compare.pi")}
              </p>
              <p className="m-0 font-sans text-2xl font-bold tabular-nums tracking-tight text-white sm:text-3xl">
                {formatPrice(piTotal)}
                <span className="ml-1 text-lg font-semibold sm:text-xl">€</span>
              </p>
            </div>
          </div>

          <div className="flex items-baseline justify-between gap-4 bg-lime-300 px-5 py-4 text-emerald-950 sm:px-6">
            <div>
              <p className="m-0 text-sm font-bold uppercase tracking-wide sm:text-base">
                {t("folder.compare.savings")}
              </p>
              {savingsPct > 0 ? (
                <p className="m-0 mt-0.5 text-xs font-medium text-emerald-900/80 sm:text-sm">
                  {t("folder.compare.savingsPct", { pct: savingsPct })}
                </p>
              ) : null}
            </div>
            <p className="m-0 font-sans text-3xl font-bold tabular-nums tracking-tight sm:text-4xl">
              {formatPrice(savings)}
              <span className="ml-1 text-xl font-semibold sm:text-2xl">€</span>
            </p>
          </div>
        </div>
      ) : null}

      <p className="mt-4 text-xs text-amber-900/90">
        {t("folder.disclaimer")}
      </p>
    </div>
  );
}
