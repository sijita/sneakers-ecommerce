-- DropForeignKey
ALTER TABLE "Carrito" DROP CONSTRAINT "Carrito_productoId_fkey";

-- AddForeignKey
ALTER TABLE "Carrito" ADD CONSTRAINT "Carrito_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Producto"("id") ON DELETE CASCADE ON UPDATE CASCADE;
