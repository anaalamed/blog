import { CommentValues } from "../view/components/comments/CommentModalForm";
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
    console.log("Error occured during fetching comments: ", e);
    return [];
  }
};

export const createComment = async (
  data: CommentValues,
  token: string,
  postId: any
): Promise<Comment | undefined> => {
  try {
    const res = await fetch(commentsUrl.concat("/addComment"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        charset: "utf-8",
        token: token,
      },
      body: JSON.stringify({ content: data.content, postId: postId }),
    });

    const commentRes: any = await res.json();
    console.log("New Comment was created: ", commentRes);
    return createCommentFromResponse(commentRes);
  } catch (e) {
    console.error("Create comment failed ");
    return undefined;
  }
};

export const updateComment = async (
  data: CommentValues,
  token: string,
  id: any
): Promise<Comment | undefined> => {
  try {
    const res = await fetch(commentsUrl.concat(`/editComment/${id}`), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        charset: "utf-8",
        token: token,
      },
      body: JSON.stringify({ content: data.content }),
    });

    const commentRes: any = await res.json();
    console.log("The Comment was updated: ", commentRes);
    return createCommentFromResponse(commentRes);
  } catch (e) {
    console.error("Update comment failed ");
    return undefined;
  }
};

export const deleteComment = async (token: string, id: any): Promise<void> => {
  try {
    const res = await fetch(commentsUrl.concat(`/deleteComment/${id}`), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        charset: "utf-8",
        token: token,
      },
    });

    console.log("The Comment was deleted");
  } catch (e) {
    console.error("Delete comment failed: ");
  }
};

const createCommentFromResponse = (commentResponse: any): Comment => {
  return {
    id: commentResponse.id,
    content: commentResponse.content,
    creationTime: new Date(commentResponse.creationTime),
    updateTime: new Date(commentResponse.updateTime),
    author: commentResponse.author,
    postId: commentResponse.postId,
  };
};
