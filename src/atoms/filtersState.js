import { atom } from "recoil";

export const filtersState = atom({
  key: "filtersState",
  default: {
    size: "",
    color: "",
    brand: "",
    search: "",
  },
});
