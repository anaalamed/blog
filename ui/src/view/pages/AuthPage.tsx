import React from "react";
import Login from "../components/user/Login";
import { Flex } from "antd";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import Signup from "../components/user/Signup";
import { pagesStyle } from "../../styles/global";

const AuthPage: React.FC = () => {
  const location = useLocation();

  return (
    <Flex vertical justify="center" align="center" style={pagesStyle}>
      <WormWrapper className="form_wrapper">
        {location.pathname.includes("login") ? <Login /> : <Signup />}
      </WormWrapper>
    </Flex>
  );
};

const WormWrapper = styled.div`
  box-shadow: 22px 22px 40px rgba(0, 0, 0, 0.1);
  padding: 3rem 3rem;
  border-radius: 0.5rem;
  background: #fff;
  width: 50%;
  max-width: 600px;
`;

export default AuthPage;
