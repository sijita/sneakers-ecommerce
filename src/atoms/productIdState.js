import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const productIdState = atom({
  key: "productIdState",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});
