import { XCircle, RefreshCw, ArrowRight } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { motion } from "framer-motion";

/**
 * VerifyEmailFailed Page
 * Redesigned to match SKILL.md artistic design system
 */
const VerifyEmailFailed = () => {
  const navigate = useNavigate();
  useDocumentTitle("Xác Nhận Email Thất Bại — VA Shop");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full p-8 bg-white rounded-3xl shadow-xl shadow-red-900/5 text-center relative overflow-hidden"
      >
        {/* Background decorative blob */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner"
          >
            <XCircle className="w-10 h-10 text-red-500" />
          </motion.div>
          
          <h1 className="font-display text-3xl font-bold text-[#111827] mb-3">
            Xác Nhận Thất Bại
          </h1>
          
          <p className="text-gray-500 leading-relaxed mb-8">
            Rất tiếc, chúng tôi không thể xác nhận địa chỉ email của bạn. Đường dẫn có thể đã hết hạn hoặc không hợp lệ. Vui lòng thử đăng ký lại.
          </p>

          <div className="space-y-3">
            <button
              onClick={() => navigate("/register")}
              className="w-full h-12 flex items-center justify-center gap-2 bg-[#DC2626] hover:bg-red-700 text-white rounded-xl font-semibold shadow-md shadow-red-500/20 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DC2626]"
            >
              <RefreshCw size={18} />
              Đăng Ký Lại
            </button>
            
            <button
              onClick={() => navigate("/")}
              className="w-full h-12 flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 hover:text-[#111827] hover:border-gray-300 hover:bg-gray-50 rounded-xl font-semibold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400"
            >
              Về Trang Chủ
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default VerifyEmailFailed;
