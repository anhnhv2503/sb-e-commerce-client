import useCurrencyFormat from "@/components/hooks/useCurrencyFormat";
import ProductBreadcrumb from "@/components/products/ProductBreadcrumb";
import RelatedProducts from "@/components/products/RelatedProducts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Heart,
  Minus,
  Package,
  Plus,
  RefreshCw,
  Shield,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  addItemToCart,
  getInventory,
  getProductById,
} from "../service/ApiFunctions";

/**
 * ProductDetail
 * Redesigned with:
 *  - Image gallery with thumbnails
 *  - Sticky product info panel
 *  - Loading skeleton
 *  - Mobile-responsive layout with bottom CTA bar
 *  - SKILL.md tokens & accessibility
 */
const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [inventory, setInventory] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [categoryId, setCategoryId] = useState(null);

  useDocumentTitle(product?.name || "Chi tiết sản phẩm");
  const currency = useCurrencyFormat();

  const fetchProduct = async () => {
    setIsLoading(true);
    try {
      const response = await getProductById(id);
      setProduct(response.data?.data);
      setCategoryId(response.data?.data?.category?.id);
    } catch (error) {
      console.error(error);
      toast.error("Không thể tải thông tin sản phẩm");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchInventory = async (sizeId) => {
    try {
      const response = await getInventory(sizeId);
      setInventory(response.data?.data);
    } catch (error) {
      console.error(error);
      toast.error("Không thể kiểm tra tồn kho");
    }
  };

  useEffect(() => {
    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (selectedSize) {
      fetchInventory(selectedSize.id);
    }
  }, [selectedSize]);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (!localStorage.getItem("accessToken")) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }
    if (!selectedSize) {
      toast.error("Vui lòng chọn size sản phẩm");
      return;
    }
    if (quantity <= 0) {
      toast.error("Vui lòng nhập số lượng sản phẩm");
      return;
    }
    setIsAddingToCart(true);
    const formData = new FormData();
    formData.append("quantity", quantity);
    formData.append("sizeId", selectedSize.id);
    try {
      const response = await addItemToCart(formData);
      if (response) {
        toast.success("Thêm sản phẩm vào giỏ hàng thành công");
        setQuantity(1);
      }
    } catch (error) {
      console.log(error);
      toast.error("Thêm sản phẩm vào giỏ hàng thất bại");
    } finally {
      setIsAddingToCart(false);
    }
  };

  const incrementQuantity = () => {
    if (inventory && quantity < inventory) setQuantity((p) => p + 1);
  };
  const decrementQuantity = () => {
    if (quantity > 1) setQuantity((p) => p - 1);
  };

  const goToPrevImage = () => {
    if (product?.images) {
      setActiveImageIndex((i) => (i === 0 ? product.images.length - 1 : i - 1));
    }
  };
  const goToNextImage = () => {
    if (product?.images) {
      setActiveImageIndex((i) => (i === product.images.length - 1 ? 0 : i + 1));
    }
  };

  // ── Loading Skeleton ──
  if (isLoading || !product) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Skeleton className="h-5 w-64 mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="space-y-4">
              <Skeleton className="aspect-square w-full rounded-2xl" />
              <div className="flex gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="w-20 h-20 rounded-lg flex-shrink-0" />
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-8 w-1/3" />
              <Skeleton className="h-px w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-px w-full" />
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-12 w-16 rounded-lg" />
                ))}
              </div>
              <Skeleton className="h-12 w-40" />
              <Skeleton className="h-14 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isOutOfStock = inventory !== null && inventory <= 0;
  const isLowStock = inventory !== null && inventory > 0 && inventory <= 10;

  const features = [
    { icon: <Check size={16} />, label: "Hàng chính hãng" },
    { icon: <Truck size={16} />, label: "Giao hàng nhanh" },
    { icon: <RefreshCw size={16} />, label: "Đổi trả miễn phí" },
    { icon: <Shield size={16} />, label: "Bảo hành 12 tháng" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-24 lg:pb-8">
      {/* ── Breadcrumb ── */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <ProductBreadcrumb />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* ── Image Gallery ── */}
          <div className="space-y-4">
            {/* Main image */}
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-sm group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  src={product.images[activeImageIndex]?.url}
                  alt={`${product.name} — hình ${activeImageIndex + 1}`}
                  className="w-full h-full object-cover object-center"
                />
              </AnimatePresence>

              {/* Navigation arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={goToPrevImage}
                    aria-label="Hình trước"
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 text-gray-600 hover:bg-white hover:text-[#111827] opacity-0 group-hover:opacity-100 transition-all shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3B82F6] focus-visible:opacity-100"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={goToNextImage}
                    aria-label="Hình tiếp theo"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 text-gray-600 hover:bg-white hover:text-[#111827] opacity-0 group-hover:opacity-100 transition-all shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3B82F6] focus-visible:opacity-100"
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}

              {/* Image counter */}
              <div aria-hidden="true" className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs font-mono">
                {activeImageIndex + 1} / {product.images.length}
              </div>

              {/* Favorite button */}
              <button
                onClick={() => setIsFavorited(!isFavorited)}
                aria-label={isFavorited ? "Bỏ yêu thích" : "Thêm vào yêu thích"}
                className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-sm border transition-all shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3B82F6] ${
                  isFavorited
                    ? "bg-red-50 border-red-200 text-red-500"
                    : "bg-white/90 border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200"
                }`}
              >
                <Heart size={18} className={isFavorited ? "fill-red-500" : ""} />
              </button>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide" role="tablist" aria-label="Image thumbnails">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    role="tab"
                    aria-selected={activeImageIndex === index}
                    aria-label={`Xem hình ${index + 1}`}
                    onClick={() => setActiveImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3B82F6] ${
                      activeImageIndex === index
                        ? "border-[#3B82F6] ring-2 ring-[#3B82F6]/20"
                        : "border-gray-200 opacity-60 hover:opacity-100 hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Product Info ── */}
          <motion.div
            className="lg:sticky lg:top-24 lg:self-start space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.45 }}
          >
            {/* Category */}
            {product.category && (
              <Badge
                variant="outline"
                className="text-[#3B82F6] bg-blue-50 border-blue-200 hover:bg-blue-100 font-mono text-xs uppercase tracking-wider"
              >
                {product.category.name}
              </Badge>
            )}

            {/* Name */}
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#111827] leading-tight">
              {product.name}
            </h1>

            {/* Price */}
            <p className="text-3xl font-bold text-[#3B82F6]">
              {currency.format(product.price)}
            </p>

            <div className="h-px bg-gray-200" />

            {/* Description */}
            <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed">
              <p>{product.description}</p>
            </div>

            <div className="h-px bg-gray-200" />

            {/* ── Form ── */}
            <form className="space-y-6" onSubmit={handleAddToCart}>
              {/* Size selector */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-[#111827] uppercase tracking-wider font-mono">
                    Size
                  </h3>
                  {inventory !== null && (
                    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${
                      isOutOfStock
                        ? "bg-red-50 text-[#DC2626]"
                        : isLowStock
                          ? "bg-orange-50 text-[#D97706]"
                          : "bg-green-50 text-[#16A34A]"
                    }`}>
                      <Package size={12} aria-hidden="true" />
                      {isOutOfStock
                        ? "Hết hàng"
                        : isLowStock
                          ? `Chỉ còn ${inventory}`
                          : `Còn ${inventory}`}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.size?.map((size) => (
                    <motion.button
                      key={size.id}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      whileTap={{ scale: 0.95 }}
                      aria-label={`Size ${size.sizeName}`}
                      aria-pressed={selectedSize?.id === size.id}
                      className={`min-w-[3.5rem] px-4 py-3 rounded-lg text-sm font-semibold uppercase border-2 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#3B82F6] ${
                        selectedSize?.id === size.id
                          ? "bg-[#111827] text-white border-[#111827]"
                          : "bg-white text-[#111827] border-gray-200 hover:border-[#111827]"
                      }`}
                    >
                      {size.sizeName}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Quantity selector */}
              <div>
                <h3 className="text-sm font-semibold text-[#111827] uppercase tracking-wider font-mono mb-3">
                  Số lượng
                </h3>
                <div className="inline-flex items-center border border-gray-200 rounded-lg overflow-hidden">
                  <motion.button
                    type="button"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Giảm số lượng"
                    className="p-3 text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <Minus size={16} />
                  </motion.button>
                  <input
                    type="number"
                    min={1}
                    max={inventory || 1}
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    aria-label="Số lượng sản phẩm"
                    className="w-14 text-center py-3 text-sm font-semibold text-[#111827] border-x border-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#3B82F6]"
                  />
                  <motion.button
                    type="button"
                    onClick={incrementQuantity}
                    disabled={inventory && quantity >= inventory}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Tăng số lượng"
                    className="p-3 text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <Plus size={16} />
                  </motion.button>
                </div>
              </div>

              {/* Add to cart — desktop */}
              <motion.button
                type="submit"
                disabled={!selectedSize || isOutOfStock || isAddingToCart}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                id="product-add-to-cart"
                className="hidden lg:flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-blue-500/25 disabled:bg-gray-200 disabled:text-gray-500 disabled:shadow-none disabled:cursor-not-allowed transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6]"
              >
                {isAddingToCart ? (
                  <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                ) : (
                  <ShoppingBag size={20} aria-hidden="true" />
                )}
                {isOutOfStock ? "Hết Hàng" : "Thêm Vào Giỏ Hàng"}
              </motion.button>
            </form>

            {/* Features grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {features.map(({ icon, label }, i) => (
                <div key={i} className="flex items-center gap-2.5 text-sm text-gray-500">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-[#3B82F6] flex-shrink-0">
                    {icon}
                  </span>
                  {label}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Related Products ── */}
        <motion.div
          className="mt-16 bg-white rounded-2xl border border-gray-200 p-6 sm:p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.45 }}
        >
          <RelatedProducts categoryId={categoryId} />
        </motion.div>
      </div>

      {/* ── Mobile sticky CTA bar ── */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 lg:hidden z-30 shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-[#111827] truncate">{product.name}</p>
            <p className="text-lg font-bold text-[#3B82F6]">{currency.format(product.price)}</p>
          </div>
          <Button
            onClick={handleAddToCart}
            disabled={!selectedSize || isOutOfStock || isAddingToCart}
            id="product-mobile-add-to-cart"
            className="flex-shrink-0 h-12 px-6 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold rounded-xl shadow-md shadow-blue-500/20 disabled:bg-gray-200 disabled:text-gray-500 disabled:shadow-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6]"
          >
            {isAddingToCart ? (
              <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            ) : (
              <>
                <ShoppingBag size={18} className="mr-1.5" aria-hidden="true" />
                Thêm
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
