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
            className="overflow-hidden transition-shadow hover:shadow-md"
          >
            <div className="relative aspect-[4/3] bg-emerald-50/60">
              <Image
                src={item.imageUrl}
                alt={item.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
            <CardHeader className="pb-3 pt-4">
              <p className="text-sm font-medium text-foreground">
                {item.name}
              </p>
            </CardHeader>
            <CardContent className="space-y-1">
              <p className="text-sm text-slate-500 line-through">
                {t("folder.inStore", { price: formatPrice(item.retailEur) })}
              </p>
              <p className="font-display text-4xl font-bold tracking-tight text-emerald-800">
                {formatPrice(item.piPriceEur)}
                <span className="ml-1 text-lg font-semibold">€</span>
              </p>
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-900">
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
