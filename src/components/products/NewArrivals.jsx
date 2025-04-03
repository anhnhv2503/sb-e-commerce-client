import DotsLoading from "@/components/common/DotsLoading";
import useCurrencyFormat from "@/components/hooks/useCurrencyFormat";
import ProductItem from "@/components/products/ProductItem";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getNewArrivals } from "../service/ApiFunctions";

const NewArrivals = () => {
  const [newProducts, setNewProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
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
        {isLoading ? (
          <DotsLoading />
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {newProducts.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewArrivals;
