/*
  Warnings:

  - You are about to drop the column `detallesOrdenId` on the `Orden` table. All the data in the column will be lost.
  - Added the required column `ordenId` to the `DetallesOrden` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Orden" DROP CONSTRAINT "Orden_detallesOrdenId_fkey";

-- AlterTable
ALTER TABLE "DetallesOrden" ADD COLUMN     "ordenId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Orden" DROP COLUMN "detallesOrdenId";

-- AddForeignKey
ALTER TABLE "DetallesOrden" ADD CONSTRAINT "DetallesOrden_ordenId_fkey" FOREIGN KEY ("ordenId") REFERENCES "Orden"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
