import React from "react";
import { useRecoilState } from "recoil";
import { filtersState } from "@/atoms/filtersState";

export default function useFilters() {
  const [filters, setFilters] = useRecoilState(filtersState);

  const setSize = (size) => {
    setFilters((prev) => ({
      ...prev,
      size,
    }));
  };

  const setColor = (color) => {
    setFilters((prev) => ({
      ...prev,
      color,
    }));
  };

  const setBrand = (brand) => {
    setFilters((prev) => ({
      ...prev,
      brand,
    }));
  };

  const setSearch = (search) => {
    setFilters((prev) => ({
      ...prev,
      search,
    }));
  };

  return {
    filters,
    setFilters,
    setSize,
    setColor,
    setBrand,
    setSearch,
  };
}
