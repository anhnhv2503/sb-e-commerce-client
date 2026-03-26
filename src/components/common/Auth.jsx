import AppLoading from "@/components/common/AppLoading";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
            `http://localhost:8080/api/auth/google-login?code=${authCode}`,
          );
          localStorage.setItem(
            "accessToken",
            JSON.stringify(response.accessToken),
          );
          setIsLoggedIn(true);
        } catch (error) {
          console.log(error);
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
