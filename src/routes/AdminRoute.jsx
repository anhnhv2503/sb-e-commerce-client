import { findNavEntry } from "@/components/admin/layout/adminNav";
import SideBar from "@/components/admin/layout/SideBar";
import { AuthProvider } from "@/components/auth/AuthContext";
import vietnameseBoy from "@/assets/vietnameseBoy.png";
import { getCurrentUser, isAdmin } from "@/lib/auth";
import { ChevronRight, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

/**
 * Redirects a signed-in non-admin to the storefront with a notice.
 * The toast fires in an effect (not during render) and only once.
 */
const Forbidden = () => {
  useEffect(() => {
    toast.error("Bạn không có quyền truy cập trang quản trị", {
      id: "admin-forbidden",
    });
  }, []);
  return <Navigate to="/" replace />;
};

/**
 * AdminRoute — guard for every /admin/* route.
 * Decided synchronously before anything renders, so the console never
 * mounts (and never calls admin APIs) for guests or regular users:
 *  - no / invalid / expired token → /login (returns here after login)
 *  - token whose primary role is not ROLE_ADMIN → /
 */
const AdminRoute = () => {
  const location = useLocation();
  const user = getCurrentUser();

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname + location.search }}
      />
    );
  }

  if (!isAdmin(user)) {
    return <Forbidden />;
  }

  return <AdminLayout user={user} />;
};

/**
 * AdminLayout — admin console shell.
 * Fixed sidebar + top bar (breadcrumb, date, account) + scrollable work area
 * on a soft canvas so white panels read as distinct work surfaces.
 */
const AdminLayout = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const current = findNavEntry(location.pathname);
  const today = new Date().toLocaleDateString("vi-VN", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <AuthProvider>
      <div className="flex h-screen overflow-hidden bg-brand-mist">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-out lg:relative lg:z-auto lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          aria-label="Admin navigation"
        >
          <SideBar onClose={() => setSidebarOpen(false)} />
        </aside>

        {/* Work area */}
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          {/* Top bar */}
          <header className="flex h-14 flex-shrink-0 items-center gap-3 border-b border-hairline bg-white px-4 sm:px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="btn-admin btn-admin-ghost btn-admin-icon -ml-2 lg:hidden"
              aria-label="Open sidebar"
            >
              <Menu size={20} />
            </button>

            <nav
              aria-label="Breadcrumb"
              className="flex min-w-0 items-center gap-1.5 text-sm"
            >
              <button
                onClick={() => navigate("/admin")}
                className="text-[#606562] transition-colors hover:text-brand-ink"
              >
                Quản trị
              </button>
              {current && current.path !== "/admin" && (
                <>
                  <ChevronRight size={14} className="text-[#9ca3af]" />
                  <span className="hidden text-[#606562] sm:inline">
                    {current.group}
                  </span>
                  <ChevronRight
                    size={14}
                    className="hidden text-[#9ca3af] sm:inline"
                  />
                  <span className="truncate font-medium text-brand-ink">
                    {current.label}
                  </span>
                </>
              )}
            </nav>

            <div className="ml-auto flex items-center gap-4">
              <span className="hidden font-mono text-xs capitalize text-[#606562] md:inline">
                {today}
              </span>
              <div className="flex items-center gap-2.5 border-l border-hairline pl-4">
                <img
                  src={vietnameseBoy}
                  alt=""
                  className="h-8 w-8 rounded-full border border-hairline object-cover"
                />
                <div className="hidden leading-tight sm:block">
                  <p className="max-w-[180px] truncate text-sm font-medium text-brand-ink">
                    {user?.fullName || user?.name || user?.sub || "Admin"}
                  </p>
                  <p className="text-xs text-[#606562]">Quản trị viên</p>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto">
            <div className="mx-auto w-full max-w-page p-4 sm:p-6 lg:p-8">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </AuthProvider>
  );
};

export default AdminRoute;
