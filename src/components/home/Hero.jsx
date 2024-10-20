import Image from "next/image";
import Link from "next/link";
import { HiOutlineChevronDoubleRight } from "react-icons/hi";

export default function Hero({
  title,
  subtitle,
  btnText,
}) {
  return (
    <section className="container mx-auto p-10 md:p-20">
      <div className="flex flex-col lg:flex-row flex-wrap justify-between gap-10 items-center">
        <div className="flex flex-1 flex-col gap-5">
          <h1 className="xl:text-8xl sm:text-4xl md:text-5xl lg:text-6xl text-4xl text-center lg:text-left font-extrabold uppercase">
            {title}
          </h1>
          <p className="text-2xl text-center lg:text-left">
            {subtitle}
          </p>
          <div className="text-center lg:text-left">
            <Link
              href="/shop"
              className="btn btn-md btn-outline border-neutral text-lg w-full lg:w-auto justify-center flex items-center gap-5"
            >
              {btnText} <HiOutlineChevronDoubleRight />
            </Link>
          </div>
        </div>
        <div className="flex-1 flex justify-end order-first lg:order-last w-full">
          <Image
            className="w-full rounded-md h-60 sm:h-[30rem] lg:h-[25rem] xl:h-[28rem] object-cover object-top"
            src="/hero.webp"
            alt="Imagen de ejemplo"
            height={800}
            width={800}
          />
        </div>
      </div>
    </section>
  );
}
