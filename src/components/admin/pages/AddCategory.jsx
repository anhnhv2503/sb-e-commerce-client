import { addCategory } from "@/components/service/ApiFunctions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

/**
 * AddCategory — dialog with its own primary trigger button.
 */
const AddCategory = ({ open, onOpenChange, onSuccess }) => {
  const [categoryName, setCategoryName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddCategory = async () => {
    if (categoryName.trim() === "") {
      return toast.error("Vui lòng nhập tên danh mục");
    }

    setIsSubmitting(true);
    try {
      const response = await addCategory(categoryName);
      if (response) {
        toast.success("Thêm danh mục thành công");
        setCategoryName("");
        onSuccess();
        onOpenChange(false);
      }
    } catch (error) {
      console.error("Error adding category: ", error);
      toast.error("Có lỗi xảy ra khi thêm danh mục");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <button className="btn-admin btn-admin-primary">
          <Plus size={16} aria-hidden="true" />
          Thêm danh mục
        </button>
      </DialogTrigger>
      <DialogContent className="gap-0 overflow-hidden rounded-lg p-0 sm:max-w-[420px]">
        <DialogHeader className="space-y-1 border-b border-hairline px-5 py-4 text-left">
          <DialogTitle className="text-base font-semibold text-brand-ink">
            Thêm danh mục mới
          </DialogTitle>
          <DialogDescription className="text-sm text-[#606562]">
            Tạo danh mục để phân loại sản phẩm trong cửa hàng.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddCategory();
          }}
        >
          <div className="px-5 py-5">
            <label htmlFor="category-name" className="admin-label">
              Tên danh mục <span className="text-[#DC2626]">*</span>
            </label>
            <input
              id="category-name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Ví dụ: Áo thun nam"
              className="admin-input"
              autoFocus
            />
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
              disabled={isSubmitting || !categoryName.trim()}
              className="btn-admin btn-admin-primary min-w-[110px]"
            >
              {isSubmitting ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              ) : (
                "Lưu danh mục"
              )}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategory;
