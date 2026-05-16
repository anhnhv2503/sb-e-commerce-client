import DotsLoading from "@/components/common/DotsLoading";
import ProductItem from "@/components/products/ProductItem";
import { getNewArrivals } from "@/components/service/ApiFunctions";
import { motion } from "framer-motion";
import { ArrowRight, Flame } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

/**
 * NewArrivals
 * Redesigned section header with display typography, animated entrance, and View All CTA.
 * Data fetching logic is unchanged from the original implementation.
 */
const NewArrivals = () => {
  const [newProducts, setNewProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await getNewArrivals();
        setNewProducts(response.data?.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(true);
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section
      aria-label="New arrivals"
      className="w-full bg-gray-50 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12"
        >
          <div>
            {/* Badge */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3B82F6]/10 text-[#3B82F6] text-xs font-semibold uppercase tracking-widest mb-3 font-mono">
              <Flame size={12} aria-hidden="true" />
              Mới Nhất
            </span>

            {/* Heading – Limelight display font (SKILL.md) */}
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111827] leading-tight">
              Sản Phẩm Mới Về
            </h2>
            <p className="mt-2 text-gray-500 text-sm sm:text-base max-w-md">
              Những mẫu mới nhất vừa được cập nhật — nhanh tay trước khi hết hàng.
            </p>
          </div>

          {/* View all CTA */}
          <motion.button
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/shop")}
            id="new-arrivals-view-all"
            aria-label="View all products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#3B82F6] hover:text-[#2563EB] transition-colors flex-shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6]"
          >
            Xem Tất Cả
            <ArrowRight size={16} aria-hidden="true" />
          </motion.button>
        </motion.div>

        {/* ── Product grid ── */}
        <h3 className="sr-only">Danh sách sản phẩm mới</h3>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <DotsLoading />
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {newProducts.map((product) => (
              <motion.div key={product.id} variants={cardVariants}>
                <ProductItem product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default NewArrivals;
