import React, { useEffect, useState } from "react";
import { Divider, Flex, Spin } from "antd";
import UserInfo from "../components/user/UserInfo";
import { useParams } from "react-router-dom";
import { getUserById } from "../../rest/UserRequests";
import { Post, User } from "../../rest/common";
import { getPostsByUserId } from "../../rest/PostRequests";
import Posts from "../components/posts/Posts";
import { ComponentWrapper, pagesStyle } from "../../styles/global";

const UserPage: React.FC = () => {
  const [user, setUser] = useState<User>();
  const [posts, setPosts] = useState<Post[]>([]);
  const userId = useParams().userId;

  useEffect(() => {
    async function getUser() {
      const user = await getUserById(userId);
      setUser(user);
    }
    async function getUserPosts() {
      const posts = await getPostsByUserId(userId);
      setPosts(posts);
    }

    getUser();
    getUserPosts();
  }, [userId]);

  return (
    <Flex vertical align="center" style={pagesStyle}>
      <Divider></Divider>
      <ComponentWrapper className="form_wrapper">
        {user ? <UserInfo user={user} /> : <Spin />}
      </ComponentWrapper>
      {posts ? <Posts posts={posts} /> : <Spin />}
    </Flex>
  );
};

export default UserPage;
