/*
  Warnings:

  - You are about to drop the `MetodoPago` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pago` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Pago" DROP CONSTRAINT "Pago_metodoPagoId_fkey";

-- DropForeignKey
ALTER TABLE "Pago" DROP CONSTRAINT "Pago_ordenId_fkey";

-- DropTable
DROP TABLE "MetodoPago";

-- DropTable
DROP TABLE "Pago";
