import SideBar from "@/components/admin/layout/SideBar";
import { AuthProvider } from "@/components/auth/AuthContext";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AdminRoute = () => {
  const user = JSON.parse(localStorage.getItem("accessToken"));
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const decodedUser = jwtDecode(user);
      if (decodedUser.roles[0] !== "ROLE_ADMIN") {
        navigate("/");
      }
    }
  }, []);
  return (
    <AuthProvider>
      <div className="flex">
        <div className="flex-col h-screen">
          <SideBar />
        </div>
        <div className="flex-1 p-6 bg-gradient-to-b from-gray-100 to-gray-100 overflow-y-auto h-screen">
          <Outlet />
        </div>
      </div>
    </AuthProvider>
  );
};

export default AdminRoute;
