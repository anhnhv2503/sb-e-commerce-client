import { useDocumentTitle } from "@uidotdev/usehooks";
import { Slash } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { getUserDetail } from "@/components/service/ApiFunctions";
import { Label } from "@/components/ui/label";

const CartPage = () => {
  useDocumentTitle("My Cart");
  const { cart, dispatch } = useCart();
  const nav = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const userDecoded = jwtDecode(accessToken) ? jwtDecode(accessToken) : null;
  const [address, setAddress] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserDetail(userDecoded.id);
        setAddress(response.data.data?.address);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);

  const removeItem = (item) => {
    dispatch({ type: "REMOVE_ITEM", payload: item });
  };

  const handleIncrease = (item) => {
    dispatch({ type: "INCREASE_ITEM", payload: item });
  };
  const handleDecrease = (item) => {
    dispatch({ type: "DECREASE_ITEM", payload: item });
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (address.trim() !== "") {
      const orderItems = cart.map((item) => ({
        productId: item.productId,
        sizeId: item.sizeId.id,
        quantity: item.quantity,
      }));
      const orderRequest = {
        totalPrice: totalPrice,
        items: orderItems,
        orderAddress: address,
      };
      toast.success("Continue Developement");
      console.log(orderRequest);
    } else {
      toast.error("Please enter your address");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 min-h-screen">
      <Breadcrumb>
        <BreadcrumbList className="flex flex-wrap items-center">
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="text-gray-600">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href="/shop" className="text-gray-600">
              Shop
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage className="font-semibold">
              Shopping Cart
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-2xl font-bold mb-4 text-center lg:text-left mt-3">
        Shopping Cart
      </h1>
      {cart.length > 0 ? (
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
              {cart.map((product, index) => (
                <tr key={index} className="border-b">
                  <td className="py-4 flex items-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover mr-4 rounded"
                    />
                    <div>
                      <p
                        className="font-semibold cursor-pointer hover:text-indigo-500"
                        onClick={() => nav(`/product/${product.productId}`)}
                      >
                        {product.productName}
                      </p>
                      <p className="text-gray-800 text-sm">
                        {product.sizeId.sizeName}
                      </p>
                      <p className="text-gray-500 text-sm">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        className="px-2 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                        onClick={() => handleDecrease(product)}
                        disabled={product.quantity === 1}
                      >
                        -
                      </button>
                      <span>{product.quantity}</span>
                      <button
                        className="px-2 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                        onClick={() => handleIncrease(product)}
                        disabled={product.quantity === 10}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="py-4">
                    ${(product.price * product.quantity).toFixed(2)}
                  </td>
                  <td className="py-4">
                    <button
                      onClick={() => removeItem(product)}
                      className="text-red-500 hover:text-red-700"
                    >
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
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Subtotal</span>
                <span className="text-red-500">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="font-semibold">Total</span>
                <span className="text-red-500">${totalPrice.toFixed(2)}</span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-700"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-4 text-center">
          <p className="text-gray-700">No items in the cart</p>
          <a
            onClick={() => nav("/shop")}
            className="mt-4 inline-block bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-600 cursor-pointer"
          >
            Go Shopping
          </a>
        </div>
      )}
    </div>
  );
};

export default CartPage;
