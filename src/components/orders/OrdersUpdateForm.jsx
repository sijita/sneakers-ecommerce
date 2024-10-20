import useHandleOrderStatus from "@/hooks/orders/useHandleOrderStatus";
import { useEffect } from "react";
import { useTranslations } from "next-intl";

export default function OrdersUpdateForm({ order }) {
  const t = useTranslations("Orders");
  const { handleSubmit, status, trackingId, setStatus, setTrackingId } =
    useHandleOrderStatus();

  useEffect(() => {
    setStatus(order.estadoEnvio);
    setTrackingId(order.rastreoId);
  }, [order]);

  return (
    <form
      onSubmit={(e) => handleSubmit(e, order.id)}
      className="flex flex-col gap-5"
    >
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="select border border-neutral w-full text-base mt-auto"
      >
        <option value="1">{t("orderStatus.pending")}</option>
        <option value="2">{t("orderStatus.sent")}</option>
        <option value="3">{t("orderStatus.delivered")}</option>
      </select>
      <input
        value={trackingId}
        onChange={(e) => setTrackingId(e.target.value)}
        type="text"
        placeholder={t("trackingPlaceholder")}
        className="input border border-neutral"
      />
      <button className="btn btn-primary border border-neutral hover:btn-secondary w-full">
        {t("update")}
      </button>
    </form>
  );
}
