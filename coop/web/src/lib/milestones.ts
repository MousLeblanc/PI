import { OPENING_TARGET } from "@/lib/stretch";

export type Milestone = {
  at: number;
  key: "m1" | "m2" | "m3" | "m4" | "m5";
};

/** Global mobilisation milestones (households). */
export const OPENING_MILESTONES: Milestone[] = [
  { at: 500, key: "m1" },
  { at: 2_000, key: "m2" },
  { at: 3_000, key: "m3" },
  { at: 4_000, key: "m4" },
  { at: OPENING_TARGET, key: "m5" },
];

/** Info sessions every N households in a life basin. */
export const BASIN_INFO_EVERY = 50;

export function getMilestoneState(count: number) {
  const safe = Math.max(0, count);
  const reached = OPENING_MILESTONES.filter((m) => safe >= m.at);
  const next = OPENING_MILESTONES.find((m) => safe < m.at) ?? null;
  return { reached, next };
}

/** Next basin info-session threshold (50, 100, 150…). */
export function nextBasinInfoAt(count: number) {
  const safe = Math.max(0, count);
  return (Math.floor(safe / BASIN_INFO_EVERY) + 1) * BASIN_INFO_EVERY;
}
