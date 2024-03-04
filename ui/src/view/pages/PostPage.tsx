import React, { useEffect, useState } from "react";
import { Flex } from "antd";
import { getPostById } from "../../rest/PostRequests";
import { Post } from "../../rest/common";
import PostCard from "../components/posts/PostCard";
import { useParams } from "react-router-dom";
import { getAllCommentsByPostId } from "../../rest/CommentRequests";
import Comments from "../components/comments/Comments";

import { useGlobalContext } from "../../state/state";
import { postsPagesStyle } from "../../styles/global";

const PostPage: React.FC = () => {
  const [post, setPost] = useState<Post>();
  const { postId } = useParams();
  const { comments, setComments } = useGlobalContext();

  useEffect(() => {
    async function getPost(postId: string) {
      const post = await getPostById(postId);
      setPost(post);

      const comments = await getAllCommentsByPostId(postId);
      setComments(comments);
    }
    getPost(postId || "");
  }, [postId]);

  return (
    <div style={postsPagesStyle}>
      <Flex vertical gap="middle" justify="center" align="center">
        {post !== undefined ? <PostCard post={post} /> : null}

        <Comments comments={comments} />
      </Flex>
    </div>
  );
};

export default PostPage;
