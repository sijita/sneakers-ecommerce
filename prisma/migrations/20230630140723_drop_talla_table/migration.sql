/*
  Warnings:

  - You are about to drop the column `tallaId` on the `ProductoTalla` table. All the data in the column will be lost.
  - You are about to drop the `Talla` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductoTalla" DROP CONSTRAINT "ProductoTalla_tallaId_fkey";

-- AlterTable
ALTER TABLE "ProductoTalla" DROP COLUMN "tallaId",
ADD COLUMN     "tallas" INTEGER[];

-- DropTable
DROP TABLE "Talla";
