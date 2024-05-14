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
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Admin() {
  // const [isAdmin, setIsAdmin] = useState(false); // null로 초기화, 아직 확인 전
  const navigate = useNavigate();

  const getAdminStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/api/admin/login`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      // 성공적인 응답이 오면 관리자로 판단
      if (response.status === 200) {
        // setIsAdmin(true);
        localStorage.setItem("isAdmin", "true");
        navigate("/admin");
      }
    } catch (error: any) {
      if (error.response) {
        // 403 Forbidden 응답이 오면 관리자가 아니라고 판단
        // setIsAdmin(false);
        localStorage.setItem("isAdmin", "false");
      }
    }
  };

  return (
    <>
      <Header></Header>

      <div className="sm:ml-64 sm:mt-1 mt-20 space-y-12 pr-12">
        <div className="mx-auto px-4 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
          <h2 className="text-base mt-10 font-semibold leading-7 text-gray-900">
            관리자
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            쇼핑몰을 관리할 수 있습니다.
          </p>
          <button type="button" onClick={getAdminStatus}>
            관리자 로그인
          </button>
        </div>
      </div>
    </>
  );
}
