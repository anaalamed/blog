import React, { useEffect, useState } from "react";
import { Flex } from "antd";
import { getAllPosts } from "../rest/PostRequests";
import { Post } from "../rest/common";
import PostCard from "./PostCard";

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function getRepos() {
      const posts = await getAllPosts();
      setPosts(posts);
    }
    getRepos();
  }, []);

  return (
    <>
      <h3>Posts</h3>
      <Flex vertical gap="middle" justify="center" align="center">
        {posts.map((post: Post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </Flex>
    </>
  );
};

export default Posts;
