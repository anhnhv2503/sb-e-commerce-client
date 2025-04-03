import Loading from "@/components/common/Loading";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
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
  const [showPassword, setShowPassword] = useState(false);

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
          toast.success("Đăng kí thành công. Vui lòng kiểm tra Email của bạn", {
            duration: 3000,
            icon: "🚀",
          });
          setTimeout(() => {
            nav("/login");
            setLoading(false);
          }, 3000);
        } else {
          setLoading(false);
          toast.error("Đăng kí lỗi", {
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

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex items-center justify-center p-8 bg-gradient-to-br from-[#F9FAFB] to-[#E5E7EB]">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-3xl"
      >
        <Card className="border-none shadow-xl bg-white/95 backdrop-blur-sm">
          <CardHeader>
            <motion.div variants={itemVariants}>
              <CardTitle className="text-3xl font-bold text-center text-[#111827]">
                ĐĂNG KÍ
              </CardTitle>
            </motion.div>
          </CardHeader>
          <CardContent className="space-y-6 p-8 pt-0">
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div variants={itemVariants}>
                <Label htmlFor="fullName" className="text-[#111827]">
                  Họ Tên
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  onChange={handleChange}
                  className="mt-1 bg-white/70 border-[#D1D5DB] focus:border-[#1E3A8A] focus:ring-[#1E3A8A] text-[#111827] transition-all duration-200"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <Label htmlFor="phone" className="text-[#111827]">
                  Số điện thoại
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="text"
                  required
                  onChange={handleChange}
                  className="mt-1 bg-white/70 border-[#D1D5DB] focus:border-[#1E3A8A] focus:ring-[#1E3A8A] text-[#111827] transition-all duration-200"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <Label className="text-[#111827]">Địa chỉ</Label>
                <div className="mt-2 flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                  <Select onValueChange={setSelectedProvince}>
                    <SelectTrigger className="bg-white/70 border-[#D1D5DB] focus:border-[#1E3A8A] text-[#111827]">
                      <SelectValue placeholder="Chọn Tỉnh/Thành" />
                    </SelectTrigger>
                    <SelectContent>
                      {provinces.map((province) => (
                        <SelectItem key={province.id} value={province.id}>
                          {province.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select onValueChange={setSelectedDistrict}>
                    <SelectTrigger className="bg-white/70 border-[#D1D5DB] focus:border-[#1E3A8A] text-[#111827]">
                      <SelectValue placeholder="Chọn Quận/Huyện" />
                    </SelectTrigger>
                    <SelectContent>
                      {districts.map((district) => (
                        <SelectItem key={district.id} value={district.id}>
                          {district.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select onValueChange={setSelectedWard}>
                    <SelectTrigger className="bg-white/70 border-[#D1D5DB] focus:border-[#1E3A8A] text-[#111827]">
                      <SelectValue placeholder="Chọn Phường/Xã" />
                    </SelectTrigger>
                    <SelectContent>
                      {wards.map((ward) => (
                        <SelectItem key={ward.id} value={ward.id}>
                          {ward.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Input
                  id="homeAddress"
                  name="homeAddress"
                  type="text"
                  required
                  onChange={(e) => setHomeAddress(e.target.value)}
                  placeholder="Địa chỉ cụ thể"
                  className="mt-4 bg-white/70 border-[#D1D5DB] focus:border-[#1E3A8A] focus:ring-[#1E3A8A] text-[#111827] transition-all duration-200"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <Label htmlFor="email" className="text-[#111827]">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  onChange={handleChange}
                  className="mt-1 bg-white/70 border-[#D1D5DB] focus:border-[#1E3A8A] focus:ring-[#1E3A8A] text-[#111827] transition-all duration-200"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <Label htmlFor="password" className="text-[#111827]">
                  Mật khẩu
                </Label>
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  onChange={handleChange}
                  className="mt-1 bg-white/70 border-[#D1D5DB] focus:border-[#1E3A8A] focus:ring-[#1E3A8A] text-[#111827] transition-all duration-200"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <Label htmlFor="confirmPassword" className="text-[#111827]">
                  Nhập lại mật khẩu
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  required
                  onChange={handleChange}
                  className="mt-1 bg-white/70 border-[#D1D5DB] focus:border-[#1E3A8A] focus:ring-[#1E3A8A] text-[#111827] transition-all duration-200"
                />
                <div className="mt-2 flex items-center">
                  <Checkbox
                    id="show-password"
                    checked={showPassword}
                    onCheckedChange={() => setShowPassword(!showPassword)}
                    className="mr-2 border-[#6B7280] data-[state=checked]:bg-[#1E3A8A] data-[state=checked]:border-[#1E3A8A]"
                  />
                  <Label
                    htmlFor="show-password"
                    className="text-sm text-[#6B7280]"
                  >
                    Hiển thị mật khẩu
                  </Label>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                {loading ? (
                  <div className="flex items-center justify-center">
                    <Loading />
                  </div>
                ) : (
                  <Button
                    type="submit"
                    className="w-full bg-indigo-500 hover:bg-[#1E3A8A]/90 text-white transition-all duration-200"
                  >
                    Đăng Kí
                  </Button>
                )}
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Register;
