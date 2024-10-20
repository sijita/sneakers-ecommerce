import Rating from "../ui/Rating";
import HeartButton from "../ui/HeartButton";
import Image from "next/image";
import Link from "next/link";
import useIdProduct from "@/hooks/useIdProduct";
import { useTranslations } from "next-intl";

export default function ProductCard({
  id,
  name,
  price,
  rating,
  image,
  category,
}) {
  const t = useTranslations("Shop");
  const { setId } = useIdProduct();
  const urlName = name.replace(/\s+/g, "-").toLowerCase();

  return (
    <div className="relative mx-none flex flex-col justify-center bg-primary rounded-md border border-neutral">
      <HeartButton id={id} />
      <Link
        className="overflow-hidden block rounded-md rounded-b-none"
        onClick={() => setId(id)}
        href={`/shop/${urlName}`}
      >
        <Image
          className="h-80 w-full object-cover object-center rounded-md rounded-b-none transition duration-200 hover:scale-110"
          alt={name}
          src={image}
          width={500}
          height={500}
        />
      </Link>
      <div className="p-6 absolute flex flex-col left-0 right-0 top-0">
        <small className="text-xs text-center uppercase">{category}</small>
        <h1 className="text-2xl text-center font-extrabold text-black pb-2 uppercase">
          {name}
        </h1>
        <div className="flex justify-center items-center">
          <Rating rating={rating} />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center p-6 rounded-md md:flex-col xl:flex-row gap-3">
        <div>
          <h1 className="text-3xl font-extrabold">
            $ {price.toLocaleString("es-CO")}
          </h1>
        </div>
        <div className="w-full sm:w-auto md:w-full xl:w-auto">
          <Link
            href={`/shop/${urlName}`}
            onClick={() => setId(id)}
            className="btn btn-outline border-neutral font-semibold flex items-center gap-3 w-full sm:w-auto md:w-full xl:w-auto"
          >
            {t("productBtnText")}
          </Link>
        </div>
      </div>
    </div>
  );
}
