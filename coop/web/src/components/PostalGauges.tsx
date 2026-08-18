"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { getPostalGauges } from "@/lib/api";
import { getCommune, getCommuneShort } from "@/lib/belgium";
import { getStretchMeta } from "@/lib/stretch";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/use-t";

export function PostalGauges() {
  const { t, numberLocale } = useI18n();
  const [filter, setFilter] = useState("");
  const [count, setCount] = useState<number | null>(null);

  const valid = /^\d{4}$/.test(filter);
  const commune = getCommune(filter);

  useEffect(() => {
    if (!valid || !commune) {
      setCount(null);
      return;
    }
    let alive = true;
    const load = async () => {
      try {
        const next = await getPostalGauges(filter);
        if (alive) setCount(next.items[0]?.count ?? 0);
      } catch {
        if (alive) setCount(0);
      }
    };
    load();
    const id = setInterval(load, 8000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, [filter, valid, commune]);

  const meta = getStretchMeta(count ?? 0);
  const label = getCommuneShort(filter) ?? commune ?? "";

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
          {commune ??
            (filter.length === 4 ? t("gauges.unknownPostal") : "\u00a0")}
        </p>
        {!valid ? (
          <p className="text-xs text-muted-foreground">{t("gauges.needPostal")}</p>
        ) : null}
      </div>

      {valid && commune && count !== null ? (
        <Card
          className={cn(
            "max-w-xl",
            meta.exploded && "border-amber-300/80 ring-1 ring-amber-200/60",
          )}
        >
          <CardHeader className="pb-3">
            <div className="flex items-baseline justify-between gap-3">
              <CardTitle className="text-xl">{label}</CardTitle>
              <span className="text-sm tabular-nums font-medium text-foreground">
                {t("gauges.people", {
                  count: count.toLocaleString(numberLocale),
                })}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {t("gauges.cp", { code: filter })}
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            <Progress
              value={meta.openingPct}
              className={cn(meta.exploded && "bg-amber-100")}
              indicatorClassName={meta.exploded ? "bg-amber-500" : undefined}
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
            ) : count === 0 ? (
              <p className="text-xs text-muted-foreground">{t("gauges.pioneer")}</p>
            ) : (
              <p className="text-sm text-muted-foreground">
                {t("gauges.goal")}
              </p>
            )}
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
