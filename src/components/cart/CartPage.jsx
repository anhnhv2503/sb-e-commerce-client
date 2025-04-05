// import cod from "@/assets/cod.png";
import payos from "@/assets/payos.png";
// import vnpay from "@/assets/vnpay.jpg";
import CartBreadcrumb from "@/components/cart/CartBreadcrumb";
import EmtyCart from "@/components/cart/EmtyCart";
import Loading from "@/components/common/Loading";
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
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { motion } from "framer-motion";
import { jwtDecode } from "jwt-decode";
import {
  ArrowRight,
  MinusCircle,
  PlusCircle,
  ShoppingBag,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";

const paymentMethods = [
  // {
  //   id: "cod",
  //   name: "Thanh toán khi nhận hàng",
  //   icon: cod,
  // },
  // {
  //   id: "vnpay",
  //   name: "VNPay",
  //   icon: vnpay,
  // },
  {
    id: "payos",
    name: "PayOS",
    icon: payos,
  },
];

const CartPage = () => {
  useDocumentTitle("Giỏ Hàng");

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
    if (!accessToken) <Navigate to="/login" />;

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
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
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
      toast.error("Vui lòng nhập địa chỉ nhận hàng");
      return;
    }
    setPaymentLoading(true);
    try {
      const response = await createPayOSPayment();
      if (response) {
        window.location.href = response.data.data?.paymentUrl;
      }
      setPaymentLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Có lỗi xảy ra trong quá trình thanh toán");
      setPaymentLoading(false);
    }
  };

  // // Loading UI
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-4 min-h-screen">
        <CartBreadcrumb />
        <h1 className="text-2xl font-bold mb-4 text-center lg:text-left mt-3">
          Giỏ Hàng
        </h1>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-4 border-b pb-4">
              <Skeleton className="w-32 h-32 rounded" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-1/3" />
              </div>
              <div className="w-24">
                <Skeleton className="h-8 w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Empty cart UI
  if (!cart || cart.items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-4 min-h-screen">
        <CartBreadcrumb />
        <h1 className="text-2xl font-bold mb-4 text-center lg:text-left mt-3">
          Giỏ Hàng
        </h1>
        <EmtyCart />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 min-h-screen">
      <CartBreadcrumb />
      <div className="flex items-center justify-between mb-6 mt-3">
        <h1 className="text-2xl font-bold">Giỏ Hàng</h1>
        <Badge variant="outline" className="flex items-center gap-1 px-3 py-1">
          <ShoppingBag size={16} />
          <span>{cart.items.length} sản phẩm</span>
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-0">
              <div className="space-y-1">
                {cart.items.map((item, index) => (
                  <motion.div
                    key={item.itemId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4 p-4 relative"
                  >
                    <div
                      className="w-24 h-24 bg-gray-50 rounded flex items-center justify-center cursor-pointer"
                      onClick={() => nav(`/product/${item.productId}`)}
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.productName}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3
                        className="font-medium text-base hover:text-primary cursor-pointer truncate"
                        onClick={() => nav(`/product/${item.productId}`)}
                      >
                        {item.productName}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Size: {item.sizeName}
                      </p>
                      <p className="font-medium text-primary">
                        {currency.format(item.productPrice)}
                      </p>

                      <div className="flex items-center gap-6 mt-2">
                        <div className="flex items-center border rounded-md">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-r-none"
                            disabled={
                              item.quantity === 1 ||
                              updatingItemId === item.itemId
                            }
                            onClick={() =>
                              handleUpdateItem(item.itemId, item.quantity - 1)
                            }
                          >
                            <MinusCircle size={16} />
                          </Button>
                          <span className="w-10 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-l-none"
                            disabled={
                              item.quantity === 10 ||
                              updatingItemId === item.itemId
                            }
                            onClick={() =>
                              handleUpdateItem(item.itemId, item.quantity + 1)
                            }
                          >
                            <PlusCircle size={16} />
                          </Button>
                        </div>

                        <p className="font-medium ml-auto">
                          {currency.format(item.productPrice * item.quantity)}
                        </p>
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 absolute top-2 right-2"
                      onClick={() => handleRemoveItem(item.itemId)}
                      disabled={updatingItemId === item.itemId}
                    >
                      <XCircle size={18} />
                    </Button>

                    {index < cart.items.length - 1 && (
                      <Separator className="absolute bottom-0 left-4 right-4" />
                    )}
                  </motion.div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={() => nav("/shop")}
                className="gap-2"
              >
                Tiếp tục mua sắm
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardContent className="pt-6">
              <h2 className="font-semibold text-lg mb-4">Thông tin đơn hàng</h2>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="address" className="text-sm font-medium">
                    Địa chỉ nhận hàng
                  </Label>
                  <Input
                    id="address"
                    placeholder="Nhập địa chỉ của bạn"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="mt-1"
                    readOnly={true}
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium">
                    Phương thức thanh toán
                  </Label>
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                    className="mt-2 space-y-2"
                  >
                    {paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        className={`flex items-center space-x-3 border rounded-lg p-3 cursor-pointer ${
                          paymentMethod === method.id
                            ? "border-primary bg-primary/5"
                            : "border-input"
                        }`}
                        onClick={() => setPaymentMethod(method.id)}
                      >
                        <RadioGroupItem
                          value={method.id}
                          id={method.id}
                          className="hidden"
                        />
                        <img
                          src={method.icon}
                          alt={method.name}
                          className="w-12 h-12 object-contain"
                        />
                        <Label
                          htmlFor={method.id}
                          className="cursor-pointer font-medium text-sm"
                        >
                          {method.name}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tạm tính:</span>
                    <span>{currency.format(cart.totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Phí vận chuyển:
                    </span>
                    <span>Miễn phí</span>
                  </div>
                  <div className="flex justify-between font-medium text-base pt-2">
                    <span>Tổng cộng:</span>
                    <span className="text-primary">
                      {currency.format(cart.totalPrice)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              {paymentLoading ? (
                <Loading />
              ) : (
                <Button
                  className="w-full gap-2"
                  onClick={handleCheckout}
                  disabled={!address.trim()}
                >
                  Thanh toán ngay
                  <ArrowRight size={16} />
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
