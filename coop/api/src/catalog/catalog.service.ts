import { Injectable } from '@nestjs/common';

const MARKUP_BASIC_EUR = 0.2;
const MARKUP_PREMIUM_EUR = 0.5;

type CatalogSeed = {
  id: string;
  name: string;
  wholesaleEur: number;
  retailEur: number;
  /** basic = quotidien (0,20 €) ; premium = forte valeur (0,50 €) */
  tier: 'basic' | 'premium';
  imageUrl: string;
};

@Injectable()
export class CatalogService {
  getFolderPi() {
    // Prix grossiste = ordre de grandeur achat groupé / palette (BE, bio).
    // retailEur = prix rayon supermarché typique, pour comparaison visuelle.
    const seeds: CatalogSeed[] = [
      {
        id: 'lait',
        name: 'Lait entier bio 1L',
        wholesaleEur: 0.62,
        retailEur: 2.0,
        tier: 'basic',
        imageUrl: '/folder/lait.jpg',
      },
      {
        id: 'oeufs',
        name: 'Œufs bio plein air x6',
        wholesaleEur: 1.45,
        retailEur: 2.95,
        tier: 'basic',
        imageUrl: '/folder/oeufs.jpg',
      },
      {
        id: 'farine',
        name: 'Farine T65 bio 1kg',
        wholesaleEur: 0.78,
        retailEur: 2.2,
        tier: 'basic',
        imageUrl: '/folder/farine.jpg',
      },
      {
        id: 'pommes',
        name: 'Pommes bio Belgique 1kg',
        wholesaleEur: 1.15,
        retailEur: 2.79,
        tier: 'basic',
        imageUrl: '/folder/pommes.jpg',
      },
      {
        id: 'riz',
        name: 'Riz complet bio 1kg',
        wholesaleEur: 1.55,
        retailEur: 3.29,
        tier: 'basic',
        imageUrl: '/folder/riz.jpg',
      },
      {
        id: 'pates',
        name: 'Pâtes semi-complètes bio 500g',
        wholesaleEur: 0.72,
        retailEur: 1.79,
        tier: 'basic',
        imageUrl: '/folder/pates.jpg',
      },
      {
        id: 'huile-olive',
        name: 'Huile d’olive bio 1L',
        wholesaleEur: 6.4,
        retailEur: 11.95,
        tier: 'premium',
        imageUrl: '/folder/huile-olive.jpg',
      },
      {
        id: 'langes',
        name: 'Langes bio taille 4 (x40)',
        wholesaleEur: 12.8,
        retailEur: 22.9,
        tier: 'premium',
        imageUrl: '/folder/langes.jpg',
      },
      {
        id: 'lessive',
        name: 'Lessive écologique 3L',
        wholesaleEur: 7.2,
        retailEur: 14.5,
        tier: 'premium',
        imageUrl: '/folder/lessive.jpg',
      },
    ];

    const items = seeds.map((item) => {
      const markupEur =
        item.tier === 'premium' ? MARKUP_PREMIUM_EUR : MARKUP_BASIC_EUR;
      return {
        id: item.id,
        name: item.name,
        imageUrl: item.imageUrl,
        wholesaleEur: item.wholesaleEur,
        retailEur: item.retailEur,
        tier: item.tier,
        markupEur,
        piPriceEur: Number((item.wholesaleEur + markupEur).toFixed(2)),
      };
    });

    return {
      disclaimer:
        '* Prix cibles estimés à titre indicatif, hors TVA et hors variations grossistes. Non contractuels. Marge fixe : 0,20 € (quotidien) ou 0,50 € (produits plus chers).',
      markupBasicEur: MARKUP_BASIC_EUR,
      markupPremiumEur: MARKUP_PREMIUM_EUR,
      items,
    };
  }
}
