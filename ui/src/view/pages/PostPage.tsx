import React, { useEffect, useState } from "react";
import { Flex, Spin } from "antd";
import { getPostById } from "../../rest/PostRequests";
import { Post } from "../../rest/common";
import PostCard from "../components/posts/PostCard";
import { useParams } from "react-router-dom";
import { getAllCommentsByPostId } from "../../rest/CommentRequests";
import Comments from "../components/comments/Comments";

import { useGlobalContext } from "../../state/state";
import { postsPagesStyle } from "../../styles/global";
import FailureMessage from "../components/FailureMessage";

const PostPage: React.FC = () => {
  const [isLoadingPost, setLoadingPost] = useState<boolean>(true);
  const [isLoadingComments, setLoadingComments] = useState<boolean>(true);
  const { postId } = useParams();
  const { comments, setComments, postPage, setPostPage } = useGlobalContext();

  useEffect(() => {
    async function getPost(postId: string) {
      const post = await getPostById(postId);
      if (post !== undefined) {
        setPostPage(post);
        setLoadingPost(false);
      }

      const comments = await getAllCommentsByPostId(postId);
      setComments(comments);
      setLoadingComments(false);
    }
    getPost(postId || "");
  }, [postId]);

  return (
    <div style={postsPagesStyle}>
      <Flex vertical gap="middle" justify="center" align="center">
        {isLoadingPost ? (
          <Spin />
        ) : (
          <>
            {postPage !== undefined ? (
              <>
                <PostCard post={postPage} />
                {isLoadingComments ? (
                  <Spin />
                ) : (
                  <Comments comments={comments} />
                )}
              </>
            ) : (
              <FailureMessage />
            )}
          </>
        )}
      </Flex>
    </div>
  );
};

export default PostPage;
