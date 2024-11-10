import React from "react";
import { Button } from "../ui/button";
import { useAuth } from "../auth/AuthContext";
import { useCart } from "../context/CartContext";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";

const Logout = () => {
  const { logout } = useAuth();
  const { cart, dispatch } = useCart();

  const handleLogout = () => {
    // Add your logout logic here
    dispatch({ type: "CLEAR_CART" });
    logout();
    sessionStorage.removeItem("vnpayRequest");
  };

  return (
    <Button
      onClick={handleLogout}
      className="bg-gradient-to-r from-rose-500 to-rose-300 hover:from-rose-400 hover:to-rose-700"
    >
      <ArrowLeftStartOnRectangleIcon className="h-7 w-7 mr-2" />
      Thoát
    </Button>
  );
};

export default Logout;
