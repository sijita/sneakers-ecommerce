/*
  Warnings:

  - A unique constraint covering the columns `[talla]` on the table `Talla` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Talla_talla_key" ON "Talla"("talla");
