/*
  Warnings:

  - The `color` column on the `Producto` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Producto" DROP COLUMN "color",
ADD COLUMN     "color" TEXT[];
