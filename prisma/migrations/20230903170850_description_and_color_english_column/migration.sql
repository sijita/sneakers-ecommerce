/*
  Warnings:

  - Added the required column `descripcionEng` to the `Producto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `colorEng` to the `ProductoTallaColor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Producto" ADD COLUMN     "descripcionEng" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ProductoTallaColor" ADD COLUMN     "colorEng" TEXT NOT NULL;
