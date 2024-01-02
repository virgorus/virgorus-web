/*
  Warnings:

  - The primary key for the `Package` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "DaySchedule" DROP CONSTRAINT "DaySchedule_packageId_fkey";

-- DropForeignKey
ALTER TABLE "Rates" DROP CONSTRAINT "Rates_packageId_fkey";

-- AlterTable
ALTER TABLE "DaySchedule" ALTER COLUMN "packageId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Package" DROP CONSTRAINT "Package_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Package_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Package_id_seq";

-- AlterTable
ALTER TABLE "Rates" ALTER COLUMN "packageId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Rates" ADD CONSTRAINT "Rates_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Package"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DaySchedule" ADD CONSTRAINT "DaySchedule_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Package"("id") ON DELETE CASCADE ON UPDATE CASCADE;
