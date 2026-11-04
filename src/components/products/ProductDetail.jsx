import useCurrencyFormat from "@/components/hooks/useCurrencyFormat";
import ProductBreadcrumb from "@/components/products/ProductBreadcrumb";
import RelatedProducts from "@/components/products/RelatedProducts";
import { Skeleton } from "@/components/ui/skeleton";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  ChevronLeft,
  ChevronRight,
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
      <div className="min-h-screen bg-white">
        <div className="page-container py-8">
          <Skeleton className="mb-8 h-4 w-64 rounded" />
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-3">
              <Skeleton className="aspect-square w-full rounded-lg" />
              <div className="flex gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton
                    key={i}
                    className="h-20 w-20 flex-shrink-0 rounded-lg"
                  />
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <Skeleton className="h-4 w-24 rounded" />
              <Skeleton className="h-12 w-3/4 rounded" />
              <Skeleton className="h-6 w-1/3 rounded" />
              <Skeleton className="h-20 w-full rounded" />
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-11 w-14 rounded" />
                ))}
              </div>
              <Skeleton className="h-12 w-full rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isOutOfStock = inventory !== null && inventory <= 0;
  const isLowStock = inventory !== null && inventory > 0 && inventory <= 10;

  const features = [
    { icon: <Check size={18} strokeWidth={1.5} />, label: "Hàng chính hãng" },
    { icon: <Truck size={18} strokeWidth={1.5} />, label: "Giao hàng nhanh" },
    {
      icon: <RefreshCw size={18} strokeWidth={1.5} />,
      label: "Đổi trả miễn phí",
    },
    { icon: <Shield size={18} strokeWidth={1.5} />, label: "Bảo hành 12 tháng" },
  ];

  const imageNavBtn =
    "absolute top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded bg-white text-brand-ink opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-blue";

  return (
    <div className="min-h-screen bg-white pb-24 lg:pb-0">
      {/* ── Breadcrumb ── */}
      <div className="border-b border-hairline">
        <div className="page-container py-4">
          <ProductBreadcrumb />
        </div>
      </div>

      <div className="page-container py-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          {/* ── Image gallery ── */}
          <div className="space-y-3">
            <div className="group relative aspect-square overflow-hidden rounded-lg bg-brand-mist">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  src={product.images[activeImageIndex]?.url}
                  alt={`${product.name} — hình ${activeImageIndex + 1}`}
                  className="h-full w-full object-cover object-center"
                />
              </AnimatePresence>

              {product.images.length > 1 && (
                <>
                  <button
                    onClick={goToPrevImage}
                    aria-label="Hình trước"
                    className={`${imageNavBtn} left-3`}
                  >
                    <ChevronLeft size={20} strokeWidth={1.5} />
                  </button>
                  <button
                    onClick={goToNextImage}
                    aria-label="Hình tiếp theo"
                    className={`${imageNavBtn} right-3`}
                  >
                    <ChevronRight size={20} strokeWidth={1.5} />
                  </button>
                </>
              )}

              <div
                aria-hidden="true"
                className="absolute bottom-3 right-3 rounded bg-brand-night px-2.5 py-1 font-mono text-xs text-white"
              >
                {String(activeImageIndex + 1).padStart(2, "0")} /{" "}
                {String(product.images.length).padStart(2, "0")}
              </div>

              <button
                onClick={() => setIsFavorited(!isFavorited)}
                aria-label={isFavorited ? "Bỏ yêu thích" : "Thêm vào yêu thích"}
                aria-pressed={isFavorited}
                className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-blue"
              >
                <Heart
                  size={18}
                  strokeWidth={1.5}
                  className={
                    isFavorited
                      ? "fill-brand-pink text-brand-pink"
                      : "text-brand-ink transition-colors hover:text-brand-pink"
                  }
                />
              </button>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div
                className="scrollbar-hide flex gap-3 overflow-x-auto p-1"
                role="tablist"
                aria-label="Image thumbnails"
              >
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    role="tab"
                    aria-selected={activeImageIndex === index}
                    aria-label={`Xem hình ${index + 1}`}
                    onClick={() => setActiveImageIndex(index)}
                    className={`h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-brand-mist transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-blue ${
                      activeImageIndex === index
                        ? "outline outline-1 outline-offset-2 outline-brand-ink"
                        : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Product info ── */}
          <motion.div
            className="lg:sticky lg:top-24 lg:self-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.45 }}
          >
            {product.category && (
              <p className="eyebrow mb-4 text-brand-pink">
                {product.category.name}
              </p>
            )}

            <h1 className="font-display break-words text-[40px] text-brand-ink xl:text-5xl">
              {product.name}
            </h1>

            <p className="mt-4 text-2xl font-semibold text-brand-orange">
              {currency.format(product.price)}
            </p>

            <p className="mt-6 border-t border-hairline pt-6 text-base leading-relaxed text-[#363537]">
              {product.description}
            </p>

            {/* ── Form ── */}
            <form
              className="mt-8 space-y-8 border-t border-hairline pt-8"
              onSubmit={handleAddToCart}
            >
              {/* Size selector */}
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="eyebrow text-brand-ink">Size</h3>
                  {inventory !== null && (
                    <span
                      className={`pill px-3 py-1 text-white ${
                        isOutOfStock
                          ? "bg-[#DC2626]"
                          : isLowStock
                            ? "bg-[#ec922b]"
                            : "bg-[#16A34A]"
                      }`}
                    >
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
                  {product.size?.map((size) => {
                    const isSelected = selectedSize?.id === size.id;
                    return (
                      <button
                        key={size.id}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        aria-label={`Size ${size.sizeName}`}
                        aria-pressed={isSelected}
                        className={`font-label h-11 min-w-[3.5rem] rounded border px-4 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue ${
                          isSelected
                            ? "border-brand-pink bg-brand-pink text-white"
                            : "border-[#cccfcd] bg-white text-brand-ink hover:border-brand-ink"
                        }`}
                      >
                        {size.sizeName}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity selector */}
              <div>
                <h3 className="eyebrow mb-3 text-brand-ink">Số lượng</h3>
                <div className="inline-flex h-11 items-center overflow-hidden rounded border border-[#cccfcd]">
                  <button
                    type="button"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    aria-label="Giảm số lượng"
                    className="flex h-full w-11 items-center justify-center text-brand-ink transition-colors hover:bg-brand-mist disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <Minus size={16} />
                  </button>
                  <input
                    type="number"
                    min={1}
                    max={inventory || 1}
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    aria-label="Số lượng sản phẩm"
                    className="h-full w-14 border-x border-[#cccfcd] text-center font-mono text-sm text-brand-ink focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-blue"
                  />
                  <button
                    type="button"
                    onClick={incrementQuantity}
                    disabled={inventory && quantity >= inventory}
                    aria-label="Tăng số lượng"
                    className="flex h-full w-11 items-center justify-center text-brand-ink transition-colors hover:bg-brand-mist disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Add to cart — desktop */}
              <button
                type="submit"
                disabled={!selectedSize || isOutOfStock || isAddingToCart}
                id="product-add-to-cart"
                className="btn btn-primary hidden h-14 w-full lg:flex"
              >
                {isAddingToCart ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                ) : (
                  <ShoppingBag size={20} aria-hidden="true" />
                )}
                {isOutOfStock ? "Hết Hàng" : "Thêm Vào Giỏ Hàng"}
              </button>
            </form>

            {/* Features */}
            <ul className="mt-8 grid grid-cols-2 gap-4 border-t border-hairline pt-8">
              {features.map(({ icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-3 text-sm text-[#363537]"
                >
                  <span className="text-brand-ink" aria-hidden="true">
                    {icon}
                  </span>
                  {label}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* ── Related products ── */}
      <div className="border-t border-hairline">
        <div className="page-container py-16 sm:py-20">
          <RelatedProducts categoryId={categoryId} />
        </div>
      </div>

      {/* ── Mobile sticky CTA bar ── */}
      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-hairline bg-white px-4 py-3 lg:hidden">
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm text-brand-ink">{product.name}</p>
            <p className="text-base font-semibold text-brand-orange">
              {currency.format(product.price)}
            </p>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={!selectedSize || isOutOfStock || isAddingToCart}
            id="product-mobile-add-to-cart"
            className="btn btn-primary h-12 flex-shrink-0"
          >
            {isAddingToCart ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            ) : (
              <>
                <ShoppingBag size={18} aria-hidden="true" />
                Thêm
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
