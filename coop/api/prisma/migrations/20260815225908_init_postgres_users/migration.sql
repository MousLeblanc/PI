-- CreateEnum
CREATE TYPE "AgeBand" AS ENUM ('AGE_0_2', 'AGE_3_12', 'AGE_13_17', 'AGE_18_PLUS');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "email" VARCHAR(320) NOT NULL,
    "password_hash" TEXT NOT NULL,
    "household_size" INTEGER NOT NULL,
    "age_bands" "AgeBand"[],
    "postal_code" VARCHAR(8) NOT NULL,
    "street_name" VARCHAR(160) NOT NULL,
    "house_number" VARCHAR(32) NOT NULL,
    "opt_in_public_number" BOOLEAN NOT NULL DEFAULT false,
    "wallet_address" VARCHAR(128),
    "managed_by_user_id" UUID,
    "email_verified_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_postal_code_idx" ON "users"("postal_code");

-- CreateIndex
CREATE INDEX "users_street_name_postal_code_idx" ON "users"("street_name", "postal_code");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_managed_by_user_id_fkey" FOREIGN KEY ("managed_by_user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
