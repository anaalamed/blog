import axios from "axios";
import { CommentValues } from "../view/components/comments/CommentModalForm";
import { Comment, baseUrl } from "./common";

const commentsUrl = baseUrl.concat("/comment");

export const getAllCommentsByPostId = async (
  postId: string
): Promise<Comment[]> => {
  try {
    const res = await axios(commentsUrl.concat(`?postId=${postId}`));
    const listRes: any[] = await res.data;
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
    const res = await axios(commentsUrl.concat("/addComment"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        charset: "utf-8",
        token: token,
      },
      data: JSON.stringify({ content: data.content, postId: postId }),
    });

    const commentRes: any = await res.data;
    console.log("New Comment was created: ", commentRes);
    return createCommentFromResponse(commentRes);
  } catch (e) {
    console.error("Create comment failed: ", e);
    return undefined;
  }
};

export const updateComment = async (
  data: CommentValues,
  token: string,
  id: any
): Promise<Comment | undefined> => {
  try {
    const res = await axios(commentsUrl.concat(`/editComment/${id}`), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        charset: "utf-8",
        token: token,
      },
      data: JSON.stringify({ content: data.content }),
    });

    const commentRes: any = await res.data;
    console.log("The Comment was updated: ", commentRes);
    return createCommentFromResponse(commentRes);
  } catch (e) {
    console.error("Update comment failed: ", e);
    return undefined;
  }
};

export const deleteComment = async (token: string, id: any): Promise<void> => {
  try {
    const res = await axios(commentsUrl.concat(`/deleteComment/${id}`), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        charset: "utf-8",
        token: token,
      },
    });

    console.log("The Comment was deleted");
  } catch (e) {
    console.error("Delete comment failed: ", e);
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
