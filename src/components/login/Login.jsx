import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() === "" || !password.trim() === "") {
      toast.error("Email and password are required.", {
        duration: 4000,
        position: "top-right",
        icon: "❌",
      });
    } else {
      login({ email, password });
    }
    // Add your login logic here
  };

  return (
    <div className="flex items-center justify-center min-h-96 p-8 pb-44">
      <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-md rounded-lg">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Sign In
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-2 input input-bordered bg-white text-black border-gray-300"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-2 input input-bordered bg-white text-black border-gray-300"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-slate-500 rounded-md hover:bg-slate-600 focus:ring-2 focus:ring-slate-500"
              onClick={handleSubmit}
            >
              Login
            </button>
          </div>
        </form>

        {/* Forgot Password Link */}
        <p className="text-sm text-center text-gray-500">
          <a href="#" className="text-red-500 hover:underline">
            Forgot your password?
          </a>
        </p>

        <p className="text-sm text-center text-gray-500">
          <a href="/register" className="text-blue-500 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;
