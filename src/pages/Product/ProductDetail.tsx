import { useState, useEffect, Fragment } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import { Transition } from "@headlessui/react";
import { useParams, Link } from "react-router-dom";
import Header from "../Common/Header";
// import IamportPayment from "./IamportPayment";
import Cart from "./Cart";
import axios from "axios";
import { useRecoilState } from "recoil";
import { cartState } from "../../recoil/atoms/cart";
// import { isOpenState } from "../../recoil/atoms/cart";

interface Product {
  pdNo: number;
  pdName: string;
  categoryId: String;
  subcategoryId: String;
  pdDetail: string;
  pdPrice: number;
  pdStat: string;
  pdSize: string;
  pdImg: string;
  pdQuantity: number;
}

// const product = {
//   name: "Basic Tee 6-Pack",
//   price: "192",
//   href: "#",
//   breadcrumbs: [
//     { id: 1, name: "Men", href: "#" },
//     { id: 2, name: "Clothing", href: "#" }
//   ],
//   images: [
//     {
//       src: "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
//       alt: "Two each of gray, white, and black shirts laying flat."
//     },
//     {
//       src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
//       alt: "Model wearing plain black basic tee."
//     },
//     {
//       src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
//       alt: "Model wearing plain gray basic tee."
//     },
//     {
//       src: "https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
//       alt: "Model wearing plain white basic tee."
//     }
//   ],
//   colors: [
//     { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
//     { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
//     { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" }
//   ],
//   sizes: [
//     { name: "XXS", inStock: false },
//     { name: "XS", inStock: true },
//     { name: "S", inStock: true },
//     { name: "M", inStock: true },
//     { name: "L", inStock: true },
//     { name: "XL", inStock: true },
//     { name: "2XL", inStock: true },
//     { name: "3XL", inStock: true }
//   ],
//   description:
//     'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
//   highlights: [
//     "Hand cut and sewn locally",
//     "Dyed with our proprietary colors",
//     "Pre-washed & pre-shrunk",
//     "Ultra-soft 100% cotton"
//   ],
//   details:
//     'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.'
// };

