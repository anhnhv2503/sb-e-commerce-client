import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Eye, EyeOff, KeyRound, ShieldCheck } from "lucide-react";
import { changePassword } from "../service/ApiFunctions";

/**
 * ChangePassword Dialog
 * Redesigned to match SKILL.md artistic design system
 */
const ChangePassword = ({ open, setOpen }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({});
  const [oldPasswordToggle, setOldPasswordToggle] = useState(false);
  const [isToggle, setIsToggle] = useState(false);
  const [isToggleConfirmPass, setIsToggleConfirmPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSaveChange = async (e) => {
    e.preventDefault();

    let newErros = { ...error };

    if (oldPassword.trim() === "") {
      newErros.oldPassword = "Vui lòng nhập mật khẩu cũ";
    } else {
      delete newErros.oldPassword;
    }

    if (newPassword.trim() === "") {
      newErros.newPassword = "Vui lòng nhập mật khẩu mới";
    } else {
      delete newErros.newPassword;
    }
    
    if (confirmPassword.trim() === "") {
      newErros.confirmPassword = "Vui lòng xác nhận mật khẩu mới";
    } else {
      delete newErros.confirmPassword;
    }

    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      newErros.confirmPassword = "Mật khẩu xác nhận không khớp";
    }

    setError(newErros);

    if (Object.keys(newErros).length === 0) {
      try {
        setLoading(true);
        const response = await changePassword(oldPassword, newPassword);
        if (response.status === 200) {
          toast.success("Đổi mật khẩu thành công!");
          setOpen(false);
          setNewPassword("");
          setConfirmPassword("");
          setOldPassword("");
        }
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.data || "Đổi mật khẩu thất bại");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-[#111827]/60 backdrop-blur-sm transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />
      <Toaster />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-md data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95 border-none"
          >
            {/* Header */}
            <div className="bg-[#111827] px-6 py-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#3B82F6]/20 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
              
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10 mb-4 backdrop-blur-md">
                  <ShieldCheck size={24} className="text-[#3B82F6]" />
                </div>
                <DialogTitle
                  as="h3"
                  className="font-display text-2xl font-bold text-white mb-2"
                >
                  Đổi Mật Khẩu
                </DialogTitle>
                <p className="text-white/60 text-sm">
                  Cập nhật mật khẩu để bảo vệ tài khoản của bạn.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="px-6 py-6 space-y-5">
              {/* Old Password */}
              <div className="space-y-2">
                <label
                  htmlFor="oldPassword"
                  className="block text-xs font-semibold text-gray-500 uppercase tracking-wider font-mono"
                >
                  Mật Khẩu Hiện Tại <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <KeyRound size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    id="oldPassword"
                    name="oldPassword"
                    value={oldPassword}
                    type={oldPasswordToggle ? "text" : "password"}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className={`block w-full h-11 pl-10 pr-10 rounded-lg sm:text-sm transition-colors
                      ${!error.oldPassword 
                        ? "bg-gray-50 border-gray-200 text-[#111827] focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6]" 
                        : "bg-red-50 border-red-300 text-red-900 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      }`}
                    placeholder="Nhập mật khẩu hiện tại"
                  />
                  <button
                    type="button"
                    onClick={() => setOldPasswordToggle(!oldPasswordToggle)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                    aria-label={oldPasswordToggle ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  >
                    {oldPasswordToggle ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {error.oldPassword && (
                  <p className="text-red-500 text-xs font-medium mt-1">{error.oldPassword}</p>
                )}
              </div>

              {/* New Password */}
              <div className="space-y-2">
                <label
                  htmlFor="newPassword"
                  className="block text-xs font-semibold text-gray-500 uppercase tracking-wider font-mono"
                >
                  Mật Khẩu Mới <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <KeyRound size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    id="newPassword"
                    name="newPassword"
                    value={newPassword}
                    type={isToggle ? "text" : "password"}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className={`block w-full h-11 pl-10 pr-10 rounded-lg sm:text-sm transition-colors
                      ${!error.newPassword 
                        ? "bg-gray-50 border-gray-200 text-[#111827] focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6]" 
                        : "bg-red-50 border-red-300 text-red-900 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      }`}
                    placeholder="Nhập mật khẩu mới"
                  />
                  <button
                    type="button"
                    onClick={() => setIsToggle(!isToggle)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                    aria-label={isToggle ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  >
                    {isToggle ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {error.newPassword && (
                  <p className="text-red-500 text-xs font-medium mt-1">{error.newPassword}</p>
                )}
              </div>

              {/* Confirm New Password */}
              <div className="space-y-2">
                <label
                  htmlFor="confirmNewPassword"
                  className="block text-xs font-semibold text-gray-500 uppercase tracking-wider font-mono"
                >
                  Xác Nhận Mật Khẩu <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <KeyRound size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    id="confirmNewPassword"
                    name="confirmNewPassword"
                    value={confirmPassword}
                    type={isToggleConfirmPass ? "text" : "password"}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`block w-full h-11 pl-10 pr-10 rounded-lg sm:text-sm transition-colors
                      ${!error.confirmPassword 
                        ? "bg-gray-50 border-gray-200 text-[#111827] focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6]" 
                        : "bg-red-50 border-red-300 text-red-900 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      }`}
                    placeholder="Nhập lại mật khẩu mới"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSaveChange(e);
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setIsToggleConfirmPass(!isToggleConfirmPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                    aria-label={isToggleConfirmPass ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  >
                    {isToggleConfirmPass ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {error.confirmPassword && (
                  <p className="text-red-500 text-xs font-medium mt-1">{error.confirmPassword}</p>
                )}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="w-full sm:w-auto h-11 px-5 border border-gray-200 text-gray-600 bg-white hover:text-[#111827] hover:bg-gray-50 rounded-lg font-semibold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6]"
                disabled={loading}
              >
                Hủy Bỏ
              </button>
              
              <button
                type="button"
                onClick={handleSaveChange}
                disabled={loading || !oldPassword || !newPassword || !confirmPassword}
                className="w-full sm:w-auto h-11 px-6 bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-lg shadow-md shadow-blue-500/20 font-semibold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6] disabled:opacity-50 disabled:shadow-none flex items-center justify-center"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  "Lưu Mật Khẩu"
                )}
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default ChangePassword;
