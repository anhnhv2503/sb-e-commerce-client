import AddCategory from "@/components/admin/pages/AddCategory";
import { EmptyState, PageHeader, Panel } from "@/components/admin/ui/AdminKit";
import DataTable from "@/components/admin/ui/DataTable";
import { getAllCategories } from "@/components/service/ApiFunctions";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { FolderOpen, Pencil, RefreshCw, Search, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

const columns = [
  {
    id: "id",
    header: "ID",
    headerClassName: "w-28",
    className: "font-mono text-xs text-[#606562]",
    cell: (c) => `#${String(c.id).padStart(3, "0")}`,
  },
  {
    id: "name",
    header: "Tên danh mục",
    className: "font-medium",
    cell: (c) => c.name,
  },
  {
    id: "actions",
    header: "Thao tác",
    pin: "end",
    align: "right",
    headerClassName: "w-32",
    cell: (c) => (
      <div className="flex justify-end gap-1">
        <button
          disabled
          className="btn-admin btn-admin-ghost btn-admin-icon"
          aria-label={`Sửa ${c.name} (chưa hỗ trợ)`}
          title="Chức năng sửa chưa được hỗ trợ"
        >
          <Pencil size={15} />
        </button>
        <button
          disabled
          className="btn-admin btn-admin-ghost btn-admin-icon hover:text-[#DC2626]"
          aria-label={`Xóa ${c.name} (chưa hỗ trợ)`}
          title="Chức năng xóa chưa được hỗ trợ"
        >
          <Trash2 size={15} />
        </button>
      </div>
    ),
  },
];

/**
 * ManageCategory — category table with client-side search.
 */
const ManageCategory = () => {
  useDocumentTitle("Danh Mục — VA Shop Admin");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await getAllCategories();
      setCategories(response.data?.data || []);
    } catch (error) {
      console.error("Error loading categories", error);
      toast.error("Không thể tải danh sách danh mục");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return categories;
    return categories.filter((c) => c.name?.toLowerCase().includes(q));
  }, [searchQuery, categories]);

  return (
    <>
      <PageHeader
        title="Danh mục"
        description="Quản lý và tổ chức các danh mục sản phẩm"
        actions={
          <AddCategory
            open={addDialogOpen}
            onOpenChange={setAddDialogOpen}
            onSuccess={fetchCategories}
          />
        }
      />

      <Panel
        bodyClassName=""
        footer={
          !loading && (
            <p className="text-xs text-[#606562]">
              Hiển thị <span className="font-mono text-brand-ink">{filtered.length}</span>{" "}
              / <span className="font-mono">{categories.length}</span> danh mục
            </p>
          )
        }
      >
        {/* Toolbar */}
        <div className="flex flex-col gap-3 border-b border-hairline px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-sm">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]"
              aria-hidden="true"
            />
            <input
              type="search"
              placeholder="Tìm kiếm danh mục..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Tìm kiếm danh mục"
              className="admin-input pl-9"
            />
          </div>
          <button
            onClick={fetchCategories}
            disabled={loading}
            className="btn-admin btn-admin-secondary"
          >
            <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
            Làm mới
          </button>
        </div>

        <DataTable
          storageKey="categories"
          ariaLabel="Danh sách danh mục"
          columns={columns}
          data={filtered}
          loading={loading}
          empty={
            <EmptyState
              icon={FolderOpen}
              title={searchQuery ? "Không tìm thấy kết quả" : "Chưa có danh mục"}
              description={
                searchQuery
                  ? `Không có danh mục nào khớp với "${searchQuery}".`
                  : "Hệ thống chưa có danh mục sản phẩm nào. Hãy tạo danh mục đầu tiên."
              }
              action={
                searchQuery ? (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="btn-admin btn-admin-secondary"
                  >
                    Xóa tìm kiếm
                  </button>
                ) : (
                  <button
                    onClick={() => setAddDialogOpen(true)}
                    className="btn-admin btn-admin-primary"
                  >
                    Thêm danh mục
                  </button>
                )
              }
            />
          }
        />
      </Panel>
    </>
  );
};

export default ManageCategory;
