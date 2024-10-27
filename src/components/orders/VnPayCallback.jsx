import { vnPayCallback } from "@/components/service/ApiFunctions";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const VnPayCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderRequest = JSON.parse(sessionStorage.getItem("vnpayRequest"));

  useEffect(() => {
    const handleVnPayCallback = async () => {
      const params = new URLSearchParams(location.search);
      const vnp_ResponseCode = params.get("vnp_ResponseCode");
      try {
        const response = await vnPayCallback(orderRequest, vnp_ResponseCode);
        if (response && response.data) {
          localStorage.removeItem("cart");
          toast.success("Order placed successfully");
          sessionStorage.removeItem("vnpayRequest");
          navigate("/order/success");
        }
      } catch (error) {
        localStorage.removeItem("cart");
        sessionStorage.removeItem("vnpayRequest");
        navigate("/order/fail");
        console.log(error);
      }
    };
    handleVnPayCallback();
  }, [location.search, navigate]);
  return (
    <div className="flex items-center justify-center min-h-screen">
      <span className="loading loading-dots loading-xs"></span>
    </div>
  );
};

export default VnPayCallback;
