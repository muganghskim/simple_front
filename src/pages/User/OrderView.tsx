
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import Header from "../Common/Header";
import React, { useState, useEffect } from "react";
import axios from "axios";


interface OrderData {
    orderItemId: number;
    quantity: number;
    price: number;
    userEmail: String;
    pdName: String;
    address1: String;
    address2: String;
    address3: String;
    tidStat: String;
    createdAt: String;
    updatedAt: String;
  }

export default function OrderView() {
  const [order, setOrder] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(true); // 로딩 상태

  const userYn = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  const profileData = {
    userEmail: userYn
  };

  if (userYn === null) {
    // userYn이 null일 때 경고창 표시
    alert("로그인이 필요합니다.");
    // 추가적으로 로그인 페이지로 리다이렉트할 수 있습니다.
    window.location.href = "/signin";
  }

  useEffect(() => {
    
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8096/api/orderItem/all/${profileData.userEmail}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setOrder(response.data);
    } catch (error: any) {
      console.error("Error :", error.message);
    }
  }

  return (
    <>
      <Header></Header>
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {/* 데이터 로딩 및 테이블 렌더링 */}
            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                <div className="sm:col-span-4">
                  <table className="min-w-full leading-normal">
                    <thead>
                      <tr>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          상품 이름
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          수량
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          가격
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          배송지
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          상태
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          주문일
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.slice().reverse().map((s) => (
                        <tr key={s.orderItemId}>
                          <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                            {s.pdName}
                          </td>
                          <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                            {s.quantity}
                          </td>
                          <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                            {s.price}
                          </td>
                          <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                            {s.address1},  {s.address2},  {s.address3}
                          </td>
                          <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                            {s.tidStat}
                          </td>
                          <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                            {s.createdAt}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
    </>
  )
}