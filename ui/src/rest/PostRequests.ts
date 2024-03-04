import { PostValues } from "../view/components/posts/PostModalForm";
import { Post, baseUrl } from "./common";

const postUrl = baseUrl.concat("/post");

export const getAllPosts = async (): Promise<Post[]> => {
  try {
    const res = await fetch(postUrl);
    const listRes: any[] = await res.json();
    return listRes.map((e) => createPostFromResponse(e));
  } catch (e) {
    console.log("Error occured during fetching posts: ", e);
    return [];
  }
};

export const getPostById = async (postId: string): Promise<Post> => {
  try {
    const res = await fetch(postUrl.concat(`/${postId}`));
    const postRes: any = await res.json();
    const post: Post = createPostFromResponse(postRes);
    return post;
  } catch (e) {
    console.log("Error occured during fetching posts: ", e);
    throw e;
  }
};

export const createPost = async (
  data: PostValues,
  token: string
): Promise<Post> => {
  try {
    const res = await fetch(postUrl.concat("/addPost"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        charset: "utf-8",
        token: token,
      },
      body: JSON.stringify({ title: data.title, content: data.content }),
    });
    if (res.ok) {
      const postRes: any = await res.json();
      console.log("New Post was created: ", postRes);
      return createPostFromResponse(postRes);
    } else {
      console.error("Create post failed: ", res.statusText);
      throw new Error();
    }
  } catch (e) {
    throw e;
  }
};

export const updatePost = async (
  data: PostValues,
  token: string,
  postId: any
): Promise<Post> => {
  try {
    console.log(data);
    const res = await fetch(postUrl.concat(`/editPost/${postId}`), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        charset: "utf-8",
        token: token,
      },
      body: JSON.stringify({ title: data.title, content: data.content }),
    });
    if (res.ok) {
      const postRes: any = await res.json();
      console.log("The Post was updated: ", postRes);
      return createPostFromResponse(postRes);
    } else {
      console.error("Update post failed: ", res.statusText);
      throw new Error();
    }
  } catch (e) {
    throw e;
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
