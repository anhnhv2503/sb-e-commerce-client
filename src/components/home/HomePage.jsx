import React from "react";
import AllProducts from "../products/AllProducts";
import Carousel from "../common/Carousel";

const HomePage = () => {
  return (
    <div>
      <Carousel />

      <h1 className="text-3xl font-bold underline">
        Welcome to the Shopping Cart
      </h1>
      <p>
        Welcome to the Shopping Cart. This is a simple application that allows
        you to add items to your cart and view the total price of the items in
        your cart. You can also remove items from your cart.
      </p>
      <AllProducts />
    </div>
  );
};

export default HomePage;
