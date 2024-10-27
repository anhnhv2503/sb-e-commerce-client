import React, { useEffect, useState } from "react";
import { getNewArrivals } from "../service/ApiFunctions";
import { useNavigate } from "react-router-dom";
import useCurrencyFormat from "@/components/hooks/useCurrencyFormat";

const NewArrivals = () => {
  const [newProducts, setNewProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const nav = useNavigate();
  const currency = useCurrencyFormat();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await getNewArrivals();
        setNewProducts(response.data?.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(true);
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="bg-white">
      <h1 className="text-3xl font-bold text-center pt-10">Sản Phẩm Mới</h1>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>
        {isLoading && (
          <div className="flex items-center justify-center min-h-screen">
            <span className="loading loading-dots loading-xs"></span>
          </div>
        )}

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {newProducts.map((product) => (
            <a
              key={product.id}
              onClick={() => nav(`/product/${product.id}`)}
              className="group"
            >
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img
                  alt={product.name + " image"}
                  src={product.images[0].url}
                  className="h-96 w-96 object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">
                {currency.format(product.price)}
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;
