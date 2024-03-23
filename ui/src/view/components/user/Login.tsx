import React, { useState } from "react";
import { Alert, Button, Form, Input, Spin } from "antd";
import { User, UserValues, login } from "../../../rest/userRequests";
import {
  authFormItemLayout,
  authTailFormItemLayout,
  buttonStyle,
} from "../../../styles/global";
import { useGlobalContext } from "../../../state/state";
import SuccessModal from "./SuccessModal";
import Cookies from "js-cookie";

type FieldType = {
  email?: string;
  password?: string;
};

const Login: React.FC = () => {
  const { setIsLoggedIn, setUser } = useGlobalContext();
  const [isFailed, setFailed] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isSuccess, setSuccess] = useState(false);

  const onFinish = async (values: UserValues) => {
    setLoading(true);
    const loginResponse = await login(values);
    if (loginResponse !== undefined) {
      const user: User = {
        id: loginResponse.userResponse.id,
        name: loginResponse.userResponse.name,
        email: loginResponse.userResponse.email,
      };
      setUser(user);
      setIsLoggedIn(true);
      setSuccess(true);

      const cookiesSettings = {
        // expires in 30 minutes
        expires: new Date(new Date().getTime() + 30 * 60 * 1000),
        secure: true,
      };
      Cookies.set("Authorization", loginResponse.token, cookiesSettings);
      Cookies.set("user", JSON.stringify(user), cookiesSettings);
    } else {
      setFailed(true);
    }
    setLoading(false);
  };

  if (isLoading) {
    return <Spin />;
  }

  if (isSuccess) {
    return <SuccessModal isLogin={true} />;
  }

  return (
    <>
      <Form
        {...authFormItemLayout}
        name="basic"
        style={{ maxWidth: 600 }}
        initialValues={{}}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...authTailFormItemLayout}>
          <Button type="primary" htmlType="submit" style={buttonStyle}>
            Login
          </Button>
        </Form.Item>
      </Form>

      {isFailed ? <Alert message="Login Failed" type="error" /> : null}
    </>
  );
};

export default Login;
