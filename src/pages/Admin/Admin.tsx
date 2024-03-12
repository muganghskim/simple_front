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
import Header from "../Common/Header";
import axios from "axios";

export default function Admin() {
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
