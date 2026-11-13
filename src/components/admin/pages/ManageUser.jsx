import UserFormDialog from "@/components/admin/pages/UserFormDialog";
import {
  Badge,
  EmptyState,
  PageHeader,
  Panel,
} from "@/components/admin/ui/AdminKit";
import DataTable from "@/components/admin/ui/DataTable";
import Paginator from "@/components/common/Paginator";
import {
  activateUser,
  changeUserRole,
  deleteAdminUser,
  getAdminUsers,
  getApiErrorMessage,
  lockUser,
  unlockUser,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getCurrentUser, ROLES } from "@/lib/auth";
import { useDebounce, useDocumentTitle } from "@uidotdev/usehooks";
import { format } from "date-fns";
import {
  AlertTriangle,
  Lock,
  LockOpen,
  MailCheck,
  MoreHorizontal,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  Trash2,
  UserCog,
  UserRound,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

const PAGE_SIZE = 10;

const ROLE_LABEL = {
  [ROLES.ADMIN]: "Quản trị viên",
  [ROLES.USER]: "Khách hàng",
};

/** Account state: an admin lock wins over email verification. */
const AccountStatus = ({ user }) => {
  if (user.locked) return <Badge tone="danger">Đã khóa</Badge>;
  if (!user.active) return <Badge tone="warning">Chưa xác thực</Badge>;
  return <Badge tone="success">Hoạt động</Badge>;
};

const initials = (name, email) => {
  const source = (name || email || "?").trim();
  const parts = source.split(/\s+/);
  return (
    parts.length > 1 ? parts[0][0] + parts[parts.length - 1][0] : source.slice(0, 2)
  ).toUpperCase();
};

const displayName = (u) => u.fullName || u.email;

/* Confirmation copy for each sensitive action */
const CONFIRM_COPY = {
  lock: (u) => ({
    title: `Khóa tài khoản ${displayName(u)}?`,
    description:
      "Người dùng sẽ không thể đăng nhập hay sử dụng phiên hiện tại cho đến khi được mở khóa.",
    confirm: "Khóa tài khoản",
    danger: true,
  }),
  unlock: (u) => ({
    title: `Mở khóa tài khoản ${displayName(u)}?`,
    description: "Người dùng có thể đăng nhập và mua hàng trở lại.",
    confirm: "Mở khóa",
  }),
  activate: (u) => ({
    title: `Kích hoạt tài khoản ${displayName(u)}?`,
    description:
      "Tài khoản sẽ được đánh dấu là đã xác thực email mà không cần gửi email xác thực.",
    confirm: "Kích hoạt",
  }),
  role: (u) => {
    const toAdmin = u.role !== ROLES.ADMIN;
    return {
      title: toAdmin
        ? `Cấp quyền quản trị cho ${displayName(u)}?`
        : `Chuyển ${displayName(u)} về khách hàng?`,
      description: toAdmin
        ? "Người dùng sẽ truy cập được toàn bộ trang quản trị. Thay đổi có hiệu lực từ lần đăng nhập tiếp theo."
        : "Người dùng sẽ mất quyền truy cập trang quản trị từ lần đăng nhập tiếp theo.",
      confirm: toAdmin ? "Cấp quyền" : "Chuyển về khách hàng",
      danger: toAdmin,
    };
  },
  delete: (u) => ({
    title: `Xóa tài khoản ${displayName(u)}?`,
    description:
      "Tài khoản và giỏ hàng sẽ bị xóa vĩnh viễn. Tài khoản đã có đơn hàng không thể xóa — hãy khóa tài khoản thay thế.",
    confirm: "Xóa vĩnh viễn",
    danger: true,
  }),
};

/**
 * ManageUser — searchable, filterable, paged user directory with account
 * actions (edit, activate, change role, lock/unlock, delete).
 */
const ManageUser = () => {
  useDocumentTitle("Khách Hàng — VA Shop Admin");
  const currentUserId = useMemo(() => getCurrentUser()?.id, []);

  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);
  const [role, setRole] = useState("");
  const [active, setActive] = useState("");

  const [formOpen, setFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [confirm, setConfirm] = useState(null); // { action, user }
  const [isProcessing, setIsProcessing] = useState(false);

  const fetchUsers = useCallback(
    async (showLoading = true) => {
      if (showLoading) setIsLoading(true);
      setLoadError(false);
      try {
        const response = await getAdminUsers({
          page,
          size: PAGE_SIZE,
          search: debouncedSearch.trim(),
          role,
          active,
        });
        const result = response.data?.data;
        setUsers(result?.content || []);
        setTotalPages(result?.page?.totalPages || 0);
        setTotalElements(result?.page?.totalElements || 0);
      } catch (error) {
        console.error("Error fetching users: ", error);
        setLoadError(true);
        setUsers([]);
        setTotalPages(0);
      } finally {
        if (showLoading) setIsLoading(false);
      }
    },
    [page, debouncedSearch, role, active],
  );

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Every filter change returns to the first page.
  const withPageReset = (setter) => (e) => {
    setter(e.target.value);
    setPage(0);
  };

  const hasFilters = Boolean(search || role || active);
  const clearFilters = () => {
    setSearch("");
    setRole("");
    setActive("");
    setPage(0);
  };

  const openCreate = () => {
    setEditingUser(null);
    setFormOpen(true);
  };

  const openEdit = (user) => {
    setEditingUser(user);
    setFormOpen(true);
  };

  const runAction = async () => {
    if (!confirm) return;
    const { action, user } = confirm;
    setIsProcessing(true);
    try {
      switch (action) {
        case "lock":
          await lockUser(user.id);
          toast.success("Đã khóa tài khoản");
          break;
        case "unlock":
          await unlockUser(user.id);
          toast.success("Đã mở khóa tài khoản");
          break;
        case "activate":
          await activateUser(user.id);
          toast.success("Đã kích hoạt tài khoản");
          break;
        case "role": {
          const nextRole = user.role === ROLES.ADMIN ? ROLES.USER : ROLES.ADMIN;
          await changeUserRole(user.id, nextRole);
          toast.success(`Đã đổi vai trò thành ${ROLE_LABEL[nextRole]}`);
          break;
        }
        case "delete":
          await deleteAdminUser(user.id);
          toast.success("Đã xóa tài khoản");
          // Step back a page if the last row on this page was removed.
          if (users.length === 1 && page > 0) {
            setConfirm(null);
            setPage((p) => p - 1);
            return;
          }
          break;
        default:
          break;
      }
      setConfirm(null);
      fetchUsers(false);
    } catch (error) {
      console.error(`Error running ${action}: `, error);
      toast.error(getApiErrorMessage(error, "Không thể thực hiện thao tác"));
    } finally {
      setIsProcessing(false);
    }
  };

  const columns = [
    {
      id: "user",
      header: "Người dùng",
      cell: (user) => (
        <div className="flex items-center gap-3">
          <span
            className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
              user.role === ROLES.ADMIN
                ? "bg-brand-ink text-white"
                : "bg-brand-mist text-[#363537]"
            }`}
            aria-hidden="true"
          >
            {initials(user.fullName, user.email)}
          </span>
          <div className="min-w-0">
            <p className="flex items-center gap-2 font-medium">
              <span className="max-w-[220px] truncate">{user.fullName || "—"}</span>
              {user.id === currentUserId && <Badge tone="info">Bạn</Badge>}
            </p>
            <p className="max-w-[260px] truncate text-xs text-[#606562]">{user.email}</p>
          </div>
        </div>
      ),
    },
    {
      id: "phone",
      header: "Số điện thoại",
      className: "font-mono text-xs",
      cell: (user) => user.phone || "—",
    },
    {
      id: "role",
      header: "Vai trò",
      cell: (user) =>
        user.role === ROLES.ADMIN ? (
          <span className="inline-flex items-center gap-1.5 text-sm font-medium">
            <ShieldCheck size={15} className="text-brand-blue" aria-hidden="true" />
            Quản trị viên
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-sm text-[#363537]">
            <UserRound size={15} className="text-[#9ca3af]" aria-hidden="true" />
            Khách hàng
          </span>
        ),
    },
    {
      id: "status",
      header: "Trạng thái",
      cell: (user) => <AccountStatus user={user} />,
    },
    {
      id: "createdAt",
      header: "Ngày tạo",
      className: "whitespace-nowrap font-mono text-xs text-[#606562]",
      cell: (user) =>
        user.createdAt ? format(new Date(user.createdAt), "dd/MM/yyyy") : "—",
    },
    {
      id: "actions",
      header: <span className="sr-only">Thao tác</span>,
      pin: "end",
      align: "right",
      headerClassName: "w-16",
      cell: (user) => {
        const isSelf = user.id === currentUserId;
        const isAdminUser = user.role === ROLES.ADMIN;
        return (
          <div className="flex justify-end">
            {/* modal={false}: a modal menu that opens a dialog leaves
                `pointer-events: none` stuck on <body> (Radix bug),
                freezing the page — worst after delete unmounts the row. */}
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <button
                  className="btn-admin btn-admin-ghost btn-admin-icon h-8 w-8"
                  aria-label={`Thao tác cho ${displayName(user)}`}
                >
                  <MoreHorizontal size={16} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52 rounded p-1">
                <DropdownMenuItem
                  onClick={() => openEdit(user)}
                  className="cursor-pointer gap-2 rounded text-sm"
                >
                  <Pencil size={15} />
                  Sửa thông tin
                </DropdownMenuItem>
                {!user.active && (
                  <DropdownMenuItem
                    onClick={() => setConfirm({ action: "activate", user })}
                    className="cursor-pointer gap-2 rounded text-sm"
                  >
                    <MailCheck size={15} />
                    Kích hoạt tài khoản
                  </DropdownMenuItem>
                )}
                {!isSelf && (
                  <>
                    <DropdownMenuItem
                      onClick={() => setConfirm({ action: "role", user })}
                      className="cursor-pointer gap-2 rounded text-sm"
                    >
                      {isAdminUser ? <UserRound size={15} /> : <ShieldCheck size={15} />}
                      {isAdminUser ? "Chuyển về khách hàng" : "Cấp quyền quản trị"}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {user.locked ? (
                      <DropdownMenuItem
                        onClick={() => setConfirm({ action: "unlock", user })}
                        className="cursor-pointer gap-2 rounded text-sm"
                      >
                        <LockOpen size={15} />
                        Mở khóa tài khoản
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem
                        onClick={() => setConfirm({ action: "lock", user })}
                        className="cursor-pointer gap-2 rounded text-sm text-[#B45309] focus:bg-amber-50 focus:text-[#B45309]"
                      >
                        <Lock size={15} />
                        Khóa tài khoản
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem
                      onClick={() => setConfirm({ action: "delete", user })}
                      className="cursor-pointer gap-2 rounded text-sm text-[#DC2626] focus:bg-red-50 focus:text-[#DC2626]"
                    >
                      <Trash2 size={15} />
                      Xóa tài khoản
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  const copy = confirm ? CONFIRM_COPY[confirm.action](confirm.user) : null;

  return (
    <>
      <PageHeader
        title="Người dùng"
        description="Xem thông tin và quản lý tài khoản người dùng hệ thống"
        actions={
          <>
            <button
              onClick={() => fetchUsers()}
              disabled={isLoading}
              className="btn-admin btn-admin-secondary"
            >
              <RefreshCw size={15} className={isLoading ? "animate-spin" : ""} />
              Làm mới
            </button>
            <button onClick={openCreate} className="btn-admin btn-admin-primary">
              <Plus size={16} aria-hidden="true" />
              Thêm người dùng
            </button>
          </>
        }
      />

      <Panel
        bodyClassName=""
        footer={
          !isLoading &&
          !loadError &&
          totalElements > 0 && (
            <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
              <p className="text-xs text-[#606562]">
                Trang <span className="font-mono text-brand-ink">{page + 1}</span> /{" "}
                <span className="font-mono text-brand-ink">{totalPages}</span> ·{" "}
                <span className="font-mono">{totalElements}</span> người dùng
              </p>
              {totalPages > 1 && (
                <Paginator
                  totalPages={totalPages}
                  currentPage={page}
                  onPageChange={setPage}
                />
              )}
            </div>
          )
        }
      >
        {/* Toolbar */}
        <div className="flex flex-col gap-3 border-b border-hairline px-4 py-3 md:flex-row md:items-center">
          <div className="relative w-full md:max-w-sm">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]"
              aria-hidden="true"
            />
            <input
              type="search"
              value={search}
              onChange={withPageReset(setSearch)}
              placeholder="Tìm theo tên, email hoặc số điện thoại..."
              aria-label="Tìm người dùng"
              className="admin-input pl-9"
            />
          </div>
          <div className="grid grid-cols-2 gap-3 md:flex">
            <select
              value={role}
              onChange={withPageReset(setRole)}
              aria-label="Lọc theo vai trò"
              className="admin-input md:w-44"
            >
              <option value="">Tất cả vai trò</option>
              <option value={ROLES.USER}>Khách hàng</option>
              <option value={ROLES.ADMIN}>Quản trị viên</option>
            </select>
            <select
              value={active}
              onChange={withPageReset(setActive)}
              aria-label="Lọc theo xác thực email"
              className="admin-input md:w-44"
            >
              <option value="">Mọi trạng thái</option>
              <option value="true">Đã xác thực</option>
              <option value="false">Chưa xác thực</option>
            </select>
          </div>
          {hasFilters && (
            <button onClick={clearFilters} className="btn-admin btn-admin-ghost md:ml-auto">
              Xóa bộ lọc
            </button>
          )}
        </div>

        <DataTable
          storageKey="users"
          ariaLabel="Danh sách người dùng"
          columns={columns}
          data={users}
          minWidth={820}
          loading={isLoading}
          loadingRows={6}
          error={
            loadError && (
              <EmptyState
                icon={AlertTriangle}
                title="Không thể tải danh sách người dùng"
                description="Đã có lỗi khi kết nối tới máy chủ. Vui lòng thử lại."
                action={
                  <button onClick={() => fetchUsers()} className="btn-admin btn-admin-secondary">
                    Thử lại
                  </button>
                }
              />
            )
          }
          empty={
            <EmptyState
              icon={UserCog}
              title={hasFilters ? "Không tìm thấy người dùng" : "Chưa có người dùng"}
              description={
                hasFilters
                  ? "Không có tài khoản nào khớp với bộ lọc hiện tại."
                  : "Tài khoản người dùng sẽ xuất hiện tại đây sau khi đăng ký."
              }
              action={
                hasFilters ? (
                  <button onClick={clearFilters} className="btn-admin btn-admin-secondary">
                    Xóa bộ lọc
                  </button>
                ) : (
                  <button onClick={openCreate} className="btn-admin btn-admin-primary">
                    Thêm người dùng
                  </button>
                )
              }
            />
          }
        />
      </Panel>

      <UserFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        user={editingUser}
        onSuccess={() => fetchUsers(false)}
      />

      <AlertDialog
        open={Boolean(confirm)}
        onOpenChange={(open) => !open && !isProcessing && setConfirm(null)}
      >
        <AlertDialogContent className="max-w-md rounded-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-base font-semibold text-brand-ink">
              {copy?.title}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-[#606562]">
              {copy?.description}
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
                runAction();
              }}
              disabled={isProcessing}
              className={`h-9 rounded px-4 text-sm font-medium text-white ${
                copy?.danger ? "bg-[#DC2626] hover:bg-red-700" : "bg-brand-blue hover:bg-[#2563EB]"
              }`}
            >
              {isProcessing && <RefreshCw size={15} className="mr-1.5 animate-spin" />}
              {isProcessing ? "Đang xử lý..." : copy?.confirm}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ManageUser;
