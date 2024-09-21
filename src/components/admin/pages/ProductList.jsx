import { getProducts } from "@/components/service/ApiFunctions";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data?.data);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-md rounded-md">
      <ul role="list" className="divide-y divide-gray-100">
        {products.map((product, index) => (
          <li key={index} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <img
                alt=""
                src={product.images[0]?.url}
                className="h-44 w-36 flex-none bg-gray-50"
              />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {product.name}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-slate-500">
                  Brand: {product.brand}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-slate-800">
                  Category: {product.category?.name}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  {product.description}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-red-500">
                  <strong>
                    {product?.size.map(
                      (size) => size.sizeName + ":" + size.quantity + " "
                    )}
                  </strong>
                </p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-white badge">
                ${product.price}
              </p>
              <Button className={"mt-3 text-slate-700"} variant="outline">
                Add more Size
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
