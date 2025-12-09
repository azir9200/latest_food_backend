-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "public"."post" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "public"."restaurant" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;
