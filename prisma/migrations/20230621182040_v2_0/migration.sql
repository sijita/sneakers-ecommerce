/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Categoria` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Categoria` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `DetallesOrden` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `DetallesOrden` table. All the data in the column will be lost.
  - You are about to drop the column `calle` on the `Domicilio` table. All the data in the column will be lost.
  - You are about to drop the column `ciudad` on the `Domicilio` table. All the data in the column will be lost.
  - You are about to drop the column `codPostal` on the `Domicilio` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Domicilio` table. All the data in the column will be lost.
  - You are about to drop the column `departamento` on the `Domicilio` table. All the data in the column will be lost.
  - You are about to drop the column `pais` on the `Domicilio` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Domicilio` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Favorito` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Favorito` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Orden` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Orden` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Pago` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Pago` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Producto` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Producto` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Talla` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Talla` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the `Review` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `fechaModificacion` to the `Categoria` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estado` to the `DetallesOrden` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fechaModificacion` to the `DetallesOrden` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ciudadId` to the `Domicilio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departamentoId` to the `Domicilio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `direccion` to the `Domicilio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fechaModificacion` to the `Domicilio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paisId` to the `Domicilio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fechaModificacion` to the `Favorito` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estado` to the `Orden` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fechaModificacion` to the `Orden` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fechaModificacion` to the `Pago` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estado` to the `Producto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fechaModificacion` to the `Producto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fechaModificacion` to the `ProductoTalla` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fechaModificacion` to the `Talla` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estado` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fechaModificacion` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_productoId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_usuarioId_fkey";

-- AlterTable
ALTER TABLE "Categoria" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "descripcion" TEXT,
ADD COLUMN     "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fechaModificacion" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "DetallesOrden" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "estado" INTEGER NOT NULL,
ADD COLUMN     "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fechaModificacion" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Domicilio" DROP COLUMN "calle",
DROP COLUMN "ciudad",
DROP COLUMN "codPostal",
DROP COLUMN "createdAt",
DROP COLUMN "departamento",
DROP COLUMN "pais",
DROP COLUMN "updatedAt",
ADD COLUMN     "ciudadId" INTEGER NOT NULL,
ADD COLUMN     "departamentoId" INTEGER NOT NULL,
ADD COLUMN     "direccion" TEXT NOT NULL,
ADD COLUMN     "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fechaModificacion" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "paisId" INTEGER NOT NULL,
ALTER COLUMN "detalles" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Favorito" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fechaModificacion" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Orden" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "estado" INTEGER NOT NULL,
ADD COLUMN     "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fechaModificacion" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Pago" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fechaModificacion" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Producto" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "estado" INTEGER NOT NULL,
ADD COLUMN     "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fechaModificacion" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "ProductoTalla" ADD COLUMN     "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fechaModificacion" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Talla" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fechaModificacion" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "estado" INTEGER NOT NULL,
ADD COLUMN     "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fechaModificacion" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "Review";

-- CreateTable
CREATE TABLE "Calificacion" (
    "id" SERIAL NOT NULL,
    "productoId" INTEGER NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "comentario" TEXT NOT NULL,
    "puntuacion" INTEGER NOT NULL,
    "estado" INTEGER NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaModificacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Calificacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pais" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaModificacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pais_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Departamento" (
    "id" SERIAL NOT NULL,
    "paisId" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaModificacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Departamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ciudad" (
    "id" SERIAL NOT NULL,
    "departamentoId" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaModificacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ciudad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "metodoPago" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "cuotas" INTEGER,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaModificacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "metodoPago_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Calificacion" ADD CONSTRAINT "Calificacion_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Calificacion" ADD CONSTRAINT "Calificacion_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Departamento" ADD CONSTRAINT "Departamento_paisId_fkey" FOREIGN KEY ("paisId") REFERENCES "Pais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ciudad" ADD CONSTRAINT "Ciudad_departamentoId_fkey" FOREIGN KEY ("departamentoId") REFERENCES "Departamento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Domicilio" ADD CONSTRAINT "Domicilio_paisId_fkey" FOREIGN KEY ("paisId") REFERENCES "Pais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Domicilio" ADD CONSTRAINT "Domicilio_departamentoId_fkey" FOREIGN KEY ("departamentoId") REFERENCES "Departamento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Domicilio" ADD CONSTRAINT "Domicilio_ciudadId_fkey" FOREIGN KEY ("ciudadId") REFERENCES "Ciudad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
