import Logout from "@/components/logout/Logout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { UserIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const menuVariants = {
  hidden: { opacity: 0, y: -10, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.25, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.95,
    transition: { duration: 0.15, ease: "easeIn" },
  },
};

const UserAccordion = () => {
  const token = localStorage.getItem("accessToken");
  const nav = useNavigate();

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1" className="border-none">
        <AccordionTrigger className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-orange-50 to-orange-100 shadow-sm border border-orange-100 hover:from-orange-100 hover:to-orange-200 hover:shadow-md hover:border-orange-200 active:shadow-inner active:scale-[0.98] transition-all duration-200 group">
          <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-md group-hover:shadow-lg transition-all duration-200">
            <UserIcon className="h-5 w-5 text-white" />
          </div>
          <span className="text-sm font-semibold text-gray-900 tracking-wide">
            Tài Khoản
          </span>
        </AccordionTrigger>
        <AccordionContent className="-mt-1">
          <motion.ul
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            className="z-10 mt-2 w-56 bg-white/95 backdrop-blur-sm shadow-xl rounded-2xl border border-gray-100/50 p-2 pt-3"
          >
            {token ? (
              <>
                <li>
                  <button
                    className="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-800 hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 hover:text-orange-700 hover:shadow-sm transition-all duration-200 group/item"
                    onClick={() => nav("/user/profile")}
                  >
                    <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full group-hover/item:scale-110 transition-transform duration-200" />
                    <span>Thông Tin</span>
                  </button>
                </li>
                <li className="mt-1">
                  <button
                    className="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-800 hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 hover:text-orange-700 hover:shadow-sm transition-all duration-200 group/item"
                    onClick={() => nav("/user/my-orders")}
                  >
                    <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full group-hover/item:scale-110 transition-transform duration-200" />
                    <span>Đơn Hàng Của Tôi</span>
                  </button>
                </li>
                <hr className="my-3 border-gray-200/50 mx-2" />
                <li>
                  <Logout />
                </li>
              </>
            ) : (
              <>
                <li>
                  <button
                    className="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-800 hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 hover:text-orange-700 hover:shadow-sm transition-all duration-200 group/item"
                    onClick={() => nav("/login")}
                  >
                    <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full group-hover/item:scale-110 transition-transform duration-200" />
                    <span>Đăng Nhập</span>
                  </button>
                </li>
                <hr className="my-3 border-gray-200/50 mx-2" />
                <li>
                  <button
                    className="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-600 hover:text-white hover:shadow-lg transition-all duration-200 group/item"
                    onClick={() => nav("/register")}
                  >
                    <div className="w-2 h-2 bg-white rounded-full group-hover/item:scale-110 transition-transform duration-200" />
                    <span>Đăng Kí</span>
                  </button>
                </li>
              </>
            )}
          </motion.ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default UserAccordion;
