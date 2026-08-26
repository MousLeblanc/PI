/** Opening tipping point — launch eligible (households) */
export const OPENING_TARGET = 5_000;

const STRETCH_STEPS = [
  7_500, 10_000, 15_000, 20_000, 25_000, 30_000, 40_000, 50_000,
];

export type StretchMeta = {
  count: number;
  openingTarget: number;
  exploded: boolean;
  nextTier: number;
  openingPct: number;
  stretchPct: number;
};

export function getStretchMeta(count: number): StretchMeta {
  const safe = Math.max(0, count);
  const exploded = safe >= OPENING_TARGET;
  const nextFromList = STRETCH_STEPS.find((t) => t > safe);
  const nextTier =
    nextFromList ?? Math.ceil((safe + 1) / 5_000) * 5_000;

  return {
    count: safe,
    openingTarget: OPENING_TARGET,
    exploded,
    nextTier,
    openingPct: Math.min(100, Math.round((safe / OPENING_TARGET) * 100)),
    stretchPct: exploded
      ? Math.min(100, Math.round((safe / nextTier) * 100))
      : 0,
  };
}
