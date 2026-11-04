import { images } from "@/data/carouselData";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SLIDE_INTERVAL = 5000;
const AUTOPLAY_RESUME_DELAY = 10000;

const slideVariants = {
  enter: { opacity: 0 },
  center: { opacity: 1, transition: { duration: 0.9, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.6, ease: "easeIn" } },
};

const contentVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: "easeOut" },
  }),
};

/**
 * HeroSection — editorial split panel.
 * Left: dark panel carrying eyebrow, display headline, subtext and CTAs.
 * Right: full-bleed image carousel, flush to the viewport edge.
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
    [pauseThenResume],
  );

  return (
    <section
      aria-label="Featured promotions"
      className="grid w-full bg-brand-night lg:min-h-[600px] lg:grid-cols-2"
    >
      {/* ── Text panel ── */}
      <div className="order-2 flex items-center px-4 py-16 sm:px-12 lg:order-1 lg:px-16 lg:py-20 xl:px-24">
        <div className="max-w-xl">
          <motion.p
            custom={0}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="eyebrow mb-4 text-brand-orange"
          >
            Bộ Sưu Tập Mới Nhất
          </motion.p>

          <motion.h1
            custom={0.15}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="font-display text-5xl text-white sm:text-6xl xl:text-[80px]"
          >
            Phong cách <span className="text-brand-pink">của bạn</span>
          </motion.h1>

          <motion.p
            custom={0.3}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="mt-6 max-w-md text-base leading-relaxed text-white/80"
          >
            Khám phá hàng nghìn sản phẩm thời trang cao cấp — từ casual đến formal
            — được tuyển chọn dành riêng cho bạn.
          </motion.p>

          <motion.div
            custom={0.45}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="mt-10 flex flex-wrap gap-3"
          >
            <button
              onClick={() => navigate("/shop")}
              id="hero-cta-shop"
              className="btn btn-primary"
              aria-label="Xem cửa hàng"
            >
              Mua Ngay
              <ArrowRight size={18} aria-hidden="true" />
            </button>
            <button
              onClick={() => navigate("/about")}
              id="hero-cta-about"
              className="btn btn-outline-light"
              aria-label="Tìm hiểu thêm về chúng tôi"
            >
              Về Chúng Tôi
            </button>
          </motion.div>
        </div>
      </div>

      {/* ── Image panel ── */}
      <div className="relative order-1 aspect-[4/3] overflow-hidden sm:aspect-[16/9] lg:order-2 lg:aspect-auto">
        <AnimatePresence mode="sync">
          <motion.img
            key={currentIndex}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            className="absolute inset-0 h-full w-full object-cover object-center"
            loading="eager"
          />
        </AnimatePresence>

        {/* Controls bar */}
        <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between gap-4 px-4 pb-4 sm:px-6 sm:pb-6">
          <div
            role="tablist"
            aria-label="Slide indicators"
            className="flex h-10 items-center gap-2 rounded-full bg-brand-night/70 px-4"
          >
            {images.map((_, idx) => (
              <button
                key={idx}
                role="tab"
                aria-selected={currentIndex === idx}
                aria-label={`Go to slide ${idx + 1}`}
                onClick={() => goToSlide(idx)}
                className={`h-2 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white ${
                  currentIndex === idx
                    ? "w-6 bg-brand-blue"
                    : "w-2 bg-white/60 hover:bg-white"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="mr-1 flex h-10 items-center rounded bg-brand-night px-3 font-mono text-sm text-white"
            >
              {String(currentIndex + 1).padStart(2, "0")} /{" "}
              {String(images.length).padStart(2, "0")}
            </span>
            <button
              onClick={goToPrev}
              aria-label="Previous slide"
              className="flex h-10 w-10 items-center justify-center rounded bg-white text-brand-ink transition-opacity hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <ChevronLeft size={20} strokeWidth={1.5} aria-hidden="true" />
            </button>
            <button
              onClick={goToNext}
              aria-label="Next slide"
              className="flex h-10 w-10 items-center justify-center rounded bg-white text-brand-ink transition-opacity hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <ChevronRight size={20} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
