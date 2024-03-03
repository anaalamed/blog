import React from "react";
import { Layout } from "antd";
import { GlobalStyles } from "./styles/global";
import Posts from "./view/Posts";

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
    <Header style={headerStyle}>Header</Header>
    <Content style={contentStyle}>
      <Posts />
    </Content>
    <Footer style={footerStyle}>Footer</Footer>

    <GlobalStyles />
  </Layout>
);

export default App;
