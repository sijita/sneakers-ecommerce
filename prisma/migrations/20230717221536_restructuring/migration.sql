/*
  Warnings:

  - You are about to drop the column `ordenId` on the `DetallesOrden` table. All the data in the column will be lost.
  - You are about to drop the column `productoTallaId` on the `DetallesOrden` table. All the data in the column will be lost.
  - You are about to drop the column `departamentoId` on the `Domicilio` table. All the data in the column will be lost.
  - You are about to drop the column `paisId` on the `Domicilio` table. All the data in the column will be lost.
  - You are about to drop the column `cuotas` on the `MetodoPago` table. All the data in the column will be lost.
  - You are about to drop the column `envioEstado` on the `Orden` table. All the data in the column will be lost.
  - You are about to drop the column `numBanco` on the `Orden` table. All the data in the column will be lost.
  - You are about to drop the column `pagoEstado` on the `Orden` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cedula]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[telefono]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `productoId` to the `DetallesOrden` table without a default value. This is not possible if the table is not empty.
  - Added the required column `talla` to the `DetallesOrden` table without a default value. This is not possible if the table is not empty.
  - Made the column `detalles` on table `Domicilio` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `detallesOrdenId` to the `Orden` table without a default value. This is not possible if the table is not empty.
  - Added the required column `domicilioId` to the `Orden` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estadoEnvio` to the `Orden` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estadoPago` to the `Pago` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cedula` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefono` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DetallesOrden" DROP CONSTRAINT "DetallesOrden_ordenId_fkey";

-- DropForeignKey
ALTER TABLE "DetallesOrden" DROP CONSTRAINT "DetallesOrden_productoTallaId_fkey";

-- DropForeignKey
ALTER TABLE "Domicilio" DROP CONSTRAINT "Domicilio_departamentoId_fkey";

-- DropForeignKey
ALTER TABLE "Domicilio" DROP CONSTRAINT "Domicilio_paisId_fkey";

-- AlterTable
ALTER TABLE "DetallesOrden" DROP COLUMN "ordenId",
DROP COLUMN "productoTallaId",
ADD COLUMN     "productoId" INTEGER NOT NULL,
ADD COLUMN     "talla" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Domicilio" DROP COLUMN "departamentoId",
DROP COLUMN "paisId",
ALTER COLUMN "detalles" SET NOT NULL;

-- AlterTable
ALTER TABLE "MetodoPago" DROP COLUMN "cuotas";

-- AlterTable
ALTER TABLE "Orden" DROP COLUMN "envioEstado",
DROP COLUMN "numBanco",
DROP COLUMN "pagoEstado",
ADD COLUMN     "detallesOrdenId" INTEGER NOT NULL,
ADD COLUMN     "domicilioId" INTEGER NOT NULL,
ADD COLUMN     "estadoEnvio" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Pago" ADD COLUMN     "estadoPago" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "cedula" TEXT NOT NULL,
ADD COLUMN     "telefono" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_cedula_key" ON "Usuario"("cedula");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_telefono_key" ON "Usuario"("telefono");

-- AddForeignKey
ALTER TABLE "Orden" ADD CONSTRAINT "Orden_domicilioId_fkey" FOREIGN KEY ("domicilioId") REFERENCES "Domicilio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orden" ADD CONSTRAINT "Orden_detallesOrdenId_fkey" FOREIGN KEY ("detallesOrdenId") REFERENCES "DetallesOrden"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetallesOrden" ADD CONSTRAINT "DetallesOrden_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
