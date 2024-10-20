import { NextResponse } from "next/server";
import prisma from "src/lib/prisma";
import { configureIntl } from "../config/intlConfig";

export const POST = async (req) => {
  const t = await configureIntl();
  const data = await req.json();

  try {
    await prisma.favorito.create({
      data: {
        usuarioId: data.userId,
        productoId: parseInt(data.productId),
      },
    });

    return NextResponse.json(t("API.favorites.success"));
  } catch (error) {
    return NextResponse.json(
      { error: t("API.favorites.error") },
      { status: 500 }
    );
  }
};

export const GET = async (req) => {
  const t = await configureIntl();
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.search);
  const userId = searchParams.get("user");

  try {
    const favorites = await prisma.favorito.findMany({
      where: {
        usuarioId: userId,
        producto: {
          estado: 1,
        },
      },
      include: {
        producto: {
          include: {
            categoria: true,
          },
        },
      },
    });

    return NextResponse.json(favorites);
  } catch (error) {
    return NextResponse.json(
      { error: t("API.favorites.error") },
      { status: 500 }
    );
  }
};
