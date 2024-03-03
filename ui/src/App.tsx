import React from "react";
import { Layout } from "antd";
import { GlobalStyles } from "./styles/global";

const { Header, Footer, Content } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 48,
  lineHeight: "64px",
  backgroundImage: "linear-gradient(180deg, #532ac6 0%, #1d1674 100%)",
};

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  color: "#000",
  backgroundColor: "#fff",
};

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  backgroundImage: "linear-gradient(180deg, #532ac6 0%, #1d1674 100%)",
};

const layoutStyle = {
  overflow: "hidden",
  width: "100%",
  minHeight: "100vh",
};

const App: React.FC = () => (
  <Layout style={layoutStyle}>
    <Header style={headerStyle}>Header</Header>
    <Content style={contentStyle}>Content</Content>
    <Footer style={footerStyle}>Footer</Footer>

    <GlobalStyles />
  </Layout>
);

export default App;
