import Loading from "@/components/common/Loading";
import useCurrencyFormat from "@/components/hooks/useCurrencyFormat";
import {
  cancelOrder,
  confirmDelivery,
  getOrdersByUserAndStatus,
} from "@/components/service/ApiFunctions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Archive, PencilLine, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const OrdersTable = ({ status }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const nav = useNavigate();
  const currency = useCurrencyFormat();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const response = await getOrdersByUserAndStatus(status);
        setOrders(response.data?.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, [status]);

  const handleCancelOrder = async (orderId) => {
    try {
      const response = await cancelOrder(orderId);
      if (response.status === 200) {
        setOrders((prev) => prev.filter((order) => order.id !== orderId));
        toast.success("Đã hủy đơn hàng thành công");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirmDelivered = async (orderId) => {
    try {
      const response = await confirmDelivery(orderId);
      if (response.status === 200) {
        setOrders((prev) => prev.filter((order) => order.id !== orderId));
        toast.success("Đã xác nhận giao hàng thành công");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-[500px] overflow-y-auto rounded-lg shadow-lg bg-gray-100 p-4">
      <Table>
        <TableHeader className="sticky top-0 bg-white shadow-md">
          <TableRow className="border-b">
            <TableHead className="w-10">
              <Archive className="w-5 h-5" />
            </TableHead>
            <TableHead>Sản Phẩm</TableHead>
            <TableHead>Ngày đặt hàng</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Địa chỉ</TableHead>
            <TableHead className="text-right">Tổng</TableHead>
            <TableHead>Phương thức thanh toán</TableHead>
            <TableHead>
              <PencilLine className="w-4 h-4" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading && (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-6">
                <Loading />
              </TableCell>
            </TableRow>
          )}

          {!isLoading && orders.length === 0 && (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-6 text-gray-500">
                Không có đơn hàng nào
              </TableCell>
            </TableRow>
          )}

          {orders.map((order) => (
            <TableRow
              key={order.id}
              className="hover:bg-gray-100 transition-colors"
            >
              <TableCell>
                {order.orderItems.map((item) => (
                  <img
                    src={item.product?.images[0]?.url}
                    alt={item.product?.name}
                    width={50}
                    height={50}
                    onClick={() => nav(`/product/${item.product?.id}`)}
                    className="cursor-pointer rounded-md shadow-md hover:scale-105 transition-transform"
                    key={item.product?.id}
                  />
                ))}
              </TableCell>
              <TableCell>
                {order.orderItems.map((item) => (
                  <div
                    className="font-semibold text-indigo-600 hover:underline cursor-pointer"
                    onClick={() => nav(`/product/${item.product?.id}`)}
                    key={item.product?.id}
                  >
                    {item.product?.name}
                  </div>
                ))}
              </TableCell>
              <TableCell>
                <Badge variant="outline">{order.orderDate}</Badge>
              </TableCell>
              <TableCell>
                <Badge
                  className={`${
                    order.status === "PENDING"
                      ? "bg-yellow-500 text-white"
                      : order.status === "IN_PROGRESS"
                      ? "bg-blue-500 text-white"
                      : order.status === "SHIPPING"
                      ? "bg-orange-500 text-white"
                      : order.status === "DELIVERED"
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {(order.status === "PENDING" && "Đang Chờ") ||
                    (order.status === "IN_PROGRESS" && "Đang Xử Lí") ||
                    (order.status === "SHIPPING" && "Đang vận chuyển") ||
                    (order.status === "DELIVERED" && "Đã Giao") ||
                    (order.status === "CANCELLED" && "Đã Hủy")}
                </Badge>
              </TableCell>
              <TableCell className="whitespace-normal break-words max-w-xs">
                {order.orderAddress}
              </TableCell>
              <TableCell className="text-right">
                <Badge variant="secondary">
                  {currency.format(order.totalAmount)}
                </Badge>
              </TableCell>
              <TableCell className="text-center">
                <Badge variant="secondary">
                  {order.paymentType === "CASH_ON_DELIVERY"
                    ? "COD"
                    : order.paymentType}
                </Badge>
              </TableCell>
              <TableCell>
                {status === "PENDING" && (
                  <Button
                    variant="destructive"
                    onClick={() => handleCancelOrder(order.id)}
                    className="hover:bg-red-700 transition-colors"
                  >
                    <XCircle className="w-4 h-4" />
                  </Button>
                )}
                {status === "SHIPPING" && (
                  <Button
                    className="bg-green-600 hover:bg-green-700 transition-colors"
                    onClick={() => handleConfirmDelivered(order.id)}
                  >
                    Đã nhận hàng
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrdersTable;
