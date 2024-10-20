"use client";
import HeartButton from "../ui/HeartButton";
import Link from "next/link";
import Image from "next/image";
import useIdProduct from "@/hooks/useIdProduct";
import { useTranslations } from "next-intl";

export default function ProductCard({
  id,
  image,
  name,
  price,
  category,
  locale,
}) {
  const t = useTranslations("Shop");
  const { setId } = useIdProduct();
  const urlName = name.replace(/\s+/g, "-").toLowerCase();

  return (
    <div className="relative mx-none flex flex-col justify-center bg-primary rounded-md border border-neutral">
      <HeartButton id={id} />
      <Link
        onClick={() => setId(id)}
        className="w-full overflow-hidden block rounded-md rounded-b-none"
        href={`/shop/${urlName}`}
      >
        <Image
          className="w-full h-52 object-cover object-center rounded-md rounded-b-none transition duration-200 hover:scale-110"
          src={image}
          width={500}
          height={500}
          alt={name}
        />
        <div className="p-6 absolute flex flex-col left-0 right-0 top-0">
          <h1 className="text-lg text-center font-extrabold text-black pb-2 uppercase">
            {name}
          </h1>
          <small className="text-black text-xs text-center uppercase font-bold">
            {locale === "es"
              ? category
              : category === "Hombre"
              ? "Man"
              : category === "Mujer"
              ? "Woman"
              : "Kids"}
          </small>
        </div>
      </Link>
      <div className="flex flex-col sm:flex-row justify-between items-center p-6 rounded-md md:flex-col xl:flex-row gap-3">
        <div>
          <h1 className="text-xl font-extrabold text-inherit">$ {price}</h1>
        </div>
        <Link
          href={`/shop/${urlName}`}
          onClick={() => setId(id)}
          className="btn btn-outline border-neutral font-semibold flex items-center gap-3 w-full sm:w-auto md:w-full xl:w-auto"
        >
          {t("productBtnText")}
        </Link>
      </div>
    </div>
  );
}
