import Logout from "@/components/logout/Logout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useNavigate } from "react-router-dom";
import vietnameseBoy from "@/assets/vietnameseBoy.png";

const UserPopover = () => {
  const token = localStorage.getItem("accessToken");
  const nav = useNavigate();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar>
          <AvatarImage src={vietnameseBoy} alt="@shadcn" />
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
                    className="bg-zinc-800 "
                  >
                    Thông tin
                  </Button>
                </div>
                <div className="grid grid-cols-1 items-center gap-4">
                  <Button
                    onClick={() => nav("/user/my-orders")}
                    className="bg-neutral-500"
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
                    className="bg-zinc-500 hover:bg-zinc-700"
                    onClick={() => nav("/login")}
                  >
                    Đăng Nhập
                  </Button>
                </div>
                <div className="grid grid-cols-1 items-center gap-4">
                  <Button
                    className="bg-zinc-800 hover:bg-zinc-900"
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
