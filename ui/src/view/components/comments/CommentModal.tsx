import React, { useState } from "react";
import { Button, Modal, type FormInstance } from "antd";
import { buttonStyle } from "../../../styles/global";
import { useGlobalContext } from "../../../state/state";
import CommentForm from "./CommentModalForm";
import { Comment } from "../../../rest/commentRequests";
import {
  CommentValues,
  createComment,
  updateComment,
} from "../../../rest/commentRequests";
import { useParams } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";

interface CommentFormModalProps {
  open: boolean;
  onCreate: (values: CommentValues) => void;
  onCancel: () => void;
  initialValues: CommentValues;
}

const CommentFormModal: React.FC<CommentFormModalProps> = ({
  open,
  onCreate,
  onCancel,
  initialValues,
}) => {
  const [formInstance, setFormInstance] = useState<FormInstance>();
  const { comments, setComments } = useGlobalContext();

  const title = initialValues.id
    ? "Update the comment"
    : "Create a new comment";
  const okText = initialValues.id ? "Update" : "Create";

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
          const values: CommentValues = {
            content: await formInstance?.getFieldValue("content"),
            postId: initialValues.postId,
          };
          formInstance?.resetFields();
          onCreate(values);
          if (!initialValues.id) {
            const newComment = await createComment(values);
            if (newComment !== undefined) {
              comments.unshift(newComment);
            }
          } else {
            const updatedComment = await updateComment(
              values,
              initialValues.id
            );
            if (updatedComment !== undefined) {
              const updatedCommentIndex = comments.findIndex(
                (e) => e.id === updatedComment.id
              );
              comments[updatedCommentIndex] = updatedComment;
            }
          }
          const newComments: Comment[] = [...comments];
          setComments(newComments);
        } catch (error) {
          console.log("Failed:", error);
        }
      }}
    >
      <CommentForm
        initialValues={initialValues}
        onFormInstanceReady={(instance) => {
          setFormInstance(instance);
        }}
      />
    </Modal>
  );
};

const ModalComment: React.FC<{ comment?: Comment }> = ({ comment }) => {
  const [formValues, setFormValues] = useState<CommentValues>();
  const [open, setOpen] = useState(false);
  const { postId } = useParams();

  const onCreate = (values: CommentValues) => {
    console.log("Received values of form: ", values);
    setFormValues(values);
    setOpen(false);
  };

  const title = comment ? <EditOutlined /> : "New Comment";
  const initialValues = comment
    ? { content: comment.content, id: comment.id, postId: comment.postId }
    : { content: "", postId: Number(postId) || 0 };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)} style={buttonStyle}>
        {title}
      </Button>
      {/* <pre>{JSON.stringify(formValues, null, 2)}</pre> */}
      <CommentFormModal
        open={open}
        onCreate={onCreate}
        onCancel={() => setOpen(false)}
        initialValues={initialValues}
      />
    </>
  );
};

export default ModalComment;
