-- DropForeignKey
ALTER TABLE "Calificacion" DROP CONSTRAINT "Calificacion_productoId_fkey";

-- AddForeignKey
ALTER TABLE "Calificacion" ADD CONSTRAINT "Calificacion_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Producto"("id") ON DELETE CASCADE ON UPDATE CASCADE;
