import React from "react";

const useCurrencyFormat = () => {
  let vnd = new Intl.NumberFormat("vi-VI", {
    style: "currency",
    currency: "VND",
  });
  return vnd;
};

export default useCurrencyFormat;
