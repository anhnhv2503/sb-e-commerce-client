import Loading from "@/components/common/Loading";
import useCurrencyFormat from "@/components/hooks/useCurrencyFormat";
import {
  cancelOrder,
  confirmDelivery,
  getOrdersByUserAndStatus,
} from "@/components/service/ApiFunctions";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import {
  Calendar,
  CheckCircle,
  CreditCard,
  MapPin,
  PackageSearch,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const statusMapping = {
  PENDING: {
    label: "Chờ Xử Lý",
    color: "bg-amber-50 text-[#D97706] border-amber-200",
  },
  IN_PROGRESS: {
    label: "Đang Xử Lý",
    color: "bg-blue-50 text-[#3B82F6] border-blue-200",
  },
  SHIPPING: {
    label: "Đang Giao",
    color: "bg-purple-50 text-[#8B5CF6] border-purple-200",
  },
  DELIVERED: {
    label: "Đã Giao",
    color: "bg-green-50 text-[#16A34A] border-green-200",
  },
  CANCELLED: {
    label: "Đã Hủy",
    color: "bg-red-50 text-[#DC2626] border-red-200",
  },
};

/**
 * OrdersTable Component (User Facing)
 * Redesigned to match SKILL.md artistic design system
 */
const OrdersTable = ({ status }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [processingId, setProcessingId] = useState(null);
  const nav = useNavigate();
  const currency = useCurrencyFormat();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const response = await getOrdersByUserAndStatus(status);
        setOrders(response.data?.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, [status]);

  const handleCancelOrder = async (orderId) => {
    setProcessingId(orderId);
    try {
      const response = await cancelOrder(orderId);
      if (response.status === 200) {
        setOrders((prev) => prev.filter((order) => order.id !== orderId));
        toast.success("Đã hủy đơn hàng thành công");
      }
    } catch (error) {
      console.error(error);
      toast.error("Không thể hủy đơn hàng lúc này");
    } finally {
      setProcessingId(null);
    }
  };

  const handleConfirmDelivered = async (orderId) => {
    setProcessingId(orderId);
    try {
      const response = await confirmDelivery(orderId);
      if (response.status === 200) {
        setOrders((prev) => prev.filter((order) => order.id !== orderId));
        toast.success("Đã xác nhận nhận hàng thành công");
      }
    } catch (error) {
      console.error(error);
      toast.error("Không thể xác nhận nhận hàng lúc này");
    } finally {
      setProcessingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 min-h-[300px]">
        <Loading />
        <p className="mt-4 text-gray-500 font-medium">
          Đang tải thông tin đơn hàng...
        </p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center min-h-[300px]">
        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
          <PackageSearch size={32} className="text-gray-400" />
        </div>
        <h3 className="text-lg font-bold text-[#111827] mb-2">
          Không Có Đơn Hàng
        </h3>
        <p className="text-gray-500 max-w-sm mb-6">
          Bạn chưa có đơn hàng nào ở trạng thái này. Hãy tiếp tục mua sắm để lấp
          đầy danh sách!
        </p>
        <Button
          onClick={() => nav("/shop")}
          className="h-11 px-6 bg-[#3B82F6] hover:bg-[#2563EB] text-white shadow-md shadow-blue-500/20 rounded-xl font-semibold transition-all"
        >
          Mua Sắm Ngay
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {orders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden hover:shadow-md hover:border-gray-200 transition-all"
          >
            {/* Order Header */}
            <div className="bg-gray-50/80 px-4 py-3 sm:px-6 sm:py-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-sm font-semibold text-[#111827] bg-white border border-gray-200 px-2.5 py-1 rounded-md shadow-sm">
                  #{String(order.id).padStart(4, "0")}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-gray-500 font-mono">
                  <Calendar size={14} />
                  {order.orderDate}
                </div>
              </div>
              <span
                className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${
                  statusMapping[order.orderStatus]?.color ||
                  "bg-gray-100 text-gray-800"
                }`}
              >
                {statusMapping[order.orderStatus]?.label || order.orderStatus}
              </span>
            </div>

            {/* Order Items */}
            <div className="divide-y divide-gray-50">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start"
                >
                  <div
                    className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-xl border border-gray-100 bg-gray-50 overflow-hidden cursor-pointer"
                    onClick={() => nav(`/product/${item.sizeDTO.product?.id}`)}
                  >
                    <img
                      src={
                        item.sizeDTO.product?.images?.[0]?.url ||
                        "https://via.placeholder.com/150"
                      }
                      alt={item.sizeDTO.product?.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between h-full space-y-2 sm:space-y-0">
                    <div>
                      <h4
                        className="font-bold text-base text-[#111827] hover:text-[#3B82F6] cursor-pointer transition-colors line-clamp-2"
                        onClick={() =>
                          nav(`/product/${item.sizeDTO.product?.id}`)
                        }
                      >
                        {item.sizeDTO.product?.name}
                      </h4>
                      <p className="text-sm text-gray-500 mt-1">
                        Size:{" "}
                        <span className="font-semibold text-gray-700">
                          {item.sizeDTO.sizeName}
                        </span>{" "}
                        x {item.quantity}
                      </p>
                    </div>
                    <div className="font-bold text-[#3B82F6]">
                      {currency.format(item.price)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Footer & Actions */}
            <div className="bg-white px-4 py-4 sm:px-6 sm:py-5 border-t border-gray-100 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div className="space-y-2 text-sm max-w-lg">
                <div className="flex items-start gap-2 text-gray-600">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-gray-400" />
                  <span className="line-clamp-2 leading-relaxed">
                    {order.orderAddress}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <CreditCard size={16} className="shrink-0 text-gray-400" />
                  <span>
                    Thanh toán:{" "}
                    <span className="font-semibold text-[#111827]">
                      {order.paymentType === "CASH_ON_DELIVERY"
                        ? "Khi nhận hàng (COD)"
                        : order.paymentType}
                    </span>
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
                <div className="text-right w-full sm:w-auto">
                  <span className="text-sm text-gray-500 mr-2">
                    Tổng Thành Tiền:
                  </span>
                  <span className="text-xl font-bold text-[#111827]">
                    {currency.format(order.totalAmount)}
                  </span>
                </div>

                <div className="w-full sm:w-auto flex shrink-0">
                  {order.orderStatus === "PENDING" && (
                    <Button
                      variant="outline"
                      onClick={() => handleCancelOrder(order.id)}
                      disabled={processingId === order.id}
                      className="w-full sm:w-auto h-11 px-5 border-red-200 text-red-600 hover:text-red-700 hover:bg-red-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-600 rounded-xl font-semibold gap-2 transition-all"
                    >
                      {processingId === order.id ? (
                        <div className="w-4 h-4 border-2 border-red-600/30 border-t-red-600 rounded-full animate-spin" />
                      ) : (
                        <XCircle size={16} />
                      )}
                      Hủy Đơn Hàng
                    </Button>
                  )}
                  {order.orderStatus === "SHIPPING" && (
                    <Button
                      onClick={() => handleConfirmDelivered(order.id)}
                      disabled={processingId === order.id}
                      className="w-full sm:w-auto h-11 px-6 bg-[#16A34A] hover:bg-green-700 text-white shadow-md shadow-green-500/20 rounded-xl font-semibold gap-2 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#16A34A]"
                    >
                      {processingId === order.id ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <CheckCircle size={16} />
                      )}
                      Đã Nhận Hàng
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default OrdersTable;
