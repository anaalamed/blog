import React from "react";
import { Layout } from "antd";
import { GlobalStyles } from "./styles/global";
import { Route, Routes } from "react-router-dom";
import PostPage from "./view/pages/PostPage";
import HomePage from "./view/pages/HomePage";
import Topbar from "./view/components/Topbar";
import FooterView from "./view/components/Footer";

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

const App: React.FC = () => (
  <Layout style={layoutStyle}>
    <Header style={headerStyle}>
      <Topbar />
    </Header>
    <Content style={contentStyle}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/post/:postId" element={<PostPage />} />
      </Routes>
    </Content>
    <Footer style={footerStyle}>
      <FooterView />
    </Footer>

    <GlobalStyles />
  </Layout>
);

export default App;
