/*
  Warnings:

  - You are about to drop the column `touristicSpotId` on the `Address` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[addressId]` on the table `TouristicSpot` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `addressId` to the `TouristicSpot` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_touristicSpotId_fkey";

-- DropIndex
DROP INDEX "Address_touristicSpotId_key";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "touristicSpotId";

-- AlterTable
ALTER TABLE "TouristicSpot" ADD COLUMN     "addressId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "TouristicSpot_addressId_key" ON "TouristicSpot"("addressId");

-- AddForeignKey
ALTER TABLE "TouristicSpot" ADD CONSTRAINT "TouristicSpot_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
