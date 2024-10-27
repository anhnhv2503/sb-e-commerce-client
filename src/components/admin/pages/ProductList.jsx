import Paginator from "@/components/common/Paginator";
import { getProducts } from "@/components/service/ApiFunctions";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import AddMoreSize from "./AddMoreSize";

const ProductList = () => {
  useDocumentTitle("Quản lý sản phẩm");
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const size = 5;

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);
  const fetchProducts = async () => {
    try {
      const response = await getProducts(currentPage, size);
      setProducts(response.data?.content);
      setTotalPages(response.data?.page?.totalPages);
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  };
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  return (
    <>
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
                  <p className="text-lg font-semibold leading-6 text-gray-900">
                    {product.name}
                  </p>
                  <p className="mt-1 truncate text-s leading-5 text-slate-500">
                    Brand: {product.brand}
                  </p>
                  <p className="mt-1 truncate text-s leading-5 text-slate-800">
                    Category: {product.category?.name}
                  </p>
                  <p className="mt-1 truncate text-s leading-5 text-gray-500">
                    {product.description}
                  </p>
                  <p className="mt-1 truncate text-s leading-5 text-red-500">
                    <strong>
                      {product?.size.map(
                        (size) => size.sizeName + ":" + size.quantity + "  "
                      )}
                    </strong>
                  </p>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-white badge">
                  ${product.price}
                </p>
                <div className="mt-3">
                  <AddMoreSize productId={product.id} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-9">
        <Paginator
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default ProductList;
