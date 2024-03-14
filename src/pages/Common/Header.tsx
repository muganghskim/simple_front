import * as React from "react";
import { useRecoilState } from "recoil";
import { userState, isLoggedInState } from "../../recoil/atoms/auth";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import axios from "axios";
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  ArrowRightEndOnRectangleIcon
} from "@heroicons/react/24/outline";
import { useState } from "react";

const nav = [
  {
    id: 1,
    name: "Home",
    href: "/",
    current: false
  },
  {
    id: 2,
    name: "About",
    href: "/about",
    current: false
  },
  {
    id: 3,
    name: "Product",
    href: "/product",
    current: false
  },
  {
    id: 4,
    name: "Notice",
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
  // const [isSignIn, setIsSignIn] = useState(false);
  const logout = async () => {
    try {
      await axios.post("http://localhost:8096/api/logout");

      // 로컬 스토리지에서 토큰 제거
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("email");
      localStorage.removeItem("isAdmin");
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  return (
    <>
      <div className="fixed left-0 top-0">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="mx-auto h-screen max-w-7xl px-2 sm:px-6 lg:px-8">
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
                  <div className="flex flex-1 flex-col items-center justify-center sm:items-stretch sm:justify-start">
                    <div className="flex flex-shrink-0 flex-col items-center my-8">
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                        alt="Your Company"
                      />
                    </div>

                    {/* 로그인, 프로필 부분 */}

                    <div className="mb-10 flex justify-center">
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
                              <img
                                className="h-8 w-8 rounded-full"
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                              />
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
                                  <a
                                    href="/profile"
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    Your Profile
                                  </a>
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
                                  <a
                                    href="/"
                                    onClick={logout}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    Sign out
                                  </a>
                                )}
                              </Menu.Item>
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      ) : (
                        // 로그인 버튼
                        <a href="/signin">
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
                        </a>
                      )}
                    </div>

                    {/* nav 부분 */}

                    <div className="hidden sm:ml-6 sm:block">
                      <div className="flex flex-col mb-10 pr-6">
                        {nav.map((item) => (
                          <a
                            key={item.id}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "rounded-md px-3 py-2 text-sm font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="sm:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2">
                  {nav.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block rounded-md px-3 py-2 text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </>
  );
};

export default Header;
