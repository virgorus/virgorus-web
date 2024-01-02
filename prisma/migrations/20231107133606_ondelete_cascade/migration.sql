/*
  Warnings:

  - You are about to drop the column `packageId` on the `Itinerary` table. All the data in the column will be lost.
  - Added the required column `dayScheduleId` to the `Itinerary` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Itinerary" DROP CONSTRAINT "Itinerary_packageId_fkey";

-- DropForeignKey
ALTER TABLE "RatesAndInclusion" DROP CONSTRAINT "RatesAndInclusion_packageId_fkey";

-- AlterTable
ALTER TABLE "Itinerary" DROP COLUMN "packageId",
ADD COLUMN     "dayScheduleId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "DaySchedule" (
    "id" SERIAL NOT NULL,
    "day" TEXT,
    "packageId" INTEGER NOT NULL,

    CONSTRAINT "DaySchedule_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RatesAndInclusion" ADD CONSTRAINT "RatesAndInclusion_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Package"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Itinerary" ADD CONSTRAINT "Itinerary_dayScheduleId_fkey" FOREIGN KEY ("dayScheduleId") REFERENCES "DaySchedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DaySchedule" ADD CONSTRAINT "DaySchedule_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Package"("id") ON DELETE CASCADE ON UPDATE CASCADE;
