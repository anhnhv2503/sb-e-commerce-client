import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Slash } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import { getCartByUserId } from "../service/ApiFunctions";
import { Button } from "../ui/button";
import toast, { Toaster } from "react-hot-toast";

const CartPage = () => {
  const accessToken = localStorage.getItem("accessToken");

  let userDecoded = null;

  if (accessToken !== null) {
    userDecoded = jwtDecode(accessToken);
  }

  const [cart, setCart] = useState(null);

  useEffect(() => {
    if (userDecoded) {
      const fetchCart = async () => {
        try {
          const response = await getCartByUserId(userDecoded.id);
          setCart(response.data?.data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchCart();
    }
  }, []);

  const handleCheckout = () => {
    toast.success("Continue Developement");
  };

  return (
    <div className="max-w-4xl mx-auto p-4 h-screen">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href="/shop">Shop</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>Shopping Cart</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {/* Shopping Cart Header */}
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>

      {cart ? (
        <>
          {cart.cartItems?.map((item, index) => (
            <div
              className="flex justify-between items-center p-4 border-b shadow-md bg-white rounded-lg mb-4"
              key={index}
            >
              <div className="flex items-center">
                <img
                  src={item.product?.images[0]?.url}
                  alt="Product"
                  className="w-28 h-28 object-cover mr-4"
                />
                <div>
                  <h2 className="text-lg font-semibold">
                    {item.product?.name}
                  </h2>
                  <p className="text-gray-500">{item.product?.description}</p>
                  <p className="text-green-800">{item.size?.sizeName}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border rounded-lg">
                  <button className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded-l-lg">
                    -
                  </button>
                  <span className="px-3 py-1">{item.quantity}</span>
                  <button className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded-r-lg">
                    +
                  </button>
                </div>

                <p className="text-lg font-semibold">${item.product?.price}</p>
              </div>
            </div>
          ))}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            {/* Total */}
            <div className="flex justify-between items-center p-4">
              <p className="text-xl font-semibold">Total</p>
              <p className="text-2xl font-bold">${cart.totalPrice}</p>
            </div>
          </div>
          <div className="mt-6 text-right">
            <Button
              className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-slate-700"
              onClick={handleCheckout}
            >
              Checkout
            </Button>
          </div>
        </>
      ) : (
        <div className="flex justify-between items-center p-4 border-b  bg-white rounded-lg mb-4">
          <p className="text-center">No items in the cart</p>
          <a
            href="/shop"
            className="link bg-indigo-600 text-white no-underline px-2 py-2 border rounded-lg hover:bg-indigo-700"
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
