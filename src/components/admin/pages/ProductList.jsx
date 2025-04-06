import DotsLoading from "@/components/common/DotsLoading";
import Paginator from "@/components/common/Paginator";
import useCurrencyFormat from "@/components/hooks/useCurrencyFormat";
import { getProducts } from "@/components/service/ApiFunctions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  EyeIcon,
  PencilIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddMoreSize from "./AddMoreSize";

const ProductList = () => {
  useDocumentTitle("Quản lý sản phẩm");
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedProduct, setExpandedProduct] = useState(null);
  const [pageSize, setPageSize] = useState(5);

  const currency = useCurrencyFormat();

  useEffect(() => {
    fetchProducts();
  }, [currentPage, pageSize]);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await getProducts(currentPage, pageSize);
      setProducts(response.data?.content || []);
      setTotalPages(response.data?.page?.totalPages || 0);
    } catch (error) {
      console.error("Error fetching products: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const toggleProductExpand = (id) => {
    setExpandedProduct(expandedProduct === id ? null : id);
  };

  const getSizeStock = (sizes) => {
    if (!sizes || sizes.length === 0) return 0;
    return sizes.reduce((total, size) => total + (size.quantity || 0), 0);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Danh sách sản phẩm
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Quản lý và cập nhật thông tin sản phẩm
          </p>
        </div>
        <Link to="/admin/product/add">
          <Button className="bg-indigo-600 hover:bg-indigo-700 flex items-center gap-2">
            <PlusCircleIcon className="h-5 w-5" />
            Thêm sản phẩm mới
          </Button>
        </Link>
      </div>

      {/* Products List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center items-center py-32">
            <DotsLoading />
          </div>
        ) : (
          <>
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="divide-y divide-gray-100"
            >
              {products.length > 0 ? (
                products.map((product, index) => (
                  <motion.div
                    key={product.id || index}
                    variants={item}
                    className="group hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row p-5 gap-6">
                      {/* Product Image */}
                      <div className="relative flex-shrink-0">
                        <img
                          src={
                            product.images?.[0]?.url ||
                            "https://via.placeholder.com/150"
                          }
                          alt={product.name}
                          className="h-44 w-36 object-cover bg-gray-50 rounded-md shadow-sm"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-grow space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-medium text-gray-900 line-clamp-1">
                              {product.name}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              {product.category && (
                                <Badge
                                  variant="secondary"
                                  className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                                >
                                  {product.category?.name}
                                </Badge>
                              )}
                              {product.brand && (
                                <Badge
                                  variant="outline"
                                  className="text-gray-700"
                                >
                                  {product.brand}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <Badge className="text-lg px-3 py-1 bg-indigo-600">
                            {currency.format(product.price)}
                          </Badge>
                        </div>

                        <p className="text-gray-500 text-sm line-clamp-2">
                          {product.description || "Không có mô tả"}
                        </p>

                        {/* Size Information */}
                        <div className="mt-3 flex flex-wrap gap-2">
                          {product.size &&
                            product.size.map((sizeItem, idx) => (
                              <div
                                key={idx}
                                className={`text-xs px-2 py-1 rounded-lg flex items-center ${
                                  sizeItem.quantity > 0
                                    ? "bg-green-50 text-green-700"
                                    : "bg-gray-100 text-gray-500"
                                }`}
                              >
                                <span className="font-medium">
                                  {sizeItem.sizeName}
                                </span>
                                <span className="px-1">:</span>
                                <span>{sizeItem.quantity}</span>
                              </div>
                            ))}
                        </div>

                        {/* Actions */}
                        <div className="pt-3 flex flex-wrap items-center gap-3 justify-between">
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex items-center gap-1"
                            >
                              <PencilIcon className="h-4 w-4" />
                              Chỉnh sửa
                            </Button>

                            <Button
                              size="sm"
                              variant="ghost"
                              className="flex items-center gap-1"
                            >
                              <EyeIcon className="h-4 w-4" />
                              Xem
                            </Button>

                            <AddMoreSize
                              productId={product.id}
                              fetchProduct={fetchProducts}
                            />
                          </div>

                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => toggleProductExpand(product.id)}
                            className="text-gray-500"
                          >
                            {expandedProduct === product.id ? (
                              <ChevronUpIcon className="h-5 w-5" />
                            ) : (
                              <ChevronDownIcon className="h-5 w-5" />
                            )}
                            {expandedProduct === product.id
                              ? "Thu gọn"
                              : "Xem thêm"}
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Expanded View */}
                    <AnimatePresence>
                      {expandedProduct === product.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden bg-gray-50 border-t border-gray-100"
                        >
                          <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                              <h4 className="text-sm font-medium text-gray-700 mb-2">
                                Thông tin chi tiết
                              </h4>
                              <dl className="space-y-2 text-sm">
                                <div className="flex">
                                  <dt className="w-1/3 text-gray-500">
                                    Tạo ngày:
                                  </dt>
                                  <dd>
                                    {new Date(
                                      product.createdAt || Date.now()
                                    ).toLocaleDateString("vi-VN")}
                                  </dd>
                                </div>
                                <div className="flex">
                                  <dt className="w-1/3 text-gray-500">
                                    Cập nhật:
                                  </dt>
                                  <dd>
                                    {new Date(
                                      product.updatedAt || Date.now()
                                    ).toLocaleDateString("vi-VN")}
                                  </dd>
                                </div>
                                <div className="flex">
                                  <dt className="w-1/3 text-gray-500">
                                    Tổng số lượng:
                                  </dt>
                                  <dd className="font-medium">
                                    {getSizeStock(product.size)}
                                  </dd>
                                </div>
                              </dl>
                            </div>

                            <div>
                              <h4 className="text-sm font-medium text-gray-700 mb-2">
                                Hình ảnh sản phẩm
                              </h4>
                              <div className="flex gap-2 overflow-x-auto pb-2">
                                {product.images && product.images.length > 0 ? (
                                  product.images.map((image, idx) => (
                                    <img
                                      key={idx}
                                      src={image.url}
                                      alt={`${product.name} - ${idx}`}
                                      className="h-16 w-16 object-cover rounded-md shadow-sm flex-shrink-0"
                                    />
                                  ))
                                ) : (
                                  <div className="text-gray-400 text-sm">
                                    Không có hình ảnh
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="h-24 w-24 text-gray-300 mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M20 7l-8-4-8 4m16 0v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Không có sản phẩm nào
                  </h3>
                  <p className="text-gray-500 mt-1">
                    Hãy thêm sản phẩm mới để bắt đầu quản lý kho hàng
                  </p>
                  <Button
                    className="mt-4 flex items-center gap-2"
                    onClick={() => navigate("/admin/product/add")}
                  >
                    <PlusCircleIcon className="h-5 w-5" />
                    Thêm sản phẩm
                  </Button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </div>

      {/* Pagination */}
      {!isLoading && products.length > 0 && (
        <div className="flex justify-between items-center pt-4">
          <Paginator
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default ProductList;
