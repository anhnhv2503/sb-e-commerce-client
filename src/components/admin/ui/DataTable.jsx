import { LoadingRows } from "@/components/admin/ui/AdminKit";
import { ChevronDown, GripVertical, RotateCcw } from "lucide-react";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";

/**
 * DataTable — the shared table for every admin management page.
 *
 * Column definition:
 *   {
 *     id: "email",                    // unique, stable (used for ordering + persistence)
 *     header: "Email",                // node; omit/empty for icon-only columns
 *     cell: (row, index) => node,     // cell renderer
 *     align: "left" | "right",
 *     className: "",                  // td classes
 *     headerClassName: "",            // th classes
 *     pin: "start" | "end",           // pinned columns cannot be dragged
 *     stopPropagation: false,         // keep clicks in this cell from triggering onRowClick
 *   }
 *
 * Middle (unpinned) columns can be reordered by dragging their header, or with
 * the keyboard (focus the grip, then ← / →). The order is saved per table in
 * localStorage under `storageKey`.
 *
 * States: `loading` shows skeleton rows; `error` / `empty` are nodes rendered
 * instead of the table (usually <EmptyState />).
 *
 * Expandable rows: pass `renderExpanded(row)` — an expand toggle column is
 * pinned at the start. `expandOnRowClick` lets the whole row toggle it.
 */

const STORAGE_PREFIX = "admin-table-columns:";

const readStoredOrder = (key) => {
  if (!key) return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_PREFIX + key);
    const parsed = raw ? JSON.parse(raw) : null;
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
};

const writeStoredOrder = (key, order) => {
  if (!key) return;
  try {
    if (order) window.localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(order));
    else window.localStorage.removeItem(STORAGE_PREFIX + key);
  } catch {
    /* storage unavailable — ordering still works for this session */
  }
};

/** Keep a stored order valid when columns are added/removed in code. */
const reconcileOrder = (stored, defaultIds) => {
  if (!stored) return defaultIds;
  const known = stored.filter((id) => defaultIds.includes(id));
  const added = defaultIds.filter((id) => !known.includes(id));
  return [...known, ...added];
};

const moveItem = (list, fromId, toIndex) => {
  const next = list.filter((id) => id !== fromId);
  next.splice(toIndex, 0, fromId);
  return next;
};

const sameOrder = (a, b) => a.length === b.length && a.every((id, i) => id === b[i]);

const alignClass = (col) => (col.align === "right" ? "!text-right" : "");

