"use client";
import Products from "@/components/shop/Products";
import Pagination from "@/components/shop/Pagination";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import ErrorDisplay from "@/components/ui/ErrorDisplay";
import NoDataDisplay from "@/components/ui/NoDataDisplay";
import useProducts from "@/hooks/shop/useProducts";
import { useTranslations } from "next-intl";

export default function Page({ params: { locale } }) {
  const t = useTranslations("Shop");
  const { products, data, isLoading, error, filters, pageIndex, setPageIndex } =
    useProducts();

  if (isLoading || !data) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorDisplay />;
  }

  if (!data.product.length) {
    return <NoDataDisplay content={t("empty")} />;
  }

  return (
    <main className="container mx-auto sm:p-20 p-10">
      <Products data={products} locale={locale} />
      {filters.size.length !== 0 ||
      filters.color.length !== 0 ||
      filters.brand.length !== 0 ? null : (
        <div className="flex flex-wrap w-full justify-center gap-5 mt-16">
          <Pagination
            data={data}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
          />
        </div>
      )}
    </main>
  );
}
