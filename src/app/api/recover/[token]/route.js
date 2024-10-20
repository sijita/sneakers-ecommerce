import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "src/lib/prisma";
import { configureIntl } from "../../config/intlConfig";

export const PUT = async (req, { params }) => {
  const t = await configureIntl();
  const token = params.token;
  const data = await req.json();
  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;

  if (!token) {
    return NextResponse.json(
      {
        error: t("API.recover.noToken"),
      },
      {
        status: 400,
      }
    );
  }

  if (!data.password || !data.confirmPassword) {
    return NextResponse.json(
      {
        error: t("API.recover.requiredFields"),
      },
      {
        status: 400,
      }
    );
  }

  if (!passwordRegex.test(data.password)) {
    return NextResponse.json(
      {
        error: t("API.recover.invalidPassword"),
      },
      {
        status: 400,
      }
    );
  }

  if (data.password !== data.confirmPassword) {
    return NextResponse.json(
      {
        error: t("API.recover.invalidMatchPassword"),
      },
      {
        status: 400,
      }
    );
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  try {
    const validToken = jwt.verify(token, process.env.JWT_SECRET);
    const { id } = validToken;

    await prisma.usuario.update({
      where: {
        id,
      },
      data: {
        clave: hashedPassword,
      },
    });

    return NextResponse.json(t("API.recover.passwordSuccess"));
  } catch (error) {
    return NextResponse.json(
      { error: t("API.recover.expiredToken") },
      { status: 500 }
    );
  }
};
