import { useDocumentTitle } from "@uidotdev/usehooks";
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Home, SearchX } from "lucide-react";

/**
 * NotFound Page
 * Redesigned to match SKILL.md artistic design system
 */
const NotFound = () => {
  const nav = useNavigate();
  useDocumentTitle("404 Không Tìm Thấy — VA Shop");

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#111827] relative overflow-hidden px-4 sm:px-6 lg:px-8 font-label font-semibold tracking-[0.057em]">
      {/* Abstract Background Elements */}
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center relative z-10 max-w-lg w-full"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
          className="w-24 h-24 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center mx-auto mb-8"
        >
          <SearchX size={48} className="text-[#3B82F6]" />
        </motion.div>

        <h1 className="font-display text-8xl text-white mb-4">
          404
        </h1>
        <h2 className="font-display text-[40px] text-white mb-4">
          Không Tìm Thấy Trang
        </h2>
        <p className="text-gray-400 mb-10 leading-relaxed">
          Đường dẫn bạn đang cố truy cập không tồn tại, đã bị xóa hoặc tên miền đã thay đổi. Vui lòng kiểm tra lại URL hoặc quay về trang chủ.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => nav(-1)}
            className="w-full sm:w-auto h-12 px-6 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold border border-white/10 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <ArrowLeft size={18} />
            Quay Lại
          </button>
          
          <button 
            onClick={() => nav("/")}
            className="w-full sm:w-auto h-12 px-8 flex items-center justify-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-lg font-semibold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6]"
          >
            <Home size={18} />
            Trang Chủ
          </button>
        </div>
      </motion.div>

      <div className="absolute bottom-8 text-center text-white/30 text-sm font-mono tracking-widest uppercase">
        VA Shop System Error
      </div>
    </div>
  );
};

export default NotFound;
