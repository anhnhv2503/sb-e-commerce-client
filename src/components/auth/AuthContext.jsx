import { getCurrentUser, isAdmin } from "@/lib/auth";
import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../service/ApiFunctions";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const login = async (userData) => {
    // Add your login logic here
    try {
      const response = await loginUser(userData);
      setUser(response.data);
      localStorage.setItem(
        "accessToken",
        JSON.stringify(response.data?.accessToken),
      );
      const from = location.state?.from;
      const wantsAdmin = typeof from === "string" && from.startsWith("/admin");
      if (isAdmin(getCurrentUser())) {
        // Admins go back to the admin page they were sent away from, else the console home
        navigate(wantsAdmin ? from : "/admin", { replace: true });
      } else {
        // Regular users never get sent into /admin (the guard would bounce them)
        navigate(from && !wantsAdmin ? from : "/", { replace: true });
      }
      toast.success("Đăng nhập thành công", {
        duration: 4000,
        position: "top-right",
        icon: "✅",
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
