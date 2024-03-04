import React from "react";
import { Card, Button } from "antd";
import { Post } from "../../../rest/common";
import { Link, useLocation } from "react-router-dom";
import { buttonStyle } from "../../../styles/global";

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
  const location = useLocation();

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
      {location.pathname.includes("post/") ? null : (
        <Link to={`post/${post.id}`}>
          <Button style={buttonStyle}>Read More</Button>
        </Link>
      )}
    </Card>
  );
};

export default PostCard;
