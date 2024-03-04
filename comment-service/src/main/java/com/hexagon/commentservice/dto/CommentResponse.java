package com.hexagon.commentservice.dto;

import com.hexagon.authservice.dto.UserResponse;
import com.hexagon.commentservice.entity.Comment;
import java.time.Instant;
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
  private Instant creationTime;
  private Instant updateTime;
  private UserResponse author;
  private int postId;

  public CommentResponse(Comment comment, UserResponse author) {
    this.id = comment.getId();
    this.content = comment.getContent();
    this.creationTime = comment.getCreationTime();
    this.updateTime = comment.getUpdateTime();
    this.author = author;
    this.postId = comment.getPostId();
  }
}
