import React, { useState } from "react";

import { Alert, Button, Form, Input, Spin } from "antd";
import {
  authFormItemLayout,
  authTailFormItemLayout,
  buttonStyle,
} from "../../../styles/global";
import { UserValues, signup } from "../../../rest/userRequests";
import SuccessModal from "./SuccessModal";

const Signup: React.FC = () => {
  const [form] = Form.useForm();
  const [isSuccess, setSuccess] = useState(false);
  const [isFailed, setFailed] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);

  const onFinish = async (values: UserValues) => {
    setLoading(true);
    console.log("Received values of form: ", values);
    const user = await signup(values);
    if (user !== undefined) {
      setSuccess(true);
      form.resetFields();
    } else {
      setFailed(true);
    }
    setLoading(false);
  };

  if (isLoading) {
    return <Spin />;
  }

  if (isSuccess) {
    return <SuccessModal isLogin={false} />;
  }

  return (
    <>
      <Form
        {...authFormItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
        scrollToFirstError
        id="signup_form"
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: "Please input your name!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
            {
              pattern: new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$"),
              message: "Minimum 8 characters, at least 1 letter and 1 number",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("The password do not match!"));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...authTailFormItemLayout}>
          <Button
            type="primary"
            htmlType="submit"
            style={buttonStyle}
            id="signup_btn"
          >
            {" "}
            Sign Up
          </Button>
        </Form.Item>
      </Form>

      {isFailed ? <Alert message="Sign Up Failed" type="error" /> : null}
    </>
  );
};

export default Signup;
