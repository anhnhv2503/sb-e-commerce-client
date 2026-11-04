// import cod from "@/assets/cod.png";
import payos from "@/assets/payos.png";
// import vnpay from "@/assets/vnpay.jpg";
import CartBreadcrumb from "@/components/cart/CartBreadcrumb";
import EmtyCart from "@/components/cart/EmtyCart";
import useCurrencyFormat from "@/components/hooks/useCurrencyFormat";
import {
  createPayOSPayment,
  getCart,
  getUserDetail,
  removeItemFromCart,
  updateCartItemQuantity,
} from "@/components/service/ApiFunctions";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { AnimatePresence, motion } from "framer-motion";
import { jwtDecode } from "jwt-decode";
import { ArrowLeft, ArrowRight, Minus, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";

const paymentMethods = [
  {
    id: "payos",
    name: "PayOS (Chuyển Khoản Mã QR)",
    icon: payos,
  },
];

const CartPage = () => {
  useDocumentTitle("Giỏ Hàng — VA Shop");

  const nav = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0].id);
  const currency = useCurrencyFormat();
  const [cart, setCart] = useState();
  const [loading, setLoading] = useState(false);
  const [updatingItemId, setUpdatingItemId] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);

  const fetchUser = async () => {
    if (!accessToken) return <Navigate to="/login" />;

    try {
      const userDecoded = jwtDecode(accessToken);
      const response = await getUserDetail(userDecoded.id);
      setAddress(response.data.data?.address || "");
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    }
  };

  const fetchCart = async () => {
    setLoading(true);
    try {
      const response = await getCart();
      setCart(response.data?.data);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchCart();
  }, []);

  const handleRemoveItem = async (itemId) => {
    setUpdatingItemId(itemId);
    try {
      await removeItemFromCart(itemId);
      toast.success("Đã xóa sản phẩm khỏi giỏ hàng");
      fetchCart();
    } catch (error) {
      console.error("Failed to remove item:", error);
      toast.error("Không thể xóa sản phẩm khỏi giỏ hàng");
    } finally {
      setUpdatingItemId(null);
    }
  };

  const handleUpdateItem = async (itemId, quantity) => {
    if (quantity < 1 || quantity > 10) return;

    setUpdatingItemId(itemId);
    try {
      await updateCartItemQuantity(itemId, quantity);
      fetchCart();
    } catch (error) {
      if (error.response?.data?.status === 409) {
        toast.error(error.response?.data?.data);
      } else {
        toast.error("Không thể cập nhật số lượng");
      }
    } finally {
      setUpdatingItemId(null);
    }
  };

  const handleCheckout = async () => {
    if (!address.trim()) {
      toast.error("Vui lòng cập nhật địa chỉ nhận hàng trong hồ sơ của bạn");
      return;
    }
    setPaymentLoading(true);
    try {
      const response = await createPayOSPayment();
      if (response) {
        window.location.href = response.data.data?.paymentUrl;
      }
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra trong quá trình thanh toán");
    } finally {
      setPaymentLoading(false);
    }
  };

  // Loading UI
  if (loading) {
    return (
      <div className="page-container min-h-screen py-10">
        <CartBreadcrumb />
        <Skeleton className="mb-10 mt-8 h-12 w-72 rounded" />
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="divide-y divide-hairline border-y border-hairline lg:col-span-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-6 py-6">
                <Skeleton className="h-32 w-24 rounded-lg sm:w-28" />
                <div className="flex-1 space-y-3">
                  <Skeleton className="h-5 w-3/4 rounded" />
                  <Skeleton className="h-4 w-1/4 rounded" />
                  <Skeleton className="mt-6 h-10 w-28 rounded" />
                </div>
              </div>
            ))}
          </div>
          <Skeleton className="h-96 w-full rounded-lg" />
        </div>
      </div>
    );
  }

  // Empty cart UI
  if (!cart || cart.items.length === 0) {
    return (
      <div className="page-container flex min-h-screen flex-col py-10">
        <CartBreadcrumb />
        <div className="flex flex-1 items-center py-12">
          <EmtyCart />
        </div>
      </div>
    );
  }

  return (
    <div className="page-container min-h-screen py-10">
      <CartBreadcrumb />

      <div className="mb-10 mt-8 flex flex-col justify-between gap-4 border-b border-hairline pb-8 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow mb-3 text-brand-pink">Thanh Toán</p>
          <h1 className="display-heading lg:text-[64px]">Giỏ hàng —</h1>
          <p className="mt-4 text-base text-[#606562]">
            Xem lại các sản phẩm bạn đã chọn trước khi thanh toán.
          </p>
        </div>
        <span className="pill self-start bg-brand-ink px-3 py-1 text-white sm:self-auto">
          {cart.items.length} Sản Phẩm
        </span>
      </div>

      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-3">
        {/* Cart items */}
        <div className="lg:col-span-2">
          <ul className="divide-y divide-hairline border-y border-hairline">
            <AnimatePresence>
              {cart.items.map((item, index) => (
                <motion.li
                  key={item.itemId}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`flex gap-4 py-6 transition-opacity sm:gap-6 ${
                    updatingItemId === item.itemId ? "opacity-50" : ""
                  }`}
                >
                  {/* Product image */}
                  <button
                    type="button"
                    className="h-32 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-brand-mist focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-blue sm:w-28"
                    onClick={() => nav(`/product/${item.productId}`)}
                    aria-label={`Xem ${item.productName}`}
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.productName}
                      className="h-full w-full object-cover"
                    />
                  </button>

                  {/* Product info */}
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <h3
                          className="line-clamp-2 cursor-pointer text-base font-semibold text-brand-ink transition-colors hover:text-brand-orange"
                          onClick={() => nav(`/product/${item.productId}`)}
                        >
                          {item.productName}
                        </h3>
                        <p className="mt-1 text-sm text-[#606562]">
                          Size{" "}
                          <span className="font-mono text-brand-ink">
                            {item.sizeName}
                          </span>
                        </p>
                      </div>

                      <button
                        className="icon-btn -mr-2 -mt-2 text-[#606562] hover:text-brand-pink"
                        onClick={() => handleRemoveItem(item.itemId)}
                        disabled={updatingItemId === item.itemId}
                        aria-label="Xóa sản phẩm"
                        title="Xóa sản phẩm"
                      >
                        <Trash2 size={18} strokeWidth={1.5} />
                      </button>
                    </div>

                    <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-4">
                      {/* Quantity selector */}
                      <div className="inline-flex h-10 items-center overflow-hidden rounded border border-[#cccfcd]">
                        <button
                          disabled={
                            item.quantity <= 1 || updatingItemId === item.itemId
                          }
                          onClick={() =>
                            handleUpdateItem(item.itemId, item.quantity - 1)
                          }
                          aria-label="Giảm số lượng"
                          className="flex h-full w-10 items-center justify-center text-brand-ink transition-colors hover:bg-brand-mist disabled:opacity-30"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-10 border-x border-[#cccfcd] text-center font-mono text-sm leading-10 text-brand-ink">
                          {item.quantity}
                        </span>
                        <button
                          disabled={
                            item.quantity >= 10 || updatingItemId === item.itemId
                          }
                          onClick={() =>
                            handleUpdateItem(item.itemId, item.quantity + 1)
                          }
                          aria-label="Tăng số lượng"
                          className="flex h-full w-10 items-center justify-center text-brand-ink transition-colors hover:bg-brand-mist disabled:opacity-30"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <p className="text-base font-semibold text-brand-pink">
                        {currency.format(item.productPrice * item.quantity)}
                      </p>
                    </div>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>

          <button
            onClick={() => nav("/shop")}
            className="btn btn-ghost mt-6"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Tiếp Tục Mua Sắm
          </button>
        </div>

        {/* Order summary */}
        <aside className="rounded-lg bg-brand-mist p-6 sm:p-8 lg:sticky lg:top-24">
          <h2 className="font-label border-b border-brand-ink pb-4 text-2xl text-brand-ink">
            Tóm Tắt Đơn Hàng
          </h2>

          <div className="space-y-8 pt-6">
            {/* Shipping address */}
            <div>
              <Label
                htmlFor="address"
                className="eyebrow mb-2 block text-xs text-[#606562]"
              >
                Địa Chỉ Giao Hàng
              </Label>
              <div className="rounded border border-[#cccfcd] bg-white p-3 text-sm leading-relaxed text-brand-ink">
                {address ? (
                  address
                ) : (
                  <span className="text-brand-pink">
                    Vui lòng cập nhật địa chỉ trong hồ sơ!
                  </span>
                )}
              </div>
              {!address && (
                <button
                  className="btn btn-ghost btn-sm mt-2 text-brand-blue"
                  onClick={() => nav("/user/profile")}
                >
                  Cập nhật ngay
                </button>
              )}
            </div>

            {/* Payment method */}
            <div>
              <Label className="eyebrow mb-2 block text-xs text-[#606562]">
                Phương Thức Thanh Toán
              </Label>
              <RadioGroup
                value={paymentMethod}
                onValueChange={setPaymentMethod}
                className="space-y-2"
              >
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`relative flex cursor-pointer items-center rounded border bg-white p-3 transition-colors ${
                      paymentMethod === method.id
                        ? "border-brand-ink"
                        : "border-[#cccfcd] hover:border-brand-ink"
                    }`}
                    onClick={() => setPaymentMethod(method.id)}
                  >
                    <RadioGroupItem
                      value={method.id}
                      id={method.id}
                      className="absolute right-4 text-brand-orange"
                    />
                    <div className="flex items-center gap-3 pr-8">
                      <img
                        src={method.icon}
                        alt=""
                        className="h-8 w-8 flex-shrink-0 object-contain"
                      />
                      <Label
                        htmlFor={method.id}
                        className="cursor-pointer text-sm font-semibold text-brand-ink"
                      >
                        {method.name}
                      </Label>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Totals */}
            <dl className="space-y-3 border-t border-[#cccfcd] pt-6 text-sm">
              <div className="flex justify-between">
                <dt className="text-[#606562]">Tổng tiền hàng</dt>
                <dd className="text-brand-ink">
                  {currency.format(cart.totalPrice)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[#606562]">Phí giao hàng</dt>
                <dd className="eyebrow text-xs text-green-600">Miễn Phí</dd>
              </div>
              <div className="flex items-end justify-between border-t border-[#cccfcd] pt-4">
                <dt>
                  <span className="font-label block text-base text-brand-ink">
                    Tổng Cộng
                  </span>
                  <span className="text-xs text-[#606562]">
                    Đã bao gồm VAT
                  </span>
                </dt>
                <dd className="text-2xl font-semibold text-brand-orange">
                  {currency.format(cart.totalPrice)}
                </dd>
              </div>
            </dl>

            <button
              className="btn btn-primary h-14 w-full"
              onClick={handleCheckout}
              disabled={!address.trim() || paymentLoading}
            >
              {paymentLoading ? (
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              ) : (
                <>
                  Thanh Toán Ngay
                  <ArrowRight size={20} aria-hidden="true" />
                </>
              )}
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CartPage;
