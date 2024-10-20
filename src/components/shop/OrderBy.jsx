import React from "react";
import MyDropdown from "../ui/MyDropdown";
import { Menu } from "@headlessui/react";
import useOrder from "@/hooks/orders/useOrder";

export default function OrderBy({ title, lowerBtnText, higherBtnText }) {
  const { setOrder } = useOrder();

  return (
    <MyDropdown
      title={title}
      position="right"
      menuStyle="w-full"
      btnStyle="btn-outline border-neutral"
    >
      <>
        <Menu.Item className="rounded cursor-pointer">
          {({ active }) => (
            <button
              onClick={() => setOrder("asc")}
              className={`block px-4 py-2 text-sm ${
                active ? "bg-secondary text-primary" : "text-secondary"
              }`}
            >
              {lowerBtnText}
            </button>
          )}
        </Menu.Item>
        <Menu.Item className="rounded cursor-pointer">
          {({ active }) => (
            <button
              onClick={() => setOrder("desc")}
              className={`block px-4 py-2 text-sm ${
                active ? "bg-secondary text-primary" : "text-secondary"
              }`}
            >
              {higherBtnText}
            </button>
          )}
        </Menu.Item>
      </>
    </MyDropdown>
  );
}
