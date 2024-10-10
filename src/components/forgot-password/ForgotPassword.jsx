import { forgotPassword } from "@/components/service/ApiFunctions";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { EnvelopeOpenIcon } from "@heroicons/react/20/solid";
import { useDocumentTitle } from "@uidotdev/usehooks";
import React, { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";

const ForgotPassword = () => {
  useDocumentTitle("Forgot Password");
  const [progress, setProgress] = useState(10);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your code
    if (email.trim() === "") {
      toast.error("Email is required.", {
        duration: 4000,
      });
    } else {
      try {
        setLoading(true);
        setTimeout(() => {
          setProgress(50);
        }, 2000);

        const response = await forgotPassword(email);
        if (response.status === 200) {
          toast.success(response.data?.data, {
            richColors: true,
          });
          setEmail("");
          setTimeout(() => {
            setProgress(100);
          }, 3000);
          setLoading(false);
        }
      } catch (error) {
        toast.error(error.response?.data?.data, {
          duration: 4000,
        });
        console.log(error);
        setEmail("");
        setLoading(false);
      }
    }
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <div>
          {loading ? (
            <Progress value={progress} className="w-full" />
          ) : (
            <Button
              className="w-full"
              variant="destructive"
              onClick={handleSubmit}
            >
              <EnvelopeOpenIcon className="mr-2 h-4 w-4" /> Send Email
            </Button>
          )}
        </div>
      </div>
      <Toaster position="top-center" />
    </div>
  );
};

export default ForgotPassword;
