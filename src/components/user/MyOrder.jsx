import OrdersTable from "@/components/user/OrdersTable";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { motion, LayoutGroup } from "framer-motion";
import { useState } from "react";
import { ShoppingBag } from "lucide-react";

const initStatus = [
  { id: "PENDING", label: "Chờ Xử Lý" },
  { id: "IN_PROGRESS", label: "Đang Xử Lý" },
  { id: "SHIPPING", label: "Đang Giao" },
  { id: "DELIVERED", label: "Đã Giao" },
  { id: "CANCELLED", label: "Đã Hủy" },
];

/**
 * MyOrder Page
 * Redesigned to match SKILL.md artistic design system
 */
const MyOrder = () => {
  useDocumentTitle("Đơn Hàng Của Tôi — VA Shop");
  const [status, setStatus] = useState("PENDING");

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-6"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-[#111827] flex items-center gap-3">
              <ShoppingBag size={28} className="text-[#3B82F6]" />
              Đơn Hàng Của Tôi
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Quản lý và theo dõi trạng thái các đơn hàng bạn đã đặt
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Status Tabs */}
          <div className="border-b border-gray-100 overflow-x-auto no-scrollbar">
            <LayoutGroup>
              <div className="flex p-2 min-w-max">
                {initStatus.map((item) => {
                  const isActive = status === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setStatus(item.id)}
                      className={`relative px-6 py-3 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3B82F6] rounded-xl
                        ${isActive ? "text-[#3B82F6]" : "text-gray-500 hover:text-[#111827] hover:bg-gray-50"}
                      `}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-blue-50 rounded-xl"
                          initial={false}
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </LayoutGroup>
          </div>

          {/* Table Content */}
          <div className="p-0 sm:p-4">
            <OrdersTable status={status} />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MyOrder;
