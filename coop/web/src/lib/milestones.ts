import { OPENING_TARGET } from "@/lib/stretch";

export type Milestone = {
  at: number;
  key: "m1" | "m2" | "m3" | "m4";
};

export const OPENING_MILESTONES: Milestone[] = [
  { at: 500, key: "m1" },
  { at: 1_500, key: "m2" },
  { at: 3_000, key: "m3" },
  { at: OPENING_TARGET, key: "m4" },
];

export function getMilestoneState(count: number) {
  const safe = Math.max(0, count);
  const reached = OPENING_MILESTONES.filter((m) => safe >= m.at);
  const next = OPENING_MILESTONES.find((m) => safe < m.at) ?? null;
  return { reached, next };
}
