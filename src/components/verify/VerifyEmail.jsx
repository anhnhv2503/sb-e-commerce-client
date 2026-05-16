import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyEmail } from "../service/ApiFunctions";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { motion } from "framer-motion";

const VerifyEmail = () => {
  useDocumentTitle("Đang Xác Nhận Email...");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleConfirmEmail = async () => {
      const paramUrl = new URLSearchParams(location.search);
      const tokenParam = paramUrl.get("token");
      try {
        const response = await verifyEmail(tokenParam);
        if (response) {
          navigate("/email/verify/success");
        } else {
          navigate("/email/verify/failed");
        }
      } catch (error) {
        navigate("/email/verify/failed");
      }
    };
    handleConfirmEmail();
  }, [location.search, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50/50">
      <motion.div 
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        className="w-24 h-24 relative flex items-center justify-center"
      >
        <div className="absolute inset-0 rounded-full border-4 border-gray-100" />
        <div className="absolute inset-0 rounded-full border-4 border-[#3B82F6] border-t-transparent animate-spin" />
      </motion.div>
      <motion.h2 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 font-display text-2xl font-bold text-[#111827]"
      >
        Đang Xác Nhận...
      </motion.h2>
      <p className="mt-2 text-gray-500">Vui lòng đợi trong giây lát</p>
    </div>
  );
};

export default VerifyEmail;
