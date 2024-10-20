import { NextResponse } from "next/server";
import prisma from "src/lib/prisma";
import { configureIntl } from "../../config/intlConfig";

export const GET = async (req) => {
  const t = await configureIntl();

  try {
    const featuredProducts = await prisma.producto.findMany({
      where: {
        estado: 1,
      },
      include: {
        calificacion: {
          select: {
            puntuacion: true,
          },
        },
        categoria: {
          select: {
            nombre: true,
          },
        },
      },
    });

    const highRatedProducts = featuredProducts.filter((product) => {
      const ratingsCount = product.calificacion.length;
      const ratingsSum = product.calificacion.reduce(
        (sum, rating) => sum + rating.puntuacion,
        0
      );
      const averageRating = ratingsCount > 0 ? ratingsSum / ratingsCount : 0;

      return averageRating >= 4;
    });

    const topProducts = highRatedProducts.slice(0, 6);

    return NextResponse.json({ topProducts });
  } catch (error) {
    return NextResponse.json({
      error: t("API.products.error"),
    });
  }
};
