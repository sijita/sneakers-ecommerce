"use client";
import LoginForm from "@/components/login/LoginForm";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("Login");

  return (
    <section className="flex flex-col items-center justify-center h-screen gap-8 p-10">
      <h1 className="text-3xl md:text-4xl font-bold">{t("title")}</h1>
      <LoginForm
        emailPlaceholder={t("email")}
        passwordPlaceholder={t("password")}
        btnText={t("loginBtnText")}
        recoverText={t("recoverPassword")}
        signupText={t("signupBtnText")}
      />
    </section>
  );
}
