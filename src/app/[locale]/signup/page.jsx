"use client";
import SignupForm from "@/components/signup/SignupForm";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("Signup");

  return (
    <section className="h-screen flex flex-col items-center justify-center gap-8 p-10">
      <h1 className="text-3xl md:text-4xl font-bold">{t("title")}</h1>
      <SignupForm
        emailPlaceholder={t("email")}
        namePlaceholder={t("name")}
        lastnamePlaceholder={t("lastname")}
        btnText={t("signupBtnText")}
        passwordPlaceholder={t("password")}
        passwordCondition={t("passwordCondition")}
        loginText={t("loginBtnText")}
        confirmPasswordPlaceholder={t("confirmPassword")}
      />
    </section>
  );
}
