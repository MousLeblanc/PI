"use client";

import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { getPiCounter } from "@/lib/api";
import { formatPiFromCount } from "@/lib/belgium";
import { PI_DECIMALS } from "@/data/pi-decimals";

export function PiCounter() {
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
          window.setTimeout(() => setFlash(false), 700);
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

  const digits = formatPiFromCount(total, PI_DECIMALS);
  const base = digits.slice(0, -1);
  const last = digits.length > 2 ? digits.slice(-1) : "";
  const word = total <= 1 ? "préinscrit" : "préinscrits";

  return (
    <Badge
      variant="soft"
      className="max-w-[min(92vw,42rem)] gap-2 border-emerald-300 px-4 py-2 text-sm shadow-sm"
    >
      <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-emerald-700" />
      <span className="font-display text-base tracking-tight text-emerald-950">
        <span className="inline-block max-w-[70vw] overflow-x-auto whitespace-nowrap align-bottom sm:max-w-[32rem]">
          {total === 0 ? (
            <span>3,</span>
          ) : (
            <>
              <span>{base}</span>
              <span
                className={
                  flash
                    ? "inline-block origin-bottom animate-pi-digit text-emerald-700"
                    : "text-emerald-800"
                }
              >
                {last}
              </span>
            </>
          )}
        </span>
        <span className="text-emerald-800/80">
          {" "}
          ({total.toLocaleString("fr-BE")} {word})
        </span>
      </span>
    </Badge>
  );
}
