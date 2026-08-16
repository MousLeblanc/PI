/** Opening tipping point — first store eligible */
export const OPENING_TARGET = 10_000;

const STRETCH_STEPS = [
  15_000, 20_000, 25_000, 30_000, 40_000, 50_000, 75_000, 100_000,
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
    nextFromList ?? Math.ceil((safe + 1) / 10_000) * 10_000;

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
