import React from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, ArrowRight } from "lucide-react";

/**
 * EmtyCart Component
 * Redesigned empty state to match SKILL.md artistic guidelines
 */
const EmtyCart = () => {
  const nav = useNavigate();
  return (
    <div className="bg-white shadow-sm border border-gray-100 rounded-3xl p-12 text-center max-w-lg mx-auto w-full flex flex-col items-center justify-center">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-[#3B82F6]/20 blur-2xl rounded-full" />
        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center relative z-10 border border-gray-100 shadow-sm">
          <ShoppingBag size={40} className="text-[#3B82F6]" />
        </div>
      </div>
      
      <h2 className="font-display text-2xl font-bold text-[#111827] mb-3">
        Giỏ Hàng Trống
      </h2>
      
      <p className="text-gray-500 mb-8 max-w-sm">
        Chưa có sản phẩm nào trong giỏ hàng của bạn. Hãy khám phá hàng ngàn sản phẩm tuyệt vời của chúng tôi ngay hôm nay!
      </p>
      
      <button
        onClick={() => nav("/shop")}
        className="h-12 px-8 bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-xl shadow-md shadow-blue-500/20 font-semibold flex items-center justify-center gap-2 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6]"
      >
        Mua Sắm Ngay
        <ArrowRight size={18} />
      </button>
    </div>
  );
};

export default EmtyCart;
