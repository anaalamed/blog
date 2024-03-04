import React, { useEffect } from "react";
import { Form, type FormInstance } from "antd";
import TextArea from "antd/es/input/TextArea";

export interface CommentValues {
  content?: string;
  id?: any;
  postId?: any;
}

interface CommentFormProps {
  initialValues: CommentValues;
  onFormInstanceReady: (instance: FormInstance<CommentValues>) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({
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
        name="content"
        label="Content"
        rules={[
          {
            required: true,
            message: "Please input the content of the comment!",
          },
        ]}
      >
        <TextArea />
      </Form.Item>
    </Form>
  );
};

export default CommentForm;
