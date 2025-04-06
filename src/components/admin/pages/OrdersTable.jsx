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
import {
  ArrowPathIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  EllipsisHorizontalIcon,
  MapPinIcon,
  PhoneIcon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const statusMapping = {
  PENDING: {
    label: "Chờ xử lý",
    color: "bg-amber-100 text-amber-700",
    actions: ["IN_PROGRESS", "CANCELLED"],
  },
  IN_PROGRESS: {
    label: "Đang xử lý",
    color: "bg-blue-100 text-blue-700",
    actions: ["SHIPPING", "CANCELLED"],
  },
  SHIPPING: {
    label: "Đang giao",
    color: "bg-indigo-100 text-indigo-700",
    actions: ["DELIVERED", "CANCELLED"],
  },
  DELIVERED: {
    label: "Đã giao",
    color: "bg-emerald-100 text-emerald-700",
    actions: [],
  },
  CANCELLED: {
    label: "Đã hủy",
    color: "bg-rose-100 text-rose-700",
    actions: [],
  },
};

const actionLabels = {
  IN_PROGRESS: "Xử lý đơn hàng",
  SHIPPING: "Giao hàng",
  DELIVERED: "Xác nhận đã giao",
  CANCELLED: "Hủy đơn",
};

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
      title = "Hủy đơn hàng";
      description =
        "Bạn có chắc muốn hủy đơn hàng này không? Hành động này không thể hoàn tác.";
    } else {
      title = `Cập nhật trạng thái đơn hàng thành "${statusMapping[newStatus].label}"`;
      description = "Bạn có chắc muốn cập nhật trạng thái đơn hàng này không?";
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
          `Đã cập nhật trạng thái đơn hàng thành ${statusMapping[newStatus].label}`
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
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Mã đơn
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Khách hàng
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Ngày đặt
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Tổng tiền
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Trạng thái
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((order) => (
              <React.Fragment key={order.id}>
                <motion.tr
                  className={`hover:bg-gray-50 cursor-pointer ${
                    expandedOrder === order.id ? "bg-gray-50" : ""
                  }`}
                  onClick={() => handleExpand(order.id)}
                  whileHover={{ backgroundColor: "rgba(249, 250, 251, 1)" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 mr-3">
                        <UserCircleIcon className="h-5 w-5" />
                      </div>
                      {order.user?.fullName || "N/A"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.orderDate
                      ? format(new Date(order.orderDate), "PPP", { locale: vi })
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {currency.format(order.totalAmount || 0)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        statusMapping[order.orderStatus].color
                      }`}
                    >
                      {statusMapping[order.orderStatus].label}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div
                      className="flex justify-end items-center space-x-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {statusMapping[order.orderStatus].actions.length > 0 && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 px-2"
                            >
                              <EllipsisHorizontalIcon className="h-5 w-5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {statusMapping[order.orderStatus].actions.map(
                              (action) => (
                                <DropdownMenuItem
                                  key={action}
                                  onClick={() =>
                                    handleStatusChange(order.id, action)
                                  }
                                  className={
                                    action === "CANCELLED"
                                      ? "text-rose-600"
                                      : ""
                                  }
                                >
                                  {actionLabels[action]}
                                </DropdownMenuItem>
                              )
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleExpand(order.id);
                        }}
                      >
                        {expandedOrder === order.id ? (
                          <ChevronUpIcon className="h-4 w-4" />
                        ) : (
                          <ChevronDownIcon className="h-4 w-4" />
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
                      <td colSpan={6} className="p-0">
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2, delay: 0.1 }}
                          className="px-6 py-4 bg-gray-50 border-t border-gray-100"
                        >
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Customer and Shipping Info */}
                            <div className="space-y-4">
                              <h4 className="text-sm font-medium text-gray-900">
                                Thông tin khách hàng
                              </h4>

                              <div className="bg-white rounded-md p-4 shadow-sm space-y-3">
                                <div className="flex items-start">
                                  <UserCircleIcon className="h-5 w-5 text-gray-400 mt-0.5 mr-2" />
                                  <div>
                                    <p className="text-sm font-medium text-gray-900">
                                      {order.user?.fullName || "N/A"}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                      {order.user?.email || "N/A"}
                                    </p>
                                  </div>
                                </div>

                                <div className="flex items-start">
                                  <PhoneIcon className="h-5 w-5 text-gray-400 mt-0.5 mr-2" />
                                  <p className="text-sm text-gray-500">
                                    {order.user?.phone || "N/A"}
                                  </p>
                                </div>

                                <div className="flex items-start">
                                  <MapPinIcon className="h-5 w-5 text-gray-400 mt-0.5 mr-2" />
                                  <p className="text-sm text-gray-500">
                                    {order.user?.address || "N/A"}
                                  </p>
                                </div>
                              </div>

                              <h4 className="text-sm font-medium text-gray-900 mt-4">
                                Ghi chú
                              </h4>
                              <div className="bg-white rounded-md p-4 shadow-sm min-h-[80px]">
                                <p className="text-sm text-gray-500">
                                  {order.note || "Không có ghi chú"}
                                </p>
                              </div>
                            </div>

                            {/* Order Items */}
                            <div>
                              <h4 className="text-sm font-medium text-gray-900 mb-4">
                                Chi tiết đơn hàng
                              </h4>
                              <div className="bg-white rounded-md shadow-sm overflow-hidden">
                                <div className="max-h-64 overflow-y-auto">
                                  <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                      <tr>
                                        <th
                                          scope="col"
                                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                          Sản phẩm
                                        </th>
                                        <th
                                          scope="col"
                                          className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                          SL
                                        </th>
                                        <th
                                          scope="col"
                                          className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                          Giá
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                      {order.items?.map((item, index) => (
                                        <tr key={index}>
                                          <td className="px-4 py-2 whitespace-nowrap text-sm">
                                            <div className="flex items-center">
                                              <div className="h-10 w-10 flex-shrink-0 rounded-md bg-gray-100 overflow-hidden">
                                                <img
                                                  src={
                                                    item.sizeDTO?.product
                                                      ?.images?.[0]?.url ||
                                                    "https://via.placeholder.com/50"
                                                  }
                                                  alt={item.product?.name}
                                                  className="h-full w-full object-cover"
                                                />
                                              </div>
                                              <div className="ml-3">
                                                <p className="text-xs font-medium text-gray-900 line-clamp-1">
                                                  {item.sizeDTO?.product
                                                    ?.name || "N/A"}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                  Size:{" "}
                                                  {item.sizeDTO?.sizeName ||
                                                    "N/A"}
                                                </p>
                                              </div>
                                            </div>
                                          </td>
                                          <td className="px-4 py-2 whitespace-nowrap text-sm text-center">
                                            {item.quantity}
                                          </td>
                                          <td className="px-4 py-2 whitespace-nowrap text-sm text-right">
                                            {currency.format(item.price || 0)}
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>

                                {/* Order Summary */}
                                <div className="bg-gray-50 px-4 py-4 sm:px-6">
                                  <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between">
                                    <p className="text-base font-medium text-gray-900">
                                      Tổng cộng
                                    </p>
                                    <p className="text-base font-medium text-indigo-600">
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
        <>
          <AlertDialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{confirmDialog.title}</AlertDialogTitle>
                <AlertDialogDescription>
                  {confirmDialog.description}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={isProcessing}>
                  Hủy
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    confirmStatusChange();
                  }}
                  disabled={isProcessing}
                  className={
                    confirmDialog.newStatus === "CANCELLED"
                      ? "bg-rose-600 hover:bg-rose-700"
                      : ""
                  }
                >
                  {isProcessing ? (
                    <ArrowPathIcon className="h-4 w-4 animate-spin mr-2" />
                  ) : confirmDialog.newStatus === "CANCELLED" ? (
                    <XMarkIcon className="h-4 w-4 mr-2" />
                  ) : (
                    <CheckIcon className="h-4 w-4 mr-2" />
                  )}
                  {isProcessing ? "Đang xử lý..." : "Xác nhận"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
    </>
  );
};

export default OrdersTable;
