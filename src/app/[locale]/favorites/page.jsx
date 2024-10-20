"use client";
import Products from "@/components/shop/Products";
import ErrorDisplay from "@/components/ui/ErrorDisplay";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import NoDataDisplay from "@/components/ui/NoDataDisplay";
import useLikeProduct from "@/hooks/favorites/useLikeProduct";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Page({ params: { locale } }) {
  const t = useTranslations("Favorites");
  const { favorites, isLoading, status, error } = useLikeProduct();

  if (status === "unauthenticated") {
    return (
      <div className="flex flex-col gap-10 items-center justify-center h-screen">
        <p className="text-center text-3xl font-bold">{t("unauthenticated")}</p>
        <Link href="/login" className="btn btn-outline border-neutral btn-wide">
          {t("login")}
        </Link>
      </div>
    );
  }

  if (isLoading || !favorites) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorDisplay />;
  }

  const products = favorites?.map((favorite) => favorite.producto);
  const pageIndex = 0;

  if (!products?.length) {
    return <NoDataDisplay content={t("empty")} />;
  }

  return (
    <div className="flex flex-col sm:flex-row">
      <Products data={products} locale={locale} />
    </div>
  );
}
