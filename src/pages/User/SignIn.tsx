import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Common/Header";
import axios from "axios";
import { useRecoilState } from "recoil";
import { userState, isLoggedInState } from "../../recoil/atoms/auth";

export default function SignIn() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const navigate = useNavigate();
  // TODO 요청 헤더에 토큰 넣기, 관리자 페이지 블락

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await axios.post(
        "http://localhost:8096/api/login",
        data
      );
      const { username, email, img, token, refreshToken } = response.data;
      localStorage.setItem("token", token); // 로컬 스토리지에 토큰 저장
      localStorage.setItem("email", username); // 로컬 스토리지에 email 저장
      localStorage.setItem("img", img)
      localStorage.setItem("refreshToken", refreshToken); // 로컬 스토리지에 리프레쉬 토큰 저장
      setIsLoggedIn(true);

      alert("로그인에 성공하였습니다.");

      // Redirect to /signin
      navigate("/");

      // Handle successful sign up
    } catch (error: any) {
      console.error("Error signing in:", error.message);
      alert("로그인에 실패하였습니다.");
    }
  };
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      <Header></Header>
      <div className="sm:ml-64 sm:mt-1 mt-32 flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            로그인을 해주세요.
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            action="#"
            method="POST"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                이메일 주소
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  비밀번호
                </label>
                <div className="text-sm">
                  {/* <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    비밀번호를 잊어버리셨나요?
                  </a> */}
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                로그인
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            멤버가 아니신가요?{" "}
            <a
              href="signup"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              지금 회원가입 해주세요.
            </a>
            <span>
              <br />
              간편로그인도 가능합니다!
            </span>
          </p>

          <div className="mt-4 flex justify-center">
            <ul className="flex w-full justify-around">
              <li>
                <a href="http://localhost:8096/oauth2/authorization/google">
                  <i className="google-i">
                    <img src={"/img/google.png"} alt="구글 로그인 이미지"></img>
                  </i>
                </a>
              </li>
              <li>
                <a href="http://localhost:8096/oauth2/authorization/naver">
                  <i className="naver-i">
                    <img
                      src={"/img/naver.png"}
                      alt="네이버 로그인 이미지"
                    ></img>
                  </i>
                </a>
              </li>
              <li>
                <a href="http://localhost:8096/oauth2/authorization/kakao">
                  <i className="kakao-i">
                    <img src={"/img/kko.png"} alt="카카오 로그인 이미지"></img>
                  </i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
