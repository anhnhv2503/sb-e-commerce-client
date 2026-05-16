import useCurrencyFormat from "@/components/hooks/useCurrencyFormat";
import {
  cancelOrder,
  updateOrderStatus,
} from "@/components/service/ApiFunctions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import {
  Check,
  ChevronDown,
  ChevronUp,
  MapPin,
  MoreHorizontal,
  Phone,
  RefreshCw,
  User,
  X,
} from "lucide-react";

const statusMapping = {
  PENDING: {
    label: "Chờ xử lý",
    color: "bg-amber-50 text-[#D97706] border-amber-200",
    actions: ["IN_PROGRESS", "CANCELLED"],
  },
  IN_PROGRESS: {
    label: "Đang xử lý",
    color: "bg-blue-50 text-[#3B82F6] border-blue-200",
    actions: ["SHIPPING", "CANCELLED"],
  },
  SHIPPING: {
    label: "Đang giao",
    color: "bg-purple-50 text-[#8B5CF6] border-purple-200",
    actions: ["DELIVERED", "CANCELLED"],
  },
  DELIVERED: {
    label: "Đã giao",
    color: "bg-green-50 text-[#16A34A] border-green-200",
    actions: [],
  },
  CANCELLED: {
    label: "Đã hủy",
    color: "bg-red-50 text-[#DC2626] border-red-200",
    actions: [],
  },
};

const actionLabels = {
  IN_PROGRESS: "Xử lý đơn hàng",
  SHIPPING: "Giao hàng",
  DELIVERED: "Xác nhận đã giao",
  CANCELLED: "Hủy đơn",
};

/**
 * OrdersTable Component
 * Redesigned to match SKILL.md artistic design system
 */
