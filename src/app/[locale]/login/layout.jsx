"use client";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useSession } from "next-auth/react";
import ActiveSession from "@/components/ui/ActiveSession";
import { useTranslations } from "next-intl";

export default function Layout({ children }) {
  const t = useTranslations("ActiveSession");
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  if (session) {
    return <ActiveSession title={t("text", { user: session?.user.email })} />;
  }
  return <>{children}</>;
}
