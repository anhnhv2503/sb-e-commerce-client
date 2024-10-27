import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import React from "react";

const OrdersTable = ({ data, status }) => {
  const [expandedRows, setExpandedRows] = useState({});

  const toggleRow = (id) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="">
      <h2 className="text-xl font-bold my-4 mx-2">Đơn hàng</h2>
      <div className="overflow-auto border rounded-lg">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Mã đơn hàng</th>
              <th className="p-2 text-left">Ngày đặt</th>
              <th className="p-2 text-left">Thành tiền</th>
              <th className="p-2 text-left">Trạng thái</th>
              <th className="p-2 text-left">Phương thức thanh toán</th>

              <th className="p-2 text-left">
                {status === "PENDING" && "Cập Nhật"}
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((order) => (
              <React.Fragment key={order.id}>
                <tr className="border-b">
                  <td className="p-2">{order.id}</td>
                  <td className="p-2">{order.orderDate}</td>
                  <td className="p-2">
                    {order.totalAmount.toLocaleString("en-US")} VND
                  </td>
                  <td className="p-2">{order.status}</td>
                  <td className="p-2">{order.paymentType}</td>
                  <td className="p-2">
                    {status === "PENDING" && (
                      <Button className={`bg-green-600 hover:bg-green-500`}>
                        Xét duyệt
                      </Button>
                    )}
                  </td>
                </tr>
                <tr>
                  <td colSpan={6} className="p-2">
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
                              {order.orderItems.map((item) => (
                                <div
                                  key={item.id}
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
                                        Giá:{" "}
                                        {item.price.toLocaleString("en-US")} VND
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
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;
