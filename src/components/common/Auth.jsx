import AppLoading from "@/components/common/AppLoading";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const Auth = () => {
  const nav = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const accessTokenRegex = /code=([^&]+)/;
    const isMatch = window.location.href.match(accessTokenRegex);

    if (isMatch) {
      const fetchToken = async () => {
        const authCode = isMatch[1];
        try {
          const response = await axios.post(
            `${BASE_URL}/api/auth/google-login?code=${authCode}`,
          );
          localStorage.setItem(
            "accessToken",
            JSON.stringify(response.accessToken),
          );
          setIsLoggedIn(true);
        } catch (error) {
          console.log(error);
          toast.error(
            error?.response?.data?.message || "Đăng nhập bằng Google thất bại",
          );
          nav("/login", { replace: true });
        }
      };
      fetchToken();
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      nav("/");
    }
  }, [isLoggedIn, nav]);

  return <AppLoading />;
};

export default Auth;
