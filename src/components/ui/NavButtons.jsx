"use client";
import Link from "next/link";
import {
  HiOutlineHeart,
  HiOutlineShoppingBag,
  HiOutlineUserCircle,
} from "react-icons/hi";
import { signOut, useSession } from "next-auth/react";
import useLikeProduct from "@/hooks/favorites/useLikeProduct";
import MyDropdown from "./MyDropdown";
import useProductCart from "@/hooks/cart/useProductCart";
import useViewOrders from "@/hooks/orders/useViewOrders";
import ThemeSwitch from "./ThemeSwitch";
import { useTranslations } from "next-intl";

export default function NavButtons() {
  const t = useTranslations("ProfileDropdown");
  const { cart } = useProductCart();
  const { data: session } = useSession();
  const { favorites } = useLikeProduct();
  const { orders } = useViewOrders();

  return (
    <>
      <Link
        href="/favorites"
        className="btn btn-outline border-neutral btn-sm indicator w-full min-[315px]:w-auto"
      >
        {session && (
          <span className="indicator-item badge badge-secondary badge-sm font-semibold">
            {favorites ? favorites.length : 0}
          </span>
        )}
        <HiOutlineHeart className="text-xl" />
      </Link>
      <Link
        href="/cart"
        className="btn btn-outline border-neutral btn-sm indicator w-full min-[315px]:w-auto"
      >
        {session && (
          <span className="indicator-item badge badge-secondary badge-sm font-semibold">
            {cart ? cart.length : 0}
          </span>
        )}
        <HiOutlineShoppingBag className="text-xl" />
      </Link>
      <ThemeSwitch />
      <MyDropdown
        title={<HiOutlineUserCircle className="text-xl" />}
        position="right"
        menuStyle="w-max"
        btnStyle="btn-outline border-neutral"
      >
        <>
          {session ? (
            <>
              <Link
                className="flex justify-between items-center px-4 py-2 text-md hover:bg-secondary hover:text-primary rounded font-normal"
                href="/profile"
              >
                {t("profile")}
              </Link>
              <Link
                className="flex gap-3 justify-between items-center px-4 py-2 text-md hover:bg-secondary hover:text-primary rounded font-normal"
                href="/orders"
              >
                {t("orders")}
                <span className="indicator-item badge badge-secondary badge-sm font-semibold hover:badge-primary">
                  {orders ? orders.length : 0}
                </span>
              </Link>
              <button
                className="block px-4 py-2 text-md hover:bg-secondary hover:text-primary rounded font-normal w-full text-left"
                onClick={() => signOut()}
              >
                {t("logout")}
              </button>
            </>
          ) : (
            <>
              <Link
                className="block px-4 py-2 text-md hover:bg-secondary hover:text-primary rounded font-normal"
                href="/login"
              >
                {t("login")}
              </Link>
              <Link
                className="block px-4 py-2 text-md hover:bg-secondary hover:text-primary rounded font-normal"
                href="/signup"
              >
                {t("signup")}
              </Link>
            </>
          )}
        </>
      </MyDropdown>
    </>
  );
}
