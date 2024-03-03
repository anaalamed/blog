const baseUrl = "http://localhost:8080";
const postUrl = baseUrl.concat("/post");

export interface User {
  id: number;
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

export const getAllPosts = async (): Promise<Post[]> => {
  try {
    const res = await fetch(postUrl);
    const listRes: any[] = await res.json();
    const posts: Post[] = listRes.map((e) => ({
      id: e.id,
      title: e.title,
      content: e.content,
      creationTime: new Date(e.creationTime),
      updateTime: new Date(e.updateTime),
      author: e.author,
    }));
    return posts;
  } catch (e) {
    console.log("Error occured during fetching posts: ", e);
    return [];
  }
};
