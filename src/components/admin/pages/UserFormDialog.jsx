import {
  createAdminUser,
  getApiErrorMessage,
  updateAdminUser,
} from "@/components/service/ApiFunctions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const EMPTY_FORM = {
  fullName: "",
  email: "",
  phone: "",
  password: "",
  address: "",
  roleName: "ROLE_USER",
};

const PHONE_REGEX = /^[0-9]{10}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * UserFormDialog — create a new account, or edit an existing user's profile.
 * Pass `user` to edit; leave it null to create.
 */
const UserFormDialog = ({ open, onOpenChange, user, onSuccess }) => {
  const isEdit = Boolean(user);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!open) return;
    setErrors({});
    setForm(
      isEdit
        ? {
            ...EMPTY_FORM,
            fullName: user.fullName || "",
            email: user.email || "",
            phone: user.phone || "",
            address: user.address || "",
            roleName: user.role || "ROLE_USER",
          }
        : EMPTY_FORM,
    );
  }, [open, user, isEdit]);

  const setField = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((errs) => ({ ...errs, [field]: undefined }));
  };

  const validate = () => {
    const errs = {};
    if (!form.fullName.trim()) errs.fullName = "Vui lòng nhập họ tên";
    if (!PHONE_REGEX.test(form.phone.trim()))
      errs.phone = "Số điện thoại phải gồm 10 chữ số";
    if (!isEdit) {
      if (!EMAIL_REGEX.test(form.email.trim())) errs.email = "Email không hợp lệ";
      if (form.password.length < 6)
        errs.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      if (isEdit) {
        await updateAdminUser(user.id, {
          fullName: form.fullName.trim(),
          phone: form.phone.trim(),
          address: form.address.trim(),
        });
        toast.success("Đã cập nhật thông tin người dùng");
      } else {
        await createAdminUser({
          fullName: form.fullName.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          password: form.password,
          address: form.address.trim(),
          roleName: form.roleName,
        });
        toast.success("Đã tạo tài khoản mới");
      }
      onSuccess?.();
      onOpenChange(false);
    } catch (error) {
      console.error("Error saving user: ", error);
      toast.error(
        getApiErrorMessage(
          error,
          isEdit ? "Không thể cập nhật người dùng" : "Không thể tạo tài khoản",
        ),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const field = (id, label, input, required = false) => (
    <div>
      <label htmlFor={id} className="admin-label">
        {label} {required && <span className="text-[#DC2626]">*</span>}
      </label>
      {input}
      {errors[id] && (
        <p className="mt-1 text-xs text-[#DC2626]" role="alert">
          {errors[id]}
        </p>
      )}
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 overflow-hidden rounded-lg p-0 sm:max-w-[520px]">
        <DialogHeader className="space-y-1 border-b border-hairline px-5 py-4 text-left">
          <DialogTitle className="text-base font-semibold text-brand-ink">
            {isEdit ? "Sửa thông tin người dùng" : "Thêm người dùng"}
          </DialogTitle>
          <DialogDescription className="text-sm text-[#606562]">
            {isEdit
              ? "Cập nhật họ tên, số điện thoại và địa chỉ của tài khoản."
              : "Tài khoản do quản trị viên tạo được kích hoạt ngay, không cần xác thực email."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} noValidate>
          <div className="grid max-h-[60vh] grid-cols-1 gap-4 overflow-y-auto px-5 py-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              {field(
                "fullName",
                "Họ và tên",
                <input
                  id="fullName"
                  value={form.fullName}
                  onChange={setField("fullName")}
                  placeholder="Nguyễn Văn A"
                  className="admin-input"
                  autoFocus
                />,
                true,
              )}
            </div>

            {field(
              "email",
              "Email",
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={setField("email")}
                disabled={isEdit}
                placeholder="email@example.com"
                className="admin-input"
              />,
              !isEdit,
            )}

            {field(
              "phone",
              "Số điện thoại",
              <input
                id="phone"
                inputMode="numeric"
                value={form.phone}
                onChange={setField("phone")}
                placeholder="0912345678"
                className="admin-input font-mono"
              />,
              true,
            )}

            {!isEdit &&
              field(
                "password",
                "Mật khẩu",
                <input
                  id="password"
                  type="password"
                  value={form.password}
                  onChange={setField("password")}
                  placeholder="Ít nhất 6 ký tự"
                  autoComplete="new-password"
                  className="admin-input"
                />,
                true,
              )}

            {!isEdit &&
              field(
                "roleName",
                "Vai trò",
                <select
                  id="roleName"
                  value={form.roleName}
                  onChange={setField("roleName")}
                  className="admin-input"
                >
                  <option value="ROLE_USER">Khách hàng</option>
                  <option value="ROLE_ADMIN">Quản trị viên</option>
                </select>,
              )}

            <div className="sm:col-span-2">
              {field(
                "address",
                "Địa chỉ",
                <input
                  id="address"
                  value={form.address}
                  onChange={setField("address")}
                  placeholder="Số nhà, đường, phường, quận, tỉnh"
                  className="admin-input"
                />,
              )}
            </div>
          </div>

          <div className="flex justify-end gap-2 border-t border-hairline bg-[#f7f8f9] px-5 py-3">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="btn-admin btn-admin-secondary"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-admin btn-admin-primary min-w-[120px]"
            >
              {isSubmitting ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              ) : isEdit ? (
                "Lưu thay đổi"
              ) : (
                "Tạo tài khoản"
              )}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UserFormDialog;
