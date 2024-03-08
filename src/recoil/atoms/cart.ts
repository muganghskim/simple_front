import { atom } from "recoil";

interface Cart {
  cartId: number;
  pdNo: number;
  pdName: string;
  pdQuantity: number;
  pdPrice: number;
  pdImg: string;
}

// cart 상태를 전역으로 관리하기 위한 atom 정의
export const cartState = atom({
  key: "cartState",
  default: [] as Cart[]
});
