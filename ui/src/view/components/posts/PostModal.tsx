import React, { useState } from "react";
import { Button, Modal, type FormInstance } from "antd";
import { buttonStyle } from "../../../styles/global";
import { createPost, updatePost } from "../../../rest/PostRequests";
import { useGlobalContext } from "../../../state/state";
import PostForm, { PostValues } from "./PostModalForm";
import { Post } from "../../../rest/common";
import { EditOutlined } from "@ant-design/icons";

interface PostCreateFormModalProps {
  open: boolean;
  onCreate: (values: PostValues) => void;
  onCancel: () => void;
  initialValues: PostValues;
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
  const { posts, setPosts, user } = useGlobalContext();

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
            const newPost = await createPost(values, user?.token || "");
            posts.unshift(newPost);
          } else {
            const updatedPost = await updatePost(
              values,
              user?.token || "",
              initialValues.id
            );
            const updatedPostIndex = posts.findIndex(
              (e) => e.id === updatedPost.id
            );
            posts[updatedPostIndex] = updatedPost;
          }
          const newPosts: Post[] = [...posts];
          setPosts(newPosts);
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
  const [formValues, setFormValues] = useState<PostValues>();
  const [open, setOpen] = useState(false);

  const onCreate = (values: PostValues) => {
    console.log("Received values of form: ", values);
    setFormValues(values);
    setOpen(false);
  };

  const title = post ? <EditOutlined /> : "New Post";
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
