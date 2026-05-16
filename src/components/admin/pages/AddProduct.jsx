import PreviewImages from "@/components/common/PreviewImages";
import {
  addProduct,
  getAllCategories,
} from "@/components/service/ApiFunctions.js";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { motion } from "framer-motion";
import {
  Box,
  Image as ImageIcon,
  Layers,
  Sparkles,
  Tag,
  Upload,
} from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { sizeOptions } from "../../../data/data.js";

/**
 * AddProduct Page
 * Redesigned full-page form to match SKILL.md artistic design system
 */
const AddProduct = () => {
  useDocumentTitle("Thêm Sản Phẩm — VA Shop Admin");
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
    const files = Array.from(e.target.files);
    setImages(files);
    const imagesUrl = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(imagesUrl);
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
        // Reset form
        setName("");
        setDescription("");
        setPrice("");
        setBrand("");
        setInventory("");
        setCategory("");
        setSizeName("");
        setImages([]);
        setPreviewImages([]);
      }
    } catch (error) {
      console.error("Error adding product", error);
      toast.error("Có lỗi xảy ra khi thêm sản phẩm");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-5xl mx-auto space-y-6 pb-12"
    >
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-[#111827] p-8 sm:p-10 border border-gray-800">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#3B82F6]/15 rounded-full blur-3xl -mr-10 -mt-10" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-white/80 text-[10px] font-mono tracking-widest uppercase mb-4">
              <Sparkles size={12} className="text-[#3B82F6]" />
              Sản Phẩm Mới
            </div>
            <h1 className="font-display text-3xl font-bold text-white mb-2">
              Thêm Sản Phẩm
            </h1>
            <p className="text-white/60 text-sm max-w-lg">
              Điền thông tin chi tiết, chọn danh mục và tải lên hình ảnh để tạo
              một sản phẩm mới trong hệ thống.
            </p>
          </div>
        </div>
      </div>

      {/* Main Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Left Column - Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-5">
            <h2 className="text-sm font-semibold text-[#111827] uppercase tracking-wider font-mono flex items-center gap-2 border-b border-gray-100 pb-3">
              <Box size={16} className="text-[#3B82F6]" />
              Thông Tin Cơ Bản
            </h2>

            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-xs font-semibold text-gray-500 uppercase tracking-wider"
              >
                Tên sản phẩm <span className="text-red-500">*</span>
              </label>
              <Input
                id="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ví dụ: Giày thể thao Nike Air Force 1"
                className="h-11 bg-gray-50 border-gray-200 focus:border-[#3B82F6] focus:ring-[#3B82F6] rounded-lg text-[#111827]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label
                  htmlFor="brand"
                  className="text-xs font-semibold text-gray-500 uppercase tracking-wider"
                >
                  Thương hiệu <span className="text-red-500">*</span>
                </label>
                <Input
                  id="brand"
                  required
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="Ví dụ: Nike"
                  className="h-11 bg-gray-50 border-gray-200 focus:border-[#3B82F6] focus:ring-[#3B82F6] rounded-lg text-[#111827]"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="price"
                  className="text-xs font-semibold text-gray-500 uppercase tracking-wider"
                >
                  Giá tiền (VNĐ) <span className="text-red-500">*</span>
                </label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Ví dụ: 1500000"
                  className="h-11 bg-gray-50 border-gray-200 focus:border-[#3B82F6] focus:ring-[#3B82F6] rounded-lg text-[#111827] font-mono"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="description"
                className="text-xs font-semibold text-gray-500 uppercase tracking-wider"
              >
                Mô tả chi tiết <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                required
                rows={6}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Nhập mô tả về chất liệu, tính năng, cách sử dụng..."
                className="w-full p-3 bg-gray-50 border border-gray-200 focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] rounded-lg text-[#111827] text-sm transition-colors outline-none resize-y"
              />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-5">
            <h2 className="text-sm font-semibold text-[#111827] uppercase tracking-wider font-mono flex items-center gap-2 border-b border-gray-100 pb-3">
              <ImageIcon size={16} className="text-[#3B82F6]" />
              Hình Ảnh Sản Phẩm
            </h2>

            <div className="space-y-4">
              {/* Custom file upload zone */}
              <div className="relative border-2 border-dashed border-gray-200 hover:border-[#3B82F6] bg-gray-50 hover:bg-blue-50/50 rounded-xl p-8 transition-colors flex flex-col items-center justify-center text-center group cursor-pointer focus-within:ring-2 focus-within:ring-[#3B82F6] focus-within:ring-offset-2">
                <input
                  type="file"
                  id="images"
                  multiple
                  required={previewImages.length === 0}
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Upload size={20} className="text-[#3B82F6]" />
                </div>
                <p className="text-sm font-medium text-[#111827] mb-1">
                  Kéo thả hoặc nhấp để tải ảnh lên
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG, JPEG (Tối đa 5MB)
                </p>
              </div>

              {/* Preview Grid */}
              {previewImages.length > 0 && (
                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3 pt-2">
                  {previewImages.map((url, index) => (
                    <div
                      key={index}
                      className="relative aspect-square rounded-lg border border-gray-200 overflow-hidden cursor-pointer group hover:border-[#3B82F6] transition-colors shadow-sm"
                      onClick={() => setIsModalOpen(true)}
                    >
                      <img
                        src={url}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Classification & Actions */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-5">
            <h2 className="text-sm font-semibold text-[#111827] uppercase tracking-wider font-mono flex items-center gap-2 border-b border-gray-100 pb-3">
              <Layers size={16} className="text-[#3B82F6]" />
              Phân Loại
            </h2>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Danh mục <span className="text-red-500">*</span>
              </label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger className="w-full h-11 bg-gray-50 border-gray-200 focus:ring-[#3B82F6] rounded-lg">
                  <SelectValue placeholder="Chọn danh mục" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-gray-100">
                  {categories.map((cat) => (
                    <SelectItem
                      key={cat.id}
                      value={cat.name}
                      className="cursor-pointer"
                    >
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Thuộc tính Size <span className="text-red-500">*</span>
              </label>
              <Select value={sizename} onValueChange={setSizeName} required>
                <SelectTrigger className="w-full h-11 bg-gray-50 border-gray-200 focus:ring-[#3B82F6] rounded-lg">
                  <div className="flex items-center gap-2">
                    <Tag size={16} className="text-gray-400" />
                    <SelectValue placeholder="Chọn size" />
                  </div>
                </SelectTrigger>
                <SelectContent className="rounded-xl border-gray-100">
                  {sizeOptions.map((size) => (
                    <SelectItem
                      key={size.id}
                      value={size.name}
                      className="cursor-pointer"
                    >
                      Size {size.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="inventory"
                className="text-xs font-semibold text-gray-500 uppercase tracking-wider"
              >
                Số lượng kho <span className="text-red-500">*</span>
              </label>
              <Input
                id="inventory"
                type="number"
                min="0"
                required
                value={inventory}
                onChange={(e) => setInventory(e.target.value)}
                placeholder="0"
                className="h-11 bg-gray-50 border-gray-200 focus:border-[#3B82F6] focus:ring-[#3B82F6] rounded-lg text-[#111827] font-mono"
              />
            </div>
          </div>

          {/* Action Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 flex items-center justify-center rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold shadow-md shadow-blue-500/20 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6] disabled:opacity-50 disabled:shadow-none"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                "Lưu Sản Phẩm"
              )}
            </button>
          </div>
        </div>
      </form>

      <PreviewImages
        imageUrls={previewImages}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </motion.div>
  );
};

export default AddProduct;
