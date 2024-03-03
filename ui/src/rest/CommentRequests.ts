import { User, Comment, baseUrl } from "./common";

const commentsUrl = baseUrl.concat("/comment");

export const getAllCommentsByPostId = async (
  postId: string
): Promise<Comment[]> => {
  try {
    const res = await fetch(commentsUrl.concat(`?postId=${postId}`));
    const listRes: any[] = await res.json();
    return listRes.map((e) => createCommentFromResponse(e));
  } catch (e) {
    console.log("Error occured during fetching posts: ", e);
    return [];
  }
};

const createCommentFromResponse = (commentResponse: any): Comment => {
  return {
    id: commentResponse.id,
    content: commentResponse.content,
    creationTime: new Date(commentResponse.creationTime),
    updateTime: new Date(commentResponse.updateTime),
    author: commentResponse.author,
  };
};
