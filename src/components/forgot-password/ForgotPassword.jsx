import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { EnvelopeOpenIcon } from "@heroicons/react/20/solid";
import { useDocumentTitle } from "@uidotdev/usehooks";
import React, { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";

const ForgotPassword = () => {
  useDocumentTitle("Forgot Password");
  const [progress, setProgress] = useState(10);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(100), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your code
    toast.success("Email sent successfully.", {
      duration: 4000,
      icon: "✉️",
    });
  };
  return (
    <div className="flex items-center justify-center h-screen p-8 pb-44 bg-blue-200">
      <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-md rounded-lg">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Forgot Password
        </h2>

        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            className="w-full mt-1 p-2 input input-bordered bg-white text-black border-gray-300"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Submit Button */}
        <div>
          <Button
            className="w-full"
            variant="destructive"
            onClick={handleSubmit}
          >
            <EnvelopeOpenIcon className="mr-2 h-4 w-4" /> Send Email
          </Button>
        </div>
        <Progress value={progress} className="w-full" />
      </div>
      <Toaster />
    </div>
  );
};

export default ForgotPassword;
