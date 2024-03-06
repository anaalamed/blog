import React, { useEffect, useState } from "react";
import Posts from "../components/posts/Posts";
import { getAllPosts } from "../../rest/PostRequests";
import { useGlobalContext } from "../../state/state";
import { Spin } from "antd";

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

  return <>{isLoading ? <Spin /> : <Posts posts={allPosts} />}</>;
};

export default HomePage;
