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
import { Link } from 'react-router-dom';
import axios from "axios";

export default function Admin() {
  // const [isAdmin, setIsAdmin] = useState(false); // null로 초기화, 아직 확인 전
  const isAdmin = localStorage.getItem("isAdmin");

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

      <div className="sm:ml-64 sm:mt-1 mt-20 space-y-12 pr-12">
        <div className="mx-auto px-4 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8 border-b border-gray-900/10 pb-12">
          <h2 className="text-base mt-10 font-semibold leading-7 text-gray-900">
            관리자
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            쇼핑몰을 관리할 수 있습니다.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <Link
                className="block text-sm font-medium leading-6 text-gray-900 hover:underline hover:text-blue-500"
                to="/admin/expense/insert"
              >
                비용 관리
              </Link>
            </div>

            <div className="sm:col-span-4">
              <Link
                className="block text-sm font-medium leading-6 text-gray-900 hover:underline hover:text-blue-500"
                to="/admin/order"
              >
                주문 관리
              </Link>
            </div>

            <div className="sm:col-span-4">
              <Link
                className="block text-sm font-medium leading-6 text-gray-900 hover:underline hover:text-blue-500"
                to="/admin/inven"
              >
                재고 관리
              </Link>
            </div>

            <div className="sm:col-span-4">
              <Link
                className="block text-sm font-medium leading-6 text-gray-900 hover:underline hover:text-blue-500"
                to="/admin/profit"
              >
                수익 관리
              </Link>
            </div>

            <div className="sm:col-span-4">
              <Link
                className="block text-sm font-medium leading-6 text-gray-900 hover:underline hover:text-blue-500"
                to="/admin/category/insert"
              >
                카테고리 추가
              </Link>
            </div>

            <div className="sm:col-span-4">
              <Link
                className="block text-sm font-medium leading-6 text-gray-900 hover:underline hover:text-blue-500"
                to="/admin/product/insert"
              >
                상품 추가
              </Link>
            </div>

            <div className="sm:col-span-4">
              <Link
                className="block text-sm font-medium leading-6 text-gray-900 hover:underline hover:text-blue-500"
                to="/admin/notice/insert"
              >
                공지사항 추가
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
