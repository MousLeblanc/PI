import brusselsZones from '../data/brussels-zones.json';

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

/** Brussels bassin id, or one commune zone per postal code elsewhere. */
export function resolveZoneId(postalCode: string): string {
  return CP_TO_ZONE.get(postalCode) ?? `cp-${postalCode}`;
}

export function isBrusselsZone(zoneId: string): boolean {
  return zoneId.startsWith('brussels-');
}
