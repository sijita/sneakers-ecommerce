"use client";
import Products from "@/components/shop/Products";
import { useState } from "react";
import axios from "axios";
import useSWR from "swr";
import Pagination from "@/components/shop/Pagination";
import { orderState } from "@/atoms/orderState";
import { filtersState } from "@/atoms/filtersState";
import { useRecoilValue } from "recoil";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import ErrorDisplay from "@/components/ui/ErrorDisplay";
import NoDataDisplay from "@/components/ui/NoDataDisplay";
import { useTranslations } from "next-intl";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function Page({ params: { locale } }) {
  const t = useTranslations("Shop");
  const [pageIndex, setPageIndex] = useState(1);
  const OrderBy = useRecoilValue(orderState);
  const filters = useRecoilValue(filtersState);
  const { data, error, isLoading } = useSWR(
    `/api/products?cursor=${pageIndex}&category=1&order=${OrderBy}&size=${filters.size}&color=${filters.color}&brand=${filters.brand}`,
    fetcher
  );

  if (isLoading || !data) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorDisplay />;
  }

  const products = data?.product.map((product) => product);

  if (!products.length) {
    return <NoDataDisplay content={t("empty")} />;
  }

  return (
    <div className="container mx-auto sm:p-20 p-10">
      <Products data={products} locale={locale} />
      <div className="flex flex-wrap w-full justify-center gap-5 mt-16">
        <Pagination
          data={data}
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
        />
      </div>
    </div>
  );
}
