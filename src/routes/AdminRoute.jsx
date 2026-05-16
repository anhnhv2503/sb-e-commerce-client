import SideBar from "@/components/admin/layout/SideBar";
import { AuthProvider } from "@/components/auth/AuthContext";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

/**
 * AdminRoute
 * Redesigned admin layout with collapsible sidebar on mobile.
 * SKILL.md: responsive behavior, proper semantic landmarks.
 */
const AdminRoute = () => {
  const user = JSON.parse(localStorage.getItem("accessToken"));
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (user) {
      const decodedUser = jwtDecode(user);
      if (decodedUser.roles[0] !== "ROLE_ADMIN") {
        navigate("/");
      }
    }
  }, []);

  return (
    <AuthProvider>
      <div className="flex h-screen bg-gray-100 overflow-hidden">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-out lg:relative lg:translate-x-0 lg:z-auto ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          aria-label="Admin navigation"
        >
          <SideBar onClose={() => setSidebarOpen(false)} />
        </aside>

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Mobile top bar */}
          <header className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 shadow-sm">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3B82F6]"
              aria-label="Open sidebar"
            >
              <Menu size={22} />
            </button>
            <span className="text-sm font-semibold text-[#111827] font-mono tracking-wider">
              VA ADMIN
            </span>
            <div className="w-10" /> {/* Spacer for centering */}
          </header>

          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </AuthProvider>
  );
};

export default AdminRoute;
