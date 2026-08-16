import { PrismaClient, AgeBand } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

/** Demo neighbors on Avenue Émile de Béco (1050) for social-proof QA */
async function main() {
  const passwordHash = await bcrypt.hash('motdepasse1', 10);
  const demos = [
    {
      email: 'voisin.public.12@picoop.demo',
      houseNumber: '12',
      optInPublicNumber: true,
    },
    {
      email: 'voisin.public.18@picoop.demo',
      houseNumber: '18',
      optInPublicNumber: true,
    },
    {
      email: 'voisin.prive.24@picoop.demo',
      houseNumber: '24',
      optInPublicNumber: false,
    },
  ];

  for (const d of demos) {
    await prisma.user.upsert({
      where: { email: d.email },
      update: {
        postalCode: '1050',
        streetName: 'Avenue Émile de Béco',
        houseNumber: d.houseNumber,
        optInPublicNumber: d.optInPublicNumber,
      },
      create: {
        email: d.email,
        passwordHash,
        householdSize: 1,
        ageBands: [AgeBand.AGE_18_64],
        postalCode: '1050',
        streetName: 'Avenue Émile de Béco',
        houseNumber: d.houseNumber,
        optInPublicNumber: d.optInPublicNumber,
      },
    });
  }

  const proof = await prisma.user.findMany({
    where: {
      postalCode: '1050',
      optInPublicNumber: true,
    },
    select: { streetName: true, houseNumber: true, optInPublicNumber: true },
  });
  console.log('Seeded demo neighbors:', proof);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
