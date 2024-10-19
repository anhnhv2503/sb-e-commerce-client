import { XCircle } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const OrderFailed = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-red-50">
      <div className="max-w-md p-6 bg-white rounded-lg shadow-md text-center">
        <XCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
        <h1 className="text-2xl font-semibold text-red-700 mb-2">
          Order Failed!
        </h1>
        <p className="text-gray-600">
          We encountered an issue while processing your order. Please try again.
        </p>

        <button
          onClick={() => navigate("/shop")}
          className="mt-6 w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Go Back to Shop
        </button>

        <button
          onClick={() => navigate("/about")}
          className="mt-4 w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default OrderFailed;
