import DotsLoading from "@/components/common/DotsLoading";
import ProductItem from "@/components/products/ProductItem";
import { getProductsByCategory } from "@/components/service/ApiFunctions";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

const RelatedProducts = ({ categoryId }) => {
  const scrollRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const { ref: sectionRef, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.firstElementChild?.offsetWidth || 220;
    const gap = 24; // gap-x-6
    const scrollAmount = cardWidth + gap;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });

    // Update scroll button states after scrolling
    setTimeout(checkScrollPosition, 300);
  };

  const checkScrollPosition = () => {
    if (!scrollRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  const fetchRelatedProducts = async () => {
    setIsLoading(true);
    try {
      const response = await getProductsByCategory(categoryId);
      setProducts(response.data?.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRelatedProducts();
  }, [categoryId]);

  useEffect(() => {
    if (products.length > 0) {
      checkScrollPosition();
      window.addEventListener("resize", checkScrollPosition);
    }

    return () => window.removeEventListener("resize", checkScrollPosition);
  }, [products]);

  if (isLoading) {
    return <DotsLoading />;
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <motion.div
      ref={sectionRef}
      className="relative w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-10 flex items-end justify-between gap-4">
        <div>
          <p className="eyebrow mb-3 text-brand-pink">Có thể bạn thích</p>
          <h2 className="display-heading">Sản phẩm liên quan —</h2>
        </div>
        <div className="flex flex-shrink-0 gap-2">
          <button
            type="button"
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            aria-label="Cuộn trái"
            className="flex h-10 w-10 items-center justify-center rounded border border-[#cccfcd] text-brand-ink transition-colors hover:border-brand-ink disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft size={20} strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            aria-label="Cuộn phải"
            className="flex h-10 w-10 items-center justify-center rounded border border-[#cccfcd] text-brand-ink transition-colors hover:border-brand-ink disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight size={20} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="hide-scrollbar flex snap-x gap-x-6 overflow-x-auto scroll-smooth pb-2"
        onScroll={checkScrollPosition}
      >
        {products.map((product, index) => (
          <div key={index} className="w-[220px] flex-shrink-0 snap-start sm:w-[260px]">
            <ProductItem product={product} />
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default RelatedProducts;
