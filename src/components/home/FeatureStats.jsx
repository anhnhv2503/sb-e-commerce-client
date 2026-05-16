import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

/**
 * FeatureStats
 * Animated counter bar — fires once when scrolled into view.
 * SKILL.md: purposeful motion, semantic HTML, accessible labels.
 */

const STATS = [
  { id: "stat-products", value: 1200, suffix: "+", label: "Sản Phẩm", description: "Đa dạng mẫu mã" },
  { id: "stat-customers", value: 15000, suffix: "+", label: "Khách Hàng", description: "Tin tưởng & yêu thích" },
  { id: "stat-orders", value: 48000, suffix: "+", label: "Đơn Hàng", description: "Đã giao thành công" },
  { id: "stat-brands", value: 50, suffix: "+", label: "Thương Hiệu", description: "Nổi tiếng trong nước & quốc tế" },
];

const FeatureStats = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section
      ref={ref}
      aria-label="Store statistics"
      className="w-full bg-[#111827] py-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="font-mono text-xs uppercase tracking-widest text-[#3B82F6] mb-3">
            Con Số Nói Lên Tất Cả
          </p>
          <h2 className="font-display text-3xl sm:text-4xl text-white leading-tight">
            Được Tin Tưởng Bởi Hàng Nghìn Người
          </h2>
        </div>

        {/* Stats grid */}
        <dl
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden"
        >
          {STATS.map(({ id, value, suffix, label, description }) => (
            <div
              key={id}
              id={id}
              className="flex flex-col items-center justify-center gap-1 bg-[#111827] py-10 px-4 text-center group hover:bg-[#1a2235] transition-colors"
            >
              <dt className="text-sm text-gray-400 font-medium">{label}</dt>
              <dd
                aria-label={`${value}${suffix} ${label}`}
                className="font-display text-4xl sm:text-5xl font-bold text-white group-hover:text-[#3B82F6] transition-colors"
              >
                {inView ? (
                  <CountUp
                    end={value}
                    duration={2.4}
                    separator=","
                    suffix={suffix}
                    useEasing
                  />
                ) : (
                  `0${suffix}`
                )}
              </dd>
              <p className="text-xs text-gray-500 mt-1">{description}</p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default FeatureStats;
