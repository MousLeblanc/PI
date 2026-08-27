"use client";

import { useEffect, useRef, useState } from "react";
import { getPiCounter } from "@/lib/api";
import { formatPiFromCount } from "@/lib/belgium";
import { PI_DECIMALS } from "@/data/pi-decimals";
import { useI18n } from "@/i18n/use-t";

export function PiCounter() {
  const { t, numberLocale } = useI18n();
  const [total, setTotal] = useState(0);
  const [peopleTotal, setPeopleTotal] = useState(0);
  const [display, setDisplay] = useState("3,");
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
        setPeopleTotal(next.peopleTotal ?? 0);
        // 1 ménage = 1 décimale — display API = source de vérité
        setDisplay(
          next.display ||
            formatPiFromCount(next.total, PI_DECIMALS),
        );
      } catch {
        if (alive) {
          setTotal(0);
          setPeopleTotal(0);
          setDisplay("3,");
        }
      }
    };
    load();
    const id = setInterval(load, 5000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  // display = "3," ou "3,141…" — 1 ménage préinscrit = 1 décimale
  const frac = total === 0 ? "" : display.slice(2);
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
  const peopleLabel =
    peopleTotal > 0
      ? t(peopleTotal > 1 ? "pi.peopleMany" : "pi.peopleOne", {
          count: peopleTotal.toLocaleString(numberLocale),
        })
      : null;

  return (
    <div className="flex max-w-[min(92vw,42rem)] flex-col items-center gap-2">
      <p className="flex items-center gap-2.5 text-sm">
        <span
          className="inline-block h-2 w-2 shrink-0 rounded-full bg-emerald-700 animate-live-dot motion-reduce:animate-none"
          aria-hidden
        />
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
      </p>
      <p className="max-w-md text-center text-sm text-muted-foreground">
        {subtitle}
      </p>
      {peopleLabel ? (
        <p className="text-center text-sm font-medium text-emerald-800">
          {peopleLabel}
        </p>
      ) : null}
    </div>
  );
}
