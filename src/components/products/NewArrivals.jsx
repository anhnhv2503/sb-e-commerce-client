import DotsLoading from "@/components/common/DotsLoading";
import ProductItem from "@/components/products/ProductItem";
import { getNewArrivals } from "@/components/service/ApiFunctions";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

/**
 * NewArrivals — product grid section on the white canvas.
 * Left-aligned display heading with an em-dash terminal, ghost "view all".
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
    <section aria-label="New arrivals" className="w-full bg-white py-16 sm:py-20">
      <div className="page-container">
        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10 flex flex-col gap-6 border-b border-hairline pb-8 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <span className="pill mb-4 bg-brand-blue px-3 py-1 text-white">
              Mới Nhất
            </span>
            <h2 className="display-heading lg:text-[64px]">
              Sản phẩm mới về —
            </h2>
            <p className="mt-4 max-w-md text-base text-[#606562]">
              Những mẫu mới nhất vừa được cập nhật — nhanh tay trước khi hết
              hàng.
            </p>
          </div>

          <button
            onClick={() => navigate("/shop")}
            id="new-arrivals-view-all"
            aria-label="View all products"
            className="btn btn-ghost flex-shrink-0 self-start text-brand-blue hover:text-brand-ink sm:self-auto"
          >
            Xem Tất Cả
            <ArrowRight size={16} aria-hidden="true" />
          </button>
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
            className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3 xl:grid-cols-4"
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
