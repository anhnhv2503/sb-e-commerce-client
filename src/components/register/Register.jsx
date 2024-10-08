import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  getAllDistricts,
  getAllProvinces,
  getAllWards,
  registerUser,
} from "../service/ApiFunctions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { useNavigate } from "react-router-dom";

const Register = () => {
  useDocumentTitle("Register");
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await getAllProvinces();
        setProvinces(response.data?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProvinces();
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      const fetchDistricts = async () => {
        try {
          const response = await getAllDistricts(selectedProvince);
          setDistricts(response.data?.data);
          setWards([]);
        } catch (error) {
          console.log(error);
        }
      };
      fetchDistricts();
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      const fetchWards = async () => {
        try {
          const response = await getAllWards(selectedDistrict);
          setWards(response.data?.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchWards();
    }
  }, [selectedDistrict]);

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
    } else if (!selectedProvince) {
      toast.error("Please select Province", {
        duration: 2000,
        icon: "🔐",
      });
    } else if (!selectedProvince) {
      toast.error("Please select District", {
        duration: 2000,
        icon: "🔐",
      });
    } else if (!selectedProvince) {
      toast.error("Please select Ward", {
        duration: 2000,
        icon: "🔐",
      });
    } else {
      const provinceName = provinces.find(
        (p) => p.id === selectedProvince
      )?.name;
      const districtName = districts.find(
        (d) => d.id === selectedDistrict
      )?.name;
      const wardName = wards.find((w) => w.id === selectedWard)?.name;
      const fullAddress = `${homeAddress}, ${wardName}, ${districtName}, ${provinceName}`;
      try {
        setLoading(true);
        const response = await registerUser(formData, fullAddress);
        if (response.status === 200) {
          toast.success("User registered successfully", {
            duration: 3000,
            icon: "🚀",
          });
          setTimeout(() => {
            nav("/login");
            setLoading(false);
          }, 3000);
        } else {
          setLoading(false);
          toast.error("Eror Sign up", {
            duration: 4000,
            icon: "🔐",
          });
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex pt-4 pb-32 items-center justify-center bg-gray-100">
      <div className="w-full max-w-3xl p-8 space-y-6 bg-white rounded-lg shadow-md">
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
            <div className="mt-1 flex">
              <div className="">
                <Select onValueChange={(value) => setSelectedProvince(value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Province" />
                  </SelectTrigger>
                  <SelectContent>
                    {provinces.map((province, index) => (
                      <SelectItem key={index} value={province.id}>
                        {province.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="mx-4">
                <Select onValueChange={(value) => setSelectedDistrict(value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select District" />
                  </SelectTrigger>
                  <SelectContent>
                    {districts.map((district, index) => (
                      <SelectItem key={index} value={district.id}>
                        {district.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="mx-4">
                <Select onValueChange={(value) => setSelectedWard(value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Ward" />
                  </SelectTrigger>
                  <SelectContent>
                    {wards.map((ward, index) => (
                      <SelectItem key={index} value={ward.id}>
                        {ward.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-1">
              <input
                id="homeAddress"
                name="homeAddress"
                type="text"
                required
                onChange={(e) => setHomeAddress(e.target.value)}
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

          {loading ? (
            <div role="status" className="flex items-center justify-center">
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <div>
              <button
                type="submit"
                className="w-full flex justify-center px-4 py-2 font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign Up
              </button>
            </div>
          )}
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default Register;
