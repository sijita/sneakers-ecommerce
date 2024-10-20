import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import prisma from "src/lib/prisma";
import { configureIntl } from "../config/intlConfig";

export const GET = async (req) => {
  const t = await configureIntl();
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.search);
  const cursor = searchParams.get("cursor");
  const category = searchParams.get("category");
  const order = searchParams.get("order");
  const size = searchParams.get("size");
  const color = searchParams.get("color");
  const brand = searchParams.get("brand");
  const search = searchParams.get("search");
  const status = searchParams.get("status");

  const whereClausure = {
    estado: status != null ? undefined : 1,
    categoriaId: category != null ? parseInt(category) : undefined,
    marca: brand != null && brand.length > 0 ? brand : undefined,
    nombre: {
      search: search != null && search.length > 0 ? search : undefined,
    },
  };

  if (
    (size != null && size.length > 0) ||
    (color != null && color.length > 0)
  ) {
    whereClausure.productoTallaColor = {
      some: {
        color: color != null && color.length > 0 ? color : undefined,
        talla: size != null && size.length > 0 ? size : undefined,
      },
    };
  }

  try {
    const productsCount = await prisma.producto.count({
      where: whereClausure,
    });

    const product = await prisma.producto.findMany({
      include: {
        categoria: {
          select: {
            nombre: true,
          },
        },
        productoTallaColor: {
          select: {
            id: true,
            talla: true,
            color: true,
            stock: true,
          },
        },
      },
      where: whereClausure,
      take:
        whereClausure.categoriaId !== undefined ||
        whereClausure.marca !== undefined ||
        whereClausure.color !== undefined
          ? undefined
          : 12,
      skip:
        whereClausure.categoriaId !== undefined ||
        whereClausure.marca !== undefined ||
        whereClausure.color !== undefined
          ? 0
          : cursor != null
          ? (parseInt(cursor) - 1) * 12
          : 0,
      orderBy: {
        precio: order.length > 0 && order != null ? order : undefined,
      },
    });

    return NextResponse.json({ product, productsCount });
  } catch (error) {
    return NextResponse.json(
      { error: t("API.products.error") },
      { status: 500 }
    );
  }
};

export const POST = async (req) => {
  const t = await configureIntl();
  const data = await req.formData();

  const nombre = data.get("nombre");
  const precio = data.get("precio");
  const descripcion = data.get("descripcion");
  const descripcionEng = data.get("descripcionEng");
  const imagenes = Array.from(data.getAll("imagen"));
  const categoria = data.get("categoria");
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

    const imagePromises = imagenes.map(async (imagen) => {
      const bytes = await imagen.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const nombreArchivo = imagen.name;

      const cloudinaryResponse = await cloudinary.uploader.upload(
        `data:${imagen.type};base64,${buffer.toString("base64")}`,
        {
          public_id: nombreArchivo,
          folder: "productos",
        }
      );

      imageUrls.push(cloudinaryResponse.secure_url);
    });

    await Promise.all(imagePromises);

    await prisma.producto.create({
      data: {
        nombre,
        precio: parseInt(precio),
        descripcion,
        descripcionEng,
        imagen: imageUrls,
        categoriaId: parseInt(categoria),
        marca,
        productoTallaColor: {
          create: tallas.map(({ size, color, stock }) => ({
            talla: size,
            color: color.split(",")[0].trim(),
            colorEng: color.split(",")[1].trim(),
            stock: parseInt(stock),
          })),
        },
      },
    });

    return NextResponse.json(t("API.products.success"));
  } catch (error) {
    return NextResponse.json(
      { error: t("API.products.error") },
      { status: 500 }
    );
  }
};
