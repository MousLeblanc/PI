"use client";

import { useEffect, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { getZones, type ZoneGaugeItem } from "@/lib/api";
import { getCommuneShort } from "@/lib/belgium";
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
  return getCommuneShort(cp) ?? t("leaderboard.communeFallback", { cp });
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
  const [open, setOpen] = useState(false);
  const meta = getStretchMeta(row.count);
  const name = zoneName(row.zoneId, t);
  const communes = zoneCommunes(row.zoneId, t);
  const canExpand = row.breakdown.length > 1;
  const panelId = `zone-panel-${row.zoneId}`;

  return (
    <li
      className={cn(
        "border-b border-white/5 last:border-0",
        rank <= 3 && "bg-white/[0.03]",
      )}
    >
      <button
        type="button"
        className="flex w-full items-center justify-between gap-3 px-5 py-3.5 text-left sm:px-6"
        onClick={() => canExpand && setOpen((v) => !v)}
        aria-expanded={canExpand ? open : undefined}
        aria-controls={canExpand ? panelId : undefined}
        disabled={!canExpand}
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
              <p className="m-0 truncate text-xs text-emerald-200/65">
                {communes}
              </p>
            ) : null}
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <div className="text-right">
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
          {canExpand ? (
            <ChevronDown
              className={cn(
                "h-4 w-4 text-emerald-200/80 transition-transform",
                open && "rotate-180",
              )}
              aria-hidden
            />
          ) : (
            <span className="w-4" aria-hidden />
          )}
        </div>
      </button>

      {canExpand && open ? (
        <div
          id={panelId}
          className="border-t border-white/5 bg-black/15 px-5 py-3 sm:px-6"
        >
          <p className="m-0 mb-2 text-xs uppercase tracking-wide text-emerald-200/60">
            {t("leaderboard.breakdown")}
          </p>
          <ul className="m-0 list-none space-y-1.5 p-0">
            {row.breakdown.map((item) => (
              <li
                key={item.postalCode}
                className="flex items-center justify-between gap-3 text-sm"
              >
                <span className="text-emerald-100/85">
                  {getCommuneShort(item.postalCode) ?? item.postalCode}{" "}
                  <span className="text-xs text-emerald-200/50">
                    ({item.postalCode})
                  </span>
                </span>
                <span className="tabular-nums font-medium text-emerald-50">
                  {item.count.toLocaleString(numberLocale)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </li>
  );
}

function AccordionSection({
  id,
  title,
  open,
  onToggle,
  children,
  t,
}: {
  id: string;
  title: string;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
  t: TranslateFn;
}) {
  return (
    <div className="border-t border-white/10 first:border-t-0">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-3 px-5 py-3.5 text-left sm:px-6"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={id}
      >
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-200/80">
          {title}
        </span>
        <span className="flex items-center gap-2 text-xs text-emerald-200/70">
          {open ? t("leaderboard.collapse") : t("leaderboard.expand")}
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform",
              open && "rotate-180",
            )}
            aria-hidden
          />
        </span>
      </button>
      {open ? (
        <div id={id}>
          <ol className="m-0 list-none space-y-0 p-0">{children}</ol>
        </div>
      ) : null}
    </div>
  );
}

export function CityLeaderboard() {
  const { t, numberLocale } = useI18n();
  const [brussels, setBrussels] = useState<ZoneGaugeItem[]>([]);
  const [other, setOther] = useState<ZoneGaugeItem[]>([]);
  const [brusselsOpen, setBrusselsOpen] = useState(true);
  const [otherOpen, setOtherOpen] = useState(false);

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

      <AccordionSection
        id="leaderboard-brussels"
        title={t("leaderboard.brusselsZones")}
        open={brusselsOpen}
        onToggle={() => setBrusselsOpen((v) => !v)}
        t={t}
      >
        {brusselsSorted.map((row, i) => (
          <ZoneRow
            key={row.zoneId}
            row={row}
            rank={i + 1}
            numberLocale={numberLocale}
            t={t}
          />
        ))}
      </AccordionSection>

      {other.length > 0 ? (
        <AccordionSection
          id="leaderboard-outside"
          title={t("leaderboard.outsideBrussels")}
          open={otherOpen}
          onToggle={() => setOtherOpen((v) => !v)}
          t={t}
        >
          {other.map((row, i) => (
            <ZoneRow
              key={row.zoneId}
              row={row}
              rank={i + 1}
              numberLocale={numberLocale}
              t={t}
            />
          ))}
        </AccordionSection>
      ) : null}
    </div>
  );
}
