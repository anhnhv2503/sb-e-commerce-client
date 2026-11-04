import {
  Badge,
  EmptyState,
  LoadingRows,
  PageHeader,
  Panel,
  StatCard,
  StatusBadge,
} from "@/components/admin/ui/AdminKit";
import useCurrencyFormat from "@/components/hooks/useCurrencyFormat";
import {
  getDashboardData,
  getNewestOrders,
} from "@/components/service/ApiFunctions";
import { useDocumentTitle } from "@uidotdev/usehooks";
import {
  AlertTriangle,
  ArrowRight,
  Box,
  Clock,
  DollarSign,
  Layers,
  RefreshCw,
  ShoppingBag,
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

/* Sample series — the backend does not expose monthly revenue or
   category distribution yet, so these charts are labelled as illustrative. */
const mockChartData = [
  { name: "T1", value: 400 },
  { name: "T2", value: 300 },
  { name: "T3", value: 600 },
  { name: "T4", value: 800 },
  { name: "T5", value: 500 },
  { name: "T6", value: 900 },
  { name: "T7", value: 700 },
  { name: "T8", value: 1000 },
  { name: "T9", value: 1200 },
  { name: "T10", value: 900 },
  { name: "T11", value: 1300 },
  { name: "T12", value: 1600 },
];

const pieData = [
  { name: "Giày", value: 540 },
  { name: "Áo", value: 370 },
  { name: "Mũ", value: 210 },
  { name: "Quần", value: 290 },
  { name: "Phụ kiện", value: 190 },
];

const PIE_COLORS = ["#3B82F6", "#8B5CF6", "#D97706", "#16A34A", "#DC2626"];

/**
 * DashBoard — KPI tiles, charts and recent orders in flat panels.
 */
const DashBoard = () => {
  useDocumentTitle("Thống Kê — VA Shop Admin");
  const navigate = useNavigate();
  const currency = useCurrencyFormat();
  const [isLoading, setIsLoading] = useState(true);
  const [newestOrders, setNewestOrders] = useState([]);
  const [dashboardData, setDashboardData] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [loadError, setLoadError] = useState(false);

  const load = useCallback(async () => {
    setIsLoading(true);
    const [dash, orders] = await Promise.allSettled([
      getDashboardData(),
      getNewestOrders(),
    ]);
    if (dash.status === "fulfilled") setDashboardData(dash.value.data?.data);
    else console.error("Error fetching dashboard data:", dash.reason);
    if (orders.status === "fulfilled")
      setNewestOrders(
        Array.isArray(orders.value.data)
          ? orders.value.data
          : orders.value.data?.data || [],
      );
    else console.error("Error fetching newest orders:", orders.reason);
    setLoadError(dash.status === "rejected" || orders.status === "rejected");
    setLastUpdated(new Date());
    setIsLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const statCards = [
    {
      label: "Tổng doanh thu",
      value: dashboardData?.totalRevenue || 0,
      formatter: (value) => currency.format(value),
      icon: DollarSign,
      accent: "text-brand-pink",
      wide: true,
    },
    {
      label: "Đơn hàng",
      value: dashboardData?.totalOrders || 0,
      icon: ShoppingBag,
      accent: "text-brand-blue",
    },
    {
      label: "Sản phẩm",
      value: dashboardData?.totalProducts || 0,
      icon: Box,
      accent: "text-[#D97706]",
    },
    {
      label: "Danh mục",
      value: dashboardData?.totalCategories || 0,
      icon: Layers,
      accent: "text-[#8B5CF6]",
    },
    {
      label: "Người dùng",
      value: dashboardData?.totalUsers || 0,
      icon: Users,
      accent: "text-[#16A34A]",
    },
  ];

  const tooltipStyle = {
    backgroundColor: "#111827",
    border: "none",
    borderRadius: "4px",
    color: "#fff",
    fontSize: "12px",
  };

  const sampleBadge = <Badge tone="neutral">Dữ liệu minh họa</Badge>;

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
            onClick={load}
            disabled={isLoading}
            className="btn-admin btn-admin-secondary"
          >
            <RefreshCw
              size={15}
              className={isLoading ? "animate-spin" : ""}
              aria-hidden="true"
            />
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
          <div
            key={card.label}
            className={card.wide ? "col-span-2" : "col-span-1"}
          >
            <StatCard
              label={card.label}
              icon={card.icon}
              accent={card.accent}
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
          actions={sampleBadge}
          className="xl:col-span-2"
        >
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockChartData} margin={{ left: -16, right: 8 }}>
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
                />
                <Tooltip contentStyle={tooltipStyle} />
                <Area
                  type="monotone"
                  dataKey="value"
                  name="Doanh thu"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  fill="#3B82F6"
                  fillOpacity={0.08}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Phân bổ sản phẩm" actions={sampleBadge}>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={58}
                  outerRadius={84}
                  paddingAngle={2}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {pieData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={PIE_COLORS[index % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="mt-3 space-y-2 text-sm">
            {pieData.map((d, i) => (
              <li key={d.name} className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-[#363537]">
                  <span
                    className="h-2.5 w-2.5 rounded-sm"
                    style={{ backgroundColor: PIE_COLORS[i] }}
                    aria-hidden="true"
                  />
                  {d.name}
                </span>
                <span className="font-mono text-xs tabular-nums text-[#606562]">
                  {d.value}
                </span>
              </li>
            ))}
          </ul>
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
          <LoadingRows rows={5} cols={4} />
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
                    <td className="font-mono text-xs">
                      #{String(order.id).padStart(4, "0")}
                    </td>
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
