"use client";

import { useEffect, useState } from "react";
import { getLeaderboard, type LeaderboardItem } from "@/lib/api";
import { getCommuneShort } from "@/lib/belgium";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/use-t";

const MEDALS = ["1", "2", "3"] as const;

export function CityLeaderboard() {
  const { t, numberLocale } = useI18n();
  const [items, setItems] = useState<LeaderboardItem[]>([]);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const res = await getLeaderboard(8);
        if (alive) setItems(res.items.filter((row) => row.count > 0));
      } catch {
        if (alive) setItems([]);
      }
    };
    load();
    const id = setInterval(load, 10000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  if (items.length === 0) return null;

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
        {items.map((row, i) => {
          const label =
            getCommuneShort(row.postalCode) ?? `CP ${row.postalCode}`;
          const rank = i + 1;
          return (
            <li
              key={row.postalCode}
              className={cn(
                "flex items-center justify-between gap-3 border-b border-white/5 px-5 py-3.5 last:border-0 sm:px-6",
                i < 3 && "bg-white/[0.03]",
              )}
            >
              <div className="flex min-w-0 items-center gap-3">
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold",
                    i === 0 && "bg-amber-400 text-amber-950",
                    i === 1 && "bg-slate-300 text-slate-800",
                    i === 2 && "bg-orange-300 text-orange-950",
                    i > 2 && "bg-white/10 text-emerald-100",
                  )}
                >
                  {i < 3 ? MEDALS[i] : rank}
                </span>
                <p className="m-0 truncate font-medium text-white">
                  {label}{" "}
                  <span className="text-emerald-200/60">({row.postalCode})</span>
                </p>
              </div>
              <p className="m-0 shrink-0 tabular-nums text-sm font-semibold text-emerald-100">
                {row.count.toLocaleString(numberLocale)}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
