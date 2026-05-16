import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authConfig } from "@/config/authConfig";
import { loginSchema } from "@/schemas/auth.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { motion } from "framer-motion";
import { ArrowRight, Eye, EyeOff, Lock, Mail, Sparkles } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, when: "beforeChildren", staggerChildren: 0.07 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

const Login = () => {
  useDocumentTitle("Đăng Nhập — VA Shop");
  const { login } = useAuth();
  const nav = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const onSubmit = async (data) => {
    login(data);
  };

  const handleGoogleLogin = () => {
    const callbackUrl = authConfig.redirect_uris;
    const authUrl = authConfig.auth_uri;
    const googleClientId = authConfig.client_id;
    const targetUrl = `${authUrl}?redirect_uri=${encodeURIComponent(
      callbackUrl,
    )}&response_type=code&client_id=${googleClientId}&scope=openid%20email%20profile`;
    window.location.href = targetUrl;
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex">
      {/* ── Left decorative panel (hidden on mobile) ── */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#111827] items-center justify-center overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-[#3B82F6]/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#8B5CF6]/20 rounded-full blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative z-10 px-16 max-w-lg text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-white/80 text-sm font-mono tracking-widest uppercase mb-8">
            <Sparkles size={14} className="text-[#8B5CF6]" aria-hidden="true" />
            VA Shop
          </div>
          <h2 className="font-display text-4xl xl:text-5xl text-white leading-tight mb-6">
            Chào Mừng Trở Lại
          </h2>
          <p className="text-white/60 text-base leading-relaxed">
            Đăng nhập để truy cập giỏ hàng, theo dõi đơn hàng và khám phá bộ sưu tập mới nhất.
          </p>
        </motion.div>
      </div>

      {/* ── Right form panel ── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-gray-50">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md"
        >
          <Card className="border border-gray-200 shadow-lg bg-white">
            <CardHeader className="pb-2 pt-8 px-8">
              <motion.div variants={itemVariants}>
                <h1 className="font-display text-3xl font-bold text-[#111827] text-center">
                  ĐĂNG NHẬP
                </h1>
                <p className="text-sm text-gray-500 text-center mt-2">
                  Nhập thông tin tài khoản của bạn
                </p>
              </motion.div>
            </CardHeader>

            <CardContent className="space-y-5 px-8 pb-8 pt-4">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Email */}
                <motion.div variants={itemVariants}>
                  <Label htmlFor="login-email" className="text-[#111827] text-sm font-medium">
                    Email
                  </Label>
                  <div className="relative mt-1.5">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
                    <Input
                      id="login-email"
                      type="email"
                      {...register("email")}
                      placeholder="you@example.com"
                      required
                      className="pl-10 h-11 bg-white border-gray-300 focus:border-[#3B82F6] focus:ring-[#3B82F6] text-[#111827] transition-all"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-[#DC2626] text-xs mt-1.5" role="alert">{errors.email.message}</p>
                  )}
                </motion.div>

                {/* Password */}
                <motion.div variants={itemVariants}>
                  <Label htmlFor="login-password" className="text-[#111827] text-sm font-medium">
                    Mật khẩu
                  </Label>
                  <div className="relative mt-1.5">
                    <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
                    <Input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      {...register("password")}
                      placeholder="••••••••"
                      required
                      className="pl-10 pr-10 h-11 bg-white border-gray-300 focus:border-[#3B82F6] focus:ring-[#3B82F6] text-[#111827] transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3B82F6] rounded"
                      aria-label={showPassword ? "Ẩn mật khẩu" : "Hiển thị mật khẩu"}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-[#DC2626] text-xs mt-1.5" role="alert">{errors.password.message}</p>
                  )}
                </motion.div>

                {/* Show password checkbox */}
                <motion.div variants={itemVariants} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="login-show-password"
                      checked={showPassword}
                      onCheckedChange={() => setShowPassword(!showPassword)}
                      className="border-gray-400 data-[state=checked]:bg-[#3B82F6] data-[state=checked]:border-[#3B82F6]"
                    />
                    <Label htmlFor="login-show-password" className="text-sm text-gray-500 cursor-pointer">
                      Hiển thị mật khẩu
                    </Label>
                  </div>
                  <button
                    type="button"
                    onClick={() => nav("/forgot/password")}
                    className="text-sm text-[#3B82F6] hover:text-[#2563EB] font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3B82F6] rounded"
                  >
                    Quên mật khẩu?
                  </button>
                </motion.div>

                {/* Error */}
                {error && (
                  <p className="text-[#DC2626] text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-2" role="alert">
                    {error}
                  </p>
                )}

                {/* Submit */}
                <motion.div variants={itemVariants}>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    id="login-submit-btn"
                    className="w-full h-12 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold text-base transition-colors shadow-md shadow-blue-500/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6] rounded-lg"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Đăng Nhập
                        <ArrowRight size={16} className="ml-2" aria-hidden="true" />
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>

              {/* Divider */}
              <motion.div variants={itemVariants} className="flex items-center gap-4">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-xs text-gray-400 uppercase tracking-widest font-mono">hoặc</span>
                <div className="flex-1 h-px bg-gray-200" />
              </motion.div>

              {/* Google */}
              <motion.div variants={itemVariants}>
                <Button
                  variant="outline"
                  id="login-google-btn"
                  className="w-full h-12 bg-white hover:bg-gray-50 text-[#111827] border-gray-300 font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6] rounded-lg"
                  onClick={handleGoogleLogin}
                >
                  <FaGoogle className="mr-2 text-[#EA4335]" />
                  Đăng Nhập với Google
                </Button>
              </motion.div>

              {/* Register link */}
              <motion.div variants={itemVariants}>
                <p className="text-sm text-center text-gray-500">
                  Chưa có tài khoản?{" "}
                  <button
                    onClick={() => nav("/register")}
                    className="text-[#3B82F6] hover:text-[#2563EB] font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3B82F6] rounded"
                  >
                    Đăng Ký Ngay
                  </button>
                </p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
