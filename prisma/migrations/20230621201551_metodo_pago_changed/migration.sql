/*
  Warnings:

  - You are about to drop the `metodoPago` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "metodoPago";

-- CreateTable
CREATE TABLE "MetodoPago" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "cuotas" INTEGER,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaModificacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MetodoPago_pkey" PRIMARY KEY ("id")
);
