import React from "react";
import { Flex } from "antd";
import { Post } from "../../../rest/common";
import PostCard from "./PostCard";

const Posts: React.FC<{ posts: Post[] }> = ({ posts }) => {
  return (
    <>
      <Flex
        vertical
        gap="middle"
        justify="center"
        align="center"
        style={{ padding: "1rem" }}
      >
        {posts.map((post: Post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </Flex>
    </>
  );
};

export default Posts;
