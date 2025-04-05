import CartIcon from "@/components/common/CartIcon";
import UserAccordion from "@/components/common/UserAccordion";
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
        scrolled ? "bg-white shadow-md" : "bg-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0"
          >
            <button
              onClick={() => navigate("/")}
              className="flex items-center focus:outline-none"
              aria-label="Home"
            >
              <img
                src={newLogo}
                alt="Company Logo"
                className="h-8 md:h-10 w-auto"
              />
            </button>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <button
              onClick={() => navigate("/")}
              className={`px-3 py-2 text-sm font-medium transition-colors hover:text-indigo-600 ${
                isActive("/") ? "text-indigo-600" : "text-gray-700"
              }`}
            >
              Trang Chủ
            </button>
            <button
              onClick={() => navigate("/shop")}
              className={`px-3 py-2 text-sm font-medium transition-colors hover:text-indigo-600 ${
                isActive("/shop") ? "text-indigo-600" : "text-gray-700"
              }`}
            >
              Cửa Hàng
            </button>
            <button
              onClick={() => navigate("/about")}
              className={`px-3 py-2 text-sm font-medium transition-colors hover:text-indigo-600 ${
                isActive("/about") ? "text-indigo-600" : "text-gray-700"
              }`}
            >
              Về Chúng Tôi
            </button>
          </div>

          {/* Right Section: Cart and User */}
          <div className="flex items-center space-x-4">
            {/* Cart Button */}
            {token && <CartIcon />}

            {/* User Menu - Desktop */}
            <div className="hidden md:block">
              <UserPopover />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-indigo-600 transition-colors"
              aria-label="Open menu"
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
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
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
        <div className="fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-white shadow-lg">
          <div className="flex items-center justify-between p-4 border-b">
            <button
              onClick={() => navigate("/")}
              className="focus:outline-none"
            >
              <img src={newLogo} alt="Company Logo" className="h-8 w-auto" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          <div className="p-4 overflow-y-auto">
            <div className="space-y-1">
              <button
                onClick={() => {
                  navigate("/");
                  setMobileMenuOpen(false);
                }}
                className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              >
                <Home size={18} className="mr-3" />
                <span>Trang Chủ</span>
              </button>
              <button
                onClick={() => {
                  navigate("/shop");
                  setMobileMenuOpen(false);
                }}
                className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              >
                <Store size={18} className="mr-3" />
                <span>Cửa Hàng</span>
              </button>
              <button
                onClick={() => {
                  navigate("/about");
                  setMobileMenuOpen(false);
                }}
                className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              >
                <Info size={18} className="mr-3" />
                <span>Về Chúng Tôi</span>
              </button>
            </div>

            <div className="mt-6 border-t pt-4">
              {token && (
                <button
                  onClick={() => {
                    navigate("/user/cart");
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <ShoppingBag size={18} className="mr-3" />
                  <span>Giỏ Hàng</span>
                </button>
              )}

              <div className="mt-4">
                <UserAccordion />
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </header>
  );
};

export default Header;
