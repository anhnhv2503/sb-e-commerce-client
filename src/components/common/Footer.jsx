import { FaGithub } from "react-icons/fa";
import vietnamFlag from "@/assets/vietnam-flag.jpg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Company Info */}
            <div className="flex flex-col space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Về chúng tôi
              </h3>
              <p className="text-gray-600 text-sm">
                Chúng tôi là một công ty chuyên cung cấp các sản phẩm chất lượng
                cao với dịch vụ khách hàng tốt nhất. Chúng tôi cam kết mang đến
                cho bạn trải nghiệm mua sắm tuyệt vời nhất.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/anhnhv2503"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-indigo-600 transition-colors"
                  aria-label="GitHub"
                >
                  <FaGithub size={20} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Đường dẫn nhanh
              </h3>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>
                  <a
                    href="/"
                    className="hover:text-indigo-600 transition-colors"
                  >
                    Trang chủ
                  </a>
                </li>
                <li>
                  <a
                    href="/shop"
                    className="hover:text-indigo-600 transition-colors"
                  >
                    Cửa hàng
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className="hover:text-indigo-600 transition-colors"
                  >
                    Về chúng tôi
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="flex flex-col space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Liên hệ</h3>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>Email: prjonlineshop@gmail.com</li>
                <li>SĐT: +84 976 652 503</li>
                <li>
                  Địa Chỉ: Ho Chi Minh City, Vietnam{" "}
                  <img
                    src={vietnamFlag}
                    alt="I am Vietnamese"
                    className="w-10 h-7"
                  />
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="mt-12 pt-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              &copy; {currentYear} Dự án được thực hiện lại bởi{" "}
              <a
                href="https://github.com/anhnhv2503"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-800 transition-colors font-medium"
              >
                VietAnh253
              </a>
            </p>
            <p className="text-gray-500 text-xs mt-2 md:mt-0"></p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
