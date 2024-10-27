import Paginator from "@/components/common/Paginator";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { Slash } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllCategories,
  getBrands,
  getProducts,
} from "../service/ApiFunctions";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import useCurrencyFormat from "@/components/hooks/useCurrencyFormat";

const AllProducts = () => {
  useDocumentTitle("Mua Sắm");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const nav = useNavigate();
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [brands, setBrands] = useState([]);
  const [loadingBrands, setLoadingBrands] = useState(false);
  const size = 9;
  const currency = useCurrencyFormat();

  useEffect(() => {
    fetchCategories();
    fetchBrands();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);
      const response = await getAllCategories();
      setCategories(response.data?.data);
      setLoadingCategories(false);
    } catch (error) {
      console.error("Error loading categories", error);
      setLoadingCategories(true);
    }
  };
  const fetchBrands = async () => {
    try {
      setLoadingBrands(true);
      const response = await getBrands();
      setBrands(response.data?.data);
      setLoadingBrands(false);
    } catch (error) {
      console.error("Error loading brands", error);
      setLoadingBrands(true);
    }
  };
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
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                onClick={() => nav("/")}
                className="cursor-pointer text-gray-500"
              >
                Trang Chủ
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="cursor-pointer">
                Cửa Hàng
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>
        {isLoading && (
          <div className="flex items-center justify-center min-h-screen">
            <span className="loading loading-dots loading-xs"></span>
          </div>
        )}

        <div className="grid grid-cols-5 grid-rows-5 gap-4">
          <div className="row-span-5">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Thương Hiệu</AccordionTrigger>
                {brands.map((brand) => (
                  <AccordionContent
                    key={brand}
                    className="cursor-pointer hover:bg-slate-200 px-6 py-3"
                  >
                    {brand}
                  </AccordionContent>
                ))}
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>Thể Loại</AccordionTrigger>
                {categories.map((category) => (
                  <AccordionContent
                    key={category.id}
                    className="cursor-pointer hover:bg-slate-200 px-6 py-3"
                  >
                    {category.name}
                  </AccordionContent>
                ))}
              </AccordionItem>
            </Accordion>
          </div>
          <div className="col-span-4 row-span-5">
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
              {products.map((product) => (
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
