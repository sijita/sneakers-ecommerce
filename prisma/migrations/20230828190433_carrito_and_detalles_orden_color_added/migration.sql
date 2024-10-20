/*
  Warnings:

  - Added the required column `color` to the `Carrito` table without a default value. This is not possible if the table is not empty.
  - Added the required column `color` to the `DetallesOrden` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Carrito" ADD COLUMN     "color" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "DetallesOrden" ADD COLUMN     "color" TEXT NOT NULL;
