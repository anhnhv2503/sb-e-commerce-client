import React, { createContext, useContext, useState } from "react";
import { loginUser } from "../service/ApiFunctions";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const login = async (userData) => {
    // Add your login logic here
    try {
      const response = await loginUser(userData);
      setUser(response.data);
      localStorage.setItem(
        "accessToken",
        JSON.stringify(response.data?.accessToken)
      );
      toast.success("Login successful", {
        duration: 2000,
      });
      const token = localStorage.getItem("accessToken");
      const decodedToken = jwtDecode(token);
      if (decodedToken.roles[0] === "ROLE_ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const logout = () => {
    // Add your logout logic here
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
