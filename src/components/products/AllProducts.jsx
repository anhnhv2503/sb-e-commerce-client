import React, { useEffect, useState } from "react";
import { getProducts } from "../service/ApiFunctions";

const AllProducts = () => {
  const [products, setProducts] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section>
      <h1>All Products</h1>
      <p>
        This is the All Products page. Here you can view all of the products
        that are available for purchase. You can click on a product to view more
        details about it and add it to your cart.
      </p>
      <div className="">
        {products.data?.map((product) => (
          <div key={product.id} className="">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AllProducts;
