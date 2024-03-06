import React, { useEffect, useState } from "react";
import { Flex, Spin } from "antd";
import UserInfo from "../components/user/UserInfo";
import { useParams } from "react-router-dom";
import { getUserById } from "../../rest/userRequests";
import { User } from "../../rest/common";
import { getPostsByUserId } from "../../rest/postRequests";
import Posts from "../components/posts/Posts";
import { ComponentWrapper, postsPagesStyle } from "../../styles/global";
import FailureMessage from "../components/FailureMessage";
import { useGlobalContext } from "../../state/state";

const UserPage: React.FC = () => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User>();
  const params = useParams();
  const { userPosts, setUserPosts } = useGlobalContext();

  useEffect(() => {
    async function getUser(userId: string) {
      const user = await getUserById(userId);
      if (user !== undefined) {
        setUser(user);

        const posts = await getPostsByUserId(userId);
        setUserPosts(posts);
      }
      setLoading(false);
    }

    getUser(params.userId || "");
  }, [params.userId]);

  if (isLoading) {
    return <Spin size="large" style={{ padding: "1rem" }} />;
  }

  return (
    <Flex vertical align="center" style={postsPagesStyle}>
      {user ? (
        <>
          <ComponentWrapper className="form_wrapper">
            <UserInfo user={user} />
          </ComponentWrapper>
          <Posts posts={userPosts} />
        </>
      ) : (
        <FailureMessage />
      )}
    </Flex>
  );
};

export default UserPage;
