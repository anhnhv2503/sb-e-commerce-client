import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const PrivateRoute = () => {
  const navigate = useNavigate();

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
