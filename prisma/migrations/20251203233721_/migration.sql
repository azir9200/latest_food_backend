-- AlterTable
ALTER TABLE "public"."post" ADD COLUMN     "restaurantId" TEXT;

-- CreateTable
CREATE TABLE "public"."restaurant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "menu" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "restaurant_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."post" ADD CONSTRAINT "post_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "public"."restaurant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
