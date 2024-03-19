
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import Header from "../Common/Header";
import React, { useState, useEffect } from "react";
import axios from "axios";

interface Inven {
  invenId: number;
  pdName: String;
  quantity: number;
  stockType: String;
  createdAt: String;
}

export default function Inven() {
  const isAdmin = localStorage.getItem("isAdmin");

  const [invens, setInvens] = useState<Inven[]>([]); // 수익 데이터 상태
  const [loading, setLoading] = useState(true); // 로딩 상태

  const [page, setPage] = useState(0); // 현재 페이지 번호 (0부터 시작)
  const [pageSize, setPageSize] = useState(10); // 페이지 크기

  const token = localStorage.getItem("token");

  // 전체 조회 데이터를 로딩
  useEffect(() => {
    fetchAllInvens();
  }, []);

  // 전체 조회
  const fetchAllInvens = async () => {
    setLoading(true);
    try {
      // `pageNumber`는 일반적으로 0부터 시작하지만,
      // UI에서 사용자에게 표시하는 페이지 번호는 1부터 시작할 수 있으므로
      // 요청을 보낼 때는 페이지 번호에서 1을 빼줘야 할 수도 있습니다.
      const params = {
        page: page, // 또는 `page: page - 1` 이 필요한 경우
        size: pageSize,
        paged: true,
        "sort.sorted": true, // 또는 false, 정렬 여부
        "sort.unsorted": false, // 또는 true, 정렬하지 않을 여부
        unpaged: false, // 페이지네이션을 사용하지 않는 경우 true
        // 추가적인 정렬 파라미터 예시: 'sort': 'createdAt,desc'
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const response = await axios.get(
        `http://localhost:8096/admin/inven/all`,
        params
      );

      setInvens(response.data.content);
      // 추가적으로, 페이징 정보 처리
      // 예: setTotalPages(response.data.totalPages);
      console.log("response.data", response.data);
    } catch (error) {
      console.error("Error fetching invens:", error);
    } finally {
      setLoading(false);
    }
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
      <div className="ml-64 space-y-12 pr-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base mt-5 font-semibold leading-7 text-gray-900">
            재고 관리
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            쇼핑몰을 이용하면서 생기는 재고를 조회할 수 있습니다.
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
                          Inven ID
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Product Name
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Created At
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          StockType
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Quantity
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {invens.map((inven) => (
                        <tr key={inven.invenId}>
                          <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                            {inven.invenId}
                          </td>
                          <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                            {inven.pdName}
                          </td>
                          <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                            {inven.createdAt}
                          </td>
                          <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                            {inven.stockType}
                          </td>
                          <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                            {inven.quantity}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* <div className="sm:col-span-4">
                  <button
                    onClick={() =>
                      setPage((prevPage) => Math.max(prevPage - 1, 0))
                    }
                    disabled={page === 0}
                    className="px-4 py-2 border rounded-md"
                  >
                    Prev
                  </button>
                  <span>Page {page + 1}</span>
                  <button
                    onClick={() => setPage((prevPage) => prevPage + 1)}
                    className="px-4 py-2 border rounded-md"
                  >
                    Next
                  </button>
                </div> */}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
