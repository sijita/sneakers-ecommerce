"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import useSWR, { mutate } from "swr";
import { useTranslations } from "next-intl";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function useProductCart() {
  const t = useTranslations("Cart");
  const t2 = useTranslations("Loading");
  const { data: session, status } = useSession();
  const {
    data: cart,
    isLoading,
    error,
  } = useSWR(
    session?.user.id ? `/api/cart?user=${session?.user.id}` : null,
    fetcher
  );

  const handleAddProductCart = async (product) => {
    let loadingToastId;
    if (!session?.user.id) return toast.error(t("noSession"));
    try {
      loadingToastId = toast.loading(t2("text"));
      const res = await axios.post("/api/cart", {
        userId: session.user.id,
        productId: product.id,
        size: product.size,
        quantity: product.quantity,
        color: product.color,
        subtotal: product.price * product.quantity,
        locale: product.locale,
      });

      toast.dismiss(loadingToastId);

      mutate(`/api/cart?user=${session?.user.id}`);
      return toast.success(res.data);
    } catch (error) {
      console.log(error);
      toast.dismiss(loadingToastId);
      return toast.error(error.response.data.error);
    }
  };

  const handleRemoveProductCart = async (id) => {
    let loadingToastId;
    try {
      loadingToastId = toast.loading(t2("text"));
      const res = await axios.delete(`/api/cart/${id}`);

      toast.dismiss(loadingToastId);

      mutate(`/api/cart?user=${session?.user.id}`);
      toast.success(res.data);
    } catch (error) {
      toast.dismiss(loadingToastId);
      toast.error(error.response.data.error);
    }
  };

  const handleProductQuantity = async (cart) => {
    let loadingToastId;
    try {
      loadingToastId = toast.loading(t2("text"));
      const res = await axios.put(`/api/cart/${cart.id}`, {
        quantity: cart.quantity,
        subtotal: cart.price * cart.quantity,
        size: cart.size,
        color: cart.color,
      });

      toast.dismiss(loadingToastId);

      mutate(`/api/cart?user=${session?.user.id}`);
      toast.success(res.data);
    } catch (error) {
      toast.dismiss(loadingToastId);
      toast.error(error.response.data.error);
    }
  };

  return {
    status,
    cart,
    isLoading,
    error,
    handleAddProductCart,
    handleRemoveProductCart,
    handleProductQuantity,
  };
}
