import { PageHeader, Panel } from "@/components/admin/ui/AdminKit";
import PreviewImages from "@/components/common/PreviewImages";
import useCurrencyFormat from "@/components/hooks/useCurrencyFormat";
import {
  addProduct,
  getAllCategories,
} from "@/components/service/ApiFunctions.js";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { Check, Eye, Save, Upload, X } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { sizeOptions } from "../../../data/data.js";

/**
 * AddProduct — two-column console form with a completion checklist.
 */
const AddProduct = () => {
  useDocumentTitle("Thêm Sản Phẩm — VA Shop Admin");
  const navigate = useNavigate();
  const currency = useCurrencyFormat();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [inventory, setInventory] = useState("");
  const [category, setCategory] = useState("");
  const [sizename, setSizeName] = useState("");
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        setCategories(response.data?.data || []);
      } catch (error) {
        console.error("Error loading categories", error);
      }
    };
    fetchCategories();
  }, []);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    // Append to the current selection; individual images can be removed.
    setImages((prev) => [...prev, ...files]);
    setPreviewImages((prev) => [
      ...prev,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);
    e.target.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !name.trim() ||
      !description.trim() ||
      !price ||
      !brand.trim() ||
      !inventory ||
      !category ||
      !sizename ||
      images.length === 0
    ) {
      toast.error("Vui lòng điền đầy đủ thông tin và chọn ảnh");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("brand", brand);
    formData.append("inventory", inventory);
    formData.append("categoryName", category);
    formData.append("sizeName", sizename);
    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      setIsLoading(true);
      const response = await addProduct(formData);
      if (response.status === 200) {
        toast.success("Thêm sản phẩm thành công!");
        resetForm();
      }
    } catch (error) {
      console.error("Error adding product", error);
      toast.error("Có lỗi xảy ra khi thêm sản phẩm");
    } finally {
      setIsLoading(false);
    }
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviewImages((prev) => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setBrand("");
    setInventory("");
    setCategory("");
    setSizeName("");
    setImages([]);
    setPreviewImages([]);
  };

  const checklist = [
    ["Tên sản phẩm", !!name.trim()],
    ["Thương hiệu & giá", !!brand.trim() && !!price],
    ["Mô tả", !!description.trim()],
    ["Danh mục", !!category],
    ["Size & số lượng", !!sizename && !!inventory],
    ["Hình ảnh", images.length > 0],
  ];
  const completed = checklist.filter(([, ok]) => ok).length;

  const selectTriggerCls =
    "h-9 w-full rounded border-[#cccfcd] bg-white text-sm focus:ring-1 focus:ring-brand-blue focus:ring-offset-0";

  return (
    <>
      <PageHeader
        title="Thêm sản phẩm"
        description="Điền thông tin, chọn danh mục và tải ảnh lên để tạo sản phẩm mới."
        actions={
          <>
            <button
              type="button"
              onClick={() => navigate("/admin/product/list")}
              className="btn-admin btn-admin-secondary"
            >
              Hủy
            </button>
            <button
              type="submit"
              form="add-product-form"
              disabled={isLoading}
              className="btn-admin btn-admin-primary min-w-[120px]"
            >
              {isLoading ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              ) : (
                <>
                  <Save size={15} aria-hidden="true" />
                  Lưu sản phẩm
                </>
              )}
            </button>
          </>
        }
      />

      <form
        id="add-product-form"
        onSubmit={handleSubmit}
        className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3"
      >
        {/* ── Main column ── */}
        <div className="space-y-6 lg:col-span-2">
          <Panel title="Thông tin cơ bản">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="admin-label">
                  Tên sản phẩm <span className="text-[#DC2626]">*</span>
                </label>
                <input
                  id="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ví dụ: Áo blazer nam Coolmate"
                  className="admin-input"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="brand" className="admin-label">
                    Thương hiệu <span className="text-[#DC2626]">*</span>
                  </label>
                  <input
                    id="brand"
                    required
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="Ví dụ: Coolmate"
                    className="admin-input"
                  />
                </div>
                <div>
                  <label htmlFor="price" className="admin-label">
                    Giá bán (VNĐ) <span className="text-[#DC2626]">*</span>
                  </label>
                  <input
                    id="price"
                    type="number"
                    min="0"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="1500000"
                    className="admin-input font-mono"
                  />
                  {price && (
                    <p className="mt-1 font-mono text-xs text-[#606562]">
                      = {currency.format(Number(price))}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="description" className="admin-label">
                  Mô tả chi tiết <span className="text-[#DC2626]">*</span>
                </label>
                <textarea
                  id="description"
                  required
                  rows={6}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Chất liệu, tính năng, cách sử dụng..."
                  className="admin-input h-auto resize-y py-2 leading-relaxed"
                />
              </div>
            </div>
          </Panel>

          <Panel
            title="Hình ảnh"
            description="PNG, JPG, JPEG — tối đa 5MB mỗi ảnh"
            actions={
              previewImages.length > 0 && (
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="btn-admin btn-admin-ghost h-8 text-xs"
                >
                  <Eye size={14} aria-hidden="true" />
                  Xem trước
                </button>
              )
            }
          >
            <label
              htmlFor="images"
              className="relative flex cursor-pointer flex-col items-center justify-center rounded border border-dashed border-[#cccfcd] bg-[#f7f8f9] px-6 py-8 text-center transition-colors hover:border-brand-blue focus-within:border-brand-blue"
            >
              <input
                type="file"
                id="images"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="sr-only"
              />
              <Upload size={20} className="mb-2 text-[#606562]" aria-hidden="true" />
              <span className="text-sm font-medium text-brand-ink">
                Nhấp để chọn ảnh
              </span>
              <span className="mt-0.5 text-xs text-[#606562]">
                Ảnh đầu tiên sẽ là ảnh đại diện
              </span>
            </label>

            {previewImages.length > 0 && (
              <ul className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-6">
                {previewImages.map((url, index) => (
                  <li
                    key={url}
                    className="group relative aspect-square overflow-hidden rounded border border-hairline bg-brand-mist"
                  >
                    <img
                      src={url}
                      alt={`Ảnh ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                    {index === 0 && (
                      <span className="absolute bottom-1 left-1 rounded bg-brand-ink px-1.5 py-0.5 text-[10px] text-white">
                        Đại diện
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      aria-label={`Bỏ ảnh ${index + 1}`}
                      className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded bg-white/90 text-brand-ink opacity-0 transition-opacity hover:text-[#DC2626] focus-visible:opacity-100 group-hover:opacity-100"
                    >
                      <X size={14} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </Panel>
        </div>

        {/* ── Side column ── */}
        <div className="space-y-6 lg:sticky lg:top-0">
          <Panel title="Phân loại & tồn kho">
            <div className="space-y-4">
              <div>
                <span className="admin-label">
                  Danh mục <span className="text-[#DC2626]">*</span>
                </span>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className={selectTriggerCls} aria-label="Danh mục">
                    <SelectValue placeholder="Chọn danh mục" />
                  </SelectTrigger>
                  <SelectContent className="rounded">
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.name} className="cursor-pointer">
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <fieldset>
                <legend className="admin-label">
                  Size ban đầu <span className="text-[#DC2626]">*</span>
                </legend>
                <div className="flex flex-wrap gap-2">
                  {sizeOptions.map((size) => (
                    <button
                      key={size.id}
                      type="button"
                      onClick={() => setSizeName(size.name)}
                      aria-pressed={sizename === size.name}
                      className={`h-9 min-w-[3rem] rounded border px-3 font-mono text-sm transition-colors ${
                        sizename === size.name
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
                <label htmlFor="inventory" className="admin-label">
                  Số lượng kho <span className="text-[#DC2626]">*</span>
                </label>
                <input
                  id="inventory"
                  type="number"
                  min="0"
                  required
                  value={inventory}
                  onChange={(e) => setInventory(e.target.value)}
                  placeholder="0"
                  className="admin-input font-mono"
                />
                <p className="mt-1 text-xs text-[#606562]">
                  Thêm size khác sau tại danh sách sản phẩm.
                </p>
              </div>
            </div>
          </Panel>

          <Panel
            title="Kiểm tra"
            actions={
              <span className="font-mono text-xs text-[#606562]">
                {completed}/{checklist.length}
              </span>
            }
            footer={
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={resetForm}
                  className="btn-admin btn-admin-secondary flex-1"
                >
                  Làm lại
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-admin btn-admin-primary flex-1"
                >
                  {isLoading ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  ) : (
                    "Lưu sản phẩm"
                  )}
                </button>
              </div>
            }
          >
            <ul className="space-y-2 text-sm">
              {checklist.map(([label, ok]) => (
                <li key={label} className="flex items-center gap-2">
                  <span
                    className={`flex h-4 w-4 items-center justify-center rounded-full ${
                      ok ? "bg-[#16A34A] text-white" : "border border-[#cccfcd]"
                    }`}
                    aria-hidden="true"
                  >
                    {ok && <Check size={11} strokeWidth={3} />}
                  </span>
                  <span className={ok ? "text-brand-ink" : "text-[#606562]"}>
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </form>

      <PreviewImages
        imageUrls={previewImages}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default AddProduct;
