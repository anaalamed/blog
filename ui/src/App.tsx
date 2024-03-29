import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import { GlobalStyles } from "./styles/global";
import { Route, Routes } from "react-router-dom";
import PostPage from "./view/pages/PostPage";
import HomePage from "./view/pages/HomePage";
import Topbar from "./view/components/Topbar";
import FooterView from "./view/components/Footer";
import AuthPage from "./view/pages/AuthPage";
import { MyGlobalContext } from "./state/state";
import { Comment } from "./rest/commentRequests";
import UserPage from "./view/pages/UserPage";
import { User } from "./rest/userRequests";
import { Post } from "./rest/postRequests";
import Cookies from "js-cookie";
const { Header, Footer, Content } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 48,
  lineHeight: "64px",
  backgroundColor: "#1d1674",
};

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#3928BD",
};

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#1d1674",
  height: 97,
};

const layoutStyle = {
  overflow: "hidden",
  width: "100%",
  minHeight: "100vh",
};

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User>();
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [postPage, setPostPage] = useState<Post>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [userPosts, setUserPosts] = useState<Post[]>([]);

  useEffect(() => {
    const loggedInUser = Cookies.get("user");
    if (loggedInUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  return (
    <Layout style={layoutStyle}>
      <MyGlobalContext.Provider
        value={{
          isLoggedIn,
          setIsLoggedIn,
          user,
          setUser,
          allPosts,
          setAllPosts,
          postPage,
          setPostPage,
          comments,
          setComments,
          userPosts,
          setUserPosts,
        }}
      >
        <Header style={headerStyle}>
          <Topbar />
        </Header>
        <Content style={contentStyle}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/post/:postId" element={<PostPage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/signup" element={<AuthPage />} />
            <Route path="/user/:userId" element={<UserPage />} />
          </Routes>
        </Content>
        <Footer style={footerStyle}>
          <FooterView />
        </Footer>
      </MyGlobalContext.Provider>
      <GlobalStyles />
    </Layout>
  );
};

export default App;
