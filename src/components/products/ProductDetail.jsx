import { Radio, RadioGroup } from "@headlessui/react";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { Slash } from "lucide-react";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { getInventory, getProductById } from "../service/ApiFunctions";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null); // Initialize with null
  const [selectedSize, setSelectedSize] = useState(null);
  const [inventory, setInventory] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { cart, dispatch } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  useDocumentTitle(product?.name || "Product Detail");

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

  useEffect(() => {
    if (selectedSize) {
      fetchInventory(selectedSize.id); // Fetch inventory when a size is selected
    }
  }, [selectedSize]);

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!localStorage.getItem("accessToken")) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }

    if (quantity <= 0) {
      toast.error("Please enter a valid quantity");
      return;
    }

    const item = {
      productId: parseInt(id, 10),
      productName: product.name,
      sizeId: selectedSize,
      price: product.price,
      quantity: parseInt(quantity, 10),
      image: product.images[0]?.url,
    };

    dispatch({ type: "ADD_ITEM", payload: item });
    toast.success("Added to cart");

    // Reset fields after adding to cart
    setSelectedSize(null);
    setQuantity(0);
    setInventory(null);
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
      <Toaster />

      <div className="flex justify-center">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                onClick={() => navigate("/")}
                className="cursor-pointer text-gray-500"
              >
                Home
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
                Shop
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="cursor-pointer">Detail</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="pt-6">
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:max-w-7xl lg:px-8">
          {/* Horizontal scrolling container for mobile */}
          <div className="lg:hidden flex space-x-4 overflow-x-auto">
            {product.images?.map((image, index) => (
              <div
                key={index}
                className="aspect-h-4 aspect-w-3 overflow-hidden rounded-lg flex-shrink-0 w-64"
              >
                <img
                  alt={`Product image ${index + 1}`}
                  src={image.url}
                  loading="lazy"
                  className="h-full w-full object-cover object-center"
                />
              </div>
            ))}
          </div>

          {/* Grid layout for larger screens */}
          <div className="hidden lg:grid lg:grid-cols-3 lg:gap-x-8">
            {product.images?.map((image, index) => (
              <div
                key={index}
                className="aspect-h-4 aspect-w-3 overflow-hidden rounded-lg"
              >
                <img
                  alt={`Product image ${index + 1}`}
                  src={image.url}
                  loading="lazy"
                  className="h-full w-full object-cover object-center"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {product.name}
            </h1>
          </div>

          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">
              ${product.price}
            </p>

            {inventory !== null && (
              <p className="text-sm tracking-tight text-green-600">
                In-stock: {inventory}
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
                        className="cursor-pointer bg-white text-gray-900 shadow-sm group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none"
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
                  className="bg-white block w-40 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                />
                <button
                  type="submit"
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-black px-8 py-3 text-base font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2"
                >
                  Add to cart
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
