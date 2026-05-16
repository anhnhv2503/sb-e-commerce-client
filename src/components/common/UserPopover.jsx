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
          className="rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3B82F6] focus-visible:outline-offset-2 transition-transform hover:scale-105 active:scale-95"
          aria-label="Menu người dùng"
        >
          <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
            <AvatarImage
              src={vietnameseBoy}
              alt="Avatar"
              className="object-cover"
            />
            <AvatarFallback className="bg-gray-100 text-[#111827] font-semibold text-sm">
              VA
            </AvatarFallback>
          </Avatar>
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-56 p-2 rounded-xl shadow-xl border border-gray-100 bg-white"
        align="end"
      >
        <div className="flex flex-col gap-1">
          {token ? (
            <>
              <div className="px-3 py-2 mb-1 border-b border-gray-100">
                <p className="text-sm font-semibold text-[#111827]">
                  Tài Khoản
                </p>
              </div>
              <button
                onClick={() => nav("/user/profile")}
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:text-[#111827] hover:bg-gray-50 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3B82F6]"
              >
                <User size={18} className="text-gray-400" />
                Thông tin
              </button>
              <button
                onClick={() => nav("/user/my-orders")}
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:text-[#111827] hover:bg-gray-50 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3B82F6]"
              >
                <ShoppingBag size={18} className="text-gray-400" />
                Đơn hàng của Tôi
              </button>
              <div className="h-px bg-gray-100 my-1" />
              <div className="w-full">
                <Logout className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-500 justify-start" />
              </div>
            </>
          ) : (
            <>
              <div className="px-3 py-2 mb-1 border-b border-gray-100">
                <p className="text-sm font-semibold text-[#111827]">Khách</p>
              </div>
              <button
                onClick={() => nav("/login")}
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:text-[#3B82F6] hover:bg-blue-50 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3B82F6]"
              >
                <LogIn size={18} className="text-gray-400" />
                Đăng Nhập
              </button>
              <button
                onClick={() => nav("/register")}
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:text-[#3B82F6] hover:bg-blue-50 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3B82F6]"
              >
                <UserPlus size={18} className="text-gray-400" />
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
