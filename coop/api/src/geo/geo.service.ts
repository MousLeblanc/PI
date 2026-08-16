import { BadRequestException, Injectable, Logger } from '@nestjs/common';

export type StreetSuggestion = {
  id: string;
  street: string;
  city?: string;
  postalCode?: string;
};

type PhotonFeature = {
  properties?: {
    osm_id?: number | string;
    name?: string;
    street?: string;
    city?: string;
    locality?: string;
    postcode?: string;
    countrycode?: string;
    type?: string;
  };
};

@Injectable()
export class GeoService {
  private readonly logger = new Logger(GeoService.name);
  private readonly cache = new Map<string, { at: number; items: StreetSuggestion[] }>();
  private readonly ttlMs = 60_000;

  async searchStreets(q: string, postalCode: string): Promise<StreetSuggestion[]> {
    const query = q.trim();
    if (query.length < 2) {
      throw new BadRequestException('Au moins 2 caractères');
    }
    if (!/^\d{4}$/.test(postalCode)) {
      throw new BadRequestException('Code postal invalide');
    }

    const cacheKey = `${postalCode}|${query.toLowerCase()}`;
    const hit = this.cache.get(cacheKey);
    if (hit && Date.now() - hit.at < this.ttlMs) {
      return hit.items;
    }

    const url = new URL('https://photon.komoot.io/api/');
    url.searchParams.set('q', `${query} ${postalCode} Belgique`);
    url.searchParams.set('limit', '12');
    url.searchParams.set('lang', 'fr');

    let features: PhotonFeature[] = [];
    try {
      const res = await fetch(url, {
        headers: {
          Accept: 'application/json',
          'User-Agent': 'PiCOOP/1.0 (cooperative; contact@picoop.local)',
        },
      });
      if (!res.ok) {
        this.logger.warn(`Photon HTTP ${res.status}`);
        return [];
      }
      const data = (await res.json()) as { features?: PhotonFeature[] };
      features = data.features ?? [];
    } catch (err) {
      this.logger.warn(`Photon error: ${String(err)}`);
      return [];
    }

    const seen = new Set<string>();
    const items: StreetSuggestion[] = [];

    for (const f of features) {
      const p = f.properties ?? {};
      if (p.countrycode && p.countrycode.toLowerCase() !== 'be') continue;
      if (p.postcode && p.postcode !== postalCode) continue;

      const street = (p.street || p.name || '').trim();
      if (!street) continue;
      // Prefer road-like results; still accept named places that look like streets
      const key = street.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);

      items.push({
        id: String(p.osm_id ?? `${street}-${items.length}`),
        street,
        city: p.city || p.locality,
        postalCode: p.postcode || postalCode,
      });
      if (items.length >= 8) break;
    }

    this.cache.set(cacheKey, { at: Date.now(), items });
    return items;
  }
}
