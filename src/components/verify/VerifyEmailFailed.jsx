import React from "react";
import { useNavigate } from "react-router-dom";

const VerifyEmailFailed = () => {
  const navigate = useNavigate();

  const retryConfirmation = () => {
    // Navigate to the appropriate retry flow
    navigate("/register");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold text-red-600">
          Email Confirmation Failed
        </h1>
        <p className="mt-4 text-gray-700">
          We were unable to confirm your email. Please try again.
        </p>
        <button
          onClick={retryConfirmation}
          className="mt-6 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition duration-300"
        >
          Retry
        </button>
      </div>
    </div>
  );
};

export default VerifyEmailFailed;
