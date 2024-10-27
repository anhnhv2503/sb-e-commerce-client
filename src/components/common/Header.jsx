import { Dialog, DialogPanel, PopoverGroup } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import newLogo from "../../assets/logo.png";
import Logout from "../logout/Logout";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const token = localStorage.getItem("accessToken");
  const nav = useNavigate();

  return (
    <header className="bg-gray-300">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <a onClick={() => nav("/")} className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img alt="" src={newLogo} className="h-8 w-auto cursor-pointer" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <a
            onClick={() => nav("/shop")}
            className="text-sm font-semibold leading-6 text-gray-900 cursor-pointer"
          >
            Cửa Hàng
          </a>
          <a
            onClick={() => nav("/about")}
            className="text-sm font-semibold leading-6 text-gray-900 cursor-pointer"
          >
            Về Chúng Tôi
          </a>
        </PopoverGroup>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end cursor-pointer">
          <a onClick={() => nav("/user/cart")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
          </a>
        </div>

        <div className="hidden lg:flex lg:justify-end">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
              </div>
            </div>
            {token ? (
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-white rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a
                    className="justify-between my-1"
                    onClick={() => nav("/user/profile")}
                  >
                    Thông Tin
                  </a>
                </li>
                <li>
                  <a
                    className="justify-between my-4"
                    onClick={() => nav("/user/my-orders")}
                  >
                    Đơn Hàng của Tôi
                  </a>
                </li>
                <hr />
                <li>
                  <Logout />
                </li>
              </ul>
            ) : (
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-white rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a onClick={() => nav("/login")}>Đăng Nhập</a>
                </li>
                <hr />
                <li>
                  <a onClick={() => nav("/register")}>Đăng Kí</a>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a onClick={() => nav("`/")} className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img alt="" src={newLogo} className="h-8 w-auto" />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <a
                  onClick={() => nav("/shop")}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Cửa Hàng
                </a>
              </div>
              <div className="space-y-2 py-6">
                <a
                  onClick={() => nav("/about")}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Về Chúng Tôi
                </a>
              </div>
              {token ? (
                <ul tabIndex={0} className="z-[1] mt-3 w-52 p-2">
                  <li>
                    <a
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      onClick={() => nav("/user/profile")}
                    >
                      Thông Tin
                    </a>
                  </li>
                  <li>
                    <a
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      onClick={() => nav("/user/my-orders")}
                    >
                      Đơn Hàng Của Tôi
                    </a>
                  </li>
                  <hr />
                  <li>
                    <Logout />
                  </li>
                </ul>
              ) : (
                <ul tabIndex={0} className=" z-[1] mt-3 w-52 p-2 ">
                  <li>
                    <a
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      onClick={() => nav("/login")}
                    >
                      Đăng Nhập
                    </a>
                  </li>
                  <hr />
                  <li>
                    <a
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      onClick={() => nav("/register")}
                    >
                      Đăng Kí
                    </a>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default Header;
