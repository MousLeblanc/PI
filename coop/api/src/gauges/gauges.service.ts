import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BRUSSELS_ZONES, isBrusselsZone, resolveZoneId } from './zones.util';

const DEFAULT_TARGET = 10_000;

/** Digits of π after "3." for visual elongation of the counter */
const PI_FRAC =
  '1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679';

/** Accent/case-insensitive street compare: "avenue emile" ≈ "Avenue Émile" */
function normalizeStreet(value: string): string {
  return value
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

@Injectable()
export class GaugesService {
  constructor(private readonly prisma: PrismaService) {}

  /** Counts personnes (somme des tailles de foyer), pas le nombre de comptes. */
  private async totalPersons(where?: { postalCode?: string }) {
    const agg = await this.prisma.user.aggregate({
      where,
      _sum: { householdSize: true },
    });
    return agg._sum.householdSize ?? 0;
  }

  async getPiCounter() {
    const total = await this.totalPersons();
    // 1 décimale de π par personne préinscrite
    const fracLen = Math.min(Math.max(total, 0), PI_FRAC.length);
    const display =
      fracLen === 0 ? '3,' : `3,${PI_FRAC.slice(0, fracLen)}`;
    return { total, display, piFractionDigits: fracLen };
  }

  async getPostalGauges(code?: string) {
    if (code) {
      if (!/^\d{4}$/.test(code)) {
        throw new BadRequestException('Code postal invalide');
      }
      const count = await this.totalPersons({ postalCode: code });
      return {
        items: [
          {
            postalCode: code,
            count,
            target: DEFAULT_TARGET,
          },
        ],
      };
    }

    const grouped = await this.prisma.user.groupBy({
      by: ['postalCode'],
      _sum: { householdSize: true },
      orderBy: { postalCode: 'asc' },
      take: 50,
    });

    return {
      items: grouped.map((g) => ({
        postalCode: g.postalCode,
        count: g._sum.householdSize ?? 0,
        target: DEFAULT_TARGET,
      })),
    };
  }

  async getLeaderboard(limit = 10) {
    const take = Math.min(Math.max(limit, 1), 25);
    const grouped = await this.prisma.user.groupBy({
      by: ['postalCode'],
      _sum: { householdSize: true },
      orderBy: { _sum: { householdSize: 'desc' } },
      take,
    });

    return {
      openingTarget: DEFAULT_TARGET,
      items: grouped.map((g) => ({
        postalCode: g.postalCode,
        count: g._sum.householdSize ?? 0,
      })),
    };
  }

  async getZones(code?: string) {
    if (code && !/^\d{4}$/.test(code)) {
      throw new BadRequestException('Code postal invalide');
    }

    const grouped = await this.prisma.user.groupBy({
      by: ['postalCode'],
      _sum: { householdSize: true },
    });

    const byCp = new Map(
      grouped.map((g) => [g.postalCode, g._sum.householdSize ?? 0]),
    );

    type ZoneAgg = {
      count: number;
      postalCodes: string[];
      breakdown: Array<{ postalCode: string; count: number }>;
    };

    const zoneMap = new Map<string, ZoneAgg>();

    for (const zone of BRUSSELS_ZONES) {
      zoneMap.set(zone.id, {
        count: 0,
        postalCodes: [...zone.postalCodes],
        breakdown: [],
      });
    }

    for (const [postalCode, count] of byCp) {
      const zoneId = resolveZoneId(postalCode);
      if (!zoneMap.has(zoneId)) {
        zoneMap.set(zoneId, {
          count: 0,
          postalCodes: [postalCode],
          breakdown: [],
        });
      }
      const zone = zoneMap.get(zoneId)!;
      zone.count += count;
      zone.breakdown.push({ postalCode, count });
      if (!zone.postalCodes.includes(postalCode)) {
        zone.postalCodes.push(postalCode);
      }
    }

    for (const zone of zoneMap.values()) {
      zone.breakdown.sort((a, b) => b.count - a.count || a.postalCode.localeCompare(b.postalCode));
      zone.postalCodes.sort();
    }

    const items = [...zoneMap.entries()]
      .map(([zoneId, data]) => ({
        zoneId,
        count: data.count,
        postalCodes: data.postalCodes,
        breakdown: data.breakdown,
        target: DEFAULT_TARGET,
        brussels: isBrusselsZone(zoneId),
      }))
      .sort((a, b) => b.count - a.count || a.zoneId.localeCompare(b.zoneId));

    const brusselsItems = items.filter((item) => item.brussels);
    const otherItems = items.filter((item) => !item.brussels && item.count > 0);

    if (code) {
      const zoneId = resolveZoneId(code);
      const focus = items.find((item) => item.zoneId === zoneId) ?? {
        zoneId,
        count: 0,
        postalCodes: [code],
        breakdown: [{ postalCode: code, count: 0 }],
        target: DEFAULT_TARGET,
        brussels: isBrusselsZone(zoneId),
      };
      return {
        openingTarget: DEFAULT_TARGET,
        focus,
        items: brusselsItems,
        otherItems,
      };
    }

    return {
      openingTarget: DEFAULT_TARGET,
      items: brusselsItems,
      otherItems,
    };
  }

  async getSocialProof(postalCode: string, streetName: string) {
    if (!postalCode || !streetName) {
      throw new BadRequestException('postalCode et streetName requis');
    }
    if (!/^\d{4}$/.test(postalCode)) {
      throw new BadRequestException('Code postal invalide');
    }

    /** Hide exact volume when only one household — avoids re-identification. */
    const MIN_PUBLIC_COUNT = 2;

    const needle = normalizeStreet(streetName);
    const rows = await this.prisma.user.findMany({
      where: { postalCode },
      select: { streetName: true },
      take: 2000,
    });

    const count = rows.filter(
      (r) => normalizeStreet(r.streetName) === needle,
    ).length;

    return {
      postalCode,
      streetName: streetName.trim(),
      count: count >= MIN_PUBLIC_COUNT ? count : 0,
      published: count >= MIN_PUBLIC_COUNT,
    };
  }
}
