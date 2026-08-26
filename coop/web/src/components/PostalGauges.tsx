"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getZones, type ZoneGaugeItem } from "@/lib/api";
import { getCommune, getCommuneShort } from "@/lib/belgium";
import { getMilestoneState, nextBasinInfoAt } from "@/lib/milestones";
import { getStretchMeta } from "@/lib/stretch";
import { isBrusselsZone } from "@/lib/zones";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/use-t";

function zoneName(zoneId: string, t: (key: string) => string): string {
  if (isBrusselsZone(zoneId)) {
    return t(`zones.${zoneId}.name`);
  }
  const cp = zoneId.replace(/^cp-/, "");
  return getCommuneShort(cp) ?? cp;
}

function zoneCommunes(zoneId: string, t: (key: string) => string): string {
  if (isBrusselsZone(zoneId)) {
    return t(`zones.${zoneId}.communes`);
  }
  return "";
}

export function PostalGauges() {
  const { t, numberLocale } = useI18n();
  const [filter, setFilter] = useState("");
  const [focus, setFocus] = useState<ZoneGaugeItem | null>(null);
  const [expanded, setExpanded] = useState(false);

  const valid = /^\d{4}$/.test(filter);
  const commune = getCommune(filter);

  useEffect(() => {
    const cp = new URLSearchParams(window.location.search).get("cp");
    if (cp && /^\d{4}$/.test(cp)) {
      setFilter(cp);
    }
  }, []);

  useEffect(() => {
    if (!valid || !commune) {
      setFocus(null);
      return;
    }
    let alive = true;
    const load = async () => {
      try {
        const res = await getZones(filter);
        if (alive) setFocus(res.focus ?? null);
      } catch {
        if (alive) setFocus(null);
      }
    };
    load();
    const id = setInterval(load, 8000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, [filter, valid, commune]);

  useEffect(() => {
    setExpanded(false);
  }, [filter]);

  const count = focus?.count ?? 0;
  const meta = getStretchMeta(count);
  const milestone = getMilestoneState(count);
  const basinInfoAt = nextBasinInfoAt(count);
  const zoneId = focus?.zoneId ?? "";
  const title = zoneId ? zoneName(zoneId, t) : "";
  const communes = zoneId ? zoneCommunes(zoneId, t) : "";
  const showBreakdown = (focus?.breakdown.length ?? 0) > 1;

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

      {valid && commune && focus ? (
        <Card
          id={isBrusselsZone(focus.zoneId) ? focus.zoneId : undefined}
          className={cn(
            "max-w-xl",
            meta.exploded && "border-amber-300/80 ring-1 ring-amber-200/60",
          )}
        >
          <CardHeader className="pb-3">
            <div className="flex items-baseline justify-between gap-3">
              <CardTitle className="text-xl">{title}</CardTitle>
              <span className="text-sm tabular-nums font-medium text-foreground">
                {t("gauges.people", {
                  count: count.toLocaleString(numberLocale),
                })}
              </span>
            </div>
            {communes ? (
              <p className="text-sm text-muted-foreground">{communes}</p>
            ) : null}
            <p className="text-xs text-muted-foreground">
              {t("gauges.yourCp", { code: filter })}
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

            {milestone.reached.length > 0 ? (
              <ul className="space-y-1 text-xs text-emerald-800">
                {milestone.reached.map((m) => (
                  <li key={m.key}>✓ {t(`gauges.milestones.${m.key}`)}</li>
                ))}
              </ul>
            ) : null}
            {milestone.next ? (
              <p className="text-xs text-muted-foreground">
                {t("gauges.nextMilestone", {
                  count: milestone.next.at.toLocaleString(numberLocale),
                  label: t(`gauges.milestones.${milestone.next.key}`),
                })}
              </p>
            ) : null}
            <p className="text-xs text-muted-foreground">
              {t("gauges.nextBasinInfo", {
                count: basinInfoAt.toLocaleString(numberLocale),
              })}
            </p>

            {showBreakdown ? (
              <div className="border-t pt-3">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-auto px-0 text-emerald-800 hover:bg-transparent hover:underline"
                  onClick={() => setExpanded((v) => !v)}
                >
                  {expanded ? t("gauges.hideBreakdown") : t("gauges.showBreakdown")}
                </Button>
                {expanded ? (
                  <ul className="mt-2 space-y-1.5 text-sm">
                    {focus.breakdown.map((row) => (
                      <li
                        key={row.postalCode}
                        className="flex items-center justify-between gap-3"
                      >
                        <span className="text-muted-foreground">
                          {getCommuneShort(row.postalCode) ?? row.postalCode}{" "}
                          <span className="text-xs">({row.postalCode})</span>
                        </span>
                        <span className="tabular-nums font-medium">
                          {row.count.toLocaleString(numberLocale)}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ) : null}
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
