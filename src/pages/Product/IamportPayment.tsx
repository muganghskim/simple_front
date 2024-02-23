import React, { useEffect } from 'react';
import { Product } from './ProductDetail';

interface IamportPaymentProps {
  product: Product;
  pg: String;
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

const IamportPayment: React.FC<IamportPaymentProps> = ({ product, pg }) => {

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.iamport.kr/v1/iamport.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const { id, name, description, price } = product;

  const handlePayment = () => {
    if (!window.IMP) return;
    /* 1. 가맹점 식별하기 */
    const { IMP } = window;
    IMP.init("imp70486607"); // 가맹점 식별코드

    /* 2. 결제 데이터 정의하기 */

    const data: RequestPayParams = {
      pg: `${pg}`,
      pay_method: "card",
      merchant_uid: `mid_${new Date().getTime()}`,
      amount: Number(price), // '1000' -> 1000
      name, // 상품명
      buyer_name: "홍길동",
      buyer_tel: "01012341234",
      buyer_email: "example@example",
      buyer_addr: "신사동 661-16",
      buyer_postcode: "06018",
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

    const data: RequestPayParams = {
      pg: `${pg}`,
      pay_method: "card",
      merchant_uid: `mid_${new Date().getTime()}`,
      amount: Number(price), // '1000' -> 1000
      name, // 상품명
      buyer_name: "홍길동",
      buyer_tel: "01012341234",
      buyer_email: "example@example",
      buyer_addr: "신사동 661-16",
      buyer_postcode: "06018",
    };

    /* 4. 결제 창 호출하기 */
    IMP.request_pay(data, callback);
  };


  const callback = (response: RequestPayResponse) => {
    const { success, error_msg } = response;

    if (success) {
      alert('결제 성공');
      // 결제 성공 시 이후 처리 로직 작성

    } else {
      alert(`결제 실패: ${error_msg}`);
      // 결제 실패 시 이후 처리 로직 작성
    }
  };

  return (
    <>
      {pg === "kakaopay.TC0ONETIME" && (
        <button onClick={handlePayment}>
          카카오페이로 구매
        </button>
      )}
      {pg === "html5_inicis.INIBillTst" && (
        <button onClick={handlePayment1}>
          신용카드로 구매
        </button>
      )}
    </>

  );
};

export default IamportPayment;