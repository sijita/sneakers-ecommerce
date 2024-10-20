"use client";
import axios from "axios";
import useSWR from "swr";
import TableNav from "./TableNav";
import TableBody from "./TableBody";
import TableFooter from "./TableFooter";
import { useRecoilState, useRecoilValue } from "recoil";
import { adminPageIndexState } from "@/atoms/adminPageIndexState";
import { orderState } from "@/atoms/orderState";
import { filtersState } from "@/atoms/filtersState";
import Filters from "../shop/Filters";
import LoadingSpinner from "../ui/LoadingSpinner";
import ErrorDisplay from "../ui/ErrorDisplay";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function ProductsTable({
  productPlaceholder,
  categoryPlaceholder,
  stockPlaceholder,
  sizePlaceholder,
  pricePlaceholder,
  actionsPlaceholder,
  showingPlaceholder,
  pagePlaceholder,
  addProductPlaceholder,
  totalProductsPlaceholder,
}) {
  const [pageIndex, setPageIndex] = useRecoilState(adminPageIndexState);
  const orderBy = useRecoilValue(orderState);
  const filters = useRecoilValue(filtersState);
  const { data, isLoading, error } = useSWR(
    `/api/products?cursor=${pageIndex}&order=${orderBy}&color=${
      filters.color
    }&brand=${filters.brand}&size=${
      filters.size
    }&search=${filters.search.replace(/ /g, "<->")}&status=all`,
    fetcher
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorDisplay />;
  }

  const products = data?.product.map((item) => item);
  const productsCount = data?.productsCount;

  return (
    <>
      <TableNav
        data={data}
        addProductPlaceholder={addProductPlaceholder}
        totalProductsPlaceholder={totalProductsPlaceholder}
      />
      <div className="mb-8">
        <Filters />
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>{productPlaceholder}</th>
              <th>{categoryPlaceholder}</th>
              <th>{stockPlaceholder}</th>
              <th>{sizePlaceholder}</th>
              <th>{pricePlaceholder}</th>
              <th>{actionsPlaceholder}</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((producto, i) => (
              <TableBody key={producto.id} producto={producto} />
            ))}
          </tbody>
          <TableFooter
            data={products}
            productsCount={productsCount}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
            showingPlaceholder={showingPlaceholder}
            pagePlaceholder={pagePlaceholder}
          />
        </table>
      </div>
    </>
  );
}
