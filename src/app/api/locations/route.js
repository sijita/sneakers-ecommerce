import prisma from "src/lib/prisma";
import { NextResponse } from "next/server";
import { configureIntl } from "../config/intlConfig";

export const GET = async (req) => {
  const t = await configureIntl();
  try {
    const locations = await prisma.departamento.findMany({
      select: {
        id: true,
        nombre: true,
        ciudad: true,
      },
    });
    return NextResponse.json(locations);
  } catch (error) {
    return NextResponse.json(
      {
        error: t("Error.text"),
      },
      {
        status: 500,
      }
    );
  }
};
