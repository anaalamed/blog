import { Flex } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const Topbar: React.FC = () => {
  return (
    <Flex justify="space-between" align="center">
      <Link style={{ color: "#fff", fontWeight: "bold" }} to="/">
        Home
      </Link>
      <div>Hey, Guest</div>
    </Flex>
  );
};

export default Topbar;
