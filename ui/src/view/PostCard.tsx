import React from "react";
import { Card } from "antd";
import { Post } from "../rest/PostRequests";

const cardStyle = {
  backgroundColor: "#EBEAFB",
  color: "#3928BD",
  textAlign: "start" as const,
  width: "80%",
};

const titleStyle = {
  backgroundColor: "#5c6cfa",
  color: "#fff",
};

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <Card
      size="default"
      headStyle={titleStyle}
      title={post.title}
      hoverable
      extra={
        <div style={titleStyle}>
          <div>{post.author.name}</div>
          <div>{post.creationTime.toLocaleString()}</div>
        </div>
      }
      style={cardStyle}
    >
      <p>{post.content}</p>
    </Card>
  );
};

export default PostCard;
