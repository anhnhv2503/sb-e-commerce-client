import Paginator from "@/components/common/Paginator";
import AllProductsBreadcrumb from "@/components/products/AllProductsBreadcrumb";
import ProductItem from "@/components/products/ProductItem";
import SideAccordion from "@/components/products/SideAccordion";
import { Skeleton } from "@/components/ui/skeleton";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { motion } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import { useEffect, useState } from "react";
import { getProducts } from "../service/ApiFunctions";
import { useSearchParams } from "react-router-dom";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
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
  const [searchParams, setSearchParams] = useSearchParams();
  const brand = searchParams.get("brand");
  const category = searchParams.get("category");
  const [searchKey, setSearchKey] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [currentPage, brand, category]);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await getProducts(
        currentPage,
        size,
        category,
        brand,
        searchKey,
      );
      setProducts(response.data?.content);
      setTotalPages(response.data?.page?.totalPages);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(true);
      console.log(error);
    }
  };

  const activeFilters = [
    { key: "brand", label: "Thương hiệu", value: brand },
    { key: "category", label: "Thể loại", value: category },
  ].filter((f) => f.value);

  const clearFilter = (key) => {
    const params = new URLSearchParams(searchParams);
    if (key) params.delete(key);
    else ["brand", "category"].forEach((k) => params.delete(k));
    setSearchParams(params);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section aria-label="All products" className="min-h-screen bg-white">
      {/* ── Header ── */}
      <div className="border-b border-hairline">
        <div className="page-container pb-10 pt-8">
          <AllProductsBreadcrumb />
          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow mb-3 text-brand-pink">Bộ Sưu Tập</p>
              <h1 className="display-heading lg:text-[64px]">Cửa hàng —</h1>
              <p className="mt-4 text-base text-[#606562]">
                Khám phá bộ sưu tập thời trang đa dạng
              </p>
            </div>

            {/* Mobile filter toggle */}
            <button
              onClick={() => setShowMobileFilters(true)}
              className="chip self-start lg:hidden"
              aria-label="Toggle filters"
            >
              <SlidersHorizontal size={16} aria-hidden="true" />
              Lọc
            </button>
          </div>

          {/* Active filter chips */}
          {activeFilters.length > 0 && (
            <div className="mt-6 flex flex-wrap items-center gap-2">
              {activeFilters.map((f) => (
                <button
                  key={f.key}
                  onClick={() => clearFilter(f.key)}
                  className="chip chip-active"
                  aria-label={`Bỏ lọc ${f.label}: ${f.value}`}
                >
                  {f.value}
                  <X size={14} aria-hidden="true" />
                </button>
              ))}
              <button
                onClick={() => clearFilter()}
                className="btn btn-ghost btn-sm ml-2"
              >
                Xóa Bộ Lọc
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Content ── */}
      <div className="page-container py-10">
        <div className="flex gap-12">
          {/* Sidebar - desktop */}
          <aside
            className="hidden w-60 flex-shrink-0 lg:block"
            aria-label="Product filters"
          >
            <div className="sticky top-24">
              <SideAccordion />
            </div>
          </aside>

          {/* Sidebar - mobile overlay */}
          {showMobileFilters && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div
                className="absolute inset-0 bg-black/40"
                onClick={() => setShowMobileFilters(false)}
              />
              <motion.div
                initial={{ x: -24, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="absolute left-0 top-0 h-full w-80 max-w-[85vw] overflow-y-auto bg-white p-6"
              >
                <div className="mb-6 flex items-center justify-end">
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="icon-btn"
                    aria-label="Close filters"
                  >
                    <X size={22} strokeWidth={1.5} />
                  </button>
                </div>
                <SideAccordion />
              </motion.div>
            </div>
          )}

          {/* Main grid */}
          <main className="min-w-0 flex-1">
            <h2 className="sr-only">Danh sách sản phẩm</h2>

            {isLoading ? (
              <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 xl:grid-cols-3">
                {Array.from({ length: size }).map((_, i) => (
                  <div key={i} className="space-y-3">
                    <Skeleton className="aspect-[3/4] w-full rounded-lg" />
                    <Skeleton className="h-4 w-3/4 rounded" />
                    <Skeleton className="h-4 w-1/3 rounded" />
                  </div>
                ))}
              </div>
            ) : !products?.length ? (
              <div className="flex flex-col items-start gap-4 border-t border-hairline py-16">
                <p className="font-display text-[40px] text-brand-ink">
                  Không tìm thấy sản phẩm —
                </p>
                <p className="text-[#606562]">
                  Thử bỏ bớt bộ lọc để xem thêm sản phẩm.
                </p>
                {activeFilters.length > 0 && (
                  <button
                    onClick={() => clearFilter()}
                    className="btn btn-outline"
                  >
                    Xóa Bộ Lọc
                  </button>
                )}
              </div>
            ) : (
              <>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 xl:grid-cols-3"
                >
                  {products.map((product) => (
                    <motion.div key={product.id} variants={cardVariants}>
                      <ProductItem product={product} />
                    </motion.div>
                  ))}
                </motion.div>

                {totalPages > 1 && (
                  <div className="mt-16 border-t border-hairline pt-8">
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
