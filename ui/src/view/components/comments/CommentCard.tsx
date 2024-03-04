import React from "react";
import { Card } from "antd";
import { Comment } from "../../../rest/common";

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

const PostCard: React.FC<{ comment: Comment }> = ({ comment }) => {
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
    </Card>
  );
};

export default PostCard;