const OrdersTable = ({ data, status, fetchOrders }) => {
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({
    orderId: null,
    newStatus: null,
    title: "",
    description: "",
  });
  const [isOpen, setIsOpen] = useState(false);

  const currency = useCurrencyFormat();

  const handleExpand = (id) => {
    setExpandedOrder(expandedOrder === id ? null : id);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    let title = "";
    let description = "";

    if (newStatus === "CANCELLED") {
      title = "Hủy Đơn Hàng";
      description =
        "Bạn có chắc muốn hủy đơn hàng này không? Hành động này không thể hoàn tác.";
    } else {
      title = `Cập Nhật Trạng Thái: ${statusMapping[newStatus].label}`;
      description = "Xác nhận chuyển trạng thái đơn hàng này?";
    }
    setIsOpen(true);
    setConfirmDialog({
      orderId,
      newStatus,
      title,
      description,
    });
  };

  const confirmStatusChange = async () => {
    const { orderId, newStatus } = confirmDialog;
    setIsProcessing(true);

    try {
      if (newStatus === "CANCELLED") {
        await cancelOrder(orderId);
        toast.success("Đã hủy đơn hàng thành công");
      } else {
        await updateOrderStatus(orderId, newStatus);
        toast.success(
          `Đã cập nhật trạng thái đơn hàng thành ${statusMapping[newStatus].label}`,
        );
      }
      fetchOrders(false);
      setIsProcessing(false);
      setIsOpen(false);
    } catch (error) {
      console.error("Error updating order status: ", error);
      toast.error("Không thể cập nhật trạng thái đơn hàng");
      setIsProcessing(false);
      setIsOpen(false);
    }
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50/80">
            <tr>
              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider font-mono"
              >
                Mã đơn
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider font-mono"
              >
                Khách hàng
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider font-mono"
              >
                Ngày đặt
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider font-mono"
              >
                Tổng tiền
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider font-mono"
              >
                Trạng thái
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider font-mono"
              >
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {data.map((order) => (
              <React.Fragment key={order.id}>
                <motion.tr
                  className={`hover:bg-blue-50/30 cursor-pointer transition-colors group ${
                    expandedOrder === order.id ? "bg-blue-50/20" : ""
                  }`}
                  onClick={() => handleExpand(order.id)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <span className="font-mono bg-gray-50 text-[#111827] px-2.5 py-1 rounded-md border border-gray-100">
                      #{String(order.id).padStart(4, "0")}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-[#3B82F6]">
                        <User size={16} />
                      </div>
                      <span className="font-semibold text-[#111827]">
                        {order.user?.fullName || "N/A"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono text-xs">
                    {order.orderDate
                      ? format(new Date(order.orderDate), "dd/MM/yyyy", {
                          locale: vi,
                        })
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-[#3B82F6]">
                    {currency.format(order.totalAmount || 0)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${
                        statusMapping[order.orderStatus].color
                      }`}
                    >
                      {statusMapping[order.orderStatus].label}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div
                      className="flex justify-end items-center gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {statusMapping[order.orderStatus].actions.length > 0 && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-9 w-9 p-0 rounded-lg text-gray-500 hover:text-[#3B82F6] hover:border-blue-200 hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3B82F6]"
                            >
                              <MoreHorizontal size={18} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="w-48 rounded-xl p-1"
                          >
                            {statusMapping[order.orderStatus].actions.map(
                              (action) => (
                                <DropdownMenuItem
                                  key={action}
                                  onClick={() =>
                                    handleStatusChange(order.id, action)
                                  }
                                  className={`rounded-lg cursor-pointer px-3 py-2 text-sm font-medium mb-1 last:mb-0 ${
                                    action === "CANCELLED"
                                      ? "text-red-600 focus:bg-red-50 focus:text-red-700"
                                      : "text-[#111827] focus:bg-blue-50 focus:text-[#3B82F6]"
                                  }`}
                                >
                                  {actionLabels[action]}
                                </DropdownMenuItem>
                              ),
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`h-9 px-3 rounded-lg flex items-center gap-2 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3B82F6] ${
                          expandedOrder === order.id
                            ? "bg-blue-50 text-[#3B82F6]"
                            : "text-gray-500 hover:text-[#111827] hover:bg-gray-100"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleExpand(order.id);
                        }}
                      >
                        <span className="text-xs font-semibold uppercase tracking-wider font-mono">
                          Chi tiết
                        </span>
                        {expandedOrder === order.id ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        )}
                      </Button>
                    </div>
                  </td>
                </motion.tr>

                {/* Expanded Order Details */}
                <AnimatePresence>
                  {expandedOrder === order.id && (
                    <motion.tr
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <td colSpan={6} className="p-0 border-b border-gray-100">
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2, delay: 0.1 }}
                          className="px-6 py-6 bg-gray-50/80"
                        >
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Customer and Shipping Info */}
                            <div className="space-y-5 lg:col-span-1">
                              <div>
                                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider font-mono mb-3">
                                  Thông Tin Giao Hàng
                                </h4>
                                <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm space-y-4">
                                  <div className="flex gap-3">
                                    <User
                                      size={18}
                                      className="text-gray-400 shrink-0 mt-0.5"
                                    />
                                    <div>
                                      <p className="text-sm font-semibold text-[#111827]">
                                        {order.user?.fullName || "N/A"}
                                      </p>
                                      <p className="text-sm text-gray-500 mt-0.5">
                                        {order.user?.email || "N/A"}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="flex gap-3">
                                    <Phone
                                      size={18}
                                      className="text-gray-400 shrink-0 mt-0.5"
                                    />
                                    <p className="text-sm text-[#111827] font-mono">
                                      {order.user?.phone || "N/A"}
                                    </p>
                                  </div>

                                  <div className="flex gap-3">
                                    <MapPin
                                      size={18}
                                      className="text-gray-400 shrink-0 mt-0.5"
                                    />
                                    <p className="text-sm text-[#111827] leading-relaxed">
                                      {order.user?.address || "N/A"}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider font-mono mb-3">
                                  Ghi Chú Đơn Hàng
                                </h4>
                                <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm min-h-[80px]">
                                  <p className="text-sm text-gray-600 italic">
                                    {order.note || "Không có ghi chú"}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Order Items */}
                            <div className="lg:col-span-2">
                              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider font-mono mb-3">
                                Sản Phẩm Đã Đặt
                              </h4>
                              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                <div className="max-h-80 overflow-y-auto">
                                  <table className="min-w-full divide-y divide-gray-100">
                                    <thead className="bg-gray-50">
                                      <tr>
                                        <th
                                          scope="col"
                                          className="px-5 py-3 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-widest font-mono"
                                        >
                                          Sản Phẩm
                                        </th>
                                        <th
                                          scope="col"
                                          className="px-5 py-3 text-center text-[10px] font-semibold text-gray-500 uppercase tracking-widest font-mono"
                                        >
                                          SL
                                        </th>
                                        <th
                                          scope="col"
                                          className="px-5 py-3 text-right text-[10px] font-semibold text-gray-500 uppercase tracking-widest font-mono"
                                        >
                                          Đơn Giá
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-50">
                                      {order.items?.map((item, index) => (
                                        <tr
                                          key={index}
                                          className="hover:bg-gray-50/50 transition-colors"
                                        >
                                          <td className="px-5 py-3 whitespace-nowrap">
                                            <div className="flex items-center gap-4">
                                              <div className="h-12 w-12 flex-shrink-0 rounded-lg bg-gray-50 border border-gray-100 overflow-hidden">
                                                <img
                                                  src={
                                                    item.sizeDTO?.product
                                                      ?.images?.[0]?.url ||
                                                    "https://via.placeholder.com/50"
                                                  }
                                                  alt={
                                                    item.sizeDTO?.product?.name
                                                  }
                                                  className="h-full w-full object-cover"
                                                />
                                              </div>
                                              <div>
                                                <p className="text-sm font-semibold text-[#111827] max-w-[200px] sm:max-w-[300px] truncate">
                                                  {item.sizeDTO?.product
                                                    ?.name || "N/A"}
                                                </p>
                                                <div className="flex items-center gap-2 mt-1">
                                                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-600">
                                                    Size{" "}
                                                    {item.sizeDTO?.sizeName ||
                                                      "N/A"}
                                                  </span>
                                                </div>
                                              </div>
                                            </div>
                                          </td>
                                          <td className="px-5 py-3 whitespace-nowrap text-sm font-medium text-center text-[#111827]">
                                            {item.quantity}
                                          </td>
                                          <td className="px-5 py-3 whitespace-nowrap text-sm font-medium text-right text-gray-600">
                                            {currency.format(item.price || 0)}
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>

                                {/* Order Summary */}
                                <div className="bg-gray-50 px-5 py-4 border-t border-gray-200">
                                  <div className="flex justify-between items-center">
                                    <p className="text-sm font-semibold uppercase tracking-wider text-gray-500 font-mono">
                                      Tổng Thành Tiền
                                    </p>
                                    <p className="text-xl font-bold text-[#3B82F6]">
                                      {currency.format(order.totalAmount || 0)}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </td>
                    </motion.tr>
                  )}
                </AnimatePresence>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {isOpen && (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
          <AlertDialogContent className="rounded-2xl max-w-md">
            <AlertDialogHeader>
              <AlertDialogTitle className="font-display text-xl text-[#111827]">
                {confirmDialog.title}
              </AlertDialogTitle>
              <AlertDialogDescription className="text-gray-600 text-base">
                {confirmDialog.description}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-6 gap-3 sm:gap-0">
              <AlertDialogCancel
                disabled={isProcessing}
                className="h-11 px-6 rounded-lg font-semibold"
              >
                Hủy Qua
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmStatusChange}
                disabled={isProcessing}
                className={`h-11 px-6 rounded-lg font-semibold text-white shadow-md transition-all ${
                  confirmDialog.newStatus === "CANCELLED"
                    ? "bg-[#DC2626] hover:bg-red-700 shadow-red-500/20"
                    : "bg-[#3B82F6] hover:bg-[#2563EB] shadow-blue-500/20"
                }`}
              >
                {isProcessing ? (
                  <RefreshCw size={18} className="animate-spin mr-2" />
                ) : confirmDialog.newStatus === "CANCELLED" ? (
                  <X size={18} className="mr-2" />
                ) : (
                  <Check size={18} className="mr-2" />
                )}
                {isProcessing ? "Đang Xử Lý..." : "Xác Nhận"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
};

export default OrdersTable;
