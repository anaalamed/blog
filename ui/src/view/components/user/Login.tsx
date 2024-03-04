import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { login } from "../../../rest/UserRequests";
import { buttonStyle } from "../../../styles/global";

const onFinish = async (values: any) => {
  console.log("Success:", values);
  const token = await login(values);
  console.log(token);
  sessionStorage.setItem("token", token);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};

const Login: React.FC = () => (
  <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
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

    <Form.Item<FieldType>
      name="remember"
      valuePropName="checked"
      wrapperCol={{ offset: 4, span: 16 }}
    >
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
      <Button type="primary" htmlType="submit" style={buttonStyle}>
        Login
      </Button>
    </Form.Item>
  </Form>
);

export default Login;
