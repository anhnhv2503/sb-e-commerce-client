import React, { createContext, useContext, useState } from "react";
import { loginUser } from "../service/ApiFunctions";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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
      navigate("/");
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
