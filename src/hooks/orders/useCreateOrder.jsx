import axios from "axios";
import useProductCart from "../cart/useProductCart";
import useCheckoutForm from "../checkout/useCheckoutForm";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { mutate } from "swr";
import useCheckoutModal from "../checkout/useCheckoutModal";
import { useTranslations } from "next-intl";

export default function useCreateOrder() {
  const t = useTranslations("Cart.checkout");
  const t2 = useTranslations("Loading");
  const { data: session } = useSession();
  const { cart } = useProductCart();
  const { checkoutForm } = useCheckoutForm();
  const { handleCheckoutModal } = useCheckoutModal();
  const isAllFieldsEmpty = Object.values(checkoutForm).every(
    (value) => value !== "" && value !== null && value !== undefined
  );

  const total =
    cart.map((product) => product.subtotal).reduce((a, b) => a + b, 0) + 20000;

  const createOrder = async () => {
    let loadingToastId = null;

    if (!isAllFieldsEmpty) {
      return toast.error(t("requiredFields"));
    }

    try {
      loadingToastId = toast.loading(t2("text"));
      const res = await axios.post("/api/orders", {
        userId: session.user.id,
        cc: checkoutForm.cc,
        phone: checkoutForm.phone,
        city: checkoutForm.city,
        address: checkoutForm.address,
        details: checkoutForm.details,
        total: total,
      });

      toast.dismiss(loadingToastId);

      mutate(`/api/cart?user=${session?.user.id}`);
      mutate(`/api/orders?user=${session?.user.id}`);
      mutate(`/api/orders/all`);
      handleCheckoutModal();
      toast.success(t("success"));

      return window.open(
        `https://api.whatsapp.com/send?phone=573193139280&text=${`Hola, mi nombre es ${
          checkoutForm.name
        } ${checkoutForm.lastname}, acabo de realizar un pedido con el id: ${
          res.data.id
        } por un valor de $ ${res.data.precioTotal.toLocaleString(
          "es-CO"
        )}, me gustaría saber como puedo pagarlo y como es el proceso de envio.`}`
      );
    } catch (error) {
      toast.dismiss(loadingToastId);
      return toast.error(error.response.data.error);
    }
  };

  return {
    createOrder,
    isAllFieldsEmpty,
    checkoutForm,
    cart,
    total,
  };
}
