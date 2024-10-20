-- DropForeignKey
ALTER TABLE "ProductoTalla" DROP CONSTRAINT "ProductoTalla_productoId_fkey";

-- AddForeignKey
ALTER TABLE "ProductoTalla" ADD CONSTRAINT "ProductoTalla_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Producto"("id") ON DELETE CASCADE ON UPDATE CASCADE;
