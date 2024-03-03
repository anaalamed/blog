import React from "react";
import { Flex } from "antd";
import { Comment } from "../../../rest/common";
import CommentCard from "./CommentCard";

const Posts: React.FC<{ comments: Comment[] }> = ({ comments }) => {
  return (
    <>
      <h3>Comments</h3>
      <Flex vertical gap="middle" justify="center" align="center">
        {comments.map((comment: Comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </Flex>
    </>
  );
};

export default Posts;
