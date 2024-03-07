import React, { useEffect, useState } from "react";
import Posts from "../components/posts/Posts";
import {
  Post,
  getAllPosts,
  getPostsByTitleOrContent,
} from "../../rest/postRequests";
import { useGlobalContext } from "../../state/state";
import { Flex, Spin } from "antd";
import SearchPosts from "../components/posts/SearchPosts";
import { postsPagesStyle } from "../../styles/global";
import { useLocation } from "react-router-dom";

const HomePage: React.FC = () => {
  const { setAllPosts, allPosts } = useGlobalContext();
  const [isLoading, setLoading] = useState<boolean>(true);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchValue = queryParams.get("q");

  useEffect(() => {
    async function getPosts(searchValue?: string) {
      let posts: Post[];
      if (searchValue !== undefined) {
        posts = await getPostsByTitleOrContent(searchValue);
      } else {
        posts = await getAllPosts();
      }

      setAllPosts(posts);
      setLoading(false);
    }
    getPosts(searchValue || undefined);
  }, [searchValue]);

  if (isLoading) {
    return <Spin size="large" style={{ padding: "1rem" }} />;
  }

  return (
    <Flex vertical style={postsPagesStyle}>
      <SearchPosts />

      {allPosts.length ? <Posts posts={allPosts} /> : <h3>No posts yet...</h3>}
    </Flex>
  );
};

export default HomePage;
