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

  const digits = formatPiFromCount(total, PI_DECIMALS);
  const glowCount = Math.min(3, Math.max(0, digits.length - 2));
  const base = glowCount > 0 ? digits.slice(0, -glowCount) : digits;
  const glow = glowCount > 0 ? digits.slice(-glowCount) : "";
  const coopLabel =
    total <= 1 ? "1 coopérateur" : `${total.toLocaleString("fr-BE")} coopérateurs`;

  return (
    <div className="flex max-w-[min(92vw,42rem)] flex-col items-center gap-2">
      <Badge
        variant="soft"
        className="gap-2 border-emerald-300 px-4 py-2 text-sm shadow-sm"
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
                      ? "inline-block origin-bottom animate-pi-glow font-semibold text-emerald-500"
                      : "font-semibold text-emerald-700"
                  }
                >
                  {glow}
                </span>
              </>
            )}
          </span>
        </span>
      </Badge>
      <p className="max-w-md text-center text-sm text-muted-foreground">
        <span className="font-medium text-emerald-900">{coopLabel}</span>
        {" = "}
        {total.toLocaleString("fr-BE")} décimale
        {total > 1 ? "s" : ""}. Rejoignez-nous pour allonger la chaîne&nbsp;!
      </p>
    </div>
  );
}
