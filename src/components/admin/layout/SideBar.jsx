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
} from "lucide-react";

const SideBar = () => {
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    {
      id: "home",
      path: "/admin",
      label: "Dashboard",
      icon: <Home size={20} />,
    },
    {
      id: "stats",
      path: "/admin/dashboard",
      label: "Thống kê",
      icon: <BarChart3 size={20} />,
    },
    {
      id: "orders",
      path: "/admin/manage/orders",
      label: "Quản lí đơn hàng",
      icon: <ShoppingBag size={20} />,
    },
    {
      id: "categories",
      path: "/admin/manage/category",
      label: "Quản lí danh mục",
      icon: <Layers size={20} />,
    },
    {
      id: "users",
      path: "/admin/manage/user",
      label: "Quản lí người dùng",
      icon: <Users size={20} />,
    },
  ];

  const productSubMenu = [
    {
      id: "add-product",
      path: "/admin/product/add",
      label: "Thêm sản phẩm",
      icon: <PlusCircle size={18} />,
    },
    {
      id: "all-products",
      path: "/admin/product/list",
      label: "Tất cả sản phẩm",
      icon: <List size={18} />,
    },
  ];

  return (
    <motion.div
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="w-64 bg-gradient-to-b from-zinc-800 to-zinc-900 text-white h-full flex flex-col shadow-xl overflow-hidden"
    >
      {/* Logo Section */}
      <motion.div
        className="px-6 py-6 flex items-center justify-center"
        whileHover={{ scale: 1.05 }}
      >
        <img
          src={newLogo}
          alt="Admin Logo"
          className="h-12 w-auto cursor-pointer"
          onClick={() => navigate("/admin")}
        />
      </motion.div>

      {/* Divider */}
      <div className="mx-6 h-px bg-gradient-to-r from-transparent via-zinc-600 to-transparent" />

      {/* Menu Items */}
      <nav className="mt-8 px-4 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-600">
        <ul className="space-y-1.5">
          {menuItems.map((item) => (
            <motion.li
              key={item.id}
              whileHover={{ x: 6 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                onClick={() => navigate(item.path)}
                className={`flex items-center px-4 py-3 rounded-lg cursor-pointer transition-colors ${
                  isActive(item.path)
                    ? "bg-indigo-600 text-white"
                    : "hover:bg-zinc-700/60 text-zinc-300 hover:text-white"
                }`}
              >
                <span className="text-lg mr-4">{item.icon}</span>
                <span className="font-medium text-sm">{item.label}</span>
                {isActive(item.path) && (
                  <motion.div
                    className="absolute left-0 h-full w-1 rounded-r-full"
                    layoutId="activeIndicator"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </motion.div>
            </motion.li>
          ))}

          {/* Products Dropdown */}
          <motion.li whileHover={{ x: 6 }} whileTap={{ scale: 0.98 }}>
            <motion.div
              onClick={() => setIsProductDropdownOpen(!isProductDropdownOpen)}
              className={`flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer ${
                isActive("/admin/product/add") ||
                isActive("/admin/product/list")
                  ? "bg-indigo-600 text-white"
                  : "hover:bg-zinc-700/60 text-zinc-300 hover:text-white"
              }`}
            >
              <div className="flex items-center">
                <Package size={20} className="mr-4" />
                <span className="font-medium text-sm">Quản lí sản phẩm</span>
              </div>
              <motion.div
                animate={{ rotate: isProductDropdownOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronRight size={18} />
              </motion.div>
            </motion.div>

            <AnimatePresence>
              {isProductDropdownOpen && (
                <motion.ul
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden ml-6 mt-1 space-y-1"
                >
                  {productSubMenu.map((subItem) => (
                    <motion.li
                      key={subItem.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      whileHover={{ x: 4 }}
                    >
                      <div
                        onClick={() => navigate(subItem.path)}
                        className={`flex items-center px-4 py-2 rounded-md cursor-pointer ${
                          isActive(subItem.path)
                            ? "bg-indigo-500/50 text-white"
                            : "hover:bg-zinc-700/40 text-zinc-400 hover:text-white"
                        }`}
                      >
                        <span className="text-sm mr-3">{subItem.icon}</span>
                        <span className="text-sm">{subItem.label}</span>
                      </div>
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </motion.li>
        </ul>
      </nav>

      {/* User Section */}
      <div className="mt-auto">
        <div className="mx-6 h-px bg-gradient-to-r from-transparent via-zinc-600 to-transparent mb-4" />
        <div className="px-6 py-4">
          <motion.div
            whileHover={{ backgroundColor: "rgba(79, 70, 229, 0.2)" }}
            className="flex items-center justify-between rounded-lg px-3 py-2"
          >
            <Logout />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default SideBar;
