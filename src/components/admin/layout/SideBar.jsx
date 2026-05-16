import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Logout from "@/components/logout/Logout";
import newLogo from "../../../assets/logo.png";
import {
  ChevronRight,
  Home,
  BarChart3,
  Package,
  ShoppingBag,
  Users,
  Layers,
  PlusCircle,
  List,
  X,
} from "lucide-react";

/**
 * SideBar
 * Refined admin sidebar with SKILL.md token colors.
 * Accepts optional onClose prop for mobile overlay dismissal.
 */
const SideBar = ({ onClose }) => {
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleNavigate = (path) => {
    navigate(path);
    onClose?.();
  };

  const menuItems = [
    { id: "home", path: "/admin", label: "Trang Chủ", icon: <Home size={18} /> },
    { id: "stats", path: "/admin/dashboard", label: "Thống Kê", icon: <BarChart3 size={18} /> },
    { id: "orders", path: "/admin/manage/orders", label: "Đơn Hàng", icon: <ShoppingBag size={18} /> },
    { id: "categories", path: "/admin/manage/category", label: "Danh Mục", icon: <Layers size={18} /> },
    { id: "users", path: "/admin/manage/user", label: "Người Dùng", icon: <Users size={18} /> },
  ];

  const productSubMenu = [
    { id: "add-product", path: "/admin/product/add", label: "Thêm sản phẩm", icon: <PlusCircle size={16} /> },
    { id: "all-products", path: "/admin/product/list", label: "Tất cả sản phẩm", icon: <List size={16} /> },
  ];

  return (
    <div className="w-64 bg-[#111827] text-white h-full flex flex-col">
      {/* Logo */}
      <div className="px-5 py-5 flex items-center justify-between border-b border-white/10">
        <button
          onClick={() => handleNavigate("/admin")}
          className="flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3B82F6] rounded"
          aria-label="Admin home"
        >
          <img src={newLogo} alt="VA Shop" className="h-8 w-auto" />
          <span className="font-mono text-xs tracking-widest text-white/60 uppercase">Admin</span>
        </button>

        {/* Mobile close */}
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded text-white/50 hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="mt-4 px-3 flex-1 overflow-y-auto" aria-label="Admin menu">
        <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-white/30 font-mono">
          Menu
        </p>
        <ul className="space-y-0.5">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleNavigate(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3B82F6] ${
                  isActive(item.path)
                    ? "bg-[#3B82F6] text-white shadow-md shadow-blue-500/25"
                    : "text-white/60 hover:text-white hover:bg-white/8"
                }`}
                aria-current={isActive(item.path) ? "page" : undefined}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {item.label}
              </button>
            </li>
          ))}

          {/* Product dropdown */}
          <li>
            <button
              onClick={() => setIsProductDropdownOpen(!isProductDropdownOpen)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3B82F6] ${
                isActive("/admin/product/add") || isActive("/admin/product/list")
                  ? "bg-[#3B82F6] text-white shadow-md shadow-blue-500/25"
                  : "text-white/60 hover:text-white hover:bg-white/8"
              }`}
            >
              <span className="flex items-center gap-3">
                <Package size={18} />
                Sản Phẩm
              </span>
              <motion.span
                animate={{ rotate: isProductDropdownOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronRight size={14} />
              </motion.span>
            </button>

            <AnimatePresence>
              {isProductDropdownOpen && (
                <motion.ul
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden mt-0.5 ml-4 space-y-0.5"
                >
                  {productSubMenu.map((sub) => (
                    <motion.li
                      key={sub.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -8 }}
                    >
                      <button
                        onClick={() => handleNavigate(sub.path)}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-xs font-medium transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3B82F6] ${
                          isActive(sub.path)
                            ? "bg-white/15 text-white"
                            : "text-white/40 hover:text-white hover:bg-white/8"
                        }`}
                        aria-current={isActive(sub.path) ? "page" : undefined}
                      >
                        {sub.icon}
                        {sub.label}
                      </button>
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </li>
        </ul>
      </nav>

      {/* Footer */}
      <div className="mt-auto border-t border-white/10 px-5 py-4">
        <Logout />
      </div>
    </div>
  );
};

export default SideBar;
