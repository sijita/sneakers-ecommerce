/*
  Warnings:

  - You are about to drop the column `productoId` on the `DetallesOrden` table. All the data in the column will be lost.
  - You are about to drop the column `tallaId` on the `Producto` table. All the data in the column will be lost.
  - Added the required column `productoTallaId` to the `DetallesOrden` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DetallesOrden" DROP CONSTRAINT "DetallesOrden_productoId_fkey";

-- DropForeignKey
ALTER TABLE "Producto" DROP CONSTRAINT "Producto_tallaId_fkey";

-- AlterTable
ALTER TABLE "DetallesOrden" DROP COLUMN "productoId",
ADD COLUMN     "productoTallaId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Producto" DROP COLUMN "tallaId";

-- CreateTable
CREATE TABLE "ProductoTalla" (
    "id" SERIAL NOT NULL,
    "productoId" INTEGER NOT NULL,
    "tallaId" INTEGER NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaModificacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductoTalla_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DetallesOrden" ADD CONSTRAINT "DetallesOrden_productoTallaId_fkey" FOREIGN KEY ("productoTallaId") REFERENCES "ProductoTalla"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductoTalla" ADD CONSTRAINT "ProductoTalla_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductoTalla" ADD CONSTRAINT "ProductoTalla_tallaId_fkey" FOREIGN KEY ("tallaId") REFERENCES "Talla"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
