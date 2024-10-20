import { atom } from "recoil";

export const chooseSizeState = atom({
  key: "chooseSizeState",
  default: "",
});

export const chooseQuantityState = atom({
  key: "chooseQuantityState",
  default: 1,
});

export const chooseColorState = atom({
  key: "chooseColorState",
  default: "",
});
