import { Flex } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../..";

const linkStyle = { color: "#fff", fontWeight: "bold" };

const Topbar: React.FC = () => {
  const { userName, isLoggedIn } = useGlobalContext();

  return (
    <Flex justify="space-between" align="center">
      <Link style={linkStyle} to="/">
        Home
      </Link>

      {isLoggedIn ? (
        <div>Hey, {userName}</div>
      ) : (
        <Flex justify="space-between" gap={16}>
          <Link style={linkStyle} to="/signup">
            Signup
          </Link>
          <Link style={linkStyle} to="/login">
            Login
          </Link>
        </Flex>
      )}
    </Flex>
  );
};

export default Topbar;
