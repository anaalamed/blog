import { createContext, useContext } from "react";
import { Comment, Post, User } from "../rest/common";

export type GlobalContent = {
  isLoggedIn: boolean;
  setIsLoggedIn: (c: boolean) => void;
  user?: User | undefined;
  setUser: (c: User | undefined) => void;
  allPosts: Post[];
  setAllPosts: (c: Post[]) => void;
  postPage: Post | undefined;
  setPostPage: (c: Post) => void;
  comments: Comment[];
  setComments: (c: Comment[]) => void;
  userPosts: Post[];
  setUserPosts: (c: Post[]) => void;
};

export const MyGlobalContext = createContext<GlobalContent>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  user: undefined,
  setUser: () => {},
  allPosts: [],
  setAllPosts: () => {},
  postPage: undefined,
  setPostPage: () => {},
  comments: [],
  setComments: () => {},
  userPosts: [],
  setUserPosts: () => {},
});

export const useGlobalContext = () => useContext(MyGlobalContext);
