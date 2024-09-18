import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { registerUser } from "../service/ApiFunctions";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  function validatePhone(phoneNumber) {
    const regex = /^[0-9]{10}$/;
    if (regex.test(phoneNumber)) {
      return true; // Phone number is valid
    } else {
      return false; // Phone number is invalid
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match", {
        duration: 4000,
        icon: "🔐",
      });
    } else if (
      formData.fullName.trim() === "" ||
      formData.phone.trim() === "" ||
      formData.address.trim() === "" ||
      formData.email.trim() === "" ||
      formData.password.trim() === ""
    ) {
      toast.error("Please fill in all fields", {
        duration: 4000,
        icon: "🔐",
      });
    } else if (formData.password.length < 6) {
      toast.error("Password should be at least 6 characters", {
        duration: 4000,
        icon: "🔐",
      });
    } else if (!validatePhone(formData.phone)) {
      toast.error("Phone number is invalid", {
        duration: 4000,
        icon: "🔐",
      });
    } else {
      try {
        const response = await registerUser(formData);
        if (response.status === 200) {
          console.log(response.data?.data);
          toast.success("User registered successfully", {
            duration: 3000,
            icon: "🚀",
          });
          setTimeout(() => {
            window.location.href = "/login";
          }, 3000);
        } else {
          toast.error("Eror Sign up", {
            duration: 4000,
            icon: "🔐",
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="flex pt-4 pb-32 items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Sign Up
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <div className="mt-1">
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                onChange={handleChange}
                className="w-full mt-1 p-2 input input-bordered bg-white text-black border-gray-300"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone
            </label>
            <div className="mt-1">
              <input
                id="phone"
                name="phone"
                type="text"
                required
                onChange={handleChange}
                className="w-full mt-1 p-2 input input-bordered bg-white text-black border-gray-300"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <div className="mt-1">
              <input
                id="address"
                name="address"
                type="text"
                required
                onChange={handleChange}
                className="w-full mt-1 p-2 input input-bordered bg-white text-black border-gray-300"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                required
                onChange={handleChange}
                className="w-full mt-1 p-2 input input-bordered bg-white text-black border-gray-300"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                required
                onChange={handleChange}
                className="w-full mt-1 p-2 input input-bordered bg-white text-black border-gray-300"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <div className="mt-1">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                onChange={handleChange}
                className="w-full mt-1 p-2 input input-bordered bg-white text-black border-gray-300"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center px-4 py-2 font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default Register;
