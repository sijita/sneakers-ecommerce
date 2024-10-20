import { atom } from "recoil";

export const editContactModalState = atom({
  key: "editContactModalState",
  default: false,
});

export const editDomicileModalState = atom({
  key: "editDomicileModalState",
  default: false,
});

export const editAccessModalState = atom({
  key: "editAccessModalState",
  default: false,
});

export const editCredentialsModalState = atom({
  key: "editCredentialsModalState",
  default: false,
});
