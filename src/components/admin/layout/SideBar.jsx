import Logout from "@/components/logout/Logout";
import React, { useState } from "react";

const SideBar = () => {
  return (
    <>
      {/* Sidebar */}
      <div
        className={`w-64 bg-gray-800 text-white transition-all duration-300 h-full`}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <label className={`block text-lg font-semibold text-gray-200`}>
            ADMIN PANEL
          </label>
          <button className="text-gray-200 focus:outline-none">☰</button>
        </div>
        <ul className="mt-6">
          <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
            <a href="/admin">
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
                  d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
            </a>
          </li>
          <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
            <a href="/admin/dashboard">Dashboard</a>
          </li>
          <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
            <a href="/admin">Products</a>
          </li>
          <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
            <a href="/admin">User</a>
          </li>
          <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
            <a href="/admin">F3</a>
          </li>
          <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
            <a href="/admin">F4</a>
          </li>
        </ul>
        <div className="flex items-center justify-between px-4 py-3">
          <Logout />
        </div>
      </div>
    </>
  );
};

export default SideBar;
