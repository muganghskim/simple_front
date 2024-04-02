
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import Header from "../Common/Header";
import React, { useState, useEffect } from "react";
import axios from "axios";

// Todo : 패스워드 변경, 회원 탈퇴 기능 추가

interface SupportData {
  supportId: number;
  userEmail: String;
  question: String;
  answer: String;
  stat: String;
  createdAt: String;
  updatedAt: String;
}

export default function Profile() {
  const [previewSrc, setPreviewSrc] = useState<string | null>(null); // 미리보기 이미지 URL
  const [support, setSupport] = useState<SupportData[]>([]);
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
    
    getSupport();
  }, []);

  // "변경" 버튼 클릭 이벤트 핸들러
  const handleButtonClick = () => {
    document.getElementById('photo')?.click();
  };

  // 파일 입력 변경 이벤트 핸들러
  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewSrc(e.target?.result as string); // FileReader 결과를 상태에 저장
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit1 = async (event: any) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("userEmail", event.target.userEmail.value);
    formData.append("userName", event.target.userName.value);
    formData.append("userPhn", event.target.userPhn.value);
    formData.append("file", event.target.file.files[0]);

   

    try {
      const response = await axios.post(
        "http://localhost:8096/api//profile/update",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("프로필 업데이트에 성공하였습니다.");
      console.log(response);

      // Handle successful sign up
    } catch (error: any) {
      console.error("Error :", error.message);
      alert("프로필 업데이트에 실패하였습니다.");
    }
  };


  // 문의 요청
  const handleSubmit3 = async (event: any) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    
    try {
      const response = await axios.post(
        "http://localhost:8096/api/support/add",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("문의 등록에 성공하였습니다.");
      console.log(response);

      getSupport();
      // Handle successful sign up
    } catch (error: any) {
      console.error("Error :", error.message);
      alert("문의등록에 실패하였습니다.");
    }
  };

  const getSupport = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8096/api/support/all/${profileData.userEmail}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setSupport(response.data);
    } catch (error: any) {
      console.error("Error :", error.message);
    }
  }

  return (
    <>
      <Header></Header>
      <form onSubmit={handleSubmit1} encType="multipart/form-data">
        <div className="sm:ml-64 sm:mt-1 mt-20 space-y-12 pr-12">
          <div className="mx-auto px-4 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8 border-b border-gray-900/10 pb-12">
            <h2 className="mt-10 text-base font-semibold leading-7 text-gray-900">프로필</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              당신의 프로필을 업데이트 해주세요
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <input type='text' name='userEmail' hidden value={profileData.userEmail? profileData.userEmail: ""}></input>
              <div className="sm:col-span-4">
                <label
                  htmlFor="userName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  유저 네임
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="userName"
                      id="userName"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="userPhn"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  유저 전화번호
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="userPhn"
                      id="userPhn"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            

              <div className="col-span-full">
                <label htmlFor="file" className="block text-sm font-medium leading-6 text-gray-900">
                  프로필 사진
                </label>
                <input
                  id="file"
                  name="file"
                  type="file"
                  className="sr-only"
                  onChange={handleFileChange}
                />
                <div className="mt-2 flex items-center gap-x-3">
                  {previewSrc ? (
                    <img src={previewSrc} alt="프로필 미리보기" className="h-12 w-12 rounded-full" />
                  ) : (
                    <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true" />
                  )}
                  <button
                    type="button"
                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    onClick={handleButtonClick}
                  >
                    변경
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 mb-5 flex items-center justify-center gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            취소
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            저장
          </button>
        </div>
      </form>

      {/* <form>
        <div className="ml-64 space-y-12 pr-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="mt-10 text-base font-semibold leading-7 text-gray-900">비밀번호 변경</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              비밀번호를 변경할 수 있습니다.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
           
              <div className="sm:col-span-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  기존 비밀번호
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="title"
                      id="title"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  변경할 비밀번호
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="title"
                      id="title"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 mb-5 flex items-center justify-center gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            취소
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            저장
          </button>
        </div>
      </form> */}

      <form onSubmit={handleSubmit3}>
        <div className="sm:ml-64 2xl:ml-32 mt-20 space-y-12 pr-12">
          <div className="mx-auto px-4 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8 border-b border-gray-900/10 pb-12">
            <h2 className="mt-10 text-base font-semibold leading-7 text-gray-900">문의하기</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              지원을 받을 수 있습니다.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
           
            <input id='userEmail' name='userEmail' hidden value={profileData.userEmail? profileData.userEmail: ""}></input>
            <div className="col-span-full">
                <label
                  htmlFor="question"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  문의 내용
                </label>
                <div className="mt-2">
                  <textarea
                    id="question"
                    name="question"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 mb-5 flex items-center justify-center gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            취소
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            저장
          </button>
        </div>
      </form>

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
                          문의 내용
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          답변
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          상태
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          문의한 날짜
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
    </>
  )
}