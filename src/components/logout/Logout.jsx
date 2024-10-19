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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
        />
      </svg>
      Logout
    </Button>
  );
};

export default Logout;
