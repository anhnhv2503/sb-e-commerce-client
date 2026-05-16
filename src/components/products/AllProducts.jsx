import Paginator from "@/components/common/Paginator";
import AllProductsBreadcrumb from "@/components/products/AllProductsBreadcrumb";
import ProductItem from "@/components/products/ProductItem";
import SideAccordion from "@/components/products/SideAccordion";
import { Skeleton } from "@/components/ui/skeleton";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { motion } from "framer-motion";
import { SlidersHorizontal, Store } from "lucide-react";
import { useEffect, useState } from "react";
import { getProducts } from "../service/ApiFunctions";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

/**
 * AllProducts
 * Redesigned shop page with responsive sidebar, grid skeleton loading, and consistent header.
 */
const AllProducts = () => {
  useDocumentTitle("Cửa Hàng — VA Shop");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const size = 9;

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await getProducts(currentPage, size);
      setProducts(response.data?.content);
      setTotalPages(response.data?.page?.totalPages);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(true);
      console.log(error);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section aria-label="All products" className="bg-gray-50 min-h-screen">
      {/* ── Header ── */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <AllProductsBreadcrumb />
          <div className="mt-4 flex items-center justify-between">
            <div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#111827] flex items-center gap-3">
                <Store size={28} className="text-[#3B82F6]" aria-hidden="true" />
                Cửa Hàng
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Khám phá bộ sưu tập thời trang đa dạng
              </p>
            </div>

            {/* Mobile filter toggle */}
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-sm font-medium text-[#111827] hover:bg-gray-50 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3B82F6]"
              aria-label="Toggle filters"
            >
              <SlidersHorizontal size={16} aria-hidden="true" />
              Lọc
            </button>
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar - desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0" aria-label="Product filters">
            <div className="sticky top-24">
              <SideAccordion />
            </div>
          </aside>

          {/* Sidebar - mobile overlay */}
          {showMobileFilters && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="fixed inset-0 z-40 lg:hidden"
            >
              <div
                className="absolute inset-0 bg-black/20 backdrop-blur-sm"
                onClick={() => setShowMobileFilters(false)}
              />
              <div className="absolute left-0 top-0 h-full w-72 bg-gray-50 p-6 shadow-xl overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-[#111827]">Bộ Lọc</h3>
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors text-sm"
                    aria-label="Close filters"
                  >
                    Đóng
                  </button>
                </div>
                <SideAccordion />
              </div>
            </motion.div>
          )}

          {/* Main grid */}
          <main className="flex-1 min-w-0">
            <h2 className="sr-only">Danh sách sản phẩm</h2>

            {isLoading ? (
              /* Skeleton grid */
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: size }).map((_, i) => (
                  <div key={i} className="space-y-3">
                    <Skeleton className="aspect-[3/4] w-full rounded-lg" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-5 w-1/3" />
                  </div>
                ))}
              </div>
            ) : (
              <>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"
                >
                  {products.map((product) => (
                    <motion.div key={product.id} variants={cardVariants}>
                      <ProductItem product={product} />
                    </motion.div>
                  ))}
                </motion.div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12 flex justify-center">
                    <Paginator
                      totalPages={totalPages}
                      currentPage={currentPage}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </section>
  );
};

export default AllProducts;
