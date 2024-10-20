"use client";
import NavLinks from "../ui/NavLinks";
import { useTranslations } from "next-intl";

export default function Nav() {
  const t = useTranslations("Shop");

  const links = [
    {
      title: t("kidsCategory"),
      route: "/shop/kids",
    },
    {
      title: t("manCategory"),
      route: "/shop/man",
    },
    {
      title: t("womanCategory"),
      route: "/shop/woman",
    },
  ];

  return (
    <div className="container mx-auto flex flex-col gap-10 w-full items-center py-5 px-5 my-5">
      <div className="flex gap-8 flex-col items-center min-[360px]:flex-row">
        {links.map(({ title, route }, i) => (
          <NavLinks key={i} route={route} title={title} />
        ))}
      </div>
    </div>
  );
}
