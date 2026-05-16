import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

/**
 * CategoryStrip
 * Horizontally scrollable row of category pills with hover lift animation.
 * SKILL.md: visual hierarchy, 44px+ touch targets, no low-contrast text.
 */

const CATEGORIES = [
  { id: "ao-thun", label: "Áo Thun", emoji: "👕" },
  { id: "quan-jeans", label: "Quần Jeans", emoji: "👖" },
  { id: "ao-khoac", label: "Áo Khoác", emoji: "🧥" },
  { id: "vay-dam", label: "Váy & Đầm", emoji: "👗" },
  { id: "phu-kien", label: "Phụ Kiện", emoji: "🧢" },
  { id: "giay-dep", label: "Giày & Dép", emoji: "👟" },
  { id: "ao-so-mi", label: "Áo Sơ Mi", emoji: "👔" },
  { id: "do-the-thao", label: "Đồ Thể Thao", emoji: "🏃" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07 },
  },
};

const pillVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const CategoryStrip = () => {
  const navigate = useNavigate();

  return (
    <section
      aria-label="Product categories"
      className="w-full bg-white border-b border-gray-100 py-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-5 font-mono">
          Danh Mục
        </p>

        {/* Scrollable pill row */}
        <motion.div
          role="list"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide"
          style={{ scrollbarWidth: "none" }}
        >
          {CATEGORIES.map(({ id, label, emoji }) => (
            <motion.button
              key={id}
              role="listitem"
              variants={pillVariants}
              whileHover={{ y: -3, boxShadow: "0 6px 20px rgba(59,130,246,0.18)" }}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate("/shop")}
              id={`category-pill-${id}`}
              aria-label={`Browse ${label}`}
              className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gray-50 hover:bg-[#3B82F6] hover:text-white text-gray-700 text-sm font-medium border border-gray-200 hover:border-[#3B82F6] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6]"
            >
              <span aria-hidden="true" className="text-base">{emoji}</span>
              {label}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CategoryStrip;
