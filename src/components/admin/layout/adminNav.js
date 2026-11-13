import {
  BarChart3,
  FolderOpen,
  LayoutDashboard,
  List,
  PlusCircle,
  ShoppingBag,
  Tag,
  Users,
} from "lucide-react";

/**
 * Single source of truth for the admin console navigation.
 * Used by the sidebar (grouped menu) and the top bar (breadcrumb / title).
 */
export const ADMIN_NAV = [
  {
    group: "Tổng quan",
    items: [
      { path: "/admin", label: "Trang chủ", icon: LayoutDashboard },
      { path: "/admin/dashboard", label: "Thống kê", icon: BarChart3 },
    ],
  },
  {
    group: "Bán hàng",
    items: [
      { path: "/admin/manage/orders", label: "Đơn hàng", icon: ShoppingBag },
    ],
  },
  {
    group: "Sản phẩm",
    items: [
      { path: "/admin/product/list", label: "Tất cả sản phẩm", icon: List },
      { path: "/admin/product/add", label: "Thêm sản phẩm", icon: PlusCircle },
      { path: "/admin/manage/category", label: "Danh mục", icon: FolderOpen },
      { path: "/admin/manage/brand", label: "Thương hiệu", icon: Tag },
    ],
  },
  {
    group: "Khách hàng",
    items: [{ path: "/admin/manage/user", label: "Người dùng", icon: Users }],
  },
];

export const findNavEntry = (pathname) => {
  for (const section of ADMIN_NAV) {
    const item = section.items.find((i) => i.path === pathname);
    if (item) return { ...item, group: section.group };
  }
  return null;
};
