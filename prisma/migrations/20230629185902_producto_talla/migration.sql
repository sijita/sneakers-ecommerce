/*
  Warnings:

  - You are about to drop the column `productoTallaId` on the `DetallesOrden` table. All the data in the column will be lost.
  - You are about to drop the `ProductoTalla` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `productoId` to the `DetallesOrden` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tallaId` to the `Producto` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DetallesOrden" DROP CONSTRAINT "DetallesOrden_productoTallaId_fkey";

-- DropForeignKey
ALTER TABLE "ProductoTalla" DROP CONSTRAINT "ProductoTalla_productoId_fkey";

-- DropForeignKey
ALTER TABLE "ProductoTalla" DROP CONSTRAINT "ProductoTalla_tallaId_fkey";

-- AlterTable
ALTER TABLE "DetallesOrden" DROP COLUMN "productoTallaId",
ADD COLUMN     "productoId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Producto" ADD COLUMN     "tallaId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "ProductoTalla";

-- AddForeignKey
ALTER TABLE "DetallesOrden" ADD CONSTRAINT "DetallesOrden_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Producto" ADD CONSTRAINT "Producto_tallaId_fkey" FOREIGN KEY ("tallaId") REFERENCES "Talla"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
