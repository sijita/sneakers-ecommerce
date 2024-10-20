/*
  Warnings:

  - You are about to drop the column `stock` on the `Talla` table. All the data in the column will be lost.
  - Added the required column `stock` to the `ProductoTalla` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductoTalla" ADD COLUMN     "stock" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Talla" DROP COLUMN "stock";
