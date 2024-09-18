import React, { createContext, useContext, useState } from "react";
import { loginUser } from "../service/ApiFunctions";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (userData) => {
    // Add your login logic here
    try {
      const response = await loginUser(userData);
      setUser(response.data);
      console.log(response.data);
      localStorage.setItem(
        "accessToken",
        JSON.stringify(response.data?.accessToken)
      );
      toast.success("Login successful", {
        duration: 2000,
      });
      window.location.href = "/";
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const logout = () => {
    // Add your logout logic here
    localStorage.removeItem("accessToken");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
