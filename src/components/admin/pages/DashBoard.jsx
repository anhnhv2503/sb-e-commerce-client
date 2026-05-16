import DotsLoading from "@/components/common/DotsLoading";
import useCurrencyFormat from "@/components/hooks/useCurrencyFormat";
import {
  getDashboardData,
  getNewestOrders,
} from "@/components/service/ApiFunctions";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Box,
  Clock,
  DollarSign,
  Layers,
  ShoppingBag,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

/**
 * DashBoard
 * Redesigned analytics page with SKILL.md design tokens.
 */
const DashBoard = () => {
  useDocumentTitle("Thống Kê — VA Shop Admin");
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const currency = useCurrencyFormat();
  const [newestOrders, setNewestOrders] = useState([]);
  const [dashboardData, setDashboardData] = useState(null);

  const mockChartData = [
    { name: "T1", value: 400 },
    { name: "T2", value: 300 },
    { name: "T3", value: 600 },
    { name: "T4", value: 800 },
    { name: "T5", value: 500 },
    { name: "T6", value: 900 },
    { name: "T7", value: 700 },
    { name: "T8", value: 1000 },
    { name: "T9", value: 1200 },
    { name: "T10", value: 900 },
    { name: "T11", value: 1300 },
    { name: "T12", value: 1600 },
  ];

  const pieData = [
    { name: "Giày", value: 540 },
    { name: "Áo", value: 370 },
    { name: "Mũ", value: 210 },
    { name: "Quần", value: 290 },
    { name: "Phụ kiện", value: 190 },
  ];

  const PIE_COLORS = ["#3B82F6", "#8B5CF6", "#D97706", "#16A34A", "#DC2626"];

  const fetchNewestOrders = async () => {
    try {
      const response = await getNewestOrders();
      setNewestOrders(response.data);
    } catch (error) {
      console.error("Error fetching newest orders:", error);
    }
  };

  const fetchDashboardData = async () => {
    try {
      const response = await getDashboardData();
      setDashboardData(response.data?.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      await Promise.all([fetchDashboardData(), fetchNewestOrders()]);
      setIsLoading(false);
    };
    load();
  }, []);

  const getStatusLabel = (status) => {
    const map = {
      DELIVERED: {
        label: "Hoàn thành",
        style: "bg-green-50 text-[#16A34A] border-green-200",
      },
      PENDING: {
        label: "Chờ xử lý",
        style: "bg-yellow-50 text-[#D97706] border-yellow-200",
      },
      IN_PROGRESS: {
        label: "Đang xử lý",
        style: "bg-blue-50 text-[#3B82F6] border-blue-200",
      },
      SHIPPING: {
        label: "Đang giao",
        style: "bg-purple-50 text-[#8B5CF6] border-purple-200",
      },
      CANCELLED: {
        label: "Đã hủy",
        style: "bg-red-50 text-[#DC2626] border-red-200",
      },
    };
    return (
      map[status] || {
        label: status,
        style: "bg-gray-50 text-gray-600 border-gray-200",
      }
    );
  };

  const statCards = [
    {
      title: "Tổng Đơn Hàng",
      value: dashboardData?.totalOrders || 0,
      icon: <ShoppingBag size={20} />,
      color: "bg-[#3B82F6]",
    },
    {
      title: "Tổng Danh Mục",
      value: dashboardData?.totalCategories || 0,
      icon: <Layers size={20} />,
      color: "bg-[#8B5CF6]",
    },
    {
      title: "Tổng Sản Phẩm",
      value: dashboardData?.totalProducts || 0,
      icon: <Box size={20} />,
      color: "bg-[#D97706]",
    },
    {
      title: "Tổng Người Dùng",
      value: dashboardData?.totalUsers || 0,
      icon: <Users size={20} />,
      color: "bg-[#16A34A]",
    },
    {
      title: "Tổng Doanh Thu",
      value: dashboardData?.totalRevenue || 0,
      formatter: (value) => currency.format(value),
      icon: <DollarSign size={20} />,
      color: "bg-[#DC2626]",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  };

  if (isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center min-h-[400px]">
        <DotsLoading />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl pb-8">
      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
      >
        <div>
          <h1 className="font-display text-3xl font-bold text-[#111827] flex items-center gap-3">
            <BarChart3
              size={28}
              className="text-[#3B82F6]"
              aria-hidden="true"
            />
            Thống Kê
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Tổng quan hoạt động kinh doanh
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-400 font-mono">
          <Clock size={12} aria-hidden="true" />
          {new Date().toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </motion.div>

      {/* ── Stat cards ── */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {statCards.map((card, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ y: -3, transition: { duration: 0.15 } }}
            className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider font-mono">
                {card.title}
              </p>
              <span
                className={`inline-flex items-center justify-center w-9 h-9 rounded-lg ${card.color} text-white`}
              >
                {card.icon}
              </span>
            </div>
            <p className="text-2xl font-bold text-[#111827]">
              <CountUp
                end={card.value}
                duration={2}
                separator=","
                formattingFn={card.formatter}
              />
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Charts ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Area chart */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl border border-gray-200 p-5"
        >
          <h3 className="text-sm font-semibold text-[#111827] mb-4">
            Doanh Thu Theo Tháng
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockChartData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="name"
                  stroke="#9CA3AF"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#9CA3AF"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#111827",
                    border: "none",
                    borderRadius: "8px",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Pie chart */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl border border-gray-200 p-5"
        >
          <h3 className="text-sm font-semibold text-[#111827] mb-4">
            Phân Bổ Sản Phẩm
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {pieData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={PIE_COLORS[index % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#111827",
                    border: "none",
                    borderRadius: "8px",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                />
                <Legend
                  wrapperStyle={{ fontSize: "12px" }}
                  formatter={(value) => (
                    <span className="text-gray-600">{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* ── Recent Orders ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl border border-gray-200 overflow-hidden"
      >
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-[#111827]">
            Đơn Hàng Gần Đây
          </h3>
          <a
            href="/admin/manage/orders"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#3B82F6] hover:text-[#2563EB] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3B82F6] rounded"
          >
            Xem tất cả
            <ArrowRight size={12} aria-hidden="true" />
          </a>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm" aria-label="Recent orders">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider font-mono">
                  Mã đơn
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider font-mono">
                  Khách hàng
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider font-mono">
                  Trạng thái
                </th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider font-mono">
                  Tổng tiền
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {newestOrders.map((order, index) => {
                const status = getStatusLabel(order.orderStatus);
                return (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-5 py-3.5">
                      <span className="font-mono text-xs text-[#111827]">
                        #{String(order.id).padStart(4, "0")}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-gray-600">
                        {order.user?.fullName}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${status.style}`}
                      >
                        {status.label}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <span className="font-semibold text-[#111827]">
                        {currency.format(order.totalAmount)}
                      </span>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default DashBoard;
