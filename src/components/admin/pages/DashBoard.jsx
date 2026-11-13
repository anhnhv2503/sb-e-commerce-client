import {
  Badge,
  EmptyState,
  LoadingRows,
  ORDER_STATUS,
  PageHeader,
  Panel,
  StatCard,
  StatusBadge,
} from "@/components/admin/ui/AdminKit";
import useCurrencyFormat from "@/components/hooks/useCurrencyFormat";
import {
  getDashboardData,
  getLowStockProducts,
  getMonthlyRevenue,
  getNewestOrders,
  getTopSellingProducts,
} from "@/components/service/ApiFunctions";
import { useDocumentTitle } from "@uidotdev/usehooks";
import {
  AlertTriangle,
  ArrowRight,
  Box,
  Clock,
  DollarSign,
  Layers,
  PackageCheck,
  PackageX,
  RefreshCw,
  ShoppingBag,
  TrendingUp,
  Users,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import CountUp from "react-countup";
import { useNavigate } from "react-router-dom";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

/* Hex values match the dots in ORDER_STATUS so the chart and badges agree. */
const STATUS_COLORS = {
  PENDING: "#D97706",
  IN_PROGRESS: "#3B82F6",
  SHIPPING: "#8B5CF6",
  DELIVERED: "#16A34A",
  CANCELLED: "#DC2626",
};

const LOW_STOCK_THRESHOLD = 5;
const TOP_PRODUCTS_LIMIT = 5;

const CURRENT_YEAR = new Date().getFullYear();
const YEAR_OPTIONS = Array.from({ length: 5 }, (_, i) => CURRENT_YEAR - i);

const compactNumber = new Intl.NumberFormat("vi-VN", {
  notation: "compact",
  maximumFractionDigits: 1,
});

const tooltipStyle = {
  backgroundColor: "#111827",
  border: "none",
  borderRadius: "4px",
  color: "#fff",
  fontSize: "12px",
};

/** Unwraps `ApiResponse.data` from a settled promise, or returns the fallback. */
const settledData = (result, fallback) =>
  result.status === "fulfilled" ? (result.value.data?.data ?? fallback) : fallback;

/**
 * DashBoard — KPI tiles, monthly revenue, order status split, best sellers,
 * low-stock sizes and recent orders. All figures come from /api/dashboard.
 */
const DashBoard = () => {
  useDocumentTitle("Thống Kê — VA Shop Admin");
  const navigate = useNavigate();
  const currency = useCurrencyFormat();

  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  const [dashboardData, setDashboardData] = useState(null);
  const [newestOrders, setNewestOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [lowStock, setLowStock] = useState([]);

  const [year, setYear] = useState(CURRENT_YEAR);
  const [revenue, setRevenue] = useState([]);
  const [revenueLoading, setRevenueLoading] = useState(true);
  const [revenueError, setRevenueError] = useState(false);

  const load = useCallback(async () => {
    setIsLoading(true);
    const results = await Promise.allSettled([
      getDashboardData(),
      getNewestOrders(),
      getTopSellingProducts(TOP_PRODUCTS_LIMIT),
      getLowStockProducts(LOW_STOCK_THRESHOLD),
    ]);
    const [dash, orders, top, low] = results;

    setDashboardData(settledData(dash, null));
    setNewestOrders(
      orders.status === "fulfilled"
        ? Array.isArray(orders.value.data)
          ? orders.value.data
          : orders.value.data?.data || []
        : [],
    );
    setTopProducts(settledData(top, []));
    setLowStock(settledData(low, []));

    results
      .filter((r) => r.status === "rejected")
      .forEach((r) => console.error("Error loading dashboard data:", r.reason));
    setLoadError(results.some((r) => r.status === "rejected"));
    setLastUpdated(new Date());
    setIsLoading(false);
  }, []);

  const loadRevenue = useCallback(async () => {
    setRevenueLoading(true);
    setRevenueError(false);
    try {
      const response = await getMonthlyRevenue(year);
      setRevenue(
        (response.data?.data || []).map((m) => ({
          name: `T${m.month}`,
          revenue: Number(m.revenue) || 0,
          orders: m.orders,
        })),
      );
    } catch (error) {
      console.error("Error loading monthly revenue:", error);
      setRevenueError(true);
      setRevenue([]);
    } finally {
      setRevenueLoading(false);
    }
  }, [year]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    loadRevenue();
  }, [loadRevenue]);

  const refreshAll = () => {
    load();
    loadRevenue();
  };

  const ordersByStatus = dashboardData?.ordersByStatus || {};
  const statusData = Object.keys(ORDER_STATUS).map((status) => ({
    status,
    name: ORDER_STATUS[status].label,
    value: ordersByStatus[status] || 0,
  }));
  const totalStatusOrders = statusData.reduce((n, s) => n + s.value, 0);

  const yearRevenue = revenue.reduce((n, m) => n + m.revenue, 0);
  const yearOrders = revenue.reduce((n, m) => n + (m.orders || 0), 0);

  const statCards = [
    {
      label: "Tổng doanh thu",
      value: Number(dashboardData?.totalRevenue) || 0,
      formatter: (value) => currency.format(value),
      icon: DollarSign,
      accent: "text-brand-pink",
      hint: "Từ các đơn đã giao",
      wide: true,
    },
    {
      label: "Đơn hàng",
      value: dashboardData?.totalOrders || 0,
      icon: ShoppingBag,
      accent: "text-brand-blue",
      hint: `${dashboardData?.pendingOrders || 0} đơn chờ xử lý`,
    },
    {
      label: "Người dùng",
      value: dashboardData?.totalUsers || 0,
      icon: Users,
      accent: "text-[#16A34A]",
      hint: `+${dashboardData?.newUsersThisMonth || 0} trong tháng này`,
    },
    {
      label: "Sản phẩm",
      value: dashboardData?.totalProducts || 0,
      icon: Box,
      accent: "text-[#D97706]",
    },
    {
      label: "Danh mục / Thương hiệu",
      value: dashboardData?.totalCategories || 0,
      formatter: (value) => `${value} / ${dashboardData?.totalBrands || 0}`,
      icon: Layers,
      accent: "text-[#8B5CF6]",
    },
  ];

  return (
    <>
      <PageHeader
        title="Thống kê"
        description="Tổng quan hoạt động kinh doanh của cửa hàng"
        meta={
          lastUpdated && (
            <span className="inline-flex items-center gap-1.5 font-mono text-xs text-[#606562]">
              <Clock size={12} aria-hidden="true" />
              Cập nhật lúc{" "}
              {lastUpdated.toLocaleTimeString("vi-VN", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          )
        }
        actions={
          <button
            onClick={refreshAll}
            disabled={isLoading}
            className="btn-admin btn-admin-secondary"
          >
            <RefreshCw size={15} className={isLoading ? "animate-spin" : ""} aria-hidden="true" />
            Làm mới
          </button>
        }
      />

      {loadError && !isLoading && (
        <div
          role="alert"
          className="mb-6 flex flex-col gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-[#92400E] sm:flex-row sm:items-center sm:justify-between"
        >
          <span className="flex items-center gap-2">
            <AlertTriangle size={16} aria-hidden="true" />
            Một phần dữ liệu thống kê không tải được. Số liệu bên dưới có thể chưa đầy đủ.
          </span>
          <button onClick={load} className="btn-admin btn-admin-secondary h-8 text-xs">
            Thử lại
          </button>
        </div>
      )}

      {/* ── KPIs ── */}
      <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-6">
        {statCards.map((card) => (
          <div key={card.label} className={card.wide ? "col-span-2" : "col-span-1"}>
            <StatCard
              label={card.label}
              icon={card.icon}
              accent={card.accent}
              hint={isLoading ? undefined : card.hint}
              value={
                isLoading ? (
                  <span className="inline-block h-7 w-24 animate-pulse rounded bg-brand-mist" />
                ) : (
                  <CountUp
                    end={card.value}
                    duration={1.2}
                    separator="."
                    formattingFn={card.formatter}
                  />
                )
              }
            />
          </div>
        ))}
      </div>

      {/* ── Charts ── */}
      <div className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Panel
          title="Doanh thu theo tháng"
          description={
            revenueLoading
              ? "Đơn hàng đã giao"
              : `Năm ${year}: ${currency.format(yearRevenue)} · ${yearOrders} đơn đã giao`
          }
          className="xl:col-span-2"
          actions={
            <select
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              aria-label="Chọn năm"
              className="admin-input h-8 w-28 text-xs"
            >
              {YEAR_OPTIONS.map((y) => (
                <option key={y} value={y}>
                  Năm {y}
                </option>
              ))}
            </select>
          }
        >
          <div className="h-72">
            {revenueLoading ? (
              <div className="h-full w-full animate-pulse rounded bg-brand-mist" />
            ) : revenueError ? (
              <EmptyState
                icon={AlertTriangle}
                title="Không tải được doanh thu"
                action={
                  <button onClick={loadRevenue} className="btn-admin btn-admin-secondary">
                    Thử lại
                  </button>
                }
              />
            ) : yearRevenue === 0 ? (
              <EmptyState
                icon={TrendingUp}
                title={`Chưa có doanh thu trong năm ${year}`}
                description="Doanh thu được tính từ các đơn hàng đã giao thành công."
              />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenue} margin={{ left: 0, right: 8 }}>
                  <CartesianGrid vertical={false} stroke="#e5e7eb" />
                  <XAxis
                    dataKey="name"
                    stroke="#606562"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#606562"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    width={48}
                    tickFormatter={(v) => compactNumber.format(v)}
                  />
                  <Tooltip
                    contentStyle={tooltipStyle}
                    formatter={(value, name, item) => [
                      `${currency.format(value)} · ${item.payload.orders} đơn`,
                      "Doanh thu",
                    ]}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    name="Doanh thu"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    fill="#3B82F6"
                    fillOpacity={0.08}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </Panel>

        <Panel title="Trạng thái đơn hàng" description={`${totalStatusOrders} đơn hàng`}>
          {isLoading ? (
            <div className="h-56 w-full animate-pulse rounded bg-brand-mist" />
          ) : totalStatusOrders === 0 ? (
            <EmptyState icon={ShoppingBag} title="Chưa có đơn hàng" />
          ) : (
            <>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData.filter((s) => s.value > 0)}
                      cx="50%"
                      cy="50%"
                      innerRadius={58}
                      outerRadius={84}
                      paddingAngle={2}
                      dataKey="value"
                      strokeWidth={0}
                    >
                      {statusData
                        .filter((s) => s.value > 0)
                        .map((s) => (
                          <Cell key={s.status} fill={STATUS_COLORS[s.status]} />
                        ))}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <ul className="mt-3 space-y-2 text-sm">
                {statusData.map((s) => (
                  <li key={s.status} className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-[#363537]">
                      <span
                        className="h-2.5 w-2.5 rounded-sm"
                        style={{ backgroundColor: STATUS_COLORS[s.status] }}
                        aria-hidden="true"
                      />
                      {s.name}
                    </span>
                    <span className="font-mono text-xs tabular-nums text-[#606562]">
                      {s.value}
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </Panel>
      </div>

      {/* ── Best sellers & low stock ── */}
      <div className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Panel
          title="Sản phẩm bán chạy"
          description="Theo số lượng bán, không tính đơn đã hủy"
          bodyClassName=""
        >
          {isLoading ? (
            <LoadingRows rows={TOP_PRODUCTS_LIMIT} cols={3} />
          ) : topProducts.length === 0 ? (
            <EmptyState
              icon={PackageCheck}
              title="Chưa có dữ liệu bán hàng"
              description="Sản phẩm bán chạy sẽ xuất hiện khi có đơn hàng."
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="admin-table" aria-label="Sản phẩm bán chạy">
                <thead>
                  <tr>
                    <th className="w-10">#</th>
                    <th>Sản phẩm</th>
                    <th className="!text-right">Đã bán</th>
                    <th className="!text-right">Doanh thu</th>
                  </tr>
                </thead>
                <tbody>
                  {topProducts.map((p, index) => (
                    <tr key={p.productId}>
                      <td className="font-mono text-xs text-[#606562]">{index + 1}</td>
                      <td className="max-w-[240px] truncate font-medium">{p.productName}</td>
                      <td className="text-right font-mono tabular-nums">{p.totalSold}</td>
                      <td className="whitespace-nowrap text-right font-mono tabular-nums">
                        {currency.format(p.totalRevenue || 0)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Panel>

        <Panel
          title="Sắp hết hàng"
          description={`Size còn từ ${LOW_STOCK_THRESHOLD} sản phẩm trở xuống`}
          bodyClassName=""
          actions={
            <button
              onClick={() => navigate("/admin/product/list")}
              className="btn-admin btn-admin-ghost"
            >
              Quản lý kho
              <ArrowRight size={14} aria-hidden="true" />
            </button>
          }
        >
          {isLoading ? (
            <LoadingRows rows={4} cols={3} />
          ) : lowStock.length === 0 ? (
            <EmptyState
              icon={PackageCheck}
              title="Tồn kho ổn định"
              description="Không có size nào sắp hết hàng."
            />
          ) : (
            <div className="max-h-[320px] overflow-auto">
              <table className="admin-table" aria-label="Sản phẩm sắp hết hàng">
                <thead>
                  <tr>
                    <th>Sản phẩm</th>
                    <th>Size</th>
                    <th className="!text-right">Tồn kho</th>
                  </tr>
                </thead>
                <tbody>
                  {lowStock.map((s) => (
                    <tr key={s.sizeId}>
                      <td className="max-w-[240px] truncate font-medium">{s.productName}</td>
                      <td className="font-mono text-xs">{s.sizeName}</td>
                      <td className="text-right">
                        {s.quantity <= 0 ? (
                          <Badge tone="danger">
                            <PackageX size={12} aria-hidden="true" />
                            Hết hàng
                          </Badge>
                        ) : (
                          <Badge tone="warning">
                            <span className="font-mono">{s.quantity}</span> còn lại
                          </Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Panel>
      </div>

      {/* ── Recent orders ── */}
      <Panel
        title="Đơn hàng gần đây"
        bodyClassName=""
        actions={
          <button
            onClick={() => navigate("/admin/manage/orders")}
            className="btn-admin btn-admin-ghost"
          >
            Xem tất cả
            <ArrowRight size={14} aria-hidden="true" />
          </button>
        }
      >
        {isLoading ? (
          <LoadingRows rows={3} cols={4} />
        ) : newestOrders.length === 0 ? (
          <EmptyState
            icon={ShoppingBag}
            title="Chưa có đơn hàng"
            description="Đơn hàng mới sẽ xuất hiện tại đây."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="admin-table" aria-label="Recent orders">
              <thead>
                <tr>
                  <th>Mã đơn</th>
                  <th>Khách hàng</th>
                  <th>Trạng thái</th>
                  <th className="!text-right">Tổng tiền</th>
                </tr>
              </thead>
              <tbody>
                {newestOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="font-mono text-xs">#{String(order.id).padStart(4, "0")}</td>
                    <td>{order.user?.fullName || "—"}</td>
                    <td>
                      <StatusBadge status={order.orderStatus} />
                    </td>
                    <td className="text-right font-mono tabular-nums">
                      {currency.format(order.totalAmount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>
    </>
  );
};

export default DashBoard;
