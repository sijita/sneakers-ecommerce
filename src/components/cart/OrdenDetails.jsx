import useCheckoutModal from "@/hooks/checkout/useCheckoutModal";
import { useTranslations } from "next-intl";

export default function OrdenDetails({ subtotal, shipping, total }) {
  const { handleCheckoutModal } = useCheckoutModal();
  const t = useTranslations("Cart.orderDetails");

  return (
    <div className="h-full flex flex-col gap-2 rounded-md border border-neutral p-6 lg:w-1/3">
      <div className="flex justify-between">
        <p className="font-medium">{t("subtotal")}</p>
        <p className="text-base-200">$ {subtotal.toLocaleString("es-CO")}</p>
      </div>
      <div className="flex justify-between">
        <p className="font-medium">{t("shipping")}</p>
        <p className="text-base-200">$ {shipping.toLocaleString("es-CO")}</p>
      </div>
      <hr className="my-4" />
      <div className="flex justify-between">
        <p className="text-lg font-bold">Total</p>
        <div className="">
          <p className="text-lg font-bold">
            $ {total.toLocaleString("es-CO")} COP
          </p>
        </div>
      </div>
      <button
        onClick={handleCheckoutModal}
        className="btn btn-outline border-neutral font-semibold w-full mt-3"
      >
        {t("buyBtnText")}
      </button>
    </div>
  );
}
