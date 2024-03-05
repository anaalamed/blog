import React, { useState } from "react";

import { Alert, Button, Form, Input, Result } from "antd";
import {
  authFormItemLayout,
  authTailFormItemLayout,
  buttonStyle,
} from "../../../styles/global";
import { signup } from "../../../rest/UserRequests";
import { Link } from "react-router-dom";

const Signup: React.FC = () => {
  const [form] = Form.useForm();
  const [isSuccess, setSuccess] = useState(false);
  const [isFailed, setFailed] = useState<boolean>(false);

  const onFinish = async (values: any) => {
    console.log("Received values of form: ", values);
    const user = await signup(values);
    if (user !== undefined) {
      setSuccess(true);
    } else {
      setFailed(true);
    }
    form.resetFields();
  };

  return (
    <>
      {isSuccess ? (
        <SuccessModal />
      ) : (
        <>
          <Form
            {...authFormItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            style={{ maxWidth: 600 }}
            scrollToFirstError
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
                    return Promise.reject(
                      new Error(
                        "The new password that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item {...authTailFormItemLayout}>
              <Button type="primary" htmlType="submit" style={buttonStyle}>
                Sign Up
              </Button>
            </Form.Item>
          </Form>
          {isFailed ? <Alert message="Sign Up Failed" type="error" /> : null}
        </>
      )}
    </>
  );
};

const SuccessModal: React.FC = () => (
  <Result
    status="success"
    title="Successfully Registered to Blog App!"
    extra={[
      <Link to={"/login"}>
        <Button style={buttonStyle}>Login</Button>
      </Link>,
    ]}
  />
);

export default Signup;
