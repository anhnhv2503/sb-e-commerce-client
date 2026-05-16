import { addCategory } from "@/components/service/ApiFunctions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FolderPlus, Plus, Sparkles } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

/**
 * AddCategory Dialog
 * Redesigned to match SKILL.md artistic design system
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
        <Button className="flex items-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white shadow-md shadow-blue-500/20 h-11 px-5 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6] transition-all">
          <Plus size={18} />
          <span className="font-semibold tracking-wide">Thêm Danh Mục</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] border-none shadow-2xl rounded-2xl overflow-hidden bg-white p-0">
        <div className="bg-[#111827] px-6 py-8 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#3B82F6]/20 rounded-full blur-2xl -mr-10 -mt-10" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#8B5CF6]/20 rounded-full blur-2xl -ml-10 -mb-10" />

          <DialogHeader className="relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white/80 text-[10px] font-mono tracking-widest uppercase mb-3 w-max">
              <Sparkles size={12} className="text-[#3B82F6]" />
              VA Shop Admin
            </div>
            <DialogTitle className="font-display text-2xl text-white">
              Thêm Danh Mục Mới
            </DialogTitle>
            <DialogDescription className="text-white/60 text-sm mt-1">
              Tạo danh mục mới để phân loại sản phẩm trong cửa hàng.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="px-6 py-6 space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="category-name"
              className="text-xs font-semibold text-gray-500 uppercase tracking-wider font-mono"
            >
              Tên danh mục <span className="text-[#DC2626]">*</span>
            </Label>
            <div className="relative">
              <FolderPlus
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <Input
                id="category-name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Ví dụ: Áo thun nam"
                className="pl-10 h-11 bg-gray-50 border-gray-200 focus:border-[#3B82F6] focus:ring-[#3B82F6] text-[#111827] rounded-lg transition-all"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAddCategory();
                }}
              />
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3 border-t border-gray-100">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="h-11 px-5 border-gray-200 text-gray-600 hover:text-[#111827] hover:bg-white rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6]"
          >
            Hủy
          </Button>
          <Button
            onClick={handleAddCategory}
            disabled={isSubmitting || !categoryName.trim()}
            className="h-11 px-6 bg-[#3B82F6] hover:bg-[#2563EB] text-white shadow-md shadow-blue-500/20 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6] transition-all disabled:opacity-50 disabled:shadow-none"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              "Lưu Danh Mục"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategory;
