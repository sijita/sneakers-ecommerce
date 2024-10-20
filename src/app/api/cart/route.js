import prisma from "src/lib/prisma";
import { NextResponse } from "next/server";
import { configureIntl } from "../config/intlConfig";

export const POST = async (req) => {
  const t = await configureIntl();
  const data = await req.json();

  const whereAvailableStock = {
    productoId: parseInt(data.productId),
    talla: data.size,
  };

  if (data.locale === "en") {
    whereAvailableStock.colorEng = data.color;
  } else {
    whereAvailableStock.color = data.color;
  }

  try {
    const availableStock = await prisma.productoTallaColor.findFirst({
      where: whereAvailableStock,
    });

    const stock = availableStock.stock;

    if (stock < data.quantity) {
      return NextResponse.json(
        {
          error: t("API.cart.noStock", { stock: stock }),
        },
        { status: 400 }
      );
    }

    const existingProductInCart = await prisma.carrito.findFirst({
      where: {
        usuarioId: data.userId,
        productoId: parseInt(data.productId),
        talla: data.size,
        color: data.color,
      },
    });

    if (existingProductInCart) {
      if (stock < existingProductInCart.cantidad + parseInt(data.quantity)) {
        return NextResponse.json(
          {
            error: t("API.cart.noStock", { stock: stock }),
          },
          { status: 400 }
        );
      }

      await prisma.carrito.update({
        where: {
          id: existingProductInCart.id,
        },
        data: {
          cantidad: existingProductInCart.cantidad + parseInt(data.quantity),
          subtotal: existingProductInCart.subtotal + parseFloat(data.subtotal),
        },
      });
    } else {
      await prisma.carrito.create({
        data: {
          usuarioId: data.userId,
          productoId: parseInt(data.productId),
          talla: data.size,
          color: data.color,
          cantidad: parseInt(data.quantity),
          subtotal: parseFloat(data.subtotal),
        },
      });
    }

    return NextResponse.json(t("API.cart.success"));
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: t("API.cart.error"),
      },
      { status: 500 }
    );
  }
};

export const GET = async (req) => {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.search);
  const userId = searchParams.get("user");

  try {
    const cart = await prisma.carrito.findMany({
      where: {
        usuarioId: userId,
      },
      include: {
        producto: {
          include: {
            categoria: {
              select: {
                nombre: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(cart);
  } catch (error) {
    return NextResponse.json(
      { error: "Error. Por favor, intenta mas tarde" },
      { status: 500 }
    );
  }
};
