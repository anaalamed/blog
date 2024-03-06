import React, { useState } from "react";
import { Button, Modal, type FormInstance } from "antd";
import { buttonStyle } from "../../../styles/global";
import { useGlobalContext } from "../../../state/state";
import CommentForm, { CommentValues } from "./CommentModalForm";
import { Comment } from "../../../rest/common";
import { createComment, updateComment } from "../../../rest/commentRequests";
import { useParams } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";

interface CommentFormModalProps {
  open: boolean;
  onCreate: (values: CommentValues) => void;
  onCancel: () => void;
  initialValues: CommentValues;
  isNew: boolean;
}

const CommentFormModal: React.FC<CommentFormModalProps> = ({
  open,
  onCreate,
  onCancel,
  initialValues,
  isNew,
}) => {
  const [formInstance, setFormInstance] = useState<FormInstance>();
  const { comments, setComments, user } = useGlobalContext();

  const title = isNew ? "Create a new comment" : "Update the comment";
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
            const newComment = await createComment(
              values,
              user?.token || "",
              initialValues.postId
            );
            if (newComment !== undefined) {
              comments.unshift(newComment);
            }
          } else {
            const updatedComment = await updateComment(
              values,
              user?.token || "",
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
    : { content: "", postId: postId };

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
        isNew={comment ? false : true}
      />
    </>
  );
};

export default ModalComment;
