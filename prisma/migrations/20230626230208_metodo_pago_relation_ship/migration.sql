/*
  Warnings:

  - You are about to drop the column `metodoPago` on the `Pago` table. All the data in the column will be lost.
  - Added the required column `metodoPagoId` to the `Pago` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pago" DROP COLUMN "metodoPago",
ADD COLUMN     "metodoPagoId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Pago" ADD CONSTRAINT "Pago_metodoPagoId_fkey" FOREIGN KEY ("metodoPagoId") REFERENCES "MetodoPago"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
