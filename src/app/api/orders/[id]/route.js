import { NextResponse } from "next/server";
import prisma from "src/lib/prisma";
import { configureIntl } from "../../config/intlConfig";

export const PUT = async (req, { params }) => {
  const t = await configureIntl();
  const data = await req.json();
  const id = params.id;

  try {
    if (!data.adminId) {
      return NextResponse.json(
        { error: t("API.orders.noAdmin") },
        { status: 500 }
      );
    } else {
      const admin = await prisma.usuario.findUnique({
        where: {
          id: data.adminId,
        },
      });

      if (!admin || admin.rol !== "ADMIN") {
        return NextResponse.json(
          { error: t("API.orders.noAdmin") },
          { status: 401 }
        );
      }
    }

    const order = await prisma.orden.update({
      where: {
        id: parseInt(id),
      },
      data: {
        estadoEnvio: parseInt(data.estadoEnvio),
        rastreoId: data.rastreoId,
      },
      include: {
        detallesOrden: {
          include: {
            producto: true,
          },
        },
      },
    });

    if (parseInt(data.estadoEnvio) === 3) {
      for (const {
        productoId,
        cantidad,
        talla,
        color,
      } of order.detallesOrden) {
        const productSizeStock = await prisma.productoTallaColor.findFirst({
          where: {
            productoId: productoId,
            talla: talla,
            color: color,
          },
        });

        if (productSizeStock) {
          const updatedStock = productSizeStock.stock - cantidad;
          if (updatedStock >= 0) {
            const updatedProductStock = await prisma.productoTallaColor.update({
              where: {
                id: productSizeStock.id,
              },
              data: {
                stock: updatedStock,
              },
            });

            if (updatedProductStock.stock === 0) {
              await prisma.productoTallaColor.delete({
                where: {
                  id: updatedProductStock.id,
                },
              });
            }
          }
        }

        const allProductStock = await prisma.productoTallaColor.findMany({
          where: {
            productoId: productoId,
          },
        });

        if (!allProductStock.length) {
          await prisma.producto.update({
            where: {
              id: productoId,
            },
            data: {
              estado: 0,
            },
          });
        }
      }
    }

    return NextResponse.json(t("API.orders.success"));
  } catch (error) {
    return NextResponse.json({ error: t("API.orders.error") }, { status: 500 });
  }
};
