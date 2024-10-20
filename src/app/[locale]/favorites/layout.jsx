"use client";
import Titles from "@/components/ui/Titles";
import { useTranslations } from "next-intl";

export default function Layout({ children }) {
  const t = useTranslations("Favorites");
  return (
    <section className="container mx-auto sm:p-20 p-10 flex flex-col gap-20">
      <Titles title={t("title")} size="text-2xl" />
      {children}
    </section>
  );
}
