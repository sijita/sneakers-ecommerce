import { atom } from "recoil";

export const checkoutState = atom({
  key: "checkoutState",
  default: {
    name: "",
    lastname: "",
    email: "",
    phone: "",
    cc: "",
    department: "",
    city: "",
    address: "",
    details: "",
  },
});
