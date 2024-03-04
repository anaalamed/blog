import { Flex } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const linkStyle = { color: "#fff", fontWeight: "bold" };

const Topbar: React.FC = () => {
  return (
    <Flex justify="space-between" align="center">
      <Link style={linkStyle} to="/">
        Home
      </Link>

      <Flex justify="space-between" gap={16}>
        <Link style={linkStyle} to="/signup">
          Signup
        </Link>
        <Link style={linkStyle} to="/login">
          Login
        </Link>
        {/* <div>Hey, Guest</div> */}
      </Flex>
    </Flex>
  );
};

export default Topbar;
