import LogoutToast from "@/components/logout/LogoutToast";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import { useAuth } from "../auth/AuthContext";
import { Button } from "../ui/button";

const Logout = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.custom((t) => <LogoutToast t={t} />, {
      position: "bottom-left",
    });
  };

  return (
    <Button onClick={handleLogout} className="bg-red-500 hover:bg-rose-600">
      <ArrowLeftStartOnRectangleIcon className="h-7 w-7 mr-2" />
      Thoát
    </Button>
  );
};

export default Logout;
