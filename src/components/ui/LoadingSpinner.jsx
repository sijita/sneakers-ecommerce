"use client";
import { useTranslations } from "next-intl";

export default function LoadingSpinner() {
  const t = useTranslations("Loading");
  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-center text-3xl font-bold flex gap-1 animate-pulse">
        {t("text")}
        <span className="loading loading-dots loading-sm self-end"></span>
      </p>
    </div>
  );
}
