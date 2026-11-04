import AddMoreSize from "@/components/admin/pages/AddMoreSize";
import {
  Badge,
  EmptyState,
  LoadingRows,
  PageHeader,
  Panel,
} from "@/components/admin/ui/AdminKit";
import Paginator from "@/components/common/Paginator";
import useCurrencyFormat from "@/components/hooks/useCurrencyFormat";
import { getProducts } from "@/components/service/ApiFunctions";
import { useDebounce, useDocumentTitle } from "@uidotdev/usehooks";
import {
  AlertTriangle,
  ChevronDown,
  ExternalLink,
  Image as ImageIcon,
  PackageSearch,
  Pencil,
  PlusCircle,
  RefreshCw,
  Search,
} from "lucide-react";
import { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const PAGE_SIZES = [5, 10, 20];
const LOW_STOCK = 10;

const brandName = (brand) =>
  typeof brand === "string" ? brand : brand?.name || "—";

const totalStock = (sizes) =>
  (sizes || []).reduce((total, s) => total + (s.quantity || 0), 0);

const stockStatus = (sizes) => {
  if (!sizes || sizes.length === 0)
    return { tone: "neutral", label: "Chưa có size" };
  const total = totalStock(sizes);
  if (total <= 0) return { tone: "danger", label: "Hết hàng" };
  if (total <= LOW_STOCK || sizes.some((s) => s.quantity <= 0))
    return { tone: "warning", label: "Sắp hết" };
  return { tone: "success", label: "Còn hàng" };
};

/**
 * ProductList — inventory data table with search, page size and
 * expandable detail rows.
 */
const ProductList = () => {
  useDocumentTitle("Kho Hàng — VA Shop Admin");
  const navigate = useNavigate();
  const currency = useCurrencyFormat();

  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [expandedProduct, setExpandedProduct] = useState(null);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search.trim(), 400);

  const fetchProducts = async () => {
    setIsLoading(true);
    setLoadError(false);
    try {
      const response = await getProducts(
        currentPage,
        pageSize,
        undefined,
        undefined,
        debouncedSearch || undefined,
      );
      setProducts(response.data?.content || []);
      setTotalPages(response.data?.page?.totalPages || 0);
      setTotalElements(response.data?.page?.totalElements ?? null);
    } catch (error) {
      console.error("Error fetching products: ", error);
      setLoadError(true);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  // A new search or page size sends the table back to the first page
  // (one request only: reset the page first, fetch on the next pass).
  const filtersKey = `${pageSize}|${debouncedSearch}`;
  const lastFilters = useRef(filtersKey);

  useEffect(() => {
    if (lastFilters.current !== filtersKey) {
      lastFilters.current = filtersKey;
      if (currentPage !== 0) {
        setCurrentPage(0);
        return;
      }
    }
    fetchProducts();
  }, [currentPage, filtersKey]);

  const toggleExpand = (id) =>
    setExpandedProduct(expandedProduct === id ? null : id);

  return (
    <>
      <PageHeader
        title="Sản phẩm"
        description="Quản lý thông tin, tồn kho theo size và cập nhật sản phẩm"
        actions={
          <button
            onClick={() => navigate("/admin/product/add")}
            className="btn-admin btn-admin-primary"
          >
            <PlusCircle size={16} aria-hidden="true" />
            Thêm sản phẩm
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
                <span className="font-mono text-brand-ink">
                  {currentPage + 1}
                </span>{" "}
                /{" "}
                <span className="font-mono text-brand-ink">{totalPages}</span>
                {totalElements !== null && (
                  <>
                    {" "}
                    · <span className="font-mono">{totalElements}</span> sản
                    phẩm
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
        {/* Toolbar */}
        <div className="flex flex-col gap-3 border-b border-hairline px-4 py-3 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-sm">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]"
              aria-hidden="true"
            />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm theo tên sản phẩm..."
              aria-label="Tìm sản phẩm"
              className="admin-input pl-9"
            />
          </div>
          <div className="flex items-center gap-2">
            <label
              htmlFor="page-size"
              className="whitespace-nowrap text-xs text-[#606562]"
            >
              Hiển thị
            </label>
            <select
              id="page-size"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="admin-input w-20"
            >
              {PAGE_SIZES.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
            <button
              onClick={fetchProducts}
              disabled={isLoading}
              className="btn-admin btn-admin-secondary btn-admin-icon"
              aria-label="Làm mới"
              title="Làm mới"
            >
              <RefreshCw size={15} className={isLoading ? "animate-spin" : ""} />
            </button>
          </div>
        </div>

        {isLoading ? (
          <LoadingRows rows={pageSize > 8 ? 8 : pageSize} cols={6} />
        ) : loadError ? (
          <EmptyState
            icon={AlertTriangle}
            title="Không thể tải sản phẩm"
            description="Kiểm tra kết nối tới máy chủ rồi thử lại."
            action={
              <button onClick={fetchProducts} className="btn-admin btn-admin-secondary">
                <RefreshCw size={15} aria-hidden="true" />
                Thử lại
              </button>
            }
          />
        ) : products.length === 0 ? (
          <EmptyState
            icon={PackageSearch}
            title={debouncedSearch ? "Không tìm thấy sản phẩm" : "Kho hàng trống"}
            description={
              debouncedSearch
                ? `Không có sản phẩm nào khớp với "${debouncedSearch}".`
                : "Chưa có sản phẩm nào trong hệ thống. Hãy thêm sản phẩm đầu tiên."
            }
            action={
              debouncedSearch ? (
                <button
                  onClick={() => setSearch("")}
                  className="btn-admin btn-admin-secondary"
                >
                  Xóa tìm kiếm
                </button>
              ) : (
                <button
                  onClick={() => navigate("/admin/product/add")}
                  className="btn-admin btn-admin-primary"
                >
                  <PlusCircle size={16} aria-hidden="true" />
                  Thêm sản phẩm
                </button>
              )
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="admin-table min-w-[960px]">
              <thead>
                <tr>
                  <th className="w-10" aria-label="Mở rộng" />
                  <th>Sản phẩm</th>
                  <th>Danh mục</th>
                  <th>Thương hiệu</th>
                  <th className="!text-right">Giá bán</th>
                  <th>Tồn kho theo size</th>
                  <th>Trạng thái</th>
                  <th className="!text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => {
                  const expanded = expandedProduct === product.id;
                  const status = stockStatus(product.size);
                  return (
                    <Fragment key={product.id}>
                      <tr className={expanded ? "[&>td]:bg-[#f7f8f9]" : ""}>
                        <td className="!pr-0">
                          <button
                            onClick={() => toggleExpand(product.id)}
                            aria-expanded={expanded}
                            aria-label={expanded ? "Thu gọn" : "Xem chi tiết"}
                            className="btn-admin btn-admin-ghost btn-admin-icon h-7 w-7"
                          >
                            <ChevronDown
                              size={16}
                              className={`transition-transform ${expanded ? "rotate-180" : ""}`}
                            />
                          </button>
                        </td>
                        <td>
                          <div className="flex items-center gap-3">
                            <img
                              src={product.images?.[0]?.url}
                              alt=""
                              className="h-12 w-10 flex-shrink-0 rounded bg-brand-mist object-cover"
                            />
                            <div className="min-w-0">
                              <p className="max-w-[260px] truncate font-medium">
                                {product.name}
                              </p>
                              <p className="font-mono text-xs text-[#606562]">
                                ID #{product.id}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td>
                          {product.category?.name ? (
                            <Badge tone="info">{product.category.name}</Badge>
                          ) : (
                            "—"
                          )}
                        </td>
                        <td className="text-[#363537]">
                          {brandName(product.brand)}
                        </td>
                        <td className="whitespace-nowrap text-right font-mono tabular-nums">
                          {currency.format(product.price)}
                        </td>
                        <td>
                          <div className="flex max-w-[240px] flex-wrap gap-1">
                            {product.size?.length ? (
                              product.size.map((s) => (
                                <span
                                  key={s.id ?? s.sizeName}
                                  className={`inline-flex items-center gap-1 rounded border px-1.5 py-0.5 font-mono text-[11px] ${
                                    s.quantity <= 0
                                      ? "border-red-200 bg-red-50 text-[#DC2626]"
                                      : "border-hairline bg-white text-brand-ink"
                                  }`}
                                >
                                  {s.sizeName}
                                  <span className="text-[#9ca3af]">·</span>
                                  {s.quantity}
                                </span>
                              ))
                            ) : (
                              <span className="text-xs text-[#9ca3af]">—</span>
                            )}
                          </div>
                        </td>
                        <td>
                          <Badge tone={status.tone}>{status.label}</Badge>
                        </td>
                        <td>
                          <div className="flex items-center justify-end gap-1">
                            <AddMoreSize
                              productId={product.id}
                              fetchProduct={fetchProducts}
                            />
                            <a
                              href={`/product/${product.id}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-admin btn-admin-ghost btn-admin-icon"
                              aria-label="Xem trên cửa hàng"
                              title="Xem trên cửa hàng"
                            >
                              <ExternalLink size={15} />
                            </a>
                            <button
                              disabled
                              className="btn-admin btn-admin-ghost btn-admin-icon"
                              aria-label="Sửa sản phẩm (chưa hỗ trợ)"
                              title="Chức năng sửa chưa được hỗ trợ"
                            >
                              <Pencil size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>

                      {expanded && (
                        <tr>
                          <td colSpan={8} className="!bg-[#f7f8f9] !p-0">
                            <div className="grid grid-cols-1 gap-6 px-6 py-5 lg:grid-cols-3">
                              <div>
                                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#606562]">
                                  Thông tin
                                </h4>
                                <dl className="divide-y divide-hairline rounded border border-hairline bg-white text-sm">
                                  {[
                                    ["Mã sản phẩm", `#${product.id}`, true],
                                    [
                                      "Ngày tạo",
                                      product.createdAt
                                        ? new Date(product.createdAt).toLocaleDateString("vi-VN")
                                        : "—",
                                    ],
                                    [
                                      "Cập nhật",
                                      product.updatedAt
                                        ? new Date(product.updatedAt).toLocaleDateString("vi-VN")
                                        : "—",
                                    ],
                                    ["Tổng tồn kho", totalStock(product.size), true],
                                  ].map(([k, v, mono]) => (
                                    <div
                                      key={k}
                                      className="flex justify-between gap-4 px-3 py-2"
                                    >
                                      <dt className="text-[#606562]">{k}</dt>
                                      <dd className={mono ? "font-mono" : ""}>
                                        {v}
                                      </dd>
                                    </div>
                                  ))}
                                </dl>
                              </div>
                              <div>
                                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#606562]">
                                  Mô tả
                                </h4>
                                <p className="rounded border border-hairline bg-white p-3 text-sm leading-relaxed text-[#363537]">
                                  {product.description || "Chưa có mô tả."}
                                </p>
                              </div>
                              <div>
                                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#606562]">
                                  Hình ảnh ({product.images?.length || 0})
                                </h4>
                                {product.images?.length ? (
                                  <div className="grid grid-cols-4 gap-2">
                                    {product.images.map((image, idx) => (
                                      <img
                                        key={idx}
                                        src={image.url}
                                        alt={`Ảnh ${idx + 1}`}
                                        className="aspect-square w-full rounded border border-hairline bg-white object-cover"
                                      />
                                    ))}
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-2 rounded border border-hairline bg-white p-3 text-sm text-[#9ca3af]">
                                    <ImageIcon size={16} /> Chưa có hình ảnh
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Panel>
    </>
  );
};

export default ProductList;
