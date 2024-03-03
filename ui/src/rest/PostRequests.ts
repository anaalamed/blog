const baseUrl = "http://localhost:8080";
const postUrl = baseUrl.concat("/post");

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  creationTime: Date;
  updateTime: Date;
  author: User;
}

export const getAllPosts = async () => {
  try {
    const res = await fetch(postUrl);
    return await res.json();
  } catch (e) {
    console.log("Error occured during fetching posts: ", e);
  }
};
