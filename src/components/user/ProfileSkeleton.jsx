import React from "react";

const ProfileSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="animate-pulse text-center">
        <div className="w-20 h-20 rounded-full bg-gray-300 mx-auto mb-4"></div>
        <div className="h-6 w-48 bg-gray-300 rounded mx-auto mb-2"></div>
        <div className="h-4 w-32 bg-gray-300 rounded mx-auto"></div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
