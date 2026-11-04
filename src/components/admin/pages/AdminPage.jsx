import { PageHeader, Panel } from "@/components/admin/ui/AdminKit";
import { useDocumentTitle } from "@uidotdev/usehooks";
import {
  ArrowRight,
  BarChart3,
  Box,
  Clock,
  FolderPlus,
  Layers,
  PlusCircle,
  ShoppingBag,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const MODULES = [
  {
    title: "Đơn hàng",
    description: "Xem và xử lý đơn hàng, cập nhật trạng thái vận chuyển",
    icon: ShoppingBag,
    accent: "text-[#8B5CF6]",
    path: "/admin/manage/orders",
  },
  {
    title: "Sản phẩm",
    description: "Quản lý kho hàng, tồn kho theo size và thông tin sản phẩm",
    icon: Box,
    accent: "text-brand-blue",
    path: "/admin/product/list",
  },
  {
    title: "Danh mục",
    description: "Tổ chức sản phẩm theo danh mục phù hợp",
    icon: Layers,
    accent: "text-[#D97706]",
    path: "/admin/manage/category",
  },
  {
    title: "Người dùng",
    description: "Xem thông tin và lịch sử mua hàng của khách",
    icon: Users,
    accent: "text-[#16A34A]",
    path: "/admin/manage/user",
  },
  {
    title: "Thống kê",
    description: "Báo cáo doanh số và xu hướng kinh doanh",
    icon: BarChart3,
    accent: "text-brand-pink",
    path: "/admin/dashboard",
  },
];

const QUICK_ACTIONS = [
  {
    label: "Xử lý đơn chờ",
    hint: "Đơn hàng ở trạng thái chờ xử lý",
    icon: Clock,
    path: "/admin/manage/orders",
  },
  {
    label: "Thêm sản phẩm",
    hint: "Tạo sản phẩm mới kèm hình ảnh",
    icon: PlusCircle,
    path: "/admin/product/add",
  },
  {
    label: "Thêm danh mục",
    hint: "Phân loại sản phẩm mới",
    icon: FolderPlus,
    path: "/admin/manage/category",
  },
];

const greeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Chào buổi sáng";
  if (hour < 18) return "Chào buổi chiều";
  return "Chào buổi tối";
};

/**
 * AdminPage — console home: greeting, quick actions, module directory.
 */
const AdminPage = () => {
  useDocumentTitle("Admin — VA Shop");
  const navigate = useNavigate();

  return (
    <>
      <PageHeader
        title={`${greeting()}, Admin`}
        description="Quản lý cửa hàng, theo dõi doanh số và xử lý đơn hàng tại một nơi."
        actions={
          <>
            <button
              onClick={() => navigate("/admin/dashboard")}
              id="admin-view-dashboard"
              className="btn-admin btn-admin-secondary"
            >
              <BarChart3 size={16} aria-hidden="true" />
              Xem thống kê
            </button>
            <button
              onClick={() => navigate("/admin/manage/orders")}
              id="admin-view-orders"
              className="btn-admin btn-admin-primary"
            >
              <ShoppingBag size={16} aria-hidden="true" />
              Đơn hàng
            </button>
          </>
        }
      />

      {/* Quick actions */}
      <div className="mb-6 grid grid-cols-1 gap-3 md:grid-cols-3">
        {QUICK_ACTIONS.map(({ label, hint, icon: Icon, path }) => (
          <button
            key={label}
            onClick={() => navigate(path)}
            className="group flex items-center gap-4 rounded-lg border border-hairline bg-white p-4 text-left transition-colors hover:border-brand-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-blue"
          >
            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded bg-brand-blue text-white">
              <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold text-brand-ink">
                {label}
              </span>
              <span className="block truncate text-xs text-[#606562]">
                {hint}
              </span>
            </span>
            <ArrowRight
              size={16}
              className="text-[#9ca3af] transition-colors group-hover:text-brand-blue"
              aria-hidden="true"
            />
          </button>
        ))}
      </div>

      {/* Module directory */}
      <Panel
        title="Phân hệ quản lý"
        description="Truy cập nhanh các khu vực quản trị"
        bodyClassName=""
      >
        <ul className="divide-y divide-hairline">
          {MODULES.map(({ title, description, icon: Icon, accent, path }) => (
            <li key={path}>
              <button
                onClick={() => navigate(path)}
                className="group flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-[#f7f8f9] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-blue"
              >
                <span
                  className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded bg-brand-mist ${accent}`}
                >
                  <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium text-brand-ink">
                    {title}
                  </span>
                  <span className="block text-sm text-[#606562]">
                    {description}
                  </span>
                </span>
                <span className="hidden items-center gap-1 text-sm font-medium text-brand-blue sm:flex">
                  Mở
                  <ArrowRight size={14} aria-hidden="true" />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </Panel>
    </>
  );
};

export default AdminPage;
