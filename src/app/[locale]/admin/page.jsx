"use client";
import DashboardInfoCard from "@/components/admin/DashboardInfoCard";
import DashboardLinkBtn from "@/components/admin/DashboardLinkBtn";
import { PiSneakerFill, PiArchiveBoxFill } from "react-icons/pi";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("Admin.dashboard");

  return (
    <main className="flex flex-col gap-8">
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <DashboardInfoCard
          title={t("todayGains")}
          value="0.00"
          percentage="0,00"
          comparative={`+0 ${t("yesterday")}`}
        />
        <DashboardInfoCard
          title={t("monthlyGains")}
          value="0.00"
          percentage="0,00"
          comparative={`+0 ${t("lastMonth")}`}
        />
        <DashboardInfoCard
          title={t("totalGains")}
          value="0.00"
          percentage="0,00"
          comparative={`+0 ${t("lastYear")}`}
        />
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <DashboardLinkBtn
          href="/admin/products"
          title={
            <>
              {t("adminProducts")} <PiSneakerFill size={20} />
            </>
          }
        />
        <DashboardLinkBtn
          href="/admin/orders"
          title={
            <>
              {t("adminOrders")} <PiArchiveBoxFill size={20} />
            </>
          }
        />
      </section>
    </main>
  );
}
