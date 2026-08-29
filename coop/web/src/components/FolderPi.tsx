"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
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
            <CardContent className="space-y-1.5">
              <p className="text-sm text-slate-400 line-through decoration-slate-400/80">
                {t("folder.inStore", { price: formatPrice(item.retailEur) })}
              </p>
              <p className="font-display text-5xl font-bold leading-none tracking-tight text-emerald-800">
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
            <CardFooter>
              <Badge
                className={
                  item.tier === "premium"
                    ? "border-transparent bg-teal-800 text-sm font-semibold text-white hover:bg-teal-800"
                    : "border-transparent bg-emerald-800 text-sm font-semibold text-white hover:bg-emerald-800"
                }
              >
                {t("folder.markup", {
                  cents: Math.round(item.markupEur * 100),
                })}
              </Badge>
            </CardFooter>
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

      <p className="mt-4 text-xs text-amber-900/90">
        {t("folder.disclaimer")}
      </p>
    </div>
  );
}
