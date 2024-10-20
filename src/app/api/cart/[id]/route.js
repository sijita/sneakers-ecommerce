import { NextResponse } from "next/server";
import prisma from "src/lib/prisma";
import { configureIntl } from "../../config/intlConfig";

export const PUT = async (req, { params }) => {
  const t = await configureIntl();
  const data = await req.json();
  const id = params.id;

  try {
    const availableStock = await prisma.carrito.findUnique({
      where: {
        id: parseInt(id),
      },
      select: {
        producto: {
          select: {
            productoTallaColor: {
              where: {
                talla: data.size,
                color: data.color,
              },
            },
          },
        },
      },
    });

    const stock = availableStock.producto.productoTallaColor.map(
      (item) => item.stock
    );

    if (stock < data.quantity) {
      return NextResponse.json(
        {
          error: t("API.cart.noStock", { stock: `${stock}` }),
        },
        { status: 400 }
      );
    }

    await prisma.carrito.update({
      where: {
        id: parseInt(id),
      },
      data: {
        cantidad: parseInt(data.quantity),
        subtotal: parseFloat(data.subtotal),
      },
    });

    return NextResponse.json(t("API.cart.updatedQuantity"));
  } catch (error) {
    return NextResponse.json(
      {
        error: t("API.cart.error"),
      },
      { status: 500 }
    );
  }
};

export const DELETE = async (req, { params }) => {
  const t = await configureIntl();
  const id = params.id;

  try {
    await prisma.carrito.delete({
      where: {
        id: parseInt(id),
      },
    });

    return NextResponse.json(t("API.cart.removedProduct"));
  } catch (error) {
    return NextResponse.json(
      {
        error: t("API.cart.error"),
      },
      { status: 500 }
    );
  }
};
