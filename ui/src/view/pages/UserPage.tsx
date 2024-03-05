import React, { useEffect, useState } from "react";
import { Divider, Flex, Spin } from "antd";
import styled from "styled-components";
import UserInfo from "../components/user/UserInfo";
import { useParams } from "react-router-dom";
import { getUserById } from "../../rest/UserRequests";
import { Post, User } from "../../rest/common";
import { getPostsByUserId } from "../../rest/PostRequests";
import Posts from "../components/posts/Posts";
import { pagesStyle } from "../../styles/global";

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
      <WormWrapper className="form_wrapper">
        {user ? <UserInfo user={user} /> : <Spin />}
      </WormWrapper>
      {posts ? <Posts posts={posts} /> : <Spin />}
    </Flex>
  );
};

const WormWrapper = styled.div`
  box-shadow: 22px 22px 40px rgba(0, 0, 0, 0.1);
  padding: 3rem 3rem;
  border-radius: 0.5rem;
  background: #fff;
  width: 50%;
  max-width: 600px;
`;

export default UserPage;
