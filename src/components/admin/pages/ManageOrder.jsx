import OrdersTable from "@/components/admin/pages/OrdersTable";
import Paginator from "@/components/common/Paginator";
import { getOrdersByStatus } from "@/components/service/ApiFunctions";
import { Button } from "@/components/ui/button";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";

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
    <div className="">
      <div className="mb-5">
        <div className="">
          {initStatus.map((item) => (
            <Button
              key={item}
              onClick={() => setStatus(item)}
              className={`transition-colors duration-200 mx-1 ${
                status === item
                  ? "bg-gradient-to-t from-slate-800 to-slate-500 text-white hover:from-slate-900 hover:to-slate-400"
                  : "bg-gray-100 text-black hover:bg-slate-600 hover:text-white"
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
      <div className="col-span-5 row-start-5 mt-5">
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
