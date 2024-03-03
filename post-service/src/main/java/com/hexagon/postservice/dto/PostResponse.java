package com.hexagon.postservice.dto;

import com.hexagon.authservice.dto.UserResponse;
import com.hexagon.postservice.entity.Post;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PostResponse {
  private int id;
  private String title;
  private String content;
  private long creationTime;
  private long updateTime;
  private UserResponse author;

  public PostResponse(Post post, UserResponse author) {
    this.id = post.getId();
    this.title = post.getTitle();
    this.content = post.getContent();
    this.creationTime = post.getCreationTime().toEpochMilli();
    this.updateTime = post.getUpdateTime().toEpochMilli();
    this.author = author;
  }
}
