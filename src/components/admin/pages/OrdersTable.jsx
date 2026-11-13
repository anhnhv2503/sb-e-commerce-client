import { ORDER_STATUS, StatusBadge } from "@/components/admin/ui/AdminKit";
import DataTable from "@/components/admin/ui/DataTable";
import useCurrencyFormat from "@/components/hooks/useCurrencyFormat";
import {
  cancelOrder,
  confirmDelivery,
  getApiErrorMessage,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import {
  Mail,
  MapPin,
  MoreHorizontal,
  Phone,
  RefreshCw,
  User,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";

/* Workflow: which transitions are allowed from each status */
const NEXT_ACTIONS = {
  PENDING: ["IN_PROGRESS", "CANCELLED"],
  IN_PROGRESS: ["SHIPPING", "CANCELLED"],
  SHIPPING: ["DELIVERED"],
  DELIVERED: [],
  CANCELLED: [],
};

const actionLabels = {
  IN_PROGRESS: "Xử lý đơn hàng",
  SHIPPING: "Giao hàng",
  DELIVERED: "Xác nhận đã giao",
  CANCELLED: "Hủy đơn",
};

/**
 * OrdersTable — order rows with the next workflow step as the primary
 * inline action, cancel in the overflow menu, and an expandable detail row.
 */
const OrdersTable = ({ data, fetchOrders, loading, error, empty }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({
    orderId: null,
    newStatus: null,
    title: "",
    description: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const currency = useCurrencyFormat();

  const handleStatusChange = (orderId, newStatus) => {
    const isCancel = newStatus === "CANCELLED";
    setConfirmDialog({
      orderId,
      newStatus,
      title: isCancel
        ? `Hủy đơn hàng #${String(orderId).padStart(4, "0")}?`
        : `Chuyển sang "${ORDER_STATUS[newStatus].label}"?`,
      description: isCancel
        ? "Đơn hàng sẽ bị hủy. Hành động này không thể hoàn tác."
        : `Đơn hàng #${String(orderId).padStart(4, "0")} sẽ được cập nhật trạng thái.`,
    });
    setIsOpen(true);
  };

  const confirmStatusChange = async () => {
    const { orderId, newStatus } = confirmDialog;
    setIsProcessing(true);
    try {
      if (newStatus === "CANCELLED") {
        await cancelOrder(orderId);
        toast.success("Đã hủy đơn hàng thành công");
      } else if (newStatus === "DELIVERED") {
        // SHIPPING → DELIVERED goes through confirm-delivered; update-order-status stops at SHIPPING.
        await confirmDelivery(orderId);
        toast.success(
          `Đã cập nhật trạng thái đơn hàng thành ${ORDER_STATUS[newStatus].label}`,
        );
      } else {
        await updateOrderStatus(orderId, newStatus);
        toast.success(
          `Đã cập nhật trạng thái đơn hàng thành ${ORDER_STATUS[newStatus].label}`,
        );
      }
      fetchOrders(false);
    } catch (error) {
      console.error("Error updating order status: ", error);
      toast.error(getApiErrorMessage(error, "Không thể cập nhật trạng thái đơn hàng"));
    } finally {
      setIsProcessing(false);
      setIsOpen(false);
    }
  };

  const itemCount = (order) =>
    (order.items || []).reduce((n, i) => n + (i.quantity || 0), 0);

  const columns = [
    {
      id: "id",
      header: "Mã đơn",
      className: "font-mono text-xs",
      cell: (order) => `#${String(order.id).padStart(4, "0")}`,
    },
    {
      id: "customer",
      header: "Khách hàng",
      cell: (order) => (
        <>
          <p className="font-medium">{order.user?.fullName || "—"}</p>
          <p className="text-xs text-[#606562]">{order.user?.email || ""}</p>
        </>
      ),
    },
    {
      id: "orderDate",
      header: "Ngày đặt",
      className: "whitespace-nowrap font-mono text-xs text-[#363537]",
      cell: (order) =>
        order.orderDate
          ? format(new Date(order.orderDate), "dd/MM/yyyy HH:mm", { locale: vi })
          : "—",
    },
    {
      id: "quantity",
      header: "SL",
      align: "right",
      className: "font-mono tabular-nums",
      cell: (order) => itemCount(order),
    },
    {
      id: "total",
      header: "Tổng tiền",
      align: "right",
      className: "whitespace-nowrap font-mono font-medium tabular-nums",
      cell: (order) => currency.format(order.totalAmount || 0),
    },
    {
      id: "status",
      header: "Trạng thái",
      cell: (order) => <StatusBadge status={order.orderStatus} />,
    },
    {
      id: "actions",
      header: "Thao tác",
      pin: "end",
      align: "right",
      stopPropagation: true,
      cell: (order) => {
        const actions = NEXT_ACTIONS[order.orderStatus] || [];
        const primary = actions.find((a) => a !== "CANCELLED");
        const canCancel = actions.includes("CANCELLED");
        return (
          <div className="flex items-center justify-end gap-1">
            {primary && (
              <button
                onClick={() => handleStatusChange(order.id, primary)}
                className="btn-admin btn-admin-primary h-8 px-2.5 text-xs"
              >
                {actionLabels[primary]}
              </button>
            )}
            {canCancel && (
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <button
                    className="btn-admin btn-admin-ghost btn-admin-icon h-8 w-8"
                    aria-label="Thao tác khác"
                  >
                    <MoreHorizontal size={16} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-44 rounded p-1">
                  <DropdownMenuItem
                    onClick={() =>
                      handleStatusChange(order.id, "CANCELLED")
                    }
                    className="cursor-pointer gap-2 rounded text-sm text-[#DC2626] focus:bg-red-50 focus:text-[#DC2626]"
                  >
                    <XCircle size={15} />
                    {actionLabels.CANCELLED}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            {!primary && !canCancel && (
              <span className="text-xs text-[#9ca3af]">—</span>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <>
      <DataTable
        storageKey="orders"
        ariaLabel="Danh sách đơn hàng"
        columns={columns}
        data={data}
        minWidth={880}
        loading={loading}
        error={error}
        empty={empty}
        expandOnRowClick
        renderExpanded={(order) => (
        <div className="grid grid-cols-1 gap-6 px-6 py-5 lg:grid-cols-3">
          {/* Customer & shipping */}
          <div className="space-y-4">
            <div>
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#606562]">
                Thông tin giao hàng
              </h4>
              <ul className="divide-y divide-hairline rounded border border-hairline bg-white text-sm">
                {[
                  [User, order.user?.fullName],
                  [Mail, order.user?.email],
                  [Phone, order.user?.phone, true],
                  [MapPin, order.user?.address],
                ].map(([Icon, value, mono], i) => (
                  <li key={i} className="flex gap-3 px-3 py-2">
                    <Icon
                      size={15}
                      className="mt-0.5 flex-shrink-0 text-[#9ca3af]"
                      aria-hidden="true"
                    />
                    <span className={mono ? "font-mono" : ""}>
                      {value || "—"}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#606562]">
                Ghi chú
              </h4>
              <p className="rounded border border-hairline bg-white p-3 text-sm text-[#363537]">
                {order.note || "Không có ghi chú"}
              </p>
            </div>
          </div>

          {/* Items */}
          <div className="lg:col-span-2">
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#606562]">
              Sản phẩm đã đặt
            </h4>
            <div className="overflow-hidden rounded border border-hairline bg-white">
              <div className="max-h-80 overflow-y-auto">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Sản phẩm</th>
                      <th className="!text-right">SL</th>
                      <th className="!text-right">Đơn giá</th>
                      <th className="!text-right">Thành tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items?.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <div className="flex items-center gap-3">
                            <img
                              src={item.sizeDTO?.product?.images?.[0]?.url}
                              alt=""
                              className="h-10 w-10 flex-shrink-0 rounded bg-brand-mist object-cover"
                            />
                            <div className="min-w-0">
                              <p className="max-w-[260px] truncate font-medium">
                                {item.sizeDTO?.product?.name || "—"}
                              </p>
                              <p className="font-mono text-xs text-[#606562]">
                                Size {item.sizeDTO?.sizeName || "—"}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="text-right font-mono tabular-nums">
                          {item.quantity}
                        </td>
                        <td className="whitespace-nowrap text-right font-mono tabular-nums text-[#606562]">
                          {currency.format(item.price || 0)}
                        </td>
                        <td className="whitespace-nowrap text-right font-mono tabular-nums">
                          {currency.format(
                            (item.price || 0) * (item.quantity || 0),
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex items-center justify-between border-t border-hairline bg-[#f7f8f9] px-4 py-3">
                <span className="text-xs font-semibold uppercase tracking-wide text-[#606562]">
                  Tổng thành tiền
                </span>
                <span className="font-mono text-base font-semibold tabular-nums text-brand-ink">
                  {currency.format(order.totalAmount || 0)}
                </span>
              </div>
            </div>
          </div>
        </div>
        )}
      />

      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent className="max-w-md rounded-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-base font-semibold text-brand-ink">
              {confirmDialog.title}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-[#606562]">
              {confirmDialog.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-2 gap-2 sm:gap-0">
            <AlertDialogCancel
              disabled={isProcessing}
              className="h-9 rounded border-[#cccfcd] px-4 text-sm font-medium"
            >
              Quay lại
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                confirmStatusChange();
              }}
              disabled={isProcessing}
              className={`h-9 rounded px-4 text-sm font-medium text-white ${
                confirmDialog.newStatus === "CANCELLED"
                  ? "bg-[#DC2626] hover:bg-red-700"
                  : "bg-brand-blue hover:bg-[#2563EB]"
              }`}
            >
              {isProcessing && (
                <RefreshCw size={15} className="mr-1.5 animate-spin" />
              )}
              {isProcessing
                ? "Đang xử lý..."
                : confirmDialog.newStatus === "CANCELLED"
                  ? "Hủy đơn"
                  : "Xác nhận"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default OrdersTable;
