import OrdersTable from "@/components/admin/pages/OrdersTable";
import DotsLoading from "@/components/common/DotsLoading";
import Paginator from "@/components/common/Paginator";
import { getOrdersByStatus } from "@/components/service/ApiFunctions";
import { Button } from "@/components/ui/button";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  CheckCircle,
  Clock,
  Inbox,
  RefreshCw,
  ShoppingBag,
  Truck,
  XCircle,
} from "lucide-react";

const statusConfig = [
  {
    id: "PENDING",
    label: "Chờ xử lý",
    icon: <Clock size={16} />,
    color: "bg-[#D97706]",
    bgColor: "bg-amber-50",
    textColor: "text-[#D97706]",
    borderColor: "border-[#D97706]/30",
  },
  {
    id: "IN_PROGRESS",
    label: "Đang xử lý",
    icon: <Inbox size={16} />,
    color: "bg-[#3B82F6]",
    bgColor: "bg-blue-50",
    textColor: "text-[#3B82F6]",
    borderColor: "border-[#3B82F6]/30",
  },
  {
    id: "SHIPPING",
    label: "Đang giao",
    icon: <Truck size={16} />,
    color: "bg-[#8B5CF6]",
    bgColor: "bg-purple-50",
    textColor: "text-[#8B5CF6]",
    borderColor: "border-[#8B5CF6]/30",
  },
  {
    id: "DELIVERED",
    label: "Đã giao",
    icon: <CheckCircle size={16} />,
    color: "bg-[#16A34A]",
    bgColor: "bg-green-50",
    textColor: "text-[#16A34A]",
    borderColor: "border-[#16A34A]/30",
  },
  {
    id: "CANCELLED",
    label: "Đã hủy",
    icon: <XCircle size={16} />,
    color: "bg-[#DC2626]",
    bgColor: "bg-red-50",
    textColor: "text-[#DC2626]",
    borderColor: "border-[#DC2626]/30",
  },
];

/**
 * ManageOrder Page
 * Redesigned to match SKILL.md artistic design system
 */
const ManageOrder = () => {
  useDocumentTitle("Đơn Hàng — VA Shop Admin");
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

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-6xl mx-auto space-y-6 pb-12"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-[#111827] flex items-center gap-3">
            <ShoppingBag size={28} className="text-[#3B82F6]" />
            Quản Lý Đơn Hàng
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Theo dõi, xử lý và cập nhật trạng thái đơn hàng
          </p>
        </div>
        <Button
          onClick={handleRefresh}
          variant="outline"
          className="flex items-center gap-2 h-11 px-5 border-gray-200 text-[#111827] hover:text-[#3B82F6] hover:bg-blue-50 hover:border-blue-200 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3B82F6] transition-colors"
        >
          <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
          <span className="font-semibold">Làm Mới</span>
        </Button>
      </div>

      {/* Status Cards */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {statusConfig.map((statusItem) => (
          <motion.div
            key={statusItem.id}
            variants={itemVariants}
            onClick={() => {
              setStatus(statusItem.id);
              setCurrentPage(0);
            }}
            whileHover={{ y: -4 }}
            className={`
              relative cursor-pointer rounded-xl border p-4 transition-all duration-300 overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2
              ${
                status === statusItem.id
                  ? `${statusItem.bgColor} ${statusItem.borderColor} shadow-md`
                  : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm"
              }
            `}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setStatus(statusItem.id);
                setCurrentPage(0);
              }
            }}
          >
            <div className="flex flex-col gap-3 relative z-10">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center
                  ${status === statusItem.id ? "bg-white/60" : "bg-gray-50"} 
                  ${status === statusItem.id ? statusItem.textColor : "text-gray-500"}
                `}
              >
                {statusItem.icon}
              </div>
              <span className={`font-semibold text-sm ${status === statusItem.id ? statusItem.textColor : "text-[#111827]"}`}>
                {statusItem.label}
              </span>
            </div>
            
            {status === statusItem.id && (
              <motion.div
                className={`absolute bottom-0 left-0 h-1 w-full ${statusItem.color}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
                style={{ originX: 0 }}
              />
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content Area */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={getCurrentStatusConfig().textColor}>
              {getCurrentStatusConfig().icon}
            </div>
            <h2 className="font-semibold text-[#111827]">
              {getCurrentStatusConfig().label}
            </h2>
          </div>
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold font-mono tracking-wider border ${
              getCurrentStatusConfig().bgColor
            } ${getCurrentStatusConfig().textColor} ${getCurrentStatusConfig().borderColor}`}
          >
            {orders.length} Đơn Hàng
          </span>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-32">
            <DotsLoading />
          </div>
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <Inbox size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-[#111827] mb-2">
              Chưa Có Đơn Hàng Nào
            </h3>
            <p className="text-gray-500 max-w-sm">
              Hiện tại không có đơn hàng nào ở trạng thái "{getCurrentStatusConfig().label}".
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
