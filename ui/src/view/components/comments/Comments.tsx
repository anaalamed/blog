import React from "react";
import { Divider, Flex } from "antd";
import { Comment } from "../../../rest/commentRequests";
import CommentCard from "./CommentCard";
import { useGlobalContext } from "../../../state/state";
import CommentModal from "./CommentModal";

const Comments: React.FC<{ comments: Comment[] }> = ({ comments }) => {
  const { isLoggedIn } = useGlobalContext();
  return (
    <div style={{ width: "100%" }}>
      <h3>{comments.length ? "Comments" : "No comments yet..."}</h3>

      {isLoggedIn ? <CommentModal /> : null}
      <Divider />

      <Flex vertical gap="middle" justify="center" align="center">
        {comments.map((comment: Comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </Flex>
    </div>
  );
};

export default Comments;
