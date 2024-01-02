-- CreateTable
CREATE TABLE "Package" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "cancellation" TEXT NOT NULL,
    "availability" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "notice" TEXT NOT NULL,
    "expectations" TEXT[],
    "photos" TEXT[],

    CONSTRAINT "Package_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RatesAndInclusion" (
    "id" SERIAL NOT NULL,
    "numberOfPax" TEXT NOT NULL,
    "ratePerPax" TEXT NOT NULL,
    "inclusions" TEXT[],
    "exclusions" TEXT[],
    "packageId" INTEGER NOT NULL,

    CONSTRAINT "RatesAndInclusion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Itinerary" (
    "id" SERIAL NOT NULL,
    "time" TEXT NOT NULL,
    "activity" TEXT NOT NULL,
    "packageId" INTEGER NOT NULL,

    CONSTRAINT "Itinerary_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RatesAndInclusion" ADD CONSTRAINT "RatesAndInclusion_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Package"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Itinerary" ADD CONSTRAINT "Itinerary_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Package"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
