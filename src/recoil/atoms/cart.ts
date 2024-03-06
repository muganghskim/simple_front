import { atom } from "recoil";

export const isOpenState = atom<boolean>({
  key: "isOpen",
  default: false
});
