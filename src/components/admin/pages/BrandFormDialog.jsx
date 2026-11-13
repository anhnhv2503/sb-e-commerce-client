import {
  createBrand,
  getApiErrorMessage,
  updateBrand,
} from "@/components/service/ApiFunctions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ImageOff } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const EMPTY_FORM = { name: "", logo: "", description: "" };

/**
 * BrandFormDialog — create a brand, or edit one when `brand` is passed.
 */
const BrandFormDialog = ({ open, onOpenChange, brand, onSuccess }) => {
  const isEdit = Boolean(brand);
  const [form, setForm] = useState(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logoBroken, setLogoBroken] = useState(false);

  useEffect(() => {
    if (!open) return;
    setForm(
      isEdit
        ? {
            name: brand.name || "",
            logo: brand.logo || "",
            description: brand.description || "",
          }
        : EMPTY_FORM,
    );
  }, [open, brand, isEdit]);

  useEffect(() => {
    setLogoBroken(false);
  }, [form.logo]);

  const setField = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error("Vui lòng nhập tên thương hiệu");
      return;
    }
    const payload = {
      name: form.name.trim(),
      logo: form.logo.trim(),
      description: form.description.trim(),
    };

    setIsSubmitting(true);
    try {
      if (isEdit) {
        await updateBrand(brand.id, payload);
        toast.success("Đã cập nhật thương hiệu");
      } else {
        await createBrand(payload);
        toast.success("Đã thêm thương hiệu");
      }
      onSuccess?.();
      onOpenChange(false);
    } catch (error) {
      console.error("Error saving brand: ", error);
      toast.error(
        getApiErrorMessage(
          error,
          isEdit ? "Không thể cập nhật thương hiệu" : "Không thể thêm thương hiệu",
        ),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 overflow-hidden rounded-lg p-0 sm:max-w-[480px]">
        <DialogHeader className="space-y-1 border-b border-hairline px-5 py-4 text-left">
          <DialogTitle className="text-base font-semibold text-brand-ink">
            {isEdit ? "Sửa thương hiệu" : "Thêm thương hiệu"}
          </DialogTitle>
          <DialogDescription className="text-sm text-[#606562]">
            Thương hiệu được dùng khi tạo và lọc sản phẩm.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 px-5 py-5">
            <div>
              <label htmlFor="brand-name" className="admin-label">
                Tên thương hiệu <span className="text-[#DC2626]">*</span>
              </label>
              <input
                id="brand-name"
                value={form.name}
                onChange={setField("name")}
                placeholder="Ví dụ: Coolmate"
                className="admin-input"
                autoFocus
              />
            </div>

            <div>
              <label htmlFor="brand-logo" className="admin-label">
                Logo (URL)
              </label>
              <div className="flex gap-3">
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center overflow-hidden rounded border border-hairline bg-brand-mist">
                  {form.logo && !logoBroken ? (
                    <img
                      src={form.logo}
                      alt=""
                      className="h-full w-full object-contain"
                      onError={() => setLogoBroken(true)}
                    />
                  ) : (
                    <ImageOff size={15} className="text-[#9ca3af]" aria-hidden="true" />
                  )}
                </span>
                <input
                  id="brand-logo"
                  type="url"
                  value={form.logo}
                  onChange={setField("logo")}
                  placeholder="https://..."
                  className="admin-input"
                />
              </div>
            </div>

            <div>
              <label htmlFor="brand-description" className="admin-label">
                Mô tả
              </label>
              <textarea
                id="brand-description"
                value={form.description}
                onChange={setField("description")}
                rows={3}
                placeholder="Giới thiệu ngắn về thương hiệu"
                className="admin-input h-auto py-2"
              />
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
              disabled={isSubmitting || !form.name.trim()}
              className="btn-admin btn-admin-primary min-w-[120px]"
            >
              {isSubmitting ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              ) : isEdit ? (
                "Lưu thay đổi"
              ) : (
                "Lưu thương hiệu"
              )}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BrandFormDialog;
