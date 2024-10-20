"use client";
import RecoverMailForm from "@/components/recover/RecoverMailForm";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("Recover");
  return (
    <div className="xl:w-3/12 w-11/12 md:w-9/12 lg:w-7/12 flex flex-col gap-10">
      <div className="flex flex-col gap-8">
        <RecoverMailForm
          emailPlaceholder={t("email")}
          saveBtnText={t("saveBtnText")}
        />
        <div className="flex flex-col gap-2">
          <p className="text-center">{t("adviseText")}</p>
        </div>
      </div>
    </div>
  );
}
