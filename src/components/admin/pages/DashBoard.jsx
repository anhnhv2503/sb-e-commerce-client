import DotsLoading from "@/components/common/DotsLoading";
import useCurrencyFormat from "@/components/hooks/useCurrencyFormat";
import {
  getDashboardData,
  getNewestOrders,
} from "@/components/service/ApiFunctions";
import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
  BanknotesIcon,
  ClockIcon,
  Squares2X2Icon,
  TagIcon,
  TruckIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { motion } from "framer-motion";
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

const DashBoard = () => {
  useDocumentTitle("Admin Dashboard");
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const currency = useCurrencyFormat();
  const [newestOrders, setNewestOrders] = useState([]);
  const [dashboardData, setDashboardData] = useState(null);

  // Mock data for charts - replace with real API data
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
    { name: "Shoes", value: 540 },
    { name: "Shirts", value: 370 },
    { name: "Hats", value: 210 },
    { name: "Pants", value: 290 },
    { name: "Accessories", value: 190 },
  ];
  const fetchNewestOrders = async () => {
    setIsLoading(true);
    try {
      const response = await getNewestOrders();
      setNewestOrders(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching newest orders:", error);
    }
  };
  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const reponse = await getDashboardData();
      setDashboardData(reponse.data?.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  const fetchDashboardMockData = async () => {
    setIsLoading(true);
    try {
      setTimeout(() => {
        setIsLoading(false);
      }, 100);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchDashboardData();
    fetchNewestOrders();
    fetchDashboardMockData();
  }, []);

  // Helper function for card color variants
  const getStatusColor = (status) => {
    switch (status) {
      case "DELIVERED":
        return "bg-green-100 text-green-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      case "SHIPPING":
        return "bg-indigo-100 text-indigo-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Array of card items for cleaner JSX
  const statCards = [
    {
      title: "Tổng Đơn Hàng",
      value: dashboardData?.totalOrders || 0,
      icon: <TruckIcon className="w-5 h-5" />,
      growth: data?.orderGrowth || 0,
      color: "from-sky-500 to-blue-600",
      textColor: "text-blue-600",
      growthColor: data?.orderGrowth >= 0 ? "text-green-500" : "text-red-500",
      growthIcon:
        data?.orderGrowth >= 0 ? (
          <ArrowTrendingUpIcon className="h-4 w-4" />
        ) : (
          <ArrowTrendingDownIcon className="h-4 w-4" />
        ),
    },
    {
      title: "Tổng Danh Mục",
      value: dashboardData?.totalCategories || 0,
      icon: <TagIcon className="w-5 h-5" />,
      color: "from-rose-500 to-pink-600",
      textColor: "text-rose-600",
    },
    {
      title: "Tổng Sản Phẩm",
      value: dashboardData?.totalProducts || 0,
      icon: <Squares2X2Icon className="w-5 h-5" />,
      growth: data?.productGrowth || 0,
      color: "from-indigo-500 to-purple-600",
      textColor: "text-indigo-600",
      growthColor: data?.productGrowth >= 0 ? "text-green-500" : "text-red-500",
      growthIcon:
        data?.productGrowth >= 0 ? (
          <ArrowTrendingUpIcon className="h-4 w-4" />
        ) : (
          <ArrowTrendingDownIcon className="h-4 w-4" />
        ),
    },
    {
      title: "Tổng Người Dùng",
      value: dashboardData?.totalUsers || 0,
      icon: <UserGroupIcon className="w-5 h-5" />,
      growth: data?.customerGrowth || 0,
      color: "from-teal-500 to-emerald-600",
      textColor: "text-teal-600",
      growthColor:
        data?.customerGrowth >= 0 ? "text-green-500" : "text-red-500",
      growthIcon:
        data?.customerGrowth >= 0 ? (
          <ArrowTrendingUpIcon className="h-4 w-4" />
        ) : (
          <ArrowTrendingDownIcon className="h-4 w-4" />
        ),
    },
    {
      title: "Tổng Doanh Thu",
      value: dashboardData?.totalRevenue || 0,
      formatter: (value) => currency.format(value),
      icon: <BanknotesIcon className="w-5 h-5" />,
      growth: data?.revenueGrowth || 0,
      color: "from-fuchsia-500 to-purple-600",
      textColor: "text-fuchsia-700",
      growthColor: data?.revenueGrowth >= 0 ? "text-green-500" : "text-red-500",
      growthIcon:
        data?.revenueGrowth >= 0 ? (
          <ArrowTrendingUpIcon className="h-4 w-4" />
        ) : (
          <ArrowTrendingDownIcon className="h-4 w-4" />
        ),
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  if (isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <DotsLoading />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <h1 className="text-3xl font-bold text-gray-900">Thống Kê</h1>
        <div className="text-sm text-gray-500 flex items-center">
          <ClockIcon className="h-4 w-4 mr-1" />
          Cập nhật lần cuối:{" "}
          {new Date().toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {statCards.map((card, index) => (
          <motion.div
            key={index}
            variants={item}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="relative overflow-hidden rounded-lg bg-white shadow"
          >
            <div
              className={`absolute h-1.5 top-0 left-0 right-0 bg-gradient-to-r ${card.color}`}
            ></div>
            <div className="p-5">
              <div className="flex justify-between">
                <div>
                  <p className={`text-sm font-medium ${card.textColor}`}>
                    {card.title}
                  </p>
                  <div className="mt-2 flex items-baseline">
                    <p className="text-2xl font-semibold text-gray-900">
                      <CountUp
                        end={card.value}
                        duration={2}
                        separator="."
                        formattingFn={card.formatter}
                      />
                    </p>
                    {card.growth !== undefined && (
                      <span
                        className={`ml-2 text-xs flex items-center ${card.growthColor}`}
                      >
                        {card.growthIcon}
                        <span className="ml-0.5">{Math.abs(card.growth)}%</span>
                      </span>
                    )}
                  </div>
                </div>
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${card.color} text-white shadow-lg`}
                >
                  {card.icon}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-5 rounded-lg shadow"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Doanh Thu Theo Tháng
            </h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockChartData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#888" fontSize={12} />
                <YAxis stroke="#888" fontSize={12} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#8884d8"
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-5 rounded-lg shadow"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Phân Bổ Sản Phẩm
            </h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE"][
                          index % 5
                        ]
                      }
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Recent Orders Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white shadow rounded-lg overflow-hidden"
      >
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Đơn Hàng Gần Đây
          </h3>
        </div>
        <ul className="divide-y divide-gray-200">
          {newestOrders.map((order, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="px-6 py-4 flex items-center justify-between hover:bg-gray-50"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center">
                    <TruckIcon className="h-5 w-5 text-gray-500" />
                  </div>
                </div>
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">
                    {order.id}
                  </div>
                  <div className="text-sm text-gray-500">
                    {order.user?.fullName}
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <span
                  className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                    order.orderStatus
                  )}`}
                >
                  {order.orderStatus === "DELIVERED"
                    ? "Hoàn thành"
                    : order.orderStatusv === "PENDING"
                    ? "Chờ xử lý"
                    : order.orderStatus === "IN_PROGRESS"
                    ? "Đang xử lý"
                    : order.orderStatus === "SHIPPING"
                    ? "Đang giao hàng"
                    : "Đã hủy"}
                </span>
                <div className="ml-6 text-sm font-medium text-gray-900">
                  {currency.format(order.totalAmount)}
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
        <div className="border-t border-gray-200 bg-gray-50 px-6 py-3">
          <a
            href="/admin/manage/orders"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            Xem tất cả đơn hàng
            <span aria-hidden="true"> &rarr;</span>
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default DashBoard;
