import React, { useState, useEffect } from "react";
import { Button, Form, Input, Modal, type FormInstance } from "antd";
import { buttonStyle } from "../../../styles/global";
import { createPost } from "../../../rest/PostRequests";
import { useGlobalContext } from "../../..";

interface Values {
  title?: string;
  content?: string;
}

interface PostCreateFormProps {
  initialValues: Values;
  onFormInstanceReady: (instance: FormInstance<Values>) => void;
}

const PostCreateForm: React.FC<PostCreateFormProps> = ({
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
        <Input type="textarea" />
      </Form.Item>
    </Form>
  );
};

interface PostCreateFormModalProps {
  open: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
  initialValues: Values;
}

const PostCreateFormModal: React.FC<PostCreateFormModalProps> = ({
  open,
  onCreate,
  onCancel,
  initialValues,
}) => {
  const [formInstance, setFormInstance] = useState<FormInstance>();
  const { token, posts, setPosts } = useGlobalContext();

  return (
    <Modal
      open={open}
      title="Create a new post"
      okText="Create"
      cancelText="Cancel"
      okButtonProps={{ autoFocus: true, style: buttonStyle }}
      onCancel={onCancel}
      destroyOnClose
      onOk={async () => {
        try {
          const values = await formInstance?.validateFields();
          formInstance?.resetFields();
          onCreate(values);
          const newPost = await createPost(values, token);
          posts.unshift(newPost);
          setPosts(posts);
          console.log(posts);
        } catch (error) {
          console.log("Failed:", error);
        }
      }}
    >
      <PostCreateForm
        initialValues={initialValues}
        onFormInstanceReady={(instance) => {
          setFormInstance(instance);
        }}
      />
    </Modal>
  );
};

const ModalAddPost: React.FC = () => {
  const [formValues, setFormValues] = useState<Values>();
  const [open, setOpen] = useState(false);

  const onCreate = (values: Values) => {
    console.log("Received values of form: ", values);
    setFormValues(values);
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)} style={buttonStyle}>
        New Post
      </Button>
      {/* <pre>{JSON.stringify(formValues, null, 2)}</pre> */}
      <PostCreateFormModal
        open={open}
        onCreate={onCreate}
        onCancel={() => setOpen(false)}
        initialValues={{ title: "", content: "" }}
      />
    </>
  );
};

export default ModalAddPost;
