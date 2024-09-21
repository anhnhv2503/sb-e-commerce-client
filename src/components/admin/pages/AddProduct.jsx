import { Input } from "@/components/ui/input";
import React, { useState } from "react";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    brand: "",
    inventory: "",
    category: "",
    sizename: "",
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prevData) => ({
      ...prevData,
      images: files,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, like sending data to an API
    console.log("Form Data:", formData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Product</h2>

      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Product Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
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
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
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
            type="number"
            name="price"
            id="price"
            value={formData.price}
            onChange={handleChange}
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
            type="text"
            name="brand"
            id="brand"
            value={formData.brand}
            onChange={handleChange}
            className="w-full mt-1 p-2 input input-bordered bg-white text-black border-gray-300"
            placeholder="Enter brand name"
          />
        </div>

        {/* Inventory */}
        <div className="mb-4">
          <label
            htmlFor="inventory"
            className="block text-sm font-medium text-gray-700"
          >
            Inventory Quantity
          </label>
          <input
            type="number"
            name="inventory"
            id="inventory"
            value={formData.inventory}
            onChange={handleChange}
            className="w-full mt-1 p-2 input input-bordered bg-white text-black border-gray-300"
            placeholder="Enter inventory quantity"
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <input
            type="text"
            name="category"
            id="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full mt-1 p-2 input input-bordered bg-white text-black border-gray-300"
            placeholder="Enter category"
          />
        </div>

        {/* Size Name */}
        <div className="mb-4">
          <label
            htmlFor="sizename"
            className="block text-sm font-medium text-gray-700"
          >
            Size Name
          </label>
          <input
            type="text"
            name="sizename"
            id="sizename"
            value={formData.sizename}
            onChange={handleChange}
            className="w-full mt-1 p-2 input input-bordered bg-white text-black border-gray-300"
            placeholder="Enter size name"
          />
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
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 transition duration-200"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
