import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import Header from "../Common/Header";
import axios from "axios";

export default function CategoryInsert() {
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    const token = localStorage.getItem("token");

    console.log(data);

    try {
      const response = await axios.post(
        "http://localhost:8096/admin/registerCategory",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("카테고리 설정에 성공하였습니다.");

      // Handle successful sign up
    } catch (error: any) {
      console.error("Error :", error.message);
      alert("카테고리 설정에 실패하였습니다.");
    }
  };
  return (
    <>
      <Header></Header>
      <form onSubmit={handleSubmit}>
        <div className="ml-64 space-y-12 pr-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base mt-5 font-semibold leading-7 text-gray-900">
              카테고리
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              품목의 카테고리를 추가할 수 있습니다.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              {/* 여기서 끊음 */}

              <div className="sm:col-span-3">
                <label
                  htmlFor="categoryName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  카테고리
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
                  세부카테고리
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

              {/* 여기서 끊음 */}
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-x-6">
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
