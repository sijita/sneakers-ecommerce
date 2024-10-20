import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { configureIntl } from "../../config/intlConfig";

export const DELETE = async (req, { params }) => {
  const t = await configureIntl();
  const userId = params.id;

  if (!userId) {
    return NextResponse.json(
      { error: t("API.deleteAccount.error") },
      {
        status: 500,
      }
    );
  }

  try {
    await prisma.usuario.delete({
      where: {
        id: userId,
      },
    });

    return NextResponse.json(t("API.deleteAccount.success"));
  } catch (error) {
    return NextResponse.json(
      { error: t("API.deleteAccount.error") },
      {
        status: 500,
      }
    );
  }
};
