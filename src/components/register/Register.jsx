import Loading from "@/components/common/Loading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerSchema } from "@/schemas/register.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, MapPin, Phone, Sparkles, User } from "lucide-react";
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, when: "beforeChildren", staggerChildren: 0.06 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

const Register = () => {
  useDocumentTitle("Đăng Ký — VA Shop");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registerSchema) });

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

  const FieldError = ({ error }) =>
    error ? (
      <p className="text-[#DC2626] text-xs mt-1.5" role="alert">{error.message}</p>
    ) : null;

  return (
    <div className="min-h-[calc(100vh-80px)] flex">
      {/* ── Left decorative panel ── */}
      <div className="hidden lg:flex lg:w-5/12 relative bg-[#111827] items-center justify-center overflow-hidden">
        <div className="absolute top-1/3 -left-16 w-64 h-64 bg-[#8B5CF6]/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-[#3B82F6]/20 rounded-full blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative z-10 px-12 max-w-md text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-white/80 text-sm font-mono tracking-widest uppercase mb-8">
            <Sparkles size={14} className="text-[#8B5CF6]" aria-hidden="true" />
            VA Shop
          </div>
          <h2 className="font-display text-4xl text-white leading-tight mb-6">
            Tạo Tài Khoản
          </h2>
          <p className="text-white/60 text-base leading-relaxed">
            Đăng ký miễn phí để trải nghiệm mua sắm thời trang cao cấp, theo dõi đơn hàng và nhiều ưu đãi hấp dẫn.
          </p>
        </motion.div>
      </div>

      {/* ── Right form panel ── */}
      <div className="w-full lg:w-7/12 flex items-start justify-center p-6 sm:p-10 bg-gray-50 overflow-y-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-2xl py-4"
        >
          <Card className="border border-gray-200 shadow-lg bg-white">
            <CardHeader className="pb-2 pt-8 px-8">
              <motion.div variants={itemVariants}>
                <h1 className="font-display text-3xl font-bold text-[#111827] text-center">
                  ĐĂNG KÝ
                </h1>
                <p className="text-sm text-gray-500 text-center mt-2">
                  Điền thông tin bên dưới để tạo tài khoản mới
                </p>
              </motion.div>
            </CardHeader>

            <CardContent className="px-8 pb-8 pt-4">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Row: Full Name + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <motion.div variants={itemVariants}>
                    <Label htmlFor="reg-fullName" className="text-[#111827] text-sm font-medium">Họ Tên</Label>
                    <div className="relative mt-1.5">
                      <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
                      <Input
                        id="reg-fullName"
                        type="text"
                        required
                        {...register("fullName")}
                        placeholder="Nguyễn Văn A"
                        className="pl-10 h-11 bg-white border-gray-300 focus:border-[#3B82F6] focus:ring-[#3B82F6] text-[#111827]"
                      />
                    </div>
                    <FieldError error={errors.fullName} />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Label htmlFor="reg-phone" className="text-[#111827] text-sm font-medium">Số điện thoại</Label>
                    <div className="relative mt-1.5">
                      <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
                      <Input
                        id="reg-phone"
                        type="text"
                        required
                        {...register("phone")}
                        placeholder="0912 345 678"
                        className="pl-10 h-11 bg-white border-gray-300 focus:border-[#3B82F6] focus:ring-[#3B82F6] text-[#111827]"
                      />
                    </div>
                    <FieldError error={errors.phone} />
                  </motion.div>
                </div>

                {/* Address section */}
                <motion.div variants={itemVariants} className="space-y-3">
                  <Label className="text-[#111827] text-sm font-medium flex items-center gap-1.5">
                    <MapPin size={14} className="text-gray-400" aria-hidden="true" />
                    Địa chỉ
                  </Label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <Select onValueChange={setSelectedProvince}>
                      <SelectTrigger className="h-11 bg-white border-gray-300 focus:border-[#3B82F6] text-[#111827]">
                        <SelectValue placeholder="Tỉnh/Thành" />
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
                      <SelectTrigger className="h-11 bg-white border-gray-300 focus:border-[#3B82F6] text-[#111827]">
                        <SelectValue placeholder="Quận/Huyện" />
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
                      <SelectTrigger className="h-11 bg-white border-gray-300 focus:border-[#3B82F6] text-[#111827]">
                        <SelectValue placeholder="Phường/Xã" />
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
                    id="reg-homeAddress"
                    type="text"
                    required
                    onChange={(e) => setHomeAddress(e.target.value)}
                    placeholder="Số nhà, đường, ngõ…"
                    className="h-11 bg-white border-gray-300 focus:border-[#3B82F6] focus:ring-[#3B82F6] text-[#111827]"
                  />
                </motion.div>

                {/* Email */}
                <motion.div variants={itemVariants}>
                  <Label htmlFor="reg-email" className="text-[#111827] text-sm font-medium">Email</Label>
                  <div className="relative mt-1.5">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
                    <Input
                      id="reg-email"
                      type="email"
                      required
                      {...register("email")}
                      placeholder="you@example.com"
                      className="pl-10 h-11 bg-white border-gray-300 focus:border-[#3B82F6] focus:ring-[#3B82F6] text-[#111827]"
                    />
                  </div>
                  <FieldError error={errors.email} />
                </motion.div>

                {/* Password row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <motion.div variants={itemVariants}>
                    <Label htmlFor="reg-password" className="text-[#111827] text-sm font-medium">Mật khẩu</Label>
                    <div className="relative mt-1.5">
                      <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
                      <Input
                        id="reg-password"
                        type={showPassword ? "text" : "password"}
                        required
                        {...register("password")}
                        placeholder="••••••••"
                        className="pl-10 pr-10 h-11 bg-white border-gray-300 focus:border-[#3B82F6] focus:ring-[#3B82F6] text-[#111827]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label={showPassword ? "Ẩn mật khẩu" : "Hiển thị mật khẩu"}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    <FieldError error={errors.password} />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Label htmlFor="reg-confirmPassword" className="text-[#111827] text-sm font-medium">Nhập lại mật khẩu</Label>
                    <div className="relative mt-1.5">
                      <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
                      <Input
                        id="reg-confirmPassword"
                        type={showPassword ? "text" : "password"}
                        required
                        {...register("confirmPassword")}
                        placeholder="••••••••"
                        className="pl-10 h-11 bg-white border-gray-300 focus:border-[#3B82F6] focus:ring-[#3B82F6] text-[#111827]"
                      />
                    </div>
                    <FieldError error={errors.confirmPassword} />
                  </motion.div>
                </div>

                {/* Show password */}
                <motion.div variants={itemVariants} className="flex items-center gap-2">
                  <Checkbox
                    id="reg-show-password"
                    checked={showPassword}
                    onCheckedChange={() => setShowPassword(!showPassword)}
                    className="border-gray-400 data-[state=checked]:bg-[#3B82F6] data-[state=checked]:border-[#3B82F6]"
                  />
                  <Label htmlFor="reg-show-password" className="text-sm text-gray-500 cursor-pointer">
                    Hiển thị mật khẩu
                  </Label>
                </motion.div>

                {/* Submit */}
                <motion.div variants={itemVariants}>
                  {loading ? (
                    <div className="flex items-center justify-center py-3">
                      <Loading />
                    </div>
                  ) : (
                    <Button
                      type="submit"
                      disabled={loading}
                      id="register-submit-btn"
                      className="w-full h-12 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold text-base transition-colors shadow-md shadow-blue-500/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6] rounded-lg"
                    >
                      Tạo Tài Khoản
                    </Button>
                  )}
                </motion.div>

                {/* Login link */}
                <motion.div variants={itemVariants}>
                  <p className="text-sm text-center text-gray-500">
                    Đã có tài khoản?{" "}
                    <button
                      type="button"
                      onClick={() => nav("/login")}
                      className="text-[#3B82F6] hover:text-[#2563EB] font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3B82F6] rounded"
                    >
                      Đăng Nhập
                    </button>
                  </p>
                </motion.div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
