import React from "react";
import { Card, Button, Flex } from "antd";
import { Post } from "../../../rest/common";
import { Link, useLocation } from "react-router-dom";
import { buttonStyle } from "../../../styles/global";
import ModalPost from "./PostModal";
import { useGlobalContext } from "../../..";

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
  const { isLoggedIn } = useGlobalContext();

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
        <>
          <Flex justify="space-between" gap={10}>
            <Link to={`post/${post.id}`}>
              <Button style={buttonStyle}>Read More</Button>
            </Link>

            {isLoggedIn ? <ModalPost post={post} /> : null}
          </Flex>
        </>
      )}
    </Card>
  );
};

export default PostCard;
