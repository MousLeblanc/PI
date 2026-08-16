"use client";

import { useEffect, useState } from "react";
import { getLeaderboard, type LeaderboardItem } from "@/lib/api";
import { getCommune } from "@/lib/belgium";
import { OPENING_TARGET, getStretchMeta } from "@/lib/stretch";
import { cn } from "@/lib/utils";

const MEDALS = ["1", "2", "3"] as const;

export function CityLeaderboard() {
  const [items, setItems] = useState<LeaderboardItem[]>([]);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const res = await getLeaderboard(8);
        if (alive) setItems(res.items);
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

  const rows =
    items.length > 0
      ? items
      : [
          { postalCode: "1000", count: 0 },
          { postalCode: "1030", count: 0 },
          { postalCode: "4000", count: 0 },
        ];

  return (
    <div className="mt-10 overflow-hidden rounded-2xl border border-emerald-900/10 bg-[var(--bg-deep,#0f2a22)] text-emerald-50 shadow-lg">
      <div className="border-b border-white/10 px-5 py-4 sm:px-6">
        <p className="m-0 text-xs uppercase tracking-[0.2em] text-emerald-200/80">
          Course nationale
        </p>
        <h3 className="mt-1 font-display text-2xl font-semibold tracking-tight text-white">
          La course au premier magasin
        </h3>
        <p className="mt-2 max-w-2xl text-sm text-emerald-100/75">
          Quelle ville franchira 10&nbsp;000 personnes en premier&nbsp;? Le
          premier palier débloque le magasin historique (flagship). Les villes
          suivantes entrent sur la roadmap d’ouverture.
        </p>
      </div>

      <ol className="m-0 list-none space-y-0 p-0">
        {rows.map((row, i) => {
          const meta = getStretchMeta(row.count);
          const label = getCommune(row.postalCode) ?? `CP ${row.postalCode}`;
          const rank = i + 1;
          return (
            <li
              key={row.postalCode}
              className={cn(
                "flex flex-wrap items-center justify-between gap-3 border-b border-white/5 px-5 py-3.5 last:border-0 sm:px-6",
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
                <div className="min-w-0">
                  <p className="m-0 truncate font-medium text-white">
                    {label}{" "}
                    <span className="text-emerald-200/60">
                      ({row.postalCode})
                    </span>
                  </p>
                  {meta.exploded ? (
                    <p className="m-0 text-xs text-amber-300">
                      Objectif d’ouverture explosé · prochain palier{" "}
                      {meta.nextTier.toLocaleString("fr-BE")}
                    </p>
                  ) : (
                    <p className="m-0 text-xs text-emerald-200/55">
                      Encore{" "}
                      {(OPENING_TARGET - row.count).toLocaleString("fr-BE")}{" "}
                      pour débloquer
                    </p>
                  )}
                </div>
              </div>
              <p className="m-0 tabular-nums text-sm font-semibold text-emerald-100">
                {row.count.toLocaleString("fr-BE")} /{" "}
                {OPENING_TARGET.toLocaleString("fr-BE")}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
