import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import { GlobalStyles } from "./styles/global";
import { Route, Routes } from "react-router-dom";
import PostPage from "./view/pages/PostPage";
import HomePage from "./view/pages/HomePage";
import Topbar from "./view/components/Topbar";
import FooterView from "./view/components/Footer";
import AuthPage from "./view/pages/AuthPage";
import { MyGlobalContext } from ".";
import { Post } from "./rest/common";
import { getAllPosts } from "./rest/PostRequests";

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
  backgroundColor: "#fff",
};

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#1d1674",
};

const layoutStyle = {
  overflow: "hidden",
  width: "100%",
  minHeight: "100vh",
};

const App: React.FC = () => {
  const [token, setToken] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function getPosts() {
      const posts = await getAllPosts();
      setPosts(posts);
    }
    getPosts();
  }, []);

  return (
    <Layout style={layoutStyle}>
      <MyGlobalContext.Provider
        value={{
          token,
          setToken,
          isLoggedIn,
          setIsLoggedIn,
          userName,
          setUserName,
          posts,
          setPosts,
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
