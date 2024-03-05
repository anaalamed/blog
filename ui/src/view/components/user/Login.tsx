import React from "react";
import { Button, Form, Input } from "antd";
import { login } from "../../../rest/UserRequests";
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
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      const loginResponse = await login(values);
      const user: User = {
        id: loginResponse.userResponse.id,
        name: loginResponse.userResponse.name,
        email: loginResponse.userResponse.email,
        token: loginResponse.token,
      };
      setUser(user);
      setIsLoggedIn(true);
      navigate("/");
    } catch (e) {
      console.error("Login failed");
    }
  };

  return (
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
  );
};

export default Login;