const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetail() {
  const { id } = useParams(); // 동적으로 전달된 id 값 가져오기
  const [product, setProduct] = useState<Product | null>(null);
  // const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  // const [selectedSize, setSelectedSize] = useState(product.sizes[2]);
  const [open, setOpen] = useState(false); // 초기 상태를 false로 설정하여 카트가 보이지 않게 합니다.
  const [cart, setCart] = useRecoilState(cartState);
  // const [user, setUser] = useState<String | null>(null);
  // const [open, setOpen] = useRecoilState(isOpenState);
  const userYn = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  console.log("email", userYn);

  const productData = {
    pdNo: product?.pdNo,
    quantity: 1,
    userEmail: userYn
  };

  useEffect(() => {
    const getProduct = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/api/products/${id}`
      );
      setProduct(response.data);
    };
    getProduct();
    console.log("userYn", userYn);
  }, []);

  // 닫기 이벤트 핸들러 정의
  const handleClose = () => {
    setOpen(false);
  };

  const getCart = async () => {
    const responseCart = await axios.get(
      `${import.meta.env.VITE_APP_API_URL}/api/cart/${productData.userEmail}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    setCart(responseCart.data);
  };

  const handleCreateItem = async () => {
    const responseSave = await axios.post(
      `${import.meta.env.VITE_APP_API_URL}/api/cart/create`,
      productData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  };

  // 클릭 이벤트 핸들러
  const handleCartClick = async () => {
    if (userYn === null) {
      // userYn이 null일 때 경고창 표시
      alert("로그인이 필요합니다.");
      // 추가적으로 로그인 페이지로 리다이렉트할 수 있습니다.
      window.location.href = "/signin";
    }
    await handleCreateItem();
    // 아이템 추가가 성공적으로 완료된 후 UI 상태 업데이트
    setOpen((prevOpen) => !prevOpen);
    // 장바구니 데이터 업데이트를 위한 함수 호출
    getCart();
  };
  
  if (!product) {
    
    return <>
    <Header></Header>
    <div className="ml-64 bg-white">Loading...</div>
    </> // 상품 데이터가 아직 없는 경우 로딩 표시
  }

  return (
    <>
      <Header></Header>
      <div className="sm:ml-64 2xl:ml-32 mt-20 bg-white">
        <div className="pt-6">
          <nav aria-label="Breadcrumb">
            <ol
              role="list"
              className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
            >
              <li>
                <div className="flex items-center">
                  <a
                    // href={breadcrumb.href}
                    className="mr-2 text-sm font-medium text-gray-900"
                  >
                    {product.categoryId}
                  </a>
                  <svg
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <a
                    // href={breadcrumb.href}
                    className="mr-2 text-sm font-medium text-gray-900"
                  >
                    {product.subcategoryId}
                  </a>
                  <svg
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>

              <li className="text-sm">
                <a
                  // href={product.href}
                  aria-current="page"
                  className="font-medium text-gray-500 hover:text-gray-600"
                >
                  {product.pdName}
                </a>
              </li>
            </ol>
          </nav>

          {/* Image gallery */}
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
              <img
                src={product.pdImg}
                alt={product.pdName}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
              <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                <img
                  src={product.pdImg}
                  alt={product.pdName}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                <img
                  src={product.pdImg}
                  alt={product.pdName}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
            <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
              <img
                src={product.pdImg}
                alt={product.pdName}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          {/* Product info */}
          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {product.pdName}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">
                {product.pdPrice}
              </p>

              {/* Reviews */}
              {/* <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          reviews.average > rating
                            ? "text-gray-900"
                            : "text-gray-200",
                          "h-5 w-5 flex-shrink-0"
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="sr-only">{reviews.average} out of 5 stars</p>
                  <a
                    href={reviews.href}
                    className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    {reviews.totalCount} reviews
                  </a>
                </div>
              </div> */}

              <form className="mt-10">
                {/* Colors */}
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">상태</h3>
                  <p className="text-2xl tracking-tight text-gray-900">
                    {product.pdStat}
                  </p>

                  {/* <RadioGroup
                    // value={selectedColor}
                    // onChange={setSelectedColor}
                    className="mt-4"
                  >
                    <RadioGroup.Label className="sr-only">
                      Choose a color
                    </RadioGroup.Label>
                    <div className="flex items-center space-x-3">
                      {product.colors.map((color) => (
                        <RadioGroup.Option
                          key={color.name}
                          value={color}
                          className={({ active, checked }) =>
                            classNames(
                              color.selectedClass,
                              active && checked ? "ring ring-offset-1" : "",
                              !active && checked ? "ring-2" : "",
                              "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                            )
                          }
                        >
                          <RadioGroup.Label as="span" className="sr-only">
                            {color.name}
                          </RadioGroup.Label>
                          <span
                            aria-hidden="true"
                            className={classNames(
                              color.class,
                              "h-8 w-8 rounded-full border border-black border-opacity-10"
                            )}
                          />
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup> */}
                </div>

                {/* Sizes */}
                <div className="mt-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">
                      사이즈
                    </h3>
                    <p className="text-2xl tracking-tight text-gray-900">
                      {product.pdSize}
                    </p>
                    {/* <a
                      href="#"
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Size guide
                    </a> */}
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">
                      제품 재고
                    </h3>
                    <p className="text-2xl tracking-tight text-gray-900">
                      {product.pdQuantity}
                    </p>
                    {/* <a
                      href="#"
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Size guide
                    </a> */}
                  </div>

                  

                  {/* <RadioGroup
                    // value={selectedSize}
                    // onChange={setSelectedSize}
                    className="mt-4"
                  >
                    <RadioGroup.Label className="sr-only">
                      Choose a size
                    </RadioGroup.Label>
                    <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                      {product.sizes.map((size) => (
                        <RadioGroup.Option
                          key={size.name}
                          value={size}
                          disabled={!size.inStock}
                          className={({ active }) =>
                            classNames(
                              size.inStock
                                ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                                : "cursor-not-allowed bg-gray-50 text-gray-200",
                              active ? "ring-2 ring-indigo-500" : "",
                              "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                            )
                          }
                        >
                          {({ active, checked }) => (
                            <>
                              <RadioGroup.Label as="span">
                                {size.name}
                              </RadioGroup.Label>
                              {size.inStock ? (
                                <span
                                  className={classNames(
                                    active ? "border" : "border-2",
                                    checked
                                      ? "border-indigo-500"
                                      : "border-transparent",
                                    "pointer-events-none absolute -inset-px rounded-md"
                                  )}
                                  aria-hidden="true"
                                />
                              ) : (
                                <span
                                  aria-hidden="true"
                                  className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                >
                                  <svg
                                    className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                    viewBox="0 0 100 100"
                                    preserveAspectRatio="none"
                                    stroke="currentColor"
                                  >
                                    <line
                                      x1={0}
                                      y1={100}
                                      x2={100}
                                      y2={0}
                                      vectorEffect="non-scaling-stroke"
                                    />
                                  </svg>
                                </span>
                              )}
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup> */}
                </div>

                <button
                  onClick={handleCartClick}
                  disabled={product.pdQuantity < 1}
                  type="button"
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  장바구니 추가
                </button>
              </form>
              {/* <IamportPayment product={product} pg={"kakaopay.TC0ONETIME"} />
              <IamportPayment
                product={product}
                pg={"html5_inicis.INIBillTst"}
              /> */}
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                {/* <div className="space-y-6">
                  <p className="text-base text-gray-900">{product.pdDetail}</p>
                </div> */}
              </div>

              <div className="mt-10">
                {/* <h3 className="text-sm font-medium text-gray-900">
                  Highlights
                </h3> */}

                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    {/* {product.highlights.map((highlight) => (
                      <li key={highlight} className="text-gray-400">
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))} */}
                  </ul>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">제품 상세</h2>

                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">{product.pdDetail}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {open && (
        <Cart
          cart={cart}
          isOpen={open}
          onClose={handleClose}
          product={product}
        ></Cart>
      )}
    </>
  );
}
