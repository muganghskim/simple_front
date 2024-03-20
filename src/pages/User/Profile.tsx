
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import Header from "../Common/Header";
import React, { useState, useEffect } from "react";

// Todo : 패스워드 변경, 회원 탈퇴 기능 추가

export default function Profile() {
  const [previewSrc, setPreviewSrc] = useState<string | null>(null); // 미리보기 이미지 URL

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

  return (
    <>
      <Header></Header>
      <form>
        <div className="ml-64 space-y-12 pr-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="mt-10 text-base font-semibold leading-7 text-gray-900">프로필</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              당신의 프로필을 업데이트 해주세요
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
           
              <div className="sm:col-span-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  유저 네임
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
                  유저 전화번호
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
            

              <div className="col-span-full">
                <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                  프로필 사진
                </label>
                <input
                  id="photo"
                  name="photo"
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
    </>
  )
}