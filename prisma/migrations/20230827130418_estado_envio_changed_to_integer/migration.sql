/*
  Warnings:

  - The `estadoEnvio` column on the `Orden` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Orden" DROP COLUMN "estadoEnvio",
ADD COLUMN     "estadoEnvio" INTEGER NOT NULL DEFAULT 0;
