import React, { useEffect } from "react";
import Posts from "../components/posts/Posts";
import { getAllPosts } from "../../rest/PostRequests";
import { useGlobalContext } from "../../state/state";

const HomePage: React.FC = () => {
  const { setPosts } = useGlobalContext();

  useEffect(() => {
    async function getPosts() {
      const posts = await getAllPosts();
      setPosts(posts);
    }
    getPosts();
  }, []);

  return <Posts />;
};

export default HomePage;
