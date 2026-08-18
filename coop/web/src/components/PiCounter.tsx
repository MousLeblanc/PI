"use client";

import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { getPiCounter } from "@/lib/api";
import { formatPiFromCount } from "@/lib/belgium";
import { PI_DECIMALS } from "@/data/pi-decimals";
import { useI18n } from "@/i18n/use-t";

export function PiCounter() {
  const { t, numberLocale } = useI18n();
  const [total, setTotal] = useState(0);
  const prevTotal = useRef(0);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const next = await getPiCounter();
        if (!alive) return;
        if (next.total > prevTotal.current) {
          setFlash(true);
          window.setTimeout(() => setFlash(false), 1200);
        }
        prevTotal.current = next.total;
        setTotal(next.total);
      } catch {
        if (alive) setTotal(0);
      }
    };
    load();
    const id = setInterval(load, 5000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  // 1 personne = 1 décimale → "3,1" ; 0 personne → "3,"
  const full = formatPiFromCount(total, PI_DECIMALS);
  const frac = total === 0 ? "" : full.slice(2); // après "3,"
  const glowLen = Math.min(3, frac.length);
  const steady = glowLen > 0 ? frac.slice(0, -glowLen) : frac;
  const glow = glowLen > 0 ? frac.slice(-glowLen) : "";

  const coopWord = total > 1 ? t("pi.coopMany") : t("pi.coopOne");
  const decWord = total > 1 ? t("pi.decMany") : t("pi.decOne");
  const count = total.toLocaleString(numberLocale);
  const subtitle =
    total === 0
      ? t("pi.empty")
      : t("pi.filled", { count, coopWord, decWord });

  return (
    <div className="flex max-w-[min(92vw,42rem)] flex-col items-center gap-2">
      <Badge
        variant="soft"
        className="gap-2 border-emerald-300 px-4 py-2 text-sm shadow-sm"
      >
        <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-emerald-700" />
        <span className="font-display text-base tracking-tight text-emerald-950">
          <span className="inline-block max-w-[70vw] overflow-x-auto whitespace-nowrap align-bottom sm:max-w-[32rem]">
            <span>3,</span>
            {total > 0 ? (
              <>
                <span>{steady}</span>
                <span
                  className={
                    flash
                      ? "inline-block origin-bottom animate-pi-glow font-semibold text-emerald-500"
                      : "font-semibold text-emerald-700"
                  }
                >
                  {glow}
                </span>
              </>
            ) : null}
          </span>
        </span>
      </Badge>
      <p className="max-w-md text-center text-sm text-muted-foreground">
        {subtitle}
      </p>
    </div>
  );
}
