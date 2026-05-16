import { CheckCircle, ShoppingBag, ArrowRight } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { motion } from "framer-motion";

/**
 * OrderSuccess Page
 * Redesigned to match SKILL.md artistic design system
 */
const OrderSuccess = () => {
  const navigate = useNavigate();
  useDocumentTitle("Đặt Hàng Thành Công — VA Shop");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full p-8 bg-white rounded-3xl shadow-xl shadow-blue-900/5 text-center relative overflow-hidden"
      >
        {/* Background decorative blob */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner"
          >
            <CheckCircle className="w-10 h-10 text-green-500" />
          </motion.div>
          
          <h1 className="font-display text-3xl font-bold text-[#111827] mb-3">
            Đặt Hàng Thành Công!
          </h1>
          
          <p className="text-gray-500 leading-relaxed mb-8">
            Cảm ơn bạn đã tin tưởng mua sắm tại VA Shop. Đơn hàng của bạn đã được tiếp nhận và sẽ được xử lý trong thời gian sớm nhất.
          </p>

          <div className="space-y-3">
            <button
              onClick={() => navigate("/user/profile")}
              className="w-full h-12 flex items-center justify-center gap-2 bg-[#111827] hover:bg-gray-800 text-white rounded-xl font-semibold shadow-md transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
            >
              <ShoppingBag size={18} />
              Theo Dõi Đơn Hàng
            </button>
            
            <button
              onClick={() => navigate("/shop")}
              className="w-full h-12 flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 hover:text-[#3B82F6] hover:border-blue-200 hover:bg-blue-50 rounded-xl font-semibold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6]"
            >
              Tiếp Tục Mua Sắm
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;
