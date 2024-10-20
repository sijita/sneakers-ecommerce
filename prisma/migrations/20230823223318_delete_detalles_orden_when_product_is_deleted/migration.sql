-- DropForeignKey
ALTER TABLE "DetallesOrden" DROP CONSTRAINT "DetallesOrden_productoId_fkey";

-- AddForeignKey
ALTER TABLE "DetallesOrden" ADD CONSTRAINT "DetallesOrden_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Producto"("id") ON DELETE CASCADE ON UPDATE CASCADE;
