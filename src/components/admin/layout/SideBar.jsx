import { ADMIN_NAV } from "@/components/admin/layout/adminNav";
import Logout from "@/components/logout/Logout";
import { ExternalLink, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import newLogo from "../../../assets/logo.png";

/**
 * SideBar — grouped navigation for the admin console.
 * Dark ink rail, section labels, active item marked with a blue rule.
 */
const SideBar = ({ onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const go = (path) => {
    navigate(path);
    onClose?.();
  };

  return (
    <div className="flex h-full w-64 flex-col bg-brand-ink text-white">
      {/* Brand */}
      <div className="flex h-14 flex-shrink-0 items-center justify-between border-b border-white/10 px-4">
        <button
          onClick={() => go("/admin")}
          className="flex items-center gap-3 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-blue"
          aria-label="Admin home"
        >
          <img src={newLogo} alt="VA Shop" className="h-7 w-auto" />
          <span className="font-label text-sm text-white/70">Quản Trị</span>
        </button>
        {onClose && (
          <button
            onClick={onClose}
            className="rounded p-1.5 text-white/60 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Admin menu">
        {ADMIN_NAV.map((section) => (
          <div key={section.group} className="mb-5">
            <p className="mb-1.5 px-3 text-[11px] font-semibold uppercase tracking-wider text-white/40">
              {section.group}
            </p>
            <ul className="space-y-0.5">
              {section.items.map(({ path, label, icon: Icon }) => {
                const active = location.pathname === path;
                return (
                  <li key={path}>
                    <button
                      onClick={() => go(path)}
                      aria-current={active ? "page" : undefined}
                      className={`relative flex w-full items-center gap-3 rounded px-3 py-2 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-blue ${
                        active
                          ? "bg-white/10 font-medium text-white before:absolute before:inset-y-1.5 before:left-0 before:w-0.5 before:rounded-full before:bg-brand-blue"
                          : "text-white/65 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <Icon size={17} strokeWidth={1.75} aria-hidden="true" />
                      {label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="flex-shrink-0 space-y-1 border-t border-white/10 p-3">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded px-3 py-2 text-sm text-white/65 transition-colors hover:bg-white/5 hover:text-white"
        >
          <ExternalLink size={17} strokeWidth={1.75} aria-hidden="true" />
          Xem cửa hàng
        </a>
        <Logout className="h-9 w-full justify-start gap-3 rounded bg-transparent px-3 text-sm font-normal text-white/65 hover:bg-white/5 hover:text-white [&_svg]:size-[17px]" />
      </div>
    </div>
  );
};

export default SideBar;
