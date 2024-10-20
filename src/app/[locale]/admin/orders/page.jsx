"use client";
import OrdersListAdmin from "@/components/orders/OrdersListAdmin";
import ErrorDisplay from "@/components/ui/ErrorDisplay";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import NoDataDisplay from "@/components/ui/NoDataDisplay";
import { useState } from "react";
import axios from "axios";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function Page() {
  const t = useTranslations("Orders");
  const { data: session } = useSession();
  const {
    data: ordersAdmin,
    isLoading: isLoadingAdmin,
    error: errorAdmin,
  } = useSWR(`/api/orders/all?adminId=${session?.user.id}`, fetcher);
  const [searchUser, setSearchUser] = useState("");

  if (isLoadingAdmin || !ordersAdmin) {
    return <LoadingSpinner />;
  }

  if (!ordersAdmin?.length) {
    return <NoDataDisplay content={t("noAdminData")} />;
  }

  if (errorAdmin) {
    return <ErrorDisplay />;
  }

  function removeAccents(text) {
    return text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  const searchResults = !searchUser
    ? ordersAdmin
    : ordersAdmin.filter((item) =>
        (
          removeAccents(item.usuario.nombre) +
          removeAccents(item.usuario.apellido)
        )
          .replace(/\s+/g, "")
          .toLowerCase()
          .includes(removeAccents(searchUser.replace(/\s+/g, "")).toLowerCase())
      );

  return (
    <section>
      <input
        type="text"
        placeholder={t("searchPlaceholder")}
        className="input border border-neutral w-full"
        onChange={(e) => setSearchUser(e.target.value)}
      />
      <OrdersListAdmin ordersAdmin={searchResults} />
    </section>
  );
}
