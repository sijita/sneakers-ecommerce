"use client";
import Image from "next/image";
import {
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiStar,
} from "react-icons/hi";
import ProductDetailsForm from "./ProductDetailsForm";
import useQuantitySize from "@/hooks/shop/useQuantitySize";
import { useEffect } from "react";
import BreadCrumb from "./BreadCrumb";
import ReviewDisclosure from "./ReviewDisclosure";
import ProductDetailsActions from "./ProductDetailsActions";
import Carousel from "nuka-carousel";

export default function ProductDetails({
  id,
  image,
  name,
  description,
  price,
  category,
  sizesStock,
  calificaciones,
  locale,
}) {
  const { quantity, size, setQuantity, setSize, setColor, color } =
    useQuantitySize();

  useEffect(() => {
    setQuantity(1);
    setSize("");
    setColor("");
  }, []);

  const averageRating = calificaciones?.reduce((acc, calificacion) => {
    return acc + calificacion.puntuacion / calificaciones?.length;
  }, 0);

  return (
    <div className="flex flex-col xl:flex-row gap-10 xl:gap-16">
      <div className="xl:sticky xl:top-40 flex-1 flex items-start justify-center rounded-md">
        <Carousel
          className="w-full rounded-md"
          defaultControlsConfig={{
            prevButtonClassName: "rounded rounded-l-none bg-black",
            nextButtonClassName: "rounded rounded-r-none bg-black",
            nextButtonText: <HiOutlineChevronRight className="text-2xl" />,
            prevButtonText: <HiOutlineChevronLeft className="text-2xl" />,
            pagingDotsContainerClassName: "flex gap-2",
          }}
          wrapAround
          autoplayInterval={5000}
          autoplay
        >
          {image?.map((img, i) => (
            <div key={i}>
              <Image
                className="object-cover object-center w-full h-[30rem] 
                rounded-md xl:sticky xl:top-40"
                src={img}
                alt={img}
                width={500}
                height={500}
              />
            </div>
          ))}
        </Carousel>
      </div>
      <div className="flex flex-col gap-8 flex-1">
        <BreadCrumb name={name} />
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-5">
            <div>
              <span className="text-sm uppercase text-base-200">
                {locale === "es"
                  ? category
                  : category === "Hombre"
                  ? "Man"
                  : category === "Mujer"
                  ? "Woman"
                  : "Kids"}
              </span>
              <h1 className="text-4xl font-extrabold">{name}</h1>
            </div>
            <div className="flex items-center gap-2">
              <span>{averageRating}</span>
              <span>
                <HiStar />
              </span>
            </div>
            <p className="text-lg">{description}</p>
          </div>
          <ProductDetailsForm
            sizes={sizesStock}
            price={price?.toLocaleString("es-CO")}
          />
          <ProductDetailsActions
            id={id}
            price={price}
            quantity={quantity}
            size={size}
            color={color}
            locale={locale}
          />
        </div>
        <ReviewDisclosure
          id={id}
          averageRating={averageRating}
          calificaciones={calificaciones}
          name={name}
        />
      </div>
    </div>
  );
}
