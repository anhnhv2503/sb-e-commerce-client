import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sizeOptions } from "../../../data/data.js";
import React, { useEffect, useState } from "react";
import {
  addProduct,
  getAllCategories,
} from "@/components/service/ApiFunctions";
import PreviewImages from "@/components/common/PreviewImages";
import toast, { Toaster } from "react-hot-toast";
import { useDocumentTitle } from "@uidotdev/usehooks";

const AddProduct = () => {
  useDocumentTitle("Quản lý sản phẩm");
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
      formData.append("categoryName", category);
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
        // setTimeout(() => {
        //   window.location.reload();
        // }, 3000);
        setBrand("");
        setName("");
        setDescription("");
        setPrice("");
        setInventory(null);
        setCategory(null);
        setSizeName(null);
        setImages(null);
        setPreviewImages(null);
      } catch (error) {
        console.error("Error adding product", error);
        setBrand("");
        setName("");
        setDescription("");
        setPrice("");
        setInventory(null);
        setCategory(null);
        setSizeName(null);
        setImages(null);
        setPreviewImages(null);
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
        Thêm sản phẩm
      </h2>

      <form>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Tên sản phẩm
          </label>
          <input
            required
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-1 p-2 input input-bordered bg-white text-black border-gray-300"
            placeholder="Nhập tên sản phẩm"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Mô tả sản phẩm
          </label>
          <textarea
            required
            name="description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full mt-1 p-2 input input-bordered bg-white text-black border-gray-300"
            placeholder="Nhập mô tả sản phẩm"
            rows="4"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Giá tiền
          </label>
          <input
            required
            type="number"
            name="price"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full mt-1 p-2 input input-bordered bg-white text-black border-gray-300"
            placeholder="Nhập giá tiền"
          />
        </div>

        {/* Brand */}
        <div className="mb-4">
          <label
            htmlFor="brand"
            className="block text-sm font-medium text-gray-700"
          >
            Thương hiệu
          </label>
          <input
            required
            type="text"
            name="brand"
            id="brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full mt-1 p-2 input input-bordered bg-white text-black border-gray-300"
            placeholder="Nhập thương hiệu"
          />
        </div>

        <div className="mb-4 flex">
          <label
            htmlFor="inventory"
            className="block text-sm font-medium text-gray-700 mx-3"
          >
            Số lượng nhập
          </label>
          <Input
            required
            type="number"
            placeholder="Nhập số lượng"
            max="100"
            className="w-40"
            onChange={(e) => setInventory(e.target.value)}
          />

          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mx-3"
          >
            Thể loại
          </label>
          <Select onValueChange={(value) => setCategory(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Chọn thể loại" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.name}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <label
            htmlFor="sizename"
            className="block text-sm font-medium text-gray-700 mx-3"
          >
            Tên size
          </label>
          <Select onValueChange={(value) => setSizeName(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Chọn size" />
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

        <div className="mb-6">
          <label
            htmlFor="images"
            className="block text-sm font-semibold text-gray-800"
          >
            Ảnh sản phẩm
          </label>
          <input
            type="file"
            name="images"
            id="images"
            multiple
            onChange={handleImageChange}
            className="hidden w-full px-4 py-2 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-700"
          />
          <div className="mt-4">
            <label
              htmlFor="images"
              className="cursor-pointer px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-200"
            >
              Choose File
            </label>
          </div>

          <div className="mt-4 flex space-x-4 overflow-x-auto p-2 border border-gray-200 rounded-lg shadow-inner">
            {previewImages.length > 0 ? (
              previewImages.map((url) => (
                <img
                  key={url}
                  src={url}
                  alt="Product preview"
                  className="w-32 h-32 object-cover rounded-lg border border-gray-300 shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out cursor-pointer"
                  onClick={handleShowImage}
                />
              ))
            ) : (
              <p className="text-gray-500 italic">No images selected</p>
            )}
          </div>
        </div>

        <div className="">
          <PreviewImages
            imageUrls={previewImages}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </div>

        <div className="mt-6">
          {isLoading ? (
            <center>
              <span className="loading loading-ring loading-lg"></span>
            </center>
          ) : (
            <button
              type="submit"
              className="w-full bg-gradient-to-br from-indigo-500 via-teal-400 to-indigo-500 text-white p-2 rounded-md hover:from-teal-400 hover:via-indigo-500 hover:to-teal-400 transition duration-200"
              onClick={handleSubmit}
            >
              Thêm
            </button>
          )}
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default AddProduct;
