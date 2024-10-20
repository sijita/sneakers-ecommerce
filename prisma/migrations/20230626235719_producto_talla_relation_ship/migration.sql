/*
  Warnings:

  - You are about to drop the column `productoId` on the `DetallesOrden` table. All the data in the column will be lost.
  - Added the required column `productoTallaId` to the `DetallesOrden` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DetallesOrden" DROP CONSTRAINT "DetallesOrden_productoId_fkey";

-- AlterTable
ALTER TABLE "DetallesOrden" DROP COLUMN "productoId",
ADD COLUMN     "productoTallaId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "DetallesOrden" ADD CONSTRAINT "DetallesOrden_productoTallaId_fkey" FOREIGN KEY ("productoTallaId") REFERENCES "ProductoTalla"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
