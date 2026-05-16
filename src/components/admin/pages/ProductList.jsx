import DotsLoading from "@/components/common/DotsLoading";
import Paginator from "@/components/common/Paginator";
import useCurrencyFormat from "@/components/hooks/useCurrencyFormat";
import { getProducts } from "@/components/service/ApiFunctions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddMoreSize from "./AddMoreSize";
import {
  Box,
  ChevronDown,
  ChevronUp,
  Eye,
  Image as ImageIcon,
  PackageSearch,
  Pencil,
  PlusCircle,
  Tag,
} from "lucide-react";

/**
 * ProductList Page
 * Redesigned to match SKILL.md artistic design system
 */
const ProductList = () => {
  useDocumentTitle("Kho Hàng — VA Shop Admin");
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedProduct, setExpandedProduct] = useState(null);
  const [pageSize, setPageSize] = useState(5);
  const navigate = useNavigate();
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleProductExpand = (id) => {
    setExpandedProduct(expandedProduct === id ? null : id);
  };

  const getSizeStock = (sizes) => {
    if (!sizes || sizes.length === 0) return 0;
    return sizes.reduce((total, size) => total + (size.quantity || 0), 0);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-6xl mx-auto space-y-6 pb-12"
    >
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-[#111827] flex items-center gap-3">
            <Box size={28} className="text-[#3B82F6]" />
            Kho Hàng
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Quản lý thông tin, tồn kho và cập nhật sản phẩm
          </p>
        </div>
        <Link to="/admin/product/add" tabIndex={-1}>
          <Button className="h-11 px-5 bg-[#3B82F6] hover:bg-[#2563EB] text-white shadow-md shadow-blue-500/20 flex items-center gap-2 rounded-lg font-semibold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6]">
            <PlusCircle size={18} />
            Thêm Sản Phẩm
          </Button>
        </Link>
      </div>

      {/* Products List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center items-center py-40">
            <DotsLoading />
          </div>
        ) : (
          <>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="divide-y divide-gray-100"
            >
              {products.length > 0 ? (
                products.map((product) => (
                  <motion.div
                    key={product.id}
                    variants={itemVariants}
                    className="group hover:bg-gray-50 transition-colors duration-300"
                  >
                    <div className="flex flex-col sm:flex-row p-6 gap-6 sm:gap-8">
                      {/* Product Image */}
                      <div className="relative flex-shrink-0 w-full sm:w-40 h-48 sm:h-auto rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                        <img
                          src={
                            product.images?.[0]?.url ||
                            "https://via.placeholder.com/150"
                          }
                          alt={product.name}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-grow flex flex-col justify-between space-y-4">
                        <div>
                          <div className="flex flex-col xl:flex-row xl:justify-between xl:items-start gap-2 mb-2">
                            <div>
                              <div className="flex flex-wrap items-center gap-2 mb-2">
                                {product.category && (
                                  <Badge className="bg-blue-50 text-[#3B82F6] hover:bg-blue-100 border-none rounded uppercase tracking-widest text-[10px] font-bold">
                                    {product.category?.name}
                                  </Badge>
                                )}
                                {product.brand && (
                                  <Badge variant="outline" className="text-gray-500 border-gray-200 rounded uppercase tracking-widest text-[10px] font-bold">
                                    {product.brand}
                                  </Badge>
                                )}
                              </div>
                              <h3 className="text-xl font-bold text-[#111827] line-clamp-1 group-hover:text-[#3B82F6] transition-colors">
                                {product.name}
                              </h3>
                            </div>
                            <div className="text-2xl font-black text-[#111827] xl:text-right shrink-0">
                              {currency.format(product.price)}
                            </div>
                          </div>

                          <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
                            {product.description || "Chưa có mô tả chi tiết."}
                          </p>

                          {/* Sizes / Inventory */}
                          <div className="mt-4 flex flex-wrap items-center gap-2">
                            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider font-mono mr-1">
                              Kho:
                            </span>
                            {product.size && product.size.length > 0 ? (
                              product.size.map((sizeItem, idx) => {
                                const isOutOfStock = sizeItem.quantity <= 0;
                                return (
                                  <div
                                    key={idx}
                                    className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-mono font-medium border ${
                                      isOutOfStock
                                        ? "bg-red-50 text-red-600 border-red-200"
                                        : "bg-gray-50 text-[#111827] border-gray-200"
                                    }`}
                                  >
                                    <span className="font-bold">Size {sizeItem.sizeName}</span>
                                    <span className="text-gray-400">|</span>
                                    <span>{sizeItem.quantity}</span>
                                  </div>
                                );
                              })
                            ) : (
                              <span className="text-xs text-red-500 italic">Chưa có dữ liệu size</span>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap items-center gap-3 justify-between pt-2">
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-9 px-3 border-gray-200 text-gray-600 hover:text-[#3B82F6] hover:border-blue-200 hover:bg-blue-50 rounded-lg flex items-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3B82F6]"
                            >
                              <Pencil size={14} />
                              <span className="hidden sm:inline font-semibold">Sửa</span>
                            </Button>

                            <Button
                              size="sm"
                              variant="outline"
                              className="h-9 px-3 border-gray-200 text-gray-600 hover:text-[#111827] hover:bg-gray-100 rounded-lg flex items-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3B82F6]"
                            >
                              <Eye size={14} />
                              <span className="hidden sm:inline font-semibold">Xem</span>
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
                            className={`h-9 px-3 rounded-lg flex items-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3B82F6] transition-colors ${
                              expandedProduct === product.id 
                                ? "bg-gray-100 text-[#111827]" 
                                : "text-gray-500 hover:text-[#111827] hover:bg-gray-100"
                            }`}
                          >
                            <span className="text-xs font-semibold uppercase tracking-wider font-mono">
                              {expandedProduct === product.id ? "Đóng Lại" : "Chi Tiết"}
                            </span>
                            {expandedProduct === product.id ? (
                              <ChevronUp size={16} />
                            ) : (
                              <ChevronDown size={16} />
                            )}
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
                          <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="space-y-4">
                              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider font-mono flex items-center gap-2">
                                <Tag size={14} /> Thông Tin Hệ Thống
                              </h4>
                              <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                                <dl className="space-y-3 text-sm">
                                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                                    <dt className="text-gray-500">Mã sản phẩm (ID)</dt>
                                    <dd className="font-mono font-medium text-[#111827]">#{product.id}</dd>
                                  </div>
                                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                                    <dt className="text-gray-500">Ngày tạo</dt>
                                    <dd className="font-medium text-[#111827]">
                                      {new Date(product.createdAt || Date.now()).toLocaleDateString("vi-VN")}
                                    </dd>
                                  </div>
                                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                                    <dt className="text-gray-500">Cập nhật lần cuối</dt>
                                    <dd className="font-medium text-[#111827]">
                                      {new Date(product.updatedAt || Date.now()).toLocaleDateString("vi-VN")}
                                    </dd>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <dt className="text-gray-500">Tổng tồn kho</dt>
                                    <dd className="font-bold text-[#3B82F6] text-lg">
                                      {getSizeStock(product.size)}
                                    </dd>
                                  </div>
                                </dl>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider font-mono flex items-center gap-2">
                                <ImageIcon size={14} /> Thư Viện Hình Ảnh
                              </h4>
                              <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                                {product.images && product.images.length > 0 ? (
                                  <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                                    {product.images.map((image, idx) => (
                                      <div key={idx} className="aspect-square rounded-lg border border-gray-200 overflow-hidden bg-gray-50">
                                        <img
                                          src={image.url}
                                          alt={`Ảnh ${idx + 1}`}
                                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                                        />
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <div className="flex flex-col items-center justify-center py-8 text-gray-400">
                                    <ImageIcon size={32} className="mb-2 opacity-50" />
                                    <span className="text-sm">Chưa có hình ảnh phụ</span>
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
                <div className="flex flex-col items-center justify-center py-32 px-4 text-center">
                  <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                    <PackageSearch size={40} className="text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-[#111827] mb-2">
                    Kho Hàng Trống
                  </h3>
                  <p className="text-gray-500 max-w-md mb-8">
                    Chưa có sản phẩm nào được thêm vào hệ thống. Hãy bắt đầu bằng việc thêm sản phẩm đầu tiên của bạn.
                  </p>
                  <Button
                    onClick={() => navigate("/admin/product/add")}
                    className="h-12 px-6 bg-[#3B82F6] hover:bg-[#2563EB] text-white shadow-md shadow-blue-500/20 rounded-xl font-semibold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6] flex items-center gap-2"
                  >
                    <PlusCircle size={20} />
                    Thêm Sản Phẩm Mới
                  </Button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </div>

      {/* Pagination */}
      {!isLoading && products.length > 0 && totalPages > 1 && (
        <div className="flex justify-center pt-6">
          <Paginator
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </motion.div>
  );
};

export default ProductList;
