/*
  Warnings:

  - You are about to drop the column `color` on the `Producto` table. All the data in the column will be lost.
  - You are about to drop the `ProductoTalla` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Talla` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductoTalla" DROP CONSTRAINT "ProductoTalla_productoId_fkey";

-- DropForeignKey
ALTER TABLE "ProductoTalla" DROP CONSTRAINT "ProductoTalla_tallaId_fkey";

-- AlterTable
ALTER TABLE "Producto" DROP COLUMN "color";

-- DropTable
DROP TABLE "ProductoTalla";

-- DropTable
DROP TABLE "Talla";

-- CreateTable
CREATE TABLE "ProductoTallaColor" (
    "id" SERIAL NOT NULL,
    "productoId" INTEGER NOT NULL,
    "talla" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaModificacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductoTallaColor_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductoTallaColor" ADD CONSTRAINT "ProductoTallaColor_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Producto"("id") ON DELETE CASCADE ON UPDATE CASCADE;
