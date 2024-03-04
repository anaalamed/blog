import React from "react";
import { Card } from "antd";
import { Comment } from "../../../rest/common";
import CommentModal from "./CommentModal";
import { useGlobalContext } from "../../../state/state";

const cardStyle = {
  backgroundColor: "#EBEAFB",
  color: "#3928BD",
  textAlign: "start" as const,
  width: "70%",
};

const titleStyle = {
  backgroundColor: "#5c6cfa",
  color: "#fff",
};

const CommentCard: React.FC<{ comment: Comment }> = ({ comment }) => {
  const { isLoggedIn, user } = useGlobalContext();
  return (
    <Card
      title={comment.author.name}
      style={cardStyle}
      size="default"
      headStyle={titleStyle}
      hoverable
      extra={
        <div style={titleStyle}>
          <div>{comment.creationTime.toLocaleString()}</div>
        </div>
      }
    >
      {comment.content}
      {isLoggedIn && user?.id === comment.author.id ? (
        <CommentModal comment={comment} />
      ) : null}
    </Card>
  );
};

export default CommentCard;
