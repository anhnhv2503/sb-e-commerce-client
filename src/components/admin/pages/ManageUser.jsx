import { useDocumentTitle } from "@uidotdev/usehooks";
import { motion } from "framer-motion";
import { Users, UserCog } from "lucide-react";
import React from "react";

/**
 * ManageUser Page
 * Redesigned placeholder to match SKILL.md artistic design system
 */
const ManageUser = () => {
  useDocumentTitle("Khách Hàng — VA Shop Admin");

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-6xl mx-auto space-y-6 pb-12"
    >
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-[#111827] flex items-center gap-3">
            <Users size={28} className="text-[#3B82F6]" />
            Quản Lý Khách Hàng
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Xem thông tin và quản lý tài khoản người dùng hệ thống
          </p>
        </div>
      </div>

      {/* Empty / Construction State */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden min-h-[400px] flex flex-col items-center justify-center p-8 text-center">
        <div className="relative">
          <div className="absolute inset-0 bg-[#3B82F6]/20 blur-2xl rounded-full" />
          <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center relative z-10 border border-gray-100 shadow-sm mb-6">
            <UserCog size={40} className="text-[#3B82F6]" />
          </div>
        </div>
        
        <h2 className="font-display text-2xl font-bold text-[#111827] mb-3">
          Tính Năng Đang Phát Triển
        </h2>
        
        <p className="text-gray-500 max-w-md mx-auto leading-relaxed">
          Khu vực quản lý khách hàng đang trong quá trình hoàn thiện. Xin vui lòng quay lại sau khi tính năng này được cập nhật ở phiên bản tiếp theo.
        </p>
      </div>
    </motion.div>
  );
};

export default ManageUser;
