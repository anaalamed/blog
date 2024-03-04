import React, { createContext, useContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Post } from "./rest/common";

export type GlobalContent = {
  token: string;
  setToken: (c: string) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (c: boolean) => void;
  userName: string;
  setUserName: (c: string) => void;
  posts: Post[];
  setPosts: (c: Post[]) => void;
};

export const MyGlobalContext = createContext<GlobalContent>({
  token: "",
  setToken: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  userName: "",
  setUserName: () => {},
  posts: [],
  setPosts: () => {},
});

export const useGlobalContext = () => useContext(MyGlobalContext);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
