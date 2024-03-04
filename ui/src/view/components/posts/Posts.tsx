import React from "react";
import { Flex } from "antd";
import { Post } from "../../../rest/common";
import PostCard from "./PostCard";
import { useGlobalContext } from "../../../state/state";
import { postsPagesStyle } from "../../../styles/global";

const Posts: React.FC = () => {
  const { posts } = useGlobalContext();

  return (
    <>
      <h3>{posts.length ? "" : "No posts yet..."}</h3>
      <Flex
        vertical
        gap="middle"
        justify="center"
        align="center"
        style={postsPagesStyle}
      >
        {posts.map((post: Post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </Flex>
    </>
  );
};

export default Posts;
