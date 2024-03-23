import axios from "axios";
import { baseUrl, headers } from "./common";
import { User } from "./userRequests";

const postUrl = baseUrl.concat("/post");

export interface Post {
  id: number;
  title: string;
  content: string;
  creationTime: Date;
  updateTime: Date;
  author: User;
}

export interface PostValues {
  id?: number;
  title: string;
  content: string;
}

export const getAllPosts = async (): Promise<Post[]> => {
  try {
    const res = await axios(postUrl);
    const listRes: any[] = await res.data;
    return listRes.map((e) => createPostFromResponse(e));
  } catch (e) {
    console.log("Error occured during fetching posts: ", e);
    return [];
  }
};

export const getPostById = async (
  postId: string
): Promise<Post | undefined> => {
  try {
    const res = await axios(postUrl.concat(`/${postId}`));
    const postRes = await res.data;
    const post: Post = createPostFromResponse(postRes);
    return post;
  } catch (e) {
    console.log("Error occured during fetching post: ", e);
    return undefined;
  }
};

export const getPostsByUserId = async (userId: string): Promise<Post[]> => {
  try {
    const res = await axios(postUrl.concat(`/user?userId=${userId}`));
    const listRes: any[] = await res.data;
    return listRes.map((e) => createPostFromResponse(e));
  } catch (e) {
    console.log("Error occured during fetching posts: ", e);
    return [];
  }
};

export const getPostsByTitleOrContent = async (
  value: string
): Promise<Post[]> => {
  try {
    const res = await axios(postUrl.concat(`/search?q=${value}`));
    const listRes: any[] = await res.data;
    return listRes.map((e) => createPostFromResponse(e));
  } catch (e) {
    console.log("Error occured during fetching posts: ", e);
    return [];
  }
};

export const createPost = async (
  data: PostValues
): Promise<Post | undefined> => {
  try {
    const res = await axios(postUrl.concat("/addPost"), {
      method: "POST",
      headers: headers,
      data: JSON.stringify(data),
    });

    const postRes = await res.data;
    console.log("New Post was created: ", postRes);
    return createPostFromResponse(postRes);
  } catch (e) {
    console.log("Create post failed");
    return undefined;
  }
};

export const updatePost = async (
  data: PostValues,
  postId: number
): Promise<Post | undefined> => {
  try {
    const res = await axios(postUrl.concat(`/editPost/${postId}`), {
      method: "PUT",
      headers: headers,
      data: JSON.stringify(data),
    });

    const postRes = await res.data;
    console.log("The Post was updated: ", postRes);
    return createPostFromResponse(postRes);
  } catch (e) {
    console.log("Update post failed");
    return undefined;
  }
};

const createPostFromResponse = (postResponse: any): Post => {
  return {
    id: postResponse.id,
    title: postResponse.title,
    content: postResponse.content,
    creationTime: new Date(postResponse.creationTime),
    updateTime: new Date(postResponse.updateTime),
    author: postResponse.author,
  };
};
