import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { getUserDetail } from "../service/ApiFunctions";

const Profile = () => {
  const accessToken = localStorage.getItem("accessToken");

  const userDecoded = jwtDecode(accessToken) ? jwtDecode(accessToken) : null;

  const [user, setUser] = useState({});

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
    <div className="pt-32 pb-32 bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-3xl p-6 bg-white shadow-md rounded-lg">
        <div className="flex flex-col items-center space-y-6">
          {/* Profile Picture */}
          <img
            className="w-32 h-32 rounded-full shadow-lg"
            src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
            alt={user.fullName + " profile picture"}
          />

          {/* Name and Email */}
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-gray-900">
              {user.fullName}
            </h1>
            <p className="text-gray-500">{user.phone}</p>
          </div>

          {/* Edit Profile Button */}
          {/* <div>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700">
              Edit Profile
            </button>
          </div> */}

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
