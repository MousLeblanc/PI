"use client";

import { useEffect, useState } from "react";
import { getZones, type ZoneGaugeItem } from "@/lib/api";
import { getStretchMeta } from "@/lib/stretch";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/use-t";
import type { TranslateFn } from "@/i18n/translate";

const MEDALS = ["1", "2", "3"] as const;

function zoneName(zoneId: string, t: TranslateFn): string {
  if (zoneId.startsWith("brussels-")) {
    return t(`zones.${zoneId}.name`);
  }
  const cp = zoneId.replace(/^cp-/, "");
  return t("leaderboard.communeFallback", { cp });
}

function zoneCommunes(zoneId: string, t: TranslateFn): string {
  if (zoneId.startsWith("brussels-")) {
    return t(`zones.${zoneId}.communes`);
  }
  return "";
}

function ZoneRow({
  row,
  rank,
  numberLocale,
  t,
}: {
  row: ZoneGaugeItem;
  rank: number;
  numberLocale: string;
  t: TranslateFn;
}) {
  const meta = getStretchMeta(row.count);
  const name = zoneName(row.zoneId, t);
  const communes = zoneCommunes(row.zoneId, t);

  return (
    <li
      className={cn(
        "flex items-center justify-between gap-3 border-b border-white/5 px-5 py-3.5 last:border-0 sm:px-6",
        rank <= 3 && "bg-white/[0.03]",
      )}
    >
      <div className="flex min-w-0 items-center gap-3">
        <span
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold",
            rank === 1 && "bg-amber-400 text-amber-950",
            rank === 2 && "bg-slate-300 text-slate-800",
            rank === 3 && "bg-orange-300 text-orange-950",
            rank > 3 && "bg-white/10 text-emerald-100",
          )}
        >
          {rank <= 3 ? MEDALS[rank - 1] : rank}
        </span>
        <div className="min-w-0">
          <p className="m-0 truncate font-medium text-white">{name}</p>
          {communes ? (
            <p className="m-0 truncate text-xs text-emerald-200/65">{communes}</p>
          ) : null}
        </div>
      </div>
      <div className="shrink-0 text-right">
        <p className="m-0 tabular-nums text-sm font-semibold text-emerald-100">
          {row.count.toLocaleString(numberLocale)} /{" "}
          {row.target.toLocaleString(numberLocale)}
        </p>
        <p className="m-0 text-xs text-emerald-200/70">
          {meta.exploded
            ? t("leaderboard.exploded", {
                tier: meta.nextTier.toLocaleString(numberLocale),
              })
            : t("leaderboard.progress", { pct: meta.openingPct })}
        </p>
      </div>
    </li>
  );
}

export function CityLeaderboard() {
  const { t, numberLocale } = useI18n();
  const [brussels, setBrussels] = useState<ZoneGaugeItem[]>([]);
  const [other, setOther] = useState<ZoneGaugeItem[]>([]);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const res = await getZones();
        if (!alive) return;
        setBrussels(res.items);
        setOther(res.otherItems.slice(0, 5));
      } catch {
        if (alive) {
          setBrussels([]);
          setOther([]);
        }
      }
    };
    load();
    const id = setInterval(load, 10000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  if (brussels.length === 0) return null;

  const brusselsSorted = [...brussels].sort((a, b) => b.count - a.count);

  return (
    <div className="mt-10 overflow-hidden rounded-2xl border border-emerald-900/10 bg-[var(--bg-deep,#0f2a22)] text-emerald-50 shadow-lg">
      <div className="border-b border-white/10 px-5 py-4 sm:px-6">
        <p className="m-0 text-xs uppercase tracking-[0.2em] text-emerald-200/80">
          {t("leaderboard.kicker")}
        </p>
        <h3 className="mt-1 font-display text-2xl font-semibold tracking-tight text-white">
          {t("leaderboard.title")}
        </h3>
        <p className="mt-2 max-w-2xl text-sm text-emerald-100/75">
          {t("leaderboard.intro")}
        </p>
      </div>

      <ol className="m-0 list-none space-y-0 p-0">
        {brusselsSorted.map((row, i) => (
          <ZoneRow
            key={row.zoneId}
            row={row}
            rank={i + 1}
            numberLocale={numberLocale}
            t={t}
          />
        ))}
      </ol>

      {other.length > 0 ? (
        <div className="border-t border-white/10 px-5 py-4 sm:px-6">
          <p className="m-0 text-xs uppercase tracking-[0.16em] text-emerald-200/70">
            {t("leaderboard.outsideBrussels")}
          </p>
          <ol className="m-0 mt-3 list-none space-y-0 p-0">
            {other.map((row, i) => (
              <ZoneRow
                key={row.zoneId}
                row={row}
                rank={i + 1}
                numberLocale={numberLocale}
                t={t}
              />
            ))}
          </ol>
        </div>
      ) : null}
    </div>
  );
}
