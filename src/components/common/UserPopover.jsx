import vietnameseBoy from "@/assets/vietnameseBoy.png";
import Logout from "@/components/logout/Logout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogIn, ShoppingBag, User, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

/**
 * UserPopover
 * Redesigned user menu with SKILL.md tokens and 44px touch targets.
 */
const UserPopover = () => {
  const token = localStorage.getItem("accessToken");
  const nav = useNavigate();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="rounded-full p-1 transition-opacity hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
          aria-label="Menu người dùng"
        >
          <Avatar className="h-9 w-9 border border-hairline">
            <AvatarImage
              src={vietnameseBoy}
              alt="Avatar"
              className="object-cover"
            />
            <AvatarFallback className="bg-brand-mist font-label text-sm text-brand-ink">
              VA
            </AvatarFallback>
          </Avatar>
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-60 rounded-lg border border-hairline bg-white p-2"
        align="end"
      >
        <div className="flex flex-col gap-1">
          {token ? (
            <>
              <p className="eyebrow mb-1 border-b border-hairline px-3 pb-3 pt-2 text-xs text-[#606562]">
                Tài Khoản
              </p>
              <button
                onClick={() => nav("/user/profile")}
                className="flex w-full items-center gap-3 rounded px-3 py-2.5 text-sm text-brand-ink transition-colors hover:bg-brand-mist focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-blue"
              >
                <User size={18} className="text-[#606562]" strokeWidth={1.5} />
                Thông tin
              </button>
              <button
                onClick={() => nav("/user/my-orders")}
                className="flex w-full items-center gap-3 rounded px-3 py-2.5 text-sm text-brand-ink transition-colors hover:bg-brand-mist focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-blue"
              >
                <ShoppingBag size={18} className="text-[#606562]" strokeWidth={1.5} />
                Đơn hàng của Tôi
              </button>
              <div className="w-full">
                <Logout className="font-label mt-2 h-10 w-full rounded bg-brand-pink text-sm tracking-[0.038em] text-white hover:bg-brand-pink hover:opacity-85" />
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => nav("/login")}
                className="btn btn-sm btn-primary w-full"
              >
                <LogIn size={16} />
                Đăng Nhập
              </button>
              <button
                onClick={() => nav("/register")}
                className="btn btn-sm btn-outline w-full"
              >
                <UserPlus size={16} />
                Đăng Ký
              </button>
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserPopover;
