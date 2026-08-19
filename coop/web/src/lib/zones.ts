import brusselsZones from "@/data/brussels-zones.json";
import { getCommuneShort } from "@/lib/belgium";

export type BrusselsZoneDef = {
  id: string;
  postalCodes: string[];
};

export const BRUSSELS_ZONES: BrusselsZoneDef[] = brusselsZones.zones;

const CP_TO_ZONE = new Map<string, string>();
for (const zone of BRUSSELS_ZONES) {
  for (const postalCode of zone.postalCodes) {
    CP_TO_ZONE.set(postalCode, zone.id);
  }
}

export function resolveZoneId(postalCode: string): string {
  return CP_TO_ZONE.get(postalCode) ?? `cp-${postalCode}`;
}

export function isBrusselsZone(zoneId: string): boolean {
  return zoneId.startsWith("brussels-");
}

export function zoneLabelFromPostalCode(
  postalCode: string,
  t: (key: string) => string,
): string {
  const zoneId = resolveZoneId(postalCode);
  if (isBrusselsZone(zoneId)) {
    return t(`zones.${zoneId}.name`);
  }
  return getCommuneShort(postalCode) ?? postalCode;
}
