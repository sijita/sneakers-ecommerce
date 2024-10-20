import prisma from "src/lib/prisma";
import { NextResponse } from "next/server";
import { configureIntl } from "../config/intlConfig";

export const POST = async (req) => {
  const t = await configureIntl();
  const data = await req.json();

  try {
    const userBoughtProduct = await prisma.orden.findFirst({
      where: {
        usuarioId: data.usuarioId,
        AND: {
          estadoEnvio: 3,
        },
      },
    });

    if (!userBoughtProduct) {
      return NextResponse.json(
        { error: t("API.review.noBought") },
        { status: 400 }
      );
    }

    const review = await prisma.calificacion.create({
      data: {
        productoId: parseInt(data.productoId),
        usuarioId: data.usuarioId,
        puntuacion: parseInt(data.puntuacion),
        comentario: data.comentario,
      },
    });

    return NextResponse.json(t("API.review.success"));
  } catch (error) {
    return NextResponse.json({ error: t("API.review.error") }, { status: 500 });
  }
};
