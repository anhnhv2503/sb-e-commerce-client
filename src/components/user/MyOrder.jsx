import OrdersTable from "@/components/user/OrdersTable";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { motion } from "framer-motion";
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
    <div className="my-10 flex justify-center px-4 md:px-0 pb-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-7xl shadow-lg rounded-2xl bg-white p-6"
      >
        <div className="flex flex-col space-y-6">
          <div className="flex flex-wrap gap-2">
            {initStatus.map((item) => (
              <motion.button
                key={item}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setStatus(item)}
                className={`transition-all duration-300 px-4 py-2 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md 
                  ${
                    status === item
                      ? "bg-gradient-to-tr text-white from-indigo-500 to-teal-500 hover:from-indigo-400 hover:to-teal-400"
                      : "bg-gray-100 text-black hover:bg-gradient-to-br hover:from-indigo-400 hover:to-teal-400 hover:text-white"
                  }
                `}
              >
                {item.replace("_", " ")}
              </motion.button>
            ))}
          </div>
          <OrdersTable status={status} />
        </div>
      </motion.div>
    </div>
  );
};

export default MyOrder;
