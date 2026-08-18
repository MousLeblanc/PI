import postalCodes from "@/data/belgian-postal-codes.json";

const map = postalCodes as Record<string, string>;

/** Resolve Belgian postal code → commune label (may list several localities). */
export function getCommune(postalCode: string): string | null {
  if (!/^\d{4}$/.test(postalCode)) return null;
  return map[postalCode] ?? null;
}

/** Short label when one postal code covers many villages. */
export function getCommuneShort(postalCode: string): string | null {
  const full = getCommune(postalCode);
  if (!full) return null;
  const parts = full
    .split(" / ")
    .map((part) => part.trim())
    .filter(Boolean);
  if (parts.length <= 2) return full;
  return `${parts[0]} (+${parts.length - 1})`;
}

export function formatPiFromCount(usersCount: number, decimals: string): string {
  const n = Math.max(0, Math.min(usersCount, decimals.length));
  if (n === 0) return "3,";
  return `3,${decimals.slice(0, n)}`;
}
