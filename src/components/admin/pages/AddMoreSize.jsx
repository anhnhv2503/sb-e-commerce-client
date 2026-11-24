import { addMoreSizeForProduct } from "@/components/service/ApiFunctions.js";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  clothesSizes,
  shoeSizes,
  getSizeTypeFromCategory,
} from "../../../data/data.js";

/**
 * AddMoreSize — dialog to add stock for a size of a product.
 */
const AddMoreSize = ({ productId, productCategory, fetchProduct }) => {
  const [sizeName, setSizeName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [sizeType, setSizeType] = useState(() =>
    getSizeTypeFromCategory(productCategory),
  );

  useEffect(() => {
    if (open) {
      setSizeType(getSizeTypeFromCategory(productCategory));
    }
  }, [open, productCategory]);

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
        <button
          className="btn-admin btn-admin-secondary h-8 px-2.5 text-xs"
          title="Thêm số lượng theo size"
        >
          <Plus size={14} aria-hidden="true" />
          Size
        </button>
      </DialogTrigger>

      <DialogContent className="gap-0 overflow-hidden rounded-lg p-0 sm:max-w-[420px]">
        <DialogHeader className="space-y-1 border-b border-hairline px-5 py-4 text-left">
          <DialogTitle className="text-base font-semibold text-brand-ink">
            Thêm tồn kho theo size
          </DialogTitle>
          <DialogDescription className="text-sm text-[#606562]">
            Sản phẩm <span className="font-mono text-brand-ink">#{productId}</span>
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddMoreSize();
          }}
        >
          <div className="space-y-4 px-5 py-5">
            <fieldset>
              <div className="mb-2 flex items-center justify-between">
                <legend className="admin-label !mb-0">
                  Size <span className="text-[#DC2626]">*</span>
                </legend>
                <div className="flex rounded border border-[#e5e7eb] bg-[#f9fafb] p-0.5">
                  <button
                    type="button"
                    onClick={() => setSizeType("clothes")}
                    className={`rounded px-2.5 py-0.5 text-xs font-medium transition-colors ${
                      sizeType === "clothes"
                        ? "bg-white text-brand-ink shadow-sm"
                        : "text-[#606562] hover:text-brand-ink"
                    }`}
                  >
                    Quần áo
                  </button>
                  <button
                    type="button"
                    onClick={() => setSizeType("shoes")}
                    className={`rounded px-2.5 py-0.5 text-xs font-medium transition-colors ${
                      sizeType === "shoes"
                        ? "bg-white text-brand-ink shadow-sm"
                        : "text-[#606562] hover:text-brand-ink"
                    }`}
                  >
                    Giày dép
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {(sizeType === "shoes" ? shoeSizes : clothesSizes).map((size) => (
                  <button
                    key={size.id}
                    type="button"
                    onClick={() => setSizeName(size.name)}
                    aria-pressed={sizeName === size.name}
                    className={`h-9 min-w-[3rem] rounded border px-3 font-mono text-sm transition-colors ${
                      sizeName === size.name
                        ? "border-brand-blue bg-brand-blue text-white"
                        : "border-[#cccfcd] bg-white text-brand-ink hover:border-brand-ink"
                    }`}
                  >
                    {size.name}
                  </button>
                ))}
              </div>
            </fieldset>

            <div>
              <label htmlFor={`quantity-${productId}`} className="admin-label">
                Số lượng nhập thêm <span className="text-[#DC2626]">*</span>
              </label>
              <input
                id={`quantity-${productId}`}
                type="number"
                min="1"
                placeholder="Ví dụ: 50"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="admin-input font-mono"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 border-t border-hairline bg-[#f7f8f9] px-5 py-3">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="btn-admin btn-admin-secondary"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isLoading || !sizeName || !quantity}
              className="btn-admin btn-admin-primary min-w-[110px]"
            >
              {isLoading ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              ) : (
                "Thêm vào kho"
              )}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddMoreSize;
