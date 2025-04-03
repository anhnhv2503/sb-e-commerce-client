import Loading from "@/components/common/Loading";
import { executePayOSPayment } from "@/components/service/ApiFunctions";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PayOSCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleCallback = async () => {
    const params = new URLSearchParams(location.search);
    const code = params.get("code");
    const id = params.get("id");
    const cancel = params.get("cancel");
    const status = params.get("status");
    const orderCode = params.get("orderCode");
    const paymentRequest = {
      code,
      id,
      cancel,
      status,
      orderCode,
    };
    try {
      const reponse = await executePayOSPayment(paymentRequest);
      if (reponse.data?.status === 200) {
        navigate("/order/success", { replace: true });
      } else {
        navigate("/order/fail", { replace: true });
      }
    } catch (error) {
      console.log(error);
      navigate("/order/fail", { replace: true });
    }
  };

  useEffect(() => {
    handleCallback();
  }, [location.search]);
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loading />
    </div>
  );
};

export default PayOSCallback;
