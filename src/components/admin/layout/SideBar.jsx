import Logout from "@/components/logout/Logout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import newLogo from "../../../assets/logo.png";

const SideBar = () => {
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const nav = useNavigate();

  const toggleProductDropdown = () => {
    setIsProductDropdownOpen(!isProductDropdownOpen);
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className={`w-64 bg-purple-500 text-white transition-all duration-300 h-full`}
      >
        <div className="flex items-center justify-center px-4 py-3">
          <img alt="" src={newLogo} className="h-10 w-auto cursor-pointer" />
        </div>
        <ul className="mt-6">
          <li className="px-4 py-2 hover:bg-purple-700 cursor-pointer">
            <a onClick={() => nav("/admin")}>
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
          <li className="px-4 py-2 hover:bg-purple-700 cursor-pointer">
            <a onClick={() => nav("/admin/dashboard")}>Dashboard</a>
          </li>

          <li className="px-4 py-2 hover:bg-purple-700 cursor-pointer">
            <a onClick={() => nav("/admin/manage/category")}>Category</a>
          </li>

          {/* Products Dropdown */}
          <li className="px-4 py-2 cursor-pointer">
            <div
              className="flex items-center justify-between"
              onClick={toggleProductDropdown}
            >
              <a>Products</a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={isProductDropdownOpen ? "M19 9l-7 7-7-7" : "M9 5l7 7-7 7"}
                />
              </svg>
            </div>

            {/* Dropdown Menu */}
            {isProductDropdownOpen && (
              <ul className="ml-4 mt-2">
                <li className="px-4 py-2 hover:bg-purple-700 cursor-pointer">
                  <a onClick={() => nav("/admin/product/add")}>Add Product</a>
                </li>
                <li className="px-4 py-2 hover:bg-purple-700 cursor-pointer">
                  <a onClick={() => nav("/admin/product/list")}>
                    View Products
                  </a>
                </li>
              </ul>
            )}
          </li>

          <li className="px-4 py-2 hover:bg-purple-700 cursor-pointer">
            <a onClick={() => nav("/admin/manage/user")}>User</a>
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
