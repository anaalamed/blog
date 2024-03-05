import React from "react";
import { Card, Button, Flex } from "antd";
import { Post } from "../../../rest/common";
import { Link, useLocation } from "react-router-dom";
import { buttonStyle } from "../../../styles/global";
import ModalPost from "./PostModal";
import { useGlobalContext } from "../../../state/state";
import UserName from "../user/UserName";

const cardStyle = {
  backgroundColor: "#EBEAFB",
  color: "#3928BD",
  textAlign: "start" as const,
  width: "80%",
};

const titleStyle = {
  backgroundImage: "linear-gradient(180deg, #3d2ac6 0%, #1d1674 100%)",
  color: "#fff",
};

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  const location = useLocation();
  const { isLoggedIn, user } = useGlobalContext();

  return (
    <Card
      size="default"
      headStyle={titleStyle}
      title={post.title}
      hoverable
      extra={
        <div style={titleStyle}>
          <Flex align="center" gap={10}>
            <div>
              <UserName user={post.author} />
              <div>{post.creationTime.toLocaleString()}</div>
            </div>
            {isLoggedIn && user?.id === post.author.id ? (
              <ModalPost post={post} />
            ) : null}
          </Flex>
        </div>
      }
      style={cardStyle}
    >
      <p>{post.content}</p>
      {location.pathname.includes("post/") ? null : (
        <>
          <Flex justify="space-between" gap={10}>
            <Link to={`/post/${post.id}`}>
              <Button style={buttonStyle}>Read More</Button>
            </Link>
          </Flex>
        </>
      )}
    </Card>
  );
};

export default PostCard;
