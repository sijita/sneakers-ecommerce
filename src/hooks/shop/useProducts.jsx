import { filtersState } from "@/atoms/filtersState";
import { orderState } from "@/atoms/orderState";
import axios from "axios";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import useSWR from "swr";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function useProducts() {
  const OrderBy = useRecoilValue(orderState);
  const filters = useRecoilValue(filtersState);
  const [pageIndex, setPageIndex] = useState(1);
  const { data, error, isLoading } = useSWR(
    `/api/products?cursor=${pageIndex}&order=${OrderBy}&size=${
      filters.size
    }&color=${filters.color}&brand=${
      filters.brand
    }&search=${filters.search?.replace(/ /g, "<->")}`,
    fetcher
  );

  const products = data?.product.map((product) => product);

  return {
    products,
    filters,
    pageIndex,
    setPageIndex,
    isLoading,
    error,
    data
  }
}
