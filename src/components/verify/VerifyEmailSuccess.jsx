import React from "react";
import { useNavigate } from "react-router-dom";

const VerifyEmailSuccess = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold text-green-600">Email Confirmed!</h1>
        <p className="mt-4 text-gray-700">
          Your email has been successfully confirmed.
        </p>
        <button
          onClick={goToLogin}
          className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition duration-300"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default VerifyEmailSuccess;
