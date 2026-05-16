import { addMoreSizeForProduct } from "@/components/service/ApiFunctions.js";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Hash, Plus, Sparkles, Tag } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { sizeOptions } from "../../../data/data.js";

/**
 * AddMoreSize Dialog
 * Redesigned to match SKILL.md artistic design system
 */
const AddMoreSize = ({ productId, fetchProduct }) => {
  const [sizeName, setSizeName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleAddMoreSize = async () => {
    if (!sizeName || !quantity) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }

    setIsLoading(true);
    try {
      const response = await addMoreSizeForProduct(
        productId,
        sizeName,
        quantity,
      );
      if (response.status === 200) {
        toast.success("Thêm số lượng thành công!");
        setSizeName("");
        setQuantity("");
        fetchProduct();
        setOpen(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Có lỗi xảy ra");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="h-9 px-4 border-gray-200 text-[#111827] hover:text-[#3B82F6] hover:bg-blue-50 hover:border-blue-200 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3B82F6] transition-colors"
        >
          <Plus size={16} className="mr-1.5" />
          Thêm Size
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] border-none shadow-2xl rounded-2xl overflow-hidden bg-white p-0">
        <div className="bg-[#111827] px-6 py-8 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#D97706]/20 rounded-full blur-2xl -mr-10 -mt-10" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#3B82F6]/20 rounded-full blur-2xl -ml-10 -mb-10" />

          <DialogHeader className="relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white/80 text-[10px] font-mono tracking-widest uppercase mb-3 w-max">
              <Sparkles size={12} className="text-[#D97706]" />
              Kho Hàng
            </div>
            <DialogTitle className="font-display text-2xl text-white">
              Thêm Size Sản Phẩm
            </DialogTitle>
            <DialogDescription className="text-white/60 text-sm mt-1">
              Bổ sung số lượng cho mã sản phẩm{" "}
              <span className="font-mono text-white bg-white/10 px-1.5 py-0.5 rounded ml-1">
                #{productId}
              </span>
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="px-6 py-6 space-y-5">
          {/* Size Select */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wider font-mono">
              Tên Size <span className="text-[#DC2626]">*</span>
            </Label>
            <Select onValueChange={setSizeName} value={sizeName}>
              <SelectTrigger className="w-full h-11 bg-gray-50 border-gray-200 focus:ring-[#3B82F6] focus:border-[#3B82F6] rounded-lg text-[#111827]">
                <div className="flex items-center gap-2">
                  <Tag size={16} className="text-gray-400" />
                  <SelectValue placeholder="Chọn kích thước" />
                </div>
              </SelectTrigger>
              <SelectContent className="rounded-xl border-gray-100 shadow-lg">
                {sizeOptions.map((size) => (
                  <SelectItem
                    key={size.id}
                    value={size.name}
                    className="focus:bg-[#3B82F6]/10 focus:text-[#3B82F6] cursor-pointer rounded-lg m-1"
                  >
                    {size.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Quantity Input */}
          <div className="space-y-2">
            <Label
              htmlFor="quantity"
              className="text-xs font-semibold text-gray-500 uppercase tracking-wider font-mono"
            >
              Số Lượng <span className="text-[#DC2626]">*</span>
            </Label>
            <div className="relative">
              <Hash
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <Input
                id="quantity"
                type="number"
                min="1"
                placeholder="Ví dụ: 50"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="pl-10 h-11 bg-gray-50 border-gray-200 focus:border-[#3B82F6] focus:ring-[#3B82F6] text-[#111827] rounded-lg transition-all"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAddMoreSize();
                }}
              />
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3 border-t border-gray-100">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="h-11 px-5 border-gray-200 text-gray-600 hover:text-[#111827] hover:bg-white rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6]"
          >
            Hủy
          </Button>
          <Button
            onClick={handleAddMoreSize}
            disabled={isLoading || !sizeName || !quantity}
            className="h-11 px-6 bg-[#3B82F6] hover:bg-[#2563EB] text-white shadow-md shadow-blue-500/20 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6] transition-all disabled:opacity-50 disabled:shadow-none"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              "Thêm Vào Kho"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddMoreSize;
