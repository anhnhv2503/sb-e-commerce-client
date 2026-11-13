import BrandFormDialog from "@/components/admin/pages/BrandFormDialog";
import { EmptyState, PageHeader, Panel } from "@/components/admin/ui/AdminKit";
import DataTable from "@/components/admin/ui/DataTable";
import {
  deleteBrand,
  getAllBrands,
  getApiErrorMessage,
} from "@/components/service/ApiFunctions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { format } from "date-fns";
import { ImageOff, Pencil, Plus, RefreshCw, Search, Tag, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

const BrandLogo = ({ src }) => {
  const [broken, setBroken] = useState(false);
  return (
    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center overflow-hidden rounded border border-hairline bg-brand-mist">
      {src && !broken ? (
        <img
          src={src}
          alt=""
          className="h-full w-full object-contain"
          onError={() => setBroken(true)}
        />
      ) : (
        <ImageOff size={15} className="text-[#9ca3af]" aria-hidden="true" />
      )}
    </span>
  );
};

/**
 * ManageBrand — brand table with client-side search and create/edit/delete.
 */
const ManageBrand = () => {
  useDocumentTitle("Thương Hiệu — VA Shop Admin");
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [formOpen, setFormOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);

  const [deleting, setDeleting] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const fetchBrands = async (showLoading = true) => {
    try {
      if (showLoading) setLoading(true);
      const response = await getAllBrands();
      setBrands(response.data?.data || []);
    } catch (error) {
      console.error("Error loading brands", error);
      toast.error("Không thể tải danh sách thương hiệu");
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return brands;
    return brands.filter(
      (b) =>
        b.name?.toLowerCase().includes(q) || b.description?.toLowerCase().includes(q),
    );
  }, [searchQuery, brands]);

  const openCreate = () => {
    setEditingBrand(null);
    setFormOpen(true);
  };

  const openEdit = (brand) => {
    setEditingBrand(brand);
    setFormOpen(true);
  };

  const columns = [
    {
      id: "id",
      header: "ID",
      headerClassName: "w-20",
      className: "font-mono text-xs text-[#606562]",
      cell: (b) => `#${String(b.id).padStart(3, "0")}`,
    },
    {
      id: "name",
      header: "Thương hiệu",
      cell: (b) => (
        <div className="flex items-center gap-3">
          <BrandLogo src={b.logo} />
          <span className="font-medium">{b.name}</span>
        </div>
      ),
    },
    {
      id: "description",
      header: "Mô tả",
      className: "max-w-[320px] truncate text-[#606562]",
      cell: (b) => b.description || "—",
    },
    {
      id: "createdAt",
      header: "Ngày tạo",
      className: "whitespace-nowrap font-mono text-xs text-[#606562]",
      cell: (b) => (b.createdAt ? format(new Date(b.createdAt), "dd/MM/yyyy") : "—"),
    },
    {
      id: "actions",
      header: "Thao tác",
      pin: "end",
      align: "right",
      headerClassName: "w-28",
      cell: (b) => (
        <div className="flex justify-end gap-1">
          <button
            onClick={() => openEdit(b)}
            className="btn-admin btn-admin-ghost btn-admin-icon"
            aria-label={`Sửa ${b.name}`}
            title="Sửa"
          >
            <Pencil size={15} />
          </button>
          <button
            onClick={() => setDeleting(b)}
            className="btn-admin btn-admin-ghost btn-admin-icon hover:text-[#DC2626]"
            aria-label={`Xóa ${b.name}`}
            title="Xóa"
          >
            <Trash2 size={15} />
          </button>
        </div>
      ),
    },
  ];

  const confirmDelete = async () => {
    if (!deleting) return;
    setIsProcessing(true);
    try {
      await deleteBrand(deleting.id);
      toast.success("Đã xóa thương hiệu");
      setDeleting(null);
      fetchBrands(false);
    } catch (error) {
      console.error("Error deleting brand", error);
      toast.error(getApiErrorMessage(error, "Không thể xóa thương hiệu"));
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Thương hiệu"
        description="Quản lý các thương hiệu sản phẩm trong cửa hàng"
        actions={
          <button onClick={openCreate} className="btn-admin btn-admin-primary">
            <Plus size={16} aria-hidden="true" />
            Thêm thương hiệu
          </button>
        }
      />

      <Panel
        bodyClassName=""
        footer={
          !loading && (
            <p className="text-xs text-[#606562]">
              Hiển thị <span className="font-mono text-brand-ink">{filtered.length}</span> /{" "}
              <span className="font-mono">{brands.length}</span> thương hiệu
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
              placeholder="Tìm kiếm thương hiệu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Tìm kiếm thương hiệu"
              className="admin-input pl-9"
            />
          </div>
          <button
            onClick={() => fetchBrands()}
            disabled={loading}
            className="btn-admin btn-admin-secondary"
          >
            <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
            Làm mới
          </button>
        </div>

        <DataTable
          storageKey="brands"
          ariaLabel="Danh sách thương hiệu"
          columns={columns}
          data={filtered}
          minWidth={640}
          loading={loading}
          loadingRows={5}
          empty={
            <EmptyState
              icon={Tag}
              title={searchQuery ? "Không tìm thấy kết quả" : "Chưa có thương hiệu"}
              description={
                searchQuery
                  ? `Không có thương hiệu nào khớp với "${searchQuery}".`
                  : "Hãy tạo thương hiệu đầu tiên để gắn cho sản phẩm."
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
                  <button onClick={openCreate} className="btn-admin btn-admin-primary">
                    Thêm thương hiệu
                  </button>
                )
              }
            />
          }
        />
      </Panel>

      <BrandFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        brand={editingBrand}
        onSuccess={() => fetchBrands(false)}
      />

      <AlertDialog
        open={Boolean(deleting)}
        onOpenChange={(open) => !open && !isProcessing && setDeleting(null)}
      >
        <AlertDialogContent className="max-w-md rounded-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-base font-semibold text-brand-ink">
              Xóa thương hiệu {deleting?.name}?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-[#606562]">
              Thương hiệu đang được sản phẩm sử dụng sẽ không thể xóa. Hành động này không
              thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-2 gap-2 sm:gap-0">
            <AlertDialogCancel
              disabled={isProcessing}
              className="h-9 rounded border-[#cccfcd] px-4 text-sm font-medium"
            >
              Quay lại
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                confirmDelete();
              }}
              disabled={isProcessing}
              className="h-9 rounded bg-[#DC2626] px-4 text-sm font-medium text-white hover:bg-red-700"
            >
              {isProcessing && <RefreshCw size={15} className="mr-1.5 animate-spin" />}
              {isProcessing ? "Đang xử lý..." : "Xóa thương hiệu"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ManageBrand;
