import { Checkbox } from "@/components/ui/checkbox";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaArrowRight, FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { authConfig } from "@/config/authConfig";

const Login = () => {
  useDocumentTitle("Login");
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() === "" || !password.trim() === "") {
      toast.error("Vui lòng điền Email và Mật khẩu", {
        duration: 4000,
        position: "top-right",
        icon: "❌",
      });
    } else {
      login({ email, password });
    }
  };

  const handleGoogleLogin = () => {
    const callbackUrl = authConfig.redirect_uris;
    const authUrl = authConfig.auth_uri;
    const googleClientId = authConfig.client_id;

    const targetUrl = `${authUrl}?redirect_uri=${encodeURIComponent(
      callbackUrl
    )}&response_type=code&client_id=${googleClientId}&scope=openid%20email%20profile`;
    window.location.href = targetUrl;
  };

  return (
    <div className="flex items-center justify-center min-h-96 p-8 pb-96">
      <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-md rounded-lg">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          ĐĂNG NHẬP
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-2 input input-bordered bg-white text-black border-gray-300"
              placeholder="Email của bạn"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Mật khẩu
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-2 input input-bordered bg-white text-black border-gray-300"
              placeholder="Mật khẩu của bạn"
              required
            />
          </div>
          <div className="mt-1">
            <Checkbox
              className="mr-2"
              onCheckedChange={() => setShowPassword(!showPassword)}
            />
            Show Password
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:to-pink-500 rounded-full flex items-center justify-center gap-2"
              onClick={handleSubmit}
            >
              <FaArrowRight />
              Đăng Nhập
            </button>
          </div>
        </form>
        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-rose-700 hover:bg-rose-800 rounded-full flex items-center justify-center gap-2"
            onClick={handleGoogleLogin}
          >
            <FaGoogle />
            Đăng Nhập với Google
          </button>
        </div>
        <p className="text-sm text-center text-gray-500">
          <a
            onClick={() => nav("/forgot/password")}
            className="text-red-500 hover:underline cursor-pointer"
          >
            Quên Mật khẩu?
          </a>
        </p>

        <p className="text-sm text-center text-gray-500">
          <a
            onClick={() => nav("/register")}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Đăng Kí Tài Khoản
          </a>
        </p>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;
