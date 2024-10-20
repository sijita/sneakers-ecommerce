/*
  Warnings:

  - You are about to drop the column `stock` on the `Producto` table. All the data in the column will be lost.
  - You are about to drop the column `tallas` on the `ProductoTalla` table. All the data in the column will be lost.
  - Added the required column `tallaId` to the `ProductoTalla` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Producto" DROP COLUMN "stock";

-- AlterTable
ALTER TABLE "ProductoTalla" DROP COLUMN "tallas",
ADD COLUMN     "tallaId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Talla" (
    "id" SERIAL NOT NULL,
    "talla" INTEGER NOT NULL,
    "stock" INTEGER NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaModificacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Talla_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductoTalla" ADD CONSTRAINT "ProductoTalla_tallaId_fkey" FOREIGN KEY ("tallaId") REFERENCES "Talla"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
