import { createContext, useContext } from "react";
import { Post, User } from "../rest/common";

export type GlobalContent = {
  isLoggedIn: boolean;
  setIsLoggedIn: (c: boolean) => void;
  posts: Post[];
  setPosts: (c: Post[]) => void;
  user?: User | undefined;
  setUser: (c: User | undefined) => void;
};

export const MyGlobalContext = createContext<GlobalContent>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  posts: [],
  setPosts: () => {},
  user: undefined,
  setUser: () => {},
});

export const useGlobalContext = () => useContext(MyGlobalContext);
