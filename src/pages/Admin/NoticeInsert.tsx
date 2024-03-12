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

export default function NoticeInsert() {
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("userEmail", event.target.userEmail.value);
    formData.append("pdName", event.target.pdName.value);
    formData.append("categoryName", event.target.categoryName.value);
    formData.append("pdDetail", event.target.pdDetail.value);
    formData.append("pdPrice", event.target.pdPrice.value);
    formData.append("pdStat", event.target.pdStat.value);
    formData.append("pdSize", event.target.pdSize.value);
    formData.append("pdQuantity", event.target.pdQuantity.value);
    formData.append("subCategoryName", event.target.subCategoryName.value);
    formData.append("file", event.target.file.files[0]);

    try {
      const response = await axios.post(
        "http://localhost:8096/api/registerProduct",
        formData
        // {
        //   headers: {
        //     "Content-Type": "multipart/form-data"
        //   }
        // }
      );

      alert("상품 등록에 성공하였습니다.");
      console.log(response);

      // Handle successful sign up
    } catch (error: any) {
      console.error("Error :", error.message);
      alert("상품 등록에 실패하였습니다.");
    }
  };
  return (
    <>
      <Header></Header>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="ml-64 space-y-12 pr-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base mt-5 font-semibold leading-7 text-gray-900">
              상품
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              상품을 추가할 수 있습니다.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="pdName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  상품 이름
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="pdName"
                      id="pdName"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="pdPrice"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  상품 가격
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="number"
                      name="pdPrice"
                      id="pdPrice"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="pdQuantity"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  상품 수량
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="number"
                      name="pdQuantity"
                      id="pdQuantity"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="pdSize"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  상품 사이즈
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="pdSize"
                      id="pdSize"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="pdStat"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  상품 상태
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="pdStat"
                      id="pdStat"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="pdDetail"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  상품 상세 설명
                </label>
                <div className="mt-2">
                  <textarea
                    id="pdDetail"
                    name="pdDetail"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="userEmail"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  관리자 유저 이메일
                </label>
                <div className="mt-2">
                  <input
                    id="userEmail"
                    name="userEmail"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="categoryName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  카테고리 (*카테고리 추가를 먼저 해주세요)
                </label>
                <div className="mt-2">
                  <select
                    id="categoryName"
                    name="categoryName"
                    // autoComplete="category-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value="man">Men's Fashion</option>
                    <option value="woman">Women's Fashion</option>
                    <option value="electronics">Electronics</option>
                    <option value="home_kitchen">Home & Kitchen</option>
                    <option value="beauty_health">Beauty & Health</option>
                    <option value="sports_outdoors">Sports & Outdoors</option>
                    <option value="toys_children">Toys & Children</option>
                    <option value="books">Books</option>
                    <option value="movies_music_games">
                      Movies, Music & Games
                    </option>
                    <option value="grocery">Grocery</option>
                    <option value="pets">Pets</option>
                    <option value="automotive">Automotive</option>
                    <option value="garden_outdoors">Garden & Outdoors</option>
                    <option value="office_supplies">Office Supplies</option>
                    <option value="handmade">Handmade</option>
                    <option value="vintage">Vintage</option>
                    <option value="fitness">Fitness</option>
                    <option value="travel">Travel</option>
                    <option value="luxury">Luxury</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="subCategoryName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  세부 카테고리 (*세부 카테고리 추가를 먼저 해주세요)
                </label>
                <div className="mt-2">
                  <select
                    id="subCategoryName"
                    name="subCategoryName"
                    // autoComplete="subcategory-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value="clothing">Clothing</option>
                    <option value="footwear">Footwear</option>
                    <option value="outerwear">Outerwear</option>
                    <option value="activewear">Activewear</option>
                    <option value="formalwear">Formalwear</option>
                    <option value="casualwear">Casualwear</option>
                    <option value="accessories">Accessories</option>
                    <option value="underwear">Underwear & Sleepwear</option>
                    <option value="swimwear">Swimwear</option>
                    <option value="maternity">Maternity</option>
                    <option value="plusSize">Plus Size</option>
                    <option value="petite">Petite</option>
                    <option value="tall">Tall</option>
                    <option value="sustainable">Sustainable Fashion</option>
                    <option value="vintage">Vintage & Second-Hand</option>
                  </select>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  상품 이미지
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon
                      className="mx-auto h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file"
                          name="file"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
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
      </form>
    </>
  );
}
