import { Fragment, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useRecoilState } from "recoil";
import { cartState } from "../../recoil/atoms/cart";
import axios from "axios";

interface Cart {
  cartId: number;
  pdNo: number;
  pdName: string;
  pdQuantity: number;
  pdPrice: number;
  pdImg: string;
}

interface UpdateCart {
  cartId: number;
  quantity: number;
}

// let products = [
//   {
//     id: 3,
//     name: "Throwback Hip Bag",
//     href: "#",
//     color: "Salmon",
//     price: "$90.00",
//     quantity: 1,
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
//     imageAlt:
//       "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
//   },
//   {
//     id: 4,
//     name: "Medium Stuff Satchel",
//     href: "#",
//     color: "Blue",
//     price: "$32.00",
//     quantity: 1,
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
//     imageAlt:
//       "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch."
//   }
//   // More products...
// ];

export default function Cart(props: any) {
  // const [open, setOpen] = useRecoilState(isOpenState);
  // const [open, setOpen] = useState(false);
  // let [isOpen, setIsOpen] = useState(true);
  const [cart, setCart] = useRecoilState(cartState);
  const [cartFlag, setCartFlag] = useState(false);
  const { isOpen, onClose, product } = props;

  const userYn = localStorage.getItem("email");

  const productData = {
    // pdNo: product?.pdNo,
    // quantity: 1,
    userEmail: userYn
  };

  if (userYn === null) {
    // userYn이 null일 때 경고창 표시
    alert("로그인이 필요합니다.");
    // 추가적으로 로그인 페이지로 리다이렉트할 수 있습니다.
    window.location.href = "/signin";
  }

  const handleRemoveItem = async (updateCart: UpdateCart) => {
    console.log(updateCart);
    const responseRemove = await axios.post(
      "http://localhost:8096/api/cart/remove",
      updateCart
    );
    setCartFlag(!cartFlag);
    console.log(cartFlag);
    console.log("remove", responseRemove.data);
  };

  useEffect(() => {
    const getCart = async () => {
      const responseCart = await axios.get(
        `http://localhost:8096/api/cart/${productData.userEmail}`
      );
      setCart(responseCart.data);
    };

    getCart();
  }, [cartFlag]);

  console.log("cart", cart);

  // 총 가격을 저장할 변수 초기화
  let totalPrice = 0;

  // 각 상품의 수량과 가격을 곱하고 총 가격에 더함
  cart.forEach((item) => {
    totalPrice += item.pdQuantity * item.pdPrice;
  });

  // 총 가격 출력
  console.log("총 가격:", totalPrice);

  if (!cart) {
    return <div>Loading...</div>; // 상품 데이터가 아직 없는 경우 로딩 표시
  }

  return (
    <>
      {userYn ? (
        <Transition.Root appear={true} show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={onClose}>
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                  <Transition.Child
                    as={Fragment}
                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                  >
                    <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                      <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                          <div className="flex items-start justify-between">
                            <Dialog.Title className="text-lg font-medium text-gray-900">
                              장바구니
                            </Dialog.Title>
                            <div className="ml-3 flex h-7 items-center">
                              <button
                                type="button"
                                className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                onClick={onClose}
                              >
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Close panel</span>
                                <XMarkIcon
                                  className="h-6 w-6"
                                  aria-hidden="true"
                                />
                              </button>
                            </div>
                          </div>

                          <div className="mt-8">
                            <div className="flow-root">
                              <ul
                                role="list"
                                className="-my-6 divide-y divide-gray-200"
                              >
                                {cart.map((product) => (
                                  <li key={product.pdNo} className="flex py-6">
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                      <img
                                        src={product.pdImg}
                                        alt={product.pdName}
                                        className="h-full w-full object-cover object-center"
                                      />
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col">
                                      <div>
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                          <h3>
                                            {/* <a href={product.href}> */}
                                            {product.pdName}
                                            {/* </a> */}
                                          </h3>
                                          <p className="ml-4">
                                            {product.pdPrice}
                                          </p>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-500">
                                          {/* {product.color} */}
                                        </p>
                                      </div>
                                      <div className="flex flex-1 items-end justify-between text-sm">
                                        <p className="text-gray-500">
                                          수량 {product.pdQuantity}
                                        </p>

                                        <div className="flex">
                                          <button
                                            type="button"
                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                            onClick={() =>
                                              // 객체를 생성하여 함수에 전달
                                              handleRemoveItem({
                                                cartId: product.cartId,
                                                quantity: 1
                                              })
                                            } // 클릭 시 해당 상품 삭제 메서드 호출
                                          >
                                            제거
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <p>총 구매 금액</p>
                            <p>{totalPrice}</p>
                          </div>
                          <p className="mt-0.5 text-sm text-gray-500">
                            배달비 및 부가가치세 포함된 금액입니다.
                          </p>
                          <div className="mt-6">
                            <Link
                              to="/delivery"
                              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                            >
                              구매하기
                            </Link>
                          </div>
                          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                            <p>
                              or{" "}
                              <button
                                type="button"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                onClick={onClose}
                              >
                                쇼핑 계속하기
                                <span aria-hidden="true"> &rarr;</span>
                              </button>
                            </p>
                          </div>
                        </div>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      ) : null}
    </>
  );
}
