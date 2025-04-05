import useCurrencyFormat from "@/components/hooks/useCurrencyFormat";
import ProductBreadcrumb from "@/components/products/ProductBreadcrumb";
import RelatedProducts from "@/components/products/RelatedProducts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Minus, Plus, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  addItemToCart,
  getInventory,
  getProductById,
} from "../service/ApiFunctions";

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
    // Scroll to top on new product load
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
    if (inventory && quantity < inventory) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  if (isLoading || !product) {
    return (
      <div className="bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ProductBreadcrumb />
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
            {/* Image Skeleton */}
            <div className="space-y-4">
              <Skeleton className="aspect-square w-full rounded-2xl" />
              <div className="flex gap-2 overflow-x-auto pb-2">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton
                    key={i}
                    className="w-20 h-20 rounded-lg flex-shrink-0"
                  />
                ))}
              </div>
            </div>

            {/* Product Info Skeleton */}
            <div className="flex flex-col space-y-6">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-8 w-1/3" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductBreadcrumb />

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  src={product.images[activeImageIndex]?.url}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
              </AnimatePresence>
            </div>

            {/* Thumbnail Gallery */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {product.images.map((image, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      activeImageIndex === index
                        ? "border-indigo-600"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img
                      src={image.url}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <motion.div
            className="flex flex-col bg-white p-6 rounded-xl shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="flex items-start justify-between">
              <div>
                {product.category && (
                  <Badge
                    variant="outline"
                    className="mb-2 text-indigo-700 bg-indigo-50 hover:bg-indigo-100"
                  >
                    {product.category.name}
                  </Badge>
                )}
                <h1 className="text-3xl font-bold text-gray-900">
                  {product.name}
                </h1>
                <div className="mt-3">
                  <p className="text-3xl font-semibold text-indigo-600">
                    {currency.format(product.price)}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleFavorite}
                className={`rounded-full h-10 w-10 ${
                  isFavorited
                    ? "text-red-500"
                    : "text-gray-400 hover:text-red-500"
                }`}
              >
                <Heart
                  size={20}
                  className={isFavorited ? "fill-red-500" : ""}
                />
              </Button>
            </div>

            <div className="mt-6 pb-6 border-b border-gray-200">
              <div className="prose prose-indigo max-w-none text-gray-600">
                <p>{product.description}</p>
              </div>
            </div>

            <form className="mt-6 space-y-6" onSubmit={handleAddToCart}>
              {/* Size Selector */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  {inventory !== null && (
                    <p
                      className={`text-sm ${
                        inventory > 10
                          ? "text-green-600"
                          : inventory > 0
                          ? "text-orange-500"
                          : "text-red-600"
                      }`}
                    >
                      {inventory > 10
                        ? `Còn ${inventory} sản phẩm`
                        : inventory > 0
                        ? `Chỉ còn ${inventory} sản phẩm`
                        : "Hết hàng"}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {product.size?.map((size) => (
                    <motion.button
                      key={size.id}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`
                        relative flex items-center justify-center rounded-md py-3 text-sm font-medium uppercase
                        ${
                          selectedSize?.id === size.id
                            ? "bg-indigo-600 text-white ring-2 ring-offset-1 ring-indigo-600"
                            : "bg-white text-gray-900 border border-gray-300 hover:bg-gray-50"
                        }
                      `}
                    >
                      {size.sizeName}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Số lượng
                </h3>
                <div className="flex items-center">
                  <motion.button
                    type="button"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    whileTap={{ scale: 0.9 }}
                    className="rounded-l-md bg-gray-100 p-3 text-gray-600 hover:bg-gray-200 disabled:opacity-50 border border-gray-300"
                  >
                    <Minus size={16} />
                  </motion.button>
                  <input
                    type="number"
                    min={1}
                    max={inventory || 1}
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="w-16 text-center py-3 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
                  />
                  <motion.button
                    type="button"
                    onClick={incrementQuantity}
                    disabled={inventory && quantity >= inventory}
                    whileTap={{ scale: 0.9 }}
                    className="rounded-r-md bg-gray-100 p-3 text-gray-600 hover:bg-gray-200 disabled:opacity-50 border border-gray-300"
                  >
                    <Plus size={16} />
                  </motion.button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <motion.button
                type="submit"
                disabled={
                  !selectedSize ||
                  !inventory ||
                  inventory <= 0 ||
                  isAddingToCart
                }
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 rounded-md bg-indigo-600 px-8 py-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
              >
                {isAddingToCart ? (
                  <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                ) : (
                  <ShoppingBag size={20} />
                )}
                Thêm vào giỏ hàng
              </motion.button>
            </form>

            {/* Product Features */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <div className="rounded-full bg-indigo-100 p-2 mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-sm text-gray-600">Hàng chính hãng</span>
              </div>
              <div className="flex items-center">
                <div className="rounded-full bg-indigo-100 p-2 mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <span className="text-sm text-gray-600">Giao hàng nhanh</span>
              </div>
              <div className="flex items-center">
                <div className="rounded-full bg-indigo-100 p-2 mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </div>
                <span className="text-sm text-gray-600">Đổi trả miễn phí</span>
              </div>
              <div className="flex items-center">
                <div className="rounded-full bg-indigo-100 p-2 mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <span className="text-sm text-gray-600">Bảo hành 12 tháng</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="p-6 mt-8 bg-white rounded-lg shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <RelatedProducts categoryId={categoryId} />
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail;
