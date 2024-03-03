import React, { useEffect, useState } from "react";
import { Flex } from "antd";
import { getPostById } from "../rest/PostRequests";
import { Post } from "../rest/PostRequests";
import PostCard from "./PostCard";
import { useParams } from "react-router-dom";

const PostPage: React.FC = () => {
  const [post, setPost] = useState<Post>();
  const { postId } = useParams();

  useEffect(() => {
    async function getPost(postId: string) {
      const post = await getPostById(postId);
      setPost(post);
    }
    getPost(postId || "");
  }, [postId]);

  return (
    <>
      <h3>Post Page</h3>
      <Flex vertical gap="middle" justify="center" align="center">
        {post !== undefined ? <PostCard post={post} /> : null}

        <h3>Comments</h3>
      </Flex>
    </>
  );
};

export default PostPage;
