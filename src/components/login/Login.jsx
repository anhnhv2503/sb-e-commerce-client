import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { useNavigate } from "react-router-dom";

const Login = () => {
  useDocumentTitle("Login");
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

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

  return (
    <div className="flex items-center justify-center min-h-96 p-8 pb-44">
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
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-2 input input-bordered bg-white text-black border-gray-300"
              placeholder="Mật khẩu của bạn"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-slate-500 rounded-md hover:bg-slate-600 focus:ring-2 focus:ring-slate-500"
              onClick={handleSubmit}
            >
              Đăng Nhập
            </button>
          </div>
        </form>
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
