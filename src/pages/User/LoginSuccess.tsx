import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const LoginSuccess: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Extract JWT token from URL parameters
    const params = new URLSearchParams(location.search);
    const jwt = params.get("token");
    const email = params.get("email");
    const img = params.get("img");

    if (jwt && email) {
      // Save JWT token to local storage
      localStorage.setItem("token", jwt);
      localStorage.setItem("email", email);
      if(img){
        localStorage.setItem("img", img);
      }

      console.log(localStorage.getItem("token"));

      // Redirect to home page
      navigate("/");
      window.location.reload();
    }
  }, [location]);

  return <div>로그인 성공{/* 로그인 성공 페이지 내용 */}</div>;
};

export default LoginSuccess;
