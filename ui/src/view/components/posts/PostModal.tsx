import React, { useState } from "react";
import { Button, Modal, type FormInstance } from "antd";
import { buttonStyle } from "../../../styles/global";
import { createPost, updatePost } from "../../../rest/PostRequests";
import { useGlobalContext } from "../../..";
import PostForm, { Values } from "./PostModalForm";
import { Post } from "../../../rest/common";

interface PostCreateFormModalProps {
  open: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
  initialValues: Values;
  isNew: boolean;
}

const PostCreateFormModal: React.FC<PostCreateFormModalProps> = ({
  open,
  onCreate,
  onCancel,
  initialValues,
  isNew,
}) => {
  const [formInstance, setFormInstance] = useState<FormInstance>();
  const { token, posts, setPosts } = useGlobalContext();

  const title = isNew ? "Create a new post" : "Update the post";
  const okText = isNew ? "Create" : "Update";

  return (
    <Modal
      open={open}
      title={title}
      okText={okText}
      cancelText="Cancel"
      okButtonProps={{ autoFocus: true, style: buttonStyle }}
      onCancel={onCancel}
      destroyOnClose
      onOk={async () => {
        try {
          const values = await formInstance?.validateFields();
          formInstance?.resetFields();
          onCreate(values);
          if (isNew) {
            const newPost = await createPost(values, token);
            posts.unshift(newPost);
          } else {
            const updatedPost = await updatePost(
              values,
              token,
              initialValues.id
            );
            posts.unshift(updatedPost);
          }
          setPosts(posts);
          console.log(posts);
        } catch (error) {
          console.log("Failed:", error);
        }
      }}
    >
      <PostForm
        initialValues={initialValues}
        onFormInstanceReady={(instance) => {
          setFormInstance(instance);
        }}
      />
    </Modal>
  );
};

const ModalPost: React.FC<{ post?: Post }> = ({ post }) => {
  const [formValues, setFormValues] = useState<Values>();
  const [open, setOpen] = useState(false);

  const onCreate = (values: Values) => {
    console.log("Received values of form: ", values);
    setFormValues(values);
    setOpen(false);
  };

  const title = post ? "Update" : "New Post";
  const initialValues = post
    ? { title: post.title, content: post.content, id: post.id }
    : { title: "", content: "" };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)} style={buttonStyle}>
        {title}
      </Button>
      {/* <pre>{JSON.stringify(formValues, null, 2)}</pre> */}
      <PostCreateFormModal
        open={open}
        onCreate={onCreate}
        onCancel={() => setOpen(false)}
        initialValues={initialValues}
        isNew={post ? false : true}
      />
    </>
  );
};

export default ModalPost;