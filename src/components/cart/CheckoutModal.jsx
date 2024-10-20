"use client";
import MyModal from "../ui/MyModal";
import CheckoutTabs from "./CheckoutTabs";

export default function CheckoutModal({ isOpen, closeModal }) {
  return (
    <MyModal title="Checkout" isOpen={isOpen} closeModal={closeModal}>
      <CheckoutTabs />
    </MyModal>
  );
}
