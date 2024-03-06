import React, { useEffect, useState } from "react";
import Posts from "../components/posts/Posts";
import { getAllPosts } from "../../rest/postRequests";
import { useGlobalContext } from "../../state/state";
import { Flex, Spin } from "antd";
import SearchPosts from "../components/posts/SearchPosts";
import { postsPagesStyle } from "../../styles/global";

const HomePage: React.FC = () => {
  const { setAllPosts, allPosts } = useGlobalContext();
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getPosts() {
      const posts = await getAllPosts();
      setAllPosts(posts);
      setLoading(false);
    }
    getPosts();
  }, []);

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
