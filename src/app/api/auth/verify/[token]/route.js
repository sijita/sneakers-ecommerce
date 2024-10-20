import { NextResponse } from "next/server";
import prisma from "src/lib/prisma";
import jwt from "jsonwebtoken";
import { configureIntl } from "../../../config/intlConfig";

export const POST = async (req, { params }) => {
  const t = await configureIntl();
  const token = params.token;

  if (!token) {
    return NextResponse.json(
      {
        error: t("API.verify.noToken"),
      },
      {
        status: 400,
      }
    );
  }

  try {
    const validToken = jwt.verify(token, process.env.JWT_SECRET);

    const newUser = await prisma.usuario.create({
      data: {
        email: validToken.email,
        clave: validToken.clave,
        nombre: validToken.nombre,
        apellido: validToken.apellido,
      },
    });

    return NextResponse.json(t("API.verify.success"));
  } catch (error) {
    return NextResponse.json(
      {
        error: t("API.verify.invalidToken"),
      },
      {
        status: 400,
      }
    );
  }
};
