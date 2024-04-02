interface Delivery {
  deliverId: number;
  userAddress1: string;
  userAddress2: string;
  userAddress3: string;
}

import React, { useState, useEffect, useCallback } from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import Header from "../Common/Header";
import Addr from "./Addr";
import axios from "axios";
import IamportPayments from "./IamportPayments";
import { useRecoilState } from "recoil";
import { cartState } from "../../recoil/atoms/cart";
//TODO : 배송지가 없을때 예외처리

export default function Delivery() {
  const [deliverys, setDeliverys] = useState<Delivery[]>([]);
  const [cart, setCart] = useRecoilState(cartState);
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(
    null
  );
  const [selectedDeliveryIndex, setSelectedDeliveryIndex] = useState<number>(0);
  // const [selectedDeliveryIndex, setSelectedDeliveryIndex] = useState<
  //   number | null
  // >(null);
  const userYn = localStorage.getItem("email");
  const token = localStorage.getItem("token");

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
        ,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
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
        ,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setDeliverys(response.data);
    } catch (error) {
      console.error("Error fetching delivery data:", error);
    }
  };

  const handleNextButtonClick = () => {
    if (selectedDeliveryIndex !== undefined && selectedDeliveryIndex !== null && deliverys.length > selectedDeliveryIndex) {
      const selectedDelivery = deliverys[selectedDeliveryIndex];
      if (selectedDelivery !== undefined) {
        // Use selectedDelivery here for further processing
        setSelectedDelivery(selectedDelivery); // Assuming setSelectedDelivery is a state updater function
        console.log("Selected delivery:", selectedDelivery);
      } else {
        console.error("Selected delivery is undefined.");
      }
    } else {
      window.alert("배송지를 추가해 주세요~");
      console.error("No delivery selected or index out of bounds.");
    }
  };

  const handleAddressDelete = useCallback(async (deliverId: any) => {
    try {
      const response = await axios.delete(`http://localhost:8096/api/delivery/${deliverId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      handleAddressAdded(); // 상태 업데이트 함수
    } catch (error) {
      console.error("Error deleting delivery data:", error);
    }
  }, []); // 의존성 배열, 여기서는 빈 배열을 사용했습니다. 필요에 따라 업데이트하세요.
  

    // 총 가격을 저장할 변수 초기화
    let totalPrice = 0;

    // 각 상품의 수량과 가격을 곱하고 총 가격에 더함
    cart.forEach((item) => {
      totalPrice += item.pdQuantity * item.pdPrice;
    });

  return (
    <>
      {userYn ? (
        <>
          <Header></Header>

          <Addr onAddressAdded={handleAddressAdded}></Addr>

          <div className="sm:ml-64 2xl:ml-32 mt-20 space-y-12 pr-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                배송지 목록
              </h2>
              <p className="mt-1 mb-5 text-sm leading-6 text-gray-600">
                배송 받을 배송지를 선택해 주세요.
              </p>
              
              {deliverys.map((delivery, index) => (
                <div className="flex justify-between border-b border-gray-900/10 pb-12">
                <div key={index}>
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
                <button type="button" onClick={() => handleAddressDelete(delivery.deliverId)}>제거</button>
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

              <div className="flex overflow-x-auto space-x-4 p-4">
              {cart.map((product) => (
                <div key={product.pdNo} className="flex-none w-60 rounded overflow-hidden shadow-lg">
                  <img className="w-full" src={product.pdImg} alt="Product Image"></img>
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{product.pdName}</div>
                    <p className="text-gray-700 text-base">
                      수량: {product.pdQuantity}
                    </p>
                    <p className="text-gray-700 text-base">
                      가격: {product.pdPrice}
                    </p>
                  </div>
                </div>
              ))}
             
              </div>
              <p className="mt-5">총 구매 가격: {totalPrice}</p>

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
