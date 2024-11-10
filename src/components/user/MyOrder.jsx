import { Button } from "@/components/ui/button";
import OrdersTable from "@/components/user/OrdersTable";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { useState } from "react";

const initStatus = [
  "PENDING",
  "IN_PROGRESS",
  "SHIPPING",
  "DELIVERED",
  "CANCELLED",
];

const MyOrder = () => {
  useDocumentTitle("Đơn hàng của tôi");
  const [status, setStatus] = useState("PENDING");
  return (
    <div className=" my-10 flex justify-center px-4 md:px-0 pb-44">
      <div className="w-full max-w-7xl shadow-md rounded-lg">
        <div className="flex flex-col p-6 space-y-6">
          <div className="flex flex-wrap gap-2">
            {initStatus.map((item) => (
              <Button
                key={item}
                onClick={() => setStatus(item)}
                className={`transition-colors duration-200 ${
                  status === item
                    ? "bg-indigo-600 text-white hover:bg-indigo-400"
                    : "bg-gray-100 text-black hover:bg-indigo-400 hover:text-white"
                }`}
              >
                {item.replace("_", " ")}
              </Button>
            ))}
          </div>
          <OrdersTable status={status} />
        </div>
      </div>
    </div>
  );
};

export default MyOrder;
