import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { getUserDetail } from "../service/ApiFunctions";
import ChangePassword from "./ChangePassword";

const Profile = () => {
  useDocumentTitle("Profile");
  const accessToken = localStorage.getItem("accessToken");

  const userDecoded = jwtDecode(accessToken) ? jwtDecode(accessToken) : null;

  const [user, setUser] = useState({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserDetail(userDecoded.id);
        setUser(response.data?.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="pt-32 pb-44 bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-3xl p-6 bg-white shadow-md rounded-lg">
        <div className="flex flex-col items-center space-y-6">
          <Avatar className="w-40 h-40 rounded-full shadow-lg">
            <AvatarImage src="https://github.com/shadcn.png" alt="@VAShop" />
            <AvatarFallback>{user.fullName}</AvatarFallback>
          </Avatar>

          {/* Name and Email */}
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-gray-900">
              {user.fullName}
            </h1>
            <p className="text-gray-500">{user.phone}</p>
          </div>

          {/* Edit Profile Button */}
          <div className="">
            <button className="px-4 py-2 transition ease-in-out delay-150  bg-gray-500 text-white rounded-md shadow hover:-translate-y-1 hover:scale-110 hover:bg-gray-700 duration-300">
              Edit Profile
            </button>
            <button
              onClick={() => setOpen(true)}
              className="px-4 py-2 rounded-md text-white transition ease-in-out delay-150 bg-rose-600 hover:-translate-y-1 hover:scale-110 hover:bg-rose-700 duration-300 ms-5"
            >
              Change Password
            </button>
          </div>
          <ChangePassword open={open} setOpen={setOpen} />

          {/* Additional Information */}
          <div className="w-full grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-800">Location</h2>
              <p className="text-gray-600">{user.address}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-800">Email</h2>
              <a
                href={`mailto:${user.email}`}
                className="text-indigo-600 hover:underline"
              >
                {user.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
