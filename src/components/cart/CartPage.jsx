import cod from "@/assets/cod.png";
import vnpay from "@/assets/vnpay.jpg";
import useCurrencyFormat from "@/components/hooks/useCurrencyFormat";
import { getCart, getUserDetail } from "@/components/service/ApiFunctions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Radio, RadioGroup } from "@headlessui/react";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { jwtDecode } from "jwt-decode";
import { Slash } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

const paymentMethods = [
  {
    name: "cod",
    icon: cod,
  },
  {
    name: "vnpay",
    icon: vnpay,
  },
];

const CartPage = () => {
  useDocumentTitle("Giỏ Hàng");

  const nav = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  let userDecoded = null;
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0].name);
  const currency = useCurrencyFormat();
  const [cart, setCart] = useState();

  const fetchUser = async () => {
    if (accessToken) {
      userDecoded = jwtDecode(accessToken);
    }
    try {
      const response = await getUserDetail(userDecoded.id);
      setAddress(response.data.data?.address);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCart = async () => {
    try {
      const reponse = await getCart();
      setCart(reponse.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchCart();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4 min-h-screen">
      <Breadcrumb>
        <BreadcrumbList className="flex flex-wrap items-center">
          <BreadcrumbItem>
            <BreadcrumbLink
              onClick={() => nav("/")}
              className="text-gray-600 cursor-pointer"
            >
              Trang Chủ
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink
              onClick={() => nav("/shop")}
              className="text-gray-600 cursor-pointer"
            >
              Cửa Hàng
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage className="font-semibold cursor-pointer">
              Giỏ Hàng
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-2xl font-bold mb-4 text-center lg:text-left mt-3">
        Giỏ Hàng
      </h1>
      {cart?.items.length > 0 ? (
        <>
          <table className="w-full mb-6">
            <thead>
              <tr className="border-b">
                <th className="text-left py-4">Product</th>
                <th className="text-left py-4">Quantity</th>
                <th className="text-left py-4">Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart?.items.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="py-4 flex items-center">
                    <img
                      src={item.imageUrl}
                      alt={item.productName}
                      className="w-32 h-32 object-contain mr-4 rounded"
                    />
                    <div>
                      <p
                        className="font-semibold cursor-pointer hover:text-indigo-500"
                        onClick={() => nav(`/product/${item.productId}`)}
                      >
                        {item.productName}
                      </p>
                      <p className="text-gray-500 text-sm">{item.sizeName}</p>
                      <p className="text-gray-500 text-sm">
                        {currency.format(item.productPrice)}
                      </p>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        className="px-2 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                        disabled={item.quantity === 1}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="px-2 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                        disabled={item.quantity === 10}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="py-4">
                    {currency.format(item.productPrice * item.quantity)}
                  </td>
                  <td className="py-4">
                    <button className="text-red-500 hover:text-red-700">
                      ×
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="">
            <Label htmlFor="address">Shipping Address</Label>
            <Input
              type="text"
              id="address"
              placeholder={address}
              defaultValue={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <fieldset aria-label="Choose a method" className="mt-4">
            <Label htmlFor="note">Payment Method</Label>
            <RadioGroup
              value={paymentMethod}
              onChange={setPaymentMethod}
              className="grid grid-cols-4 gap-4 sm:grid-cols-4 lg:grid-cols-7"
            >
              {paymentMethods.map((method, index) => (
                <Radio
                  key={index}
                  value={method.name}
                  className={
                    "cursor-pointer bg-white text-gray-900 shadow-sm group relative flex items-center justify-center rounded-md border px-3 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none data-[focus]:ring-2 data-[focus]:ring-indigo-500 sm:flex-1 sm:py-6"
                  }
                >
                  <img src={method.icon} alt="" className="w-14 h-14" />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-gray-500"
                  />
                </Radio>
              ))}
            </RadioGroup>
          </fieldset>

          <div className="flex flex-col-reverse lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0 mt-3">
            <div>
              <button
                onClick={() => nav("/shop")}
                className="px-6 py-2 border border-gray-300 text-gray-800 rounded-md hover:bg-gray-100"
              >
                Continue Shopping
              </button>
            </div>
            <div className="bg-gray-100 p-4 rounded-md shadow-md w-full lg:w-1/3">
              <div className="flex justify-between mb-4">
                <span className="font-semibold">Tổng</span>
                <span className="text-red-500">
                  {currency.format(cart?.totalPrice)}
                </span>
              </div>
              {paymentMethod === "cod" ? (
                <button className="w-full bg-gradient-to-r from-indigo-600 to-cyan-700 text-white py-2 rounded-md transition ease-in-out delay-50 hover:from-indigo-400 hover:to-cyan-400">
                  Thanh Toán
                </button>
              ) : (
                <>
                  <div className="flex justify-between mb-4">
                    <span className="font-semibold">Ngân Hàng</span>
                    <span className="text-red-500">NCB Bank</span>
                  </div>
                  <button className="w-full bg-gradient-to-r from-indigo-600 to-cyan-700 hover:from-indigo-400 hover:to-cyan-400 text-white py-2 rounded-md transition ease-in-out delay-50 hover:bg-gray-700">
                    Thanh Toán qua VN Pay
                  </button>
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-4 text-center">
          <p className="text-gray-700">Không có sản phẩm</p>
          <a
            onClick={() => nav("/shop")}
            className="mt-4 inline-block bg-black text-white px-4 py-2 rounded-lg cursor-pointer"
          >
            Mua Sắm
          </a>
        </div>
      )}
    </div>
  );
};

export default CartPage;
