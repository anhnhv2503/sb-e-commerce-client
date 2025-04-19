import Loading from "@/components/common/Loading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerSchema } from "@/schemas/register.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
  useDocumentTitle("Đăng Kí");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
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

  const onSubmit = async (data) => {
    setLoading(true);
    const provinceName = provinces.find((p) => p.id === selectedProvince)?.name;
    const districtName = districts.find((d) => d.id === selectedDistrict)?.name;
    const wardName = wards.find((w) => w.id === selectedWard)?.name;
    const fullAddress = `${homeAddress}, ${wardName}, ${districtName}, ${provinceName}`;

    try {
      const res = await registerUser(data, fullAddress);
      if (res) {
        toast.success("Đăng ký thành công!");
        nav("/login");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Đã xảy ra lỗi, vui lòng thử lại sau.");
      }
      setLoading(false);
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
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <motion.div variants={itemVariants}>
                <Label htmlFor="fullName" className="text-[#111827]">
                  Họ Tên
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  {...register("fullName")}
                  className="mt-1 bg-white/70 border-[#D1D5DB] focus:border-[#1E3A8A] focus:ring-[#1E3A8A] text-[#111827] transition-all duration-200"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.fullName.message}
                  </p>
                )}
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
                  {...register("phone")}
                  className="mt-1 bg-white/70 border-[#D1D5DB] focus:border-[#1E3A8A] focus:ring-[#1E3A8A] text-[#111827] transition-all duration-200"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phone.message}
                  </p>
                )}
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
                  {...register("email")}
                  className="mt-1 bg-white/70 border-[#D1D5DB] focus:border-[#1E3A8A] focus:ring-[#1E3A8A] text-[#111827] transition-all duration-200"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
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
                  {...register("password")}
                  className="mt-1 bg-white/70 border-[#D1D5DB] focus:border-[#1E3A8A] focus:ring-[#1E3A8A] text-[#111827] transition-all duration-200"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
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
                  {...register("confirmPassword")}
                  className="mt-1 bg-white/70 border-[#D1D5DB] focus:border-[#1E3A8A] focus:ring-[#1E3A8A] text-[#111827] transition-all duration-200"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
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
                    disabled={loading}
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
