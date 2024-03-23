import React from "react";
import { Flex } from "antd";
import PostCard from "./PostCard";
import { Post } from "../../../rest/postRequests";

const Posts: React.FC<{ posts: Post[] }> = ({ posts }) => {
  return (
    <>
      <Flex
        vertical
        gap="middle"
        justify="center"
        align="center"
        style={{ padding: "1rem", width: "100%", margin: "0 auto" }}
      >
        {posts.map((post: Post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </Flex>
    </>
  );
};

export default Posts;
