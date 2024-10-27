import { useDocumentTitle } from "@uidotdev/usehooks";
import React from "react";

const ManageUser = () => {
  useDocumentTitle("Quản lý người dùng");
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Manage User Area</h1>
      <p>
        This is the dashboard area. You can replace this with your application's
        content.
      </p>
    </>
  );
};

export default ManageUser;
