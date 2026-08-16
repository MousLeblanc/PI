import { Injectable } from '@nestjs/common';

const MARKUP_EUR = 0.2;

@Injectable()
export class CatalogService {
  getFolderPi() {
    // Prix grossiste = ordre de grandeur achat groupé / palette (BE, bio).
    // retailEur = prix rayon supermarché typique, pour comparaison visuelle.
    const items = [
      {
        id: 'lait',
        name: 'Lait entier bio 1L',
        wholesaleEur: 0.62,
        retailEur: 1.49,
      },
      {
        id: 'oeufs',
        name: 'Œufs bio plein air x6',
        wholesaleEur: 1.45,
        retailEur: 2.95,
      },
      {
        id: 'farine',
        name: 'Farine T65 bio 1kg',
        wholesaleEur: 0.78,
        retailEur: 1.89,
      },
      {
        id: 'pommes',
        name: 'Pommes bio Belgique 1kg',
        wholesaleEur: 1.15,
        retailEur: 2.79,
      },
      {
        id: 'riz',
        name: 'Riz complet bio 1kg',
        wholesaleEur: 1.55,
        retailEur: 3.29,
      },
      {
        id: 'pates',
        name: 'Pâtes semi-complètes bio 500g',
        wholesaleEur: 0.72,
        retailEur: 1.79,
      },
    ].map((item) => ({
      ...item,
      piPriceEur: Number((item.wholesaleEur + MARKUP_EUR).toFixed(2)),
      markupEur: MARKUP_EUR,
    }));

    return {
      disclaimer:
        '* Prix cibles estimés à titre indicatif, hors TVA et hors variations grossistes. Non contractuels. Basés sur des ordres de grandeur d’achats groupés.',
      markupEur: MARKUP_EUR,
      items,
    };
  }
}
