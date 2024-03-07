import { Button, Result } from "antd";
import { Link } from "react-router-dom";
import { buttonStyle } from "../../../styles/global";
import { useGlobalContext } from "../../../state/state";

const SuccessModal: React.FC<{ isLogin: boolean }> = ({ isLogin }) => {
  const { user } = useGlobalContext();

  const title = isLogin
    ? "Successfully Logged in to Blog App!"
    : "Successfully Registered to Blog App!";

  const extra = isLogin ? (
    <>
      <Link to={"/"}>
        <Button style={buttonStyle}>Home</Button>
      </Link>
      <Link to={`/user/${user?.id}`}>
        <Button style={buttonStyle}>Profile</Button>
      </Link>
    </>
  ) : (
    <>
      <Link to={"/login"}>
        <Button style={buttonStyle}>Login</Button>
      </Link>
    </>
  );

  return <Result status="success" title={title} extra={extra} />;
};

export default SuccessModal;
