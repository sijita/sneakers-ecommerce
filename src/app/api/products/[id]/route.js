import { NextResponse } from "next/server";
import prisma from "src/lib/prisma";
import { v2 as cloudinary } from "cloudinary";
import { configureIntl } from "../../config/intlConfig";

export const DELETE = async (req, { params }) => {
  const t = await configureIntl();
  const id = params.id;
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.search);
  const adminId = searchParams.get("adminId");

  try {
    if (!adminId) {
      return NextResponse.json(
        { error: t("API.products.noAdmin") },
        { status: 401 }
      );
    } else {
      const admin = await prisma.usuario.findUnique({
        where: {
          id: adminId,
        },
      });

      if (!admin || admin.rol !== "ADMIN") {
        return NextResponse.json(
          { error: t("API.products.noAdmin") },
          { status: 401 }
        );
      }
    }

    await prisma.producto.update({
      where: {
        id: parseInt(id),
      },
      data: {
        estado: 0,
      },
    });

    return NextResponse.json(t("API.products.deletedProduct"));
  } catch (error) {
    return NextResponse.json(
      {
        error: t("API.products.error"),
      },
      {
        status: 500,
      }
    );
  }
};

export const GET = async (req, { params }) => {
  const t = await configureIntl();
  const id = params.id;

  try {
    const product = await prisma.producto.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        categoria: true,
        productoTallaColor: {
          select: {
            id: true,
            talla: true,
            color: true,
            colorEng: true,
            stock: true,
          },
        },
        calificacion: {
          select: {
            puntuacion: true,
            comentario: true,
            usuario: {
              select: {
                id: true,
                nombre: true,
                apellido: true,
              },
            },
            fechaCreacion: true,
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      {
        error: t("API.products.error"),
      },
      {
        status: 500,
      }
    );
  }
};

export const PUT = async (req, { params }) => {
  const t = await configureIntl();
  const id = params.id;
  const data = await req.formData();

  const nombre = data.get("nombre");
  const estado = data.get("estado");
  const precio = data.get("precio");
  const descripcion = data.get("descripcion");
  const descripcionEng = data.get("descripcionEng");
  const imagenes = Array.from(data.getAll("imagenes"));
  const imagenesExistentes = JSON.parse(data.get("imagenesExistentes"));
  const categoriaId = data.get("categoriaId");
  const marca = data.get("marca");
  const tallas = JSON.parse(data.get("tallas"));
  const adminId = data.get("adminId");

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  try {
    if (!adminId) {
      return NextResponse.json(
        { error: t("API.products.noAdmin") },
        { status: 401 }
      );
    } else {
      const admin = await prisma.usuario.findUnique({
        where: {
          id: adminId,
        },
      });

      if (!admin || admin.rol !== "ADMIN") {
        return NextResponse.json(
          { error: t("API.products.noAdmin") },
          { status: 401 }
        );
      }
    }

    const imageUrls = [];

    if (imagenes.length) {
      for (const imagen of imagenes) {
        const bytes = await imagen.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const nombreArchivo = imagen.name;

        const { secure_url } = await cloudinary.uploader.upload(
          `data:${imagen.type};base64,${buffer.toString("base64")}`,
          {
            public_id: nombreArchivo,
            folder: "productos",
          }
        );

        imageUrls.push(secure_url);
      }
    }

    const existingProductoTallas = await prisma.productoTallaColor.findMany({
      where: {
        productoId: parseInt(id),
      },
    });

    const incomingTallaIds = tallas.map(({ id }) => parseInt(id));
    const tallasToDelete = existingProductoTallas.filter(
      ({ id }) => !incomingTallaIds.includes(id)
    );

    const editedProduct = await prisma.producto.update({
      where: {
        id: parseInt(id),
      },
      data: {
        estado: parseInt(estado),
        nombre: nombre,
        marca: marca,
        descripcion,
        descripcionEng,
        precio: parseFloat(precio),
        categoriaId: parseInt(categoriaId),
        imagen: [...imagenesExistentes, ...imageUrls],
        productoTallaColor: {
          deleteMany: {
            id: {
              in: tallasToDelete.map(({ id }) => id),
            },
          },
        },
      },
      include: {
        productoTallaColor: {
          select: {
            id: true,
          },
        },
      },
    });

    for (const { id, size, stock, color } of tallas) {
      if (id) {
        await prisma.productoTallaColor.update({
          where: {
            id: id,
          },
          data: {
            talla: size,
            color: color.split(",")[0].trim(),
            colorEng: color.split(",")[1].trim(),
            stock: parseInt(stock),
          },
        });
      } else {
        await prisma.productoTallaColor.create({
          data: {
            talla: size,
            color: color.split(",")[0].trim(),
            colorEng: color.split(",")[1].trim(),
            stock: parseInt(stock),
            producto: {
              connect: {
                id: parseInt(editedProduct.id),
              },
            },
          },
        });
      }
    }

    await prisma.carrito.deleteMany({
      where: {
        productoId: parseInt(id),
      },
    });

    return NextResponse.json(t("API.products.updatedProduct"));
  } catch (error) {
    return NextResponse.json(
      {
        error: t("API.products.error"),
      },
      {
        status: 500,
      }
    );
  }
};
