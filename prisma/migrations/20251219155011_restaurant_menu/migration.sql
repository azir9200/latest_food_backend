/*
  Warnings:

  - You are about to drop the column `image` on the `restaurant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."post" ADD COLUMN     "restaurantName" TEXT,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."restaurant" DROP COLUMN "image",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "highlights" TEXT[],
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "openingHours" TEXT,
ADD COLUMN     "ownerId" TEXT,
ADD COLUMN     "specialties" TEXT[],
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD COLUMN     "website" TEXT,
ALTER COLUMN "isDeleted" DROP NOT NULL;

-- CreateTable
CREATE TABLE "public"."MenuItem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "image" TEXT,
    "category" TEXT,
    "restaurantId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MenuItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."restaurant" ADD CONSTRAINT "restaurant_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MenuItem" ADD CONSTRAINT "MenuItem_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "public"."restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
