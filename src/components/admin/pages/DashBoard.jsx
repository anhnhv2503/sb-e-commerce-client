import { useDocumentTitle } from "@uidotdev/usehooks";
import React from "react";

const DashBoard = () => {
  useDocumentTitle("Dashboard");
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Dashboard Area</h1>
      <p>
        This is the dashboard area. You can replace this with your application's
        content.
      </p>
    </>
  );
};

export default DashBoard;
