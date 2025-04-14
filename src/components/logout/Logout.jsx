import { useAuth } from "@/components/auth/AuthContext";
import LogoutToast from "@/components/common/toasts/LogoutToast";
import { Button } from "@/components/ui/button";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

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
