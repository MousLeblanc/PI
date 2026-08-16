"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { getPostalGauges, type PostalGaugesResponse } from "@/lib/api";
import { getCommune } from "@/lib/belgium";

const HIGHLIGHT_CODES = ["1000", "2000", "4000", "7000", "9000"];

export function PostalGauges() {
  const [filter, setFilter] = useState("");
  const [data, setData] = useState<PostalGaugesResponse>({ items: [] });

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const code = /^\d{4}$/.test(filter) ? filter : undefined;
        const next = await getPostalGauges(code);
        if (alive) setData(next);
      } catch {
        if (alive) setData({ items: [] });
      }
    };
    load();
    const id = setInterval(load, 8000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, [filter]);

  const items = useMemo(() => {
    if (data.items.length) return data.items;
    return HIGHLIGHT_CODES.map((postalCode) => ({
      postalCode,
      count: 0,
      target: 5000,
    }));
  }, [data.items]);

  return (
    <div className="space-y-5">
      <div className="max-w-xs space-y-2">
        <Label htmlFor="cp">Votre code postal</Label>
        <Input
          id="cp"
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value.replace(/\D/g, "").slice(0, 4))
          }
          placeholder="ex. 1050"
          inputMode="numeric"
        />
        <p className="min-h-5 text-sm font-medium text-emerald-800">
          {getCommune(filter) ??
            (filter.length === 4 ? "Code postal inconnu" : "\u00a0")}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((item) => {
          const pct = Math.min(
            100,
            Math.round((item.count / item.target) * 100),
          );
          const label =
            getCommune(item.postalCode) ?? `CP ${item.postalCode}`;
          const remaining = Math.max(item.target - item.count, 0);

          return (
            <Card key={item.postalCode}>
              <CardHeader className="pb-3">
                <div className="flex items-baseline justify-between gap-3">
                  <CardTitle className="text-xl">{label}</CardTitle>
                  <span className="text-sm tabular-nums text-muted-foreground">
                    {item.count.toLocaleString("fr-BE")} /{" "}
                    {item.target.toLocaleString("fr-BE")}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  CP {item.postalCode}
                </p>
              </CardHeader>
              <CardContent className="space-y-3">
                <Progress value={pct} className="h-3.5" />
                <p className="text-sm text-muted-foreground">
                  {pct}&nbsp;% · encore{" "}
                  <strong className="text-foreground">
                    {remaining.toLocaleString("fr-BE")}
                  </strong>{" "}
                  voisins pour ouvrir le magasin ici
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
