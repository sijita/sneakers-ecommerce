"use client";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useSession } from "next-auth/react";
import ActiveSession from "@/components/ui/ActiveSession";
import { useTranslations } from "next-intl";

export default function Layout({ children }) {
  const t = useTranslations("ActiveSession");
  const r = useTranslations("Recover");
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  if (session) {
    return <ActiveSession title={t("text", { user: session?.user.email })} />;
  }

  return (
    <section className="flex flex-col items-center justify-center h-screen gap-8 p-10">
      <h1 className="text-3xl md:text-4xl font-bold text-center">
        {r("title")}
      </h1>
      {children}
    </section>
  );
}
