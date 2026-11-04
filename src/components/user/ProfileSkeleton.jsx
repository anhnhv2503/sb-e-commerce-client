import React from "react";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * ProfileSkeleton Component
 * Redesigned to match SKILL.md artistic design system (matching Profile.jsx layout)
 */
const ProfileSkeleton = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      {/* Profile Header Card Skeleton */}
      <div className="relative bg-[#ff8e3c] rounded-md overflow-hidden mb-8 border border-gray-800">
        <div className="relative z-10 px-6 py-10 sm:px-10 flex flex-col md:flex-row items-center md:items-start gap-8">
          <Skeleton className="w-32 h-32 rounded-full bg-gray-700 border-4 border-[#111827] shrink-0" />

          <div className="flex-1 text-center md:text-left space-y-4 w-full">
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <Skeleton className="h-10 w-48 bg-gray-700 mx-auto md:mx-0" />
              <Skeleton className="h-6 w-36 bg-gray-700 rounded-full mx-auto md:mx-0" />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 sm:gap-6 mt-4">
              <Skeleton className="h-6 w-40 bg-gray-700" />
              <Skeleton className="h-6 w-32 bg-gray-700" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area Skeleton */}
      <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
        <div className="px-6 pt-6 border-b border-gray-100">
          <div className="grid w-full sm:w-[400px] grid-cols-2 gap-2 mb-2">
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Skeleton className="h-28 w-full rounded-lg" />
            <Skeleton className="h-28 w-full rounded-lg" />
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-100">
            <Skeleton className="h-11 w-40 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
