"use client";

import { FormEvent, useMemo, useRef, useState } from "react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { StreetCombobox } from "@/components/StreetCombobox";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { register } from "@/lib/api";
import { getCommune } from "@/lib/belgium";
import { zoneLabelFromPostalCode } from "@/lib/zones";
import { WelcomeToast } from "@/components/WelcomeToast";
import { translateApiError } from "@/i18n/api-errors";
import { useI18n } from "@/i18n/use-t";

const AGE_BAND_KEYS = [
  "AGE_0_4",
  "AGE_5_17",
  "AGE_18_64",
  "AGE_65_PLUS",
] as const;

export function RegisterForm() {
  const { t, messages, locale } = useI18n();
  const [householdSize, setHouseholdSize] = useState(2);
  const [ageBands, setAgeBands] = useState<string[]>([
    "AGE_18_64",
    "AGE_18_64",
  ]);
  const [postalCode, setPostalCode] = useState("");
  const [streetName, setStreetName] = useState("");
  const [token, setToken] = useState<string | undefined>();
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ title: string; body: string } | null>(
    null,
  );
  const [share, setShare] = useState<{
    postalCode: string;
    zoneLabel: string;
  } | null>(null);
  const [shareCopied, setShareCopied] = useState(false);
  const turnstileRef = useRef<TurnstileInstance | null>(null);

  const skipTurnstile = process.env.NEXT_PUBLIC_TURNSTILE_SKIP === "true";
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
  const commune = getCommune(postalCode);

  const bandSelects = useMemo(
    () => Array.from({ length: householdSize }, (_, i) => i),
    [householdSize],
  );

  function onSizeChange(size: number) {
    setHouseholdSize(size);
    setAgeBands((prev) => {
      const next = [...prev];
      while (next.length < size) next.push("AGE_18_64");
      return next.slice(0, size);
    });
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setStatus(null);
    const formEl = e.currentTarget;
    const form = new FormData(formEl);
    try {
      const data = await register({
        email: String(form.get("email")),
        password: String(form.get("password")),
        householdSize,
        ageBands,
        postalCode,
        streetName,
        houseNumber: String(form.get("houseNumber")),
        optInPublicNumber: false,
        turnstileToken: token,
      });
      const added = Number(data.decimalsAdded ?? householdSize) || householdSize;
      const total = Number(data.piPersonCount ?? added) || added;
      const from = Math.max(1, total - added + 1);
      setToast({
        title: t("register.toastTitle"),
        body:
          added === 1
            ? t("register.toastOne", { total })
            : t("register.toastMany", { added, from, total }),
      });
      setShare({
        postalCode,
        zoneLabel: zoneLabelFromPostalCode(postalCode, t),
      });
      setShareCopied(false);
      setStatus(t("register.success"));
      formEl.reset();
      setHouseholdSize(2);
      setAgeBands(["AGE_18_64", "AGE_18_64"]);
      setPostalCode("");
      setStreetName("");
      setToken(undefined);
    } catch (err) {
      setError(
        translateApiError(
          err instanceof Error ? err.message : "",
          t,
        ),
      );
    } finally {
      turnstileRef.current?.reset();
      setToken(undefined);
      setLoading(false);
    }
  }

  async function onShare() {
    if (!share) return;
    const url = `https://www.picoop.be/?cp=${encodeURIComponent(share.postalCode)}`;
    const text = t("register.shareMessage", {
      zone: share.zoneLabel,
      url,
    });
    try {
      if (typeof navigator.share === "function") {
        await navigator.share({ text, url });
        return;
      }
      await navigator.clipboard.writeText(text);
      setShareCopied(true);
    } catch {
      /* user cancelled share sheet */
    }
  }

  return (
    <Card className="border-slate-200/80 shadow-lg shadow-slate-900/5">
      <CardContent className="p-6">
        <form onSubmit={onSubmit} className="grid gap-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">{t("register.email")}</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="vous@email.be"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t("register.password")}</Label>
              <Input
                id="password"
                name="password"
                type="password"
                minLength={8}
                required
              />
            </div>
          </div>

          <div className="max-w-[10rem] space-y-2">
            <Label htmlFor="household">{t("register.household")}</Label>
            <Input
              id="household"
              type="number"
              min={1}
              max={12}
              value={householdSize}
              onChange={(e) => onSizeChange(Number(e.target.value) || 1)}
            />
          </div>

          <div className="space-y-3 rounded-xl border bg-slate-50/80 p-4">
            <p className="text-sm font-medium text-muted-foreground">
              {t("register.composition")}
            </p>
            {bandSelects.map((i) => (
              <div
                key={i}
                className="grid grid-cols-[5.5rem_1fr] items-center gap-3"
              >
                <Label>{t("register.person", { n: i + 1 })}</Label>
                <Select
                  value={ageBands[i]}
                  onValueChange={(value) => {
                    const next = [...ageBands];
                    next[i] = value;
                    setAgeBands(next);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t("register.bandPlaceholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    {AGE_BAND_KEYS.map((value) => (
                      <SelectItem key={value} value={value}>
                        {messages.register.ageBands[value]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-[8rem_1fr_5.5rem]">
            <div className="space-y-2">
              <Label htmlFor="postalCode">{t("register.postalCode")}</Label>
              <Input
                id="postalCode"
                name="postalCode"
                required
                pattern="\d{4}"
                maxLength={4}
                inputMode="numeric"
                placeholder="1050"
                value={postalCode}
                onChange={(e) => {
                  const next = e.target.value.replace(/\D/g, "").slice(0, 4);
                  setPostalCode(next);
                  setStreetName("");
                }}
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
              <Label>{t("register.street")}</Label>
              <StreetCombobox
                postalCode={postalCode}
                value={streetName}
                onChange={setStreetName}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="houseNumber">{t("register.houseNumber")}</Label>
              <Input id="houseNumber" name="houseNumber" required />
            </div>
          </div>

          {!skipTurnstile && siteKey ? (
            <Turnstile
              ref={turnstileRef}
              siteKey={siteKey}
              options={{ action: "signup", language: locale }}
              onSuccess={setToken}
              onExpire={() => setToken(undefined)}
              onError={() => setToken(undefined)}
            />
          ) : null}

          <Button type="submit" size="xl" className="w-full" disabled={loading}>
            {loading ? t("register.submitting") : t("register.submit")}
          </Button>

          {status && <p className="text-sm font-medium text-primary">{status}</p>}
          {share ? (
            <div className="rounded-xl border border-emerald-200/80 bg-emerald-50/60 p-4">
              <p className="text-sm leading-relaxed text-foreground">
                {t("register.sharePrompt", { zone: share.zoneLabel })}
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-3"
                onClick={onShare}
              >
                {shareCopied ? t("register.shareCopied") : t("register.shareCta")}
              </Button>
            </div>
          ) : null}
          {error && <p className="text-sm text-destructive">{error}</p>}
        </form>
        <WelcomeToast
          open={Boolean(toast)}
          title={toast?.title ?? ""}
          body={toast?.body ?? ""}
          onClose={() => setToast(null)}
        />
      </CardContent>
    </Card>
  );
}
