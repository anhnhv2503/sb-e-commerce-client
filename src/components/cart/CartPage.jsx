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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { AnimatePresence, motion } from "framer-motion";
import { jwtDecode } from "jwt-decode";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen">
        <CartBreadcrumb />
        <h1 className="font-display text-3xl font-bold mb-8 text-[#111827] mt-6 flex items-center gap-3">
          <ShoppingBag size={28} className="text-[#3B82F6]" />
          Giỏ Hàng Của Bạn
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row gap-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
              >
                <Skeleton className="w-full sm:w-32 h-32 rounded-xl" />
                <div className="flex-1 space-y-4">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/4" />
                  <div className="flex justify-between items-end mt-auto pt-4">
                    <Skeleton className="h-10 w-28" />
                    <Skeleton className="h-6 w-24" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
              <Skeleton className="h-8 w-1/2" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-32 w-full" />
              <Separator />
              <div className="space-y-3">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
              </div>
              <Skeleton className="h-12 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Empty cart UI
  if (!cart || cart.items.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen flex flex-col">
        <CartBreadcrumb />
        <div className="flex-1 flex items-center justify-center py-12">
          <EmtyCart />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen">
      <CartBreadcrumb />

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 mt-6">
        <div>
          <h1 className="font-display text-4xl font-bold text-[#111827] flex items-center gap-3">
            <ShoppingBag size={32} className="text-[#3B82F6]" />
            Giỏ Hàng
          </h1>
          <p className="text-gray-500 mt-2">
            Xem lại các sản phẩm bạn đã chọn trước khi thanh toán.
          </p>
        </div>
        <Badge className="bg-blue-50 text-[#3B82F6] hover:bg-blue-100 border-none px-4 py-1.5 text-sm font-semibold tracking-wide rounded-full">
          {cart.items.length} Sản Phẩm
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence>
            {cart.items.map((item, index) => (
              <motion.div
                key={item.itemId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`flex flex-col sm:flex-row gap-6 bg-white p-5 rounded-2xl border transition-all duration-300 ${
                  updatingItemId === item.itemId
                    ? "opacity-60 border-blue-200 ring-2 ring-blue-50"
                    : "border-gray-100 shadow-sm hover:shadow-md hover:border-[#3B82F6]/30"
                }`}
              >
                {/* Product Image */}
                <div
                  className="w-full sm:w-32 h-32 bg-gray-50 rounded-xl flex items-center justify-center cursor-pointer overflow-hidden border border-gray-100 group shrink-0"
                  onClick={() => nav(`/product/${item.productId}`)}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.productName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 flex flex-col min-w-0">
                  <div className="flex justify-between items-start gap-4">
                    <div className="min-w-0">
                      <h3
                        className="font-bold text-lg text-[#111827] hover:text-[#3B82F6] cursor-pointer line-clamp-2 transition-colors"
                        onClick={() => nav(`/product/${item.productId}`)}
                      >
                        {item.productName}
                      </h3>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-gray-100 text-gray-600">
                          Size {item.sizeName}
                        </span>
                      </div>
                    </div>

                    <button
                      className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-500"
                      onClick={() => handleRemoveItem(item.itemId)}
                      disabled={updatingItemId === item.itemId}
                      title="Xóa sản phẩm"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>

                  <div className="mt-auto pt-4 flex flex-wrap items-end justify-between gap-4">
                    {/* Quantity Selector */}
                    <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-1">
                      <button
                        disabled={
                          item.quantity <= 1 || updatingItemId === item.itemId
                        }
                        onClick={() =>
                          handleUpdateItem(item.itemId, item.quantity - 1)
                        }
                        className="w-8 h-8 flex items-center justify-center rounded-md text-gray-600 hover:bg-white hover:text-[#111827] hover:shadow-sm disabled:opacity-50 transition-all"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-10 text-center font-semibold text-[#111827] font-mono text-sm">
                        {item.quantity}
                      </span>
                      <button
                        disabled={
                          item.quantity >= 10 || updatingItemId === item.itemId
                        }
                        onClick={() =>
                          handleUpdateItem(item.itemId, item.quantity + 1)
                        }
                        className="w-8 h-8 flex items-center justify-center rounded-md text-gray-600 hover:bg-white hover:text-[#111827] hover:shadow-sm disabled:opacity-50 transition-all"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <div className="text-right">
                      <div className="text-sm text-gray-500 mb-0.5">
                        {currency.format(item.productPrice)} / sp
                      </div>
                      <div className="font-bold text-[#3B82F6] text-xl">
                        {currency.format(item.productPrice * item.quantity)}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          <div className="pt-4">
            <Button
              variant="outline"
              onClick={() => nav("/shop")}
              className="h-12 px-6 border-gray-200 text-[#111827] hover:text-[#3B82F6] hover:border-blue-200 hover:bg-blue-50 rounded-xl font-semibold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3B82F6]"
            >
              Tiếp Tục Mua Sắm
            </Button>
          </div>
        </div>

        {/* Order Summary (Sticky Sidebar) */}
        <div className="lg:col-span-1 sticky top-24">
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-6">
            <h2 className="font-display text-xl font-bold text-[#111827] border-b border-gray-100 pb-4">
              Tóm Tắt Đơn Hàng
            </h2>

            <div className="space-y-6">
              {/* Shipping Address */}
              <div>
                <Label
                  htmlFor="address"
                  className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block"
                >
                  Địa Chỉ Giao Hàng
                </Label>
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm text-[#111827] leading-relaxed">
                  {address ? (
                    address
                  ) : (
                    <span className="text-red-500 italic">
                      Vui lòng cập nhật địa chỉ trong hồ sơ!
                    </span>
                  )}
                </div>
                {!address && (
                  <Button
                    variant="link"
                    className="px-0 text-[#3B82F6] text-xs h-auto mt-1"
                    onClick={() => nav("/user/profile")}
                  >
                    Cập nhật ngay
                  </Button>
                )}
              </div>

              {/* Payment Method */}
              <div>
                <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 block">
                  Phương Thức Thanh Toán
                </Label>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="space-y-3"
                >
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className={`relative flex items-center border rounded-xl p-4 cursor-pointer transition-all duration-200 ${
                        paymentMethod === method.id
                          ? "border-[#3B82F6] bg-blue-50/50 shadow-sm ring-1 ring-[#3B82F6]"
                          : "border-gray-200 hover:border-gray-300 bg-white"
                      }`}
                      onClick={() => setPaymentMethod(method.id)}
                    >
                      <RadioGroupItem
                        value={method.id}
                        id={method.id}
                        className="absolute right-4 text-[#3B82F6]"
                      />
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shrink-0 border border-gray-100">
                          <img
                            src={method.icon}
                            alt={method.name}
                            className="w-8 h-8 object-contain"
                          />
                        </div>
                        <Label
                          htmlFor={method.id}
                          className="cursor-pointer font-semibold text-sm text-[#111827]"
                        >
                          {method.name}
                        </Label>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <Separator className="bg-gray-100" />

              {/* Totals */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 font-medium">
                    Tổng Tiền Hàng:
                  </span>
                  <span className="text-[#111827] font-semibold">
                    {currency.format(cart.totalPrice)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 font-medium">
                    Phí Giao Hàng:
                  </span>
                  <span className="text-green-600 font-bold tracking-wide uppercase text-xs self-center">
                    Miễn Phí
                  </span>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-100 flex justify-between items-end">
                  <div>
                    <span className="block font-bold text-[#111827] text-lg">
                      Tổng Cộng:
                    </span>
                    <span className="text-xs text-gray-500">
                      Đã bao gồm VAT
                    </span>
                  </div>
                  <span className="font-black text-2xl text-[#3B82F6]">
                    {currency.format(cart.totalPrice)}
                  </span>
                </div>
              </div>
            </div>

            {/* Checkout Action */}
            <div className="pt-2">
              <Button
                className="w-full h-14 bg-[#3B82F6] hover:bg-[#2563EB] text-white shadow-lg shadow-blue-500/30 rounded-xl text-base font-bold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6] flex items-center justify-center gap-2"
                onClick={handleCheckout}
                disabled={!address.trim() || paymentLoading}
              >
                {paymentLoading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Thanh Toán Ngay
                    <ArrowRight size={20} />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
