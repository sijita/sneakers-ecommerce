"use client";
import useViewOrders from "@/hooks/orders/useViewOrders";
import OrdersList from "@/components/orders/OrdersList";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import NoDataDisplay from "@/components/ui/NoDataDisplay";
import ErrorDisplay from "@/components/ui/ErrorDisplay";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("Orders");
  const { orders, isLoading, error } = useViewOrders();

  if (isLoading || !orders) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorDisplay />;
  }

  if (!orders.length) return <NoDataDisplay content={t("empty")} />;

  return (
    <OrdersList
      orders={orders}
      statusPlaceholder={t("orderStatus.title")}
      orderPlaceholder={t("order")}
      sizePlaceholder={t("size")}
      statusPendingPlaceholder={t("orderStatus.pending")}
      statusSentPlaceholder={t("orderStatus.sent")}
      deliveredPlaceholder={t("orderStatus.delivered")}
      trackingPlaceholder={t("trackingPlaceholder")}
      statusPaymentPlaceholder={t("orderStatus.awaiting")}
    />
  );
}
