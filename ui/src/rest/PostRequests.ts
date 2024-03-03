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
