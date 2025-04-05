import DotsLoading from "@/components/common/DotsLoading";
import ProductItem from "@/components/products/ProductItem";
import { getProductsByCategory } from "@/components/service/ApiFunctions";
import { Button } from "@/components/ui/button";
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
    const cardWidth = 220; // match min-w
    const gap = 16; // Tailwind gap-x-4 is 1rem = 16px
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
      className="relative w-full my-8 px-1"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Sản phẩm liên quan</h2>
        <div className="space-x-2">
          <Button
            size="icon"
            variant="outline"
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={!canScrollLeft ? "opacity-50 cursor-not-allowed" : ""}
          >
            <ChevronLeft />
          </Button>
          <Button
            size="icon"
            variant="outline"
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={!canScrollRight ? "opacity-50 cursor-not-allowed" : ""}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-x-4 scroll-smooth pb-4 hide-scrollbar snap-x"
        onScroll={checkScrollPosition}
      >
        {products.map((product, index) => (
          <div key={index} className="snap-start min-w-[220px]">
            <ProductItem product={product} />
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default RelatedProducts;
