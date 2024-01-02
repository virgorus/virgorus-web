/*
  Warnings:

  - You are about to drop the `RatesAndInclusion` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RatesAndInclusion" DROP CONSTRAINT "RatesAndInclusion_packageId_fkey";

-- DropTable
DROP TABLE "RatesAndInclusion";

-- CreateTable
CREATE TABLE "Rates" (
    "id" SERIAL NOT NULL,
    "numberOfPax" TEXT NOT NULL,
    "ratePerPax" TEXT NOT NULL,
    "packageId" INTEGER NOT NULL,

    CONSTRAINT "Rates_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Rates" ADD CONSTRAINT "Rates_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Package"("id") ON DELETE CASCADE ON UPDATE CASCADE;
