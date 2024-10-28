import useCurrencyFormat from "@/components/hooks/useCurrencyFormat";
import { updateOrderStatus } from "@/components/service/ApiFunctions";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import { toast, Toaster } from "sonner";

const OrdersTable = ({ data, status }) => {
  const currency = useCurrencyFormat();

  const handlePendingUpdate = async (id) => {
    try {
      const response = await updateOrderStatus(id);
      if (response) {
        toast.info("Đã xét duyệt đơn hàng. Đang chờ đóng gói");
      }
    } catch (error) {
      console.error("Error updating order: ", error);
    }
  };

  const handleInProgressUpdate = async (id) => {
    try {
      const response = await updateOrderStatus(id);
      if (response) {
        toast.success("Đã hoàn tất đóng gói đơn hàng. Chuẩn bị giao hàng");
      }
    } catch (error) {
      console.error("Error updating order: ", error);
    }
  };

  const handleShippingUpdate = async (id) => {
    try {
      const response = await updateOrderStatus(id);
      if (response) {
        toast.warning("Đơn hàng đang được vận chuyển");
      }
    } catch (error) {
      console.error("Error updating order: ", error);
    }
  };

  const handleDeliveredUpdate = async (id) => {
    try {
      const response = await updateOrderStatus(id);
      if (response) {
        toast.success("Giao hàng thành công");
      }
    } catch (error) {
      console.error("Error updating order: ", error);
    }
  };

  return (
    <div className="">
      <h2 className="text-xl font-bold my-4 mx-2">Đơn hàng</h2>
      <div className="overflow-auto border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mã đơn hàng</TableHead>
              <TableHead>Ngày đặt</TableHead>
              <TableHead>Thành tiền</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Phương thức thanh toán</TableHead>
              <TableHead>{status !== "CANCELLED" && "Cập Nhật"}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 && (
              <TableRow key={data.id}>
                <TableCell colSpan={7} className="text-center">
                  Không có đơn hàng nào
                </TableCell>
              </TableRow>
            )}
            {data.map((order, index) => (
              <>
                <TableRow key={index}>
                  <TableCell>
                    <Badge>{order.id}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={`outline`}>{order.orderDate}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {currency.format(order.totalAmount)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge>{order.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {order.paymentType.replaceAll("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {status === "PENDING" && (
                      <Button
                        className={`bg-blue-500 hover:bg-blue-400`}
                        onClick={() => handlePendingUpdate(order.id)}
                      >
                        Xét duyệt
                      </Button>
                    )}
                    {status === "IN_PROGRESS" && (
                      <Button
                        className={`bg-green-600 hover:bg-green-500`}
                        onClick={() => handleInProgressUpdate(order.id)}
                      >
                        Hoàn tất
                      </Button>
                    )}
                    {status === "SHIPPING" && (
                      <Button
                        className={`bg-yellow-600 hover:bg-yellow-500 disabled cursor-default`}
                        disabled
                      >
                        Đang vận chuyển
                      </Button>
                    )}
                    {status === "DELIVERED" && (
                      <Button
                        className={`bg-green-600 hover:bg-green-500 disabled cursor-default`}
                        disabled
                      >
                        Giao Hàng thành công
                      </Button>
                    )}
                    {status === "CANCELLED" && (
                      <Button
                        variant="destructive"
                        className="disabled cursor-default"
                      >
                        Đã hủy
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={6} className="p-2">
                    <Accordion type="single" collapsible>
                      <AccordionItem value={`order-${order.id}`}>
                        <AccordionTrigger className="flex items-center gap-2 text-indigo-500">
                          Xem thêm
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="p-4 border rounded-lg bg-gray-50">
                            <h3 className="text-lg font-semibold mb-4">
                              Chi tiết đơn hàng
                            </h3>
                            <div className="space-y-4">
                              {order.orderItems.map((item, index) => (
                                <div
                                  key={index}
                                  className="p-4 border rounded-lg"
                                >
                                  <div className="flex gap-4 items-center">
                                    <img
                                      src={item.product.images[0].url}
                                      alt={item.product.name}
                                      className="w-24 h-24 rounded-md"
                                    />
                                    <div>
                                      <p className="font-medium">
                                        {item.product.name}
                                      </p>
                                      <p className="text-sm text-gray-500">
                                        Thương hiệu: {item.product.brand} |
                                        Size: {item.size.sizeName}
                                      </p>
                                      <p className="text-sm">
                                        Số lượng: {item.quantity}
                                      </p>
                                      <p className="text-sm text-gray-600">
                                        Giá: {currency.format(item.price)}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </div>
      <Toaster richColors="true" position="top-right" />
    </div>
  );
};

export default OrdersTable;
