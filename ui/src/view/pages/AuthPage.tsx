import React from "react";
import Login from "../components/user/Login";
import { Flex } from "antd";
import { useLocation } from "react-router-dom";
import Signup from "../components/user/Signup";
import { ComponentWrapper, pagesStyle } from "../../styles/global";

const AuthPage: React.FC = () => {
  const location = useLocation();

  return (
    <Flex vertical justify="center" align="center" style={pagesStyle}>
      <ComponentWrapper className="form_wrapper">
        {location.pathname.includes("login") ? <Login /> : <Signup />}
      </ComponentWrapper>
    </Flex>
  );
};

export default AuthPage;
