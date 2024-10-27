import OrdersTable from "@/components/admin/pages/OrdersTable";
import { getOrdersByStatus } from "@/components/service/ApiFunctions";
import { Button } from "@/components/ui/button";
import { useDocumentTitle } from "@uidotdev/usehooks";
import React, { useEffect, useState } from "react";
import Paginator from "@/components/common/Paginator";

const initStatus = [
  "PENDING",
  "IN_PROGRESS",
  "SHIPPING",
  "DELIVERED",
  "CANCELLED",
];

const ManageOrder = () => {
  useDocumentTitle("Quản lý đơn hàng");
  const [status, setStatus] = useState("PENDING");
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await getOrdersByStatus(currentPage, status);
      setOrders(response.data?.content);
      setTotalPages(response.data?.page?.totalPages);
      console.log("hehehe");
    } catch (error) {
      console.error("Error fetching orders: ", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [status, currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="grid grid-cols-5 grid-rows-5 gap-4">
      <div className="col-span-5 bg-slate-200 border rounded-md">
        <div className="flex flex-wrap gap-2 mx-5 my-5">
          {initStatus.map((item) => (
            <Button
              key={item}
              onClick={() => setStatus(item)}
              className={`transition-colors duration-200 ${
                status === item
                  ? "bg-orange-600 text-white hover:bg-orange-400"
                  : "bg-gray-100 text-black hover:bg-orange-400 hover:text-white"
              }`}
            >
              {item.replace("_", " ")}
            </Button>
          ))}
        </div>
      </div>
      <div className="col-span-5 row-span-3 row-start-2 bg-slate-200 border rounded-md">
        <OrdersTable data={orders} status={status} />
      </div>
      <div className="col-span-5 row-start-5">
        <Paginator
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ManageOrder;
