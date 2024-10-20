import { NextResponse } from "next/server";
import prisma from "src/lib/prisma";
import { configureIntl } from "../config/intlConfig";

export const GET = async (req) => {
  const t = await configureIntl();
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.search);
  const userId = searchParams.get("user");

  try {
    const orders = await prisma.orden.findMany({
      where: {
        usuarioId: userId,
      },
      include: {
        detallesOrden: {
          include: {
            producto: {
              select: {
                nombre: true,
                precio: true,
                imagen: true,
                categoria: {
                  select: {
                    nombre: true,
                  },
                },
              },
            },
          },
        },
        domicilio: true,
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: t("Error.text") }, { status: 500 });
  }
};

export const POST = async (req) => {
  const t = await configureIntl();
  const data = await req.json();
  const userId = data.userId;
  let updateUser = null;

  try {
    const existingDomicilio = await prisma.domicilio.findFirst({
      where: {
        usuarioId: userId,
        ciudadId: parseInt(data.city),
        direccion: data.address,
      },
    });

    if (existingDomicilio) {
      updateUser = await prisma.usuario.update({
        where: {
          id: userId,
        },
        data: {
          cedula: data.cc,
          telefono: data.phone,
        },
        include: {
          domicilio: true,
        },
      });
    } else {
      updateUser = await prisma.usuario.update({
        where: {
          id: userId,
        },
        data: {
          cedula: data.cc,
          telefono: data.phone,
          domicilio: {
            create: {
              ciudadId: parseInt(data.city),
              direccion: data.address,
              detalles: data.details,
            },
          },
        },
        include: {
          domicilio: true,
        },
      });
    }

    const newOrder = await prisma.orden.create({
      data: {
        usuario: {
          connect: {
            id: userId,
          },
        },
        domicilio: {
          connect: {
            id: updateUser.domicilio[0].id,
          },
        },
        precioTotal: parseFloat(data.total),
      },
    });

    const shoppingCart = await prisma.carrito.findMany({
      where: {
        usuarioId: userId,
      },
    });

    for (const product of shoppingCart) {
      await prisma.detallesOrden.create({
        data: {
          usuario: {
            connect: {
              id: userId,
            },
          },
          producto: {
            connect: {
              id: product.productoId,
            },
          },
          orden: {
            connect: {
              id: newOrder.id,
            },
          },
          talla: product.talla,
          cantidad: product.cantidad,
          subtotal: product.subtotal,
          color: product.color,
        },
      });
    }

    await prisma.carrito.deleteMany({
      where: {
        usuarioId: userId,
      },
    });

    return NextResponse.json(newOrder);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: t("Error.text") }, { status: 500 });
  }
};
