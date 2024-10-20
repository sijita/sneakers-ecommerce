"use client";
import { useState } from "react";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import Link from "next/link";
import NavLinks from "./ui/NavLinks";
import NavButtons from "./ui/NavButtons";
import { useTranslations } from "next-intl";

export default function Header() {
  const t = useTranslations("Header");
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const links = [
    {
      title: t("home"),
      route: "/",
    },
    {
      title: t("shop"),
      route: "/shop",
    },
    {
      title: t("contact"),
      route: "/contact",
    },
  ];

  return (
    <nav className="bg-primary px-4 py-7 sticky top-0 z-50 border-b border-neutral">
      <div
        className={`container flex flex-wrap items-center sm:justify-between justify-center mx-auto gap-8 ${
          isOpen ? "flex-col" : "flex-row"
        }`}
      >
        <div
          className={`${
            isOpen ? "flex order-2 w-full" : "hidden"
          } lg:flex grow`}
        >
          <ul
            className={`flex flex-col md:flex-row justify-center lg:justify-start items-center w-full animate-fade animate-once animate-ease-in-out ${
              isOpen ? "font-medium gap-5" : "gap-10"
            }`}
          >
            {links.map(({ title, route }) => (
              <li key={route}>
                <NavLinks
                  route={route}
                  title={title}
                  onClick={() => (isOpen ? toggle() : null)}
                />
              </li>
            ))}
          </ul>
        </div>
        <Link
          href="/"
          className="flex items-center justify-center text-3xl font-bold whitespace-nowrap"
        >
          eCommerce
        </Link>
        <div className="flex gap-5 lg:grow lg:justify-end items-center flex-col w-full min-[315px]:flex-row min-[315px]:w-auto">
          <NavButtons />
          <button
            className={`${
              isOpen && "hidden"
            } cursor-pointer leading-none lg:hidden animate-rotate-y animate-once animate-ease-in-out w-auto`}
            type="button"
            onClick={toggle}
          >
            <HiOutlineMenuAlt3 className="text-2xl"></HiOutlineMenuAlt3>
          </button>
          <button
            className={`${
              !isOpen && "hidden"
            } cursor-pointer leading-none lg:hidden animate-rotate-y animate-once animate-ease-in-out w-auto`}
            type="button"
            onClick={toggle}
          >
            <HiX className="text-2xl"></HiX>
          </button>
        </div>
      </div>
    </nav>
  );
}
