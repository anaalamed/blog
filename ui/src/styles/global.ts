import styled, { createGlobalStyle } from "styled-components";

export const buttonStyle = {
  backgroundColor: "#B0FD75",
  color: "#1E1C57",
  fontWeight: "bold",
  borderColor: "#1E1C57",
};

export const postsPagesStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "2rem 0",
};

export const pagesStyle = {
  minHeight: "calc(100vh - 161px)",
  backgroundImage: "linear-gradient(180deg, #3d2ac6 0%, #1d1674 100%)",
};

export const linkStyle = { color: "#fff", fontWeight: "bold" };

export const authFormItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

export const authTailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 4,
    },
  },
};

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  html,body,#root{min-height:100%}

  body {
    background: #fff;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height:100%;
    margin: 0;
    padding: 0;
    font-family: BlinkMacSystemFont, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    transition: all 0.25s linear;
  }
`;

export const ComponentWrapper = styled.div`
  box-shadow: 22px 22px 40px rgba(0, 0, 0, 0.1);
  padding: 3rem 3rem;
  border-radius: 0.5rem;
  background: #fff;
  width: 50%;
  max-width: 600px;

  @media only screen and (max-width: 600px) {
    width: 90%;
    padding: 1rem;
  }
`;
