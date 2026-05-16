import { useDocumentTitle } from "@uidotdev/usehooks";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Box,
  Layers,
  ShoppingBag,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

/**
 * AdminPage
 * Redesigned admin welcome page with SKILL.md design tokens.
 */
const AdminPage = () => {
  useDocumentTitle("Admin — VA Shop");
  const navigate = useNavigate();

  const getCurrentGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Chào Buổi Sáng";
    if (hour < 18) return "Chào Buổi Chiều";
    return "Chào Buổi Tối";
  };

  const quickLinks = [
    {
      title: "Sản Phẩm",
      description: "Quản lý kho hàng, thêm mới và cập nhật sản phẩm",
      icon: <Box size={22} />,
      color: "bg-[#3B82F6]",
      path: "/admin/product/list",
    },
    {
      title: "Đơn Hàng",
      description: "Xem và xử lý đơn hàng, quản lý vận chuyển",
      icon: <ShoppingBag size={22} />,
      color: "bg-[#8B5CF6]",
      path: "/admin/manage/orders",
    },
    {
      title: "Danh Mục",
      description: "Tổ chức sản phẩm theo danh mục phù hợp",
      icon: <Layers size={22} />,
      color: "bg-[#D97706]",
      path: "/admin/manage/category",
    },
    {
      title: "Khách Hàng",
      description: "Xem thông tin và lịch sử mua hàng",
      icon: <Users size={22} />,
      color: "bg-[#16A34A]",
      path: "/admin/manage/user",
    },
    {
      title: "Thống Kê",
      description: "Báo cáo doanh số, xu hướng kinh doanh",
      icon: <BarChart3 size={22} />,
      color: "bg-[#DC2626]",
      path: "/admin/dashboard",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { y: 16, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.35, ease: "easeOut" } },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-8 max-w-5xl"
    >
      {/* ── Hero header ── */}
      <div className="relative overflow-hidden rounded-2xl bg-[#111827] p-8 sm:p-10">
        {/* Decorative gradient orbs */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#3B82F6]/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#8B5CF6]/10 rounded-full blur-3xl" />

        <div className="relative z-10">
          <motion.div
            initial={{ y: -16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#3B82F6] text-white text-xs font-semibold shadow-sm mb-5">
              <Sparkles size={12} aria-hidden="true" />
              {getCurrentGreeting()}, Admin
            </span>

            <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">
              VA Shop Admin Panel
            </h1>
            <p className="text-white/60 text-base max-w-xl leading-relaxed">
              Quản lý cửa hàng, theo dõi doanh số và mang đến trải nghiệm mua sắm tốt nhất cho khách hàng.
            </p>
          </motion.div>

          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <button
              onClick={() => navigate("/admin/dashboard")}
              id="admin-view-dashboard"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-[#111827] text-sm font-semibold hover:bg-gray-100 transition-colors shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <BarChart3 size={16} aria-hidden="true" />
              Xem Thống Kê
            </button>
            <button
              onClick={() => navigate("/admin/manage/orders")}
              id="admin-view-orders"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/10 text-white text-sm font-semibold hover:bg-white/20 border border-white/15 backdrop-blur-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <ShoppingBag size={16} aria-hidden="true" />
              Đơn Hàng Gần Đây
            </button>
          </motion.div>
        </div>
      </div>

      {/* ── Quick access cards ── */}
      <div>
        <h2 className="text-lg font-bold text-[#111827] mb-4 flex items-center gap-2">
          <Zap size={18} className="text-[#3B82F6]" aria-hidden="true" />
          Truy Cập Nhanh
        </h2>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {quickLinks.map((link, index) => (
            <motion.button
              key={index}
              variants={itemVariants}
              whileHover={{ y: -4, transition: { duration: 0.15 } }}
              onClick={() => navigate(link.path)}
              className="text-left relative overflow-hidden rounded-xl bg-white p-5 border border-gray-200 hover:border-[#3B82F6]/30 hover:shadow-lg hover:shadow-blue-500/5 transition-all group focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3B82F6]"
            >
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${link.color} text-white mb-4`}>
                {link.icon}
              </div>
              <h3 className="text-base font-semibold text-[#111827] mb-1 group-hover:text-[#3B82F6] transition-colors">
                {link.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">
                {link.description}
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#3B82F6] group-hover:gap-2 transition-all">
                Quản Lý
                <ArrowRight size={12} aria-hidden="true" />
              </span>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AdminPage;
