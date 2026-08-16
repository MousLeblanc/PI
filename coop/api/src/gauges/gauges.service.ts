import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

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

  async getSocialProof(postalCode: string, streetName: string) {
    if (!postalCode || !streetName) {
      throw new BadRequestException('postalCode et streetName requis');
    }
    if (!/^\d{4}$/.test(postalCode)) {
      throw new BadRequestException('Code postal invalide');
    }

    const needle = normalizeStreet(streetName);
    const rows = await this.prisma.user.findMany({
      where: {
        postalCode,
        optInPublicNumber: true,
      },
      select: { houseNumber: true, streetName: true },
      orderBy: { houseNumber: 'asc' },
      take: 500,
    });

    const houseNumbers = [
      ...new Set(
        rows
          .filter((r) => normalizeStreet(r.streetName) === needle)
          .map((r) => r.houseNumber),
      ),
    ];

    return {
      postalCode,
      streetName: streetName.trim(),
      houseNumbers,
    };
  }
}
