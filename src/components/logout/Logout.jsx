import React from "react";
import { Button } from "../ui/button";
import { useAuth } from "../auth/AuthContext";

const Logout = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    // Add your logout logic here
    logout();
  };

  return <Button onClick={handleLogout}>Logout</Button>;
};

export default Logout;
