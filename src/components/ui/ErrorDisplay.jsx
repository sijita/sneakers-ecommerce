"use client";
import { useTranslations } from "next-intl";

export default function ErrorDisplay() {
  const t = useTranslations("Error");
  return (
    <div className="h-screen flex items-center justify-center">
      <p className="text-center text-3xl font-bold">{t("text")}</p>
    </div>
  );
}
