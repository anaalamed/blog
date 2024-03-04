import { createContext, useContext } from "react";
import { Comment, Post, User } from "../rest/common";

export type GlobalContent = {
  isLoggedIn: boolean;
  setIsLoggedIn: (c: boolean) => void;
  user?: User | undefined;
  setUser: (c: User | undefined) => void;
  posts: Post[];
  setPosts: (c: Post[]) => void;
  comments: Comment[];
  setComments: (c: Comment[]) => void;
};

export const MyGlobalContext = createContext<GlobalContent>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  user: undefined,
  setUser: () => {},
  posts: [],
  setPosts: () => {},
  comments: [],
  setComments: () => {},
});

export const useGlobalContext = () => useContext(MyGlobalContext);
