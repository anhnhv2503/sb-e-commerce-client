import { resetPassword } from "@/components/service/ApiFunctions";
import { Button } from "@/components/ui/button";
import { useDocumentTitle } from "@uidotdev/usehooks";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { KeyRound, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

/**
 * ResetPassword Page
 * Redesigned to match SKILL.md artistic design system
 */
const ResetPassword = () => {
  useDocumentTitle("Đặt Lại Mật Khẩu — VA Shop");
  const location = useLocation();
  const nav = useNavigate();
  const paramUrl = new URLSearchParams(location.search);
  const tokenParam = paramUrl.get("token");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!tokenParam) {
      nav("/login");
    }
  }, [tokenParam, nav]);

  const handleSavePassword = async (e) => {
    e.preventDefault();
    if (password.trim() === "" || confirmPassword.trim() === "") {
      toast.error("Vui lòng nhập đầy đủ mật khẩu mới và xác nhận mật khẩu.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp.");
      return;
    }

    try {
      setLoading(true);
      const response = await resetPassword(tokenParam, password);
      if (response) {
        toast.success("Mật khẩu đã được cập nhật thành công.", {
          richColors: true,
          action: {
            label: "Đăng Nhập Ngay",
            onClick: () => nav("/login"),
          },
        });
        setConfirmPassword("");
        setPassword("");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.data ||
          "Không thể đặt lại mật khẩu. Token có thể đã hết hạn.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#eff0f3] px-4 py-12 relative overflow-hidden">
      {/* Background glowing blobs */}

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-md relative z-10 overflow-hidden"
      >
        <div className="bg-[#111827] px-8 py-10 relative overflow-hidden border-b border-gray-800 font-label font-semibold tracking-[0.057em]">
          <div className="relative z-10 flex flex-col items-center text-center mt-2">
            <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center border border-white/10 mb-4">
              <ShieldCheck size={32} className="text-[#d9376e]" />
            </div>
            <h2 className="font-display text-[40px] text-white mb-2">
              Đặt Lại Mật Khẩu
            </h2>
            <p className="text-gray-400 text-sm max-w-xs mx-auto">
              Vui lòng nhập mật khẩu mới bảo mật cho tài khoản của bạn.
            </p>
          </div>
        </div>

        <div className="p-8 space-y-5 bg-white">
          <div className="space-y-2">
            <label
              htmlFor="newPassword"
              className="block text-xs font-semibold text-gray-500 uppercase tracking-wider font-mono"
            >
              Mật Khẩu Mới
            </label>
            <div className="relative">
              <KeyRound
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-900"
                size={18}
              />
              <input
                id="newPassword"
                type={showPassword ? "text" : "password"}
                className="w-full pl-11 pr-12 h-12 bg-gray-50 border border-hairline text-[#111827] rounded-md focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6] transition-all"
                placeholder="Nhập mật khẩu mới"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="confirmPassword"
              className="block text-xs font-semibold text-gray-500 uppercase tracking-wider font-mono"
            >
              Xác Nhận Mật Khẩu
            </label>
            <div className="relative">
              <KeyRound
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-900"
                size={18}
              />
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                className="w-full pl-11 pr-12 h-12 bg-gray-50 border border-hairline text-[#111827] rounded-lg focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6] transition-all"
                placeholder="Nhập lại mật khẩu mới"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSavePassword(e);
                }}
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <Button
              className="w-full h-12 bg-[#ff8e3c] hover:bg-[#ff8e3c] text-white rounded text-base transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6] font-label font-semibold tracking-[0.057em]"
              onClick={handleSavePassword}
              disabled={loading}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                "Lưu Mật Khẩu"
              )}
            </Button>
          </div>
        </div>
      </motion.div>
      <Toaster position="top-center" />
    </div>
  );
};

export default ResetPassword;
