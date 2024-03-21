
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import Header from "../Common/Header";
import React, { useState, useEffect } from "react";
import axios from "axios";

interface SupportData {
    supportId: number;
    userEmail: String;
    question: String;
    answer: String;
    stat: String;
    createdAt: String;
    updatedAt: String;
  }

export default function Support() {
  const isAdmin = localStorage.getItem("isAdmin");

  const [support, setSetSupport] = useState<SupportData[]>([]); // 문의 데이터 상태
  const [loading, setLoading] = useState(true); // 로딩 상태

  const [page, setPage] = useState(0); // 현재 페이지 번호 (0부터 시작)
  const [pageSize, setPageSize] = useState(10); // 페이지 크기
  const [show, setShow] = useState(false);

  const token = localStorage.getItem("token");

  // 전체 조회 데이터를 로딩
  useEffect(() => {
    fetchAllSupports();
  }, []);

  // 전체 조회
  const fetchAllSupports = async () => {
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
        `http://localhost:8096/api/admin/supportAll`,
        params
      );

      setSetSupport(response.data.content);
      // 추가적으로, 페이징 정보 처리
      // 예: setTotalPages(response.data.totalPages);
      console.log("response.data", response.data);
    } catch (error) {
      console.error("Error fetching invens:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = () => {
    setShow(true);
  }

  // 문의 답변
  const handleAnswerSubmit = async (event: any) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost:8096/api/admin/supportUpdate",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("문의 답변에 성공하였습니다.");
      console.log(response);

      fetchAllSupports();
      setShow(false);
      // Handle successful sign up
    } catch (error: any) {
      console.error("Error :", error.message);
      alert("문의답변에 실패하였습니다.");
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
          <h2 className="text-base mt-10 font-semibold leading-7 text-gray-900">
            문의 관리
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            쇼핑몰을 이용하면서 생기는 문의를 조회할 수 있습니다.
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
                          Support ID
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          유저 이메일
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          문의 내용
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          문의 답변
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          상태
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          문의 날짜
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          답변 날짜
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {support.slice().reverse().map((s) => (
                        <tr key={s.supportId}>
                          <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                            {s.supportId}
                          </td>
                          <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                            {s.userEmail}
                          </td>
                          <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                            {s.question}
                          </td>
                          <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                            {s.answer}
                          </td>
                          <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                            {s.stat}
                          </td>
                          <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                            {s.createdAt}
                          </td>
                          <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                            {s.updatedAt}
                          </td>
                          <button type="button" onClick={handleAnswer}>답변하기</button>
                          {show && (
                                <form onSubmit={handleAnswerSubmit} className="fixed inset-0 z-10 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                                <div className="relative w-auto max-w-md p-6 my-8 mx-auto bg-white rounded-lg shadow-lg">
                                    <div className="text-center">
                                    <h3 className="text-lg font-semibold leading-6 text-gray-900">
                                        답변을 해주세요.
                                    </h3>
                                    </div>
                                    <div className="mt-4">
                                    <input name="supportId" hidden>{s.supportId}</input>
                                    <input
                                        type="text"
                                        name="answer"
                                        placeholder="답변 적는 곳"
                                        defaultValue={""}
                                    />
                                    </div>
                                    <div className="mt-4 text-center">
                                    <button
                                        type="submit"
                                        className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                                    >
                                        등록
                                    </button>
                                    </div>
                                </div>
                                </form>
                            )}
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
