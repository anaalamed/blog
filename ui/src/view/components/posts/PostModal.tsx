import React, { useState } from "react";
import { Button, Modal, type FormInstance } from "antd";
import { buttonStyle } from "../../../styles/global";
import {
  Post,
  PostValues,
  createPost,
  updatePost,
} from "../../../rest/postRequests";
import { useGlobalContext } from "../../../state/state";
import PostForm from "./PostModalForm";
import { EditOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";

interface PostCreateFormModalProps {
  open: boolean;
  onCreate: (values: PostValues) => void;
  onCancel: () => void;
  initialValues: PostValues;
}

const PostCreateFormModal: React.FC<PostCreateFormModalProps> = ({
  open,
  onCreate,
  onCancel,
  initialValues,
}) => {
  const [formInstance, setFormInstance] = useState<FormInstance>();
  const { allPosts, setAllPosts, setPostPage, userPosts, setUserPosts } =
    useGlobalContext();
  const location = useLocation();

  const title = initialValues.id ? "Update the post" : "Create a new post";
  const okText = initialValues.id ? "Update" : "Create";

  // Update post: update different state according to page (all posts, user's posts or post page)
  const updateStatePost = (updatedPost: Post) => {
    if (location.pathname === "/") {
      const updatedPostIndex = allPosts.findIndex(
        (e) => e.id === updatedPost.id
      );
      allPosts[updatedPostIndex] = updatedPost;
    } else if (location.pathname.includes("post")) {
      setPostPage(updatedPost);
    } else if (location.pathname.includes("user")) {
      const updatedPostIndex = userPosts.findIndex(
        (e) => e.id === updatedPost.id
      );
      userPosts[updatedPostIndex] = updatedPost;
      setUserPosts(userPosts);
    }
  };

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
          if (!initialValues.id) {
            // create a new post
            const newPost = await createPost(values);
            if (newPost !== undefined) {
              allPosts.unshift(newPost);
            }
          } else {
            // update an exisiting post
            const updatedPost = await updatePost(values, initialValues?.id);
            if (updatedPost !== undefined) {
              updateStatePost(updatedPost);
            }
          }
          const newPosts: Post[] = [...allPosts];
          setAllPosts(newPosts);
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
  const [open, setOpen] = useState(false);

  const onCreate = (values: PostValues) => {
    console.log("Received values of form: ", values);
    setOpen(false);
  };

  const title = post ? <EditOutlined /> : "New Post";
  const initialValues =
    post !== undefined
      ? { title: post.title, content: post.content, id: post.id }
      : { title: "", content: "" };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)} style={buttonStyle}>
        {title}
      </Button>
      <PostCreateFormModal
        open={open}
        onCreate={onCreate}
        onCancel={() => setOpen(false)}
        initialValues={initialValues}
      />
    </>
  );
};

export default ModalPost;
