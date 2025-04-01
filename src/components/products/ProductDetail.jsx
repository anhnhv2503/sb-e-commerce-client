import useCurrencyFormat from "@/components/hooks/useCurrencyFormat";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Radio, RadioGroup } from "@headlessui/react";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { Slash } from "lucide-react";
import { useEffect, useLayoutEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  addItemToCart,
  getInventory,
  getProductById,
} from "../service/ApiFunctions";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [inventory, setInventory] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useDocumentTitle(product?.name || "Chi tiết sản phẩm");
  const currency = useCurrencyFormat();

  const fetchProduct = async () => {
    setIsLoading(true);
    try {
      const response = await getProductById(id);
      setProduct(response.data?.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch product details");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchInventory = async (sizeId) => {
    try {
      const response = await getInventory(sizeId);
      setInventory(response.data?.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch inventory");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  useLayoutEffect(() => {
    if (selectedSize) {
      fetchInventory(selectedSize.id);
    }
  }, [selectedSize]);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (!localStorage.getItem("accessToken")) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    if (!selectedSize) {
      toast.error("Vui lòng chọn size sản phẩm");
      return;
    }

    if (quantity <= 0) {
      toast.error("Vui lòng nhập số lượng sản phẩm");
      return;
    }
    const formData = new FormData();
    formData.append("quantity", quantity);
    formData.append("sizeId", selectedSize.id);
    try {
      const response = await addItemToCart(formData);
      if (response) {
        toast.success("Thêm sản phẩm vào giỏ hàng thành công");
        setSelectedSize(null);
        setQuantity(0);
        setInventory(null);
      }
    } catch (error) {
      console.log(error);
      toast.error("Thêm sản phẩm vào giỏ hàng thất bại");
    }
  };

  if (isLoading || !product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-dots loading-xs"></span>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="flex justify-center">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                onClick={() => navigate("/")}
                className="cursor-pointer text-gray-500"
              >
                Trang Chủ
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink
                onClick={() => navigate("/shop")}
                className="cursor-pointer text-gray-500"
              >
                Cửa Hàng
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="cursor-pointer">
                Chi Tiết Sản Phẩm
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="pt-6">
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:hidden flex space-x-4 overflow-x-auto px-4">
            <Carousel className="w-full max-w-xl">
              <CarouselContent>
                {product.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <Card className="shadow-md">
                      <CardContent className="flex aspect-square items-center justify-center">
                        <img
                          src={image.url}
                          alt={product.name}
                          className="object-cover object-center w-full h-full rounded-md"
                        />
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          <div className="hidden lg:grid lg:grid-cols-2 lg:gap-x-8">
            <Carousel className="w-full max-w-xl">
              <CarouselContent>
                {product.images.map((image, index) => (
                  <CarouselItem key={index} className="w-full">
                    <Card className="w-full h-full">
                      <CardContent className="w-full h-[75vh] md:h-[60vh] lg:h-[65vh] overflow-hidden">
                        <img
                          src={image.url}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>

        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {product.name}
            </h1>
          </div>

          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Thông tin sản phẩm</h2>
            <p className="text-3xl tracking-tight text-gray-900">
              {currency.format(product.price)}
            </p>
            {inventory !== null && (
              <p className="text-sm tracking-tight text-green-600">
                Còn {inventory} sản phẩm
              </p>
            )}

            <form className="mt-10" onSubmit={handleAddToCart}>
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Size</h3>
                </div>

                <fieldset aria-label="Choose a size" className="mt-4">
                  <RadioGroup
                    value={selectedSize}
                    onChange={setSelectedSize}
                    className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
                  >
                    {product.size?.map((size) => (
                      <Radio
                        key={size.id}
                        value={size}
                        className="cursor-pointer bg-white text-gray-900 shadow-sm group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-100 focus:outline-none transition-all"
                      >
                        <span>{size.sizeName}</span>
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-indigo-700"
                        />
                      </Radio>
                    ))}
                  </RadioGroup>
                </fieldset>
              </div>

              <div className="mt-4">
                <input
                  type="number"
                  min={1}
                  max={inventory || 1}
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="bg-gray-50 block w-40 rounded-md border border-gray-300 py-2 px-4 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Số lượng"
                />
                <button
                  type="submit"
                  className="mt-10 flex w-full items-center justify-center rounded-md bg-indigo-600 hover:bg-indigo-500 px-8 py-3 text-base font-medium text-white shadow-md transition-all"
                >
                  Thêm vào giỏ hàng
                </button>
              </div>
            </form>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            <div>
              <div className="space-y-6">
                <p className="text-base text-gray-900">{product.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
