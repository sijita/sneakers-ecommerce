-- DropForeignKey
ALTER TABLE "Favorito" DROP CONSTRAINT "Favorito_productoId_fkey";

-- AddForeignKey
ALTER TABLE "Favorito" ADD CONSTRAINT "Favorito_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Producto"("id") ON DELETE CASCADE ON UPDATE CASCADE;
