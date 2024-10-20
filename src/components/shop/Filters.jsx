"use client";
import { Menu } from "@headlessui/react";
import MyDropdown from "../ui/MyDropdown";
import OrderBy from "./OrderBy";
import axios from "axios";
import useSWR from "swr";
import SizesDropdown from "./SizesDropdown";
import useFilters from "@/hooks/useFilters";
import { HiOutlineTrash } from "react-icons/hi";
import useOrder from "@/hooks/orders/useOrder";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { useTranslations } from "next-intl";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function Filters({ paddingX }) {
  const t = useTranslations("Shop.filters");
  const { data } = useSWR("/api/products/all", fetcher);
  const { setColor, setBrand, setFilters, filters, setSearch } = useFilters();
  const { setOrder, order } = useOrder();
  const [searchInputValue, setSearchInputValue] = useState("");

  const tallasSet = new Set();
  const coloresSet = new Set();
  const marcasSet = new Set();

  data?.products.forEach((product) => {
    product.productoTallaColor.map(({ talla, color }) => {
      tallasSet.add(talla), coloresSet.add(color);
    });
    marcasSet.add(product.marca);
  });

  const tallas = Array.from(tallasSet).sort((a, b) => a - b);
  const colores = Array.from(coloresSet);
  const marcas = Array.from(marcasSet);

  return (
    <div className="border-t border-b border-neutral w-full">
      <div
        className={`container mx-auto py-5 sm:py-3 ${paddingX} flex justify-between gap-5 flex-col lg:flex-row`}
      >
        <div className="grid grid-cols-1 sm:flex gap-5 w-full md:w-auto justify-between">
          <SizesDropdown tallas={tallas} title={t("size")} />
          <MyDropdown
            title={t("color")}
            position="left"
            menuStyle="w-full"
            btnStyle="btn-outline border-neutral"
          >
            <>
              {colores.map((color, i) => (
                <Menu.Item key={i} className="rounded cursor-pointer">
                  {({ active }) => (
                    <button
                      onClick={() => setColor(color)}
                      className={`block px-4 py-2 text-sm w-full text-left ${
                        active ? "bg-secondary text-primary" : "text-secondary"
                      }`}
                    >
                      {color}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </>
          </MyDropdown>
          <MyDropdown
            title={t("brand")}
            position="left"
            menuStyle="w-full"
            btnStyle="btn-outline border-neutral"
          >
            <>
              {marcas.map((marca, i) => (
                <Menu.Item key={i} className="rounded cursor-pointer">
                  {({ active }) => (
                    <button
                      onClick={() => setBrand(marca)}
                      className={`block px-4 py-2 text-sm w-full text-left ${
                        active ? "bg-secondary text-primary" : "text-secondary"
                      }`}
                    >
                      {marca}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </>
          </MyDropdown>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSearch(searchInputValue);
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            name="search"
            placeholder={t("search")}
            className="input input-sm border border-neutral w-full lg:w-auto"
            value={searchInputValue}
            onChange={(e) => setSearchInputValue(e.target.value)}
          />
          <button className="btn btn-sm btn-outline border-neutral">
            {t("searchBtnText")}
          </button>
        </form>
        <div className="flex flex-col md:flex-row w-full md:w-auto gap-5">
          <OrderBy
            title={t("orderBy")}
            lowerBtnText={t("orderByLowerPrice")}
            higherBtnText={t("orderByHigherPrice")}
          />
          <button
            onClick={() => {
              if (
                order !== "" ||
                !Object.values(filters).every((value) => value == "")
              ) {
                setOrder("");
                setSearchInputValue("");
                setFilters({
                  size: "",
                  color: "",
                  brand: "",
                  search: "",
                });
                return toast.success(t("cleaned"));
              } else {
                return toast.error(t("noFilters"));
              }
            }}
            className="btn btn-outline btn-sm border-neutral"
          >
            {t("clearFilters")}
            <HiOutlineTrash />
          </button>
        </div>
      </div>
    </div>
  );
}
