-- CreateTable
CREATE TABLE "Booking" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contactNumber" TEXT NOT NULL,
    "numLocalGuests" INTEGER NOT NULL,
    "numForeignGuests" INTEGER NOT NULL,
    "tourDate" TIMESTAMP(3) NOT NULL,
    "pickupInfo" TEXT NOT NULL,
    "packageId" TEXT NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Package"("id") ON DELETE CASCADE ON UPDATE CASCADE;
