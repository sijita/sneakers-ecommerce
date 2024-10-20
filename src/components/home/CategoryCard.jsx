import Image from "next/image";
import Link from "next/link";
import { HiOutlineChevronDoubleRight } from "react-icons/hi";

export default function CategoryCard({ src, alt, title, link, btnText }) {
  return (
    <div className="bg-primary border border-neutral rounded-md w-full flex flex-col justify-center items-center">
      <div className="relative overflow-hidden block h-60 w-full rounded rounded-b-none">
        <Link href={link}>
          <Image
            className="h-full w-full object-cover object-center transition duration-200 hover:scale-110"
            src={src}
            alt={alt}
            width={500}
            height={500}
          />
        </Link>
      </div>
      <div className="flex flex-col gap-5 p-8 items-center w-full">
        <h1 className="text-3xl font-bold">{title}</h1>
        <Link
          href={link}
          className="btn btn-outline border-neutral font-semibold py-2 px-5 items-center gap-3 w-full"
        >
          {btnText}
          <HiOutlineChevronDoubleRight />
        </Link>
      </div>
    </div>
  );
}
