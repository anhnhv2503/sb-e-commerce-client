import { AuthProvider } from "@/components/auth/AuthContext";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import { Outlet, useNavigate } from "react-router-dom";

const PublicRoute = () => {
  const user = JSON.parse(localStorage.getItem("accessToken"));
  const navigate = useNavigate();

  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};

export default PublicRoute;
