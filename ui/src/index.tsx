import React, { createContext, useContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

export type GlobalContent = {
  token: string;
  setToken: (c: string) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (c: boolean) => void;
  userName: string;
  setUserName: (c: string) => void;
};

export const MyGlobalContext = createContext<GlobalContent>({
  token: "",
  setToken: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  userName: "",
  setUserName: () => {},
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
