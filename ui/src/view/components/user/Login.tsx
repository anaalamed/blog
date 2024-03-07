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
        token: loginResponse.token,
      };
      setUser(user);
      setIsLoggedIn(true);
      setSuccess(true);
      sessionStorage.setItem("user", JSON.stringify(user));
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
