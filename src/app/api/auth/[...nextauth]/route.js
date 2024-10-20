import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "src/lib/prisma";
import bcrypt from "bcrypt";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email@gmail.com",
        },
        password: { label: "Password", type: "password", placeholder: "****" },
      },
      async authorize(credentials) {
        const userFound = await prisma.usuario.findUnique({
          where: {
            email: credentials.email,
          },
          include: {
            domicilio: {
              select: {
                id: true,
                detalles: true,
                direccion: true,
                ciudad: {
                  select: {
                    id: true,
                    nombre: true,
                    departamento: {
                      select: {
                        nombre: true,
                      },
                    },
                  },
                },
              },
            },
          },
        });

        if (!userFound) throw new Error("Credenciales invalidas");

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          userFound.clave
        );

        if (!passwordMatch) throw new Error("Credenciales invalidas");

        return userFound;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) token.user = user;
      if (trigger === "update") {
        let hashedPassword = undefined;

        if (session.data.clave && session.data.clave !== "") {
          hashedPassword = await bcrypt.hash(session.data.clave, 10);
        }

        let domicilio = {};

        if (session.data.domicilioId) {
          domicilio.update = {
            where: {
              id: session.data.domicilioId,
            },
            data: {
              ciudad: {
                connect: {
                  id: parseInt(session.data.ciudadId),
                },
              },
              direccion: session.data.direccion,
              detalles: session.data.detalles,
            },
          };
        }

        const user = await prisma.usuario.update({
          where: {
            id: session.data.id,
          },
          data: {
            email: session.data.email,
            clave: hashedPassword,
            telefono: session.data.telefono,
            domicilio,
          },
          include: {
            domicilio: {
              select: {
                id: true,
                detalles: true,
                direccion: true,
                ciudad: {
                  select: {
                    id: true,
                    nombre: true,
                    departamento: {
                      select: {
                        nombre: true,
                      },
                    },
                  },
                },
              },
            },
          },
        });

        token.user = user;
      }

      return token;
    },
    session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
