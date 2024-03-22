import React, { useEffect, useState } from "react";
// import { Product } from "./ProductDetail";
import axios from "axios";
import { useRecoilState } from "recoil";
import { cartState } from "../../recoil/atoms/cart";

interface IamportPaymentProps {
  // product: Product;
  // product: any;
  delivery: any;
  pg: String;
}

interface orderItemDatas {
  pdNo: number;
  price: number;
  quantity: number;
  userEmail?: String | null;
}

interface orderItemIds {
  orderItemIds: number[];
}

interface transactionData {
  deliveryId: number;
  orderItemIds: number[]; // 주문 목록의 ID들을 저장할 배열
  paymentMethod: String;
  rcvName: String;
  rcvPhn: String;
  tidStat: String;
  userEmail?: String | null;
}

export interface RequestPayAdditionalParams {
  digital?: boolean;
  vbank_due?: string;
  m_redirect_url?: string;
  app_scheme?: string;
  biz_num?: string;
}

export interface Display {
  card_quota?: number[];
}

export interface RequestPayParams extends RequestPayAdditionalParams {
  pg?: string;
  pay_method: string;
  escrow?: boolean;
  merchant_uid: string;
  name?: string;
  amount: number;
  custom_data?: any;
  tax_free?: number;
  currency?: string;
  language?: string;
  buyer_name?: string;
  buyer_tel: string;
  buyer_email?: string;
  buyer_addr?: string;
  buyer_postcode?: string;
  notice_url?: string | string[];
  display?: Display;
}

export interface RequestPayAdditionalResponse {
  apply_num?: string;
  vbank_num?: string;
  vbank_name?: string;
  vbank_holder?: string | null;
  vbank_date?: number;
}

export interface RequestPayResponse extends RequestPayAdditionalResponse {
  success: boolean;
  error_code: string;
  error_msg: string;
  imp_uid: string | null;
  merchant_uid: string;
  pay_method?: string;
  paid_amount?: number;
  status?: string;
  name?: string;
  pg_provider?: string;
  pg_tid?: string;
  buyer_name?: string;
  buyer_email?: string;
  buyer_tel?: string;
  buyer_addr?: string;
  buyer_postcode?: string;
  custom_data?: any;
  paid_at?: number;
  receipt_url?: string;
}

export type RequestPayResponseCallback = (response: RequestPayResponse) => void;

export interface Iamport {
  init: (accountID: string) => void;
  request_pay: (
    params: RequestPayParams,
    callback?: RequestPayResponseCallback
  ) => void;
}

declare global {
  interface Window {
    IMP?: Iamport;
  }
}

