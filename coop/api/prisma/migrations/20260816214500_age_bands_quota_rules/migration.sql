-- Remap age bands to quota / volunteering rules (lossy for legacy 3–12 & 18+).
CREATE TYPE "AgeBand_new" AS ENUM ('AGE_0_4', 'AGE_5_17', 'AGE_18_64', 'AGE_65_PLUS');

ALTER TABLE "users" ALTER COLUMN "age_bands" TYPE "AgeBand_new"[] USING (
  COALESCE(
    ARRAY(
      SELECT CASE band::text
        WHEN 'AGE_0_2' THEN 'AGE_0_4'
        WHEN 'AGE_3_12' THEN 'AGE_5_17'
        WHEN 'AGE_13_17' THEN 'AGE_5_17'
        WHEN 'AGE_18_PLUS' THEN 'AGE_18_64'
        ELSE 'AGE_18_64'
      END::"AgeBand_new"
      FROM unnest("age_bands") AS band
    ),
    ARRAY[]::"AgeBand_new"[]
  )
);

DROP TYPE "AgeBand";
ALTER TYPE "AgeBand_new" RENAME TO "AgeBand";
