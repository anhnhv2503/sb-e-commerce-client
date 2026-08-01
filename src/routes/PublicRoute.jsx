import { AuthProvider } from "@/components/auth/AuthContext";
import { Outlet } from "react-router-dom";

const PublicRoute = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};

export default PublicRoute;
