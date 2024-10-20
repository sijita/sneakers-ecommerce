import prisma from "src/lib/prisma";
import { NextResponse } from "next/server";
import { configureIntl } from "../../config/intlConfig";

export const DELETE = async (req, { params }) => {
  const t = await configureIntl();
  const id = params.id;

  try {
    const deletedFavorite = await prisma.favorito.delete({
      where: {
        id: parseInt(id),
      },
    });

    return NextResponse.json(t("API.favorites.removedProduct"));
  } catch (error) {
    return NextResponse.json(
      { error: t("API.favorites.error") },
      { status: 500 }
    );
  }
};
