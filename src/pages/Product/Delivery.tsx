interface Delivery {
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

  useEffect(() => {
    const getAllDeliverys = async () => {
      const response = await axios.get(
        "http://localhost:8096/api/delivery/rhgustmfrh@naver.com"
      );
      setDeliverys(response.data);
    };

    getAllDeliverys();
  }, []);

  const handleAddressAdded = async () => {
    // 주소가 추가되면 Delivery 컴포넌트를 다시 렌더링하기 위해 데이터를 다시 가져옴
    try {
      const response = await axios.get(
        "http://localhost:8096/api/delivery/rhgustmfrh@naver.com"
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
      <Header></Header>
      <Addr onAddressAdded={handleAddressAdded}></Addr>

      <div className="ml-64 space-y-12 pr-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Profile
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            This information will be displayed publicly so be careful what you
            share.
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
                Delivery #{index + 1}
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Address: {delivery.userAddress1}, {delivery.userAddress2},{" "}
                {delivery.userAddress3}
              </p>
            </div>
          ))}
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"></div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Notifications
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            We'll always let you know about important changes, but you pick what
            else you want to hear about.
          </p>

          <div className="mt-10 space-y-10"></div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          이전
        </button>
        <button
          type="button"
          onClick={handleNextButtonClick}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          다음
        </button>
        {selectedDelivery !== null && (
          <>
            <IamportPayments
              delivery={selectedDelivery}
              pg={"kakaopay.TC0ONETIME"}
            />
            <IamportPayments
              delivery={selectedDelivery}
              pg={"html5_inicis.INIBillTst"}
            />
          </>
        )}
      </div>
    </>
  );
}
