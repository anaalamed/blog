import axios from "axios";
import { baseUrl, headers } from "./common";
import { User } from "./userRequests";
import Cookies from "js-cookie";

const commentsUrl = baseUrl.concat("/comment");

export interface Comment {
  id: number;
  content: string;
  creationTime: Date;
  updateTime: Date;
  author: User;
  postId: number;
}

export interface CommentValues {
  id?: number;
  content: string;
  postId: number;
}

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
  data: CommentValues
): Promise<Comment | undefined> => {
  try {
    const res = await axios(commentsUrl.concat("/addComment"), {
      method: "POST",
      headers: { ...headers, Authorization: Cookies.get("Authorization") },
      data: JSON.stringify({ content: data.content, postId: data.postId }),
    });

    const commentRes = await res.data;
    console.log("New Comment was created: ", commentRes);
    return createCommentFromResponse(commentRes);
  } catch (e) {
    console.error("Create comment failed: ", e);
    return undefined;
  }
};

export const updateComment = async (
  data: CommentValues,
  commentId: number
): Promise<Comment | undefined> => {
  try {
    const res = await axios(commentsUrl.concat(`/editComment/${commentId}`), {
      method: "PUT",
      headers: { ...headers, Authorization: Cookies.get("Authorization") },
      data: JSON.stringify({ content: data.content }),
    });

    const commentRes = await res.data;
    console.log("The Comment was updated: ", commentRes);
    return createCommentFromResponse(commentRes);
  } catch (e) {
    console.error("Update comment failed: ", e);
    return undefined;
  }
};

export const deleteComment = async (id: number): Promise<void> => {
  try {
    await axios(commentsUrl.concat(`/deleteComment/${id}`), {
      method: "DELETE",
      headers: { ...headers, Authorization: Cookies.get("Authorization") },
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
