import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  cancelOrder,
  getOrdersByUserAndStatus,
} from "@/components/service/ApiFunctions";
import useCurrencyFormat from "@/components/hooks/useCurrencyFormat";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

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
        setIsLoading(false);
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
        setOrders(orders.filter((order) => order.id !== orderId));
        toast.success("Đã hủy đơn hàng thành công");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-96 overflow-y-auto">
      <Table>
        <TableHeader className="sticky top-0 bg-white shadow">
          <TableRow>
            <TableHead>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                />
              </svg>
            </TableHead>
            <TableHead>Sản Phẩm</TableHead>
            <TableHead>Ngày đặt hàng</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Địa chỉ</TableHead>
            <TableHead className="text-right">Tổng</TableHead>
            <TableHead>Phương thức thanh toán</TableHead>
            {status === "PENDING" && (
              <TableHead>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75a4.5 4.5 0 0 1-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 1 1-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 0 1 6.336-4.486l-3.276 3.276a3.004 3.004 0 0 0 2.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.867 19.125h.008v.008h-.008v-.008Z"
                  />
                </svg>
              </TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                Không có đơn hàng nào
              </TableCell>
            </TableRow>
          )}
          {isLoading && (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                <div className="flex items-center justify-center min-h-screen">
                  <span className="loading loading-dots loading-xs"></span>
                </div>
              </TableCell>
            </TableRow>
          )}
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>
                {order.orderItems.map((item) => (
                  <img
                    src={item.product?.images[0]?.url}
                    alt={item.product?.name}
                    width={50}
                    height={50}
                    onClick={() => nav(`/product/${item.product?.id}`)}
                    className="cursor-pointer"
                    key={item.product?.id}
                  />
                ))}
              </TableCell>
              <TableCell>
                {order.orderItems.map((item) => (
                  <div
                    className="font-bold hover:text-indigo-600 cursor-pointer"
                    onClick={() => nav(`/product/${item.product?.id}`)}
                    key={item.product?.id}
                  >
                    {item.product?.name}
                  </div>
                ))}
              </TableCell>
              <TableCell>{order.orderDate}</TableCell>
              <TableCell>
                {(order.status === "PENDING" && "Đang Chờ") ||
                  (order.status === "IN_PROGRESS" && "Đang Xử Lí") ||
                  (order.status === "SHIPPING" && "Đang Giao") ||
                  (order.status === "DELIVERED" && "Đã Giao") ||
                  (order.status === "CANCELLED" && "Đã Hủy")}
              </TableCell>
              <TableCell className="whitespace-normal break-words max-w-xs">
                {order.orderAddress}
              </TableCell>
              <TableCell className="text-right">
                {currency.format(order.totalAmount)}
              </TableCell>
              <TableCell className="text-center">
                {order.paymentType === "CASH_ON_DELIVERY"
                  ? "COD"
                  : order.paymentType}
              </TableCell>
              {status === "PENDING" && (
                <TableCell>
                  <Button
                    variant="destructive"
                    onClick={() => handleCancelOrder(order.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrdersTable;
