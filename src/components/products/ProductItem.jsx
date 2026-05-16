import useCurrencyFormat from "@/components/hooks/useCurrencyFormat";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

/**
 * ProductItem
 * Redesigned product card with hover overlay, image zoom, and consistent token usage.
 * SKILL.md: 44px+ touch target (entire card), visible focus state, purposeful motion.
 */
const ProductItem = ({ product }) => {
  const navigate = useNavigate();
  const currency = useCurrencyFormat();

  return (
    <motion.div
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className="overflow-hidden cursor-pointer group h-full border border-gray-100 hover:border-[#3B82F6]/30 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3B82F6]"
        onClick={() => navigate(`/product/${product.id}`)}
        tabIndex={0}
        role="link"
        aria-label={`Xem chi tiết ${product.name}`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            navigate(`/product/${product.id}`);
          }
        }}
      >
        {/* Image container */}
        <div className="relative overflow-hidden bg-gray-50 aspect-[3/4]">
          <motion.img
            src={product.images[0].url}
            alt={`${product.name}`}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

          {/* Quick view badge */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/95 backdrop-blur-sm text-[#111827] text-xs font-semibold shadow-lg">
              <Eye size={14} aria-hidden="true" />
              Xem Nhanh
            </span>
          </div>

          {/* Category badge */}
          {product.category && (
            <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-semibold uppercase tracking-wider text-gray-600 border border-gray-200/50">
              {product.category.name}
            </span>
          )}
        </div>

        <CardContent className="p-4 space-y-1.5">
          <h3 className="text-sm font-medium text-[#111827] line-clamp-2 leading-snug group-hover:text-[#3B82F6] transition-colors">
            {product.name}
          </h3>
          <p className="text-lg font-bold text-[#111827]">
            {currency.format(product.price)}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductItem;
