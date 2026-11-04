import { FaGithub } from "react-icons/fa";
import vietnamFlag from "@/assets/vietnam-flag.jpg";

const QUICK_LINKS = [
  { href: "/", label: "Trang chủ" },
  { href: "/shop", label: "Cửa hàng" },
  { href: "/about", label: "Về chúng tôi" },
];

/**
 * Footer — full-bleed dark band closing the light/dark section rhythm.
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-night text-white">
      <div className="page-container py-16 sm:py-20">
        {/* Manifesto line */}
        <p className="font-display max-w-3xl text-[40px] text-white sm:text-5xl">
          Chất lượng trong từng chi tiết —
        </p>

        <div className="mt-12 grid grid-cols-1 gap-10 border-t border-white/15 pt-10 md:grid-cols-3">
          {/* Company info */}
          <div className="flex flex-col gap-4">
            <h3 className="eyebrow text-white/60">Về chúng tôi</h3>
            <p className="max-w-sm text-sm leading-relaxed text-white/80">
              Chúng tôi là một công ty chuyên cung cấp các sản phẩm chất lượng
              cao với dịch vụ khách hàng tốt nhất. Chúng tôi cam kết mang đến
              cho bạn trải nghiệm mua sắm tuyệt vời nhất.
            </p>
            <a
              href="https://github.com/anhnhv2503"
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit text-white/80 transition-colors hover:text-brand-orange"
              aria-label="GitHub"
            >
              <FaGithub size={20} />
            </a>
          </div>

          {/* Quick links */}
          <div className="flex flex-col gap-4">
            <h3 className="eyebrow text-white/60">Đường dẫn nhanh</h3>
            <ul className="space-y-3">
              {QUICK_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="font-label text-base text-white transition-colors hover:text-brand-orange"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="eyebrow text-white/60">Liên hệ</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>Email: prjonlineshop@gmail.com</li>
              <li>
                SĐT: <span className="font-mono">+84 976 652 503</span>
              </li>
              <li className="flex items-center gap-3">
                Địa Chỉ: Ho Chi Minh City, Vietnam
                <img
                  src={vietnamFlag}
                  alt="I am Vietnamese"
                  className="h-5 w-7 rounded-sm object-cover"
                />
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 flex flex-col justify-between gap-2 border-t border-white/15 pt-6 md:flex-row md:items-center">
          <p className="text-sm text-white/60">
            &copy; {currentYear} Dự án được thực hiện lại bởi{" "}
            <a
              href="https://github.com/anhnhv2503"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-orange transition-opacity hover:opacity-85"
            >
              VietAnh253
            </a>
          </p>
          <p className="font-mono text-xs text-white/40">VA SHOP</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
