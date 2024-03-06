import React, { useState } from "react";
import { Alert, Button, Form, Input } from "antd";
import { login } from "../../../rest/userRequests";
import {
  authFormItemLayout,
  authTailFormItemLayout,
  buttonStyle,
} from "../../../styles/global";
import { useGlobalContext } from "../../../state/state";
import { useNavigate } from "react-router-dom";
import { User } from "../../../rest/common";

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

type FieldType = {
  email?: string;
  password?: string;
};

const Login: React.FC = () => {
  const { setIsLoggedIn, setUser } = useGlobalContext();
  const [isFailed, setFailed] = useState<boolean>(false);
  const navigate = useNavigate();

  console.log(isFailed);

  const onFinish = async (values: any) => {
    const loginResponse = await login(values);
    if (loginResponse !== undefined) {
      const user: User = {
        id: loginResponse.userResponse.id,
        name: loginResponse.userResponse.name,
        email: loginResponse.userResponse.email,
        token: loginResponse.token,
      };
      setUser(user);
      setIsLoggedIn(true);
      navigate("/");
    } else {
      setFailed(true);
    }
  };

  return (
    <>
      <Form
        {...authFormItemLayout}
        name="basic"
        style={{ maxWidth: 600 }}
        initialValues={{}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
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
