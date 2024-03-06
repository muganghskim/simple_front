import { atom } from "recoil";

interface User {
  username: string;
  email: string;
}

export const userState = atom<User>({
  key: "user",
  default: { username: "", email: "" }
});

export const isLoggedInState = atom<boolean>({
  key: "isLoggedIn",
  default: localStorage.getItem("token") ? true : false
});