const IamportPayments: React.FC<IamportPaymentProps> = ({ delivery, pg }) => {
  const [orderItemDatas, setOrderItemDatas] = useState<orderItemDatas[]>([]);
  const [transactionData, setTransactionData] =
    useState<transactionData | null>(null);
  // const [orderItemIds, setOrderItemIds] = useState<orderItemIds>({
  //   orderItemIds: []
  // });

  const userYn = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  const deliveryData = {
    userEmail: userYn || undefined
  };

  if (userYn === null) {
    // userYn이 null일 때 경고창 표시
    alert("로그인이 필요합니다.");
    // 추가적으로 로그인 페이지로 리다이렉트할 수 있습니다.
    window.location.href = "/signin";
  }

  const [cart, setCart] = useRecoilState(cartState);
  const { deliverId, userAddress1, userAddress2, userAddress3 } = delivery;

  console.log("cart", cart);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.iamport.kr/v1/iamport.js";
    script.async = true;
    document.body.appendChild(script);

    const orderItemDatas = cart.map((item) => {
      return {
        pdNo: item.pdNo,
        price: item.pdPrice,
        quantity: item.pdQuantity,
        userEmail: deliveryData.userEmail // 여기에 사용자 이메일을 적절히 넣어주세요
      };
    });

    // 주문 정보 생성을 위한 데이터
    const transactionData = {
      deliveryId: deliverId,
      orderItemIds: [], // 주문 목록의 ID들을 저장할 배열
      paymentMethod: "credit_card",
      rcvName: "김현승",
      rcvPhn: "010-8191-8151",
      tidStat: "pending",
      userEmail: deliveryData.userEmail
    };

    setOrderItemDatas(orderItemDatas);

    setTransactionData(transactionData);

    console.log("orderItemDatas", orderItemDatas);

    console.log("transactionData", transactionData);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = () => {
    if (!window.IMP) return;
    /* 1. 가맹점 식별하기 */
    const { IMP } = window;
    IMP.init("imp70486607"); // 가맹점 식별코드

    /* 2. 결제 데이터 정의하기 */
    const totalPrice =
      cart.length > 0
        ? cart.reduce((total, item) => {
            return total + item.pdPrice * item.pdQuantity;
          }, 0)
        : 0;
    const productName = cart.length > 0 ? cart[0].pdName + " 그외" : "그외";

    const data: RequestPayParams = {
      pg: `${pg}`,
      pay_method: "card",
      merchant_uid: `mid_${new Date().getTime()}`,
      amount: Number(totalPrice), // '1000' -> 1000
      name: productName, // 상품명
      buyer_name: "홍길동",
      buyer_tel: "01012341234",
      buyer_email: deliveryData.userEmail,
      buyer_addr: userAddress1 + userAddress2,
      buyer_postcode: userAddress3
    };

    /* 4. 결제 창 호출하기 */
    IMP.request_pay(data, callback);
  };

  const handlePayment1 = () => {
    if (!window.IMP) return;
    /* 1. 가맹점 식별하기 */
    const { IMP } = window;
    IMP.init("imp70486607"); // 가맹점 식별코드

    /* 2. 결제 데이터 정의하기 */
    const totalPrice =
      cart.length > 0
        ? cart.reduce((total, item) => {
            return total + item.pdPrice * item.pdQuantity;
          }, 0)
        : 0;
    const productName = cart.length > 0 ? cart[0].pdName + " 그외" : "그외";

    const data: RequestPayParams = {
      pg: `${pg}`,
      pay_method: "card",
      merchant_uid: `mid_${new Date().getTime()}`,
      amount: Number(totalPrice), // '1000' -> 1000
      name: productName, // 상품명
      buyer_name: "홍길동",
      buyer_tel: "01012341234",
      buyer_email: deliveryData.userEmail,
      buyer_addr: userAddress1 + userAddress2,
      buyer_postcode: userAddress3
    };

    /* 4. 결제 창 호출하기 */
    IMP.request_pay(data, callback);
  };

  //   // 주문 목록 생성을 위한 데이터 배열
  //   const orderItemDatas = [
  //     {
  //       pdNo: pdNo,
  //       price: pdPrice,
  //       quantity: 1,
  //       userEmail: "rhgustmfrh@naver.com"
  //     }
  //     // {
  //     //   pdNo: pdNo2,
  //     //   price: pdPrice2,
  //     //   quantity: 1,
  //     //   userEmail: "rhgustmfrh@naver.com"
  //     // }
  //     // 여러 개의 주문 목록 데이터를 추가할 수 있음
  //   ];

  // 주문 목록 생성 요청 함수
  const createOrderItems = () => {
    const orderItemIds: any = []; // 생성된 주문 목록의 ID들을 저장할 배열

    const orderItemData = orderItemDatas.map((orderItem) => ({
      pdNo: orderItem.pdNo,
      price: orderItem.price,
      quantity: orderItem.quantity,
      userEmail: orderItem.userEmail
    }));

    axios
      .post("http://localhost:8096/api/orderItem/create", orderItemData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        console.log("Order items created successfully:", response.data);
        // 생성된 주문 항목의 ID들을 처리하거나 다음 단계로 진행할 수 있습니다.
        response.data.forEach((item: any) => {
          orderItemIds.push(item.orderItemId);
        });
        console.log("orderItemIds O", orderItemIds);
        // setOrderItemIds(orderItemIds);
        createTransactionData(orderItemIds);
      })
      .catch((error) => {
        console.error("Error creating order items:", error);
      });
  };

  // 주문 정보 생성 요청
  const createTransactionData = (orderItemIds: any) => {
    console.log("orderItemIds T", orderItemIds);
    if (transactionData) {
      transactionData.orderItemIds = orderItemIds; // 생성된 주문 목록의 ID들을 설정

      console.log("transactionData", transactionData);

      axios
        .post("http://localhost:8096/api/transaction/create", transactionData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((response) => {
          console.log("Transaction created successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error creating transaction:", error);
        });
    }
  };

  const handlePaymentTest = () => {
    createOrderItems();
  };

  const callback = (response: RequestPayResponse) => {
    const { success, error_msg } = response;

    if (success) {
      alert("결제 성공");
      // 결제 성공 시 이후 처리 로직 작성
      createOrderItems();
    } else {
      alert(`결제 실패: ${error_msg}`);
      // 결제 실패 시 이후 처리 로직 작성
    }
  };

  return (
    <>
      {pg === "kakaopay.TC0ONETIME" && (
        <button onClick={handlePayment}>카카오페이로 구매</button>
      )}
      {pg === "html5_inicis.INIBillTst" && (
        <button onClick={handlePayment1}>신용카드로 구매</button>
      )}
      {/* <button onClick={handlePaymentTest}>구매 테스트</button> */}
    </>
  );
};

export default IamportPayments;
