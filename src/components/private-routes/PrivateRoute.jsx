import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const PrivateRoute = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    //check user is logged in or not
    const token = localStorage.getItem("accessToken");
    if (!token) {
      //redirect to login page
      navigate("/login");
    }
  }, []);

  return <Outlet />;
};

export default PrivateRoute;