const DataTable = ({
  columns,
  data,
  getRowId = (row) => row.id,
  storageKey,
  minWidth,
  loading = false,
  loadingRows = 6,
  error = null,
  empty = null,
  onRowClick,
  rowClassName,
  renderExpanded,
  expandOnRowClick = false,
  ariaLabel,
}) => {
  /* ── Column ordering ── */
  const startCols = columns.filter((c) => c.pin === "start");
  const endCols = columns.filter((c) => c.pin === "end");
  const middleCols = columns.filter((c) => !c.pin);
  const defaultIds = middleCols.map((c) => c.id);
  const defaultKey = defaultIds.join("|");

  const [order, setOrder] = useState(() =>
    reconcileOrder(readStoredOrder(storageKey), defaultIds),
  );

  // Columns can change between renders (e.g. conditional columns).
  useEffect(() => {
    setOrder((prev) => {
      const next = reconcileOrder(prev, defaultIds);
      return sameOrder(prev, next) ? prev : next;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultKey]);

  const isCustomized = !sameOrder(order, defaultIds);

  const applyOrder = useCallback(
    (next) => {
      setOrder(next);
      writeStoredOrder(storageKey, sameOrder(next, defaultIds) ? null : next);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [storageKey, defaultKey],
  );

  const resetOrder = () => applyOrder(defaultIds);

  const orderedMiddle = useMemo(() => {
    const byId = Object.fromEntries(middleCols.map((c) => [c.id, c]));
    return order.map((id) => byId[id]).filter(Boolean);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, columns]);

  /* ── Expandable rows ── */
  const [expandedId, setExpandedId] = useState(null);
  const toggleExpand = (id) => setExpandedId((cur) => (cur === id ? null : id));

  const expandCol = renderExpanded
    ? {
        id: "__expand",
        pin: "start",
        headerClassName: "w-10",
        className: "!pr-0",
        stopPropagation: true,
        ariaLabel: "Mở rộng",
        cell: (row) => {
          const id = getRowId(row);
          const expanded = expandedId === id;
          return (
            <button
              onClick={() => toggleExpand(id)}
              aria-expanded={expanded}
              aria-label={expanded ? "Thu gọn" : "Xem chi tiết"}
              className="btn-admin btn-admin-ghost btn-admin-icon h-7 w-7"
            >
              <ChevronDown
                size={16}
                className={`transition-transform ${expanded ? "rotate-180" : ""}`}
              />
            </button>
          );
        },
      }
    : null;

  const visibleCols = [
    ...(expandCol ? [expandCol] : []),
    ...startCols,
    ...orderedMiddle,
    ...endCols,
  ];

  /* ── Drag & drop (native HTML5) ── */
  const [dragId, setDragId] = useState(null);
  const [dropTarget, setDropTarget] = useState(null); // { id, side: "before" | "after" }

  const endDrag = () => {
    setDragId(null);
    setDropTarget(null);
  };

  const handleDragStart = (e, id) => {
    setDragId(id);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", id); // required by Firefox
  };

  const handleDragOver = (e, id) => {
    if (!dragId) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    const rect = e.currentTarget.getBoundingClientRect();
    const side = e.clientX < rect.left + rect.width / 2 ? "before" : "after";
    if (dropTarget?.id !== id || dropTarget?.side !== side) setDropTarget({ id, side });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (dragId && dropTarget && dropTarget.id !== dragId) {
      const without = order.filter((x) => x !== dragId);
      const targetIndex = without.indexOf(dropTarget.id);
      const insertAt = dropTarget.side === "before" ? targetIndex : targetIndex + 1;
      const next = moveItem(order, dragId, insertAt);
      if (!sameOrder(next, order)) applyOrder(next);
    }
    endDrag();
  };

  const handleGripKeyDown = (e, id) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const index = order.indexOf(id);
    const nextIndex = e.key === "ArrowLeft" ? index - 1 : index + 1;
    if (nextIndex < 0 || nextIndex >= order.length) return;
    applyOrder(moveItem(order, id, nextIndex));
    // Keep focus on the moved grip after re-render.
    requestAnimationFrame(() =>
      document.querySelector(`[data-column-grip="${storageKey}:${id}"]`)?.focus(),
    );
  };

  /* ── States ── */
  if (loading) return <LoadingRows rows={loadingRows} cols={Math.min(visibleCols.length, 6)} />;
  if (error) return error;
  if (!data || data.length === 0) return empty;

  const lastIndex = visibleCols.length - 1;

  return (
    <div className="overflow-x-auto">
      <table
        className="admin-table"
        style={minWidth ? { minWidth } : undefined}
        aria-label={ariaLabel}
      >
        <thead>
          <tr>
            {visibleCols.map((col, i) => {
              const movable = !col.pin;
              const isDragging = dragId === col.id;
              const indicator =
                dropTarget?.id === col.id && dragId !== col.id ? dropTarget.side : null;
              const label = typeof col.header === "string" ? col.header : col.id;

              return (
                <th
                  key={col.id}
                  aria-label={col.header ? undefined : col.ariaLabel}
                  draggable={movable}
                  onDragStart={movable ? (e) => handleDragStart(e, col.id) : undefined}
                  onDragOver={movable ? (e) => handleDragOver(e, col.id) : undefined}
                  onDragLeave={
                    movable
                      ? (e) => {
                          if (!e.currentTarget.contains(e.relatedTarget)) setDropTarget(null);
                        }
                      : undefined
                  }
                  onDrop={movable ? handleDrop : undefined}
                  onDragEnd={movable ? endDrag : undefined}
                  className={[
                    "relative select-none",
                    movable ? "group cursor-grab active:cursor-grabbing" : "",
                    isDragging ? "opacity-40" : "",
                    indicator === "before"
                      ? "before:absolute before:inset-y-0 before:left-0 before:w-0.5 before:bg-brand-ink"
                      : "",
                    indicator === "after"
                      ? "after:absolute after:inset-y-0 after:right-0 after:w-0.5 after:bg-brand-ink"
                      : "",
                    alignClass(col),
                    col.headerClassName || "",
                  ].join(" ")}
                >
                  <span
                    className={`inline-flex items-center gap-1 ${
                      col.align === "right" ? "flex-row-reverse" : ""
                    }`}
                  >
                    {movable && (
                      <button
                        type="button"
                        tabIndex={0}
                        data-column-grip={`${storageKey}:${col.id}`}
                        onKeyDown={(e) => handleGripKeyDown(e, col.id)}
                        aria-label={`Di chuyển cột ${label} (dùng phím mũi tên trái/phải)`}
                        title="Kéo để sắp xếp cột"
                        className="-ml-1 rounded text-[#9ca3af] opacity-40 transition-opacity hover:text-brand-ink focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-blue group-hover:opacity-100"
                      >
                        <GripVertical size={13} aria-hidden="true" />
                      </button>
                    )}
                    {col.header}
                  </span>

                  {/* Reset lives in the trailing header so every table gets it for free */}
                  {i === lastIndex && isCustomized && (
                    <button
                      type="button"
                      onClick={resetOrder}
                      className="ml-2 inline-flex items-center gap-1 align-middle text-[11px] font-medium normal-case tracking-normal text-brand-blue hover:underline"
                      title="Khôi phục thứ tự cột mặc định"
                    >
                      <RotateCcw size={12} aria-hidden="true" />
                      Đặt lại cột
                    </button>
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => {
            const id = getRowId(row);
            const expanded = renderExpanded && expandedId === id;
            const clickable = Boolean(onRowClick || (renderExpanded && expandOnRowClick));
            const handleRowClick = clickable
              ? () => {
                  if (renderExpanded && expandOnRowClick) toggleExpand(id);
                  onRowClick?.(row);
                }
              : undefined;

            return (
              <Fragment key={id}>
                <tr
                  onClick={handleRowClick}
                  className={[
                    clickable ? "cursor-pointer" : "",
                    expanded ? "[&>td]:bg-[#f7f8f9]" : "",
                    rowClassName?.(row) || "",
                  ].join(" ")}
                >
                  {visibleCols.map((col) => (
                    <td
                      key={col.id}
                      onClick={col.stopPropagation ? (e) => e.stopPropagation() : undefined}
                      className={`${col.align === "right" ? "text-right" : ""} ${
                        col.className || ""
                      }`}
                    >
                      {col.cell(row, rowIndex)}
                    </td>
                  ))}
                </tr>
                {expanded && (
                  <tr>
                    <td colSpan={visibleCols.length} className="!bg-[#f7f8f9] !p-0">
                      {renderExpanded(row)}
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
