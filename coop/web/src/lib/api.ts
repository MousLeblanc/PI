const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

export type FolderPiResponse = {
  disclaimer: string;
  markupBasicEur: number;
  markupPremiumEur: number;
  items: Array<{
    id: string;
    name: string;
    wholesaleEur: number;
    retailEur: number;
    piPriceEur: number;
    markupEur: number;
    tier: "basic" | "premium";
  }>;
};

export type PiCounterResponse = {
  total: number;
  display: string;
  piFractionDigits: number;
};

export type PostalGaugesResponse = {
  items: Array<{ postalCode: string; count: number; target: number }>;
};

export type LeaderboardItem = {
  postalCode: string;
  count: number;
};

export type LeaderboardResponse = {
  openingTarget: number;
  items: LeaderboardItem[];
};

export type SocialProofResponse = {
  postalCode: string;
  streetName: string;
  houseNumbers: string[];
};

export type StreetSuggestion = {
  id: string;
  street: string;
  city?: string;
  postalCode?: string;
};

async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`API ${path}: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export function getFolderPi() {
  return apiGet<FolderPiResponse>("/catalog/folder-pi");
}

export function getPiCounter() {
  return apiGet<PiCounterResponse>("/gauges/pi");
}

export function getPostalGauges(code?: string) {
  const q = code ? `?code=${encodeURIComponent(code)}` : "";
  return apiGet<PostalGaugesResponse>(`/gauges/postal${q}`);
}

export function getLeaderboard(limit = 8) {
  return apiGet<LeaderboardResponse>(
    `/gauges/leaderboard?limit=${encodeURIComponent(String(limit))}`,
  );
}

export function getSocialProof(postalCode: string, streetName: string) {
  const q = new URLSearchParams({ postalCode, streetName });
  return apiGet<SocialProofResponse>(`/gauges/social-proof?${q}`);
}

export function searchStreets(q: string, postalCode: string) {
  const params = new URLSearchParams({ q, postalCode });
  return apiGet<{ items: StreetSuggestion[] }>(`/geo/streets?${params}`);
}

export async function register(body: Record<string, unknown>) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) {
    const msg = Array.isArray(data.message)
      ? data.message.join(", ")
      : data.message;
    throw new Error(msg ?? "Inscription impossible");
  }
  return data;
}
