/*
  Warnings:

  - The `imagen` column on the `Producto` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `ImagenProducto` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ImagenProducto" DROP CONSTRAINT "ImagenProducto_productoId_fkey";

-- AlterTable
ALTER TABLE "Producto" DROP COLUMN "imagen",
ADD COLUMN     "imagen" TEXT[];

-- DropTable
DROP TABLE "ImagenProducto";
