import Loading from "@/components/common/Loading";
import Paginator from "@/components/common/Paginator";
import AllProductsBreadcrumb from "@/components/products/AllProductsBreadcrumb";
import ProductItem from "@/components/products/ProductItem";
import SideAccordion from "@/components/products/SideAccordion";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import { getProducts } from "../service/ApiFunctions";

const AllProducts = () => {
  useDocumentTitle("Mua Sắm");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const size = 9;
  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await getProducts(currentPage, size);
      setProducts(response.data?.content);
      setTotalPages(response.data?.page?.totalPages);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(true);
      console.log(error);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="bg-white">
      <div className="flex justify-center">
        <AllProductsBreadcrumb />
      </div>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>
        {isLoading && <Loading />}

        <div className="grid grid-cols-5 grid-rows-5 gap-4">
          <div className="row-span-5">
            <SideAccordion />
          </div>
          <div className="col-span-4 row-span-5">
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
              {products.map((product) => (
                <ProductItem key={product.id} product={product} />
              ))}
            </div>
            <div className="mt-9">
              <Paginator
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
