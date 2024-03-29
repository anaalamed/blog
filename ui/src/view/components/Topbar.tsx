import { Flex } from "antd";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useGlobalContext } from "../../state/state";
import ModalPost from "./posts/PostModal";
import UserName from "./user/UserName";
import { linkStyle } from "../../styles/global";

const Topbar: React.FC = () => {
  const { user, isLoggedIn } = useGlobalContext();
  const location = useLocation();

  return (
    <Flex justify="space-between" align="center">
      <Link style={linkStyle} to="/">
        Home
      </Link>

      {isLoggedIn ? (
        <>
          <Flex justify="space-between" align="center" gap={16}>
            {location.pathname === "/" ? <ModalPost /> : null}
            <UserName user={user} />
          </Flex>
        </>
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
