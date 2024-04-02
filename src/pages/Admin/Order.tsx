
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
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

export default function Order() {
  const isAdmin = localStorage.getItem("isAdmin");

  const [order, setOrder] = useState<OrderData[]>([]); // 주문 데이터 상태
  const [loading, setLoading] = useState(true); // 로딩 상태

  const [page, setPage] = useState(0); // 현재 페이지 번호 (0부터 시작)
  const [pageSize, setPageSize] = useState(10); // 페이지 크기
  const [pageGroupStart, setPageGroupStart] = useState(0); // 현재 페이지 그룹의 시작 페이지 번호
  const [show, setShow] = useState(false);
  const [selectedOrderItemId, setSelectedOrderItemId] = useState(null);

  const token = localStorage.getItem("token");

  // 전체 조회 데이터를 로딩
  useEffect(() => {
    fetchAllOrders();
  }, [page]);

  // 전체 조회
  const fetchAllOrders = async () => {
    setLoading(true);
    try {
      // `pageNumber`는 일반적으로 0부터 시작하지만,
      // UI에서 사용자에게 표시하는 페이지 번호는 1부터 시작할 수 있으므로
      // 요청을 보낼 때는 페이지 번호에서 1을 빼줘야 할 수도 있습니다.
      const response = await axios.get(
        `http://localhost:8096/api/admin/orderItemAll`
        , {
          params: { // 여기에 쿼리 파라미터들을 넣어줘야 합니다.
            page: page, // 또는 `pageNumber: page - 1` 이 필요한 경우
            size: pageSize,
            paged: true,
            "sort.sorted": true, // 또는 false
            "sort.unsorted": false, // 또는 true
            unpaged: false,
            'sort': 'createdAt,desc' // 추가적인 정렬 파라미터 예시
          },
          headers: { // 헤더는 여기에
            Authorization: `Bearer ${token}`
          }
        }
      );

      setOrder(response.data.content);
      // 추가적으로, 페이징 정보 처리
      // 예: setTotalPages(response.data.totalPages);
      console.log("response.data", response.data);
    } catch (error) {
      console.error("Error fetching invens:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (orderItemId: any) => {
    setSelectedOrderItemId(orderItemId);
    setShow(true); // 폼을 보여주기 위해
};

  // 주문 상태 변경
  const handleChangeOrderStat = async (event: any) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost:8096/api/admin/orderItemUpdate",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("주문 상태 변경에 성공하였습니다.");
      console.log(response);

      fetchAllOrders();
      setShow(false);
      // Handle successful sign up
    } catch (error: any) {
      console.error("Error :", error.message);
      alert("주문 상태 변경에 실패하였습니다.");
    }
  };

  // 다음 버튼 페이지 그룹 업데이트 핸들러
  const handleNextPageGroup = () => {
    const newStart = pageGroupStart + pageSize;
    setPageGroupStart(newStart);
    setPage(newStart); // 현재 페이지도 그룹의 첫 번째 페이지로 설정
  };

  // 이전 버튼 페이지 그룹 업데이트 핸들러
  const handlePreviousPageGroup = () => {
    const newStart = Math.max(pageGroupStart - pageSize, 0); // 0 이하로 내려가지 않도록
    setPageGroupStart(newStart);
    setPage(newStart + pageSize - 1); // 페이지 그룹의 마지막 페이지로 이동
  };



  

  // 관리자 여부에 따라 다른 컴포넌트 렌더링
  if (isAdmin === "false" || isAdmin === null) {
    // 관리자가 아닌 경우
    // 리다이렉트하거나 관리자가 아니라는 메시지를 표시
    window.location.href = "/signin"; // 로그인 페이지로 리다이렉트
    // 리다이렉트하는 경우 아래 리턴문은 필요 없지만, 예시를 위해 포함
    return <div>관리자만 접근 가능합니다.</div>;
  }

  return (
    <>
      <Header></Header>
      <div className="sm:ml-64 2xl:ml-32 mt-20 space-y-12 pr-12">
        <div className="mx-auto px-4 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8 border-b border-gray-900/10 pb-12">
          <h2 className="text-base mt-10 font-semibold leading-7 text-gray-900">
            주문 관리
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            쇼핑몰을 이용하면서 생기는 주문을 조회할 수 있습니다.
          </p>

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
                          orderItem ID
                        </th>
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
                          유저 이메일
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          주소
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          주문 상태
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          주문 날짜
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          상태 변경 날짜
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          상태 변경 하기
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.slice().reverse().map((s) => (
                        <tr key={s.orderItemId}>
                          <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                            {s.orderItemId}
                          </td>
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
                            {s.userEmail}
                          </td>
                          <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                            {s.address1} , {s.address2} , {s.address3}
                          </td>
                          <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                            {s.tidStat}
                          </td>
                          <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                            {s.createdAt}
                          </td>
                          <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                            {s.updatedAt}
                          </td>
                          <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                          <button type="button" onClick={() => handleAnswer(s.orderItemId)}>상태변경하기</button>
                          {show && selectedOrderItemId === s.orderItemId && (
                                <form onSubmit={handleChangeOrderStat} className="fixed inset-0 z-10 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                                <div className="relative w-auto max-w-md p-6 my-8 mx-auto bg-white rounded-lg shadow-lg">
                                    <div className="text-center">
                                    <h3 className="text-lg font-semibold leading-6 text-gray-900">
                                        주문의 상태를 변경 해주세요.
                                    </h3>
                                    </div>
                                    <div className="mt-4">
                                    <input type="hidden" name="orderItemId" value={s.orderItemId} />
                                    <input
                                        type="text"
                                        name="stat"
                                        placeholder="주문 상태 적는 곳"
                                        defaultValue={""}
                                    />
                                    </div>
                                    <div className="mt-4 text-center">
                                    <button
                                        type="submit"
                                        className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                                    >
                                        변경
                                    </button>
                                    </div>
                                </div>
                                </form>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              
              </>
            )}
          </div>
          <div className="flex mt-10 items-center space-x-2">
                    {/* 이전 버튼 */}
                    <button
                      disabled={pageGroupStart <= 0} // 첫 번째 페이지 그룹에서는 비활성화
                      className={`px-4 py-2 text-sm font-medium rounded-md ${
                        pageGroupStart > 0 ? 'bg-gray-200 text-gray-800' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                      onClick={handlePreviousPageGroup}
                    >
                      이전
                    </button>

                    {/* 페이지 번호 버튼 */}
                    {Array.from({ length: pageSize }, (_, i) => pageGroupStart + i + 1).map((pageNum) => (
                      <button
                        key={pageNum}
                        className={`px-4 py-2 text-sm font-medium rounded-md ${
                          page === pageNum - 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                        }`}
                        onClick={(e) => setPage(pageNum - 1)}
                      >
                        {pageNum}
                      </button>
                    ))}

                    {/* 다음 버튼 */}
                    <button
                      className="px-4 py-2 text-sm font-medium rounded-md bg-gray-200 text-gray-800"
                      onClick={handleNextPageGroup}
                    >
                      다음
                    </button>
                  </div>
        </div>
      </div>
    </>
  );
}
