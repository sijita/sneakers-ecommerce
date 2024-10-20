import { NextResponse } from "next/server";
import prisma from "src/lib/prisma";
import { configureIntl } from "../../config/intlConfig";

export const dynamic = "force-dynamic";

export const GET = async (req) => {
  const t = await configureIntl();
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.search);
  const adminId = searchParams.get("adminId");

  if (!adminId) {
    return NextResponse.json({ error: t("API.orders.noAdmin") }, { status: 500 });
  }

  try {
    const orders = await prisma.orden.findMany({
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
        domicilio: {
          select: {
            ciudad: {
              select: {
                nombre: true,
                departamento: {
                  select: {
                    nombre: true,
                  },
                },
              },
            },
            direccion: true,
            detalles: true,
          },
        },
        usuario: {
          select: {
            nombre: true,
            apellido: true,
            email: true,
            telefono: true,
            cedula: true,
          },
        },
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: t("Error.text") }, { status: 500 });
  }
};
