import { EmptyState, PageHeader, Panel } from "@/components/admin/ui/AdminKit";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { Search, UserCog } from "lucide-react";

/**
 * ManageUser — placeholder: the backend has no user-management endpoint yet.
 * Shows the table frame the feature will use, with an explicit empty state.
 */
const ManageUser = () => {
  useDocumentTitle("Khách Hàng — VA Shop Admin");

  return (
    <>
      <PageHeader
        title="Người dùng"
        description="Xem thông tin và quản lý tài khoản người dùng hệ thống"
      />

      <Panel bodyClassName="">
        <div className="flex items-center border-b border-hairline px-4 py-3">
          <div className="relative w-full sm:max-w-sm">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]"
              aria-hidden="true"
            />
            <input
              type="search"
              disabled
              placeholder="Tìm theo tên hoặc email..."
              aria-label="Tìm người dùng"
              className="admin-input pl-9"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Người dùng</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Vai trò</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
          </table>
        </div>

        <EmptyState
          icon={UserCog}
          title="Tính năng đang phát triển"
          description="Khu vực quản lý người dùng đang được hoàn thiện và sẽ có trong phiên bản tiếp theo."
        />
      </Panel>
    </>
  );
};

export default ManageUser;
