"use client";
import RecoverPasswordForm from "@/components/recover/RecoverPasswordForm";
import { useTranslations } from "next-intl";

export default function Page({ params }) {
  const t = useTranslations("Recover");
  const { token } = params;

  return (
    <div className="xl:w-3/12 w-11/12 md:w-9/12 lg:w-7/12 flex flex-col gap-10">
      <RecoverPasswordForm
        token={token}
        passwordPlaceholder={t("password")}
        confirmPasswordPlaceholder={t("confirmPassword")}
        conditionsText={t("condition")}
        saveBtnText={t("saveBtnText")}
      />
    </div>
  );
}
