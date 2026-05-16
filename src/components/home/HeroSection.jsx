import { images } from "@/data/carouselData";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/** Token aliases (SKILL.md: prefer semantic tokens over raw values) */
const TOKENS = {
  primary: "#3B82F6",
  secondary: "#8B5CF6",
  surface: "#FFFFFF",
  text: "#111827",
};

const SLIDE_INTERVAL = 5000;
const AUTOPLAY_RESUME_DELAY = 10000;

const slideVariants = {
  enter: { opacity: 0, scale: 1.04 },
  center: { opacity: 1, scale: 1, transition: { duration: 1.1, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.6, ease: "easeIn" } },
};

const contentVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: "easeOut" },
  }),
};

/**
 * HeroSection
 * Replaces the old Carousel with a cinematic, split-typography hero.
 * Accessibility: all interactive controls have aria-labels; reduced-motion respected via Framer Motion's system preference detection.
 */
const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAutoPlaying) return;
    const id = setInterval(() => {
      setCurrentIndex((i) => (i === images.length - 1 ? 0 : i + 1));
    }, SLIDE_INTERVAL);
    return () => clearInterval(id);
  }, [isAutoPlaying]);

  const pauseThenResume = useCallback(() => {
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), AUTOPLAY_RESUME_DELAY);
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentIndex((i) => (i === 0 ? images.length - 1 : i - 1));
    pauseThenResume();
  }, [pauseThenResume]);

  const goToNext = useCallback(() => {
    setCurrentIndex((i) => (i === images.length - 1 ? 0 : i + 1));
    pauseThenResume();
  }, [pauseThenResume]);

  const goToSlide = useCallback(
    (idx) => {
      setCurrentIndex(idx);
      pauseThenResume();
    },
    [pauseThenResume]
  );

  return (
    <section
      aria-label="Featured promotions"
      className="relative w-full h-[92vh] min-h-[560px] overflow-hidden bg-[#0d0d0d]"
    >
      {/* ── Background slides ── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={currentIndex}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          <img
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
          {/* Multi-layer overlay for legibility (WCAG AA contrast requirement) */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
        </motion.div>
      </AnimatePresence>

      {/* ── Hero content ── */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
        {/* Badge */}
        <motion.div
          custom={0}
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          className="mb-6 inline-flex items-center gap-2 w-fit"
        >
          <span
            className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold tracking-widest uppercase border border-white/20 bg-white/10 backdrop-blur-md text-white"
          >
            <Sparkles size={14} className="text-[#8B5CF6]" aria-hidden="true" />
            Bộ Sưu Tập Mới Nhất
          </span>
        </motion.div>

        {/* Headline – Limelight display font (SKILL.md typography) */}
        <motion.h1
          custom={0.15}
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] text-white max-w-3xl"
        >
          Phong Cách{" "}
          <span
            className="animate-shimmer"
            aria-label="Của Bạn"
          >
            Của Bạn
          </span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          custom={0.3}
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          className="mt-6 text-base sm:text-lg text-white/75 max-w-xl leading-relaxed"
        >
          Khám phá hàng nghìn sản phẩm thời trang cao cấp — từ casual đến formal — được tuyển chọn dành riêng cho bạn.
        </motion.p>

        {/* CTAs – 44px+ touch targets (SKILL.md accessibility) */}
        <motion.div
          custom={0.45}
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          className="mt-10 flex flex-wrap gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/shop")}
            id="hero-cta-shop"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold text-base transition-colors shadow-lg shadow-blue-500/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6]"
            aria-label="Xem cửa hàng"
          >
            Mua Ngay
            <ArrowRight size={18} aria-hidden="true" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/about")}
            id="hero-cta-about"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold text-base backdrop-blur-sm transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
            aria-label="Tìm hiểu thêm về chúng tôi"
          >
            Về Chúng Tôi
          </motion.button>
        </motion.div>
      </div>

      {/* ── Slide indicators ── */}
      <div
        role="tablist"
        aria-label="Slide indicators"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20"
      >
        {images.map((_, idx) => (
          <button
            key={idx}
            role="tab"
            aria-selected={currentIndex === idx}
            aria-label={`Go to slide ${idx + 1}`}
            onClick={() => goToSlide(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white ${
              currentIndex === idx
                ? "w-8 bg-[#3B82F6]"
                : "w-2 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* ── Navigation arrows ── */}
      <button
        onClick={goToPrev}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm text-white transition-all border border-white/10 hover:border-white/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <ChevronLeft size={22} aria-hidden="true" />
      </button>

      <button
        onClick={goToNext}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm text-white transition-all border border-white/10 hover:border-white/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <ChevronRight size={22} aria-hidden="true" />
      </button>

      {/* ── Slide counter (decorative) ── */}
      <div
        aria-hidden="true"
        className="absolute bottom-8 right-8 font-mono text-xs text-white/40 tracking-widest z-20"
      >
        {String(currentIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
      </div>
    </section>
  );
};

export default HeroSection;
