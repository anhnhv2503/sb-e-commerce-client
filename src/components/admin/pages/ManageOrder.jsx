import OrdersTable from "@/components/admin/pages/OrdersTable";
import DotsLoading from "@/components/common/DotsLoading";
import Paginator from "@/components/common/Paginator";
import { getOrdersByStatus } from "@/components/service/ApiFunctions";
import { Button } from "@/components/ui/button";
import {
  ArrowPathIcon,
  CheckCircleIcon,
  CogIcon,
  InboxIcon,
  TruckIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const statusConfig = [
  {
    id: "PENDING",
    label: "Chờ xử lý",
    icon: <InboxIcon className="h-4 w-4 mr-2" />,
    color: "from-amber-500 to-amber-600",
    bgColor: "bg-amber-50",
    textColor: "text-amber-700",
  },
  {
    id: "IN_PROGRESS",
    label: "Đang xử lý",
    icon: <CogIcon className="h-4 w-4 mr-2" />,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
  },
  {
    id: "SHIPPING",
    label: "Đang giao",
    icon: <TruckIcon className="h-4 w-4 mr-2" />,
    color: "from-indigo-500 to-indigo-600",
    bgColor: "bg-indigo-50",
    textColor: "text-indigo-700",
  },
  {
    id: "DELIVERED",
    label: "Đã giao",
    icon: <CheckCircleIcon className="h-4 w-4 mr-2" />,
    color: "from-emerald-500 to-emerald-600",
    bgColor: "bg-emerald-50",
    textColor: "text-emerald-700",
  },
  {
    id: "CANCELLED",
    label: "Đã hủy",
    icon: <XCircleIcon className="h-4 w-4 mr-2" />,
    color: "from-rose-500 to-rose-600",
    bgColor: "bg-rose-50",
    textColor: "text-rose-700",
  },
];

const ManageOrder = () => {
  useDocumentTitle("Quản lý đơn hàng");
  const [status, setStatus] = useState("PENDING");
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrders = async (showLoading = true) => {
    if (showLoading) setIsLoading(true);
    try {
      const response = await getOrdersByStatus(currentPage, status);
      setOrders(response.data?.content || []);
      setTotalPages(response.data?.page?.totalPages || 0);
    } catch (error) {
      console.error("Error fetching orders: ", error);
    } finally {
      if (showLoading) setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [status, currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleRefresh = () => {
    fetchOrders();
  };

  const getCurrentStatusConfig = () => {
    return statusConfig.find((item) => item.id === status) || statusConfig[0];
  };

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

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Quản lý đơn hàng</h1>
        <Button
          onClick={handleRefresh}
          variant="outline"
          className="flex items-center gap-2"
        >
          <ArrowPathIcon className="h-4 w-4" />
          Làm mới
        </Button>
      </div>

      {/* Status Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {statusConfig.map((statusItem) => (
          <motion.div
            key={statusItem.id}
            variants={item}
            onClick={() => setStatus(statusItem.id)}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            className={`
              cursor-pointer rounded-lg border shadow-sm transition-all duration-200
              ${
                status === statusItem.id
                  ? `${
                      statusItem.bgColor
                    } border-2 border-${statusItem.id.toLowerCase()}-500`
                  : "bg-white border-gray-200 hover:bg-gray-50"
              }
            `}
          >
            <div className="p-5">
              <div className="flex justify-between items-center">
                <div
                  className={`flex items-center ${
                    status === statusItem.id
                      ? statusItem.textColor
                      : "text-gray-700"
                  }`}
                >
                  {statusItem.icon}
                  <span className="font-medium">{statusItem.label}</span>
                </div>
              </div>
              {status === statusItem.id && (
                <motion.div
                  className={`h-1 w-full mt-4 bg-gradient-to-r ${statusItem.color} rounded-full`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content Area */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            {getCurrentStatusConfig().icon}
            <h2 className="font-medium text-gray-900 ml-2">
              {getCurrentStatusConfig().label}
            </h2>
          </div>
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
              getCurrentStatusConfig().bgColor
            } ${getCurrentStatusConfig().textColor}`}
          >
            {orders.length} đơn hàng
          </span>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-32">
            <DotsLoading />
          </div>
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="h-24 w-24 text-gray-300 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">
              Không có đơn hàng nào
            </h3>
            <p className="text-gray-500 mt-1">
              Chưa có đơn hàng nào trong trạng thái này
            </p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={status + currentPage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full"
            >
              <OrdersTable
                data={orders}
                status={status}
                fetchOrders={fetchOrders}
              />
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <Paginator
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </motion.div>
  );
};

export default ManageOrder;
