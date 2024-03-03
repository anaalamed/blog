import React from "react";
import { Card } from "antd";
import { Post } from "../rest/PostRequests";

const CardStyle = {
  backgroundImage: "linear-gradient(180deg, #532ac6 0%, #1d1674 100%)",
  color: "#fff",
  textAlign: "start" as const,
  width: "80%",
};

const PostCard: React.FC<{ post: Post }> = ({ post }) => (
  <Card
    size="default"
    title={post.title}
    hoverable
    extra={
      <>
        <a href="#">More</a>
        <div>{post.author.name}</div>
      </>
    }
    style={CardStyle}
  >
    <p>{post.content}</p>
  </Card>
);

export default PostCard;
