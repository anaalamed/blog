import React, { useEffect, useState } from "react";
import { Flex } from "antd";
import { getPostById } from "../../rest/PostRequests";
import { Post, Comment } from "../../rest/common";
import PostCard from "../components/posts/PostCard";
import { useParams } from "react-router-dom";
import { getAllCommentsByPostId } from "../../rest/CommentRequests";
import Comments from "../components/comments/Comments";
import CommentModal from "../components/comments/CommentModal";
import { useGlobalContext } from "../../state/state";

const PostPage: React.FC = () => {
  const [post, setPost] = useState<Post>();
  const { postId } = useParams();
  const { isLoggedIn, comments, setComments } = useGlobalContext();

  useEffect(() => {
    async function getPost(postId: string) {
      const post = await getPostById(postId);
      setPost(post);

      const comments = await getAllCommentsByPostId(postId);
      setComments(comments);
      console.log(comments);
    }
    getPost(postId || "");
  }, [postId]);

  return (
    <>
      <h3>Post Page</h3>
      <Flex vertical gap="middle" justify="center" align="center">
        {post !== undefined ? <PostCard post={post} /> : null}

        {isLoggedIn ? <CommentModal /> : null}

        <Comments comments={comments} />
      </Flex>
    </>
  );
};

export default PostPage;
