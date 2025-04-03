import logo from "@/assets/logo.png";
import { motion } from "framer-motion";

const LogoutToast = ({ t }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`max-w-md w-full bg-gray-100 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 ${
        t.visible ? "animate-enter" : "animate-leave"
      }`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            <img className="h-8 w-10 rounded-full" src={logo} alt="" />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900">
              Đăng xuất thành công
            </p>
            <p className="mt-1 text-sm text-gray-500">Hẹn gặp lại bạn sau.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LogoutToast;
