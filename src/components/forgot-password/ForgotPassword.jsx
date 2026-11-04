import { forgotPassword } from "@/components/service/ApiFunctions";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useDocumentTitle } from "@uidotdev/usehooks";
import React, { useState } from "react";
import { toast, Toaster } from "sonner";
import { Mail, ArrowLeft, KeyRound } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

/**
 * ForgotPassword Page
 * Redesigned to match SKILL.md artistic design system
 */
const ForgotPassword = () => {
  useDocumentTitle("Quên Mật Khẩu — VA Shop");
  const nav = useNavigate();
  const [progress, setProgress] = useState(10);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.trim() === "") {
      toast.error("Vui lòng nhập địa chỉ email của bạn.", {
        duration: 4000,
      });
      return;
    }

    try {
      setLoading(true);
      setSuccess(false);
      setProgress(30);

      setTimeout(() => {
        if (progress < 90) setProgress(80);
      }, 1000);

      const response = await forgotPassword(email);
      if (response.status === 200) {
        setProgress(100);
        setSuccess(true);
        toast.success(response.data?.data || "Email khôi phục đã được gửi!", {
          richColors: true,
        });
        setEmail("");
      }
    } catch (error) {
      setProgress(0);
      toast.error(
        error.response?.data?.data ||
          "Không thể gửi email khôi phục. Vui lòng thử lại.",
        {
          duration: 4000,
        },
      );
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#eff0f3] px-4 py-12 relative overflow-hidden">
      {/* Background glowing blobs */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-md relative z-10 overflow-hidden border border-hairline"
      >
        <div className="bg-[#111827] px-8 py-10 relative overflow-hidden border-b border-gray-800 font-label font-semibold tracking-[0.057em]">
          <button
            onClick={() => nav(-1)}
            className="absolute top-6 left-6 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
          </button>

          <div className="relative z-10 flex flex-col items-center text-center mt-4">
            <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center border border-white/10 mb-4">
              <KeyRound size={32} className="text-[#d9376e]" />
            </div>
            <h2 className="font-display text-[40px] text-white mb-2">
              Quên Mật Khẩu
            </h2>
            <p className="text-gray-400 text-sm max-w-xs mx-auto">
              Nhập email đã đăng ký của bạn. Chúng tôi sẽ gửi hướng dẫn khôi
              phục mật khẩu.
            </p>
          </div>
        </div>

        <div className="p-8 space-y-6 bg-white">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-xs font-semibold text-gray-500 uppercase tracking-wider font-mono"
            >
              Địa Chỉ Email
            </label>
            <div className="relative">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                id="email"
                type="email"
                className="w-full pl-11 pr-4 h-12 bg-gray-50 border border-gray-200 text-[#111827] rounded-lg focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6] transition-all"
                placeholder="Ví dụ: email@domain.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSubmit(e);
                }}
              />
            </div>
          </div>

          <div>
            {loading ? (
              <div className="space-y-2">
                <Progress value={progress} className="h-2 w-full bg-blue-100" />
                <p className="text-xs text-center text-gray-500 animate-pulse font-mono">
                  Đang xử lý yêu cầu...
                </p>
              </div>
            ) : (
              <Button
                className="w-full h-12 bg-[#ff8e3c] hover:bg-[#ff8e3c] border border-hairline text-white rounded text-base transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6] font-label font-semibold tracking-[0.057em]"
                onClick={handleSubmit}
              >
                Gửi Hướng Dẫn
              </Button>
            )}
          </div>

          {success && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="bg-green-50 text-green-700 p-4 rounded-lg text-sm text-center font-medium border border-green-200"
            >
              Email đã được gửi thành công! Vui lòng kiểm tra hộp thư đến (và
              thư mục rác) của bạn.
            </motion.div>
          )}
        </div>
      </motion.div>
      <Toaster position="top-center" />
    </div>
  );
};

export default ForgotPassword;
