import useCurrencyFormat from "@/components/hooks/useCurrencyFormat";
import ProductBreadcrumb from "@/components/products/ProductBreadcrumb";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { motion } from "framer-motion";
import { Minus, Plus, ShoppingBag } from "lucide-react";
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
  const navigate = useNavigate();
  const location = useLocation();

  useDocumentTitle(product?.name || "Chi tiết sản phẩm");
  const currency = useCurrencyFormat();

  const fetchProduct = async () => {
    setIsLoading(true);
    try {
      const response = await getProductById(id);
      setProduct(response.data?.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch product details");
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
      toast.error("Failed to fetch inventory");
    }
  };

  useEffect(() => {
    fetchProduct();
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

  if (isLoading || !product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 rounded-full border-4 border-t-indigo-600 border-r-transparent border-l-transparent border-b-indigo-300 animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductBreadcrumb />

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="aspect-square overflow-hidden rounded-2xl bg-gray-50"
            >
              {product.images && product.images.length > 0 && (
                <img
                  src={product.images[activeImageIndex]?.url}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
              )}
            </motion.div>

            {/* Thumbnail Gallery */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2 px-3 py-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden ${
                      activeImageIndex === index
                        ? "ring-2 ring-offset-2 ring-indigo-600"
                        : "opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {product.name}
              </h1>
              <div className="mt-3">
                <p className="text-3xl font-semibold text-indigo-600">
                  {currency.format(product.price)}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <div className="prose prose-indigo max-w-none">
                <p>{product.description}</p>
              </div>
            </div>

            <form className="mt-8 space-y-8" onSubmit={handleAddToCart}>
              {/* Size Selector */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-4">Size</h3>
                <div className="grid grid-cols-4 gap-3">
                  {product.size?.map((size) => (
                    <button
                      key={size.id}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`
                        flex items-center justify-center rounded-md py-3 text-sm font-medium uppercase
                        ${
                          selectedSize?.id === size.id
                            ? "bg-indigo-600 text-white"
                            : "bg-white text-gray-900 border border-gray-300 hover:bg-gray-50"
                        }
                      `}
                    >
                      {size.sizeName}
                    </button>
                  ))}
                </div>
              </div>

              {/* Inventory Status */}
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
                    ? `Chỉ còn ${inventory} sản phẩm trong kho`
                    : "Hết hàng"}
                </p>
              )}

              {/* Quantity Selector */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-4">
                  Số lượng
                </h3>
                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className="rounded-md bg-gray-100 p-2 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
                  >
                    <Minus size={18} />
                  </button>
                  <input
                    type="number"
                    min={1}
                    max={inventory || 1}
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="w-16 text-center border-gray-300 rounded-md py-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={incrementQuantity}
                    disabled={inventory && quantity >= inventory}
                    className="rounded-md bg-gray-100 p-2 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                type="submit"
                disabled={!selectedSize || !inventory || inventory <= 0}
                className="mt-8 w-full flex items-center justify-center gap-2 rounded-md bg-indigo-600 px-8 py-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <ShoppingBag size={20} />
                Thêm vào giỏ hàng
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
