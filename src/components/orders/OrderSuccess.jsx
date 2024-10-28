import { CheckCircle } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <div className="max-w-md p-6 bg-white rounded-lg shadow-md text-center">
        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h1 className="text-2xl font-semibold text-green-700 mb-2">
          Order Placed Successfully!
        </h1>
        <p className="text-gray-600">
          Your order has been confirmed and will be processed soon. Thank you
          for shopping with us!
        </p>

        <button
          onClick={() => navigate("/shop")}
          className="mt-6 w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;