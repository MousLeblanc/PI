-- Remap age bands to quota / volunteering rules (lossy for legacy 3–12 & 18+).
-- Safer path: new column → copy → swap (avoids brittle ALTER ... TYPE on enum arrays).

DO $$ BEGIN
  CREATE TYPE "AgeBand_new" AS ENUM ('AGE_0_4', 'AGE_5_17', 'AGE_18_64', 'AGE_65_PLUS');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "age_bands_new" "AgeBand_new"[];

UPDATE "users" AS u
SET "age_bands_new" = sub.mapped
FROM (
  SELECT
    id,
    COALESCE(
      (
        SELECT array_agg(
          CASE b::text
            WHEN 'AGE_0_2' THEN 'AGE_0_4'::"AgeBand_new"
            WHEN 'AGE_3_12' THEN 'AGE_5_17'::"AgeBand_new"
            WHEN 'AGE_13_17' THEN 'AGE_5_17'::"AgeBand_new"
            WHEN 'AGE_18_PLUS' THEN 'AGE_18_64'::"AgeBand_new"
            WHEN 'AGE_0_4' THEN 'AGE_0_4'::"AgeBand_new"
            WHEN 'AGE_5_17' THEN 'AGE_5_17'::"AgeBand_new"
            WHEN 'AGE_18_64' THEN 'AGE_18_64'::"AgeBand_new"
            WHEN 'AGE_65_PLUS' THEN 'AGE_65_PLUS'::"AgeBand_new"
            ELSE 'AGE_18_64'::"AgeBand_new"
          END
          ORDER BY ordinality
        )
        FROM unnest(age_bands) WITH ORDINALITY AS t(b, ordinality)
      ),
      '{}'::"AgeBand_new"[]
    ) AS mapped
  FROM "users"
) AS sub
WHERE u.id = sub.id;

ALTER TABLE "users" DROP COLUMN IF EXISTS "age_bands";
ALTER TABLE "users" RENAME COLUMN "age_bands_new" TO "age_bands";

DROP TYPE IF EXISTS "AgeBand";
ALTER TYPE "AgeBand_new" RENAME TO "AgeBand";
