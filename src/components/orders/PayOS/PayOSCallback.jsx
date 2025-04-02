import Loading from "@/components/common/Loading";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PayOSCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  //?code=00
  // &id=2657ba0612ab4846aee73a44cb733915
  // &cancel=true
  // &status=CANCELLED
  // &orderCode=34052
  const handleCallback = async () => {
    const params = new URLSearchParams(location.search);
    const code = params.get("code");
    const id = params.get("id");
    const cancel = params.get("cancel");
    const status = params.get("status");
    const orderCode = params.get("orderCode");
    console.log("code", code);
    console.log("id", id);
    console.log("cancel", cancel);
    console.log("status", status);
    console.log("orderCode", orderCode);
  };

  useEffect(() => {
    handleCallback();
  }, []);
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loading />
    </div>
  );
};

export default PayOSCallback;
