// import React, { useEffect } from "react";
// // import { Product } from "./ProductDetail";
// import axios from "axios";

// interface IamportPaymentProps {
//   // product: Product;
//   product: any;
//   pg: String;
// }

// export interface RequestPayAdditionalParams {
//   digital?: boolean;
//   vbank_due?: string;
//   m_redirect_url?: string;
//   app_scheme?: string;
//   biz_num?: string;
// }

// export interface Display {
//   card_quota?: number[];
// }

// export interface RequestPayParams extends RequestPayAdditionalParams {
//   pg?: string;
//   pay_method: string;
//   escrow?: boolean;
//   merchant_uid: string;
//   name?: string;
//   amount: number;
//   custom_data?: any;
//   tax_free?: number;
//   currency?: string;
//   language?: string;
//   buyer_name?: string;
//   buyer_tel: string;
//   buyer_email?: string;
//   buyer_addr?: string;
//   buyer_postcode?: string;
//   notice_url?: string | string[];
//   display?: Display;
// }

// export interface RequestPayAdditionalResponse {
//   apply_num?: string;
//   vbank_num?: string;
//   vbank_name?: string;
//   vbank_holder?: string | null;
//   vbank_date?: number;
// }

// export interface RequestPayResponse extends RequestPayAdditionalResponse {
//   success: boolean;
//   error_code: string;
//   error_msg: string;
//   imp_uid: string | null;
//   merchant_uid: string;
//   pay_method?: string;
//   paid_amount?: number;
//   status?: string;
//   name?: string;
//   pg_provider?: string;
//   pg_tid?: string;
//   buyer_name?: string;
//   buyer_email?: string;
//   buyer_tel?: string;
//   buyer_addr?: string;
//   buyer_postcode?: string;
//   custom_data?: any;
//   paid_at?: number;
//   receipt_url?: string;
// }

// export type RequestPayResponseCallback = (response: RequestPayResponse) => void;

// export interface Iamport {
//   init: (accountID: string) => void;
//   request_pay: (
//     params: RequestPayParams,
//     callback?: RequestPayResponseCallback
//   ) => void;
// }

// declare global {
//   interface Window {
//     IMP?: Iamport;
//   }
// }

// const IamportPayment: React.FC<IamportPaymentProps> = ({ product, pg }) => {
//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://cdn.iamport.kr/v1/iamport.js";
//     script.async = true;
//     document.body.appendChild(script);

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   const { pdNo, pdName, description, pdPrice } = product;

//   const handlePayment = () => {
//     if (!window.IMP) return;
//     /* 1. 가맹점 식별하기 */
//     const { IMP } = window;
//     IMP.init("imp70486607"); // 가맹점 식별코드

//     /* 2. 결제 데이터 정의하기 */

//     const data: RequestPayParams = {
//       pg: `${pg}`,
//       pay_method: "card",
//       merchant_uid: `mid_${new Date().getTime()}`,
//       amount: Number(pdPrice), // '1000' -> 1000
//       name: pdName, // 상품명
//       buyer_name: "홍길동",
//       buyer_tel: "01012341234",
//       buyer_email: "example@example",
//       buyer_addr: "신사동 661-16",
//       buyer_postcode: "06018"
//     };

//     /* 4. 결제 창 호출하기 */
//     IMP.request_pay(data, callback);
//   };

//   const handlePayment1 = () => {
//     if (!window.IMP) return;
//     /* 1. 가맹점 식별하기 */
//     const { IMP } = window;
//     IMP.init("imp70486607"); // 가맹점 식별코드

//     /* 2. 결제 데이터 정의하기 */

//     const data: RequestPayParams = {
//       pg: `${pg}`,
//       pay_method: "card",
//       merchant_uid: `mid_${new Date().getTime()}`,
//       amount: Number(pdPrice), // '1000' -> 1000
//       name: pdName, // 상품명
//       buyer_name: "홍길동",
//       buyer_tel: "01012341234",
//       buyer_email: "example@example",
//       buyer_addr: "신사동 661-16",
//       buyer_postcode: "06018"
//     };

//     /* 4. 결제 창 호출하기 */
//     IMP.request_pay(data, callback);
//   };

//   // 주문 정보 생성을 위한 데이터
//   const transactionData = {
//     deliveryId: 123,
//     orderItemIds: [], // 주문 목록의 ID들을 저장할 배열
//     paymentMethod: "credit_card",
//     rcvName: "김현승",
//     rcvPhn: "010-8191-8151",
//     tidStat: "pending",
//     userEmail: "rhgustmfrh@naver.com"
//   };

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

//   // 주문 목록 생성 요청 함수
//   const createOrderItems = () => {
//     const orderItemIds: any = []; // 생성된 주문 목록의 ID들을 저장할 배열

//     Promise.all(
//       orderItemDatas.map((orderItemData) => {
//         return axios
//           .post("http://backend-api-url/api/orderItem/create", orderItemData)
//           .then((response) => {
//             console.log("Order item created successfully:", response.data);
//             const orderItemId = response.data.orderItemId; // 생성된 주문 목록의 ID
//             orderItemIds.push(orderItemId); // 생성된 주문 목록의 ID를 배열에 추가
//           })
//           .catch((error) => {
//             console.error("Error creating order items:", error);
//           });
//       })
//     ).then(() => {
//       // 모든 주문 목록이 생성되었을 때 주문 정보 생성 요청
//       createTransactionData(orderItemIds);
//     });
//   };

//   // 주문 정보 생성 요청
//   const createTransactionData = (orderItemIds: any) => {
//     transactionData.orderItemIds = orderItemIds; // 생성된 주문 목록의 ID들을 설정

//     axios
//       .post("http://backend-api-url/api/transaction/create", transactionData)
//       .then((response) => {
//         console.log("Transaction created successfully:", response.data);
//       })
//       .catch((error) => {
//         console.error("Error creating transaction:", error);
//       });
//   };

//   const callback = (response: RequestPayResponse) => {
//     const { success, error_msg } = response;

//     if (success) {
//       alert("결제 성공");
//       // 결제 성공 시 이후 처리 로직 작성
//       createOrderItems();
//     } else {
//       alert(`결제 실패: ${error_msg}`);
//       // 결제 실패 시 이후 처리 로직 작성
//     }
//   };

//   return (
//     <>
//       {pg === "kakaopay.TC0ONETIME" && (
//         <button onClick={handlePayment}>카카오페이로 구매</button>
//       )}
//       {pg === "html5_inicis.INIBillTst" && (
//         <button onClick={handlePayment1}>신용카드로 구매</button>
//       )}
//     </>
//   );
// };

// export default IamportPayment;
