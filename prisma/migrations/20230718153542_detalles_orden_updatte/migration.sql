/*
  Warnings:

  - Added the required column `usuarioId` to the `DetallesOrden` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DetallesOrden" ADD COLUMN     "usuarioId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "DetallesOrden" ADD CONSTRAINT "DetallesOrden_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
