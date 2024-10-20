"use client";
import { filtersState } from "@/atoms/filtersState";
import { orderState } from "@/atoms/orderState";
import Pagination from "@/components/shop/Pagination";
import Products from "@/components/shop/Products";
import ErrorDisplay from "@/components/ui/ErrorDisplay";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import NoDataDisplay from "@/components/ui/NoDataDisplay";
import axios from "axios";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import useSWR from "swr";
import { useTranslations } from "next-intl";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function Page({ params: { locale } }) {
  const t = useTranslations("Shop");
  const [pageIndex, setPageIndex] = useState(1);
  const OrderBy = useRecoilValue(orderState);
  const filters = useRecoilValue(filtersState);
  const { data, error, isLoading } = useSWR(
    `/api/products?cursor=${pageIndex}&category=3&order=${OrderBy}&size=${filters.size}&color=${filters.color}&brand=${filters.brand}`,
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
