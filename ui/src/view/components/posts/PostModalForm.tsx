import React, { useEffect } from "react";
import { Form, Input, type FormInstance } from "antd";
import TextArea from "antd/es/input/TextArea";

export interface Values {
  title?: string;
  content?: string;
  id?: number;
}

interface PostCreateFormProps {
  initialValues: Values;
  onFormInstanceReady: (instance: FormInstance<Values>) => void;
}

const PostForm: React.FC<PostCreateFormProps> = ({
  initialValues,
  onFormInstanceReady,
}) => {
  const [form] = Form.useForm();
  useEffect(() => {
    onFormInstanceReady(form);
  }, []);

  return (
    <Form
      layout="vertical"
      form={form}
      name="form_in_modal"
      initialValues={initialValues}
    >
      <Form.Item
        name="title"
        label="Title"
        rules={[{ required: true, message: "Please input the title of post!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="content"
        label="Content"
        rules={[
          { required: true, message: "Please input the content of the post!" },
        ]}
      >
        <TextArea />
      </Form.Item>
    </Form>
  );
};

export default PostForm;
