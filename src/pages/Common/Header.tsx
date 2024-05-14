import * as React from "react";
import { useRecoilState } from "recoil";
import { userState, isLoggedInState } from "../../recoil/atoms/auth";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom';
import axios from "axios";
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  ArrowRightEndOnRectangleIcon
} from "@heroicons/react/24/outline";
import { useState } from "react";
import Footer from "../Common/Footer";

const nav = [
  {
    id: 1,
    name: "소개",
    href: "/",
    current: false
  },
  {
    id: 2,
    name: "마일스톤",
    href: "/about",
    current: false
  },
  {
    id: 3,
    name: "쇼핑몰",
    href: "/product",
    current: false
  },
  {
    id: 4,
    name: "공지사항",
    href: "/notice",
    current: false
  }
  // More products...
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  console.log("is login?", isLoggedIn);
  const img = localStorage.getItem("img");
  // const [isSignIn, setIsSignIn] = useState(false);
  const logout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_APP_API_URL}/api/logout`);

      // 로컬 스토리지에서 토큰 제거
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("email");
      localStorage.removeItem("img");
      localStorage.removeItem("isAdmin");
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  return (
    <>
      <div className="fixed sm:w-48 w-full left-0 top-0">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="mx-auto sm:h-screen max-w-7xl px-2 sm:px-8">
                <div className="relative flex flex-col h-16 items-center justify-between">
                  <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    {/* Mobile menu button*/}

                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                  <div className="flex flex-1 sm:flex-col sm:ml-0 ml-60 sm:mt-0 mt-4 items-center justify-center sm:items-stretch sm:justify-start">
                    <div className="flex-shrink-0 hidden sm:block flex-col items-center sm:flex sm:justify-center my-8">
                      <img
                        className="h-32 w-auto"
                        src="/img/logo_remove.png"
                        alt="Your Company"
                      />
                    </div>

                    {/* 로그인, 프로필 부분 */}

                    <div className="mb-10 flex mr-20 sm:mr-0 justify-center">
                      <button
                        type="button"
                        className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>

                      {isLoggedIn ? (
                        <Menu as="div" className="relative ml-3">
                          <div>
                            <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                              <span className="absolute -inset-1.5" />
                              <span className="sr-only">Open user menu</span>
                              {img ? (
                                <img src={img} alt="유저 프로필 사진" className="h-8 w-8 rounded-full" />
                              ) : (
                                <UserCircleIcon className="h-8 w-8 rounded-full text-gray-300" aria-hidden="true" />
                              )}
                            </Menu.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute left-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              <Menu.Item>
                                {({ active }) => (
                                  <Link
                                    to="/profile"
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    프로필
                                  </Link>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <Link
                                    to="/orderview"
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    주문내역
                                  </Link>
                                )}
                              </Menu.Item>
                              {/* <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#"
                                  className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                >
                                  Settings
                                </a>
                              )}
                            </Menu.Item> */}
                              <Menu.Item>
                                {({ active }) => (
                                  <Link
                                    to="/"
                                    onClick={logout}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    로그아웃
                                  </Link>
                                )}
                              </Menu.Item>
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      ) : (
                        // 로그인 버튼
                        <Link to="/signin">
                          <button
                            type="button"
                            className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 ml-2"
                          >
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">View Login</span>
                            <ArrowRightEndOnRectangleIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          </button>
                        </Link>
                      )}
                    </div>



                    

                    {/* nav 부분 */}

                    <div className="hidden sm:ml-6 sm:block">
                      <div className="flex flex-col mb-10 pr-6">
                        {nav.map((item) => (
                          <Link
                            key={item.id}
                            to={item.href}
                            className={classNames(
                              item.current
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "rounded-md px-3 py-2 text-sm font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="sm:hidden w-full">
                <div className="flex px-2 pb-3 pt-2">
                  {nav.map((item) => (
                    // <Disclosure.Button
                    //   key={item.name}
                    //   as="a"
                    //   href={item.href}
                    //   className={classNames(
                    //     item.current
                    //       ? "bg-gray-900 text-white"
                    //       : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    //     "block rounded-md px-3 py-2 text-base font-medium"
                    //   )}
                    //   aria-current={item.current ? "page" : undefined}
                    // >
                    //   {item.name}
                    // </Disclosure.Button>
                    <Link
                    key={item.id}
                    to={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "rounded-md px-3 py-2 text-sm font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Link>
                  ))}
                </div>
              </Disclosure.Panel>
              
            </>
          )}
        </Disclosure>
        <div className="fixed hidden sm:block bottom-10 w-48 flex-col items-center justify-center space-y-4 ">
          <div>
            <p className="text-sm text-center text-gray-500">&copy; 2024 Hide Carbon.<br></br> All rights reserved.</p>
            <p className="text-sm text-center text-gray-500">Made with <span className="text-red-500">&hearts;</span><br></br> by Hs Kim</p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <a href="#" className="text-sm text-gray-500">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-500">Terms of Service</a>
          </div>
        </div>
      </div>
    
    </>
  );
};

export default Header;
