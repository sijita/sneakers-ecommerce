/*
  Warnings:

  - A unique constraint covering the columns `[ordenId]` on the table `Pago` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Pago_ordenId_key" ON "Pago"("ordenId");
