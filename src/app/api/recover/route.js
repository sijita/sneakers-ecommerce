import { NextResponse } from "next/server";
import prisma from "src/lib/prisma";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { transporter } from "../config/mailer";
import { configureIntl } from "../config/intlConfig";

export const POST = async (req) => {
  const cookieStore = cookies();
  const locale = cookieStore.get("NEXT_LOCALE");
  const t = await configureIntl();
  const data = await req.json();
  const emailRegex =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

  if (!data.email) {
    return NextResponse.json(
      {
        error: t("API.recover.noEmail"),
      },
      {
        status: 400,
      }
    );
  }

  if (!emailRegex.test(data.email)) {
    return NextResponse.json(
      {
        error: t("API.recover.invalidEmail"),
      },
      {
        status: 400,
      }
    );
  }

  try {
    const existingUser = await prisma.usuario.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!existingUser) {
      return NextResponse.json(
        {
          error: t("API.recover.noExistingUser"),
        },
        {
          status: 404,
        }
      );
    }

    const token = jwt.sign(
      {
        id: existingUser.id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "10m",
      }
    );

    const link = `${process.env.NEXTAUTH_URL}/${locale.value}/recover/${token}`;

    await transporter.sendMail({
      from: '"eCommerce - Recuperar contraseña 👻" <simonjt.s2001@gmail.com>',
      to: existingUser.email,
      subject: "Recuperar contraseña ✔",
      html: `<b>Por favor haga click en el siguiente link para recuperar su contraseña:</b> <a href="${link}">${link}</a>`,
    });

    return NextResponse.json(t("API.recover.success"));
  } catch (error) {
    return NextResponse.json(
      { error: t("API.recover.error") },
      { status: 500 }
    );
  }
};
