import prisma from "src/lib/prisma";
import { NextResponse } from "next/server";
import { configureIntl } from "../../config/intlConfig";

export const GET = async (req) => {
  const t = await configureIntl();

  try {
    const productsCount = await prisma.producto.count({
      where: {
        estado: 1,
      },
    });

    const products = await prisma.producto.findMany({
      include: {
        categoria: true,
        calificacion: {
          select: {
            puntuacion: true,
          },
        },
        productoTallaColor: {
          select: {
            talla: true,
            color: true,
            stock: true,
          },
        },
      },
    });

    return NextResponse.json({ products, productsCount });
  } catch (error) {
    return NextResponse.json(
      { error: t("API.products.error") },
      { status: 500 }
    );
  }
};
