import { Button } from "@/components/ui/button";
import { useDocumentTitle } from "@uidotdev/usehooks";
import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const nav = useNavigate();
  useDocumentTitle("Not Found!");
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-7xl font-bold text-gray-800">404</h1>
        <h2 className="text-2xl mt-4 text-gray-600">
          Oops! The page you're looking for doesn't exist.
        </h2>
        <p className="mt-2 text-gray-500">
          It looks like the page you are trying to access is not available.
        </p>
        <Button className="mt-6" onClick={() => nav("/")}>
          Go Back Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
