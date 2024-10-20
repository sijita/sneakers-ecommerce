import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "src/lib/prisma";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { transporter } from "../../config/mailer";
import { configureIntl } from "../../config/intlConfig";

export const POST = async (req) => {
  const cookieStore = cookies();
  const locale = cookieStore.get("NEXT_LOCALE");
  const t = await configureIntl();
  const data = await req.json();
  const emailRegex =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
  const onlyLettersRegex = /^[A-Za-záéíóúñÁÉÍÓÚ\s]+$/;

  if (!data.email || !data.password || !data.name || !data.lastname) {
    return NextResponse.json(
      {
        message: t("API.signup.requiredFields"),
      },
      {
        status: 400,
      }
    );
  }

  if (!onlyLettersRegex.test(data.name)) {
    return NextResponse.json(
      {
        message: t("API.signup.invalidName"),
      },
      {
        status: 400,
      }
    );
  }

  if (!onlyLettersRegex.test(data.lastname)) {
    return NextResponse.json(
      {
        message: t("API.signup.invalidLastname"),
      },
      {
        status: 400,
      }
    );
  }

  if (!emailRegex.test(data.email)) {
    return NextResponse.json(
      {
        message: t("API.signup.invalidEmail"),
      },
      {
        status: 400,
      }
    );
  }

  if (!passwordRegex.test(data.password)) {
    return NextResponse.json(
      {
        message: t("API.signup.invalidPassword"),
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

    if (existingUser) {
      return NextResponse.json(
        {
          error: t("API.signup.existingUser"),
        },
        {
          status: 409,
        }
      );
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const token = jwt.sign(
      {
        email: data.email,
        nombre: data.name,
        apellido: data.lastname,
        clave: hashedPassword,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    const link = `${process.env.NEXTAUTH_URL}/${locale.value}/login/${token}`;

    await transporter.sendMail({
      from: '"eCommerce - Verificar cuenta" <simonjt.s2001@gmail.com>',
      to: data.email,
      subject: "Verificar cuenta ✔",
      html: `<b>Por favor haga click en el siguiente link para verificar su cuenta:</b> <a href="${link}">${link}</a>`,
    });

    return NextResponse.json(t("API.signup.success"));
  } catch (error) {
    return NextResponse.json(
      {
        error: t("API.signup.error"),
      },
      {
        status: 500,
      }
    );
  }
};
