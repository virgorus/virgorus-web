/*
  Warnings:

  - You are about to drop the column `exclusions` on the `RatesAndInclusion` table. All the data in the column will be lost.
  - You are about to drop the column `inclusions` on the `RatesAndInclusion` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Package" ADD COLUMN     "exclusions" TEXT[],
ADD COLUMN     "inclusions" TEXT[];

-- AlterTable
ALTER TABLE "RatesAndInclusion" DROP COLUMN "exclusions",
DROP COLUMN "inclusions";
