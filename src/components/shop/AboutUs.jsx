import vneseDev from "@/assets/vneseDev.png";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { motion } from "framer-motion";
import { ArrowRight, Linkedin, Mail } from "lucide-react";
import toast from "react-hot-toast";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80";

const VALUES = [
  {
    index: "01",
    title: "Sản Phẩm Chất Lượng",
    accent: "text-brand-orange",
    body: "Chúng tôi tạo ra những sản phẩm đặc biệt kết hợp giữa sự đổi mới với độ tin cậy, đảm bảo khách hàng nhận được giải pháp vượt qua mong đợi trong khi vẫn dễ dàng tiếp cận.",
  },
  {
    index: "02",
    title: "Phát Triển Bền Vững",
    accent: "text-brand-pink",
    body: "Tính bền vững tạo thành nền tảng cho cách tiếp cận của chúng tôi, hướng dẫn mọi thứ từ nguồn vật liệu có trách nhiệm đến sản xuất thân thiện với môi trường.",
  },
];

const TEAM = [
  {
    name: "Johnny Nguyen",
    role: "CEO & Founder",
    bio: "Lãnh đạo có tầm nhìn với hơn 10 năm kinh nghiệm trong ngành",
  },
  {
    name: "Nguyen Ha Viet Anh",
    role: "Chief Technology Officer",
    bio: "Chuyên gia công nghệ tập trung vào các giải pháp đổi mới",
  },
  {
    name: "Viet Anh Nguyen Ha",
    role: "Head of Marketing",
    bio: "Chiến lược gia sáng tạo thúc đẩy tăng trưởng thương hiệu",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

/**
 * AboutUs — editorial page: split hero, manifesto, values, team.
 */
const AboutUs = () => {
  useDocumentTitle("Giới thiệu về chúng tôi — VA Shop");

  const handleContactUs = () => {
    toast.success("Cảm ơn bạn! Chúng tôi sẽ liên hệ lại sớm nhất.");
  };

  return (
    <div className="bg-white">
      {/* ── Split hero ── */}
      <section className="grid bg-brand-night lg:min-h-[600px] lg:grid-cols-2">
        <div className="flex items-center px-4 py-16 sm:px-12 lg:px-16 lg:py-20 xl:px-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-xl"
          >
            <p className="eyebrow mb-4 text-brand-orange">Về Chúng Tôi</p>
            <h1 className="font-display text-5xl text-white sm:text-6xl xl:text-[80px]">
              Câu chuyện{" "}
              <span className="text-brand-orange">của chúng tôi</span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/80">
              Chúng tôi đam mê cung cấp các sản phẩm và trải nghiệm đặc biệt
              giúp thay đổi cách khách hàng đạt được mục tiêu của họ trong kỷ
              nguyên số.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <button className="btn btn-light" onClick={handleContactUs}>
                Liên Hệ Ngay
                <ArrowRight size={18} aria-hidden="true" />
              </button>
              <button className="btn btn-outline-light">
                Dự Án Của Chúng Tôi
              </button>
            </div>
          </motion.div>
        </div>
        <div className="relative aspect-[4/3] sm:aspect-[16/9] lg:aspect-auto">
          <img
            src={HERO_IMAGE}
            alt="Đội ngũ VA Shop làm việc cùng nhau"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </section>

      {/* ── Manifesto ── */}
      <section className="page-container py-20 sm:py-24">
        <motion.div {...fadeUp} transition={{ duration: 0.7 }} className="max-w-4xl">
          <p className="eyebrow mb-6 text-brand-blue">Mục Đích Cốt Lõi</p>
          <h2 className="font-display text-[40px] text-brand-ink sm:text-5xl lg:text-[64px]">
            Sứ mệnh của VA Shop — giúp mỗi người phát huy hết tiềm năng của
            mình.
          </h2>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-[#606562]">
            Cung cấp các giải pháp sáng tạo và bền vững giúp cá nhân và tổ chức
            phát huy hết tiềm năng của mình trong bối cảnh thay đổi nhanh chóng
            hiện nay.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 border-t border-hairline md:grid-cols-2">
          {VALUES.map((value, i) => (
            <motion.article
              key={value.index}
              {...fadeUp}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`py-10 md:py-12 ${
                i === 0
                  ? "border-b border-hairline md:border-b-0 md:border-r md:pr-12"
                  : "md:pl-12"
              }`}
            >
              <p className={`font-mono text-sm ${value.accent}`}>
                {value.index}
              </p>
              <h3 className="font-label mt-4 text-2xl text-brand-ink">
                {value.title}
              </h3>
              <p className="mt-4 max-w-md text-base leading-relaxed text-[#606562]">
                {value.body}
              </p>
              <button className="btn btn-ghost mt-6">
                Tìm Hiểu Thêm
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            </motion.article>
          ))}
        </div>
      </section>

      {/* ── Team ── */}
      <section className="border-t border-hairline">
        <div className="page-container py-20 sm:py-24">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.7 }}
            className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
          >
            <div>
              <p className="eyebrow mb-4 text-brand-blue">Thành Viên Nòng Cốt</p>
              <h2 className="display-heading lg:text-[64px]">
                Đội ngũ của chúng tôi —
              </h2>
            </div>
            <p className="max-w-md text-base leading-relaxed text-[#606562]">
              Một nhóm chuyên gia đa dạng, đoàn kết với nhau bởi niềm đam mê đổi
              mới và cam kết hướng đến sự xuất sắc.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((member, index) => (
              <motion.article
                key={member.name}
                {...fadeUp}
                transition={{ duration: 0.6, delay: index * 0.12 }}
              >
                <div className="aspect-[4/5] overflow-hidden rounded-lg bg-brand-mist">
                  <img
                    src={vneseDev}
                    alt={member.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <p className="eyebrow mt-5 text-xs text-brand-pink">
                  {member.role}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-brand-ink">
                  {member.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#606562]">
                  {member.bio}
                </p>
                <div className="mt-4 flex gap-1">
                  <button
                    className="icon-btn -ml-2"
                    aria-label={`LinkedIn của ${member.name}`}
                  >
                    <Linkedin size={18} strokeWidth={1.5} />
                  </button>
                  <button
                    className="icon-btn"
                    aria-label={`Email ${member.name}`}
                  >
                    <Mail size={18} strokeWidth={1.5} />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
