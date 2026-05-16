import CartIcon from "@/components/common/CartIcon";
import UserPopover from "@/components/common/UserPopover";
import { Transition } from "@headlessui/react";
import { motion } from "framer-motion";
import {
  Home,
  Info,
  Menu as MenuIcon,
  ShoppingBag,
  Store,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import newLogo from "../../assets/logo.png";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll effect for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  const token = localStorage.getItem("accessToken");

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-gray-50 border-b border-gray-200/50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0"
          >
            <button
              onClick={() => navigate("/")}
              className="flex items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3B82F6] focus-visible:outline-offset-4 rounded-lg"
              aria-label="Trang chủ VA Shop"
            >
              <img
                src={newLogo}
                alt="VA Shop Logo"
                className="h-10 w-auto"
              />
            </button>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <button
              onClick={() => navigate("/")}
              className={`px-4 py-3 text-sm font-semibold uppercase tracking-wider transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3B82F6] rounded-lg ${
                isActive("/") 
                  ? "text-[#3B82F6]" 
                  : "text-[#111827] hover:text-[#3B82F6] hover:bg-blue-50/50"
              }`}
            >
              Trang Chủ
            </button>
            <button
              onClick={() => navigate("/shop")}
              className={`px-4 py-3 text-sm font-semibold uppercase tracking-wider transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3B82F6] rounded-lg ${
                isActive("/shop") 
                  ? "text-[#3B82F6]" 
                  : "text-[#111827] hover:text-[#3B82F6] hover:bg-blue-50/50"
              }`}
            >
              Cửa Hàng
            </button>
            <button
              onClick={() => navigate("/about")}
              className={`px-4 py-3 text-sm font-semibold uppercase tracking-wider transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3B82F6] rounded-lg ${
                isActive("/about") 
                  ? "text-[#3B82F6]" 
                  : "text-[#111827] hover:text-[#3B82F6] hover:bg-blue-50/50"
              }`}
            >
              Về Chúng Tôi
            </button>
          </div>

          {/* Right Section: Cart and User */}
          <div className="flex items-center space-x-6">
            {/* Cart Button */}
            {token && (
              <div className="flex items-center h-12 w-12 justify-center">
                <CartIcon />
              </div>
            )}

            {/* User Menu - Desktop */}
            <div className="hidden md:block">
              <UserPopover />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden flex items-center justify-center h-12 w-12 rounded-lg text-[#111827] hover:text-[#3B82F6] hover:bg-blue-50 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3B82F6]"
              aria-label="Mở menu"
            >
              <MenuIcon size={24} />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <Transition
        show={mobileMenuOpen}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      </Transition>

      {/* Mobile Menu Panel */}
      <Transition
        show={mobileMenuOpen}
        enter="transition-transform duration-300"
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leave="transition-transform duration-300"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
      >
        <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white shadow-2xl flex flex-col">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <button
              onClick={() => {
                navigate("/");
                setMobileMenuOpen(false);
              }}
              className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3B82F6] rounded-lg"
              aria-label="Trang chủ VA Shop"
            >
              <img src={newLogo} alt="VA Shop Logo" className="h-8 w-auto" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center h-11 w-11 rounded-full text-gray-500 hover:text-[#111827] hover:bg-gray-100 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3B82F6]"
              aria-label="Đóng menu"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-6 px-4">
            <div className="space-y-2">
              <button
                onClick={() => {
                  navigate("/");
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center w-full px-4 py-4 rounded-xl text-base font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3B82F6] ${
                  isActive("/") 
                    ? "bg-blue-50 text-[#3B82F6]" 
                    : "text-[#111827] hover:bg-gray-50"
                }`}
              >
                <Home size={20} className="mr-4" />
                <span>Trang Chủ</span>
              </button>
              <button
                onClick={() => {
                  navigate("/shop");
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center w-full px-4 py-4 rounded-xl text-base font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3B82F6] ${
                  isActive("/shop") 
                    ? "bg-blue-50 text-[#3B82F6]" 
                    : "text-[#111827] hover:bg-gray-50"
                }`}
              >
                <Store size={20} className="mr-4" />
                <span>Cửa Hàng</span>
              </button>
              <button
                onClick={() => {
                  navigate("/about");
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center w-full px-4 py-4 rounded-xl text-base font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3B82F6] ${
                  isActive("/about") 
                    ? "bg-blue-50 text-[#3B82F6]" 
                    : "text-[#111827] hover:bg-gray-50"
                }`}
              >
                <Info size={20} className="mr-4" />
                <span>Về Chúng Tôi</span>
              </button>
            </div>

            <div className="mt-8 border-t border-gray-100 pt-6">
              <div className="px-4 mb-4">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider font-mono">
                  Tài Khoản
                </p>
              </div>
              
              {token && (
                <button
                  onClick={() => {
                    navigate("/user/cart");
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center w-full px-4 py-4 mb-2 text-[#111827] hover:bg-gray-50 rounded-xl text-base font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3B82F6]"
                >
                  <ShoppingBag size={20} className="mr-4 text-gray-500" />
                  <span>Giỏ Hàng</span>
                </button>
              )}

              <div className="px-2">
                <UserPopover />
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </header>
  );
};

export default Header;
