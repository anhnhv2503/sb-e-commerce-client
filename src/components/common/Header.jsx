import CartIcon from "@/components/common/CartIcon";
import UserPopover from "@/components/common/UserPopover";
import { Transition } from "@headlessui/react";
import { Menu as MenuIcon, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import newLogo from "../../assets/logo.png";

const NAV_LINKS = [
  { path: "/", label: "Trang Chủ" },
  { path: "/shop", label: "Cửa Hàng" },
  { path: "/about", label: "Về Chúng Tôi" },
];

const ANNOUNCEMENTS = [
  "Miễn phí giao hàng",
  "Đổi trả miễn phí",
  "Bảo hành 12 tháng",
];

/**
 * Header
 * Announcement strip + flat white nav bar with hairline bottom border.
 * Labels use the condensed uppercase label face; the active link is marked
 * with the brand pink and an underline rule instead of a filled box.
 */
const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  const token = localStorage.getItem("accessToken");

  const go = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* ── Announcement bar ── */}
      <div className="bg-brand-night text-white">
        <div className="page-container flex h-8 items-center justify-center gap-6 overflow-hidden">
          {ANNOUNCEMENTS.map((text, i) => (
            <span
              key={text}
              className={`eyebrow whitespace-nowrap text-xs ${
                i > 0 ? "hidden sm:inline" : ""
              }`}
            >
              {text}
            </span>
          ))}
        </div>
      </div>

      <header className="sticky top-0 z-50 w-full border-b border-hairline bg-white">
        <nav className="page-container flex h-16 items-center justify-between gap-6">
          {/* Logo */}
          <button
            onClick={() => navigate("/")}
            className="flex flex-shrink-0 items-center rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue"
            aria-label="Trang chủ VA Shop"
          >
            <img src={newLogo} alt="VA Shop Logo" className="h-10 w-auto" />
          </button>

          {/* Desktop navigation */}
          <div className="hidden flex-1 items-center gap-8 md:flex lg:pl-8">
            {NAV_LINKS.map(({ path, label }) => (
              <button
                key={path}
                onClick={() => navigate(path)}
                aria-current={isActive(path) ? "page" : undefined}
                className={`font-label relative py-2 text-base transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue ${
                  isActive(path)
                    ? "text-brand-pink after:absolute after:inset-x-0 after:-bottom-[15px] after:h-0.5 after:bg-brand-pink"
                    : "text-[#363537] hover:text-brand-orange"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Right: cart + account */}
          <div className="flex items-center gap-2">
            {token && <CartIcon />}

            <div className="hidden md:block">
              <UserPopover />
            </div>

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="icon-btn md:hidden"
              aria-label="Mở menu"
            >
              <MenuIcon size={24} strokeWidth={1.5} />
            </button>
          </div>
        </nav>

        {/* Mobile menu overlay */}
        <Transition
          show={mobileMenuOpen}
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 z-40 bg-black/40"
            onClick={() => setMobileMenuOpen(false)}
          />
        </Transition>

        {/* Mobile menu panel */}
        <Transition
          show={mobileMenuOpen}
          enter="transition-transform duration-300"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transition-transform duration-300"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-white">
            <div className="flex h-16 items-center justify-between border-b border-hairline px-4">
              <button
                onClick={() => go("/")}
                className="rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-blue"
                aria-label="Trang chủ VA Shop"
              >
                <img src={newLogo} alt="VA Shop Logo" className="h-8 w-auto" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="icon-btn"
                aria-label="Đóng menu"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-6">
              <p className="eyebrow mb-2 text-xs text-[#606562]">Danh Mục</p>
              <div className="divide-y divide-hairline border-y border-hairline">
                {NAV_LINKS.map(({ path, label }) => (
                  <button
                    key={path}
                    onClick={() => go(path)}
                    aria-current={isActive(path) ? "page" : undefined}
                    className={`font-label flex w-full items-center justify-between py-4 text-2xl transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-blue ${
                      isActive(path)
                        ? "text-brand-pink"
                        : "text-brand-ink hover:text-brand-orange"
                    }`}
                  >
                    {label}
                    {isActive(path) && (
                      <span className="h-2 w-2 rounded-full bg-brand-pink" />
                    )}
                  </button>
                ))}
              </div>

              <p className="eyebrow mb-2 mt-10 text-xs text-[#606562]">
                Tài Khoản
              </p>
              {token && (
                <button
                  onClick={() => go("/user/cart")}
                  className="mb-4 flex w-full items-center gap-3 border-b border-hairline py-4 text-base text-brand-ink transition-colors hover:text-brand-orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-blue"
                >
                  <ShoppingBag size={20} strokeWidth={1.5} />
                  Giỏ Hàng
                </button>
              )}
              <UserPopover />
            </div>
          </div>
        </Transition>
      </header>
    </>
  );
};

export default Header;
