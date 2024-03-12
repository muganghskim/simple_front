interface Delivery {
  deliverId: number;
  userAddress1: string;
  userAddress2: string;
  userAddress3: string;
}

import React, { useState, useEffect } from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import Header from "../Common/Header";
import Addr from "./Addr";
import axios from "axios";
import IamportPayments from "./IamportPayments";

export default function Delivery() {
  const [deliverys, setDeliverys] = useState<Delivery[]>([]);
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(
    null
  );
  const [selectedDeliveryIndex, setSelectedDeliveryIndex] = useState<number>(0);
  // const [selectedDeliveryIndex, setSelectedDeliveryIndex] = useState<
  //   number | null
  // >(null);
  const userYn = localStorage.getItem("email");

  const deliveryData = {
    userEmail: userYn
  };

  if (userYn === null) {
    // userYn이 null일 때 경고창 표시
    alert("로그인이 필요합니다.");
    // 추가적으로 로그인 페이지로 리다이렉트할 수 있습니다.
    window.location.href = "/signin";
  }

  useEffect(() => {
    const getAllDeliverys = async () => {
      const response = await axios.get(
        `http://localhost:8096/api/delivery/${deliveryData.userEmail}`
      );
      setDeliverys(response.data);
    };

    getAllDeliverys();
  }, []);

  const handleAddressAdded = async () => {
    // 주소가 추가되면 Delivery 컴포넌트를 다시 렌더링하기 위해 데이터를 다시 가져옴
    try {
      const response = await axios.get(
        `http://localhost:8096/api/delivery/${deliveryData.userEmail}`
      );
      setDeliverys(response.data);
    } catch (error) {
      console.error("Error fetching delivery data:", error);
    }
  };

  const handleNextButtonClick = () => {
    if (selectedDeliveryIndex !== null) {
      const selectedDelivery = deliverys[selectedDeliveryIndex];
      // 선택한 배송지 데이터를 여기서 사용하여 다음 처리를 수행
      setSelectedDelivery(selectedDelivery);
      console.log("Selected delivery:", selectedDelivery);
    } else {
      console.error("No delivery selected.");
    }
  };

  return (
    <>
      {userYn ? (
        <>
          <Header></Header>

          <Addr onAddressAdded={handleAddressAdded}></Addr>

          <div className="ml-64 space-y-12 pr-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                배송지 목록
              </h2>
              <p className="mt-1 mb-5 text-sm leading-6 text-gray-600">
                배송 받을 배송지를 선택해 주세요.
              </p>
              {deliverys.map((delivery, index) => (
                <div key={index} className="border-b border-gray-900/10 pb-12">
                  <input
                    type="radio"
                    name="delivery"
                    value={index}
                    checked={
                      selectedDeliveryIndex === index ||
                      (index === 0 && selectedDeliveryIndex === null)
                    }
                    onChange={() => {
                      setSelectedDeliveryIndex(index);
                      handleNextButtonClick();
                    }}
                  />
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    배송지 {index + 1}
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    주소: {delivery.userAddress1}, {delivery.userAddress2},{" "}
                    {delivery.userAddress3}
                  </p>
                </div>
              ))}
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"></div>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                결제 상품
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                장바구니에서 결제할 상품 리스트입니다.
              </p>

              <div className="mt-10 space-y-10"></div>
            </div>
          </div>

          <div className="mt-6 mb-12 flex items-center justify-center gap-x-6">
            <a
              href="/"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              취소
            </a>
            <button
              type="button"
              onClick={handleNextButtonClick}
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              다음
            </button>
            {selectedDelivery !== null && (
              <>
                <div className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  <IamportPayments
                    delivery={selectedDelivery}
                    pg={"kakaopay.TC0ONETIME"}
                  />
                </div>
                <div className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  <IamportPayments
                    delivery={selectedDelivery}
                    pg={"html5_inicis.INIBillTst"}
                  />
                </div>
              </>
            )}
          </div>
        </>
      ) : null}
    </>
  );
}
