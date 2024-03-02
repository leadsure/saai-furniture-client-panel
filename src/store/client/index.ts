import { atom } from "recoil";

export const isClient = atom({
  key: "isClient",
  default: false,
});
