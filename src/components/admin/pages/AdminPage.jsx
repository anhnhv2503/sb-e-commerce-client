import { useDocumentTitle } from "@uidotdev/usehooks";
import React from "react";

const AdminPage = () => {
  useDocumentTitle("Admin Home");
  return (
    <div className="p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Welcome to VA Shop Admin Panel
      </h1>

      <p className="text-lg text-gray-600 mb-4">
        VA Shop is dedicated to providing the highest quality products for our
        customers. Our goal is to offer a wide range of goods that blend luxury,
        affordability, and style.
      </p>

      <h2 className="text-2xl font-semibold text-gray-700 mb-3">Our Mission</h2>
      <p className="text-gray-600 mb-6">
        At VA Shop, we strive to bring the latest trends and timeless pieces to
        our customers. Whether you're looking for the perfect gift or treating
        yourself, we believe in quality and service that exceeds expectations.
      </p>

      <h2 className="text-2xl font-semibold text-gray-700 mb-3">
        Admin Dashboard
      </h2>
      <p className="text-gray-600 mb-4">
        As an admin, you can manage products, view orders, and maintain customer
        satisfaction by ensuring everything runs smoothly on the backend. Use
        the sidebar to navigate between different sections of the admin panel.
      </p>

      <p className="text-gray-600">
        If you have any questions or need assistance, feel free to reach out to
        our support team at{" "}
        <span className="font-semibold">admin@vashop.com</span>.
      </p>
    </div>
  );
};

export default AdminPage;
