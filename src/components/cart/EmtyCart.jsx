import React from "react";
import { useNavigate } from "react-router-dom";

const EmtyCart = () => {
  const nav = useNavigate();
  return (
    <div className="bg-white shadow-md rounded-lg p-4 text-center">
      <p className="text-gray-700">Không có sản phẩm</p>
      <a
        onClick={() => nav("/shop")}
        className="mt-4 inline-block bg-black text-white px-4 py-2 rounded-lg cursor-pointer"
      >
        Mua Sắm
      </a>
    </div>
  );
};

export default EmtyCart;
