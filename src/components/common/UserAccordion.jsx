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
    transition: { duration: 0.3, ease: "easeInOut" },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.95,
    transition: { duration: 0.2, ease: "easeInOut" },
  },
};

const UserAccordion = () => {
  const token = localStorage.getItem("accessToken");
  const nav = useNavigate();

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className="flex items-center gap-2 p-3 rounded-lg bg-white shadow-sm border border-gray-200 hover:bg-[#E0E7FF] transition">
          <UserIcon className="h-6 w-6 text-[#6366F1]" />
          <span className="text-sm font-semibold text-[#1F2937]">
            Tài Khoản
          </span>
        </AccordionTrigger>
        <AccordionContent>
          <motion.ul
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            className="z-10 mt-3 w-52 bg-white shadow-md rounded-lg border border-gray-300 p-3"
          >
            {token ? (
              <>
                <li>
                  <button
                    className="w-full text-left block rounded-md px-3 py-2 text-base font-medium text-[#1F2937] hover:bg-[#E0E7FF] transition"
                    onClick={() => nav("/user/profile")}
                  >
                    Thông Tin
                  </button>
                </li>
                <li>
                  <button
                    className="w-full text-left block rounded-md px-3 py-2 text-base font-medium text-[#1F2937] hover:bg-[#E0E7FF] transition"
                    onClick={() => nav("/user/my-orders")}
                  >
                    Đơn Hàng Của Tôi
                  </button>
                </li>
                <hr className="my-2 border-gray-300" />
                <li>
                  <Logout />
                </li>
              </>
            ) : (
              <>
                <li>
                  <button
                    className="w-full text-left block rounded-md px-3 py-2 text-base font-medium text-[#1F2937] hover:bg-[#E0E7FF] transition"
                    onClick={() => nav("/login")}
                  >
                    Đăng Nhập
                  </button>
                </li>
                <hr className="my-2 border-gray-300" />
                <li>
                  <button
                    className="w-full text-left block rounded-md px-3 py-2 text-base font-medium text-[#1F2937] hover:bg-[#E0E7FF] transition"
                    onClick={() => nav("/register")}
                  >
                    Đăng Kí
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
