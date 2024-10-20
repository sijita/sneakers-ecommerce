"use client";
import ContactForm from "@/components/contact/ContactForm";
import Titles from "@/components/ui/Titles";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("Contact");

  return (
    <main className="container mx-auto sm:p-20 p-10 flex flex-col gap-20">
      <Titles title={t("title")} size="text-2xl" />
      <ContactForm
        subtitle={t("subtitle")}
        text={t("text")}
        fullnamePlaceholder={t("form.name")}
        emailPlaceholder={t("form.email")}
        messagePlaceholder={t("form.message")}
        btnText={t("form.sendBtnText")}
      />
    </main>
  );
}
