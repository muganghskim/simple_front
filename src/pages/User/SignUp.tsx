import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Common/Header";
import axios from "axios";
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
export default function SignUp() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
  
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
  
    try {
      const response = await axios.post(
        "http://localhost:8096/api/signup",
        data
      );
  
      alert("회원가입에 성공하였습니다.");
  
      // Redirect to /signin
      navigate("/signin");
  
      // Handle successful sign up
    } catch (error: any) {
      console.error("Error signing up:", error.message);
      if (error.response) {
        switch (error.response.status) {
          case 400:
            alert("잘못된 요청입니다. 입력한 정보를 다시 확인해 주세요.");
            break;
          case 403:
            alert("이메일 인증이 완료되지 않았습니다.");
            break;
          case 409:
            alert("이미 사용 중인 이메일입니다.");
            break;
          default:
            alert("회원가입에 실패하였습니다.");
        }
      } else {
        // 네트워크 에러나 기타 예외적 상황을 처리
        alert("서버에 연결할 수 없습니다. 나중에 다시 시도해주세요.");
      }
    }
  };

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  const handleEmailAuthentication = () => {
    setLoading(true);
    axios
      .post("http://localhost:8096/api/send-verification-email", { email })
      .then((response) => {
        console.log("send Authentication successful", response.data);
        // Hide loading indicator
        setLoading(false);
        // Show email code verification dialog
        setShow(true);
      })
      .catch((error) => {
        console.error("send Authentication failed", error);
        // Hide loading indicator
        setLoading(false);
        // Display an error message to the user or handle the error as needed
        setError(true);
      });
  };

  const handleEmailCodeChange = (event: any) => {
    setCode(event.target.value);
  };

  const handleEmailCodeAuthentication = () => {
    axios
      .post("http://localhost:8096/api/verify-email", { email, code })
      .then((response) => {
        console.log("Authentication successful", response.data);
        alert("인증에 성공하였습니다.");
        setShow(false);
      })
      .catch((error) => {
        console.error("Authentication failed", error);
        alert("인증에 실패하였습니다.");
        setShow(false);
      });
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
      <div className="ml-64 mt-32 flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            회원가입을 해주세요.
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
                  value={email}
                  onChange={handleEmailChange}
                  required
                  className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <button
                className="block text-sm w-[100%] text-right mt-2 font-medium leading-6 text-gray-900"
                type="button"
                onClick={handleEmailAuthentication}
              >
                이메일 인증
              </button>
            </div>

            {/* 이메일 인증 모달 */}
            <div>
              {loading && (
                <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-900 bg-opacity-50">
                  <div className="relative w-20 h-20 border-4 border-t-4 border-gray-200 rounded-full animate-spin"></div>
                </div>
              )}
              {error && <div>Error: Failed to send verification email</div>}
              {show && (
                <div className="fixed inset-0 z-10 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                  <div className="relative w-auto max-w-md p-6 my-8 mx-auto bg-white rounded-lg shadow-lg">
                    <div className="text-center">
                      <h3 className="text-lg font-semibold leading-6 text-gray-900">
                        인증코드를 넣어주세요.
                      </h3>
                    </div>
                    <div className="mt-4">
                      <input
                        type="text"
                        placeholder="Enter verification code"
                        value={code}
                        onChange={handleEmailCodeChange}
                      />
                    </div>
                    <div className="mt-4 text-center">
                      <button
                        type="button"
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                        onClick={handleEmailCodeAuthentication}
                      >
                        승인
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  패스워드
                </label>
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
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                유저 닉네임
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="username"
                  autoComplete="username"
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
                회원 가입
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
