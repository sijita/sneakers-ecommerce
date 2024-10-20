"use client";
import Categories from "@/components/home/Categories";
import Featured from "@/components/home/Featured";
import Hero from "@/components/home/Hero";
import { useTranslations } from "next-intl";

export default function Index() {
  const t = useTranslations("Home");
  return (
    <main>
      <Hero
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
        btnText={t("heroBtnText")}
      />
      <Categories
        firstCategory={t("firstCategory")}
        secondCategory={t("secondCategory")}
        thirdCategory={t("thirdCategory")}
        btnText={t("categoryBtnText")}
      />
      <Featured title={t("featuredTitle")} />
    </main>
  );
}
