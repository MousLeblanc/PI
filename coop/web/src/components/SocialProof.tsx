"use client";

import { FormEvent, useState } from "react";
import { StreetCombobox } from "@/components/StreetCombobox";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getSocialProof } from "@/lib/api";
import { getCommune } from "@/lib/belgium";
import { useI18n } from "@/i18n/use-t";
import { translateApiError } from "@/i18n/api-errors";

export function SocialProof() {
  const { t, numberLocale } = useI18n();
  const [postalCode, setPostalCode] = useState("1050");
  const [streetName, setStreetName] = useState("");
  const [result, setResult] = useState<{
    count: number;
    published: boolean;
    street: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const commune = getCommune(postalCode);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!streetName.trim()) {
      setError(t("social.chooseStreet"));
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await getSocialProof(postalCode, streetName);
      setResult({
        count: res.count,
        published: res.published,
        street: res.streetName,
      });
    } catch (err) {
      setResult(null);
      setError(
        err instanceof Error
          ? translateApiError(err.message, t)
          : t("social.error"),
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardContent className="space-y-4 pt-6">
        <form
          onSubmit={onSubmit}
          className="grid gap-3 sm:grid-cols-[8rem_1fr_auto]"
        >
          <div className="space-y-2">
            <Label htmlFor="sp-cp">{t("social.cp")}</Label>
            <Input
              id="sp-cp"
              required
              value={postalCode}
              onChange={(e) => {
                const next = e.target.value.replace(/\D/g, "").slice(0, 4);
                setPostalCode(next);
                setStreetName("");
                setResult(null);
              }}
              placeholder="1050"
              inputMode="numeric"
              maxLength={4}
            />
            <p className="min-h-5 text-xs font-medium text-emerald-800">
              {commune
                ? commune
                : postalCode.length === 4
                  ? t("register.unknownPostal")
                  : "\u00a0"}
            </p>
          </div>
          <div className="space-y-2">
            <Label>{t("social.street")}</Label>
            <StreetCombobox
              postalCode={postalCode}
              value={streetName}
              onChange={(v) => {
                setStreetName(v);
                setResult(null);
              }}
              required
            />
          </div>
          <div className="flex items-end pb-7">
            <Button
              type="submit"
              disabled={loading || !streetName.trim()}
              className="w-full sm:w-auto"
            >
              {loading ? t("social.loading") : t("social.see")}
            </Button>
          </div>
        </form>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <p className="text-sm text-muted-foreground">{t("social.anonymous")}</p>

        <div>
          {result === null ? (
            <p className="text-sm text-muted-foreground">{t("social.hint")}</p>
          ) : result.published ? (
            <p className="font-display text-lg font-semibold text-emerald-900">
              {t("social.volume", {
                count: result.count.toLocaleString(numberLocale),
                street: result.street,
              })}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">{t("social.none")}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
