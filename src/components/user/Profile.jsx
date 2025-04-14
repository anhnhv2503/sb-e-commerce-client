import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EditProfile from "@/components/user/EditProfile";
import ProfileSkeleton from "@/components/user/ProfileSkeleton";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { jwtDecode } from "jwt-decode";
import {
  AlertCircle,
  Edit,
  Key,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import vietnameseBoy from "@/assets/vietnameseBoy.png";
import { getUserDetail } from "@/components/service/ApiFunctions";
import ChangePassword from "@/components/user/ChangePassword";

const Profile = () => {
  useDocumentTitle("Hồ sơ cá nhân");
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
      setLoading(false);
    } catch (error) {
      console.error(error);
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

  // Calculate membership duration
  const getMemberSince = () => {
    // This is a placeholder, you would get the actual date from the user data
    return "Tháng 9, 2024";
  };

  if (loading) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="bg-white py-16 px-4 mb-5">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="pb-0">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <Avatar className="w-28 h-28 border-4 border-white shadow-md">
                <AvatarImage src={vietnameseBoy} alt={user.fullName} />
                <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-xl">
                  {getInitials(user.fullName)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <h1 className="text-2xl font-bold">{user.fullName}</h1>
                  <Badge
                    variant="outline"
                    className="self-center md:self-start"
                  >
                    Thành viên từ {getMemberSince()}
                  </Badge>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-3">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Mail size={16} />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Phone size={16} />
                    <span>{user.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-6">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger
                  value="profile"
                  className="flex items-center gap-2"
                >
                  <User size={16} />
                  <span>Thông tin cá nhân</span>
                </TabsTrigger>
                <TabsTrigger
                  value="security"
                  className="flex items-center gap-2"
                >
                  <Key size={16} />
                  <span>Bảo mật</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-6">
                {isEditing ? (
                  <EditProfile setIsEditing={setIsEditing} />
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="bg-gray-50 border-none shadow-sm">
                        <CardContent className="pt-6">
                          <div className="flex items-start gap-3">
                            <MapPin
                              className="text-muted-foreground mt-1"
                              size={20}
                            />
                            <div>
                              <h3 className="font-medium mb-1">Địa chỉ</h3>
                              <p className="text-muted-foreground">
                                {user.address || "Chưa cập nhật"}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-gray-50 border-none shadow-sm">
                        <CardContent className="pt-6">
                          <div className="flex items-start gap-3">
                            <Mail
                              className="text-muted-foreground mt-1"
                              size={20}
                            />
                            <div>
                              <h3 className="font-medium mb-1">Email</h3>
                              <a
                                href={`mailto:${user.email}`}
                                className="text-primary hover:underline"
                              >
                                {user.email}
                              </a>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="flex justify-end">
                      <Button
                        onClick={() => setIsEditing(true)}
                        className="gap-2"
                      >
                        <Edit size={16} />
                        Chỉnh sửa thông tin
                      </Button>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="security" className="space-y-6">
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="text-amber-500 mt-0.5" size={20} />
                  <div>
                    <h3 className="font-medium text-amber-800 mb-1">
                      Bảo mật tài khoản
                    </h3>
                    <p className="text-amber-700 text-sm">
                      Thay đổi mật khẩu thường xuyên và không chia sẻ thông tin
                      đăng nhập của bạn với người khác.
                    </p>
                  </div>
                </div>

                <Card className="bg-gray-50 border-none shadow-sm">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h3 className="font-medium">Đổi mật khẩu</h3>
                        <p className="text-sm text-muted-foreground">
                          Thay đổi mật khẩu để bảo vệ tài khoản của bạn
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => setIsPasswordModalOpen(true)}
                      >
                        Đổi mật khẩu
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Password Modal */}
      <ChangePassword
        open={isPasswordModalOpen}
        setOpen={setIsPasswordModalOpen}
      />
    </div>
  );
};

export default Profile;
