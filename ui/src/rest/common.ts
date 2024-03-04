export const baseUrl = "http://localhost:8080";

export interface User {
  name: string;
  email: string;
}

export type Post = {
  id: number;
  title: string;
  content: string;
  creationTime: Date;
  updateTime: Date;
  author: User;
};

export type Comment = {
  id: number;
  content: string;
  creationTime: Date;
  updateTime: Date;
  author: User;
};