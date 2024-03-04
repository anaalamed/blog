package com.hexagon.commentservice.dto;

import com.hexagon.authservice.dto.UserResponse;
import com.hexagon.commentservice.entity.Comment;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CommentResponse {
  private int id;
  private String content;
  private long creationTime;
  private long updateTime;
  private UserResponse author;
  private int postId;

  public CommentResponse(Comment comment, UserResponse author) {
    this.id = comment.getId();
    this.content = comment.getContent();
    this.creationTime = comment.getCreationTime().toEpochMilli();
    //    this.updateTime = comment.getUpdateTime().toEpochMilli();
    this.author = author;
    this.postId = comment.getPostId();
  }
}
