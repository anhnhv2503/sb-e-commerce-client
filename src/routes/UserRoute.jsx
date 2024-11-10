import { AuthProvider } from "@/components/auth/AuthContext";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const UserRoute = () => {
  const user = JSON.parse(localStorage.getItem("accessToken"));
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const decodedUser = jwtDecode(user);
      if (decodedUser.roles[0] !== "ROLE_USER") {
        navigate("/");
      }
    }
  }, []);
  return (
    <AuthProvider>
      <Header />
      <Outlet />
      <Footer />
    </AuthProvider>
  );
};

export default UserRoute;
