import Logout from "@/components/logout/Logout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useNavigate } from "react-router-dom";

const UserPopover = () => {
  const token = localStorage.getItem("accessToken");
  const nav = useNavigate();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>VA</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="w-52">
        <div className="grid gap-1">
          <div className="space-y-2"></div>
          <div className="grid gap-2">
            {token ? (
              <>
                <div className="grid grid-cols-1 items-center gap-4">
                  <Button
                    onClick={() => nav("/user/profile")}
                    className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-500 hover:to-cyan-500"
                  >
                    Thông tin
                  </Button>
                </div>
                <div className="grid grid-cols-1 items-center gap-4">
                  <Button
                    onClick={() => nav("/user/my-orders")}
                    className="bg-gradient-to-tr from-indigo-400 to-cyan-400 hover:from-indigo-500 hover:to-cyan-500"
                  >
                    Đơn hàng của Tôi
                  </Button>
                </div>
                <div className="grid grid-cols-1 items-center gap-4">
                  <Logout />
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-1 items-center gap-4">
                  <Button
                    className="bg-gradient-to-tr from-indigo-400 to-cyan-400 hover:from-indigo-500 hover:to-cyan-500"
                    onClick={() => nav("/login")}
                  >
                    Đăng Nhập
                  </Button>
                </div>
                <div className="grid grid-cols-1 items-center gap-4">
                  <Button
                    className="bg-gradient-to-tr from-lime-500 via-blue-600 to-cyan-400 hover:from-lime-600 hover:via-blue-700 hover:to-cyan-500"
                    onClick={() => nav("/register")}
                  >
                    Đăng Kí
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserPopover;
