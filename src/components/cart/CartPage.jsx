import { useDocumentTitle } from "@uidotdev/usehooks";
import { Slash } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
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
import { Button } from "../ui/button";

const CartPage = () => {
  useDocumentTitle("My Cart");
  const { cart, dispatch } = useCart();
  const nav = useNavigate();

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
    //productId, sizeId, quantity, price
    const orderItems = cart.map((item) => ({
      productId: item.productId,
      sizeId: item.sizeId.id,
      quantity: item.quantity,
    }));
    const orderRequest = {
      totalPrice: totalPrice,
      items: orderItems,
    };
    toast.success("Continue Developement");
    console.log(orderRequest);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 min-h-screen">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList className="flex flex-wrap items-center">
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="text-indigo-600">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href="/shop" className="text-indigo-600">
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

      {/* Shopping Cart Header */}
      <h1 className="text-2xl font-bold mb-4 text-center lg:text-left">
        Shopping Cart
      </h1>

      {cart.length > 0 ? (
        <>
          {cart.map((item, index) => (
            <div
              className="flex flex-col lg:flex-row justify-between items-center p-4 border-b shadow-md bg-white rounded-lg mb-4"
              key={index}
            >
              {/* Product Image and Details */}
              <div className="flex items-center w-full lg:w-auto mb-4 lg:mb-0">
                <img
                  src={item.image}
                  alt="Product"
                  className="w-28 h-28 object-cover mr-4 rounded-lg"
                />
                <div className="flex flex-col">
                  <a
                    className="text-lg font-semibold cursor-pointer text-indigo-600 hover:underline"
                    onClick={() => nav(`/product/${item.productId}`)}
                  >
                    {item.productName}
                  </a>
                  <p className="text-green-800">{item.sizeId.sizeName}</p>
                </div>
              </div>

              {/* Quantity and Price */}
              <div className="flex justify-between items-center space-x-4 w-full lg:w-auto">
                {/* Quantity Selector */}
                <div className="flex items-center border rounded-lg overflow-hidden">
                  <button
                    className="px-2 py-1 bg-gray-200 hover:bg-gray-300 focus:outline-none"
                    onClick={() => handleDecrease(item)}
                    disabled={item.quantity === 1}
                  >
                    -
                  </button>
                  <span className="px-4 py-2 bg-white text-gray-900">
                    {item.quantity}
                  </span>
                  <button
                    className="px-2 py-1 bg-gray-200 hover:bg-gray-300 focus:outline-none"
                    onClick={() => handleIncrease(item)}
                    disabled={item.quantity === 10}
                  >
                    +
                  </button>
                </div>

                {/* Price */}
                <p className="text-lg font-semibold">${item.price}</p>
                <div className="">
                  <button
                    onClick={() => removeItem(item)}
                    className="bg-gray-400 border rounded-badge px-3 py-3 text-white"
                  >
                    x
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Total Section */}
          <div className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
            <p className="text-xl font-semibold">Total</p>
            <p className="text-2xl font-bold">${totalPrice}</p>
          </div>

          {/* Checkout Button */}
          <div className="mt-6 text-right">
            <Button
              className="w-full lg:w-auto px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 focus:outline-none"
              onClick={handleCheckout}
            >
              Checkout
            </Button>
          </div>
        </>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-4 text-center">
          <p className="text-gray-700">No items in the cart</p>
          <a
            href="/shop"
            className="mt-4 inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            Go Shopping
          </a>
        </div>
      )}

      <Toaster />
    </div>
  );
};

export default CartPage;
