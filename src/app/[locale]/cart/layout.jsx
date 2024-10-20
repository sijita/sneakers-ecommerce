"use client";
import CheckoutModal from "@/components/cart/CheckoutModal";
import Titles from "@/components/ui/Titles";
import useCheckoutModal from "@/hooks/checkout/useCheckoutModal";
import { useTranslations } from "next-intl";

export default function Layout({ children }) {
  const t = useTranslations("Cart");
  const { isOpen, handleCheckoutModal } = useCheckoutModal();

  return (
    <main className="container mx-auto sm:p-20 p-10">
      <CheckoutModal isOpen={isOpen} closeModal={handleCheckoutModal} />
      <Titles title={t("title")} size="text-2xl" />
      {children}
    </main>
  );
}
