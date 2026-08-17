"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { getPostalGauges, type PostalGaugesResponse } from "@/lib/api";
import { getCommune } from "@/lib/belgium";
import { OPENING_TARGET, getStretchMeta } from "@/lib/stretch";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/use-t";

const HIGHLIGHT_CODES = ["1000", "2000", "4000", "7000", "9000"];

export function PostalGauges() {
  const { t, numberLocale } = useI18n();
  const [filter, setFilter] = useState("");
  const [data, setData] = useState<PostalGaugesResponse>({ items: [] });

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const code = /^\d{4}$/.test(filter) ? filter : undefined;
        const next = await getPostalGauges(code);
        if (alive) setData(next);
      } catch {
        if (alive) setData({ items: [] });
      }
    };
    load();
    const id = setInterval(load, 8000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, [filter]);

  const items = useMemo(() => {
    if (data.items.length) return data.items;
    return HIGHLIGHT_CODES.map((postalCode) => ({
      postalCode,
      count: 0,
      target: OPENING_TARGET,
    }));
  }, [data.items]);

  return (
    <div className="space-y-5">
      <div className="max-w-xs space-y-2">
        <Label htmlFor="cp">{t("gauges.postalLabel")}</Label>
        <Input
          id="cp"
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value.replace(/\D/g, "").slice(0, 4))
          }
          placeholder={t("gauges.placeholder")}
          inputMode="numeric"
        />
        <p className="min-h-5 text-sm font-medium text-emerald-800">
          {getCommune(filter) ??
            (filter.length === 4 ? t("gauges.unknownPostal") : "\u00a0")}
        </p>
        {filter.length === 4 && getCommune(filter) && items[0]?.count === 0 ? (
          <p className="text-xs text-muted-foreground">{t("gauges.pioneer")}</p>
        ) : null}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((item) => {
          const meta = getStretchMeta(item.count);
          const label =
            getCommune(item.postalCode) ?? `CP ${item.postalCode}`;
          const remaining = Math.max(meta.openingTarget - item.count, 0);

          return (
            <Card
              key={item.postalCode}
              className={cn(
                meta.exploded && "border-amber-300/80 ring-1 ring-amber-200/60",
              )}
            >
              <CardHeader className="pb-3">
                <div className="flex items-baseline justify-between gap-3">
                  <CardTitle className="text-xl">{label}</CardTitle>
                  <span className="text-sm tabular-nums text-muted-foreground">
                    {item.count.toLocaleString(numberLocale)} /{" "}
                    {meta.openingTarget.toLocaleString(numberLocale)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {t("gauges.cp", { code: item.postalCode })}
                </p>
              </CardHeader>
              <CardContent className="space-y-3">
                <Progress
                  value={meta.openingPct}
                  className={cn(meta.exploded && "bg-amber-100")}
                  indicatorClassName={
                    meta.exploded ? "bg-amber-500" : undefined
                  }
                />
                {meta.exploded ? (
                  <>
                    <Badge className="border-transparent bg-amber-500 text-amber-950 hover:bg-amber-500">
                      {t("gauges.exploded", {
                        tier: meta.nextTier.toLocaleString(numberLocale),
                      })}
                    </Badge>
                    <Progress
                      value={meta.stretchPct}
                      className="h-2 bg-emerald-100"
                    />
                    <p className="text-sm text-muted-foreground">
                      {t("gauges.explodedBody")}
                    </p>
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    {t("gauges.remaining", {
                      pct: meta.openingPct,
                      remaining: remaining.toLocaleString(numberLocale),
                    })}
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
