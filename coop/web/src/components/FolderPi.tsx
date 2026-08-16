"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getFolderPi, type FolderPiResponse } from "@/lib/api";

function formatMarkupBadge(markupEur: number) {
  const cents = Math.round(markupEur * 100);
  return `+${cents}\u00a0centimes de marge fixe`;
}

export function FolderPi() {
  const [data, setData] = useState<FolderPiResponse | null>(null);

  useEffect(() => {
    getFolderPi()
      .then(setData)
      .catch(() => setData(null));
  }, []);

  const items = data?.items ?? [];

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <Badge className="bg-emerald-800 text-white hover:bg-emerald-800">
          Folder Digital Pi
        </Badge>
        <p className="text-sm text-muted-foreground">
          Prix grossiste + marge fixe (0,20&nbsp;€ ou 0,50&nbsp;€) = prix Pi
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Card
            key={item.id}
            className="overflow-hidden transition-shadow hover:shadow-md"
          >
            <CardHeader className="pb-3">
              <p className="text-sm font-medium text-foreground">
                {item.name}
              </p>
            </CardHeader>
            <CardContent className="space-y-1">
              <p className="text-sm text-slate-500 line-through">
                {item.retailEur.toFixed(2).replace(".", ",")}&nbsp;€ en magasin
              </p>
              <p className="font-display text-4xl font-bold tracking-tight text-emerald-800">
                {item.piPriceEur.toFixed(2).replace(".", ",")}
                <span className="ml-1 text-lg font-semibold">€</span>
              </p>
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-900">
                Prix Pi
              </p>
              <p className="pt-1 text-xs text-muted-foreground">
                dont grossiste{" "}
                {item.wholesaleEur.toFixed(2).replace(".", ",")}&nbsp;€
              </p>
            </CardContent>
            <CardFooter>
              <Badge
                className={
                  item.tier === "premium"
                    ? "border-transparent bg-teal-800 text-sm font-semibold text-white hover:bg-teal-800"
                    : "border-transparent bg-emerald-800 text-sm font-semibold text-white hover:bg-emerald-800"
                }
              >
                {formatMarkupBadge(item.markupEur)}
              </Badge>
            </CardFooter>
          </Card>
        ))}

        {!data && (
          <Card className="sm:col-span-2 lg:col-span-3">
            <CardContent className="py-10 text-center text-muted-foreground">
              Catalogue temporairement indisponible. Réessayez dans un instant.
            </CardContent>
          </Card>
        )}
      </div>

      <p className="mt-4 text-xs text-amber-900/90">
        {data?.disclaimer ??
          "* Prix cibles estimés à titre indicatif. Non contractuels."}
      </p>
    </div>
  );
}
