/*
  This example requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import React, { useState, useEffect } from "react";
import Header from "../Common/Header";
import axios from "axios";

export default function Admin() {
  const [isAdmin, setIsAdmin] = useState(false); // null로 초기화, 아직 확인 전

  useEffect(() => {
    const getAdminStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:8096/api/admin/login",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        // 성공적인 응답이 오면 관리자로 판단
        if (response.status === 200) {
          setIsAdmin(true);
        }
      } catch (error: any) {
        if (error.response && error.response.status === 403) {
          // 403 Forbidden 응답이 오면 관리자가 아니라고 판단
          setIsAdmin(false);
        }
      }
    };

    getAdminStatus();
  }, []);

  // 관리자 여부에 따라 다른 컴포넌트 렌더링
  if (isAdmin === null) {
    // 아직 관리자 여부를 확인 중일 때
    return <div>관리자 여부를 확인 중입니다...</div>;
  } else if (!isAdmin) {
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
            관리자
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            쇼핑몰을 관리할 수 있습니다.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <a
                className="block text-sm font-medium leading-6 text-gray-900 hover:underline hover:text-blue-500"
                href="/admin/expense/insert"
              >
                비용 관리
              </a>
            </div>

            <div className="sm:col-span-4">
              <a
                className="block text-sm font-medium leading-6 text-gray-900 hover:underline hover:text-blue-500"
                href="/admin/inven"
              >
                재고 관리
              </a>
            </div>

            <div className="sm:col-span-4">
              <a
                className="block text-sm font-medium leading-6 text-gray-900 hover:underline hover:text-blue-500"
                href="/admin/profit"
              >
                수익 관리
              </a>
            </div>

            <div className="sm:col-span-4">
              <a
                className="block text-sm font-medium leading-6 text-gray-900 hover:underline hover:text-blue-500"
                href="/admin/category/insert"
              >
                카테고리 추가
              </a>
            </div>

            <div className="sm:col-span-4">
              <a
                className="block text-sm font-medium leading-6 text-gray-900 hover:underline hover:text-blue-500"
                href="/admin/product/insert"
              >
                상품 추가
              </a>
            </div>

            <div className="sm:col-span-4">
              <a
                className="block text-sm font-medium leading-6 text-gray-900 hover:underline hover:text-blue-500"
                href="/admin/notice/insert"
              >
                공지사항 추가
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
