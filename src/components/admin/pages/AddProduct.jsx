import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sizeOptions } from "../../../data/data";
import React, { useEffect, useState } from "react";
import {
  addProduct,
  getAllCategories,
} from "@/components/service/ApiFunctions";
import PreviewImages from "@/components/common/PreviewImages";
import toast, { Toaster } from "react-hot-toast";
import { useDocumentTitle } from "@uidotdev/usehooks";

const AddProduct = () => {
  useDocumentTitle("Add Product");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [inventory, setInventory] = useState("");
  const [category, setCategory] = useState("");
  const [sizename, setSizeName] = useState("");
  const [images, setImages] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      name.trim() === "" ||
      description.trim() === "" ||
      price.trim() === "" ||
      brand.trim() === "" ||
      inventory.trim() === "" ||
      category.trim() === "" ||
      sizename.trim() === "" ||
      images.length === 0
    ) {
      toast.error("Please fill all the fields", {
        duration: 3000,
        icon: "❌",
      });
    } else {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("brand", brand);
      formData.append("inventory", inventory);
      formData.append("categoryId", category);
      formData.append("sizeName", sizename);
      images.forEach((image) => {
        formData.append("images", image);
      });

      try {
        setIsLoading(true);
        const response = await addProduct(formData);
        if (response.status === 200) {
          toast.success("Product added successfully", {
            duration: 3000,
            icon: "✅",
          });
          setIsLoading(false);
        }
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } catch (error) {
        console.error("Error adding product", error);
      }
    }
  };

  const [previewImages, setPreviewImages] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        setCategories(response.data?.data);
      } catch (error) {
        console.error("Error loading categories", error);
      }
    };
    fetchCategories();
  }, []);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    const imagesUrl = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(imagesUrl);
  };

  const handleShowImage = () => {
    // Open the modal when the button is clicked
    if (previewImages) setIsModalOpen(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-slate-700">
        Add New Product
      </h2>

      <form>
        {/* Name */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Product Name
          </label>
          <input
            required
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-1 p-2 input input-bordered bg-white text-black border-gray-300"
            placeholder="Enter product name"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            required
            name="description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full mt-1 p-2 input input-bordered bg-white text-black border-gray-300"
            placeholder="Enter product description"
            rows="4"
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <input
            required
            type="number"
            name="price"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full mt-1 p-2 input input-bordered bg-white text-black border-gray-300"
            placeholder="Enter price"
          />
        </div>

        {/* Brand */}
        <div className="mb-4">
          <label
            htmlFor="brand"
            className="block text-sm font-medium text-gray-700"
          >
            Brand
          </label>
          <input
            required
            type="text"
            name="brand"
            id="brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full mt-1 p-2 input input-bordered bg-white text-black border-gray-300"
            placeholder="Enter brand name"
          />
        </div>

        {/* Inventory */}
        <div className="mb-4 flex">
          <label
            htmlFor="inventory"
            className="block text-sm font-medium text-gray-700 mx-3"
          >
            Quantity
          </label>
          <Input
            required
            type="number"
            placeholder="Quantity"
            max="100"
            className="w-40"
            onChange={(e) => setInventory(e.target.value)}
          />

          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mx-3"
          >
            Category
          </label>
          <Select onValueChange={(value) => setCategory(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <label
            htmlFor="sizename"
            className="block text-sm font-medium text-gray-700 mx-3"
          >
            Size Name
          </label>
          <Select onValueChange={(value) => setSizeName(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Size" />
            </SelectTrigger>
            <SelectContent>
              {sizeOptions.map((size) => (
                <SelectItem key={size.id} value={size.name}>
                  {size.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Images */}
        <div className="mb-4">
          <label
            htmlFor="images"
            className="block text-sm font-medium text-gray-700"
          >
            Product Images
          </label>
          <input
            type="file"
            name="images"
            id="images"
            multiple
            onChange={handleImageChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
          <div className="mt-2 flex space-x-2 overflow-y-auto">
            {previewImages.map((url) => (
              <img
                key={url}
                src={url}
                alt="Product photo"
                className="w-40 h-40 object-cover rounded-md"
                onClick={handleShowImage}
              />
            ))}
          </div>
        </div>
        <div className="">
          <PreviewImages
            imageUrls={previewImages}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          {isLoading ? (
            <center>
              <span className="loading loading-ring loading-lg"></span>
            </center>
          ) : (
            <button
              type="submit"
              className="w-full bg-slate-800 text-white p-2 rounded-md hover:bg-indigo-700 transition duration-200"
              onClick={handleSubmit}
            >
              Add Product
            </button>
          )}
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default AddProduct;
