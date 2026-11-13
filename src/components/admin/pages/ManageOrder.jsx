import OrdersTable from "@/components/admin/pages/OrdersTable";
import {
  EmptyState,
  ORDER_STATUS,
  PageHeader,
  Panel,
} from "@/components/admin/ui/AdminKit";
import Paginator from "@/components/common/Paginator";
import { getOrdersByStatus } from "@/components/service/ApiFunctions";
import { useDocumentTitle } from "@uidotdev/usehooks";
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Inbox,
  LayoutList,
  RefreshCw,
  Truck,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";

const ALL = "ALL";

const STATUS_TABS = [
  { id: ALL, icon: LayoutList },
  { id: "PENDING", icon: Clock },
  { id: "IN_PROGRESS", icon: Inbox },
  { id: "SHIPPING", icon: Truck },
  { id: "DELIVERED", icon: CheckCircle },
  { id: "CANCELLED", icon: XCircle },
];

/**
 * ManageOrder — order queue split by status tabs.
 */
const ManageOrder = () => {
  useDocumentTitle("Đơn Hàng — VA Shop Admin");
  const [status, setStatus] = useState("PENDING");
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const fetchOrders = async (showLoading = true) => {
    if (showLoading) setIsLoading(true);
    setLoadError(false);
    try {
      const response = await getOrdersByStatus(
        currentPage,
        status === ALL ? undefined : status,
      );
      setOrders(response.data?.content || []);
      setTotalPages(response.data?.page?.totalPages || 0);
      setTotalElements(response.data?.page?.totalElements ?? null);
    } catch (error) {
      console.error("Error fetching orders: ", error);
      setLoadError(true);
      setOrders([]);
      setTotalPages(0);
    } finally {
      if (showLoading) setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [status, currentPage]);

  const selectStatus = (id) => {
    setStatus(id);
    setCurrentPage(0);
  };

  const tabLabel = (id) => (id === ALL ? "Tất cả" : ORDER_STATUS[id].label);
  const currentLabel = status === ALL ? null : ORDER_STATUS[status]?.label;

  return (
    <>
      <PageHeader
        title="Đơn hàng"
        description="Theo dõi, xử lý và cập nhật trạng thái đơn hàng"
        actions={
          <button
            onClick={() => fetchOrders()}
            disabled={isLoading}
            className="btn-admin btn-admin-secondary"
          >
            <RefreshCw size={15} className={isLoading ? "animate-spin" : ""} />
            Làm mới
          </button>
        }
      />

      <Panel
        bodyClassName=""
        footer={
          totalPages > 0 && (
            <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
              <p className="text-xs text-[#606562]">
                Trang{" "}
                <span className="font-mono text-brand-ink">{currentPage + 1}</span>{" "}
                / <span className="font-mono text-brand-ink">{totalPages}</span>
                {totalElements !== null && (
                  <>
                    {" "}· <span className="font-mono">{totalElements}</span> đơn{" "}
                    {currentLabel?.toLowerCase()}
                  </>
                )}
              </p>
              {totalPages > 1 && (
                <Paginator
                  totalPages={totalPages}
                  currentPage={currentPage}
                  onPageChange={setCurrentPage}
                />
              )}
            </div>
          )
        }
      >
        {/* Status tabs */}
        <div
          role="tablist"
          aria-label="Lọc theo trạng thái"
          className="scrollbar-hide flex overflow-x-auto border-b border-hairline px-2"
        >
          {STATUS_TABS.map(({ id, icon: Icon }) => {
            const active = status === id;
            return (
              <button
                key={id}
                role="tab"
                aria-selected={active}
                onClick={() => selectStatus(id)}
                className={`relative flex flex-shrink-0 items-center gap-2 px-4 py-3 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-blue ${
                  active
                    ? "font-medium text-brand-ink after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:bg-brand-blue"
                    : "text-[#606562] hover:text-brand-ink"
                }`}
              >
                {id !== ALL && (
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${ORDER_STATUS[id].dot}`}
                    aria-hidden="true"
                  />
                )}
                <Icon size={15} strokeWidth={1.75} aria-hidden="true" />
                {tabLabel(id)}
              </button>
            );
          })}
        </div>

        <OrdersTable
          data={orders}
          fetchOrders={fetchOrders}
          loading={isLoading}
          error={loadError && (
            <EmptyState
              icon={AlertTriangle}
              title="Không thể tải đơn hàng"
              description="Kiểm tra kết nối hoặc quyền truy cập, rồi thử lại."
              action={
                <button
                  onClick={() => fetchOrders()}
                  className="btn-admin btn-admin-secondary"
                >
                  <RefreshCw size={15} aria-hidden="true" />
                  Thử lại
                </button>
              }
            />
          )}
          empty={
            <EmptyState
              icon={Inbox}
              title="Không có đơn hàng"
              description={`Hiện không có đơn hàng nào ở trạng thái "${currentLabel}".`}
            />
          }
        />
      </Panel>
    </>
  );
};

export default ManageOrder;
