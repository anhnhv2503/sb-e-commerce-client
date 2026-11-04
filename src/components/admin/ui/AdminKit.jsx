/**
 * AdminKit — shared building blocks for the admin console.
 * Flat panels on a soft canvas, hairline borders, no shadows (see CLAUDE.md).
 */

/* ── Order status (shared by dashboard, order list and order table) ── */
export const ORDER_STATUS = {
  PENDING: {
    label: "Chờ xử lý",
    badge: "bg-amber-50 text-[#B45309] border-amber-200",
    dot: "bg-[#D97706]",
  },
  IN_PROGRESS: {
    label: "Đang xử lý",
    badge: "bg-blue-50 text-[#2563EB] border-blue-200",
    dot: "bg-[#3B82F6]",
  },
  SHIPPING: {
    label: "Đang giao",
    badge: "bg-purple-50 text-[#7C3AED] border-purple-200",
    dot: "bg-[#8B5CF6]",
  },
  DELIVERED: {
    label: "Đã giao",
    badge: "bg-green-50 text-[#15803D] border-green-200",
    dot: "bg-[#16A34A]",
  },
  CANCELLED: {
    label: "Đã hủy",
    badge: "bg-red-50 text-[#DC2626] border-red-200",
    dot: "bg-[#DC2626]",
  },
};

export const StatusBadge = ({ status, label, className = "" }) => {
  const cfg = ORDER_STATUS[status] || {
    label: label || status,
    badge: "bg-gray-50 text-gray-600 border-gray-200",
    dot: "bg-gray-400",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2 py-0.5 text-xs font-medium ${cfg.badge} ${className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} aria-hidden="true" />
      {label || cfg.label}
    </span>
  );
};

/* Generic tone badge for stock / misc states */
const TONES = {
  neutral: "bg-gray-50 text-gray-600 border-gray-200",
  success: "bg-green-50 text-[#15803D] border-green-200",
  warning: "bg-amber-50 text-[#B45309] border-amber-200",
  danger: "bg-red-50 text-[#DC2626] border-red-200",
  info: "bg-blue-50 text-[#2563EB] border-blue-200",
  pink: "bg-pink-50 text-brand-pink border-pink-200",
};

export const Badge = ({ tone = "neutral", children, className = "" }) => (
  <span
    className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full border px-2 py-0.5 text-xs font-medium ${TONES[tone]} ${className}`}
  >
    {children}
  </span>
);

/* ── Page header: breadcrumb trail, title, description, actions ── */
export const PageHeader = ({ title, description, actions, meta }) => (
  <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
    <div className="min-w-0">
      <h1 className="font-label text-2xl text-brand-ink">{title}</h1>
      {description && (
        <p className="mt-1.5 text-sm text-[#606562]">{description}</p>
      )}
      {meta && <div className="mt-2">{meta}</div>}
    </div>
    {actions && (
      <div className="flex flex-shrink-0 flex-wrap items-center gap-2">
        {actions}
      </div>
    )}
  </div>
);

/* ── Panel: white surface with optional header bar and footer ── */
export const Panel = ({
  title,
  description,
  actions,
  footer,
  children,
  bodyClassName = "p-5",
  className = "",
}) => (
  <section
    className={`overflow-hidden rounded-lg border border-hairline bg-white ${className}`}
  >
    {(title || actions) && (
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline px-5 py-3.5">
        <div className="min-w-0">
          {title && (
            <h2 className="text-sm font-semibold text-brand-ink">{title}</h2>
          )}
          {description && (
            <p className="mt-0.5 text-xs text-[#606562]">{description}</p>
          )}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </header>
    )}
    <div className={bodyClassName}>{children}</div>
    {footer && (
      <footer className="border-t border-hairline bg-[#f7f8f9] px-5 py-3">
        {footer}
      </footer>
    )}
  </section>
);

/* ── KPI tile ── */
export const StatCard = ({ label, value, icon: Icon, accent = "text-brand-ink", hint }) => (
  <div className="rounded-lg border border-hairline bg-white p-4">
    <div className="flex items-start justify-between gap-3">
      <p className="text-xs font-medium uppercase tracking-wide text-[#606562]">
        {label}
      </p>
      {Icon && (
        <span className={`flex h-8 w-8 items-center justify-center rounded bg-brand-mist ${accent}`}>
          <Icon size={16} strokeWidth={1.75} aria-hidden="true" />
        </span>
      )}
    </div>
    <p className="mt-3 font-mono text-2xl font-medium tabular-nums text-brand-ink">
      {value}
    </p>
    {hint && <p className="mt-1 text-xs text-[#606562]">{hint}</p>}
  </div>
);

/* ── Empty / placeholder state ── */
export const EmptyState = ({ icon: Icon, title, description, action }) => (
  <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
    {Icon && (
      <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-brand-mist text-[#606562]">
        <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
      </span>
    )}
    <h3 className="text-sm font-semibold text-brand-ink">{title}</h3>
    {description && (
      <p className="mt-1 max-w-sm text-sm text-[#606562]">{description}</p>
    )}
    {action && <div className="mt-5">{action}</div>}
  </div>
);

/* ── Loading block for panels/tables ── */
export const LoadingRows = ({ rows = 5, cols = 4 }) => (
  <div className="divide-y divide-hairline" aria-busy="true" aria-label="Đang tải">
    {Array.from({ length: rows }).map((_, r) => (
      <div key={r} className="flex gap-4 px-4 py-4">
        {Array.from({ length: cols }).map((__, c) => (
          <div
            key={c}
            className="h-4 flex-1 animate-pulse rounded bg-brand-mist"
            style={{ maxWidth: c === 0 ? "40%" : undefined }}
          />
        ))}
      </div>
    ))}
  </div>
);
