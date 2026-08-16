"use client";

import { FormEvent, useMemo, useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { StreetCombobox } from "@/components/StreetCombobox";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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

const AGE_BANDS = [
  { value: "AGE_0_4", label: "0–4 ans (quotas bébé)" },
  { value: "AGE_5_17", label: "5–17 ans" },
  { value: "AGE_18_64", label: "18–64 ans (bénévolat)" },
  { value: "AGE_65_PLUS", label: "65+ ans" },
] as const;

export function RegisterForm() {
  const [householdSize, setHouseholdSize] = useState(2);
  const [ageBands, setAgeBands] = useState<string[]>([
    "AGE_18_64",
    "AGE_18_64",
  ]);
  const [postalCode, setPostalCode] = useState("");
  const [streetName, setStreetName] = useState("");
  const [optIn, setOptIn] = useState(false);
  const [token, setToken] = useState<string | undefined>();
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
    const form = new FormData(e.currentTarget);
    try {
      await register({
        email: String(form.get("email")),
        password: String(form.get("password")),
        householdSize,
        ageBands,
        postalCode,
        streetName,
        houseNumber: String(form.get("houseNumber")),
        optInPublicNumber: optIn,
        turnstileToken: token,
      });
      setStatus(
        "Pré-inscription réussie. Un email de bienvenue vous sera envoyé si le service mail est configuré.",
      );
      e.currentTarget.reset();
      setPostalCode("");
      setStreetName("");
      setOptIn(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur d’inscription");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="border-slate-200/80 shadow-lg shadow-slate-900/5">
      <CardHeader>
        <CardTitle>Rejoindre Pi COOP</CardTitle>
        <CardDescription>
          Préinscription gratuite · données minimisées · sans paiement
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="grid gap-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="vous@email.be"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe (8+)</Label>
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
            <Label htmlFor="household">Taille du ménage</Label>
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
              Composition du foyer (tranches pour quotas bébé et bénévolat —
              aucun âge exact ne sera conservé).
            </p>
            {bandSelects.map((i) => (
              <div
                key={i}
                className="grid grid-cols-[5.5rem_1fr] items-center gap-3"
              >
                <Label>Pers. {i + 1}</Label>
                <Select
                  value={ageBands[i]}
                  onValueChange={(value) => {
                    const next = [...ageBands];
                    next[i] = value;
                    setAgeBands(next);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Tranche" />
                  </SelectTrigger>
                  <SelectContent>
                    {AGE_BANDS.map((b) => (
                      <SelectItem key={b.value} value={b.value}>
                        {b.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-[8rem_1fr_5.5rem]">
            <div className="space-y-2">
              <Label htmlFor="postalCode">Code postal</Label>
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
                    ? "Code postal inconnu"
                    : "\u00a0"}
              </p>
            </div>
            <div className="space-y-2">
              <Label>Rue</Label>
              <StreetCombobox
                postalCode={postalCode}
                value={streetName}
                onChange={setStreetName}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="houseNumber">N°</Label>
              <Input id="houseNumber" name="houseNumber" required />
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-xl border bg-white p-4">
            <Checkbox
              id="optIn"
              checked={optIn}
              onCheckedChange={(v) => setOptIn(v === true)}
              className="mt-0.5"
            />
            <Label htmlFor="optIn" className="font-normal leading-relaxed">
              Montrer l’exemple dans ma rue : afficher le numéro de ma maison
              pour encourager mes voisins (anonyme — aucun nom).
            </Label>
          </div>

          {!skipTurnstile && siteKey ? (
            <Turnstile siteKey={siteKey} onSuccess={setToken} />
          ) : null}

          <Button type="submit" size="xl" className="w-full" disabled={loading}>
            {loading ? "Envoi…" : "Je me préinscris — c’est gratuit"}
          </Button>

          {status && <p className="text-sm font-medium text-primary">{status}</p>}
          {error && <p className="text-sm text-destructive">{error}</p>}
        </form>
      </CardContent>
    </Card>
  );
}
