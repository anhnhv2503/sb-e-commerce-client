import React from "react";
import { Button } from "../ui/button";
import { useAuth } from "../auth/AuthContext";
import { useCart } from "../context/CartContext";

const Logout = () => {
  const { logout } = useAuth();
  const { cart, dispatch } = useCart();

  const handleLogout = () => {
    // Add your logout logic here
    dispatch({ type: "CLEAR_CART" });
    logout();
  };

  return (
    <Button onClick={handleLogout} variant="destructive">
      Logout
    </Button>
  );
};

export default Logout;
