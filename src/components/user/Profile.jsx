import vietnameseBoy from "@/assets/vietnameseBoy.png";
import { getUserDetail } from "@/components/service/ApiFunctions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChangePassword from "@/components/user/ChangePassword";
import EditProfile from "@/components/user/EditProfile";
import ProfileSkeleton from "@/components/user/ProfileSkeleton";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { motion } from "framer-motion";
import { jwtDecode } from "jwt-decode";
import {
  Edit2,
  KeyRound,
  Mail,
  MapPin,
  Phone,
  ShieldAlert,
  Sparkles,
  UserCircle2,
} from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Profile Page
 * Redesigned to match SKILL.md artistic design system
 */
const Profile = () => {
  useDocumentTitle("Hồ Sơ Cá Nhân — VA Shop");
  const accessToken = localStorage.getItem("accessToken");
  const userDecoded = accessToken ? jwtDecode(accessToken) : null;
  const [user, setUser] = useState({});
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await getUserDetail(userDecoded.id);
      setUser(response.data?.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getMemberSince = () => {
    return "Tháng 9, 2024";
  };

  if (loading) {
    return <ProfileSkeleton />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen"
    >
      {/* Profile Header Card */}
      <div className="relative bg-[#111827] rounded-3xl overflow-hidden shadow-xl mb-8 border border-gray-800">
        {/* Background glow effects */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#3B82F6]/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#8B5CF6]/20 rounded-full blur-3xl -ml-10 -mb-10 pointer-events-none" />

        <div className="relative z-10 px-6 py-10 sm:px-10 flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#3B82F6] to-[#8B5CF6] rounded-full blur-md opacity-60" />
            <Avatar className="w-32 h-32 border-4 border-[#111827] relative z-10 shadow-lg">
              <AvatarImage
                src={vietnameseBoy}
                alt={user.fullName}
                className="object-cover"
              />
              <AvatarFallback className="bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] text-white text-3xl font-display">
                {getInitials(user.fullName)}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* User Info */}
          <div className="flex-1 text-center md:text-left space-y-4">
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
                {user.fullName || "Người Dùng"}
              </h1>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white/90 text-xs font-mono tracking-widest uppercase self-center md:self-start">
                <Sparkles size={12} className="text-[#3B82F6]" />
                Thành Viên Từ {getMemberSince()}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 sm:gap-6 text-gray-300">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                  <Mail size={14} className="text-[#3B82F6]" />
                </div>
                <span className="font-medium text-sm">
                  {user.email || "Chưa cập nhật"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                  <Phone size={14} className="text-[#3B82F6]" />
                </div>
                <span className="font-medium font-mono text-sm">
                  {user.phone || "Chưa cập nhật"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <Tabs defaultValue="profile" className="w-full">
          <div className="px-6 pt-6 border-b border-gray-100">
            <TabsList className="grid w-full sm:w-[400px] grid-cols-2 bg-gray-50/80 p-1 rounded-xl">
              <TabsTrigger
                value="profile"
                className="flex items-center gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:text-[#3B82F6] data-[state=active]:shadow-sm font-semibold transition-all"
              >
                <UserCircle2 size={18} />
                <span>Hồ Sơ</span>
              </TabsTrigger>
              <TabsTrigger
                value="security"
                className="flex items-center gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:text-[#3B82F6] data-[state=active]:shadow-sm font-semibold transition-all"
              >
                <KeyRound size={18} />
                <span>Bảo Mật</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="p-6 sm:p-8">
            <TabsContent value="profile" className="m-0 space-y-8 outline-none">
              {isEditing ? (
                <EditProfile
                  setIsEditing={setIsEditing}
                  user={user}
                  fetchUser={fetchUser}
                />
              ) : (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Address Card */}
                    <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 hover:shadow-md hover:border-gray-200 transition-all">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                          <MapPin className="text-[#3B82F6]" size={20} />
                        </div>
                        <div>
                          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider font-mono mb-2">
                            Địa Chỉ Giao Hàng
                          </h3>
                          <p className="text-[#111827] font-medium leading-relaxed">
                            {user.address || "Chưa cập nhật địa chỉ giao hàng"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Email Card */}
                    <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 hover:shadow-md hover:border-gray-200 transition-all">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                          <Mail className="text-[#3B82F6]" size={20} />
                        </div>
                        <div>
                          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider font-mono mb-2">
                            Email Liên Hệ
                          </h3>
                          <a
                            href={`mailto:${user.email}`}
                            className="text-[#111827] font-medium hover:text-[#3B82F6] transition-colors"
                          >
                            {user.email || "Chưa cập nhật email"}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4 border-t border-gray-100">
                    <Button
                      onClick={() => setIsEditing(true)}
                      className="h-11 px-6 bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-xl shadow-md shadow-blue-500/20 gap-2 font-semibold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6]"
                    >
                      <Edit2 size={16} />
                      Chỉnh Sửa Hồ Sơ
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent
              value="security"
              className="m-0 space-y-8 outline-none animate-in fade-in slide-in-from-bottom-4 duration-500"
            >
              {/* Security Advisory */}
              <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-5 flex items-start gap-4">
                <ShieldAlert
                  className="text-[#3B82F6] mt-0.5 shrink-0"
                  size={24}
                />
                <div>
                  <h3 className="font-bold text-[#111827] mb-1">
                    Bảo Vệ Tài Khoản Của Bạn
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Nên thay đổi mật khẩu định kỳ 6 tháng một lần và không sử
                    dụng chung mật khẩu với các tài khoản khác. Đảm bảo mật khẩu
                    của bạn có ít nhất 8 ký tự, bao gồm chữ cái và số.
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-all">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div>
                    <h3 className="font-bold text-[#111827] mb-1">
                      Đổi Mật Khẩu Đăng Nhập
                    </h3>
                    <p className="text-sm text-gray-500">
                      Cập nhật mật khẩu mới để giữ tài khoản luôn an toàn
                    </p>
                  </div>
                  <Button
                    onClick={() => setIsPasswordModalOpen(true)}
                    variant="outline"
                    className="h-11 px-6 border-gray-200 text-[#111827] hover:text-[#3B82F6] hover:border-blue-200 hover:bg-blue-50 rounded-xl font-semibold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3B82F6] w-full sm:w-auto shrink-0"
                  >
                    Đổi Mật Khẩu
                  </Button>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Password Modal */}
      <ChangePassword
        open={isPasswordModalOpen}
        setOpen={setIsPasswordModalOpen}
      />
    </motion.div>
  );
};

export default Profile;
